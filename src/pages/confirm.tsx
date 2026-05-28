import { useEffect, useRef, useState } from "react";
import { useSearch } from "wouter";
import { format } from "date-fns";
import { Heart, CalendarIcon, MapPin, Send, Loader2, UtensilsCrossed, Leaf, Coffee, Clapperboard, Waves, Mountain, ChefHat, Landmark, Wine, Stars } from "lucide-react";
import { StepDots } from "@/components/step-dots";
import { Button } from "@/components/ui/button";
import { useCreateDatePlan, getListDatePlansQueryKey, getListUpcomingDatePlansQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import confetti from "canvas-confetti";
import { DATE_OPTIONS } from "@/lib/date-options";
import type { LucideIcon } from "lucide-react";

const VENUE_ICONS: Record<string, LucideIcon> = {
  restaurant: UtensilsCrossed,
  picnic: Leaf,
  coffee: Coffee,
  cinema: Clapperboard,
  beach: Waves,
  hiking: Mountain,
  cooking: ChefHat,
  museum: Landmark,
  cocktails: Wine,
  stargazing: Stars,
};

function fireHeartConfetti() {
  const heart = confetti.shapeFromText({ text: "❤", scalar: 2 });
  const burst = (origin: { x: number; y: number }) => {
    confetti({
      particleCount: 40,
      spread: 360,
      ticks: 120,
      gravity: 0.6,
      decay: 0.93,
      startVelocity: 28,
      shapes: [heart],
      scalar: 2,
      colors: ["#BE123C", "#E11D48", "#FB7185", "#FECDD3", "#FF1744"],
      origin,
    });
  };
  burst({ x: 0.5, y: 0.4 });
  setTimeout(() => burst({ x: 0.3, y: 0.5 }), 150);
  setTimeout(() => burst({ x: 0.7, y: 0.5 }), 300);
  setTimeout(() => burst({ x: 0.5, y: 0.6 }), 450);
}

export default function Confirm() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const date = params.get("date") ?? "";
  const time = params.get("time") ?? "";
  const title = params.get("title") ?? "Our Date";
  const location = params.get("location") ?? "";
  const venueId = params.get("venueId") ?? "";

  const venue = DATE_OPTIONS.find((o) => o.id === venueId);
  const VenueIcon = VENUE_ICONS[venueId] ?? Heart;

  const queryClient = useQueryClient();
  const createPlan = useCreateDatePlan();
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const planCreated = useRef(false);
  const confettiFired = useRef(false);

  const scheduledAt = date && time ? new Date(`${date}T${time}`) : null;
  const formattedDate = scheduledAt
    ? format(scheduledAt, "EEEE, MMMM d 'at' h:mm a")
    : null;

  useEffect(() => {
    if (planCreated.current || !scheduledAt) return;
    planCreated.current = true;
    createPlan.mutate(
      { data: { title, location: location || undefined, scheduledAt: scheduledAt.toISOString() } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListDatePlansQueryKey() });
          queryClient.invalidateQueries({ queryKey: getListUpcomingDatePlansQueryKey() });
        },
      }
    );
  }, []);

  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;
    setTimeout(fireHeartConfetti, 300);
    setTimeout(fireHeartConfetti, 900);
  }, []);

  async function sendEmail() {
    setEmailLoading(true);
    try {
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, location, date, time }),
      });
      setEmailSent(true);
      setTimeout(fireHeartConfetti, 100);
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden">
      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StepDots current={3} />
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/15 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-primary/10 animate-ping" style={{ animationDelay: "0.2s" }} />
          <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-12 h-12 text-primary fill-primary" />
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-3 leading-tight">
          Thank you for planning a day with me
        </h1>
        <p className="text-muted-foreground text-base mb-10">
          i knew you'd say yes <span className="font-serif">;</span>)
        </p>

        <div className="bg-primary text-primary-foreground rounded-2xl p-5 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-primary-foreground/20">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
              <VenueIcon className="w-6 h-6 text-primary-foreground" />
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

        {emailSent ? (
          <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium py-3">
            <Heart className="w-4 h-4 fill-current" />
            Details sent
          </div>
        ) : (
          <Button
            size="lg"
            variant="outline"
            className="w-full h-13 rounded-2xl text-base font-semibold gap-2 border-primary/30 hover:bg-primary/5"
            onClick={sendEmail}
            disabled={emailLoading}
          >
            {emailLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send your date the details
          </Button>
        )}
      </div>
    </div>
  );
}
