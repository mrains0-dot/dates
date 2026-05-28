import React from "react";
import { Switch, Route, Router as WouterRouter, useLocation, useSearch } from "wouter";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Heart, CalendarIcon, Clock, ChevronRight, Check, MapPin, Utensils, Film, TreePine, ChefHat, Wine, Sparkles, Music, Camera, Sun, Moon, Send, Loader2, Mail, Flame, Soup, Beef, Fish } from "lucide-react";
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
      <path d="M35 30 L40 55 L35 85 M65 30 L60 55 L65 85 M40 30 L40 55 L60 55 L60 30"
            stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="50" cy="25" r="4" fill="hsl(var(--primary))"/>
    </svg>
  ),
  cinema: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <rect x="15" y="30" width="70" height="50" rx="5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="3"/>
      <path d="M30 40 L45 50 L30 60 Z" fill="hsl(var(--primary))"/>
      <rect x="50" y="42" width="20" height="16" fill="hsl(var(--primary))" opacity="0.5"/>
      <circle cx="50" cy="25" r="8" stroke="hsl(var(--primary))" strokeWidth="2" fill="none"/>
    </svg>
  ),
  picnic: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      <path d="M25 35 Q50 25 75 35 L75 85 L25 85 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <path d="M35 45 L65 45 M35 55 L65 55" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <circle cx="40" cy="65" r="3" fill="hsl(var(--primary))"/>
      <circle cx="50" cy="72" r="3" fill="hsl(var(--primary))"/>
    </svg>
  ),
  hiking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      <path d="M50 20 L30 80 M50 20 L70 80" stroke="hsl(var(--primary))" strokeWidth="3" fill="none"/>
      <circle cx="50" cy="25" r="5" fill="hsl(var(--primary))"/>
      <path d="M40 80 L60 80" stroke="hsl(var(--primary))" strokeWidth="4"/>
    </svg>
  ),
  cooking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      <ellipse cx="50" cy="55" rx="30" ry="20" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <path d="M35 40 Q50 25 65 40" stroke="hsl(var(--primary))" strokeWidth="2" fill="none"/>
      <circle cx="45" cy="35" r="2" fill="hsl(var(--primary))" opacity="0.6"/>
      <circle cx="55" cy="38" r="2" fill="hsl(var(--primary))" opacity="0.6"/>
    </svg>
  ),
  museum: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      <rect x="20" y="35" width="60" height="45" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <rect x="25" y="40" width="20" height="25" fill="hsl(var(--primary))" opacity="0.4"/>
      <rect x="55" y="40" width="20" height="25" fill="hsl(var(--primary))" opacity="0.4"/>
      <line x1="50" y1="25" x2="50" y2="35" stroke="hsl(var(--primary))" strokeWidth="2"/>
    </svg>
  ),
  cocktails: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      <path d="M30 35 L50 70 L70 35 Z" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <line x1="50" y1="70" x2="50" y2="85" stroke="hsl(var(--primary))" strokeWidth="3"/>
      <circle cx="65" cy="40" r="4" fill="hsl(var(--primary))"/>
      <path d="M70 35 Q75 30 80 35" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  stargazing: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.1)" />
      <circle cx="30" cy="30" r="2" fill="hsl(var(--primary))"/>
      <circle cx="70" cy="35" r="2" fill="hsl(var(--primary))"/>
      <circle cx="55" cy="25" r="2.5" fill="hsl(var(--primary))"/>
      <circle cx="40" cy="50" r="1.5" fill="hsl(var(--primary))"/>
      <circle cx="65" cy="55" r="2" fill="hsl(var(--primary))"/>
      <path d="M30 70 Q50 60 70 70" stroke="hsl(var(--primary))" strokeWidth="2" fill="none"/>
      <circle cx="50" cy="62" r="8" fill="hsl(var(--primary) / 0.3)"/>
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

// Landing Page
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

  function handleContinue() {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (time) params.set("time", time);
    navigate(`/where?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Heart className="w-10 h-10 text-primary fill-primary mb-6" />

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
            />
          </div>
        </div>

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold mt-8 gap-2"
          onClick={handleContinue}
          disabled={!date || !time}
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

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
  ];

  function handleSelect(id: string) {
    const params = new URLSearchParams(search);

    if (id === "restaurant") {
      navigate(`/where/restaurant?${params.toString()}`);
    } else if (id === "cinema") {
      navigate(`/where/cinema?${params.toString()}`);
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

// Cinema Sub-Page
function WhereCinema() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [selectedMovie, setSelectedMovie] = React.useState<{ title: string; year: string; genre: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<"new" | "classics">("new");

  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  const currentMovies = selectedCategory === "new" ? (movies?.newReleases || []) : (movies?.popularClassics || []);

  function handleContinue() {
    if (selectedMovie) {
      const params = new URLSearchParams(search);
      params.set("title", `Movie: ${selectedMovie.title} (${selectedMovie.year})`);
      params.set("venueId", "cinema");
      params.set("location", "Cinema");
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

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setSelectedCategory("new"); setSelectedMovie(null); }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "new"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            2026 Releases
          </button>
          <button
            onClick={() => { setSelectedCategory("classics"); setSelectedMovie(null); }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "classics"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Heart className="w-4 h-4 inline mr-2" />
            Classics
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
  items: { id: string; label: string; emoji: string; desc?: string }[];
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
                          <span className="text-xl">{item.emoji}</span>
                          <span className={`text-sm font-medium flex-1 ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {item.label}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                        </div>
                        {item.desc && (
                          <span className="text-[11px] text-muted-foreground leading-snug">
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

  // Auto-send the date details to the fixed recipient once on mount
  React.useEffect(() => {
    let cancelled = false;
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
        if (!cancelled) setEmailStatus(response.ok ? "sent" : "failed");
      } catch (e) {
        if (!cancelled) setEmailStatus("failed");
      }
    }
    send();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setEmailStatus(response.ok ? "sent" : "failed");
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
            <Route path="/where" component={Where} />
            <Route path="/where/restaurant" component={WhereRestaurant} />
            <Route path="/where/restaurant/business" component={WhereRestaurantBusiness} />
            <Route path="/where/cinema" component={WhereCinema} />
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
