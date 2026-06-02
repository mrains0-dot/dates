"""Helpers: geocoding (Open-Meteo), weather (Open-Meteo), nearby places (OSM Overpass), AI ranking (Claude)."""
import os
import json
import uuid
from typing import Optional

import httpx

OPEN_METEO_GEO = "https://geocoding-api.open-meteo.com/v1/search"
OPEN_METEO_FORECAST = "https://api.open-meteo.com/v1/forecast"
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Mapping date-type → OSM amenity/leisure tags
OSM_QUERY_FOR_TYPE = {
    "restaurant": '"amenity"~"^(restaurant|cafe|bistro|fast_food)$"',
    "cinema": '"amenity"="cinema"',
    "picnic": '"leisure"~"^(park|garden|picnic_site|nature_reserve)$"',
    "hiking": '"route"="hiking"',  # falls back to parks below if 0 results
    "cooking": '"shop"~"^(supermarket|greengrocer|bakery)$"',
    "museum": '"tourism"~"^(museum|gallery)$"',
    "cocktails": '"amenity"~"^(bar|pub|nightclub)$"',
    "stargazing": '"leisure"~"^(park|nature_reserve)$"',
    "custom": '"leisure"~"^(park)$"',
}

WEATHER_CODES = {
    0: "clear sky", 1: "mostly clear", 2: "partly cloudy", 3: "overcast",
    45: "foggy", 48: "icy fog",
    51: "light drizzle", 53: "drizzle", 55: "heavy drizzle",
    61: "light rain", 63: "rain", 65: "heavy rain",
    71: "light snow", 73: "snow", 75: "heavy snow",
    77: "snow grains",
    80: "rain showers", 81: "rain showers", 82: "heavy rain showers",
    85: "snow showers", 86: "heavy snow showers",
    95: "thunderstorm", 96: "thunderstorm with hail", 99: "severe thunderstorm",
}


async def geocode_zip(zip_code: str, country_code: str = "US") -> Optional[dict]:
    """Convert US zip → {lat, lon, name, admin1}."""
    params = {"name": zip_code, "count": 1, "language": "en", "countryCode": country_code}
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.get(OPEN_METEO_GEO, params=params)
        r.raise_for_status()
        results = r.json().get("results") or []
        if not results:
            return None
        g = results[0]
        return {
            "lat": g["latitude"],
            "lon": g["longitude"],
            "name": g.get("name") or zip_code,
            "admin1": g.get("admin1") or "",
        }


async def fetch_weather(lat: float, lon: float, date_iso: Optional[str] = None) -> Optional[dict]:
    """Return forecast for the given date (YYYY-MM-DD) or today."""
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        "temperature_unit": "fahrenheit",
        "timezone": "auto",
    }
    if date_iso:
        params["start_date"] = date_iso
        params["end_date"] = date_iso
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.get(OPEN_METEO_FORECAST, params=params)
        r.raise_for_status()
        data = r.json()
    daily = data.get("daily") or {}
    if not daily.get("time"):
        return None
    idx = 0
    code = (daily["weather_code"] or [0])[idx]
    return {
        "date": (daily["time"] or [None])[idx],
        "weather_code": code,
        "summary": WEATHER_CODES.get(code, "uncertain"),
        "temp_max_f": (daily["temperature_2m_max"] or [None])[idx],
        "temp_min_f": (daily["temperature_2m_min"] or [None])[idx],
        "precip_chance_pct": (daily.get("precipitation_probability_max") or [None])[idx],
    }


CUISINE_OVERPASS_MAP = {
    "italian": '"cuisine"~"italian"',
    "mexican": '"cuisine"~"mexican|tex-mex"',
    "asian": '"cuisine"~"asian|chinese|japanese|thai|vietnamese|korean|sushi|ramen|indian"',
    "american": '"cuisine"~"american|burger|barbecue|bbq|diner"',
    "seafood": '"cuisine"~"seafood|fish"',
    "steakhouse": '"cuisine"~"steak"',
}


async def fetch_nearby(lat: float, lon: float, date_type: str, radius_m: int = 20000,
                       limit: int = 15, preferences: str = "") -> list:
    """Query OSM Overpass for nearby places of the given date-type, return list of {name, address, distance_m}."""
    tag = OSM_QUERY_FOR_TYPE.get(date_type) or OSM_QUERY_FOR_TYPE["custom"]

    # Refine restaurant queries by cuisine when the preference matches a known type
    cuisine_tag = ""
    if date_type == "restaurant" and preferences:
        pref_lower = preferences.lower().strip()
        for key, tag_expr in CUISINE_OVERPASS_MAP.items():
            if key in pref_lower:
                cuisine_tag = f"[{tag_expr}]"
                break

    query = f"""
[out:json][timeout:20];
(
  node[{tag}]{cuisine_tag}(around:{radius_m},{lat},{lon});
  way[{tag}]{cuisine_tag}(around:{radius_m},{lat},{lon});
);
out tags center {limit*3};
"""
    async with httpx.AsyncClient(timeout=25, headers={"User-Agent": "date-planner/1.0"}) as client:
        r = await client.post(OVERPASS_URL, data={"data": query})
        if r.status_code != 200:
            return []
        try:
            elements = r.json().get("elements", [])
        except Exception:
            return []

    def haversine(la1, lo1, la2, lo2):
        from math import radians, sin, cos, asin, sqrt
        la1, lo1, la2, lo2 = map(radians, [la1, lo1, la2, lo2])
        dlat = la2 - la1; dlon = lo2 - lo1
        a = sin(dlat/2)**2 + cos(la1)*cos(la2)*sin(dlon/2)**2
        return 6371000 * 2 * asin(sqrt(a))

    places = []
    seen_names = set()
    for el in elements:
        tags = el.get("tags") or {}
        name = tags.get("name")
        if not name or name in seen_names:
            continue
        seen_names.add(name)
        plat = el.get("lat") or (el.get("center") or {}).get("lat")
        plon = el.get("lon") or (el.get("center") or {}).get("lon")
        if plat is None or plon is None:
            continue
        addr_parts = []
        if tags.get("addr:housenumber") and tags.get("addr:street"):
            addr_parts.append(f"{tags['addr:housenumber']} {tags['addr:street']}")
        elif tags.get("addr:street"):
            addr_parts.append(tags["addr:street"])
        if tags.get("addr:city"):
            addr_parts.append(tags["addr:city"])
        places.append({
            "name": name,
            "category": tags.get("cuisine") or tags.get("amenity") or tags.get("leisure") or tags.get("tourism") or "",
            "address": ", ".join(addr_parts),
            "distance_m": int(haversine(lat, lon, plat, plon)),
        })
    places.sort(key=lambda p: p["distance_m"])
    return places[:limit]


async def rank_with_llm(api_key: str, date_type: str, zip_code: str, weather: Optional[dict],
                        places: list, preferences: str = "") -> list:
    """Call Claude Sonnet 4.5 to pick top 3 places + write a warm 1-line reason for each."""
    if not places:
        return []

    # Lazy import so server starts even if integration deps are slow to load
    from emergentintegrations.llm.chat import LlmChat, UserMessage

    weather_line = (
        f"{weather['summary']}, {int(weather['temp_min_f'])}-{int(weather['temp_max_f'])}°F, "
        f"{int(weather['precip_chance_pct'] or 0)}% chance of precipitation"
        if weather else "unknown"
    )
    place_list = "\n".join([
        f"- {p['name']} ({p['category'] or 'place'}, {p['distance_m']/1000:.1f} km away)"
        for p in places[:12]
    ])
    pref_line = preferences.strip() or "no specific preferences mentioned"

    system = (
        "You are a thoughtful date-planner assistant. You receive a list of real nearby places, "
        "the weather, and the user's preferences. You return STRICT JSON only — no prose, no markdown — "
        "matching the schema: {\"recommendations\":[{\"name\":string,\"reason\":string}]}. "
        "Pick the 3 best matches. Each reason must be ONE short warm line (max 12 words), "
        "personal in tone, and reference weather or vibe when relevant."
    )
    user_text = (
        f"Date type: {date_type}\n"
        f"Near zip: {zip_code}\n"
        f"Weather: {weather_line}\n"
        f"Preferences: {pref_line}\n\n"
        f"Candidate places:\n{place_list}\n\n"
        f"Return ONLY the JSON object."
    )

    chat = LlmChat(
        api_key=api_key,
        session_id=f"rank-{uuid.uuid4()}",
        system_message=system,
    ).with_model("anthropic", "claude-sonnet-4-5-20250929")

    raw = await chat.send_message(UserMessage(text=user_text))
    text = (raw or "").strip()
    # Tolerate fenced JSON
    if text.startswith("```"):
        text = text.strip("`")
        if text.startswith("json"):
            text = text[4:].strip()
    try:
        payload = json.loads(text)
        recs = payload.get("recommendations") or []
    except Exception:
        return []

    # Map back to original place data
    by_name = {p["name"].lower(): p for p in places}
    out = []
    for rec in recs[:3]:
        nm = (rec.get("name") or "").strip()
        p = by_name.get(nm.lower())
        if not p:
            # Fuzzy: pick any place whose name contains/contained-in the rec name
            for pl in places:
                if nm and (nm.lower() in pl["name"].lower() or pl["name"].lower() in nm.lower()):
                    p = pl
                    break
        if not p:
            continue
        out.append({
            "name": p["name"],
            "category": p["category"],
            "address": p["address"],
            "distance_m": p["distance_m"],
            "reason": (rec.get("reason") or "").strip()[:140],
        })
    return out
