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



// Date option illustrations — bold, detailed line art (optimized for 128px display)
const DateIllustrations = {

  // RESTAURANT — wine glass with rose, candlelight atmosphere
  restaurant: () => (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      {/* Soft background */}
      <circle cx="60" cy="60" r="56" fill="hsl(var(--primary) / 0.04)"/>

      {/* === CANDLE (left side) === */}
      {/* Base plate */}
      <ellipse cx="28" cy="100" rx="10" ry="3" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* Candle holder stem */}
      <path d="M24 100 L24 94 C24 92 26 91 28 91 C30 91 32 92 32 94 L32 100" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Drip tray */}
      <ellipse cx="28" cy="91" rx="7" ry="2" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      {/* Candle body */}
      <rect x="24" y="62" width="8" height="31" rx="1.5" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* Wax drips */}
      <path d="M24 70 C22 73 22 77 24 78" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M32 74 C34 77 34 81 32 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M24 80 C22.5 82 22.5 85 24 85.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      {/* Wick */}
      <line x1="28" y1="62" x2="28" y2="58" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Flame — bold, layered */}
      <path d="M28 58 C25 52 24 46 25.5 42 C27 38 29 38 30.5 40 C32 38 34 39 34 43 C35 47 32 53 29.5 58 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 56 C26.5 52 27 47 28 44 C29 47 29.5 52 28.5 56" fill="hsl(var(--primary) / 0.25)" stroke="none"/>
      {/* Glow */}
      <circle cx="28" cy="48" r="10" fill="hsl(var(--primary) / 0.04)" stroke="none"/>

      {/* === WINE GLASS (center) === */}
      {/* Bowl */}
      <path d="M42 28 C40 38 38 50 40 60 C42 70 50 78 60 80 C70 78 78 70 80 60 C82 50 80 38 78 28" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Rim */}
      <ellipse cx="60" cy="28" rx="18" ry="6" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="2.5"/>
      {/* Wine surface */}
      <path d="M44 44 C48 41 54 39 60 39 C66 39 72 41 76 44" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* Wine fill */}
      <path d="M44 44 C48 41 54 39 60 39 C66 39 72 41 76 44 C78 50 81 56 80 60 C78 70 70 78 60 80 C50 78 42 70 40 60 C39 56 42 50 44 44" fill="hsl(var(--primary) / 0.12)" stroke="none"/>
      {/* Glass highlight */}
      <path d="M44 32 C43 40 42 50 43 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
      <path d="M48 30 C47.5 36 47 44 48 54" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.25"/>
      {/* Stem */}
      <path d="M56 80 L56 94 C56 96 64 96 64 94 L64 80" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Foot */}
      <ellipse cx="60" cy="96" rx="14" ry="4" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2"/>

      {/* === ROSE (right side) === */}
      {/* Stem */}
      <path d="M96 52 C94 62 93 74 96 96" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
      {/* Thorns */}
      <path d="M95 64 C92 62 91 64" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M95 78 C98 76 99 78" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Leaf with veins */}
      <path d="M94 68 C88 64 84 68 88 74 C91 76 95 72 94 68" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M88 73 L94 68" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M89 71 L92 69" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
      {/* Leaf 2 */}
      <path d="M96 82 C102 78 106 82 103 87 C100 89 95 86 96 82" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M103 86 L96 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      {/* Sepals */}
      <path d="M92 52 C90 56 91 60 94 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M100 52 C102 56 101 60 98 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* Outer petals — bold, clear */}
      <path d="M92 52 C89 44 88 34 90 26 C92 20 96 18 98 22 C100 18 104 20 106 26 C108 34 107 44 104 52 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Inner petal structure */}
      <path d="M94 48 C93 40 94 32 96 26" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M96 50 C96 42 97 34 98 28" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M100 48 C101 40 102 32 100 26" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      {/* Center curl */}
      <path d="M97 42 C96 36 97 30 98 26 C99 30 99 36 98 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),

  // CINEMA — theater interior with couple watching screen
  cinema: () => (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <circle cx="60" cy="60" r="56" fill="hsl(var(--primary) / 0.04)"/>

      {/* === SCREEN === */}
      <rect x="14" y="10" width="92" height="54" rx="3" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Film scene — romantic sunset */}
      <path d="M14 50 C24 42 36 38 48 44 C58 36 72 34 84 40 C92 36 100 38 106 44 L106 64 L14 64 Z" fill="hsl(var(--primary) / 0.1)" stroke="none"/>
      <circle cx="86" cy="26" r="10" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.7"/>
      <path d="M14 52 C30 48 50 46 70 48 C90 46 100 50 106 54" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>

      {/* === CURTAINS === */}
      {/* Left curtain — bold folds */}
      <path d="M4 8 C8 16 6 28 8 40 C10 52 7 62 9 72 L14 72 L14 8 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M7 12 C8 20 7 28 8 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M9 38 C10 46 9 54 10 62" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Right curtain */}
      <path d="M116 8 C112 16 114 28 112 40 C110 52 113 62 111 72 L106 72 L106 8 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M113 12 C112 20 113 28 112 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M111 38 C110 46 111 54 110 62" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>

      {/* === COUPLE IN SEATS === */}
      {/* Seat row */}
      <path d="M24 98 C24 94 28 92 34 92 L86 92 C92 92 96 94 96 98 L96 112 L24 112 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      {/* Seat division */}
      <line x1="44" y1="92" x2="44" y2="108" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3"/>
      <line x1="76" y1="92" x2="76" y2="108" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3"/>
      {/* Person 1 head */}
      <ellipse cx="52" cy="84" rx="8" ry="10" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* Hair */}
      <path d="M44 82 C46 76 50 74 52 74 C54 74 58 76 60 82" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Person 2 head */}
      <ellipse cx="70" cy="82" rx="8" ry="10" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* Hair */}
      <path d="M62 80 C64 73 68 71 70 71 C72 71 76 73 78 80" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Lean together */}
      <path d="M60 82 C62 80 66 80 68 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Shoulders */}
      <path d="M32 110 C36 100 44 96 52 98 C58 99 62 99 70 98 C78 96 86 100 90 110" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Projection light */}
      <path d="M46 64 L36 112" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.15"/>
      <path d="M74 64 L84 112" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.15"/>
    </svg>
  ),

  // PICNIC — blanket under oak tree with wine and flowers
  picnic: () => (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <circle cx="60" cy="60" r="56" fill="hsl(var(--primary) / 0.04)"/>

      {/* === GROUND === */}
      <path d="M0 100 C20 96 40 94 60 94 C80 94 100 96 120 100 L120 120 L0 120 Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Grass tufts */}
      <path d="M8 100 L6 94 L10 97" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M16 98 L14 92 L18 95" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
      <path d="M108 98 L106 92 L110 95" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>

      {/* === OAK TREE (right) === */}
      {/* Trunk — bold */}
      <path d="M88 112 C87 102 86 92 87 82 C88 74 90 68 89 60 C88 54 89 48 91 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="5" strokeLinecap="round"/>
      {/* Bark texture */}
      <path d="M86 96 C86 92 87 88 87 84" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M88 78 C88 74 89 70 89 66" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
      {/* Main branches */}
      <path d="M89 60 C82 56 76 52 70 46" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M91 48 C96 44 100 40 106 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
      <path d="M89 66 C82 64 76 60 72 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M91 52 C95 48 100 46 104 44" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
      {/* Sub-branches */}
      <path d="M74 48 C70 44 66 40 64 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M104 38 C108 34 112 32 114 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Canopy — cloud shapes */}
      <path d="M56 42 C50 36 52 26 58 22 C64 18 72 20 76 24 C80 18 88 16 94 22 C100 28 100 36 96 42 C102 44 106 52 102 58 C98 64 90 62 86 58 C82 62 76 62 72 58 C68 60 62 58 58 54 C54 54 52 48 54 44 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Leaf texture */}
      <path d="M60 28 C64 24 70 22 76 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
      <path d="M80 20 C86 18 92 20 96 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
      <path d="M66 50 C72 46 80 46 86 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>

      {/* === BLANKET === */}
      <path d="M6 96 C12 90 24 88 42 90 C58 88 68 90 70 96 C70 102 62 106 42 106 C22 106 6 104 6 96" fill="hsl(var(--primary) / 0.09)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Plaid lines */}
      <path d="M10 98 C18 96 32 96 54 97" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
      <path d="M8 102 C20 100 36 100 56 101" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
      <path d="M18 92 C22 96 26 100 28 104" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.3"/>
      <path d="M34 90 C38 94 42 98 44 104" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.3"/>
      <path d="M52 90 C54 94 56 98 56 102" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.3"/>

      {/* === WINE BOTTLE + GLASSES === */}
      {/* Bottle */}
      <path d="M18 92 C18 88 19 84 21 80 C22 78 24 78 25 80 C27 84 28 88 28 92" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.5 80 L21.5 76 C21.5 74.5 22.5 74 23 74 C23.5 74 24.5 74.5 24.5 76 L24.5 80" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Glass 1 */}
      <path d="M34 92 C33.5 89 33 87 34 85.5 C35 87 35.5 89 35 92" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="34.5" y1="92" x2="34.5" y2="95" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M32 95.5 C33 94.5 36 94.5 37 95.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Glass 2 */}
      <path d="M40 92 C39.5 89 39 87 40 85.5 C41 87 41.5 89 41 92" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40.5" y1="92" x2="40.5" y2="95" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M38 95.5 C39 94.5 42 94.5 43 95.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>

      {/* === BAGUETTE === */}
      <path d="M50 96 C54 94 60 93 66 94 C68 95 68 97 66 98 C60 99 54 99 50 97 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="54" y1="94" x2="55" y2="97" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
      <line x1="60" y1="93.5" x2="61" y2="96.5" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>

      {/* === WILDFLOWERS === */}
      <circle cx="4" cy="96" r="3" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      <line x1="4" y1="99" x2="4" y2="106" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
      <circle cx="76" cy="94" r="2.5" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1"/>
    </svg>
  ),

  // HIKING — mountain trail with pine trees and winding path
  hiking: () => (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <circle cx="60" cy="60" r="56" fill="hsl(var(--primary) / 0.04)"/>

      {/* === SUN === */}
      <circle cx="96" cy="22" r="10" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {[0,45,90,135,180,225,270,315].map(d => { const a=d*Math.PI/180; return <line key={d} x1={96+13*Math.cos(a)} y1={22+13*Math.sin(a)} x2={96+17*Math.cos(a)} y2={22+17*Math.sin(a)} stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>; })}

      {/* === MOUNTAINS === */}
      <path d="M0 68 L22 30 L44 68 Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6"/>
      <path d="M28 68 L56 20 L84 68 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" opacity="0.7"/>
      <path d="M62 68 L82 34 L102 68 Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6"/>
      {/* Snow cap */}
      <path d="M56 20 L63 38 L56 35 L49 38 Z" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7"/>

      {/* === MIDGROUND HILL === */}
      <path d="M0 86 C16 76 32 72 50 76 C68 70 84 68 100 76 C108 80 116 86 120 92 L120 120 L0 120 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round"/>

      {/* === PINE TREES === */}
      {/* Tree 1 */}
      <path d="M10 82 L18 64 L26 82 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 76 L18 62 L24 76" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round"/>
      <rect x="16" y="82" width="4" height="8" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="1"/>
      {/* Tree 2 — larger */}
      <path d="M22 82 L32 60 L42 82 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M24 74 L32 56 L40 74" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M26 66 L32 52 L38 66" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinejoin="round"/>
      <rect x="30" y="82" width="4" height="8" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="1"/>
      {/* Tree 3 — right */}
      <path d="M92 80 L100 62 L108 80 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M94 72 L100 58 L106 72" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round"/>
      <rect x="98" y="80" width="4" height="6" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="1"/>

      {/* === WINDING TRAIL === */}
      <path d="M48 120 C50 110 52 100 54 92 C56 84 58 78 58 72 C58 66 58 62 60 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M72 120 C70 110 68 100 66 92 C64 84 62 78 62 72 C62 66 62 62 60 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      {/* Rocks on trail */}
      <ellipse cx="58" cy="108" rx="4" ry="2" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      <ellipse cx="62" cy="96" rx="3.5" ry="1.8" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1"/>
      <ellipse cx="60" cy="84" rx="3" ry="1.5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.8"/>
    </svg>
  ),

  // COOKING — pot on stove with steam, herbs, garlic
  cooking: () => (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <circle cx="60" cy="60" r="56" fill="hsl(var(--primary) / 0.04)"/>

      {/* === STOVE BURNER === */}
      <ellipse cx="60" cy="100" rx="36" ry="9" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      <ellipse cx="60" cy="100" rx="28" ry="7" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4"/>
      <ellipse cx="60" cy="100" rx="18" ry="4.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.35"/>
      <ellipse cx="60" cy="100" rx="9" ry="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.3"/>

      {/* === POT BODY === */}
      <path d="M26 66 C26 62 30 56 38 54 C46 52 54 51 60 51 C66 51 74 52 82 54 C90 56 94 62 94 66 L94 88 C94 92 90 96 82 98 C74 100 46 100 38 98 C30 96 26 92 26 88 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Pot rim */}
      <ellipse cx="60" cy="51" rx="34" ry="9" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2.5"/>
      {/* Body highlight */}
      <path d="M30 62 C34 58 42 56 52 55" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>

      {/* === DOME LID === */}
      <path d="M30 51 C32 44 44 36 60 36 C76 36 88 44 90 51" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Knob */}
      <path d="M54 36 C54 32 56 30 60 30 C64 30 66 32 66 36" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="60" cy="30" rx="6" ry="3" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="2"/>

      {/* === HANDLES === */}
      <path d="M26 68 C18 68 14 74 14 80 C14 86 18 92 26 92" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
      <path d="M94 68 C102 68 106 74 106 80 C106 86 102 92 94 92" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>

      {/* === STEAM === */}
      <path d="M42 34 C40 26 43 18 41 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <path d="M60 32 C58 24 61 16 59 8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <path d="M78 34 C80 26 77 18 79 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

      {/* === WOODEN SPOON (resting on rim) === */}
      <path d="M76 46 C80 40 86 30 90 22 C92 18 90 14 88 12 C86 10 82 12 82 16 C80 20 78 28 76 38" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="76" y1="46" x2="98" y2="68" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>

      {/* === GARLIC === */}
      <path d="M8 84 C8 78 12 74 16 74 C20 74 24 78 24 84 C24 90 20 94 16 94 C12 94 8 90 8 84" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.8"/>
      <path d="M14 74 C14 72 15 70 16 70 C17 70 18 72 18 74" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M12 82 L16 80 L20 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
    </svg>
  ),

  // MUSEUM — grand arch with Venus de Milo (clear silhouette, iconic pose)
  museum: () => (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <circle cx="60" cy="60" r="56" fill="hsl(var(--primary) / 0.04)"/>

      {/* === GALLERY ARCH === */}
      <path d="M18 114 L18 34 C18 16 34 6 60 6 C86 6 102 16 102 34 L102 114" fill="hsl(var(--primary) / 0.03)" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Inner arch */}
      <path d="M24 114 L24 38 C24 22 38 12 60 12 C82 12 96 22 96 38 L96 114" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.35"/>
      {/* Keystone */}
      <path d="M55 6 L60 1 L65 6" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Column bases */}
      <rect x="12" y="108" width="16" height="6" rx="1" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <rect x="92" y="108" width="16" height="6" rx="1" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>

      {/* === PEDESTAL === */}
      <rect x="42" y="100" width="36" height="6" rx="1" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <rect x="46" y="94" width="28" height="6" rx="0.5" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>

      {/* === VENUS DE MILO === */}
      {/* The iconic S-curve contrapposto, no arms, draped from hips */}

      {/* HEAD — classical oval, slightly turned */}
      <ellipse cx="60" cy="34" rx="5.5" ry="7" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* Hair — pulled back into bun, center-parted */}
      <path d="M55 32 C55 28 57 25 60 25 C63 25 65 28 65 32" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Bun */}
      <ellipse cx="60" cy="26" rx="4" ry="3" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* Face detail — subtle nose line */}
      <path d="M59 33 L60 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>

      {/* NECK */}
      <path d="M57 41 L57 39 C57 38 59 37 60 37 C61 37 63 38 63 39 L63 41" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round"/>

      {/* TORSO — bare, classical proportions */}
      {/* Right shoulder curve ending abruptly (missing arm) */}
      <path d="M63 41 C67 42 70 44 72 47 C73 49 72.5 50 71 50" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
      {/* Left shoulder curve ending abruptly (missing arm) */}
      <path d="M57 41 C53 42 50 44 48 47 C47 49 47.5 50 49 50" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>

      {/* Torso contour — S-curve (contrapposto weight on right leg) */}
      {/* Left side */}
      <path d="M49 50 C48 54 47 58 48 62 C49 66 50 68 51 70" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
      {/* Right side */}
      <path d="M71 50 C72 54 73 58 72 62 C71 66 70 68 69 70" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
      {/* Torso fill */}
      <path d="M49 50 C48 54 47 58 48 62 C49 66 50 68 51 70 L69 70 C70 68 71 66 72 62 C73 58 72 54 71 50 Z" fill="hsl(var(--primary) / 0.06)" stroke="none"/>
      {/* Subtle midline */}
      <path d="M60 42 C60 48 60 54 60 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.25"/>
      {/* Navel hint */}
      <circle cx="60" cy="62" r="1" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.3"/>

      {/* DRAPED GARMENT — from hips down, flowing folds */}
      {/* Outer contour */}
      <path d="M48 68 C46 72 44 78 44 84 C44 88 46 92 48 94 L72 94 C74 92 76 88 76 84 C76 78 74 72 72 68" fill="hsl(var(--primary) / 0.09)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Fabric gathered at left hip — iconic knot */}
      <path d="M48 68 C45 70 43 72 44 74 C46 72 48 70 50 68" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      {/* Main fold lines — vertical draping */}
      <path d="M52 70 C51 76 51 82 52 88 C52 91 53 93 54 94" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
      <path d="M57 70 C57 76 57 82 57 88 C57 91 57 93 57 94" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M63 70 C63 76 63 82 63 88 C63 91 63 93 63 94" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M68 70 C69 76 69 82 68 88 C68 91 67 93 66 94" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
      {/* Secondary fold */}
      <path d="M48 74 C49 78 49 82 48 86" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
      <path d="M72 74 C73 78 73 82 72 86" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
      {/* Fabric top edge — draped V across hips */}
      <path d="M48 68 C52 66 56 65 60 66 C64 65 68 66 72 68" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round"/>
      {/* A subtle second drape line */}
      <path d="M50 70 C54 69 58 68 60 68 C62 68 66 69 70 70" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>

      {/* === SPOTLIGHT === */}
      <ellipse cx="60" cy="60" rx="22" ry="30" fill="hsl(var(--primary) / 0.02)" stroke="none"/>
    </svg>
  ),

  // COCKTAILS — elegant coupe glass with garnishes and bubbles
  cocktails: () => (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <circle cx="60" cy="60" r="56" fill="hsl(var(--primary) / 0.04)"/>

      {/* === COUPE GLASS === */}
      {/* Bowl */}
      <path d="M16 34 C18 44 26 58 36 66 C44 72 52 76 60 78 C68 76 76 72 84 66 C94 58 102 44 104 34" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Rim */}
      <ellipse cx="60" cy="34" rx="44" ry="10" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="2.5"/>
      {/* Drink fill */}
      <path d="M22 44 C24 52 32 62 40 68 C48 74 54 76 60 76 C66 76 72 74 80 68 C88 62 96 52 98 44" fill="hsl(var(--primary) / 0.1)" stroke="none"/>
      {/* Drink line */}
      <path d="M22 44 C30 40 44 37 60 37 C76 37 90 40 98 44" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      {/* Glass highlights */}
      <path d="M20 38 C20 46 22 56 26 64" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
      <path d="M26 36 C26 42 27 52 30 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.22"/>
      {/* Stem */}
      <path d="M56 78 L56 96 C56 98 64 98 64 96 L64 78" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Foot */}
      <ellipse cx="60" cy="98" rx="16" ry="5" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2"/>

      {/* === CHERRY === */}
      <circle cx="70" cy="42" r="7" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <circle cx="67.5" cy="39.5" r="2.5" fill="hsl(var(--primary) / 0.15)" stroke="none"/>
      {/* Cherry stem */}
      <path d="M70 35 C70 30 72 26 76 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Small leaf */}
      <path d="M74 26 C76 24 78 26 76 28" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round"/>

      {/* === CITRUS TWIST === */}
      <path d="M86 26 C90 24 94 26 96 30 C98 34 96 38 92 40 C96 40 100 38 100 34" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>

      {/* === BUBBLES === */}
      <circle cx="40" cy="52" r="3.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.5"/>
      <circle cx="48" cy="44" r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.45"/>
      <circle cx="54" cy="62" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4"/>
      <circle cx="74" cy="54" r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.45"/>
      <circle cx="80" cy="64" r="2.2" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.38"/>
      <circle cx="60" cy="56" r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" opacity="0.35"/>
      <circle cx="44" cy="64" r="1.8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.3"/>
      <circle cx="66" cy="68" r="1.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.3"/>
    </svg>
  ),

  // STARGAZING — night sky with realistic crescent moon, constellations, couple on hilltop
  stargazing: () => (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      <circle cx="60" cy="60" r="56" fill="hsl(var(--primary) / 0.06)"/>

      {/* === CRESCENT MOON — proper crescent with crater detail === */}
      <path d="M88 10 C78 14 72 24 72 36 C72 48 78 58 88 62 C80 58 76 48 76 36 C76 24 80 14 88 10 Z" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Craters */}
      <circle cx="79" cy="24" r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4"/>
      <circle cx="77" cy="36" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" opacity="0.35"/>
      <circle cx="80" cy="46" r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.3"/>

      {/* === BIG DIPPER CONSTELLATION === */}
      <circle cx="14" cy="28" r="2.5" fill="hsl(var(--primary))" opacity="0.8"/>
      <circle cx="24" cy="22" r="2.2" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="34" cy="24" r="2.5" fill="hsl(var(--primary))" opacity="0.8"/>
      <circle cx="42" cy="32" r="2.2" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="40" cy="42" r="2.5" fill="hsl(var(--primary))" opacity="0.8"/>
      <circle cx="30" cy="44" r="2.2" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="18" cy="40" r="2" fill="hsl(var(--primary))" opacity="0.7"/>
      <polyline points="14,28 24,22 34,24 42,32 40,42 30,44 18,40 14,28" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>

      {/* === CASSIOPEIA === */}
      <circle cx="50" cy="12" r="2" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="58" cy="16" r="2.2" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="66" cy="12" r="2" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="44" cy="16" r="1.8" fill="hsl(var(--primary))" opacity="0.65"/>
      <circle cx="72" cy="16" r="1.8" fill="hsl(var(--primary))" opacity="0.65"/>
      <polyline points="44,16 50,12 58,16 66,12 72,16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" opacity="0.38" strokeLinecap="round" strokeLinejoin="round"/>

      {/* === SCATTERED STARS === */}
      <circle cx="98" cy="30" r="1.2" fill="hsl(var(--primary))" opacity="0.4"/>
      <circle cx="104" cy="46" r="1" fill="hsl(var(--primary))" opacity="0.35"/>
      <circle cx="92" cy="56" r="1.2" fill="hsl(var(--primary))" opacity="0.35"/>
      <circle cx="16" cy="56" r="1" fill="hsl(var(--primary))" opacity="0.3"/>
      <circle cx="52" cy="30" r="0.9" fill="hsl(var(--primary))" opacity="0.3"/>
      <circle cx="8" cy="48" r="0.8" fill="hsl(var(--primary))" opacity="0.25"/>
      {/* Shooting star */}
      <line x1="92" y1="8" x2="80" y2="16" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      <line x1="92" y1="8" x2="96" y2="6" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>

      {/* === HILL === */}
      <path d="M0 108 C16 96 32 90 50 92 C68 88 84 84 120 94 L120 120 L0 120 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>

      {/* === TELESCOPE === */}
      <path d="M90 94 L82 82 C80 80 82 78 84 78 C86 78 88 80 86 82 L92 90" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Tripod */}
      <line x1="88" y1="88" x2="82" y2="100" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="88" y1="88" x2="94" y2="100" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="88" y1="88" x2="88" y2="100" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>

      {/* === COUPLE === */}
      {/* Person 1 */}
      <circle cx="52" cy="82" r="5" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <path d="M48 88 C48 90 49 94 50 96 C51 98 53 98 54 96 C55 94 56 90 56 88" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Person 2 */}
      <circle cx="64" cy="80" r="5" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <path d="M60 86 C60 88 61 92 62 94 C63 96 65 96 66 94 C67 92 68 88 68 86" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round"/>
      {/* Lean together */}
      <path d="M56 81 C58 80 62 80 64 81" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Pointing arm */}
      <path d="M52 84 C50 80 48 76 46 72" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),

  // CUSTOM — ornate 16-point compass rose with heart and decorative border
  custom: () => (
    <svg viewBox="0 0 100 100" className="w-32 h-32">
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
