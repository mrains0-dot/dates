import os
import uuid
import asyncio
import logging
from datetime import datetime, timezone
from typing import Optional, List

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import resend

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("date-planner")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")
resend.api_key = RESEND_API_KEY

from recommend import geocode_zip, fetch_weather, fetch_nearby, rank_with_llm

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="Date Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Models ----------
class EmailRequest(BaseModel):
    email: EmailStr
    date: Optional[str] = None
    title: str
    location: Optional[str] = None


class AvailabilityWindow(BaseModel):
    date: str  # YYYY-MM-DD
    start: str  # HH:MM (24h)
    end: str    # HH:MM (24h)


class AvailabilityPayload(BaseModel):
    user_id: str
    windows: List[AvailabilityWindow]


class RecommendRequest(BaseModel):
    date_type: str
    zip_code: str
    date: Optional[str] = None
    preferences: Optional[str] = ""


# ---------- Seed Data ----------
NEW_RELEASE_MOVIES = [
    ("Captain America: Brave New World", "2026", "Action", 1),
    ("Mission: Impossible - The Final Reckoning", "2026", "Action/Thriller", 1),
    ("Snow White", "2026", "Fantasy/Musical", 1),
    ("The Batman Part II", "2026", "Action/Drama", 1),
    ("Avatar 3", "2026", "Sci-Fi/Adventure", 1),
    ("Jurassic World 4", "2026", "Action/Adventure", 1),
    ("Fantastic Four", "2026", "Action/Sci-Fi", 1),
    ("Blade", "2026", "Action/Horror", 1),
    ("The Fantastic Four: First Steps", "2026", "Action/Adventure", 2),
    ("Moana 2", "2026", "Animation", 2),
    ("Lilo & Stitch", "2026", "Animation/Family", 2),
    ("Thunderbolts", "2026", "Action", 2),
    ("How to Train Your Dragon", "2026", "Animation/Fantasy", 3),
    ("The Hunger Games: Sunrise on the Reaping", "2026", "Dystopian/Drama", 3),
    ("Tron: Ares", "2026", "Sci-Fi/Action", 3),
    ("Masters of the Universe", "2026", "Fantasy/Action", 4),
]
CLASSIC_MOVIES = [
    ("The Notebook", "2004", "Romance"),
    ("La La Land", "2016", "Romance/Musical"),
    ("Titanic", "1997", "Romance/Drama"),
    ("When Harry Met Sally", "1989", "Romance/Comedy"),
    ("Pride and Prejudice", "2005", "Romance/Drama"),
    ("Casablanca", "1942", "Romance"),
    ("Pretty Woman", "1990", "Romance/Comedy"),
    ("Eternal Sunshine of the Spotless Mind", "2004", "Romance/Sci-Fi"),
    ("Before Sunset", "2004", "Romance/Drama"),
    ("About Time", "2013", "Romance/Sci-Fi"),
    ("The Princess Bride", "1987", "Romance/Adventure"),
    ("Roman Holiday", "1953", "Romance"),
    ("Notting Hill", "1999", "Romance/Comedy"),
    ("Crazy, Stupid, Love", "2011", "Romance/Comedy"),
    ("500 Days of Summer", "2009", "Romance/Drama"),
]
BUDGET_RESTAURANTS = [
    ("Taco Bell", "Mexican"), ("Chipotle", "Mexican"), ("McDonalds", "American"),
    ("Panera Bread", "American"), ("Olive Garden", "Italian"), ("Applebees", "American"),
    ("Panda Express", "Asian"), ("Chick-fil-A", "American"), ("Subway", "American"),
    ("Wendys", "American"),
]
UPSCALE_RESTAURANTS = [
    ("The Capital Grille", "American/Steakhouse"), ("Ruths Chris Steak House", "Steakhouse"),
    ("Mortons The Steakhouse", "Steakhouse"), ("Bahama Breeze", "Caribbean"),
    ("Seasons 52", "American"), ("Bonefish Grill", "Seafood"),
    ("Maggianos Little Italy", "Italian"), ("Cheesecake Factory", "American"),
    ("Eddie Vs Prime Seafood", "Seafood/Steakhouse"), ("Royals Chop House", "American/Steakhouse"),
]

# Anime series (popular + new). Order is reshuffled on each backend startup.
ANIME_SERIES = [
    ("Frieren: Beyond Journey's End", "2024", "Fantasy/Drama", "new"),
    ("Solo Leveling", "2024", "Action/Fantasy", "new"),
    ("Dandadan", "2024", "Supernatural/Comedy", "new"),
    ("The Apothecary Diaries", "2024", "Mystery/Historical", "new"),
    ("Wind Breaker", "2024", "Action/School", "new"),
    ("Kaiju No. 8", "2024", "Action/Sci-Fi", "new"),
    ("Delicious in Dungeon", "2024", "Fantasy/Adventure", "new"),
    ("Oshi no Ko", "2023", "Drama/Mystery", "new"),
    ("Sakamoto Days", "2025", "Action/Comedy", "new"),
    ("Mashle: Magic and Muscles", "2024", "Action/Comedy", "new"),
    ("Demon Slayer", "2019", "Action/Supernatural", "popular"),
    ("Jujutsu Kaisen", "2020", "Action/Supernatural", "popular"),
    ("Attack on Titan", "2013", "Action/Drama", "popular"),
    ("One Piece", "1999", "Adventure/Fantasy", "popular"),
    ("My Hero Academia", "2016", "Action/Superhero", "popular"),
    ("Chainsaw Man", "2022", "Action/Horror", "popular"),
    ("Spy x Family", "2022", "Action/Comedy", "popular"),
    ("Bleach: Thousand-Year Blood War", "2022", "Action/Supernatural", "popular"),
    ("Vinland Saga", "2019", "Historical/Action", "popular"),
    ("Hunter x Hunter", "2011", "Adventure/Action", "popular"),
    ("Cowboy Bebop", "1998", "Sci-Fi/Action", "popular"),
    ("Mob Psycho 100", "2016", "Action/Comedy", "popular"),
    ("Steins;Gate", "2011", "Sci-Fi/Thriller", "popular"),
    ("Death Note", "2006", "Thriller/Psychological", "popular"),
    ("Fullmetal Alchemist: Brotherhood", "2009", "Action/Fantasy", "popular"),
    ("Made in Abyss", "2017", "Fantasy/Adventure", "popular"),
    ("Re:Zero - Starting Life in Another World", "2016", "Fantasy/Drama", "popular"),
    ("86 Eighty-Six", "2021", "Sci-Fi/Drama", "popular"),
    ("Mushoku Tensei: Jobless Reincarnation", "2021", "Fantasy/Adventure", "popular"),
    ("Tokyo Revengers", "2021", "Action/Drama", "popular"),
]

# Rich sub-page options for the 6 non-restaurant/non-cinema date types
DATE_TYPE_OPTIONS = {
    "picnic": {
        "title": "Picnic in the Park",
        "subtitle": "Where would you like to spread the blanket?",
        "groups": [
            {
                "label": "Vibe",
                "key": "spot",
                "items": [
                    {"id": "lakeside", "label": "Lakeside", "icon": "Waves", "desc": "Watch the water sparkle"},
                    {"id": "rose-garden", "label": "Rose Garden", "icon": "Flower", "desc": "Among the blooms"},
                    {"id": "wildflower-meadow", "label": "Wildflower Meadow", "icon": "Flower2", "desc": "Sunny and open"},
                    {"id": "shady-grove", "label": "Shady Grove", "icon": "TreePine", "desc": "Cool under the canopy"},
                    {"id": "hilltop-view", "label": "Hilltop View", "icon": "Mountain", "desc": "Above the skyline"},
                    {"id": "beachfront", "label": "Beachfront", "icon": "Palmtree", "desc": "Toes in the sand"},
                ],
            },
            {
                "label": "Basket",
                "key": "basket",
                "items": [
                    {"id": "cheese-board", "label": "Cheese & Charcuterie", "icon": "Wheat", "desc": "Brie, grapes, salami"},
                    {"id": "sandwiches", "label": "Gourmet Sandwiches", "icon": "Sandwich", "desc": "Crusty bread, pesto"},
                    {"id": "sweet-treats", "label": "Sweet Treats", "icon": "Cake", "desc": "Berries & chocolate"},
                    {"id": "wine-pairings", "label": "Wine & Bites", "icon": "Wine", "desc": "Rosé and snacks"},
                ],
            },
        ],
    },
    "hiking": {
        "title": "Nature Hike",
        "subtitle": "Pick your trail and pace",
        "groups": [
            {
                "label": "Trail",
                "key": "trail",
                "items": [
                    {"id": "forest-loop", "label": "Forest Loop", "icon": "Trees", "desc": "Easy · 2 mi · pine scent"},
                    {"id": "river-walk", "label": "River Walk", "icon": "Droplets", "desc": "Easy · 3 mi · flat path"},
                    {"id": "waterfall-trail", "label": "Waterfall Trail", "icon": "Waves", "desc": "Moderate · 4 mi"},
                    {"id": "ridge-climb", "label": "Ridge Climb", "icon": "Mountain", "desc": "Hard · 6 mi · views"},
                    {"id": "sunset-summit", "label": "Sunset Summit", "icon": "Sunset", "desc": "Hard · 5 mi · golden hour"},
                    {"id": "cave-route", "label": "Cave Route", "icon": "Flame", "desc": "Moderate · 3 mi · cool & dim"},
                ],
            },
            {
                "label": "Pace",
                "key": "pace",
                "items": [
                    {"id": "slow-stroll", "label": "Slow Stroll", "icon": "Snail", "desc": "Talk, breathe, linger"},
                    {"id": "steady", "label": "Steady", "icon": "Footprints", "desc": "Comfortable pace"},
                    {"id": "challenge", "label": "Challenge Mode", "icon": "Zap", "desc": "Push yourselves"},
                ],
            },
        ],
    },
    "cooking": {
        "title": "Cook Together",
        "subtitle": "What are we making tonight?",
        "groups": [
            {
                "label": "Dish",
                "key": "dish",
                "items": [
                    {"id": "fresh-pasta", "label": "Fresh Pasta", "icon": "Utensils", "desc": "Hand-rolled tagliatelle"},
                    {"id": "homemade-pizza", "label": "Homemade Pizza", "icon": "Pizza", "desc": "Toss the dough"},
                    {"id": "sushi-night", "label": "Sushi Night", "icon": "Fish", "desc": "Roll your own"},
                    {"id": "taco-bar", "label": "Taco Bar", "icon": "Wheat", "desc": "All the toppings"},
                    {"id": "ramen", "label": "Ramen", "icon": "Soup", "desc": "Slow broth, soft eggs"},
                    {"id": "dessert-bake", "label": "Dessert Bake", "icon": "Cake", "desc": "Tiramisu / soufflé"},
                ],
            },
            {
                "label": "Mood",
                "key": "mood",
                "items": [
                    {"id": "candlelit", "label": "Candlelit", "icon": "Flame", "desc": "Low light, slow music"},
                    {"id": "fun-chaotic", "label": "Fun & Chaotic", "icon": "PartyPopper", "desc": "Aprons, flour fight"},
                    {"id": "wine-and-jazz", "label": "Wine & Jazz", "icon": "Music", "desc": "Sip and stir"},
                ],
            },
        ],
    },
    "museum": {
        "title": "Museum or Gallery",
        "subtitle": "Choose your exhibition",
        "groups": [
            {
                "label": "Exhibition",
                "key": "exhibition",
                "items": [
                    {"id": "impressionist", "label": "Impressionists", "icon": "Palette", "desc": "Monet, Renoir, Degas"},
                    {"id": "modern-art", "label": "Modern Art", "icon": "Frame", "desc": "Abstract, bold, weird"},
                    {"id": "photography", "label": "Photography", "icon": "Camera", "desc": "Black & white silence"},
                    {"id": "ancient-civ", "label": "Ancient Civilizations", "icon": "Landmark", "desc": "Egypt, Rome, Greece"},
                    {"id": "science-nature", "label": "Science & Nature", "icon": "Telescope", "desc": "Dinosaurs & cosmos"},
                    {"id": "sculpture-garden", "label": "Sculpture Garden", "icon": "Brush", "desc": "Outdoor, contemplative"},
                ],
            },
            {
                "label": "After",
                "key": "after",
                "items": [
                    {"id": "cafe-debrief", "label": "Café Debrief", "icon": "Coffee", "desc": "Discuss what we saw"},
                    {"id": "bookstore", "label": "Bookstore Browse", "icon": "BookOpen", "desc": "Pick a book for each other"},
                    {"id": "park-walk", "label": "Park Walk", "icon": "TreePine", "desc": "Let it sink in"},
                ],
            },
        ],
    },
    "cocktails": {
        "title": "Cocktails & Drinks",
        "subtitle": "Set the scene",
        "groups": [
            {
                "label": "Spot",
                "key": "spot",
                "items": [
                    {"id": "speakeasy", "label": "Hidden Speakeasy", "icon": "Lock", "desc": "Press the bookcase"},
                    {"id": "rooftop", "label": "Rooftop Bar", "icon": "Building2", "desc": "City lights below"},
                    {"id": "tiki-bar", "label": "Tiki Bar", "icon": "Palmtree", "desc": "Tropical & playful"},
                    {"id": "wine-bar", "label": "Cozy Wine Bar", "icon": "Wine", "desc": "Candles & small plates"},
                    {"id": "jazz-lounge", "label": "Jazz Lounge", "icon": "Music", "desc": "Live music, low light"},
                    {"id": "natural-wine", "label": "Natural Wine Spot", "icon": "Grape", "desc": "Funky pours & pét-nat"},
                ],
            },
            {
                "label": "Signature",
                "key": "signature",
                "items": [
                    {"id": "negroni", "label": "Negroni", "icon": "Martini", "desc": "Bitter, classic"},
                    {"id": "espresso-martini", "label": "Espresso Martini", "icon": "Coffee", "desc": "Buzz & boldness"},
                    {"id": "old-fashioned", "label": "Old Fashioned", "icon": "GlassWater", "desc": "Bourbon, bitters, orange"},
                    {"id": "spritz", "label": "Spritz", "icon": "Citrus", "desc": "Bubbly & light"},
                ],
            },
        ],
    },
    "stargazing": {
        "title": "Stargazing",
        "subtitle": "Find the perfect dark sky",
        "groups": [
            {
                "label": "Where",
                "key": "where",
                "items": [
                    {"id": "rooftop", "label": "Rooftop Blanket", "icon": "Building2", "desc": "City sky, our own quiet"},
                    {"id": "lake-shore", "label": "Lake Shore", "icon": "Waves", "desc": "Reflections on water"},
                    {"id": "hilltop", "label": "Hilltop", "icon": "Mountain", "desc": "Above the light pollution"},
                    {"id": "observatory", "label": "Local Observatory", "icon": "Telescope", "desc": "Real telescopes"},
                    {"id": "desert", "label": "Desert Sky", "icon": "Tent", "desc": "Brightest stars you'll see"},
                    {"id": "field", "label": "Open Field", "icon": "Wheat", "desc": "Lie down, look up"},
                ],
            },
            {
                "label": "To Spot",
                "key": "spot",
                "items": [
                    {"id": "milky-way", "label": "The Milky Way", "icon": "Sparkles", "desc": "Best after midnight"},
                    {"id": "meteor-shower", "label": "Meteor Shower", "icon": "Zap", "desc": "Wishes incoming"},
                    {"id": "moon-craters", "label": "Moon Craters", "icon": "Moon", "desc": "Bring binoculars"},
                    {"id": "constellations", "label": "Constellations", "icon": "Star", "desc": "Orion, Cassiopeia, Lyra"},
                    {"id": "planets", "label": "Planets", "icon": "Globe", "desc": "Saturn's rings, maybe"},
                ],
            },
        ],
    },
}


async def seed_database():
    if await db.movies.count_documents({}) == 0:
        docs = []
        for title, year, genre, week in NEW_RELEASE_MOVIES:
            docs.append({"id": str(uuid.uuid4()), "title": title, "year": year,
                         "genre": genre, "category": "new_release", "week_number": week,
                         "is_active": True, "created_at": datetime.now(timezone.utc).isoformat()})
        for title, year, genre in CLASSIC_MOVIES:
            docs.append({"id": str(uuid.uuid4()), "title": title, "year": year,
                         "genre": genre, "category": "classic", "week_number": None,
                         "is_active": True, "created_at": datetime.now(timezone.utc).isoformat()})
        await db.movies.insert_many(docs)

    if await db.restaurants.count_documents({}) == 0:
        docs = []
        for name, cuisine in BUDGET_RESTAURANTS:
            docs.append({"id": str(uuid.uuid4()), "name": name, "cuisine_type": cuisine,
                         "price_range": "budget", "location": "Your Area", "is_active": True,
                         "created_at": datetime.now(timezone.utc).isoformat()})
        for name, cuisine in UPSCALE_RESTAURANTS:
            docs.append({"id": str(uuid.uuid4()), "name": name, "cuisine_type": cuisine,
                         "price_range": "upscale", "location": "Your Area", "is_active": True,
                         "created_at": datetime.now(timezone.utc).isoformat()})
        await db.restaurants.insert_many(docs)

    if await db.anime.count_documents({}) == 0:
        docs = []
        for title, year, genre, category in ANIME_SERIES:
            docs.append({"id": str(uuid.uuid4()), "title": title, "year": year,
                         "genre": genre, "category": category, "is_active": True,
                         "created_at": datetime.now(timezone.utc).isoformat()})
        await db.anime.insert_many(docs)


# Module-level: shuffle order is regenerated each backend restart
import random as _random
_anime_session_ids: list = []


async def _refresh_anime_session_order():
    cursor = db.anime.find({"is_active": True}, {"id": 1, "_id": 0})
    docs = await cursor.to_list(length=1000)
    ids = [d["id"] for d in docs]
    _random.shuffle(ids)
    return ids[:16]


@app.on_event("startup")
async def on_startup():
    await seed_database()
    global _anime_session_ids
    _anime_session_ids = await _refresh_anime_session_order()
    logger.info(f"Anime session order refreshed: {len(_anime_session_ids)} titles")


# ---------- Routes ----------
@app.get("/api/")
async def root():
    return {"status": "ok", "service": "date-planner"}


@app.get("/api/movies")
async def get_movies():
    import time, random
    cursor = db.movies.find({"is_active": True}, {"_id": 0})
    movies = await cursor.to_list(length=1000)
    current_week = int(time.time() // (7 * 24 * 60 * 60))
    w_a = current_week % 4 + 1
    w_b = (current_week - 1) % 4 + 1
    new_releases = [m for m in movies if m["category"] == "new_release"
                    and (not m.get("week_number") or m["week_number"] in (w_a, w_b))][:8]
    classics = [m for m in movies if m["category"] == "classic"]
    random.shuffle(classics)

    # Anime — use the per-startup shuffle order so it's stable for a session
    anime_cursor = db.anime.find({"id": {"$in": _anime_session_ids}}, {"_id": 0})
    anime_docs = {d["id"]: d for d in await anime_cursor.to_list(length=100)}
    anime_series = [anime_docs[i] for i in _anime_session_ids if i in anime_docs]

    return {
        "newReleases": new_releases,
        "popularClassics": classics[:8],
        "animeSeries": anime_series,
    }


@app.get("/api/restaurants")
async def get_restaurants(cuisine_type: str = Query(...)):
    regex = {"$regex": cuisine_type, "$options": "i"}
    cursor = db.restaurants.find(
        {"is_active": True, "cuisine_type": regex}, {"_id": 0},
    ).sort([("price_range", 1), ("name", 1)])
    data = await cursor.to_list(length=1000)
    budget = [r for r in data if r["price_range"] == "budget"][:3]
    upscale = [r for r in data if r["price_range"] == "upscale"][:3]
    return budget + upscale


@app.get("/api/date-options/{type_id}")
async def get_date_options(type_id: str):
    options = DATE_TYPE_OPTIONS.get(type_id)
    if not options:
        raise HTTPException(status_code=404, detail="Date type not found")
    return options


def build_email_html(title: str, date_str: Optional[str], location: Optional[str]) -> str:
    safe_title = (title or "Our Date").replace("<", "&lt;").replace(">", "&gt;")
    safe_date = (date_str or "TBD").replace("<", "&lt;").replace(">", "&gt;")
    safe_loc = (location or "").replace("<", "&lt;").replace(">", "&gt;")
    loc_row = (
        f'<tr><td style="padding:6px 0;color:#5a4044;font-size:14px;">📍 <strong>Where:</strong> {safe_loc}</td></tr>'
        if safe_loc else ""
    )
    return f"""
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#faf6f1;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f1;padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;
             box-shadow:0 4px 20px rgba(190,18,60,0.08);overflow:hidden;max-width:520px;">
        <tr><td style="background:#BE123C;color:#ffffff;text-align:center;padding:32px 24px;">
          <div style="font-size:42px;line-height:1;margin-bottom:8px;">♥</div>
          <h1 style="margin:0;font-size:24px;font-weight:600;letter-spacing:-0.5px;">It's a date!</h1>
        </td></tr>
        <tr><td style="padding:32px 28px 8px 28px;color:#3b2024;">
          <p style="margin:0 0 18px 0;font-size:16px;line-height:1.5;color:#5a4044;">
            Your date plan has been confirmed. Here are the details:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="background:#fdf2f6;border:1px solid #fbd5e0;border-radius:12px;padding:18px 20px;">
            <tr><td style="padding:6px 0;color:#3b2024;font-size:18px;font-weight:600;">{safe_title}</td></tr>
            <tr><td style="padding:6px 0;color:#5a4044;font-size:14px;">🗓️ <strong>When:</strong> {safe_date}</td></tr>
            {loc_row}
          </table>
        </td></tr>
        <tr><td style="padding:24px 28px 32px 28px;color:#7a5a60;font-size:13px;line-height:1.5;text-align:center;">
          Have a wonderful time. ✨<br>
          <span style="color:#9a7a80;">— Sent from Date Planner</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>
"""


@app.post("/api/send-date-email")
async def send_date_email(payload: EmailRequest):
    if not payload.email or not payload.title:
        raise HTTPException(status_code=400, detail="Missing required fields")

    doc = {
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "date": payload.date,
        "title": payload.title,
        "location": payload.location,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "delivery_status": "pending",
    }

    html = build_email_html(payload.title, payload.date, payload.location)
    params = {
        "from": SENDER_EMAIL,
        "to": [payload.email],
        "subject": f"💌 Date confirmed: {payload.title}",
        "html": html,
    }

    if not RESEND_API_KEY:
        doc["delivery_status"] = "skipped_no_api_key"
        await db.date_plans.insert_one(doc)
        logger.warning("RESEND_API_KEY not set — email not sent")
        return {"success": True, "message": "Saved (no API key configured)", "id": doc["id"]}

    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        doc["delivery_status"] = "sent"
        doc["provider_id"] = result.get("id") if isinstance(result, dict) else None
        await db.date_plans.insert_one(doc)
        logger.info(f"Email sent to {payload.email}: {doc.get('provider_id')}")
        return {"success": True, "message": "Email sent", "id": doc["id"],
                "provider_id": doc.get("provider_id")}
    except Exception as e:
        doc["delivery_status"] = "failed"
        doc["error"] = str(e)
        await db.date_plans.insert_one(doc)
        logger.error(f"Resend send failed: {e}")
        raise HTTPException(status_code=502, detail=f"Failed to send email: {str(e)}")



# ---------- Availability ----------
@app.get("/api/availability/{user_id}")
async def get_availability(user_id: str):
    doc = await db.availability.find_one({"user_id": user_id}, {"_id": 0})
    return doc or {"user_id": user_id, "windows": []}


@app.post("/api/availability")
async def save_availability(payload: AvailabilityPayload):
    doc = {
        "user_id": payload.user_id,
        "windows": [w.model_dump() for w in payload.windows],
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.availability.update_one(
        {"user_id": payload.user_id},
        {"$set": doc},
        upsert=True,
    )
    return {"success": True, "count": len(doc["windows"])}


# ---------- Weather ----------
@app.get("/api/weather")
async def get_weather(zip_code: str = Query(...), date: Optional[str] = Query(None)):
    geo = await geocode_zip(zip_code)
    if not geo:
        raise HTTPException(status_code=404, detail="Zip code not found")
    forecast = await fetch_weather(geo["lat"], geo["lon"], date)
    if not forecast:
        raise HTTPException(status_code=502, detail="Weather unavailable")
    return {"location": geo, "weather": forecast}


# ---------- Nearby + AI Recommendations ----------
@app.post("/api/recommend")
async def recommend(payload: RecommendRequest):
    geo = await geocode_zip(payload.zip_code)
    if not geo:
        raise HTTPException(status_code=404, detail="Zip code not found")

    weather_task = fetch_weather(geo["lat"], geo["lon"], payload.date)
    places_task = fetch_nearby(geo["lat"], geo["lon"], payload.date_type, preferences=payload.preferences or "")
    weather, places = await asyncio.gather(weather_task, places_task, return_exceptions=False)

    recommendations = []
    if places and EMERGENT_LLM_KEY:
        try:
            recommendations = await rank_with_llm(
                EMERGENT_LLM_KEY, payload.date_type, payload.zip_code,
                weather, places, payload.preferences or "",
            )
        except Exception as e:
            logger.warning(f"LLM ranking failed, falling back to top-3 by distance: {e}")
    # Fallback: top 3 closest if LLM failed or unavailable
    if not recommendations and places:
        recommendations = [{
            "name": p["name"], "category": p["category"], "address": p["address"],
            "distance_m": p["distance_m"],
            "reason": "Closest match nearby.",
        } for p in places[:3]]

    return {
        "location": geo,
        "weather": weather,
        "places_total": len(places),
        "recommendations": recommendations,
    }
