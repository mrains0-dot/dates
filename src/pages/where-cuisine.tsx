import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Heart, ChevronRight, Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepDots } from "@/components/step-dots";

const CUISINE_OPTIONS = [
  { id: "italian", label: "Italian", description: "Pasta, pizza & more" },
  { id: "japanese", label: "Japanese", description: "Sushi, ramen & more" },
  { id: "mexican", label: "Mexican", description: "Tacos, enchiladas & more" },
  { id: "indian", label: "Indian", description: "Curry, naan & more" },
  { id: "american", label: "American", description: "Burgers, steaks & more" },
  { id: "thai", label: "Thai", description: "Pad thai, curries & more" },
  { id: "mediterranean", label: "Mediterranean", description: "Mezze, kebabs & more" },
  { id: "french", label: "French", description: "Bistro classics & more" },
  { id: "chinese", label: "Chinese", description: "Dim sum, stir fry & more" },
  { id: "korean", label: "Korean BBQ", description: "Grilled meats & more" },
  { id: "steakhouse", label: "Steakhouse", description: "Cuts, sides & more" },
  { id: "seafood", label: "Seafood", description: "Fish, lobster & more" },
];

export default function WhereCuisine() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const [selected, setSelected] = useState<string | null>(null);

  function handleContinue() {
    const cuisine = CUISINE_OPTIONS.find((c) => c.id === selected);
    const params = new URLSearchParams(search);
    params.set("title", cuisine ? `${cuisine.label} Dinner Date` : "Dinner Date");
    params.set("location", "Restaurant");
    params.set("venueId", "restaurant");
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
          What kind of food?
        </h1>
        <p className="text-muted-foreground mb-8">Pick a cuisine for your restaurant date.</p>

        <div className="space-y-2.5 mb-8">
          {CUISINE_OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`w-full flex items-center gap-4 rounded-2xl border-2 p-3 text-left transition-all duration-150 ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
              </button>
            );
          })}
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
