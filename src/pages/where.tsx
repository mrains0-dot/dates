import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Heart, ChevronRight, Check, UtensilsCrossed, Leaf, Clapperboard, Mountain, ChefHat, Landmark, Wine, Stars, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DATE_OPTIONS } from "@/lib/date-options";
import { StepDots } from "@/components/step-dots";
import type { LucideIcon } from "lucide-react";

const VENUE_ICONS: Record<string, LucideIcon> = {
  restaurant: UtensilsCrossed,
  picnic: Leaf,
  cinema: Clapperboard,
  hiking: Mountain,
  cooking: ChefHat,
  museum: Landmark,
  cocktails: Wine,
  stargazing: Stars,
  custom: PenLine,
};

export default function Where() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");

  function handleContinue() {
    const params = new URLSearchParams(search);

    if (selected === "restaurant") {
      navigate(`/where/cuisine?${params.toString()}`);
      return;
    }

    if (selected === "cinema") {
      navigate(`/where/movies?${params.toString()}`);
      return;
    }

    if (selected === "museum") {
      navigate(`/where/museum?${params.toString()}`);
      return;
    }

    if (selected === "custom") {
      params.set("title", customText || "Our Date");
      params.set("location", "");
      params.set("venueId", "custom");
      navigate(`/confirm?${params.toString()}`);
      return;
    }

    const option = DATE_OPTIONS.find((o) => o.id === selected);
    if (option) {
      params.set("title", option.suggested);
      params.set("location", option.location);
      params.set("venueId", option.id);
    }
    navigate(`/confirm?${params.toString()}`);
  }

  const canContinue =
    selected !== null &&
    (selected !== "custom" || customText.trim().length > 0);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <StepDots current={2} />
        <Heart className="w-10 h-10 text-primary fill-primary mb-6" />

        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-2 leading-tight">
          Where?
        </h1>
        <p className="text-muted-foreground mb-8">Pick the kind of date you have in mind.</p>

        <div className="space-y-2.5 mb-8">
          {DATE_OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            const Icon = VENUE_ICONS[option.id] ?? Heart;
            const isCustom = option.id === "custom";

            return (
              <div key={option.id}>
                <button
                  onClick={() => setSelected(option.id)}
                  className={`w-full flex items-center gap-4 rounded-2xl border-2 p-3 text-left transition-all duration-150 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`flex-1 font-medium text-sm ${isCustom ? "text-muted-foreground italic" : "text-foreground"}`}>
                    {option.label}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                </button>

                {isCustom && isSelected && (
                  <div className="mt-2 px-1">
                    <input
                      autoFocus
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Tell me your idea..."
                      className="w-full rounded-xl border-2 border-primary/30 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base font-semibold gap-2"
          onClick={handleContinue}
          disabled={!canContinue}
        >
          Continue <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
