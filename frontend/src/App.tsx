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
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Date option illustrations — vintage Art Deco / WPA poster style
const DateIllustrations = {
  // RESTAURANT — two wine glasses clinking + candle between them
  restaurant: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Left glass bowl — angular trapezoid */}
      <path d="M12 18 L36 18 L30 52 L18 52 Z" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="miter"/>
      {/* Wine fill */}
      <path d="M15 34 L33 34 L30 52 L18 52 Z" fill="hsl(var(--primary) / 0.38)" stroke="none"/>
      <line x1="24" y1="52" x2="24" y2="72" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      <line x1="14" y1="74" x2="34" y2="74" stroke="hsl(var(--primary))" strokeWidth="2.8"/>
      {/* Right glass bowl */}
      <path d="M64 18 L88 18 L82 52 L70 52 Z" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="miter"/>
      <path d="M67 34 L85 34 L82 52 L70 52 Z" fill="hsl(var(--primary) / 0.38)" stroke="none"/>
      <line x1="76" y1="52" x2="76" y2="72" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      <line x1="66" y1="74" x2="86" y2="74" stroke="hsl(var(--primary))" strokeWidth="2.8"/>
      {/* Candle body */}
      <rect x="45" y="42" width="10" height="26" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <line x1="45" y1="50" x2="55" y2="50" stroke="hsl(var(--primary))" strokeWidth="0.9" opacity="0.3"/>
      <line x1="45" y1="56" x2="55" y2="56" stroke="hsl(var(--primary))" strokeWidth="0.9" opacity="0.3"/>
      {/* Flame — angular diamond */}
      <path d="M50 22 L54 32 L50 40 L46 32 Z" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M50 26 L52 32 L50 38 L48 32 Z" fill="hsl(var(--primary))" strokeLinejoin="miter"/>
      <line x1="50" y1="40" x2="50" y2="44" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* Holder */}
      <path d="M41 68 L43 76 L57 76 L59 68 Z" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="miter"/>
      {/* Clink lines between glasses */}
      <line x1="36" y1="18" x2="42" y2="24" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.45"/>
      <line x1="64" y1="18" x2="58" y2="24" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.45"/>
      <line x1="50" y1="14" x2="50" y2="20" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.35"/>
    </svg>
  ),

  // CINEMA — film clapperboard, open position with diagonal stripes
  cinema: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Slate board */}
      <rect x="18" y="48" width="64" height="40" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      {/* Scene lines */}
      <line x1="24" y1="58" x2="76" y2="58" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4"/>
      <line x1="24" y1="67" x2="68" y2="67" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4"/>
      <line x1="24" y1="76" x2="58" y2="76" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4"/>
      {/* Hinge strip */}
      <rect x="18" y="44" width="64" height="5" fill="hsl(var(--primary))"/>
      {/* Clapper arm — angled open (parallelogram) */}
      <path d="M18 44 L22 26 L84 16 L82 32 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="miter"/>
      {/* Stripe dividers on arm */}
      <line x1="30" y1="44" x2="32" y2="25" stroke="hsl(var(--primary))" strokeWidth="4.5" opacity="0.5"/>
      <line x1="42" y1="42" x2="44" y2="22" stroke="hsl(var(--primary))" strokeWidth="4.5" opacity="0.5"/>
      <line x1="54" y1="40" x2="56" y2="20" stroke="hsl(var(--primary))" strokeWidth="4.5" opacity="0.5"/>
      <line x1="66" y1="38" x2="68" y2="18" stroke="hsl(var(--primary))" strokeWidth="4.5" opacity="0.5"/>
      {/* Hinge dots */}
      <circle cx="26" cy="46" r="2.5" fill="hsl(var(--primary) / 0.5)"/>
      <circle cx="74" cy="46" r="2.5" fill="hsl(var(--primary) / 0.5)"/>
    </svg>
  ),

  // PICNIC — wicker basket with rectangular-arch handle, angular weave
  picnic: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Handle — sharp rectangular arch */}
      <path d="M28 56 L28 32 L72 32 L72 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="4.5" strokeLinejoin="miter"/>
      {/* Handle grip bar */}
      <rect x="42" y="28" width="16" height="8" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      {/* Basket body */}
      <path d="M20 56 L80 56 L74 88 L26 88 Z" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="miter"/>
      {/* Lid band */}
      <rect x="20" y="50" width="60" height="8" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* Vertical weave */}
      <line x1="36" y1="58" x2="33" y2="88" stroke="hsl(var(--primary))" strokeWidth="1.3" opacity="0.5"/>
      <line x1="50" y1="58" x2="50" y2="88" stroke="hsl(var(--primary))" strokeWidth="1.3" opacity="0.5"/>
      <line x1="64" y1="58" x2="67" y2="88" stroke="hsl(var(--primary))" strokeWidth="1.3" opacity="0.5"/>
      {/* Horizontal weave */}
      <line x1="22" y1="68" x2="78" y2="68" stroke="hsl(var(--primary))" strokeWidth="1.3" opacity="0.5"/>
      <line x1="24" y1="78" x2="76" y2="78" stroke="hsl(var(--primary))" strokeWidth="1.3" opacity="0.5"/>
      {/* Apple peeking over lid */}
      <path d="M62 48 Q66 38 70 48" fill="hsl(var(--primary) / 0.28)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="miter"/>
      {/* Baguette tip */}
      <path d="M30 48 L38 42 L40 48" fill="hsl(var(--primary) / 0.28)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="miter"/>
    </svg>
  ),

  // HIKING — angular WPA-style mountains with switchback trail + pine trees
  hiking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Back range — lower, lighter */}
      <path d="M8 80 L30 46 L52 68 L66 52 L92 80 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.45)" strokeWidth="1.5" strokeLinejoin="miter"/>
      {/* Main peak — bold foreground */}
      <path d="M14 80 L50 18 L86 80 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinejoin="miter"/>
      {/* Snow cap polygon */}
      <path d="M50 18 L60 44 L56 45 L50 28 L44 45 L40 44 Z" fill="hsl(var(--primary))" opacity="0.9"/>
      {/* Ground */}
      <line x1="8" y1="80" x2="92" y2="80" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      {/* Switchback trail — dashed zigzag */}
      <polyline points="24,80 34,65 44,65 54,50 64,50 74,36"
        fill="none" stroke="hsl(var(--primary))" strokeWidth="1.8"
        strokeLinejoin="miter" strokeDasharray="3.5 2.5" opacity="0.7"/>
      {/* Pine trees */}
      <polygon points="20,80 26,60 32,80" fill="hsl(var(--primary) / 0.45)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <polygon points="70,80 76,62 82,80" fill="hsl(var(--primary) / 0.45)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* Sun — top right corner */}
      <polygon points="84,16 86,22 80,22" fill="hsl(var(--primary))" opacity="0.75"/>
      <line x1="88" y1="14" x2="90" y2="20" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="square" opacity="0.6"/>
      <line x1="90" y1="20" x2="94" y2="20" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="square" opacity="0.6"/>
    </svg>
  ),

  // COOKING — tall toque chef hat + crossed fork and spoon below
  cooking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Hat band */}
      <rect x="28" y="54" width="44" height="10" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      {[33,38,43,48,53,58,63,68].map(x => (
        <line key={x} x1={x} y1="54" x2={x} y2="64" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.35"/>
      ))}
      {/* Hat body — trapezoid */}
      <path d="M32 54 L36 18 L64 18 L68 54 Z" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="miter"/>
      {/* Puff top — flat arc suggestion */}
      <path d="M36 18 Q50 10 64 18" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      {/* Crease lines on hat */}
      <line x1="42" y1="54" x2="40" y2="20" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.3"/>
      <line x1="58" y1="54" x2="60" y2="20" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.3"/>
      {/* Spoon (left, angled) */}
      <line x1="26" y1="64" x2="20" y2="88" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="square"/>
      <path d="M20 56 L30 56 L30 65 L20 65 Z" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="miter" transform="rotate(-12 25 60)"/>
      {/* Fork (right, angled) */}
      <line x1="74" y1="64" x2="80" y2="88" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="square"/>
      <line x1="70" y1="56" x2="70" y2="64" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="square"/>
      <line x1="74" y1="54" x2="74" y2="64" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="square"/>
      <line x1="78" y1="56" x2="78" y2="64" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="square"/>
      <line x1="70" y1="64" x2="78" y2="64" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="square"/>
    </svg>
  ),

  // MUSEUM — large ornate picture frame with classical bust silhouette
  museum: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Frame outer */}
      <rect x="14" y="14" width="72" height="72" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="5"/>
      {/* Frame inner border */}
      <rect x="21" y="21" width="58" height="58" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.4"/>
      {/* Corner ornaments — solid squares */}
      <rect x="14" y="14" width="13" height="13" fill="hsl(var(--primary) / 0.45)"/>
      <rect x="73" y="14" width="13" height="13" fill="hsl(var(--primary) / 0.45)"/>
      <rect x="14" y="73" width="13" height="13" fill="hsl(var(--primary) / 0.45)"/>
      <rect x="73" y="73" width="13" height="13" fill="hsl(var(--primary) / 0.45)"/>
      {/* Corner diamonds */}
      <path d="M20 20 L24 16 L28 20 L24 24 Z" fill="hsl(var(--primary))"/>
      <path d="M72 20 L76 16 L80 20 L76 24 Z" fill="hsl(var(--primary))"/>
      <path d="M20 80 L24 76 L28 80 L24 84 Z" fill="hsl(var(--primary))"/>
      <path d="M72 80 L76 76 L80 80 L76 84 Z" fill="hsl(var(--primary))"/>
      {/* Pedestal */}
      <rect x="36" y="68" width="28" height="8" fill="hsl(var(--primary) / 0.32)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* Classical bust — shoulders + neck + head profile */}
      <path d="M40 68 L38 58 L40 50 Q50 43 60 50 L62 58 L60 68 Z" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M45 50 L43 42 Q50 34 57 42 L55 50 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  ),

  // COCKTAILS — three bottles on a bar shelf + martini glass in front
  cocktails: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Back wall */}
      <line x1="10" y1="22" x2="90" y2="22" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2"/>
      {/* Shelf */}
      <rect x="10" y="62" width="80" height="5" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      {/* Bottle 1 — tall slender */}
      <rect x="18" y="28" width="10" height="34" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      <rect x="20" y="22" width="6" height="8" fill="hsl(var(--primary) / 0.28)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <rect x="21" y="17" width="4" height="6" fill="hsl(var(--primary))"/>
      <rect x="20" y="40" width="6" height="10" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.9"/>
      {/* Bottle 2 — wide squat */}
      <rect x="40" y="34" width="14" height="28" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      <path d="M40 34 L40 26 L42 24 L52 24 L54 26 L54 34 Z" fill="hsl(var(--primary) / 0.26)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="miter"/>
      <rect x="44" y="19" width="6" height="6" fill="hsl(var(--primary))"/>
      <rect x="41" y="42" width="12" height="12" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.9"/>
      <line x1="42" y1="46" x2="52" y2="46" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.4"/>
      <line x1="42" y1="50" x2="52" y2="50" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.4"/>
      {/* Bottle 3 — medium */}
      <rect x="66" y="30" width="12" height="32" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      <rect x="68" y="22" width="8" height="10" fill="hsl(var(--primary) / 0.28)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <rect x="69" y="17" width="6" height="6" fill="hsl(var(--primary))"/>
      {/* Martini glass — angular, in front of shelf */}
      <path d="M38 68 L62 68 L52 84 L48 84 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="miter"/>
      <line x1="50" y1="84" x2="50" y2="92" stroke="hsl(var(--primary))" strokeWidth="2.5"/>
      <line x1="43" y1="94" x2="57" y2="94" stroke="hsl(var(--primary))" strokeWidth="2.8"/>
      {/* Olive on pick */}
      <line x1="54" y1="64" x2="58" y2="72" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <circle cx="56" cy="68" r="2.5" fill="hsl(var(--primary))" opacity="0.85"/>
    </svg>
  ),

  // STARGAZING — Big Dipper constellation + crescent moon
  stargazing: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Connecting lines first (behind stars) */}
      <polyline points="20,44 28,32 38,28 48,30 56,38 68,38 68,50 56,50 48,30"
        fill="none" stroke="hsl(var(--primary))" strokeWidth="1.4"
        strokeLinejoin="miter" opacity="0.55"/>
      {/* Big Dipper stars — angular star shapes */}
      {([
        [20,44],[28,32],[38,28],[48,30],[56,38],[68,38],[68,50],[56,50]
      ] as [number,number][]).map(([x,y],i) => (
        <path key={i}
          d={`M${x},${y-4} L${x+1.2},${y-1.2} L${x+4},${y} L${x+1.2},${y+1.2} L${x},${y+4} L${x-1.2},${y+1.2} L${x-4},${y} L${x-1.2},${y-1.2} Z`}
          fill="hsl(var(--primary))"/>
      ))}
      {/* Crescent moon — lower right */}
      <path d="M72 64 A 14 14 0 1 0 88 78 A 10 10 0 1 1 72 64 Z"
        fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="miter"/>
      {/* Small scattered stars */}
      <path d="M82 22 L83 26 L87 26 L84 28 L85 32 L82 30 L79 32 L80 28 L77 26 L81 26 Z" fill="hsl(var(--primary))" opacity="0.8"/>
      <circle cx="14" cy="58" r="2" fill="hsl(var(--primary))" opacity="0.5"/>
      <circle cx="32" cy="70" r="1.8" fill="hsl(var(--primary))" opacity="0.5"/>
      <circle cx="88" cy="44" r="1.8" fill="hsl(var(--primary))" opacity="0.55"/>
      <path d="M16 24 L17 27 L20 28 L17 29 L16 32 L15 29 L12 28 L15 27 Z" fill="hsl(var(--primary))" opacity="0.7"/>
    </svg>
  ),

  // CUSTOM — eight-point compass rose (any direction / make your own plan)
  custom: () => {
    const cx = 50, cy = 50;
    const pts = Array.from({ length: 8 }, (_, i) => {
      const a = (i * 45 - 90) * Math.PI / 180;
      const isCard = i % 2 === 0;
      const r = isCard ? 34 : 22;
      const f = isCard ? 4.5 : 2.8;
      const mid = r * 0.58;
      const perp = a + Math.PI / 2;
      const tx = cx + r * Math.cos(a), ty = cy + r * Math.sin(a);
      const mx = cx + mid * Math.cos(a), my = cy + mid * Math.sin(a);
      return {
        d: `M${tx.toFixed(1)},${ty.toFixed(1)} L${(mx + f * Math.cos(perp)).toFixed(1)},${(my + f * Math.sin(perp)).toFixed(1)} L${cx},${cy} L${(mx - f * Math.cos(perp)).toFixed(1)},${(my - f * Math.sin(perp)).toFixed(1)} Z`,
        card: isCard,
      };
    });
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.25"/>
        <circle cx="50" cy="50" r="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.18"/>
        {pts.map((p, i) => (
          <path key={i} d={p.d}
            fill={p.card ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.45)"}
            strokeLinejoin="miter"/>
        ))}
        {/* Center hub */}
        <circle cx="50" cy="50" r="6" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="2"/>
        <circle cx="50" cy="50" r="3" fill="hsl(var(--primary))"/>
      </svg>
    );
  },
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

// Pokeball SVG icon matching the app's primary color theme
function PokeballIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" fill="none" />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1.75" />
      <path d="M2 12a10 10 0 0 1 20 0" fill="currentColor" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" fill="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Fetch anime from Supabase — new releases rotate weekly, popular series shuffle each restart
async function fetchAnime() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/anime?is_active=eq.true&select=*&order=created_at.asc`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!response.ok) throw new Error("Failed to fetch anime");
  const data = await response.json();
  const weekSlot = (Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % 4) + 1;
  const prevSlot = weekSlot === 1 ? 4 : weekSlot - 1;
  const newReleases = data.filter((a: any) => a.category === "new_release" && (a.week_number === weekSlot || a.week_number === prevSlot));
  // Shuffle popular on every call (no staleTime on this query key) — fresh each app restart
  const popular = data
    .filter((a: any) => a.category === "popular")
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
  return { newReleases, popular };
}

// Fetch movies from edge function — now showing updates each month, classics shuffle each session
async function fetchMovies() {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/get-movies`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();
  const newReleases = (data.nowShowing || []).map((m: any) => ({
    id: m.id,
    title: m.label,
    year: m.year,
    genre: m.genre || "",
    category: "new_release",
  }));
  const popularClassics = (data.classics || [])
    .sort(() => Math.random() - 0.5)
    .map((m: any) => ({
      id: m.id,
      title: m.label,
      year: m.year,
      genre: m.genre || "",
      category: "classic",
    }));
  return { newReleases, popularClassics };
}

// Cuisine tag mapping from FOOD_TYPES to OSM cuisine tags
const CUISINE_OSM_TAGS: Record<string, string[]> = {
  Italian: ["italian", "pizza", "pasta"],
  Mexican: ["mexican", "tex-mex", "tacos"],
  Asian: ["asian", "chinese", "japanese", "korean", "thai", "vietnamese", "sushi"],
  American: ["american", "burger", "bbq", "diner", "fast_food"],
  Seafood: ["seafood", "fish_and_chips", "sushi"],
  Steakhouse: ["steak_house", "american", "grill"],
};

// Heuristics to classify a restaurant as budget or upscale based on OSM tags
function classifyRestaurant(tags: Record<string, string>): "budget" | "upscale" {
  const name = (tags.name || "").toLowerCase();
  const cuisine = (tags.cuisine || "").toLowerCase();
  const upscaleKeywords = ["fine dining", "steakhouse", "steak house", "bistro", "brasserie", "grill", "chophouse"];
  const budgetKeywords = ["fast food", "diner", "burger", "pizza", "taco", "cafe", "deli", "sub", "wing", "chicken", "thai"];
  if (upscaleKeywords.some(k => name.includes(k) || cuisine.includes(k))) return "upscale";
  if (budgetKeywords.some(k => name.includes(k) || cuisine.includes(k))) return "budget";
  // Default: names with common fast-food chains → budget, others → upscale
  const budgetChains = ["mcdonald", "burger king", "wendy", "taco bell", "chipotle", "subway", "domino", "pizza hut", "kfc", "popeye", "five guys", "shake shack", "chick-fil", "panda"];
  if (budgetChains.some(k => name.includes(k))) return "budget";
  return "upscale";
}

// Fetch real nearby restaurants using browser geolocation + OpenStreetMap Overpass API
async function fetchNearbyRestaurants(cuisineLabel: string, lat: number, lon: number): Promise<any[]> {
  const tags = CUISINE_OSM_TAGS[cuisineLabel] || [cuisineLabel.toLowerCase()];
  const cuisineFilter = tags.map(t => `["cuisine"~"${t}",i]`).join("");
  const query = `[out:json][timeout:20];(node["amenity"="restaurant"]${cuisineFilter}(around:20000,${lat},${lon});way["amenity"="restaurant"]${cuisineFilter}(around:20000,${lat},${lon}););out center 30;`;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "DatePlanner/1.0",
    },
    body: `data=${encodeURIComponent(query)}`,
  });
  if (!res.ok) throw new Error("Overpass API error");
  const json = await res.json();

  const seen = new Set<string>();
  return (json.elements || [])
    .filter((el: any) => el.tags?.name)
    .filter((el: any) => {
      if (seen.has(el.tags.name)) return false;
      seen.add(el.tags.name);
      return true;
    })
    .map((el: any) => ({
      id: el.id,
      name: el.tags.name,
      price_range: classifyRestaurant(el.tags),
      cuisine_type: el.tags.cuisine || cuisineLabel,
      location: [el.tags["addr:street"], el.tags["addr:city"]].filter(Boolean).join(", ") || null,
    }));
}

// ─── Nearby places (hiking / museum / cocktails / stargazing) ────────────────
const NEARBY_RADIUS_M = 48280; // 30 miles

function buildOverpassQuery(parts: string[], lat: number, lon: number): string {
  return `[out:json][timeout:25];(${parts.join("")});out tags center 20;`
    .replace(/\{lat\}/g, String(lat))
    .replace(/\{lon\}/g, String(lon));
}

const NEARBY_OSM_QUERIES: Record<string, (lat: number, lon: number) => string> = {
  hiking: (lat, lon) => buildOverpassQuery([
    `node["leisure"~"^(park|nature_reserve|recreation_ground)$"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["leisure"~"^(park|nature_reserve|recreation_ground)$"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `node["route"="hiking"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["route"="hiking"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
  ], lat, lon),
  museum: (lat, lon) => buildOverpassQuery([
    `node["tourism"~"^(museum|gallery)$"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["tourism"~"^(museum|gallery)$"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `node["amenity"="arts_centre"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["amenity"="arts_centre"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
  ], lat, lon),
  cocktails: (lat, lon) => buildOverpassQuery([
    `node["amenity"~"^(bar|pub)$"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["amenity"~"^(bar|pub)$"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `node["amenity"="nightclub"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["amenity"="nightclub"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
  ], lat, lon),
  stargazing: (lat, lon) => buildOverpassQuery([
    `node["amenity"="planetarium"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["amenity"="planetarium"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `node["tourism"="attraction"]["name"~"observatory|planetarium|astro|stargazing",i](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["tourism"="attraction"]["name"~"observatory|planetarium|astro|stargazing",i](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `way["leisure"~"^(nature_reserve|park)$"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
    `node["leisure"="nature_reserve"](around:${NEARBY_RADIUS_M},${lat},${lon});`,
  ], lat, lon),
};

function haversineM(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

async function fetchNearbyPlaces(typeId: string, lat: number, lon: number) {
  const queryFn = NEARBY_OSM_QUERIES[typeId];
  if (!queryFn) return [];
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "DatePlanner/1.0" },
    body: `data=${encodeURIComponent(queryFn(lat, lon))}`,
  });
  if (!res.ok) throw new Error("Overpass error");
  const json = await res.json();
  const seen = new Set<string>();
  return (json.elements || [])
    .filter((el: any) => el.tags?.name)
    .filter((el: any) => { if (seen.has(el.tags.name)) return false; seen.add(el.tags.name); return true; })
    .map((el: any) => {
      const elLat = el.lat ?? el.center?.lat ?? lat;
      const elLon = el.lon ?? el.center?.lon ?? lon;
      const addr = [
        el.tags["addr:housenumber"] && el.tags["addr:street"]
          ? `${el.tags["addr:housenumber"]} ${el.tags["addr:street"]}`
          : el.tags["addr:street"],
        el.tags["addr:city"],
      ].filter(Boolean).join(", ");
      return {
        name: el.tags.name as string,
        address: addr,
        distance_m: haversineM(lat, lon, elLat, elLon),
        kind: (el.tags.amenity || el.tags.tourism || el.tags.leisure || el.tags.route || "") as string,
      };
    })
    .sort((a: any, b: any) => a.distance_m - b.distance_m)
    .slice(0, 6) as { name: string; address: string; distance_m: number; kind: string }[];
}

// Location — uses IP geolocation (no permission needed) then silently upgrades
// to browser GPS if available, caching the result for 30 min.
function getCachedLocation(): { lat: number; lon: number } | null {
  try {
    const raw = sessionStorage.getItem("dp:location");
    if (!raw) return null;
    const { lat, lon, ts } = JSON.parse(raw);
    if (Date.now() - ts > 30 * 60 * 1000) return null;
    return { lat, lon };
  } catch {
    return null;
  }
}
function setCachedLocation(lat: number, lon: number) {
  sessionStorage.setItem("dp:location", JSON.stringify({ lat, lon, ts: Date.now() }));
}

async function getUserLocation(): Promise<{ lat: number; lon: number }> {
  const cached = getCachedLocation();
  if (cached) return cached;

  // IP geolocation — automatic, no permission prompt
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        const loc = { lat: data.latitude, lon: data.longitude };
        setCachedLocation(loc.lat, loc.lon);
        // Silently upgrade to GPS in background for better accuracy
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => setCachedLocation(pos.coords.latitude, pos.coords.longitude),
            () => {}, // ignore denial — IP coords are good enough
            { timeout: 5000, maximumAge: 30 * 60 * 1000 }
          );
        }
        return loc;
      }
    }
  } catch {
    // fall through to GPS attempt
  }

  // GPS fallback if IP geolocation failed
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error("Location unavailable")); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setCachedLocation(loc.lat, loc.lon);
        resolve(loc);
      },
      () => reject(new Error("Location unavailable")),
      { timeout: 8000 }
    );
  });
}

// Fetch restaurants from Supabase as fallback
async function fetchRestaurantsFallback(cuisineLabel: string) {
  const encoded = encodeURIComponent(`%${cuisineLabel}%`);
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/restaurants?cuisine_type=ilike.${encoded}&is_active=eq.true&select=*&order=name.asc`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!response.ok) throw new Error("Failed to fetch restaurants");
  return await response.json() as any[];
}

// ─── User-local storage helpers ──────────────────────────────────────────
function getUserId(): string {
  let uid = localStorage.getItem("dp:user-id");
  if (!uid) {
    uid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    localStorage.setItem("dp:user-id", uid);
  }
  return uid;
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
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);

  const escape = React.useCallback(() => {
    setPos((prev) => {
      let nx: number, ny: number;
      let attempts = 0;
      do {
        nx = 8 + Math.random() * 72;
        ny = 8 + Math.random() * 72;
        attempts++;
      } while (
        attempts < 20 &&
        prev !== null &&
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

        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="h-16 px-14 text-xl font-semibold rounded-2xl gap-3 shadow-lg"
            onClick={() => navigate("/when")}
            data-testid="yes-button"
          >
            <Heart className="w-5 h-5 fill-current" />
            Yes!
          </Button>

          {pos === null && (
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-14 text-xl font-semibold rounded-2xl gap-3 border-2"
              onMouseEnter={escape}
              onTouchStart={escape}
              onClick={escape}
              data-testid="no-thanks-button"
            >
              No thanks
            </Button>
          )}
        </div>
      </div>

      {pos !== null && (
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
          onTouchStart={escape}
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
      )}
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

// ─── Recommendation Panel (Supabase) ─────────────────────────────────────

const DATE_TYPE_TO_CATEGORY: Record<string, string> = {
  restaurant: "indoor",
  cinema: "indoor",
  cooking: "indoor",
  cocktails: "indoor",
  museum: "indoor",
  picnic: "outdoor",
  hiking: "outdoor",
  stargazing: "outdoor",
};

function RecommendPanel({ dateType }: { dateType: string }) {
  const category = DATE_TYPE_TO_CATEGORY[dateType] || "indoor";

  const { data, isLoading } = useQuery({
    queryKey: ["activity-recommendations", category],
    queryFn: async () => {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/activity_recommendations?category=eq.${category}&is_active=eq.true&select=name,description&limit=3`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      if (!res.ok) return [];
      return res.json() as Promise<{ name: string; description: string }[]>;
    },
  });

  if (isLoading || !data || data.length === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 mb-6" data-testid="recommend-panel">
      <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
        <Sparkles className="w-4 h-4" />
        Ideas for your date
      </div>
      <div className="space-y-2">
        {data.map((rec, i) => (
          <div key={i} className="rounded-xl bg-background/70 border border-border/60 px-3 py-2.5" data-testid={`recommendation-${i}`}>
            <p className="text-sm font-medium text-foreground">{rec.name}</p>
            {rec.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────

// Where Page - Main date type selection
function Where() {
  const [, navigate] = useLocation();
  const search = useSearch();

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
                <div className="pointer-events-none">
                  <option.Illustration />
                </div>
                <span className="text-sm font-medium text-foreground text-center pointer-events-none">{option.label}</span>
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
  const [locationError, setLocationError] = React.useState<string | null>(null);
  const [usingFallback, setUsingFallback] = React.useState(false);

  const foodType = FOOD_TYPES.find(t => t.id === foodTypeId);

  const { data: restaurants = [], isLoading } = useQuery({
    queryKey: ['restaurants-nearby', foodTypeId],
    queryFn: async () => {
      // Always load Supabase data first — instant and reliable
      const supabaseResults = await fetchRestaurantsFallback(foodType?.label || foodTypeId);

      // Try to get real nearby restaurants; fall back to Supabase data if anything fails
      try {
        const loc = await getUserLocation();
        const nearby = await fetchNearbyRestaurants(foodType?.label || foodTypeId, loc.lat, loc.lon);
        if (nearby.length > 0) {
          setUsingFallback(false);
          return nearby;
        }
      } catch {
        // Overpass or geolocation failed — use Supabase results
      }

      setUsingFallback(true);
      return supabaseResults;
    },
    enabled: !!foodType,
    staleTime: 10 * 60 * 1000,
  });

  function handleContinue() {
    if (selectedRestaurant) {
      const p = new URLSearchParams(search);
      p.set("title", `${foodType?.label} at ${selectedRestaurant}`);
      p.set("venueId", "restaurant");
      p.set("location", selectedRestaurant);
      p.set("foodType", foodTypeId || "");
      p.set("restaurant", selectedRestaurant);
      navigate(`/confirm?${p.toString()}`);
    }
  }

  const budgetList = restaurants.filter((r: any) => r.price_range === 'budget');
  const upscaleList = restaurants.filter((r: any) => r.price_range === 'upscale');

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

        <div className="flex items-center gap-3 mb-2">
          {foodType && (
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <foodType.Icon className="w-7 h-7 text-primary" strokeWidth={1.75} />
            </div>
          )}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
              {foodType?.label} Restaurants
            </h1>
            <p className="text-muted-foreground text-sm">
              {usingFallback ? "Popular options" : "Near you"}
            </p>
          </div>
        </div>

        {locationError === "denied" && (
          <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5 text-xs text-amber-700">
            Location access was denied — showing popular options instead.
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Finding restaurants near you…</p>
          </div>
        ) : (
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-0.5">
            {budgetList.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Budget-Friendly
                </h3>
                <div className="space-y-2">
                  {budgetList.slice(0, 8).map((restaurant: any) => {
                    const isSelected = selectedRestaurant === restaurant.name;
                    return (
                      <button
                        key={restaurant.id}
                        onClick={() => setSelectedRestaurant(restaurant.name)}
                        className={`w-full flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all duration-150 ${
                          isSelected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <Utensils className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`font-medium text-sm truncate ${isSelected ? "text-primary" : "text-foreground"}`}>
                              {restaurant.name}
                            </span>
                          </div>
                          {restaurant.location && (
                            <p className="text-xs text-muted-foreground mt-0.5 ml-7 truncate">{restaurant.location}</p>
                          )}
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 transition-all ${
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {upscaleList.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Upscale Dining
                </h3>
                <div className="space-y-2">
                  {upscaleList.slice(0, 8).map((restaurant: any) => {
                    const isSelected = selectedRestaurant === restaurant.name;
                    return (
                      <button
                        key={restaurant.id}
                        onClick={() => setSelectedRestaurant(restaurant.name)}
                        className={`w-full flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all duration-150 ${
                          isSelected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <Utensils className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`font-medium text-sm truncate ${isSelected ? "text-primary" : "text-foreground"}`}>
                              {restaurant.name}
                            </span>
                          </div>
                          {restaurant.location && (
                            <p className="text-xs text-muted-foreground mt-0.5 ml-7 truncate">{restaurant.location}</p>
                          )}
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 transition-all ${
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {budgetList.length === 0 && upscaleList.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No {foodType?.label} restaurants found nearby. Try a different cuisine.
              </p>
            )}
          </div>
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
  const [selectedCategory, setSelectedCategory] = React.useState<"new" | "classics" | "anime">("new");

  // weekSlot in the query key ensures React Query refetches when the week changes
  const weekSlot = (Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % 4) + 1;
  const { data: movies, isLoading: moviesLoading } = useQuery({
    queryKey: ['movies', weekSlot],
    queryFn: fetchMovies,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });
  // Session seed changes on every page load — forces a fresh shuffle of popular series each restart
  const sessionSeed = React.useRef(Math.random()).current;
  const { data: animeData, isLoading: animeLoading } = useQuery({
    queryKey: ['anime', weekSlot, sessionSeed],
    queryFn: fetchAnime,
    staleTime: Infinity,
  });

  const isLoading = moviesLoading || (selectedCategory === "anime" && animeLoading);

  const currentMovies = selectedCategory === "new"
    ? (movies?.newReleases || [])
    : selectedCategory === "classics"
    ? (movies?.popularClassics || [])
    : selectedCategory === "anime" && animeData
    ? (animeData.newReleases.length > 0 ? animeData.newReleases : animeData.popular)
    : [];

  // For anime tab, show new releases section + popular section separately
  const animeNewReleases = animeData?.newReleases || [];
  const animePopular = animeData?.popular || [];

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

        <RecommendPanel dateType="cinema" />

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setSelectedCategory("new"); setSelectedMovie(null); }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "new"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-1.5" />
            2026
          </button>
          <button
            onClick={() => { setSelectedCategory("classics"); setSelectedMovie(null); }}
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
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "anime"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <PokeballIcon className="w-4 h-4 inline mr-1.5" />
            Anime
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : selectedCategory === "anime" ? (
          <div className="space-y-4 mb-6 max-h-[26rem] overflow-y-auto">
            {animeNewReleases.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> New Series
                </p>
                <div className="space-y-2">
                  {animeNewReleases.map((anime: any) => {
                    const isSelected = selectedMovie?.title === anime.title;
                    return (
                      <button
                        key={anime.title}
                        onClick={() => setSelectedMovie({ title: anime.title, year: anime.year, genre: anime.genre })}
                        className={`w-full flex items-start justify-between rounded-2xl border-2 p-4 text-left transition-all duration-150 ${
                          isSelected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <PokeballIcon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`font-medium text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>{anime.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground ml-6">
                            <span>{anime.year}</span>
                            <span className="text-border">•</span>
                            <span>{anime.genre}</span>
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
              </div>
            )}
            {animePopular.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2 flex items-center gap-2">
                  <Star className="w-3 h-3" /> Popular Series
                </p>
                <div className="space-y-2">
                  {animePopular.map((anime: any) => {
                    const isSelected = selectedMovie?.title === anime.title;
                    return (
                      <button
                        key={anime.title}
                        onClick={() => setSelectedMovie({ title: anime.title, year: anime.year, genre: anime.genre })}
                        className={`w-full flex items-start justify-between rounded-2xl border-2 p-4 text-left transition-all duration-150 ${
                          isSelected ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <PokeballIcon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`font-medium text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>{anime.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground ml-6">
                            <span>{anime.year}</span>
                            <span className="text-border">•</span>
                            <span>{anime.genre}</span>
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
              </div>
            )}
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

const DATE_TYPE_OPTIONS: Record<string, DateOptions> = {
  picnic: {
    title: "Picnic in the Park",
    subtitle: "Let's set the scene",
    groups: [
      {
        label: "Setting",
        key: "setting",
        items: [
          { id: "rose-garden", label: "Rose Garden", icon: "Flower", desc: "Fragrant & romantic" },
          { id: "lakeside", label: "Lakeside Lawn", icon: "Waves", desc: "Ducks & reflections" },
          { id: "hilltop", label: "Hilltop View", icon: "Mountain", desc: "See the whole city" },
          { id: "wildflower", label: "Wildflower Meadow", icon: "Flower2", desc: "Golden & open" },
          { id: "secret-grove", label: "Secret Grove", icon: "Trees", desc: "Shaded & private" },
          { id: "sunset-point", label: "Sunset Point", icon: "Sunset", desc: "Golden hour magic" },
        ],
      },
      {
        label: "Spread",
        key: "spread",
        items: [
          { id: "cheese-board", label: "Cheese & Charcuterie", icon: "Wheat", desc: "Brie, grapes, salami" },
          { id: "sandwiches", label: "Gourmet Sandwiches", icon: "Sandwich", desc: "Crusty bread, pesto" },
          { id: "sweet-treats", label: "Sweet Treats", icon: "Cake", desc: "Berries & chocolate" },
          { id: "wine-pairings", label: "Wine & Bites", icon: "Wine", desc: "Rosé and snacks" },
        ],
      },
    ],
  },
  hiking: {
    title: "Nature Hike",
    subtitle: "Pick your trail and pace",
    groups: [
      {
        label: "Trail",
        key: "trail",
        items: [
          { id: "forest-loop", label: "Forest Loop", icon: "Trees", desc: "Easy · 2 mi · pine scent" },
          { id: "river-walk", label: "River Walk", icon: "Droplets", desc: "Easy · 3 mi · flat path" },
          { id: "waterfall-trail", label: "Waterfall Trail", icon: "Waves", desc: "Moderate · 4 mi" },
          { id: "ridge-climb", label: "Ridge Climb", icon: "Mountain", desc: "Hard · 6 mi · views" },
          { id: "sunset-summit", label: "Sunset Summit", icon: "Sunset", desc: "Hard · 5 mi · golden hour" },
          { id: "cave-route", label: "Cave Route", icon: "Flame", desc: "Moderate · 3 mi · cool & dim" },
        ],
      },
      {
        label: "Pace",
        key: "pace",
        items: [
          { id: "slow-stroll", label: "Slow Stroll", icon: "Snail", desc: "Talk, breathe, linger" },
          { id: "steady", label: "Steady", icon: "Footprints", desc: "Comfortable pace" },
          { id: "challenge", label: "Challenge Mode", icon: "Zap", desc: "Push yourselves" },
        ],
      },
    ],
  },
  cooking: {
    title: "Cook Together",
    subtitle: "What are we making tonight?",
    groups: [
      {
        label: "Dish",
        key: "dish",
        items: [
          { id: "fresh-pasta", label: "Fresh Pasta", icon: "Utensils", desc: "Hand-rolled tagliatelle" },
          { id: "homemade-pizza", label: "Homemade Pizza", icon: "Pizza", desc: "Toss the dough" },
          { id: "sushi-night", label: "Sushi Night", icon: "Fish", desc: "Roll your own" },
          { id: "taco-bar", label: "Taco Bar", icon: "Wheat", desc: "All the toppings" },
          { id: "ramen", label: "Ramen", icon: "Soup", desc: "Slow broth, soft eggs" },
          { id: "dessert-bake", label: "Dessert Bake", icon: "Cake", desc: "Tiramisu / soufflé" },
        ],
      },
      {
        label: "Mood",
        key: "mood",
        items: [
          { id: "candlelit", label: "Candlelit", icon: "Flame", desc: "Low light, slow music" },
          { id: "fun-chaotic", label: "Fun & Chaotic", icon: "PartyPopper", desc: "Aprons, flour fight" },
          { id: "wine-and-jazz", label: "Wine & Jazz", icon: "Music", desc: "Sip and stir" },
        ],
      },
    ],
  },
  museum: {
    title: "Museum or Gallery",
    subtitle: "Choose your exhibition",
    groups: [
      {
        label: "Exhibition",
        key: "exhibition",
        items: [
          { id: "impressionist", label: "Impressionists", icon: "Palette", desc: "Monet, Renoir, Degas" },
          { id: "modern-art", label: "Modern Art", icon: "Frame", desc: "Abstract, bold, weird" },
          { id: "photography", label: "Photography", icon: "Camera", desc: "Black & white silence" },
          { id: "ancient-civ", label: "Ancient Civilizations", icon: "Landmark", desc: "Egypt, Rome, Greece" },
          { id: "science-nature", label: "Science & Nature", icon: "Telescope", desc: "Dinosaurs & cosmos" },
          { id: "sculpture-garden", label: "Sculpture Garden", icon: "Brush", desc: "Outdoor, contemplative" },
        ],
      },
      {
        label: "After",
        key: "after",
        items: [
          { id: "cafe-debrief", label: "Café Debrief", icon: "Coffee", desc: "Discuss what we saw" },
          { id: "bookstore", label: "Bookstore Browse", icon: "BookOpen", desc: "Pick a book for each other" },
          { id: "park-walk", label: "Park Walk", icon: "TreePine", desc: "Let it sink in" },
        ],
      },
    ],
  },
  cocktails: {
    title: "Cocktails & Drinks",
    subtitle: "Set the scene",
    groups: [
      {
        label: "Spot",
        key: "spot",
        items: [
          { id: "speakeasy", label: "Hidden Speakeasy", icon: "Lock", desc: "Press the bookcase" },
          { id: "rooftop", label: "Rooftop Bar", icon: "Building2", desc: "City lights below" },
          { id: "tiki-bar", label: "Tiki Bar", icon: "Palmtree", desc: "Tropical & playful" },
          { id: "wine-bar", label: "Cozy Wine Bar", icon: "Wine", desc: "Candles & small plates" },
          { id: "jazz-lounge", label: "Jazz Lounge", icon: "Music", desc: "Live music, low light" },
          { id: "natural-wine", label: "Natural Wine Spot", icon: "Grape", desc: "Funky pours & pét-nat" },
        ],
      },
      {
        label: "Signature",
        key: "signature",
        items: [
          { id: "negroni", label: "Negroni", icon: "Martini", desc: "Bitter, classic" },
          { id: "espresso-martini", label: "Espresso Martini", icon: "Coffee", desc: "Buzz & boldness" },
          { id: "old-fashioned", label: "Old Fashioned", icon: "GlassWater", desc: "Bourbon, bitters, orange" },
          { id: "spritz", label: "Spritz", icon: "Citrus", desc: "Bubbly & light" },
        ],
      },
    ],
  },
  stargazing: {
    title: "Stargazing",
    subtitle: "Find the perfect dark sky",
    groups: [
      {
        label: "Where",
        key: "where",
        items: [
          { id: "rooftop", label: "Rooftop Blanket", icon: "Building2", desc: "City sky, our own quiet" },
          { id: "lake-shore", label: "Lake Shore", icon: "Waves", desc: "Reflections on water" },
          { id: "hilltop", label: "Hilltop", icon: "Mountain", desc: "Above the light pollution" },
          { id: "observatory", label: "Local Observatory", icon: "Telescope", desc: "Real telescopes" },
          { id: "desert", label: "Desert Sky", icon: "Tent", desc: "Brightest stars you'll see" },
          { id: "field", label: "Open Field", icon: "Wheat", desc: "Lie down, look up" },
        ],
      },
      {
        label: "To Spot",
        key: "spot",
        items: [
          { id: "milky-way", label: "The Milky Way", icon: "Sparkles", desc: "Best after midnight" },
          { id: "meteor-shower", label: "Meteor Shower", icon: "Zap", desc: "Wishes incoming" },
          { id: "moon-craters", label: "Moon Craters", icon: "Moon", desc: "Bring binoculars" },
          { id: "constellations", label: "Constellations", icon: "Star", desc: "Orion, Cassiopeia, Lyra" },
          { id: "planets", label: "Planets", icon: "Globe", desc: "Saturn's rings, maybe" },
        ],
      },
    ],
  },
};

function fetchDateOptions(typeId: string): DateOptions {
  const options = DATE_TYPE_OPTIONS[typeId];
  if (!options) throw new Error("Unknown date type");
  return options;
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

const NEARBY_SUPPORTED = new Set(["hiking", "museum", "cocktails", "stargazing"]);

function NearbyPlacesPanel({ typeId }: { typeId: string }) {
  const [, navigate] = useLocation();
  const search = useSearch();
  type Place = { name: string; address: string; distance_m: number; kind: string };
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [status, setStatus] = React.useState<"loading" | "done" | "error">("loading");

  React.useEffect(() => {
    if (!NEARBY_SUPPORTED.has(typeId)) return;
    setStatus("loading");
    setPlaces([]);
    getUserLocation()
      .then(({ lat, lon }) => fetchNearbyPlaces(typeId, lat, lon))
      .then((data) => { setPlaces(data); setStatus("done"); })
      .catch(() => setStatus("error"));
  }, [typeId]);

  if (!NEARBY_SUPPORTED.has(typeId)) return null;
  if (status === "error" || (status === "done" && places.length === 0)) return null;

  function formatDist(m: number) {
    const mi = m / 1609.34;
    return mi < 0.1 ? "< 0.1 mi" : `${mi.toFixed(1)} mi`;
  }

  function handleSelect(place: Place) {
    const params = new URLSearchParams(search);
    params.set("title", place.name);
    params.set("location", place.address || place.name);
    params.set("venueId", typeId);
    navigate(`/confirm?${params.toString()}`);
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
          Places Near You
        </p>
        {status === "loading" && (
          <Loader2 className="w-3 h-3 animate-spin text-muted-foreground/40 ml-auto" />
        )}
      </div>

      {status === "loading" ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[58px] rounded-2xl bg-muted/40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {places.map((place) => (
            <button
              key={place.name}
              onClick={() => handleSelect(place)}
              className="w-full flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-3 text-left hover:border-primary/50 hover:bg-primary/5 active:scale-[0.99] transition-all duration-150"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{place.name}</p>
                {place.address && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{place.address}</p>
                )}
              </div>
              <span className="text-xs text-muted-foreground/60 flex-shrink-0 tabular-nums">
                {formatDist(place.distance_m)}
              </span>
            </button>
          ))}
        </div>
      )}

      {status === "done" && places.length > 0 && (
        <p className="text-xs text-muted-foreground/40 text-center mt-3 mb-1">
          Or choose a vibe below
        </p>
      )}
    </div>
  );
}

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

        <NearbyPlacesPanel typeId={typeId} />

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
        const response = await fetch(`${SUPABASE_URL}/functions/v1/send-date-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SUPABASE_KEY}` },
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
      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-date-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_KEY}` },
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
