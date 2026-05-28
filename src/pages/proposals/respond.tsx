import { useState, useCallback, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { format } from "date-fns";
import {
  useGetProposal,
  getGetProposalQueryKey,
  useRespondToProposal,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin, CalendarIcon, Clock, Heart, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

type Step = "ask" | "availability" | "options" | "confirmed";

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
  burst({ x: 0.5, y: 0.5 });
  setTimeout(() => burst({ x: 0.3, y: 0.4 }), 120);
  setTimeout(() => burst({ x: 0.7, y: 0.4 }), 240);
  setTimeout(() => burst({ x: 0.5, y: 0.6 }), 360);
}

function useEscapingButton() {
  const [pos, setPos] = useState({ x: 65, y: 72 });
  const escape = useCallback(() => {
    setPos((prev) => {
      let nx: number, ny: number;
      let attempts = 0;
      do {
        nx = 8 + Math.random() * 72;
        ny = 15 + Math.random() * 65;
        attempts++;
      } while (
        attempts < 20 &&
        Math.abs(nx - prev.x) < 15 &&
        Math.abs(ny - prev.y) < 15
      );
      return { x: nx, y: ny };
    });
  }, []);
  return { pos, escape };
}

export default function ProposalRespond() {
  const [, params] = useRoute("/proposals/:token");
  const token = params?.token ?? "";
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>("ask");
  const [availDate, setAvailDate] = useState("");
  const [availTime, setAvailTime] = useState("");
  const [selectedActivityIds, setSelectedActivityIds] = useState<number[]>([]);
  const { pos: noPos, escape: escapeNo } = useEscapingButton();
  const confettiFired = useRef(false);

  const { data: proposal, isLoading, isError } = useGetProposal(token, {
    query: { enabled: !!token, queryKey: getGetProposalQueryKey(token) },
  });

  const respond = useRespondToProposal({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetProposalQueryKey(token) });
        setStep("confirmed");
      },
    },
  });

  // If already accepted, jump to confirmed
  useEffect(() => {
    if (proposal && proposal.status === "accepted") {
      setStep("confirmed");
    }
  }, [proposal]);

  // Fire confetti when confirmed
  useEffect(() => {
    if (step === "confirmed" && !confettiFired.current) {
      confettiFired.current = true;
      setTimeout(fireHeartConfetti, 200);
      setTimeout(fireHeartConfetti, 800);
    }
  }, [step]);

  const plan = proposal?.datePlan;

  if (!token || isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">?</span>
          </div>
          <h1 className="font-serif text-2xl font-semibold mb-2">Proposal Not Found</h1>
          <p className="text-muted-foreground text-sm">This link may be invalid or has expired.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ── STEP 1: The ask ────────────────────────────────────────────────────────
  if (step === "ask") {
    return (
      <div className="min-h-screen bg-background overflow-hidden relative select-none">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Heart className="absolute top-[8%] left-[12%] w-8 h-8 text-primary/10 fill-primary/10 rotate-[-15deg]" />
          <Heart className="absolute top-[20%] right-[10%] w-14 h-14 text-primary/8 fill-primary/8 rotate-[12deg]" />
          <Heart className="absolute bottom-[25%] left-[8%] w-10 h-10 text-primary/10 fill-primary/10 rotate-[8deg]" />
          <Heart className="absolute bottom-[15%] right-[15%] w-6 h-6 text-primary/10 fill-primary/10 rotate-[-20deg]" />
          <Heart className="absolute top-[55%] left-[50%] w-48 h-48 text-primary/5 fill-primary/5 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          {proposal?.message && (
            <div className="mb-8 bg-primary/5 border border-primary/20 rounded-2xl px-6 py-4 max-w-sm">
              <p className="text-foreground italic text-sm">"{proposal.message}"</p>
            </div>
          )}
          <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-6 animate-pulse" />
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-3 leading-tight max-w-xs">
            Will you go on a date with me?
          </h1>
          {plan?.title && (
            <p className="text-muted-foreground text-base mb-10">{plan.title}</p>
          )}
          <Button
            size="lg"
            className="h-16 px-12 text-lg font-semibold rounded-2xl gap-3 shadow-lg mb-4"
            onClick={() => setStep("availability")}
          >
            <Heart className="w-5 h-5 fill-current" />
            Yes!
          </Button>
          <p className="text-xs text-muted-foreground mb-1">or…</p>
        </div>

        {/* Escaping No button — never actually declines */}
        <button
          onMouseEnter={escapeNo}
          onClick={escapeNo}
          style={{
            position: "fixed",
            left: `${noPos.x}%`,
            top: `${noPos.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.18s cubic-bezier(.22,1,.36,1), top 0.18s cubic-bezier(.22,1,.36,1)",
          }}
          className="text-sm text-muted-foreground underline underline-offset-2 cursor-pointer bg-transparent border-none z-50"
          tabIndex={-1}
          aria-hidden="true"
        >
          No thanks
        </button>
      </div>
    );
  }

  // ── STEP 2: Availability ───────────────────────────────────────────────────
  if (step === "availability") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-400">
          <div className="flex gap-2 mb-10 justify-center">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`h-1.5 rounded-full transition-all duration-300 ${n <= 2 ? "bg-primary w-8" : "bg-muted w-5"}`} />
            ))}
          </div>

          <Heart className="w-8 h-8 text-primary fill-primary mb-4" />
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">When are you free?</h1>
          <p className="text-muted-foreground text-sm mb-8">Let them know your best day and time.</p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" /> Date
              </label>
              <input
                type="date"
                value={availDate}
                onChange={(e) => setAvailDate(e.target.value)}
                className="w-full h-12 rounded-xl border border-border bg-card px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Preferred time
              </label>
              <input
                type="time"
                value={availTime}
                onChange={(e) => setAvailTime(e.target.value)}
                className="w-full h-12 rounded-xl border border-border bg-card px-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <Button
            size="lg"
            className="w-full h-14 rounded-xl text-base font-semibold mt-8 gap-2"
            onClick={() => setStep("options")}
            disabled={!availDate || !availTime}
          >
            Continue <ChevronRight className="w-5 h-5" />
          </Button>
          <button
            className="w-full text-center text-xs text-muted-foreground mt-4 underline underline-offset-2 bg-transparent border-none cursor-pointer"
            onClick={() => setStep("options")}
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 3: Date options ───────────────────────────────────────────────────
  if (step === "options") {
    const activities = plan?.activities ?? [];
    const toggleActivity = (id: number) =>
      setSelectedActivityIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );

    return (
      <div className="min-h-screen bg-background pb-32">
        <div className="max-w-lg mx-auto px-5 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-400">
          <div className="flex gap-2 mb-10 justify-center">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-1.5 rounded-full bg-primary w-8 transition-all duration-300" />
            ))}
          </div>

          <Heart className="w-8 h-8 text-primary fill-primary mb-4" />
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-1">Here's the plan</h1>
          <p className="text-muted-foreground text-sm mb-6">Tap the things you're most excited about.</p>

          <div className="bg-primary text-primary-foreground rounded-2xl p-5 mb-6">
            <p className="font-serif text-xl font-semibold mb-3">{plan?.title}</p>
            <div className="flex flex-col gap-2 text-sm">
              {plan?.scheduledAt && (
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <CalendarIcon className="w-4 h-4" />
                  {format(new Date(plan.scheduledAt), "EEEE, MMMM d 'at' h:mm a")}
                </div>
              )}
              {plan?.location && (
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <MapPin className="w-4 h-4" /> {plan.location}
                </div>
              )}
              {availDate && availTime && (
                <div className="flex items-center gap-2 text-primary-foreground/80 mt-1 pt-2 border-t border-primary-foreground/20">
                  <Clock className="w-4 h-4" />
                  You're free: {format(new Date(`${availDate}T${availTime}`), "EEE, MMM d 'at' h:mm a")}
                </div>
              )}
            </div>
          </div>

          {activities.length > 0 && (
            <div className="space-y-3 mb-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">What we'll do</p>
              {activities.map((activity) => {
                const picked = selectedActivityIds.includes(activity.id);
                return (
                  <button
                    key={activity.id}
                    onClick={() => toggleActivity(activity.id)}
                    className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-150 ${
                      picked ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{activity.name}</p>
                        {activity.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{activity.description}</p>
                        )}
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
                          {activity.startTime && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {activity.startTime}
                              {activity.durationMinutes ? ` · ${activity.durationMinutes}min` : ""}
                            </span>
                          )}
                          {activity.location && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {activity.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${picked ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                        {picked && <Heart className="w-3 h-3 fill-primary-foreground text-primary-foreground" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {plan?.notes && (
            <div className="bg-muted/50 rounded-2xl p-4 mb-6">
              <p className="text-xs text-muted-foreground mb-1 font-medium">A note</p>
              <p className="text-sm text-foreground italic">"{plan.notes}"</p>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-5 py-4">
          <div className="max-w-lg mx-auto">
            <Button
              size="lg"
              className="w-full h-14 rounded-xl text-base font-semibold gap-2"
              onClick={() => {
                const availStr = availDate && availTime ? `${availDate} at ${availTime}` : undefined;
                respond.mutate({ token, data: { answer: "accepted", availability: availStr } });
              }}
              disabled={respond.isPending}
            >
              {respond.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Heart className="w-5 h-5 fill-current" />}
              I'm in — let's do it!
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── CONFIRMED ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden">
      <div className="text-center max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/15 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-primary/10 animate-ping" style={{ animationDelay: "0.15s" }} />
          <div className="relative w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-14 h-14 text-primary fill-primary" />
          </div>
        </div>
        <h1 className="font-serif text-4xl font-semibold text-foreground mb-3">It's a date!</h1>
        <p className="text-muted-foreground mb-2">
          You said yes to <span className="font-medium text-foreground">{plan?.title}</span>.
        </p>
        {plan?.scheduledAt && (
          <p className="text-sm text-muted-foreground">
            {format(new Date(plan.scheduledAt), "EEEE, MMMM d 'at' h:mm a")}
          </p>
        )}
        {availDate && availTime && (
          <p className="text-sm text-primary mt-3 font-medium">
            You noted you're free {format(new Date(`${availDate}T${availTime}`), "EEE, MMM d 'at' h:mm a")}
          </p>
        )}
      </div>
    </div>
  );
}
