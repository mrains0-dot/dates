import { useCallback, useState } from "react";
import { useLocation } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

function useEscapingButton() {
  const [pos, setPos] = useState({ x: 72, y: 88 });
  const escape = useCallback(() => {
    setPos((prev) => {
      let nx: number, ny: number;
      let attempts = 0;
      do {
        nx = 10 + Math.random() * 68;
        ny = 75 + Math.random() * 18;
        attempts++;
      } while (
        attempts < 20 &&
        Math.abs(nx - prev.x) < 20 &&
        Math.abs(ny - prev.y) < 8
      );
      return { x: nx, y: ny };
    });
  }, []);
  return { pos, escape };
}

export default function Landing() {
  const [, navigate] = useLocation();
  const { pos, escape } = useEscapingButton();

  return (
    <div className="min-h-screen bg-background overflow-hidden relative select-none">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-[7%] left-[10%] w-8 h-8 text-primary/10 fill-primary/10 rotate-[-15deg]" />
        <Heart className="absolute top-[18%] right-[9%] w-14 h-14 text-primary/8 fill-primary/8 rotate-[12deg]" />
        <Heart className="absolute bottom-[22%] left-[7%] w-10 h-10 text-primary/10 fill-primary/10 rotate-[8deg]" />
        <Heart className="absolute bottom-[12%] right-[14%] w-6 h-6 text-primary/10 fill-primary/10 rotate-[-20deg]" />
        <Heart className="absolute top-[50%] left-[50%] w-64 h-64 text-primary/4 fill-primary/4 -translate-x-1/2 -translate-y-1/2" />
        <Heart className="absolute top-[35%] left-[20%] w-5 h-5 text-primary/8 fill-primary/8 rotate-[5deg]" />
        <Heart className="absolute bottom-[38%] right-[22%] w-7 h-7 text-primary/8 fill-primary/8 rotate-[-10deg]" />
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
        >
          <Heart className="w-5 h-5 fill-current" />
          Yes!
        </Button>

        {/* Mobile: static button anchored safely below Yes, well clear of overlap */}
        <button
          className="sm:hidden mt-8 text-sm text-muted-foreground underline underline-offset-4"
          onClick={escape}
          aria-hidden="true"
          tabIndex={-1}
        >
          No thanks
        </button>
      </div>

      {/* Desktop only: the fun dodging button */}
      <div
        className="hidden sm:block"
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
        >
          No thanks
        </Button>
      </div>
    </div>
  );
}
