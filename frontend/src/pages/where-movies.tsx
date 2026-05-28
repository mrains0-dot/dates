import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Heart, ChevronRight, Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepDots } from "@/components/step-dots";

const NEW_MOVIES = [
  { id: "minecraft", label: "A Minecraft Movie", year: "2025" },
  { id: "sinners", label: "Sinners", year: "2025" },
  { id: "wicked", label: "Wicked", year: "2024" },
  { id: "nosferatu", label: "Nosferatu", year: "2024" },
  { id: "gladiator2", label: "Gladiator II", year: "2024" },
  { id: "substance", label: "The Substance", year: "2024" },
  { id: "insideout2", label: "Inside Out 2", year: "2024" },
];

const CLASSIC_MOVIES = [
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
  movie: { id: string; label: string; year: string };
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
        <p className="text-xs text-muted-foreground mt-0.5">{movie.year}</p>
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

  const allMovies = [...NEW_MOVIES, ...CLASSIC_MOVIES];

  function handleContinue() {
    const movie = allMovies.find((m) => m.id === selected);
    const params = new URLSearchParams(search);
    params.set("title", movie ? `${movie.label}` : "Movie Night");
    params.set("location", "Cinema");
    params.set("venueId", "cinema");
    navigate(`/confirm?${params.toString()}`);
  }

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

        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-3">Now showing</p>
        <div className="space-y-2.5 mb-6">
          {NEW_MOVIES.map((movie) => (
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
          {CLASSIC_MOVIES.map((movie) => (
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
