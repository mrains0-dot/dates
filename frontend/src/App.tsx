import React from "react";
import { Switch, Route, Router as WouterRouter, useLocation, useSearch } from "wouter";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Heart, CalendarIcon, Clock, ChevronRight, Check, MapPin, Utensils, Film, TreePine, ChefHat, Wine, Sparkles, Music, Camera, Sun, Moon, Send, Loader2, Mail, Flame, Soup, Beef, Fish, Waves, Flower, Flower2, Mountain, Palmtree, Trees, Sunset, Snail, Footprints, Zap, Wheat, Sandwich, Cake, Pizza, PartyPopper, Palette, Frame, Landmark, Telescope, Brush, Coffee, BookOpen, Lock, Building2, Grape, GlassWater, Martini, Citrus, Star, Globe, Droplets, Tent } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import confetti from "canvas-confetti";

const API_BASE = (import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "") as string;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Date option illustrations
const DateIllustrations = {
  restaurant: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Plate */}
      <circle cx="50" cy="58" r="22" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="2.5"/>
      <circle cx="50" cy="58" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      {/* Fork */}
      <path d="M24 18 L24 38 Q24 42 28 42 L28 80 M28 18 L28 32 M32 18 L32 32 Q32 42 28 42" stroke="hsl(var(--primary))" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Knife */}
      <path d="M72 18 Q78 20 78 35 L72 38 L72 80" stroke="hsl(var(--primary))" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cinema: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Film strip */}
      <rect x="22" y="26" width="56" height="52" rx="4" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* Sprocket holes */}
      <rect x="26" y="31" width="5" height="5" rx="1" fill="hsl(var(--primary))"/>
      <rect x="26" y="43" width="5" height="5" rx="1" fill="hsl(var(--primary))"/>
      <rect x="26" y="55" width="5" height="5" rx="1" fill="hsl(var(--primary))"/>
      <rect x="26" y="67" width="5" height="5" rx="1" fill="hsl(var(--primary))"/>
      <rect x="69" y="31" width="5" height="5" rx="1" fill="hsl(var(--primary))"/>
      <rect x="69" y="43" width="5" height="5" rx="1" fill="hsl(var(--primary))"/>
      <rect x="69" y="55" width="5" height="5" rx="1" fill="hsl(var(--primary))"/>
      <rect x="69" y="67" width="5" height="5" rx="1" fill="hsl(var(--primary))"/>
      {/* Center frames */}
      <rect x="36" y="32" width="28" height="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <rect x="36" y="54" width="28" height="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
    </svg>
  ),
  picnic: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Basket handle */}
      <path d="M30 50 Q30 28 50 28 Q70 28 70 50" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Basket body */}
      <path d="M24 50 L76 50 L70 80 L30 80 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      {/* Weave verticals */}
      <line x1="38" y1="50" x2="36" y2="80" stroke="hsl(var(--primary) / 0.6)" strokeWidth="1.2"/>
      <line x1="50" y1="50" x2="50" y2="80" stroke="hsl(var(--primary) / 0.6)" strokeWidth="1.2"/>
      <line x1="62" y1="50" x2="64" y2="80" stroke="hsl(var(--primary) / 0.6)" strokeWidth="1.2"/>
      {/* Weave horizontals */}
      <line x1="26" y1="60" x2="74" y2="60" stroke="hsl(var(--primary) / 0.6)" strokeWidth="1.2"/>
      <line x1="28" y1="70" x2="72" y2="70" stroke="hsl(var(--primary) / 0.6)" strokeWidth="1.2"/>
      {/* Lid band */}
      <rect x="24" y="47" width="52" height="6" rx="2" fill="hsl(var(--primary))" />
    </svg>
  ),
  hiking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Sun */}
      <circle cx="70" cy="30" r="5" fill="hsl(var(--primary))" />
      {/* Back peak */}
      <path d="M14 78 L40 40 L56 60 L70 44 L86 78 Z" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      {/* Snow caps */}
      <path d="M34 48 L40 40 L46 49 L43 49 L40 45 L37 49 Z" fill="hsl(var(--primary))" />
      <path d="M65 51 L70 44 L75 51 L72 51 L70 48 L68 51 Z" fill="hsl(var(--primary))" />
      {/* Ground line */}
      <line x1="12" y1="78" x2="88" y2="78" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  cooking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Steam curls */}
      <path d="M40 20 Q44 25 40 30 Q36 35 40 40" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M50 16 Q54 21 50 26 Q46 31 50 36" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M60 20 Q64 25 60 30 Q56 35 60 40" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Pot lid */}
      <rect x="22" y="48" width="56" height="6" rx="2" fill="hsl(var(--primary))"/>
      <circle cx="50" cy="46" r="2.5" fill="hsl(var(--primary))" />
      {/* Pot body */}
      <path d="M26 54 L74 54 L70 82 L30 82 Z" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      {/* Pot side handles */}
      <path d="M26 60 L20 60 L20 70 L26 70" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M74 60 L80 60 L80 70 L74 70" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  museum: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Pediment */}
      <path d="M16 42 L50 22 L84 42 Z" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      {/* Architrave */}
      <rect x="18" y="42" width="64" height="6" fill="hsl(var(--primary))" />
      {/* Columns */}
      <rect x="24" y="48" width="7" height="28" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <rect x="39" y="48" width="7" height="28" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <rect x="54" y="48" width="7" height="28" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <rect x="69" y="48" width="7" height="28" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* Base/steps */}
      <rect x="14" y="76" width="72" height="5" fill="hsl(var(--primary))" />
    </svg>
  ),
  cocktails: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Glass cone */}
      <path d="M24 28 L76 28 L52 62 L48 62 Z" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Liquid line */}
      <line x1="30" y1="36" x2="70" y2="36" stroke="hsl(var(--primary))" strokeWidth="1.4" />
      {/* Stem */}
      <line x1="50" y1="62" x2="50" y2="82" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
      {/* Base */}
      <line x1="36" y1="84" x2="64" y2="84" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
      {/* Olive pick */}
      <line x1="56" y1="22" x2="62" y2="40" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      <circle cx="59" cy="31" r="3.2" fill="hsl(var(--primary))" />
    </svg>
  ),
  stargazing: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Crescent moon */}
      <path d="M58 24 A 22 22 0 1 0 76 60 A 17 17 0 1 1 58 24 Z" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      {/* Stars */}
      <path d="M26 32 L28 37 L33 39 L28 41 L26 46 L24 41 L19 39 L24 37 Z" fill="hsl(var(--primary))" />
      <path d="M30 70 L31 73 L34 74 L31 75 L30 78 L29 75 L26 74 L29 73 Z" fill="hsl(var(--primary))" />
      <path d="M70 80 L71 83 L74 84 L71 85 L70 88 L69 85 L66 84 L69 83 Z" fill="hsl(var(--primary))" />
      <circle cx="42" cy="22" r="1.5" fill="hsl(var(--primary))" />
      <circle cx="20" cy="60" r="1.5" fill="hsl(var(--primary))" />
      <circle cx="48" cy="78" r="1.5" fill="hsl(var(--primary))" />
    </svg>
  ),
  custom: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      {/* Pencil body */}
      <path d="M30 78 L26 74 L60 40 L66 46 Z" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      {/* Pencil tip */}
      <path d="M30 78 L22 80 L24 72 Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Eraser end */}
      <path d="M60 40 L66 46 L72 40 L66 34 Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Sparkle */}
      <path d="M76 60 L78 65 L83 67 L78 69 L76 74 L74 69 L69 67 L74 65 Z" fill="hsl(var(--primary))"/>
      <circle cx="80" cy="50" r="2" fill="hsl(var(--primary))" />
      <circle cx="68" cy="76" r="1.5" fill="hsl(var(--primary))" />
    </svg>
  ),
};

// Food types — themed lucide icons (instead of bright emoji)
const FOOD_TYPES = [
  { id: "italian", label: "Italian", Icon: Utensils },
  { id: "mexican", label: "Mexican", Icon: Flame },
  { id: "asian", label: "Asian", Icon: Soup },
  { id: "american", label: "American", Icon: Beef },
  { id: "seafood", label: "Seafood", Icon: Fish },
  { id: "steakhouse", label: "Steakhouse", Icon: ChefHat },
];

// Fetch movies from backend
async function fetchMovies() {
  const response = await fetch(`${API_BASE}/api/movies`);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return await response.json();
}

// Fetch restaurants from backend
async function fetchRestaurants(cuisineType: string) {
  const response = await fetch(
    `${API_BASE}/api/restaurants?cuisine_type=${encodeURIComponent(cuisineType)}`,
  );
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  return await response.json();
}

// New releases (updated weekly) and popular classics
const getMovies = () => {
  const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));

  const newReleases = [
    { title: "Venom: The Last Dance", year: "2024", genre: "Action" },
    { title: "Gladiator II", year: "2024", genre: "Drama" },
    { title: "Wicked", year: "2024", genre: "Musical" },
    { title: "Moana 2", year: "2024", genre: "Animation" },
    { title: "Red One", year: "2024", genre: "Action/Comedy" },
    { title: "Here", year: "2024", genre: "Drama" },
    { title: "A Real Pain", year: "2024", genre: "Comedy/Drama" },
    { title: "Conclave", year: "2024", genre: "Thriller" },
  ];

  const popularClassics = [
    { title: "The Shawshank Redemption", year: "1994", genre: "Drama" },
    { title: "The Godfather", year: "1972", genre: "Crime" },
    { title: "Pulp Fiction", year: "1994", genre: "Crime" },
    { title: "Forrest Gump", year: "1994", genre: "Drama" },
    { title: "The Matrix", year: "1999", genre: "Sci-Fi" },
    { title: "Fight Club", year: "1999", genre: "Drama" },
    { title: "Inception", year: "2010", genre: "Sci-Fi" },
    { title: "The Dark Knight", year: "2008", genre: "Action" },
    { title: "Titanic", year: "1997", genre: "Romance" },
    { title: "Casablanca", year: "1942", genre: "Romance" },
    { title: "Pretty Woman", year: "1990", genre: "Romance" },
    { title: "When Harry Met Sally", year: "1989", genre: "Romance" },
    { title: "The Notebook", year: "2004", genre: "Romance" },
    { title: "La La Land", year: "2016", genre: "Musical" },
    { title: "Eternal Sunshine", year: "2004", genre: "Romance/Sci-Fi" },
  ];

  // Shuffle popular classics on each restart
  const shuffled = popularClassics.sort(() => Math.random() - 0.5).slice(0, 8);

  return { newReleases, popularClassics: shuffled };
};

// ─── User-local storage helpers ──────────────────────────────────────────
function getUserId(): string {
  let uid = localStorage.getItem("dp:user-id");
  if (!uid) {
    uid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    localStorage.setItem("dp:user-id", uid);
  }
  return uid;
}

function getZipCode(): string {
  return localStorage.getItem("dp:zip-code") || "";
}
function setZipCode(z: string) {
  localStorage.setItem("dp:zip-code", z);
}

type AvailabilityWindow = { date: string; start: string; end: string };

async function fetchAvailability(userId: string): Promise<AvailabilityWindow[]> {
  const r = await fetch(`${API_BASE}/api/availability/${userId}`);
  if (!r.ok) return [];
  const d = await r.json();
  return (d.windows || []) as AvailabilityWindow[];
}

async function saveAvailability(userId: string, windows: AvailabilityWindow[]) {
  await fetch(`${API_BASE}/api/availability`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, windows }),
  });
}

// Generate next 14 days
function next14Days(): string[] {
  const today = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
];

// Is the given (date HH:MM) inside any availability window?
function isAvailable(date: string, time: string, windows: AvailabilityWindow[]): boolean {
  if (!windows.length) return true; // no availability set → don't block
  return windows.some(
    (w) => w.date === date && w.start <= time && time < w.end,
  );
}

// ───────────────────────────────────────────────────────────────────────


function Landing() {
  const [, navigate] = useLocation();
  const [pos, setPos] = React.useState({ x: 50, y: 82 });

  const escape = React.useCallback(() => {
    setPos((prev) => {
      let nx: number, ny: number;
      let attempts = 0;
      do {
        nx = 10 + Math.random() * 68;
        ny = 12 + Math.random() * 70;
        attempts++;
      } while (
        attempts < 20 &&
        Math.abs(nx - prev.x) < 20 &&
        Math.abs(ny - prev.y) < 20
      );
      return { x: nx, y: ny };
    });
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative select-none">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-[7%] left-[10%] w-8 h-8 text-primary/10 fill-primary/10 rotate-[-15deg]" />
        <Heart className="absolute top-[18%] right-[9%] w-14 h-14 text-primary/8 fill-primary/8 rotate-[12deg]" />
        <Heart className="absolute top-[50%] left-[50%] w-64 h-64 text-primary/4 fill-primary/4 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <Heart className="w-14 h-14 text-primary fill-primary mb-8 animate-pulse" />

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground mb-14 leading-tight max-w-lg">
          Will you go on a date with me?
        </h1>

        <Button
          size="lg"
          className="h-16 px-14 text-xl font-semibold rounded-2xl gap-3 shadow-lg"
          onClick={() => navigate("/when")}
          data-testid="yes-button"
        >
          <Heart className="w-5 h-5 fill-current" />
          Yes!
        </Button>
      </div>

      <div
        style={{
          position: "fixed",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.18s cubic-bezier(.22,1,.36,1), top 0.18s cubic-bezier(.22,1,.36,1)",
          zIndex: 50,
        }}
        onMouseEnter={escape}
        onClick={escape}
        aria-hidden="true"
      >
        <Button
          size="lg"
          variant="outline"
          className="h-16 px-14 text-xl font-semibold rounded-2xl gap-3 border-2 pointer-events-none"
          tabIndex={-1}
          data-testid="no-thanks-button"
        >
          No thanks
        </Button>
      </div>
    </div>
  );
}

// When Page
function When() {
  const [, navigate] = useLocation();
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [windows, setWindows] = React.useState<AvailabilityWindow[]>([]);
  const userId = React.useMemo(() => getUserId(), []);

  React.useEffect(() => {
    fetchAvailability(userId).then(setWindows).catch(() => {});
  }, [userId]);

  const conflict = date && time && windows.length > 0 && !isAvailable(date, time, windows);

  function handleContinue() {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (time) params.set("time", time);
    navigate(`/where?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <Heart className="w-10 h-10 text-primary fill-primary" />
          <button
            onClick={() => navigate("/availability")}
            className="text-xs font-medium text-primary/80 hover:text-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 transition-colors"
            data-testid="manage-availability-button"
          >
            <CalendarIcon className="w-3.5 h-3.5" /> My availability
          </button>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-2 leading-tight">
          When?
        </h1>
        <p className="text-muted-foreground mb-10">Pick a day and time for your date.</p>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-primary" /> Date
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-14 rounded-2xl border border-border bg-card px-4 text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
              data-testid="date-input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-14 rounded-2xl border border-border bg-card px-4 text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
              data-testid="time-input"
            />
          </div>

          {conflict && (
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/8 px-4 py-3 text-sm text-primary flex items-start gap-2" data-testid="availability-conflict">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>This time is outside your availability. You can still continue — or update <button onClick={() => navigate("/availability")} className="underline font-medium">My availability</button>.</span>
            </div>
          )}
        </div>

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold mt-8 gap-2"
          onClick={handleContinue}
          disabled={!date || !time}
          data-testid="continue-button"
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Availability Editor ─────────────────────────────────────────────────
function Availability() {
  const [, navigate] = useLocation();
  const userId = React.useMemo(() => getUserId(), []);
  const days = React.useMemo(() => next14Days(), []);
  const [windows, setWindows] = React.useState<AvailabilityWindow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [savedFlash, setSavedFlash] = React.useState(false);

  React.useEffect(() => {
    fetchAvailability(userId)
      .then(setWindows)
      .finally(() => setLoading(false));
  }, [userId]);

  function isSlotOn(date: string, time: string): boolean {
    return windows.some((w) => w.date === date && w.start <= time && time < w.end);
  }

  function toggleSlot(date: string, time: string) {
    // toggle a 1-hour window starting at `time`
    const endHour = (parseInt(time.slice(0, 2)) + 1).toString().padStart(2, "0") + ":00";
    setWindows((prev) => {
      const idx = prev.findIndex((w) => w.date === date && w.start === time);
      if (idx >= 0) {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      }
      return [...prev, { date, start: time, end: endHour }];
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveAvailability(userId, windows);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
    } finally {
      setSaving(false);
    }
  }

  const dayLabel = (iso: string) => {
    const d = new Date(iso + "T00:00:00");
    return {
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  return (
    <div className="min-h-screen bg-background py-10 px-5" data-testid="availability-page">
      <div className="w-full max-w-3xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/when")}
          className="mb-4 -ml-2"
          data-testid="back-button"
        >
          ← Back
        </Button>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
          My availability
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Tap the hours you're free over the next 14 days. The "When?" picker will warn about conflicts.
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-7 h-7 text-primary animate-spin" />
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-4 overflow-x-auto">
            <div className="grid" style={{ gridTemplateColumns: `auto repeat(${TIME_SLOTS.length}, minmax(38px,1fr))`, gap: "4px" }}>
              {/* header row */}
              <div />
              {TIME_SLOTS.map((t) => (
                <div key={t} className="text-[10px] text-muted-foreground text-center font-medium pb-1">
                  {parseInt(t.slice(0, 2)) % 12 || 12}{parseInt(t.slice(0, 2)) >= 12 ? "p" : "a"}
                </div>
              ))}
              {/* one row per day */}
              {days.map((d) => {
                const lbl = dayLabel(d);
                return (
                  <React.Fragment key={d}>
                    <div className="text-xs text-foreground pr-2 py-1 flex flex-col items-end justify-center leading-tight">
                      <span className="font-medium">{lbl.weekday}</span>
                      <span className="text-muted-foreground">{lbl.month} {lbl.day}</span>
                    </div>
                    {TIME_SLOTS.map((t) => {
                      const on = isSlotOn(d, t);
                      return (
                        <button
                          key={`${d}-${t}`}
                          onClick={() => toggleSlot(d, t)}
                          data-testid={`slot-${d}-${t}`}
                          className={`h-9 rounded-md border transition-colors text-[10px] font-medium ${
                            on
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5"
                          }`}
                          aria-pressed={on}
                          aria-label={`${d} ${t}`}
                        >
                          {on ? "✓" : ""}
                        </button>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mt-6">
          <Button
            size="lg"
            className="flex-1 h-14 rounded-2xl text-base font-semibold gap-2"
            onClick={handleSave}
            disabled={saving || loading}
            data-testid="save-availability-button"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-5 h-5" />}
            {savedFlash ? "Saved" : "Save availability"}
          </Button>
          {windows.length > 0 && (
            <Button
              variant="outline"
              size="lg"
              className="h-14 rounded-2xl gap-2"
              onClick={() => setWindows([])}
              data-testid="clear-availability-button"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── AI Recommendation Panel ─────────────────────────────────────────────
type Recommendation = {
  name: string;
  category: string;
  address: string;
  distance_m: number;
  reason: string;
};
type RecommendResponse = {
  location: { name: string; admin1: string; lat: number; lon: number };
  weather: { summary: string; temp_max_f: number; temp_min_f: number; precip_chance_pct: number | null } | null;
  places_total: number;
  recommendations: Recommendation[];
};

function RecommendPanel({ dateType, preferences }: { dateType: string; preferences?: string }) {
  const search = useSearch();
  const date = new URLSearchParams(search).get("date") || undefined;
  const [zip, setZip] = React.useState<string>(getZipCode());
  const [zipDraft, setZipDraft] = React.useState<string>("");
  const [data, setData] = React.useState<RecommendResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [editing, setEditing] = React.useState(false);

  async function load(z: string) {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${API_BASE}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date_type: dateType, zip_code: z, date, preferences }),
      });
      if (!r.ok) throw new Error(await r.text());
      const d = (await r.json()) as RecommendResponse;
      setData(d);
    } catch (e: any) {
      setError(e?.message?.slice(0, 120) || "Couldn't load nearby ideas.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (zip) load(zip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zip, dateType, date, preferences]);

  if (!zip || editing) {
    return (
      <div className="bg-card border border-primary/20 rounded-2xl p-4 mb-6" data-testid="recommend-zip-form">
        <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Get tailored ideas near you
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Enter your zip code — we'll pull real nearby spots, check the weather, and pick the best matches.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={zipDraft}
            onChange={(e) => setZipDraft(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
            placeholder="e.g. 10001"
            inputMode="numeric"
            maxLength={5}
            className="flex-1 h-11 rounded-xl border border-border bg-background px-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            data-testid="zip-input"
          />
          <Button
            size="default"
            className="h-11 rounded-xl px-4"
            disabled={zipDraft.length < 5}
            onClick={() => {
              setZipCode(zipDraft);
              setZip(zipDraft);
              setEditing(false);
            }}
            data-testid="zip-save-button"
          >
            Use this
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-primary/20 rounded-2xl p-4 mb-6" data-testid="recommend-panel">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Recommended near {data?.location.name || zip}
        </div>
        <button
          onClick={() => { setZipDraft(zip); setEditing(true); }}
          className="text-[11px] text-muted-foreground hover:text-primary underline-offset-2 hover:underline"
          data-testid="change-zip-button"
        >
          change
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" /> Finding ideas based on weather & nearby spots...
        </div>
      )}
      {error && !loading && (
        <p className="text-xs text-muted-foreground">{error}</p>
      )}

      {!loading && data && (
        <>
          {data.weather && (
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3">
              <Sun className="w-3.5 h-3.5 text-primary/70" />
              {data.weather.summary}, {Math.round(data.weather.temp_min_f)}–{Math.round(data.weather.temp_max_f)}°F
              {typeof data.weather.precip_chance_pct === "number" && (
                <> · {data.weather.precip_chance_pct}% precip</>
              )}
            </div>
          )}

          {data.recommendations.length === 0 ? (
            <p className="text-xs text-muted-foreground">No nearby matches found. Try a different zip.</p>
          ) : (
            <div className="space-y-2">
              {data.recommendations.map((rec, i) => (
                <div key={i} className="rounded-xl border border-border bg-background/60 p-3" data-testid={`recommendation-${i}`}>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{rec.name}</span>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">
                      {(rec.distance_m / 1000).toFixed(1)} km
                    </span>
                  </div>
                  {rec.address && (
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-1.5">
                      <MapPin className="w-3 h-3" /> {rec.address}
                    </div>
                  )}
                  <p className="text-[12px] text-foreground/80 leading-snug italic">"{rec.reason}"</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────

// Where Page - Main date type selection
function Where() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [selected, setSelected] = React.useState<string | null>(null);

  const DATE_OPTIONS = [
    { id: "restaurant", label: "Restaurant", icon: Utensils, Illustration: DateIllustrations.restaurant },
    { id: "cinema", label: "Movie Night", icon: Film, Illustration: DateIllustrations.cinema },
    { id: "picnic", label: "Picnic in the Park", icon: TreePine, Illustration: DateIllustrations.picnic },
    { id: "hiking", label: "Nature Hike", icon: Sun, Illustration: DateIllustrations.hiking },
    { id: "cooking", label: "Cook Together", icon: ChefHat, Illustration: DateIllustrations.cooking },
    { id: "museum", label: "Museum or Gallery", icon: Camera, Illustration: DateIllustrations.museum },
    { id: "cocktails", label: "Cocktails & Drinks", icon: Wine, Illustration: DateIllustrations.cocktails },
    { id: "stargazing", label: "Stargazing", icon: Moon, Illustration: DateIllustrations.stargazing },
    { id: "custom", label: "What did you have in mind?", icon: Sparkles, Illustration: DateIllustrations.custom },
  ];

  function handleSelect(id: string) {
    const params = new URLSearchParams(search);

    if (id === "restaurant") {
      navigate(`/where/restaurant?${params.toString()}`);
    } else if (id === "cinema") {
      navigate(`/where/cinema?${params.toString()}`);
    } else if (id === "custom") {
      navigate(`/where/custom?${params.toString()}`);
    } else {
      navigate(`/where/${id}?${params.toString()}`);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Heart className="w-10 h-10 text-primary fill-primary mb-6" />

        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-2 leading-tight">
          Where?
        </h1>
        <p className="text-muted-foreground mb-8">Pick the kind of date you have in mind.</p>

        <div className="grid grid-cols-2 gap-3">
          {DATE_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-border bg-card hover:border-primary/40 hover:bg-primary/5 p-6 transition-all duration-150"
              >
                <option.Illustration />
                <span className="text-sm font-medium text-foreground text-center">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Restaurant Sub-Page - Food Type Selection
function WhereRestaurant() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  function handleSelect(typeId: string) {
    setSelectedType(typeId);
  }

  function handleContinue() {
    if (selectedType) {
      const params = new URLSearchParams(search);
      params.set("foodType", selectedType);
      navigate(`/where/restaurant/business?${params.toString()}`);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/where?" + search)}
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <DateIllustrations.restaurant />
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
              What cuisine?
            </h1>
            <p className="text-muted-foreground text-sm">Choose your favorite food type</p>
          </div>
        </div>

        <RecommendPanel dateType="restaurant" />

        <div className="grid grid-cols-2 gap-3 mb-6">
          {FOOD_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            const Icon = type.Icon;
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all duration-150 ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected ? "bg-primary/15" : "bg-primary/8"
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-primary/70"}`} strokeWidth={1.75} />
                </div>
                <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold gap-2"
          onClick={handleContinue}
          disabled={!selectedType}
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// Restaurant Business Selection
function WhereRestaurantBusiness() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const foodTypeId = params.get("foodType") || "";
  const [selectedRestaurant, setSelectedRestaurant] = React.useState<string | null>(null);

  const foodType = FOOD_TYPES.find(t => t.id === foodTypeId);

  const { data: restaurants = [], isLoading } = useQuery({
    queryKey: ['restaurants', foodTypeId],
    queryFn: () => fetchRestaurants(foodType?.label || ''),
    enabled: !!foodType,
  });

  function handleContinue() {
    if (selectedRestaurant) {
      const params = new URLSearchParams(search);
      params.set("title", `${foodType?.label} at ${selectedRestaurant}`);
      params.set("venueId", "restaurant");
      params.set("location", selectedRestaurant);
      params.set("foodType", foodTypeId || "");
      params.set("restaurant", selectedRestaurant);
      navigate(`/confirm?${params.toString()}`);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/where/restaurant?" + search)}
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>

        <div className="flex items-center gap-3 mb-6">
          {foodType && (
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <foodType.Icon className="w-7 h-7 text-primary" strokeWidth={1.75} />
            </div>
          )}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
              {foodType?.label} Restaurants
            </h1>
            <p className="text-muted-foreground text-sm">Budget-friendly and upscale options</p>
          </div>
        </div>

        <RecommendPanel dateType="restaurant" preferences={foodType?.label || ""} />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Budget-Friendly
              </h3>
              <div className="space-y-2">
                {restaurants.filter((r: any) => r.price_range === 'budget').map((restaurant: any) => {
                  const isSelected = selectedRestaurant === restaurant.name;
                  return (
                    <button
                      key={restaurant.id}
                      onClick={() => setSelectedRestaurant(restaurant.name)}
                      className={`w-full flex items-center justify-between rounded-2xl border-2 p-4 transition-all duration-150 ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Utensils className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {restaurant.name}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Upscale Dining
              </h3>
              <div className="space-y-2">
                {restaurants.filter((r: any) => r.price_range === 'upscale').map((restaurant: any) => {
                  const isSelected = selectedRestaurant === restaurant.name;
                  return (
                    <button
                      key={restaurant.id}
                      onClick={() => setSelectedRestaurant(restaurant.name)}
                      className={`w-full flex items-center justify-between rounded-2xl border-2 p-4 transition-all duration-150 ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Utensils className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {restaurant.name}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold gap-2"
          onClick={handleContinue}
          disabled={!selectedRestaurant || isLoading}
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// Pokeball icon — themed inline SVG matching app's stroke style
const Pokeball = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h6" />
    <path d="M15 12h6" />
    <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.1" fill="hsl(var(--card))" stroke="none" />
  </svg>
);

// Cinema Sub-Page
function WhereCinema() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [selectedMovie, setSelectedMovie] = React.useState<{ title: string; year: string; genre: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<"new" | "classics" | "anime">("new");

  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  const currentMovies =
    selectedCategory === "new" ? (movies?.newReleases || []) :
    selectedCategory === "classics" ? (movies?.popularClassics || []) :
    (movies?.animeSeries || []);

  const continueLabel =
    selectedCategory === "anime" ? "Anime" : "Movie";

  function handleContinue() {
    if (selectedMovie) {
      const params = new URLSearchParams(search);
      params.set("title", `${continueLabel}: ${selectedMovie.title} (${selectedMovie.year})`);
      params.set("venueId", "cinema");
      params.set("location", selectedCategory === "anime" ? "Movie Night (Anime)" : "Cinema");
      params.set("movie", selectedMovie.title);
      params.set("year", selectedMovie.year);
      params.set("genre", selectedMovie.genre);
      navigate(`/confirm?${params.toString()}`);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/where?" + search)}
          className="mb-4 -ml-2"
        >
          ← Back
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <DateIllustrations.cinema />
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
              Movie Night
            </h1>
            <p className="text-muted-foreground text-sm">What should we watch?</p>
          </div>
        </div>

        <RecommendPanel dateType="cinema" />

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setSelectedCategory("new"); setSelectedMovie(null); }}
            data-testid="tab-new"
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "new"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-1.5" />
            New
          </button>
          <button
            onClick={() => { setSelectedCategory("classics"); setSelectedMovie(null); }}
            data-testid="tab-classics"
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "classics"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Heart className="w-4 h-4 inline mr-1.5" />
            Classics
          </button>
          <button
            onClick={() => { setSelectedCategory("anime"); setSelectedMovie(null); }}
            data-testid="tab-anime"
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "anime"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Pokeball className="w-4 h-4 inline mr-1.5 -mt-0.5" />
            Anime
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-2 mb-6 max-h-80 overflow-y-auto">
            {currentMovies.map((movie: any) => {
              const isSelected = selectedMovie?.title === movie.title;
              return (
                <button
                  key={movie.title}
                  onClick={() => setSelectedMovie({ title: movie.title, year: movie.year, genre: movie.genre })}
                  className={`w-full flex items-start justify-between rounded-2xl border-2 p-4 text-left transition-all duration-150 ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Film className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`font-medium text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {movie.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground ml-6">
                      <span>{movie.year}</span>
                      <span className="text-border">•</span>
                      <span>{movie.genre}</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold gap-2"
          onClick={handleContinue}
          disabled={!selectedMovie || isLoading}
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// Generic Rich Sub-Page for picnic/hiking/cooking/museum/cocktails/stargazing
type DateGroup = {
  label: string;
  key: string;
  items: { id: string; label: string; icon: string; desc?: string }[];
};
type DateOptions = { title: string; subtitle: string; groups: DateGroup[] };

async function fetchDateOptions(typeId: string): Promise<DateOptions> {
  const response = await fetch(`${API_BASE}/api/date-options/${typeId}`);
  if (!response.ok) throw new Error('Failed to fetch options');
  return await response.json();
}

const ILLUSTRATION_MAP: Record<string, () => JSX.Element> = {
  picnic: DateIllustrations.picnic,
  hiking: DateIllustrations.hiking,
  cooking: DateIllustrations.cooking,
  museum: DateIllustrations.museum,
  cocktails: DateIllustrations.cocktails,
  stargazing: DateIllustrations.stargazing,
};

// Lucide icon registry for sub-page option items (themed, simple)
const SUB_ICONS: Record<string, LucideIcon> = {
  Waves, Flower, Flower2, TreePine, Mountain, Palmtree, Trees, Sunset,
  Snail, Footprints, Zap, Wheat, Sandwich, Cake, Wine, Utensils, Pizza,
  Fish, Soup, Flame, PartyPopper, Music, Palette, Frame, Camera,
  Landmark, Telescope, Brush, Coffee, BookOpen, Lock, Building2, Grape,
  GlassWater, Martini, Citrus, Sparkles, Moon, Star, Globe, Tent,
  Droplets, Heart,
};

function WhereGeneric({ params: routeParams }: { params: { typeId: string } }) {
  const [, navigate] = useLocation();
  const search = useSearch();
  const typeId = routeParams.typeId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['date-options', typeId],
    queryFn: () => fetchDateOptions(typeId),
  });

  const [selections, setSelections] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    setSelections({});
  }, [typeId]);

  React.useEffect(() => {
    if (isError) navigate("/where?" + search);
  }, [isError, navigate, search]);

  const Illustration = ILLUSTRATION_MAP[typeId];
  const allGroupsAnswered =
    data ? data.groups.every((g) => !!selections[g.key]) : false;

  function handleContinue() {
    if (!data || !allGroupsAnswered) return;
    const params = new URLSearchParams(search);

    const labelParts: string[] = [];
    data.groups.forEach((g) => {
      const chosen = g.items.find((i) => i.id === selections[g.key]);
      if (chosen) {
        labelParts.push(chosen.label);
        params.set(g.key, chosen.id);
      }
    });

    params.set("title", `${data.title}: ${labelParts.join(" · ")}`);
    params.set("venueId", typeId);
    // Use the first group's chosen label as the "location"-style descriptor
    const firstChosen = data.groups[0]
      ? data.groups[0].items.find((i) => i.id === selections[data.groups[0].key])
      : null;
    params.set("location", firstChosen ? firstChosen.label : "");

    navigate(`/confirm?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12" data-testid={`where-${typeId}-page`}>
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/where?" + search)}
          className="mb-4 -ml-2"
          data-testid="back-button"
        >
          ← Back
        </Button>

        <div className="flex items-center gap-3 mb-6">
          {Illustration && <Illustration />}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
              {data?.title ?? "Loading..."}
            </h1>
            <p className="text-muted-foreground text-sm">{data?.subtitle ?? ""}</p>
          </div>
        </div>

        <RecommendPanel dateType={typeId} />

        {isLoading || !data ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6 mb-6">
            {data.groups.map((group) => (
              <div key={group.key}>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {group.label}
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {group.items.map((item) => {
                    const isSelected = selections[group.key] === item.id;
                    const ItemIcon = SUB_ICONS[item.icon] || Heart;
                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          setSelections((prev) => ({ ...prev, [group.key]: item.id }))
                        }
                        data-testid={`option-${group.key}-${item.id}`}
                        className={`flex flex-col items-start gap-1 rounded-2xl border-2 p-3 text-left transition-all duration-150 ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "bg-primary/15" : "bg-primary/8"
                          }`}>
                            <ItemIcon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-primary/70"}`} strokeWidth={1.75} />
                          </div>
                          <span className={`text-sm font-medium flex-1 ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {item.label}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                        </div>
                        {item.desc && (
                          <span className="text-[11px] text-muted-foreground leading-snug pl-10">
                            {item.desc}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold gap-2"
          onClick={handleContinue}
          disabled={!allGroupsAnswered || isLoading}
          data-testid="continue-button"
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// Custom Sub-Page — user types in their own date idea
function WhereCustom() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [idea, setIdea] = React.useState("");
  const [place, setPlace] = React.useState("");

  function handleContinue() {
    const trimmedIdea = idea.trim();
    if (!trimmedIdea) return;
    const params = new URLSearchParams(search);
    params.set("title", trimmedIdea);
    params.set("venueId", "custom");
    params.set("location", place.trim());
    navigate(`/confirm?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12" data-testid="where-custom-page">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/where?" + search)}
          className="mb-4 -ml-2"
          data-testid="back-button"
        >
          ← Back
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <DateIllustrations.custom />
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
              Your idea
            </h1>
            <p className="text-muted-foreground text-sm">Tell me what you have in mind</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> What sounds fun?
            </label>
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleContinue(); }}
              placeholder="e.g. Bowling, mini golf, paint and sip..."
              maxLength={120}
              autoFocus
              className="w-full h-14 rounded-2xl border border-border bg-card px-4 text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
              data-testid="custom-idea-input"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Where? <span className="text-muted-foreground/70 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleContinue(); }}
              placeholder="A place, neighborhood, or vibe"
              maxLength={120}
              className="w-full h-14 rounded-2xl border border-border bg-card px-4 text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
              data-testid="custom-place-input"
            />
          </div>
        </div>

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold mt-8 gap-2"
          onClick={handleContinue}
          disabled={!idea.trim()}
          data-testid="continue-button"
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

// Confirm Page
function Confirm() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const date = params.get("date") ?? "";
  const time = params.get("time") ?? "";
  const title = params.get("title") ?? "Our Date";
  const location = params.get("location") ?? "";

  const [showSummary, setShowSummary] = React.useState(false);
  const [emailStatus, setEmailStatus] = React.useState<"idle" | "sending" | "sent" | "failed">("idle");

  const RECIPIENT_EMAIL = "mrains0@gmail.com";

  const scheduledAt = date && time ? new Date(`${date}T${time}`) : null;
  const formattedDate = scheduledAt
    ? scheduledAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + ' at ' + scheduledAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : null;

  // Unique fingerprint per date plan — used to dedupe sends across mounts/refreshes
  const planKey = React.useMemo(
    () => `dp:${RECIPIENT_EMAIL}|${formattedDate ?? ''}|${title}|${location}`,
    [formattedDate, title, location],
  );

  React.useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#BE123C", "#E11D48", "#FB7185"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#BE123C", "#E11D48", "#FB7185"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSummary(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-send the date details to the fixed recipient — only ONCE per unique plan
  React.useEffect(() => {
    // Already sent for this plan in a previous visit → mark as sent, don't resend
    try {
      if (localStorage.getItem(planKey) === "sent") {
        setEmailStatus("sent");
        return;
      }
    } catch {
      // localStorage unavailable — fall through and send
    }

    // In-flight guard for this mount (handles React 18 StrictMode double-invoke / HMR)
    let cancelled = false;
    const inFlightKey = `${planKey}:inflight`;
    try {
      if (sessionStorage.getItem(inFlightKey) === "1") {
        setEmailStatus("sending");
        return;
      }
      sessionStorage.setItem(inFlightKey, "1");
    } catch {
      // ignore
    }

    async function send() {
      setEmailStatus("sending");
      try {
        const response = await fetch(`${API_BASE}/api/send-date-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: RECIPIENT_EMAIL,
            date: formattedDate,
            title,
            location,
          }),
        });
        if (cancelled) return;
        if (response.ok) {
          setEmailStatus("sent");
          try { localStorage.setItem(planKey, "sent"); } catch { /* ignore */ }
        } else {
          setEmailStatus("failed");
        }
      } catch (e) {
        if (!cancelled) setEmailStatus("failed");
      } finally {
        try { sessionStorage.removeItem(inFlightKey); } catch { /* ignore */ }
      }
    }
    send();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planKey]);

  async function handleSendEmail() {
    setEmailStatus("sending");
    try {
      const response = await fetch(`${API_BASE}/api/send-date-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: RECIPIENT_EMAIL,
          date: formattedDate,
          title,
          location,
        }),
      });
      if (response.ok) {
        setEmailStatus("sent");
        try { localStorage.setItem(planKey, "sent"); } catch { /* ignore */ }
      } else {
        setEmailStatus("failed");
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setEmailStatus("failed");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden">
      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/15 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-12 h-12 text-primary fill-primary" />
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-3 leading-tight">
          Thank you for planning a day with me
        </h1>
        <p className="text-muted-foreground text-base mb-10">
          I knew you'd say yes ;)
        </p>

        <div className="bg-primary text-primary-foreground rounded-2xl p-5 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-primary-foreground/20">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-semibold">{title}</span>
          </div>
          <div className="space-y-2.5 text-sm">
            {formattedDate && (
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                <span>{formattedDate}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>

        {showSummary && (
          <>
            <div className="bg-card border-2 border-primary/20 rounded-2xl p-5 mb-6 text-left">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Date Plan Summary
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>When:</strong> {formattedDate || 'TBD'}</p>
                <p className="text-foreground"><strong>What:</strong> {title}</p>
                {location && <p className="text-foreground"><strong>Where:</strong> {location}</p>}
              </div>
            </div>

            {emailStatus === "sent" ? (
              <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-5 mb-6 text-left" data-testid="email-sent">
                <div className="flex items-center gap-2 text-primary">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">
                    Details sent to date :)
                  </span>
                </div>
              </div>
            ) : emailStatus === "failed" ? (
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-5 mb-6 text-left" data-testid="email-failed">
                <div className="flex items-start gap-2 text-foreground mb-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Couldn't send email just yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We'll deliver the plan to {RECIPIENT_EMAIL}.
                    </p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full h-12 rounded-xl text-base font-semibold gap-2"
                  onClick={handleSendEmail}
                  data-testid="retry-email-button"
                >
                  <Send className="w-4 h-4" />
                  Try again
                </Button>
              </div>
            ) : (
              <div className="bg-card border-2 border-primary/20 rounded-2xl p-5 mb-6 text-left" data-testid="email-sending">
                <div className="flex items-center gap-2 text-foreground">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="font-medium">
                    Sending details to {RECIPIENT_EMAIL}...
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        <Button
          size="lg"
          variant="outline"
          className="w-full h-13 rounded-2xl text-base font-semibold gap-2 border-primary/30 hover:bg-primary/5"
          onClick={() => window.location.reload()}
        >
          Start Over
        </Button>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/when" component={When} />
            <Route path="/availability" component={Availability} />
            <Route path="/where" component={Where} />
            <Route path="/where/restaurant" component={WhereRestaurant} />
            <Route path="/where/restaurant/business" component={WhereRestaurantBusiness} />
            <Route path="/where/cinema" component={WhereCinema} />
            <Route path="/where/custom" component={WhereCustom} />
            <Route path="/where/:typeId" component={WhereGeneric} />
            <Route path="/confirm" component={Confirm} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
