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

// Date option illustrations — vintage / retro poster style
const DateIllustrations = {
  restaurant: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      {/* Dashed border ring — vintage label style */}
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Plate shadow */}
      <ellipse cx="51" cy="68" rx="22" ry="4" fill="hsl(var(--primary) / 0.12)"/>
      {/* Plate — outer rim */}
      <circle cx="50" cy="62" r="22" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      {/* Plate — decorative bands */}
      <circle cx="50" cy="62" r="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.45"/>
      <circle cx="50" cy="62" r="14" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.7"/>
      {/* Cross-hatch on plate well — manual lines, no clip id needed */}
      <g opacity="0.18">
        {[37,41,45,49,53,57,61].map(x => (
          <line key={`v${x}`} x1={x} y1="49" x2={x} y2="75" stroke="hsl(var(--primary))" strokeWidth="1"/>
        ))}
        {[49,53,57,61,65,69,73].map(y => (
          <line key={`h${y}`} x1="37" y1={y} x2="63" y2={y} stroke="hsl(var(--primary))" strokeWidth="1"/>
        ))}
      </g>
      {/* Cloche dome */}
      <path d="M29 52 Q29 28 50 28 Q71 28 71 52 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      <line x1="27" y1="52" x2="73" y2="52" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Dome highlight (light gloss arc) */}
      <path d="M35 43 Q40 33 48 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" opacity="0.3"/>
      {/* Knob */}
      <ellipse cx="50" cy="27" rx="4" ry="2.8" fill="hsl(var(--primary))"/>
      <rect x="48.2" y="27" width="3.5" height="3.5" fill="hsl(var(--primary))"/>
      {/* Fork */}
      <line x1="21" y1="22" x2="21" y2="30" stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="25" y1="22" x2="25" y2="30" stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="29" y1="22" x2="29" y2="30" stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M21 30 Q25 37 25 42 L25 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.9" strokeLinecap="round"/>
      {/* Knife */}
      <path d="M75 22 Q82 26 82 38 L75 40 L75 82" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cinema: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Film reel outer ring */}
      <circle cx="50" cy="46" r="30" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="2.2"/>
      <circle cx="50" cy="46" r="26" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" opacity="0.35"/>
      {/* Spokes — 6 like a real reel */}
      {[0,60,120,180,240,300].map(deg => {
        const a = (deg - 90) * Math.PI / 180;
        return <line key={deg} x1={50 + 8 * Math.cos(a)} y1={46 + 8 * Math.sin(a)} x2={50 + 24 * Math.cos(a)} y2={46 + 24 * Math.sin(a)} stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>;
      })}
      {/* Hub */}
      <circle cx="50" cy="46" r="9" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <circle cx="50" cy="46" r="4.5" fill="hsl(var(--primary))" />
      <circle cx="50" cy="46" r="2" fill="hsl(var(--primary) / 0.1)"/>
      {/* Sprocket holes — 8 around edge */}
      {[0,45,90,135,180,225,270,315].map(deg => {
        const a = (deg - 90) * Math.PI / 180;
        const x = 50 + 27 * Math.cos(a);
        const y = 46 + 27 * Math.sin(a);
        return <circle key={deg} cx={x} cy={y} r="2.2" fill="hsl(var(--primary))" opacity="0.8"/>;
      })}
      {/* Film strip at bottom */}
      <rect x="12" y="80" width="76" height="13" rx="2" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={15 + i * 15} y="82.5" width="5" height="8" rx="1" fill="hsl(var(--primary))" opacity="0.7"/>
      ))}
      {/* Frame dividers */}
      {[1,2,3,4].map(i => (
        <line key={i} x1={14 + i*15} y1="80" x2={14 + i*15} y2="93" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5"/>
      ))}
    </svg>
  ),
  picnic: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Basket handle — thick arch */}
      <path d="M28 56 Q28 28 50 28 Q72 28 72 56" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M28 56 Q28 30 50 30 Q70 30 72 56" stroke="hsl(var(--primary) / 0.25)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Basket shadow */}
      <ellipse cx="51" cy="84" rx="21" ry="4" fill="hsl(var(--primary) / 0.12)"/>
      {/* Basket body */}
      <path d="M22 56 L78 56 L72 84 L28 84 Z" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      {/* Checkered cloth top */}
      <rect x="22" y="50" width="56" height="9" rx="1" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="0"/>
      {/* Cloth checks — alternating squares */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={23 + i * 8} y="51" width="8" height="4" rx="0"
          fill={i % 2 === 0 ? "hsl(var(--primary) / 0.3)" : "hsl(var(--primary) / 0.05)"} />
      ))}
      <rect x="22" y="50" width="56" height="8" rx="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      {/* Weave lines — vertical */}
      <line x1="36" y1="58" x2="33" y2="84" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.55"/>
      <line x1="50" y1="58" x2="50" y2="84" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.55"/>
      <line x1="64" y1="58" x2="67" y2="84" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.55"/>
      {/* Weave lines — horizontal */}
      <line x1="24" y1="66" x2="76" y2="66" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.55"/>
      <line x1="26" y1="74" x2="74" y2="74" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.55"/>
      {/* Apple peeking out */}
      <circle cx="64" cy="52" r="5.5" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <path d="M63 47 Q64 44 65 47" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  hiking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Sun with rays — vintage WPA style */}
      <circle cx="50" cy="34" r="7" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
        const a = (deg - 90) * Math.PI / 180;
        return <line key={deg} x1={50 + 10 * Math.cos(a)} y1={34 + 10 * Math.sin(a)} x2={50 + 14 * Math.cos(a)} y2={34 + 14 * Math.sin(a)} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>;
      })}
      {/* Back mountain — lighter */}
      <path d="M10 80 L42 38 L60 62 L74 44 L92 80 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinejoin="round" opacity="0.7"/>
      {/* Front mountain — bold */}
      <path d="M16 80 L50 28 L84 80 Z" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Snow cap */}
      <path d="M41 44 L50 28 L59 44 L55 43 L50 32 L45 43 Z" fill="hsl(var(--primary))" opacity="0.9"/>
      {/* Pine trees */}
      <path d="M22 80 L28 68 L34 80 Z" fill="hsl(var(--primary) / 0.5)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      <path d="M68 80 L74 68 L80 80 Z" fill="hsl(var(--primary) / 0.5)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      {/* Ground line */}
      <line x1="10" y1="80" x2="90" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  cooking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Steam — wavy vintage curls */}
      <path d="M36 22 Q40 28 36 34 Q32 40 36 46" stroke="hsl(var(--primary))" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M50 16 Q54 23 50 30 Q46 37 50 44" stroke="hsl(var(--primary))" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M64 20 Q68 26 64 32 Q60 38 64 44" stroke="hsl(var(--primary))" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.7"/>
      {/* Lid */}
      <path d="M24 52 Q24 44 50 44 Q76 44 76 52 Z" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <line x1="22" y1="52" x2="78" y2="52" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Lid knob */}
      <rect x="44" y="40" width="12" height="5" rx="2.5" fill="hsl(var(--primary))"/>
      {/* Pot body — rounded Dutch oven */}
      <path d="M24 52 Q20 54 20 64 Q20 80 50 80 Q80 80 80 64 Q80 54 76 52 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Pot band — decorative ring */}
      <path d="M24 60 Q24 56 50 56 Q76 56 76 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4"/>
      {/* Side handles */}
      <path d="M20 60 Q12 60 12 68 Q12 76 20 76" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.4" strokeLinecap="round"/>
      <path d="M80 60 Q88 60 88 68 Q88 76 80 76" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  ),
  museum: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Pediment */}
      <path d="M14 40 L50 18 L86 40 Z" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Tympanum decoration — simple triangle within */}
      <path d="M26 40 L50 24 L74 40 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.35"/>
      {/* Frieze bar */}
      <rect x="14" y="40" width="72" height="7" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* Metope dots on frieze */}
      {[21,33,45,57,69,81].map(x => (
        <circle key={x} cx={x} cy="43.5" r="1.8" fill="hsl(var(--primary))" opacity="0.7"/>
      ))}
      {/* Columns — 4 fluted */}
      {[20,36,52,68].map((x,i) => (
        <g key={i}>
          <rect x={x} y="47" width="8" height="32" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
          {/* Flute lines */}
          <line x1={x+2.7} y1="47" x2={x+2.7} y2="79" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.4"/>
          <line x1={x+5.3} y1="47" x2={x+5.3} y2="79" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.4"/>
        </g>
      ))}
      {/* Entablature cap */}
      <rect x="18" y="79" width="64" height="4" fill="hsl(var(--primary) / 0.4)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* Steps */}
      <rect x="14" y="83" width="72" height="5" rx="1" fill="hsl(var(--primary) / 0.55)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <rect x="10" y="88" width="80" height="4" rx="1" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
    </svg>
  ),
  cocktails: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Glass cone — Art Deco angular */}
      <path d="M20 22 L80 22 L55 64 L45 64 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Liquid fill — lower portion */}
      <path d="M30 36 L70 36 L55 64 L45 64 Z" fill="hsl(var(--primary) / 0.25)" stroke="none"/>
      {/* Liquid surface line */}
      <line x1="30" y1="36" x2="70" y2="36" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.6"/>
      {/* Glass rim highlight */}
      <line x1="20" y1="22" x2="50" y2="22" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      {/* Rim reflection dots — Art Deco detail */}
      {[26,34,42,50,58,66,74].map(x => (
        <circle key={x} cx={x} cy="22" r="1.2" fill="hsl(var(--primary))" opacity="0.55"/>
      ))}
      {/* Stem */}
      <line x1="50" y1="64" x2="50" y2="84" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
      {/* Base with decorative width */}
      <path d="M34 84 Q34 87 50 88 Q66 87 66 84" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Cocktail pick with olives */}
      <line x1="62" y1="18" x2="72" y2="38" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="64" cy="24" r="3.5" fill="hsl(var(--primary) / 0.4)" stroke="hsl(var(--primary))" strokeWidth="1.6"/>
      <circle cx="68" cy="32" r="3.5" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      {/* Citrus garnish on rim */}
      <path d="M18 22 Q14 18 16 14 Q20 10 24 14 Q26 18 22 22" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
    </svg>
  ),
  stargazing: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Vintage telescope — angled tube */}
      {/* Eyepiece end */}
      <rect x="24" y="32" width="10" height="16" rx="3" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(-30 29 40)"/>
      {/* Main barrel — tapered */}
      <path d="M32 28 L62 18 L68 28 L38 38 Z" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      {/* Lens ring */}
      <ellipse cx="65" cy="23" rx="5" ry="8" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="2" transform="rotate(-30 65 23)"/>
      {/* Barrel bands */}
      <line x1="42" y1="36" x2="48" y2="22" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5"/>
      <line x1="52" y1="33" x2="58" y2="19" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5"/>
      {/* Tripod */}
      <line x1="30" y1="46" x2="20" y2="82" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="34" y1="48" x2="38" y2="82" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="36" y1="46" x2="54" y2="80" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Tripod brace */}
      <line x1="22" y1="68" x2="52" y2="66" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
      {/* Crescent moon */}
      <path d="M74 18 A 14 14 0 1 0 88 52 A 10 10 0 1 1 74 18 Z" fill="hsl(var(--primary) / 0.28)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Stars */}
      <path d="M66 62 L68 68 L74 68 L69 72 L71 78 L66 74 L61 78 L63 72 L58 68 L64 68 Z" fill="hsl(var(--primary))" scale="0.5"/>
      <path d="M78 60 L79 63 L82 64 L79 65 L78 68 L77 65 L74 64 L77 63 Z" fill="hsl(var(--primary))" opacity="0.9"/>
      <circle cx="68" cy="58" r="1.8" fill="hsl(var(--primary))" opacity="0.8"/>
      <circle cx="84" cy="72" r="1.4" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="92" cy="44" r="1.6" fill="hsl(var(--primary))" opacity="0.75"/>
    </svg>
  ),
  custom: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.08)"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.25"/>
      {/* Parchment scroll */}
      <rect x="22" y="28" width="56" height="52" rx="4" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* Scroll curl top */}
      <path d="M22 36 Q16 32 22 28 Q28 24 34 28" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M78 36 Q84 32 78 28 Q72 24 66 28" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Scroll curl bottom */}
      <path d="M22 72 Q16 76 22 80 Q28 84 34 80" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M78 72 Q84 76 78 80 Q72 84 66 80" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Text lines on parchment */}
      <line x1="32" y1="42" x2="68" y2="42" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="32" y1="50" x2="68" y2="50" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="32" y1="58" x2="60" y2="58" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      {/* Fountain pen / quill */}
      <path d="M58 38 Q78 18 84 16 Q80 26 72 36 L68 44 Z" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M58 38 L62 46 L68 44 Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Nib split */}
      <line x1="58" y1="38" x2="64" y2="45" stroke="hsl(var(--primary) / 0.5)" strokeWidth="0.8"/>
      {/* Ink drop */}
      <path d="M56 42 Q54 46 56 49 Q58 46 56 42 Z" fill="hsl(var(--primary))" opacity="0.8"/>
      {/* Wax seal */}
      <circle cx="36" cy="68" r="8" fill="hsl(var(--primary) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      {/* Seal star */}
      <path d="M36 61 L37.5 65.5 L42 65.5 L38.5 68.5 L40 73 L36 70.5 L32 73 L33.5 68.5 L30 65.5 L34.5 65.5 Z" fill="hsl(var(--primary))" opacity="0.9"/>
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
