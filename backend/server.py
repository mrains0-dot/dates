import os
import uuid
from datetime import datetime, timezone
from typing import Optional, List

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

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
class Movie(BaseModel):
    id: str
    title: str
    year: str
    genre: str
    category: str  # 'new_release' | 'classic'
    week_number: Optional[int] = None
    is_active: bool = True


class Restaurant(BaseModel):
    id: str
    name: str
    cuisine_type: str
    price_range: str  # 'budget' | 'upscale'
    location: str = "Your Area"
    is_active: bool = True


class EmailRequest(BaseModel):
    email: str
    date: Optional[str] = None
    title: str
    location: Optional[str] = None


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
    ("Taco Bell", "Mexican"),
    ("Chipotle", "Mexican"),
    ("McDonalds", "American"),
    ("Panera Bread", "American"),
    ("Olive Garden", "Italian"),
    ("Applebees", "American"),
    ("Panda Express", "Asian"),
    ("Chick-fil-A", "American"),
    ("Subway", "American"),
    ("Wendys", "American"),
]

UPSCALE_RESTAURANTS = [
    ("The Capital Grille", "American/Steakhouse"),
    ("Ruths Chris Steak House", "Steakhouse"),
    ("Mortons The Steakhouse", "Steakhouse"),
    ("Bahama Breeze", "Caribbean"),
    ("Seasons 52", "American"),
    ("Bonefish Grill", "Seafood"),
    ("Maggianos Little Italy", "Italian"),
    ("Cheesecake Factory", "American"),
    ("Eddie Vs Prime Seafood", "Seafood/Steakhouse"),
    ("Royals Chop House", "American/Steakhouse"),
]


async def seed_database():
    """Seed movies and restaurants if collections are empty."""
    if await db.movies.count_documents({}) == 0:
        docs = []
        for title, year, genre, week in NEW_RELEASE_MOVIES:
            docs.append({
                "id": str(uuid.uuid4()),
                "title": title,
                "year": year,
                "genre": genre,
                "category": "new_release",
                "week_number": week,
                "is_active": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        for title, year, genre in CLASSIC_MOVIES:
            docs.append({
                "id": str(uuid.uuid4()),
                "title": title,
                "year": year,
                "genre": genre,
                "category": "classic",
                "week_number": None,
                "is_active": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        await db.movies.insert_many(docs)

    if await db.restaurants.count_documents({}) == 0:
        docs = []
        for name, cuisine in BUDGET_RESTAURANTS:
            docs.append({
                "id": str(uuid.uuid4()),
                "name": name,
                "cuisine_type": cuisine,
                "price_range": "budget",
                "location": "Your Area",
                "is_active": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        for name, cuisine in UPSCALE_RESTAURANTS:
            docs.append({
                "id": str(uuid.uuid4()),
                "name": name,
                "cuisine_type": cuisine,
                "price_range": "upscale",
                "location": "Your Area",
                "is_active": True,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        await db.restaurants.insert_many(docs)


@app.on_event("startup")
async def on_startup():
    await seed_database()


# ---------- Routes ----------
@app.get("/api/")
async def root():
    return {"status": "ok", "service": "date-planner"}


@app.get("/api/movies")
async def get_movies():
    """Returns new releases (current week rotation) and shuffled classics."""
    cursor = db.movies.find({"is_active": True}, {"_id": 0})
    movies = await cursor.to_list(length=1000)

    # Weekly rotation logic (mirror frontend)
    import time, random
    current_week = int(time.time() // (7 * 24 * 60 * 60))
    w_a = current_week % 4 + 1
    w_b = (current_week - 1) % 4 + 1

    new_releases = [
        m for m in movies
        if m["category"] == "new_release"
        and (not m.get("week_number") or m["week_number"] in (w_a, w_b))
    ][:8]

    classics = [m for m in movies if m["category"] == "classic"]
    random.shuffle(classics)
    classics = classics[:8]

    return {"newReleases": new_releases, "popularClassics": classics}


@app.get("/api/restaurants")
async def get_restaurants(cuisine_type: str = Query(..., description="Cuisine label e.g. Italian")):
    """Returns budget + upscale restaurants matching a cuisine label."""
    regex = {"$regex": cuisine_type, "$options": "i"}
    cursor = db.restaurants.find(
        {"is_active": True, "cuisine_type": regex},
        {"_id": 0},
    ).sort([("price_range", 1), ("name", 1)])
    data = await cursor.to_list(length=1000)

    budget = [r for r in data if r["price_range"] == "budget"][:3]
    upscale = [r for r in data if r["price_range"] == "upscale"][:3]
    return budget + upscale


@app.post("/api/send-date-email")
async def send_date_email(payload: EmailRequest):
    """Records the date plan and 'sends' the confirmation (logged + stored)."""
    if not payload.email or not payload.title:
        raise HTTPException(status_code=400, detail="Missing required fields")

    doc = {
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "date": payload.date,
        "title": payload.title,
        "location": payload.location,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.date_plans.insert_one(doc)

    print(f"[Date Planner] Email queued for {payload.email}: {payload.title} @ {payload.date} ({payload.location})")
    return {"success": True, "message": "Email details logged successfully", "id": doc["id"]}
