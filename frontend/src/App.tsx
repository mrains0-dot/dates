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



// Date option illustrations — detailed romantic line-art scenes
const DateIllustrations = {

  // RESTAURANT — candlelit table: wine glass, lit candle, rose
  restaurant: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.04)"/>
      {/* Table surface */}
      <path d="M4 84 C20 80 36 78 50 78 C64 78 80 80 96 84" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round"/>
      {/* Tablecloth fold */}
      <path d="M8 84 C16 86 24 88 32 90" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      <path d="M92 84 C84 86 76 88 68 90" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      {/* --- CANDLE (left) --- */}
      <ellipse cx="20" cy="82" rx="6" ry="2" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.9"/>
      <path d="M16 82 L16 79 C16 77.5 17.5 77 20 77 C22.5 77 24 77.5 24 79 L24 82" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinejoin="round"/>
      <rect x="17" y="60" width="6" height="19" rx="0.6" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.1"/>
      {/* drip 1 */}
      <path d="M17.5 65 C16.5 67.5 16.5 70 17.5 70.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      {/* drip 2 */}
      <path d="M22 69 C23 71.5 23 74 22 74.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      <line x1="20" y1="60" x2="20" y2="57.5" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      {/* flame */}
      <path d="M20 57.5 C18 54 16.5 50 18 47 C19 44 21.5 44 22.5 46.5 C23.5 44 26 45 26 48 C27 51.5 25 55 21.5 57.5 Z" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.5 57 C19.5 54 20 50 21 47.5 C22 50 22 54 21 57" fill="hsl(var(--primary) / 0.3)" stroke="none"/>
      <circle cx="20" cy="52" r="5.5" fill="hsl(var(--primary) / 0.04)" stroke="none"/>
      {/* --- WINE GLASS (center) --- */}
      {/* bowl */}
      <path d="M32 18 C30 26 28 38 31 50 C33 58 40 65 50 67 C60 65 67 58 69 50 C72 38 70 26 68 18" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      {/* rim ellipse */}
      <ellipse cx="50" cy="18" rx="18" ry="5" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.9"/>
      {/* wine fill line */}
      <path d="M35 34 C39 31.5 45 30 50 30 C55 30 61 31.5 65 34" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      {/* wine area */}
      <path d="M35 34 C39 31.5 45 30 50 30 C55 30 61 31.5 65 34 C67.5 40 71 46 69 50 C67 58 60 65 50 67 C40 65 33 58 31 50 C29 46 32.5 40 35 34" fill="hsl(var(--primary) / 0.12)" stroke="none"/>
      {/* glass reflection highlight left */}
      <path d="M33.5 22 C32.5 30 31.5 40 32 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      {/* shorter inner highlight */}
      <path d="M38 20 C37.5 26 37 34 37.5 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.45" strokeLinecap="round" opacity="0.25"/>
      {/* stem */}
      <path d="M46 67 C46.5 69 46.5 73 47 77 C48 79 52 79 53 77 C53.5 73 53.5 69 54 67" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      {/* foot */}
      <ellipse cx="50" cy="79" rx="12" ry="3.5" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1.6"/>
      {/* --- ROSE (right) --- */}
      {/* stem */}
      <path d="M80 44 C78 52 77 62 81 78" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      {/* thorns */}
      <path d="M79.5 54 C76 52 75 54" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      <path d="M80 64 C83 62 84 64" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      {/* leaf 1 */}
      <path d="M78 56 C72 52 69 56 73 61 C76 62 79 59 78 56" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M73 60 L78 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      {/* leaf 2 */}
      <path d="M81 66 C87 62 89 67 86 71 C83 73 79 70 81 66" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M86 70 L81 66" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      {/* rose sepals */}
      <path d="M77 44 C75 47 76 50 78.5 49" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
      <path d="M83 44 C85 47 84 50 81.5 49" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
      {/* outer petals */}
      <path d="M78 44 C75.5 37 73.5 28 76 22 C78 16 84 17 86 22 C88.5 17 94 19 93 25 C91 31.5 87 37 83 44 Z" fill="hsl(var(--primary) / 0.13)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* mid petal lines */}
      <path d="M80 42 C79.5 35 81 27 84 22" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
      <path d="M82.5 43 C81.5 36 83 29 84 22" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      {/* center spiral */}
      <path d="M82 39 C81 34 82.5 29 84 26 C84.5 30 84 35 82.5 39" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),

  // CINEMA — theater interior: glowing screen, curtains, couple in seats
  cinema: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.04)"/>
      {/* --- SCREEN --- */}
      <rect x="12" y="8" width="76" height="46" rx="2" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      {/* screen inner glow layer */}
      <rect x="14" y="10" width="72" height="42" rx="1" fill="hsl(var(--primary) / 0.04)" stroke="none"/>
      {/* screen content — abstract film scene: hills + moon */}
      <path d="M14 40 C20 34 28 30 36 36 C44 28 52 26 60 32 C68 26 76 28 86 36 L86 52 L14 52 Z" fill="hsl(var(--primary) / 0.08)" stroke="none"/>
      <circle cx="70" cy="22" r="8" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.7"/>
      <path d="M14 44 C24 42 34 40 44 42 C54 38 64 38 74 42 C80 44 84 46 86 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.45"/>
      {/* film sprocket holes - top */}
      <rect x="14" y="9" width="4" height="3" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5"/>
      <rect x="22" y="9" width="4" height="3" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5"/>
      <rect x="74" y="9" width="4" height="3" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5"/>
      <rect x="82" y="9" width="4" height="3" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5"/>
      {/* film sprocket holes - bottom */}
      <rect x="14" y="50" width="4" height="3" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5"/>
      <rect x="22" y="50" width="4" height="3" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5"/>
      <rect x="74" y="50" width="4" height="3" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5"/>
      <rect x="82" y="50" width="4" height="3" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.5"/>
      {/* --- CURTAINS --- */}
      {/* left curtain */}
      <path d="M4 8 C8 14 6 22 8 30 C10 38 8 46 10 54 L12 54 L12 8 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8 8 C9 16 7 24 9 32" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
      <path d="M10 18 C11 26 9 34 11 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      {/* right curtain */}
      <path d="M96 8 C92 14 94 22 92 30 C90 38 92 46 90 54 L88 54 L88 8 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M92 8 C91 16 93 24 91 32" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
      {/* --- PROJECTION BEAM --- */}
      <path d="M42 54 L22 92" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.18"/>
      <path d="M58 54 L78 92" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.18"/>
      {/* --- SEATS + COUPLE --- */}
      {/* left empty seat */}
      <path d="M8 74 L8 68 C8 66 10 65 14 65 C18 65 20 66 20 68 L20 74 C20 76 18 77 14 77 C10 77 8 76 8 74" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinejoin="round"/>
      <path d="M8 70 C10 68 18 68 20 70" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
      {/* right empty seat */}
      <path d="M80 74 L80 68 C80 66 82 65 86 65 C90 65 92 66 92 68 L92 74 C92 76 90 77 86 77 C82 77 80 76 80 74" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinejoin="round"/>
      {/* couple seats */}
      <path d="M28 80 L28 72 C28 70 30 69 36 69 C42 69 44 70 44 72 L44 80 C44 82 42 83 36 83 C30 83 28 82 28 80" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M56 80 L56 72 C56 70 58 69 64 69 C70 69 72 70 72 72 L72 80 C72 82 70 83 64 83 C58 83 56 82 56 80" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* person 1 — head + shoulders */}
      <ellipse cx="36" cy="66" rx="7" ry="8.5" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      {/* hair */}
      <path d="M29 64 C30 60 34 58 36 58 C38 58 42 60 43 64" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      {/* person 2 — head + shoulders, tilted toward 1 */}
      <ellipse cx="62" cy="64" rx="7" ry="8.5" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      <path d="M55 62 C56 57 60 55 63 55 C65 55 68 57 69 62" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      {/* lean together */}
      <path d="M43 63 C48 61 54 61 57 63" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.3"/>
      {/* shoulders */}
      <path d="M20 92 C22 84 28 80 36 82 C42 83 44 82 50 80 C56 78 70 80 76 84 C80 88 80 92 80 92" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // PICNIC — oak tree scene: blanket, wine, baguette, flowers
  picnic: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.04)"/>
      {/* --- SKY / DISTANCE --- */}
      <path d="M5 60 C15 56 25 54 35 58 C45 52 55 50 65 54 C75 48 85 50 95 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
      {/* --- GROUND --- */}
      <path d="M4 88 C16 84 30 82 50 82 C70 82 84 84 96 88 L96 98 L4 98 Z" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* grass texture */}
      <path d="M10 88 C11 86 12 84 11 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
      <path d="M18 86 C19 83 21 82 20 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M88 86 C87 83 85 82 86 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      {/* --- TREE (right) --- */}
      {/* trunk */}
      <path d="M74 90 C73 82 72 74 73 66 C74 60 76 56 75 50 C74 44 74 40 76 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeLinecap="round"/>
      {/* trunk texture */}
      <path d="M73 74 C72.5 72 73 70 73.5 68" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      <path d="M74 84 C74.5 82 75 80 74.5 78" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      {/* main branch left */}
      <path d="M75 50 C70 46 64 44 60 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      {/* main branch right */}
      <path d="M76 42 C80 38 84 36 88 34" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
      {/* sub-branch */}
      <path d="M74 58 C68 56 64 52 60 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M76 48 C79 44 82 42 86 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round"/>
      {/* leaf clusters */}
      <path d="M52 36 C50 28 54 20 60 18 C66 16 72 20 74 26 C78 20 84 20 88 26 C92 32 90 40 86 44 C90 46 92 52 88 56 C84 60 78 58 74 54 C70 58 64 58 60 54 C56 54 50 50 50 44 C48 42 50 38 52 36" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      {/* leaf texture lines */}
      <path d="M56 28 C58 24 62 22 66 22" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M60 44 C64 40 70 38 76 38" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      <path d="M66 54 C70 50 76 50 80 52" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      {/* --- BLANKET --- */}
      <path d="M8 82 C12 78 22 76 36 78 C50 76 58 78 60 82 C60 86 54 90 38 90 C22 90 8 88 8 82" fill="hsl(var(--primary) / 0.09)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* plaid lines horizontal */}
      <path d="M10 84 C16 82 30 82 48 83" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.35"/>
      <path d="M10 87 C18 85 32 85 50 86" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.35"/>
      {/* plaid lines diagonal */}
      <path d="M16 82 C20 86 24 88 26 90" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      <path d="M28 80 C32 84 36 88 38 90" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      <path d="M42 80 C44 83 46 86 46 88" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      {/* --- WINE BOTTLE --- */}
      <path d="M18 78 C18 76 18.5 74 19.5 72 C19.5 70 20 68 22 68 C24 68 24.5 70 24.5 72 C25.5 74 26 76 26 78" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="22" y1="68" x2="22" y2="66" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <rect x="20.5" y="64.5" width="3" height="2" rx="0.3" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      {/* label */}
      <rect x="18.5" y="72" width="7" height="4" rx="0.3" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4"/>
      {/* --- TWO GLASSES --- */}
      <path d="M30 78 C29.5 76 29 74 30 73 C31 74 31.5 76 31 78" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="30.5" y1="78" x2="30.5" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M28.5 80.5 Q30.5 79.5 32.5 80.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M36 78 C35.5 76 35 74 36 73 C37 74 37.5 76 37 78" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="36.5" y1="78" x2="36.5" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M34.5 80.5 Q36.5 79.5 38.5 80.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      {/* --- BAGUETTE --- */}
      <path d="M42 82 C44 80 50 79 56 80 C58 80.5 58 82 56 82.5 C50 83.5 44 83.5 42 82" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M44 81 C46 80.5 50 80 54 80.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      {/* score marks */}
      <line x1="46" y1="79.5" x2="47" y2="81.5" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="50" y1="79" x2="51" y2="81" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      {/* --- FLOWERS --- */}
      {/* flower 1 */}
      <circle cx="6" cy="82" r="2" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.8"/>
      {[0,60,120,180,240,300].map(d => { const a=d*Math.PI/180; return <ellipse key={d} cx={6+3.5*Math.cos(a)} cy={82+3.5*Math.sin(a)} rx="2" ry="1.2" transform={`rotate(${d} ${6+3.5*Math.cos(a)} ${82+3.5*Math.sin(a)})`} fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>; })}
      {/* flower 2 */}
      <circle cx="64" cy="80" r="1.5" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      {[0,72,144,216,288].map(d => { const a=d*Math.PI/180; return <ellipse key={d} cx={64+3*Math.cos(a)} cy={80+3*Math.sin(a)} rx="1.5" ry="1" transform={`rotate(${d} ${64+3*Math.cos(a)} ${80+3*Math.sin(a)})`} fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>; })}
    </svg>
  ),

  // HIKING — multi-layer mountain trail with pine forest
  hiking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.04)"/>
      {/* --- SUN --- */}
      <circle cx="80" cy="18" r="9" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      {[0,45,90,135,180,225,270,315].map(d => { const a=d*Math.PI/180; return <line key={d} x1={80+11*Math.cos(a)} y1={18+11*Math.sin(a)} x2={80+15*Math.cos(a)} y2={18+15*Math.sin(a)} stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>; })}
      {/* --- DISTANT MOUNTAINS --- */}
      <path d="M4 50 L20 28 L36 50 Z" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M28 50 L50 22 L72 50 Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
      <path d="M58 50 L74 32 L90 50 Z" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      {/* snow caps on mid mountain */}
      <path d="M50 22 L56 38 L50 36 L44 38 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinejoin="round" opacity="0.7"/>
      {/* horizon */}
      <line x1="4" y1="50" x2="96" y2="50" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
      {/* --- MID-GROUND HILL --- */}
      <path d="M4 68 C14 60 26 56 40 62 C54 56 68 56 80 62 C88 66 94 70 96 76 L96 98 L4 98 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* --- PINE TREES --- */}
      {/* tree far left */}
      <path d="M8 68 L12 56 L16 68 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M9 64 L12 54 L15 64" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinejoin="round"/>
      <rect x="11" y="68" width="2" height="4" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      {/* tree mid left */}
      <path d="M18 68 L23 52 L28 68 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinejoin="round"/>
      <path d="M19 64 L23 50 L27 64" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinejoin="round"/>
      <rect x="22" y="68" width="2" height="5" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      {/* tree right cluster */}
      <path d="M76 70 L80 58 L84 70 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinejoin="round"/>
      <path d="M77 66 L80 56 L83 66" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinejoin="round"/>
      <rect x="79" y="70" width="2" height="5" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <path d="M86 68 L90 57 L94 68 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinejoin="round"/>
      <rect x="89" y="68" width="2" height="4" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      {/* --- ROCKY TRAIL --- */}
      {/* path left edge */}
      <path d="M40 98 C42 90 44 82 46 74 C48 66 50 60 50 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* path right edge */}
      <path d="M60 98 C58 90 56 82 54 74 C52 66 50 60 50 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* path fill */}
      <path d="M40 98 C42 90 44 82 46 74 C48 66 50 60 50 56 C50 60 52 66 54 74 C56 82 58 90 60 98 Z" fill="hsl(var(--primary) / 0.06)" stroke="none"/>
      {/* rocks on path */}
      <ellipse cx="49" cy="88" rx="3" ry="1.5" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <ellipse cx="51" cy="80" rx="2.5" ry="1.2" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <ellipse cx="50" cy="72" rx="2" ry="1" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>
      {/* trail flowers */}
      <circle cx="36" cy="74" r="1.5" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <circle cx="64" cy="76" r="1.2" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>
      <circle cx="34" cy="80" r="1" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>
    </svg>
  ),

  // COOKING — cast iron pot on stove with herbs and wooden spoon
  cooking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.04)"/>
      {/* --- STOVE BURNER --- */}
      <ellipse cx="50" cy="82" rx="30" ry="7" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <ellipse cx="50" cy="82" rx="24" ry="5.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" opacity="0.5"/>
      <ellipse cx="50" cy="82" rx="16" ry="3.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.4"/>
      <ellipse cx="50" cy="82" rx="8" ry="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.35"/>
      {/* burner grate lines */}
      <line x1="20" y1="82" x2="80" y2="82" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.3"/>
      <line x1="50" y1="75" x2="50" y2="89" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.3"/>
      {/* --- POT BODY --- */}
      <path d="M22 54 C22 52 24 46 30 44 C36 42 44 42 50 42 C56 42 64 42 70 44 C76 46 78 52 78 54 L78 72 C78 76 74 80 66 82 C60 84 40 84 34 82 C26 80 22 76 22 72 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      {/* pot body highlight */}
      <path d="M24 58 C24 56 26 52 30 50 C34 48 40 48 44 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.3"/>
      {/* pot rim */}
      <ellipse cx="50" cy="42" rx="28" ry="7" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1.9"/>
      {/* --- LID --- */}
      <path d="M24 42 C26 36 36 30 50 30 C64 30 74 36 76 42" fill="hsl(var(--primary) / 0.09)" stroke="hsl(var(--primary))" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M30 42 C32 36 40 32 50 32 C60 32 68 36 70 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.35"/>
      {/* lid knob */}
      <path d="M46 30 C46 26 47.5 24 50 24 C52.5 24 54 26 54 30" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="50" cy="24" rx="4" ry="2.5" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* --- HANDLES --- */}
      <path d="M22 56 C16 56 12 60 12 65 C12 70 16 74 22 74" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M78 56 C84 56 88 60 88 65 C88 70 84 74 78 74" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      {/* --- STEAM WISPS --- */}
      <path d="M36 28 C34 23 37 18 35 13" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" opacity="0.45"/>
      <path d="M50 26 C48 20 51 15 49 9" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" opacity="0.45"/>
      <path d="M64 28 C66 23 63 18 65 13" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" opacity="0.45"/>
      {/* --- WOODEN SPOON (resting on rim) --- */}
      <path d="M62 38 C65 36 70 30 74 24 C76 20 76 16 74 14 C72 12 69 14 68 18 C66 22 63 28 62 34" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M68 18 C70 14 73 14 74 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.45"/>
      {/* spoon handle extending */}
      <line x1="62" y1="38" x2="78" y2="54" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round"/>
      {/* --- GARLIC (beside pot) --- */}
      <path d="M10 70 C10 66 12 62 16 62 C20 62 22 66 22 70 C22 74 20 78 16 78 C12 78 10 74 10 70" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M14 62 C14 60 15 58 16 58 C17 58 18 60 18 62" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
      {/* garlic clove lines */}
      <path d="M11 68 C12 66 14 65 16 66" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M21 68 C20 66 18 65 16 66" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      {/* --- HERBS --- */}
      <path d="M84 62 C82 58 84 54 88 54" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M86 56 C90 52 94 54 92 58" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M88 60 C92 56 96 58 94 62" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // MUSEUM — grand gallery interior with arched ceiling and sculpture
  museum: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.04)"/>
      {/* --- FLOOR PERSPECTIVE --- */}
      <path d="M4 94 L50 72 L96 94" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* floor tiles */}
      <path d="M4 94 L50 76 L96 94" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
      <path d="M16 94 L50 78 L84 94" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/>
      <path d="M28 94 L50 82 L72 94" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/>
      <path d="M40 94 L50 86 L60 94" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.15"/>
      {/* --- WALLS --- */}
      <rect x="4" y="10" width="92" height="82" rx="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round" opacity="0.3"/>
      {/* --- GRAND ARCH --- */}
      <path d="M20 92 L20 36 C20 20 32 10 50 10 C68 10 80 20 80 36 L80 92" fill="hsl(var(--primary) / 0.04)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* arch inner line */}
      <path d="M26 92 L26 38 C26 24 36 14 50 14 C64 14 74 24 74 38 L74 92" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      {/* column details */}
      <path d="M20 36 C18 34 18 32 20 30" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M80 36 C82 34 82 32 80 30" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* base molding */}
      <rect x="16" y="88" width="12" height="4" rx="0.5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      <rect x="72" y="88" width="12" height="4" rx="0.5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      {/* keystone at arch top */}
      <path d="M46 10 L50 6 L54 10" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* --- PAINTING (left wall) --- */}
      <rect x="4" y="26" width="14" height="20" rx="0.5" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* frame detail */}
      <rect x="5.5" y="27.5" width="11" height="17" rx="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4"/>
      {/* painting content — figure silhouette */}
      <path d="M8 44 C8 40 9 36 11 34 C13 36 14 40 14 44" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <circle cx="11" cy="32" r="2.5" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      {/* --- PAINTING (right wall) --- */}
      <rect x="82" y="22" width="14" height="22" rx="0.5" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="83.5" y="23.5" width="11" height="19" rx="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4"/>
      {/* abstract painting strokes */}
      <path d="M85 30 C87 28 91 30 93 28" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
      <path d="M85 34 C88 32 90 35 93 33" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.45"/>
      <path d="M85 38 C87 40 91 38 93 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      {/* --- SCULPTURE on pedestal --- */}
      <rect x="43" y="70" width="14" height="6" rx="0.5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      <rect x="45" y="66" width="10" height="4" rx="0.3" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      {/* bust figure */}
      <path d="M44 66 C44 60 46 54 50 52 C54 54 56 60 56 66" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="50" cy="49" rx="5" ry="6" fill="hsl(var(--primary) / 0.09)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* hair */}
      <path d="M45 47 C46 44 48 43 50 43 C52 43 54 44 55 47" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      {/* face features */}
      <path d="M48 48 C49 47.5 51 47.5 52 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      {/* ceiling coffers */}
      <path d="M4 10 L50 10 L96 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2"/>
    </svg>
  ),

  // COCKTAILS — coupe glass with cherry, citrus twist, bubbles, bar counter
  cocktails: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.04)"/>
      {/* --- BAR COUNTER --- */}
      <path d="M4 84 C20 82 36 80 50 80 C64 80 80 82 96 84" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M4 86 C20 84 36 82 50 82 C64 82 80 84 96 86" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      {/* bar reflection */}
      <path d="M30 82 C36 80 44 79 50 79 C56 79 62 80 68 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.2"/>
      {/* --- COUPE GLASS --- */}
      {/* bowl — wide shallow curve */}
      <path d="M16 28 C18 36 24 48 32 56 C38 62 44 64 50 66 C56 64 62 62 68 56 C76 48 82 36 84 28" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* rim ellipse */}
      <ellipse cx="50" cy="28" rx="34" ry="7.5" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* drink fill */}
      <path d="M20 36 C22 44 28 52 34 58 C40 62 46 64 50 64 C54 64 60 62 66 58 C72 52 78 44 80 36" fill="hsl(var(--primary) / 0.11)" stroke="none"/>
      {/* fill line */}
      <path d="M20 36 C24 33 36 30 50 30 C64 30 76 33 80 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      {/* glass reflections */}
      <path d="M19 30 C19 36 21 44 22 52" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      <path d="M24 29 C24 34 25 42 26 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.22"/>
      {/* rim highlight */}
      <path d="M18 27 C22 25 32 24 40 24.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
      {/* stem */}
      <path d="M47 66 C47.5 68 47.5 72 48 76 C48.5 78 51.5 78 52 76 C52.5 72 52.5 68 53 66" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      {/* foot */}
      <ellipse cx="50" cy="78" rx="13" ry="3.5" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1.7"/>
      {/* --- CHERRY --- */}
      <circle cx="58" cy="34" r="5.5" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.6"/>
      {/* cherry highlight */}
      <circle cx="56" cy="32" r="1.5" fill="hsl(var(--primary) / 0.15)" stroke="none"/>
      {/* cherry stem */}
      <path d="M58 29 C58 25 60 22 64 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round"/>
      {/* --- CITRUS TWIST --- */}
      <path d="M68 22 C72 20 76 22 78 26 C80 30 78 34 74 36 C78 36 82 34 82 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      {/* citrus peel curl end */}
      <circle cx="69" cy="22" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6"/>
      {/* --- BUBBLES (various sizes) --- */}
      <circle cx="34" cy="44" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="40" cy="36" r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.45"/>
      <circle cx="44" cy="52" r="1.8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.4"/>
      <circle cx="60" cy="44" r="2.2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.45"/>
      <circle cx="64" cy="54" r="1.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.35"/>
      <circle cx="50" cy="48" r="1.2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.35"/>
      <circle cx="36" cy="54" r="1" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.3"/>
      <circle cx="56" cy="36" r="1" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.3"/>
    </svg>
  ),

  // STARGAZING — realistic crescent moon, two constellations, couple on hill
  stargazing: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.06)"/>
      {/* --- MILKY WAY band (subtle) --- */}
      {[8,12,16,20,24,28,32,36,40,44,48,52,56,60].map(x => (
        <circle key={x} cx={x+4} cy={14+Math.sin(x*0.3)*6} r={0.4+Math.sin(x*0.7)*0.3} fill="hsl(var(--primary))" opacity={0.15+Math.sin(x*0.5)*0.1}/>
      ))}
      {/* --- CRESCENT MOON --- */}
      {/* outer circle */}
      <circle cx="72" cy="22" r="16" fill="hsl(var(--primary) / 0.14)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* inner cutout circle creates crescent */}
      <circle cx="78" cy="18" r="14" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary) / 0.06)" strokeWidth="0"/>
      {/* crescent true outline via clip */}
      <path d="M72 6 C64 8 58 14 58 22 C58 30 64 36 72 38 C66 36 62 30 62 22 C62 14 66 8 72 6 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* moon craters */}
      <circle cx="65" cy="18" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.45"/>
      <circle cx="62" cy="26" r="1.8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.35"/>
      <circle cx="68" cy="30" r="1.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.3"/>
      {/* terminator shading line */}
      <path d="M72 6 C69 12 67 18 68 24 C69 30 70 34 72 38" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      {/* --- BIG DIPPER constellation --- */}
      <circle cx="12" cy="24" r="1.8" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="20" cy="20" r="1.6" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="28" cy="22" r="1.8" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="34" cy="28" r="1.6" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="32" cy="36" r="1.8" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="24" cy="38" r="1.6" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="16" cy="34" r="1.6" fill="hsl(var(--primary))" opacity="0.65"/>
      <polyline points="12,24 20,20 28,22 34,28 32,36 24,38 16,34 12,24" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.38" strokeLinecap="round" strokeLinejoin="round"/>
      {/* --- CASSIOPEIA --- */}
      <circle cx="46" cy="10" r="1.5" fill="hsl(var(--primary))" opacity="0.65"/>
      <circle cx="52" cy="14" r="1.8" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="58" cy="10" r="1.5" fill="hsl(var(--primary))" opacity="0.65"/>
      <circle cx="42" cy="14" r="1.3" fill="hsl(var(--primary))" opacity="0.6"/>
      <circle cx="62" cy="14" r="1.3" fill="hsl(var(--primary))" opacity="0.6"/>
      <polyline points="42,14 46,10 52,14 58,10 62,14" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.35" strokeLinecap="round" strokeLinejoin="round"/>
      {/* --- SCATTERED STARS --- */}
      {[[14,44],[22,48],[36,16],[44,32],[54,26],[68,40],[76,52],[84,16],[90,34],[94,18],[10,56],[86,60]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={0.5+Math.random()*0.8} fill="hsl(var(--primary))" opacity={0.25+Math.sin(i*1.7)*0.15}/>
      ))}
      {/* --- ROLLING HILL --- */}
      <path d="M4 88 C14 80 28 74 44 76 C58 74 72 70 96 78 L96 98 L4 98 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* hill texture */}
      <path d="M10 88 C20 84 34 80 50 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      {/* --- TELESCOPE on tripod --- */}
      <line x1="76" y1="78" x2="68" y2="68" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M66 66 C65 64 66 62 70 62 C74 62 76 64 74 66 C72 68 68 68 66 66" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      {/* tripod legs */}
      <line x1="72" y1="68" x2="68" y2="78" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <line x1="72" y1="68" x2="78" y2="78" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      <line x1="72" y1="68" x2="72" y2="78" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      {/* --- COUPLE FIGURES --- */}
      {/* person 1 body */}
      <path d="M42 78 C41 74 40 70 42 68 C44 66 46 68 46 70 C46 74 46 78 46 80" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="44" cy="66" r="3.5" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="1.3"/>
      {/* person 2 body */}
      <path d="M52 78 C51 74 50 70 52 68 C54 66 56 68 56 70 C56 74 56 78 56 80" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="54" cy="66" r="3.5" fill="hsl(var(--primary) / 0.16)" stroke="hsl(var(--primary))" strokeWidth="1.3"/>
      {/* leaning together */}
      <path d="M47 65 C49 64 51 64 53 65" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      {/* pointing arm */}
      <path d="M44 68 C42 64 40 62 38 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),

  // CUSTOM — ornate 16-point compass rose with heart and decorative border
  custom: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="45" fill="hsl(var(--primary) / 0.04)"/>
      {/* --- OUTER DECORATIVE RING --- */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.35"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.25"/>
      {/* tick marks around ring */}
      {Array.from({length:32}).map((_,i) => {
        const a=i*Math.PI/16; const big=i%4===0; const med=i%2===0&&!big;
        const r1=38; const r2=big?34:med?36:37.5;
        return <line key={i} x1={50+r1*Math.cos(a)} y1={50+r1*Math.sin(a)} x2={50+r2*Math.cos(a)} y2={50+r2*Math.sin(a)} stroke="hsl(var(--primary))" strokeWidth={big?1.2:0.7} strokeLinecap="round" opacity={big?0.7:0.4}/>;
      })}
      {/* --- 8 PRIMARY POINTS --- */}
      {/* N */}
      <path d="M50 8 L53 44 L50 46 L47 44 Z" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinejoin="round"/>
      {/* S */}
      <path d="M50 92 L53 56 L50 54 L47 56 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinejoin="round"/>
      {/* E */}
      <path d="M92 50 L56 53 L54 50 L56 47 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinejoin="round"/>
      {/* W */}
      <path d="M8 50 L44 53 L46 50 L44 47 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinejoin="round"/>
      {/* NE */}
      <path d="M78 22 L54 46 L52 44 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinejoin="round"/>
      {/* NW */}
      <path d="M22 22 L46 46 L48 44 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinejoin="round"/>
      {/* SE */}
      <path d="M78 78 L54 54 L52 56 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinejoin="round"/>
      {/* SW */}
      <path d="M22 78 L46 54 L48 56 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinejoin="round"/>
      {/* --- SECONDARY 8 POINTS (thinner) --- */}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(deg => {
        const a=deg*Math.PI/180;
        const tip={x:50+34*Math.cos(a),y:50+34*Math.sin(a)};
        const side1a=(deg-8)*Math.PI/180; const side2a=(deg+8)*Math.PI/180;
        const s1={x:50+6*Math.cos(side1a),y:50+6*Math.sin(side1a)};
        const s2={x:50+6*Math.cos(side2a),y:50+6*Math.sin(side2a)};
        return <path key={deg} d={`M${tip.x} ${tip.y} L${s1.x} ${s1.y} L${s2.x} ${s2.y} Z`} fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinejoin="round" opacity="0.7"/>;
      })}
      {/* --- CENTER RING --- */}
      <circle cx="50" cy="50" r="8" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      <circle cx="50" cy="50" r="5.5" fill="hsl(var(--primary) / 0.04)" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.5"/>
      {/* --- HEART CENTER --- */}
      <path d="M50 54 C48 52 44 50 44 47 C44 44.5 46 43 48 43 C49.5 43 50 44.5 50 44.5 C50 44.5 50.5 43 52 43 C54 43 56 44.5 56 47 C56 50 52 52 50 54" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* --- N fleur-de-lis accent --- */}
      <path d="M49 8 C49 10 48 12 48 14 C49 13 50 12 51 13 C51 12 50 10 51 8" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
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
