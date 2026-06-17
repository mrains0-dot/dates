import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Heart, ChevronRight, Check, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepDots } from "@/components/step-dots";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

interface Movie {
  id: string;
  label: string;
  year: string;
  genre?: string;
}

const FALLBACK_NOW_SHOWING: Movie[] = [
  { id: "avengers-doomsday", label: "Avengers: Doomsday", year: "2026", genre: "Action/Superhero" },
  { id: "mission-impossible-fr", label: "Mission: Impossible – The Final Reckoning", year: "2026", genre: "Action/Thriller" },
  { id: "f1-movie", label: "F1", year: "2026", genre: "Action/Drama" },
  { id: "ballerina", label: "Ballerina", year: "2026", genre: "Action/Thriller" },
  { id: "final-destination-reboot", label: "Final Destination Bloodlines", year: "2026", genre: "Horror/Thriller" },
  { id: "karate-kid-legends", label: "Karate Kid: Legends", year: "2026", genre: "Action/Drama" },
  { id: "jurassic-world-rebirth", label: "Jurassic World Rebirth", year: "2026", genre: "Action/Adventure" },
  { id: "28-years-later", label: "28 Years Later", year: "2026", genre: "Horror/Thriller" },
  { id: "zootopia-2", label: "Zootopia 2", year: "2026", genre: "Animation/Comedy" },
  { id: "wicked-part-2", label: "Wicked: For Good", year: "2026", genre: "Fantasy/Musical" },
  { id: "m3gan-2", label: "M3GAN 2.0", year: "2026", genre: "Horror/Sci-Fi" },
  { id: "sinners", label: "Sinners", year: "2026", genre: "Horror/Drama" },
  { id: "a-minecraft-movie", label: "A Minecraft Movie", year: "2026", genre: "Animation/Adventure" },
  { id: "lilo-stitch", label: "Lilo & Stitch", year: "2026", genre: "Animation/Family" },
  { id: "thunderbolts", label: "Thunderbolts*", year: "2026", genre: "Action/Superhero" },
];

const FALLBACK_CLASSICS: Movie[] = [
  { id: "notebook", label: "The Notebook", year: "2004" },
  { id: "titanic", label: "Titanic", year: "1997" },
  { id: "pride", label: "Pride & Prejudice", year: "2005" },
  { id: "lalaland", label: "La La Land", year: "2016" },
  { id: "10things", label: "10 Things I Hate About You", year: "1999" },
  { id: "whenhary", label: "When Harry Met Sally", year: "1989" },
  { id: "nottinghill", label: "Notting Hill", year: "1999" },
  { id: "crazyrach", label: "Crazy, Rich Asians", year: "2018" },
];

function MovieOption({ movie, isSelected, onSelect }: {
  movie: Movie;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-4 rounded-2xl border-2 p-3 text-left transition-all duration-150 ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground">{movie.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {movie.genre ? `${movie.year} · ${movie.genre}` : movie.year}
        </p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
      }`}>
        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
    </button>
  );
}

export default function WhereMovies() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [selected, setSelected] = useState<string | null>(null);
  const [nowShowing, setNowShowing] = useState<Movie[]>(FALLBACK_NOW_SHOWING);
  const [classics, setClassics] = useState<Movie[]>(FALLBACK_CLASSICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/get-movies`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data.nowShowing) && data.nowShowing.length > 0) {
          setNowShowing(data.nowShowing);
        }
        if (Array.isArray(data.classics) && data.classics.length > 0) {
          setClassics(data.classics);
        }
      } catch {
        // fallback data already set
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  const allMovies = [...nowShowing, ...classics];

  function handleContinue() {
    const movie = allMovies.find((m) => m.id === selected);
    const params = new URLSearchParams(search);
    params.set("title", movie ? movie.label : "Movie Night");
    params.set("location", "Cinema");
    params.set("venueId", "cinema");
    navigate(`/confirm?${params.toString()}`);
  }

  const now = new Date();
  const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <StepDots current={2} />

        <button
          onClick={() => navigate(`/where?${search}`)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <Heart className="w-10 h-10 text-primary fill-primary mb-6" />

        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-2 leading-tight">
          What's the movie?
        </h1>
        <p className="text-muted-foreground mb-8">Pick something to watch together.</p>

        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            Now showing
          </p>
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 text-muted-foreground/40 animate-spin" />
          ) : (
            <p className="text-xs text-muted-foreground/40">{monthLabel}</p>
          )}
        </div>

        <div className="space-y-2.5 mb-6">
          {nowShowing.map((movie) => (
            <MovieOption
              key={movie.id}
              movie={movie}
              isSelected={selected === movie.id}
              onSelect={() => setSelected(movie.id)}
            />
          ))}
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">Beloved classics</p>
        <div className="space-y-2.5 mb-8">
          {classics.map((movie) => (
            <MovieOption
              key={movie.id}
              movie={movie}
              isSelected={selected === movie.id}
              onSelect={() => setSelected(movie.id)}
            />
          ))}
        </div>

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold gap-2"
          onClick={handleContinue}
          disabled={!selected}
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
