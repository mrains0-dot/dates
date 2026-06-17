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



// Date option illustrations — highly detailed romantic line-art scenes
const DateIllustrations = {

  // RESTAURANT — intimate dinner: detailed wine glass, ornate candlestick, blooming rose
  restaurant: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="46" fill="hsl(var(--primary) / 0.03)"/>
      {/* --- TABLE SURFACE --- */}
      <path d="M2 86 C12 82 28 80 50 80 C72 80 88 82 98 86" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M4 86 C8 87.5 14 89 22 90" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M96 86 C92 87.5 86 89 78 90" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M40 80 C44 79.5 56 79.5 60 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.2"/>

      {/* --- ORNATE CANDLESTICK (left) --- */}
      {/* base */}
      <ellipse cx="18" cy="84" rx="8" ry="2.5" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1"/>
      <path d="M10 84 C10 82 12 81 14 81 C16 80.5 20 80.5 22 81 C24 81 26 82 26 84" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      {/* shaft with ornamental bulge */}
      <path d="M15 84 C15 82 16 79 16.5 76 C17 73 16 71 16.5 69 C17 67 17 66 18 65" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M21 84 C21 82 20 79 19.5 76 C19 73 20 71 19.5 69 C19 67 19 66 18 65" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round"/>
      {/* decorative bulb */}
      <path d="M15.5 73 C14.5 72 14 71 14.5 70 C15 69 17 68 18 68 C19 68 21 69 21.5 70 C22 71 21.5 72 20.5 73" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      {/* drip pan */}
      <ellipse cx="18" cy="65" rx="5" ry="1.5" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.9"/>
      {/* candle body */}
      <path d="M15.5 65 L15.5 46 C15.5 45 16.5 44.5 18 44.5 C19.5 44.5 20.5 45 20.5 46 L20.5 65" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round"/>
      {/* wax drips */}
      <path d="M15.5 52 C14 54 13.8 56 14.5 57.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.55"/>
      <path d="M15.5 58 C14.5 59.5 14.5 61 15 62" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      <path d="M20.5 50 C21.5 52 22 54 21.5 55.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.55"/>
      <path d="M20.5 55 C21.5 56.5 21.5 58 21 59" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      {/* wick */}
      <line x1="18" y1="44.5" x2="18" y2="42" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      {/* flame — layered for realism */}
      <path d="M18 42 C16 38 15 34 16 31 C17 28 19 27 20 29 C21 27 23 28 23 31 C24 34 22 38 19.5 42 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 41 C17 38 17 35 17.5 32 C18 30 19 30 19.5 31 C20 30 21 30 21 32 C21.5 35 20.5 38 19 41 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.7"/>
      <path d="M18.5 40 C18 37 18.5 34 19 33 C19.5 35 19.5 37.5 19 40" fill="hsl(var(--primary) / 0.28)" stroke="none"/>
      {/* glow */}
      <circle cx="18" cy="36" r="7" fill="hsl(var(--primary) / 0.035)" stroke="none"/>

      {/* --- WINE GLASS (center) — detailed Bordeaux shape --- */}
      {/* bowl exterior */}
      <path d="M32 20 C30 28 28 38 30 48 C32 56 38 64 50 66 C62 64 68 56 70 48 C72 38 70 28 68 20" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
      {/* rim */}
      <ellipse cx="50" cy="20" rx="18" ry="5.5" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.9"/>
      {/* wine surface */}
      <path d="M34 34 C38 31 44 29 50 29 C56 29 62 31 66 34" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      {/* wine fill body */}
      <path d="M34 34 C38 31 44 29 50 29 C56 29 62 31 66 34 C68 40 71 46 70 48 C68 56 62 64 50 66 C38 64 32 56 30 48 C29 46 32 40 34 34" fill="hsl(var(--primary) / 0.12)" stroke="none"/>
      {/* glass reflection — long highlight */}
      <path d="M33 24 C32 32 31 42 32 52" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.35"/>
      <path d="M36 22 C35.5 28 35 36 36 44" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
      {/* glass reflection — short right */}
      <path d="M66 24 C67 30 67 34 66 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.2"/>
      {/* wine surface reflection */}
      <path d="M38 32 C40 31 42 30.5 44 31" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      {/* stem */}
      <path d="M46.5 66 C47 68 47 72 47.5 76 C48 78 52 78 52.5 76 C53 72 53 68 53.5 66" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      {/* foot */}
      <ellipse cx="50" cy="78" rx="12" ry="3.5" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.7"/>
      {/* foot rim */}
      <path d="M38 78 C42 80 48 81 50 81 C52 81 58 80 62 78" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>

      {/* --- BLOOMING ROSE (right) — multi-petal --- */}
      {/* stem */}
      <path d="M80 46 C78 54 77 64 80 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round"/>
      {/* thorns */}
      <path d="M79 56 C76.5 54.5 76 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M79 66 C82 64 82.5 66" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M80 74 C77 73 76.5 75" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      {/* leaf 1 — detailed with veins */}
      <path d="M78 58 C72 54 68 58 72 63 C75 65 79 62 78 58" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M72 62 L78 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M73 60.5 L76 58.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.35"/>
      <path d="M74 62 L77.5 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.35"/>
      {/* leaf 2 */}
      <path d="M81 68 C87 64 90 68 87 73 C84 75 80 72 81 68" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M87 72 L81 68" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M86 71 L82.5 69" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.35"/>
      {/* sepals */}
      <path d="M76 46 C74 49 75 52 77.5 51" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
      <path d="M84 46 C86 49 85 52 82.5 51" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
      <path d="M79 48 C78 51 79 53 80 52" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.45"/>
      {/* outer petals — larger, more distinct */}
      <path d="M77 46 C74 38 72 28 75 22 C77 16 80 15 82 18" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M82 18 C84 15 88 16 90 22 C92 28 90 36 84 46" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* mid petals — overlapping */}
      <path d="M78 44 C76 36 76 28 78 24 C80 20 82 22 82 26" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round" opacity="0.75"/>
      <path d="M83 44 C85 36 86 28 84 24 C82 20 80 22 80 26" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round" opacity="0.75"/>
      {/* inner petal curl lines */}
      <path d="M80 42 C79 36 80 30 82 26" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      <path d="M82 40 C81 34 82 28 83 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M78 38 C78 34 79 30 80 26" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      {/* center spiral */}
      <path d="M81 36 C80 32 81 28 82 26 C82.5 29 82 33 81 37" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
      <path d="M79 34 C80 30 81 28 82 26" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),

  // CINEMA — ornate theater: arched proscenium, velvet curtains, couple, glowing screen
  cinema: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="46" fill="hsl(var(--primary) / 0.03)"/>
      {/* --- ORNATE PROSCENIUM ARCH --- */}
      <path d="M6 92 L6 18 C6 10 24 4 50 4 C76 4 94 10 94 18 L94 92" fill="hsl(var(--primary) / 0.03)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* inner arch */}
      <path d="M10 92 L10 22 C10 14 28 8 50 8 C72 8 90 14 90 22 L90 92" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
      {/* decorative keystone */}
      <path d="M46 4 L50 0 L54 4" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* arch molding details */}
      <path d="M14 20 C14 18 16 16 18 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      <path d="M86 20 C86 18 84 16 82 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      {/* pillar fluting left */}
      <line x1="7.5" y1="24" x2="7.5" y2="88" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      <line x1="9" y1="24" x2="9" y2="88" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.25"/>
      {/* pillar fluting right */}
      <line x1="92.5" y1="24" x2="92.5" y2="88" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      <line x1="91" y1="24" x2="91" y2="88" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.25"/>

      {/* --- SCREEN --- */}
      <rect x="16" y="14" width="68" height="42" rx="2" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* film scene — romantic landscape */}
      <path d="M16 44 C24 38 32 34 40 40 C48 32 58 30 66 36 C74 30 80 34 84 40 L84 56 L16 56 Z" fill="hsl(var(--primary) / 0.08)" stroke="none"/>
      <circle cx="72" cy="24" r="7" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.6"/>
      <path d="M16 48 C28 44 42 42 56 44 C70 42 78 44 84 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
      <path d="M22 50 C30 48 38 46 46 48 C54 46 62 46 70 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.3"/>

      {/* --- VELVET CURTAINS --- */}
      {/* left curtain — gathered fabric with folds */}
      <path d="M6 14 C8 20 7 28 9 36 C11 44 8 52 10 60 C12 68 9 76 10 84 L14 84 L14 14 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M8 16 C9 22 8 28 9 34" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
      <path d="M10 22 C11 28 10 34 11 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M9 44 C10 50 9 56 10 62" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M8 64 C9 70 8 76 9 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      {/* right curtain */}
      <path d="M94 14 C92 20 93 28 91 36 C89 44 92 52 90 60 C88 68 91 76 90 84 L86 84 L86 14 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M92 16 C91 22 92 28 91 34" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.45"/>
      <path d="M90 22 C89 28 90 34 89 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M91 44 C90 50 91 56 90 62" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      {/* curtain tiebacks */}
      <path d="M12 60 C14 58 16 58 16 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M88 60 C86 58 84 58 84 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>

      {/* --- COUPLE SILHOUETTE --- */}
      {/* person 1 (left) */}
      <ellipse cx="40" cy="72" rx="7.5" ry="9" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <path d="M33 70 C34 66 37 64 40 64 C43 64 46 66 47 70" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round"/>
      {/* ear detail */}
      <path d="M32.5 72 C32 71 32.5 70 33 70.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      {/* person 2 (right, slightly tilted toward 1) */}
      <ellipse cx="58" cy="70" rx="7" ry="9" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <path d="M51 68 C52 63 55 61 58 61 C61 61 64 63 65 68" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round"/>
      {/* lean connect */}
      <path d="M47 70 C50 68 54 68 56 70" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      {/* shoulders body */}
      <path d="M24 96 C26 88 32 84 40 85 C46 86 50 84 54 84 C58 84 64 86 68 88 C74 90 76 94 76 96" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* arm around */}
      <path d="M48 84 C50 82 54 82 56 84" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),

  // PICNIC — detailed tree scene: textured trunk, lush canopy, spread with food
  picnic: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="46" fill="hsl(var(--primary) / 0.03)"/>
      {/* --- DISTANT HILLS --- */}
      <path d="M4 58 C14 52 24 48 36 54 C48 46 60 44 72 50 C84 44 92 48 96 54" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.25"/>
      <path d="M4 62 C16 56 30 54 44 58 C58 52 72 50 96 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.2"/>

      {/* --- GROUND --- */}
      <path d="M2 84 C16 80 32 78 50 78 C68 78 84 80 98 84 L98 98 L2 98 Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      {/* grass blades */}
      <path d="M8 84 L7 80 L9 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M14 82 L13 78 L15 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M86 82 L85 78 L87 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M92 84 L91 80 L93 82" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      <path d="M64 80 L63 76 L65 78" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>

      {/* --- TREE (right side) --- */}
      {/* trunk — thick, textured */}
      <path d="M72 92 C71 84 70 76 71 68 C72 62 74 56 73 50 C72 44 73 38 75 34" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
      {/* bark texture */}
      <path d="M70 86 C70 84 71 82 71 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
      <path d="M72 78 C72 76 73 74 73 72" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M71 70 C71 68 72 66 72 64" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M73 60 C73 58 73 56 74 54" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      {/* knot */}
      <ellipse cx="72.5" cy="74" rx="2" ry="1.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.4"/>
      {/* main branches */}
      <path d="M73 50 C68 46 62 42 58 38" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M75 42 C79 38 83 34 88 32" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M73 56 C67 54 62 50 58 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M75 46 C78 42 82 40 86 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round"/>
      {/* sub-branches */}
      <path d="M62 40 C58 38 56 34 54 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M86 34 C88 30 92 28 94 28" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round"/>
      <path d="M60 48 C56 48 54 44 52 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round"/>
      {/* canopy — complex cloud of foliage */}
      <path d="M48 34 C44 28 46 20 52 16 C58 12 64 14 68 18 C72 12 80 12 86 18 C92 24 92 32 88 38 C94 40 96 48 92 54 C88 60 80 58 76 54 C72 58 66 58 62 54 C58 56 52 54 50 50 C46 50 44 46 44 42 C42 40 44 36 48 34" fill="hsl(var(--primary) / 0.09)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* leaf cluster textures */}
      <path d="M52 20 C54 18 58 16 62 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M70 16 C74 14 78 16 82 18" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      <path d="M56 40 C60 36 66 34 72 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      <path d="M62 52 C66 48 72 48 78 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
      <path d="M82 28 C86 26 90 28 92 32" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      <path d="M86 42 C88 40 90 42 92 44" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>

      {/* --- BLANKET --- */}
      <path d="M6 80 C10 76 20 74 34 76 C48 74 56 76 58 80 C58 84 52 88 36 88 C20 88 6 86 6 80" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      {/* plaid pattern */}
      <path d="M8 82 C16 80 28 80 44 81" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      <path d="M8 85 C18 84 30 83 48 84" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      <path d="M14 78 C18 82 22 86 24 88" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
      <path d="M26 77 C30 81 34 85 36 88" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
      <path d="M38 76 C40 79 42 83 44 86" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
      <path d="M50 77 C52 80 54 83 54 86" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>

      {/* --- WINE BOTTLE --- */}
      <path d="M16 76 C16 74 16.5 72 17.5 70 C18 68 18.5 66 20 66 C21.5 66 22 68 22.5 70 C23.5 72 24 74 24 76" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 66 L19 63.5 C19 63 19.5 62.5 20 62.5 C20.5 62.5 21 63 21 63.5 L21 66" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <rect x="18.5" y="61" width="3" height="2" rx="0.3" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      {/* bottle label */}
      <rect x="16.5" y="71" width="7" height="3.5" rx="0.3" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4"/>
      <line x1="17.5" y1="72.5" x2="22.5" y2="72.5" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.3"/>

      {/* --- TWO GLASSES --- */}
      <path d="M28 78 C28 76 28.5 74 29 73 C29.5 72 30.5 72 31 73 C31.5 74 32 76 32 78" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="30" y1="78" x2="30" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M28 80.5 C29 79.5 31 79.5 32 80.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M34 78 C34 76 34.5 74 35 73 C35.5 72 36.5 72 37 73 C37.5 74 38 76 38 78" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="36" y1="78" x2="36" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M34 80.5 C35 79.5 37 79.5 38 80.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round"/>

      {/* --- CHEESE WHEEL + BAGUETTE --- */}
      <ellipse cx="44" cy="80" rx="5" ry="2.5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.9"/>
      <path d="M42 79 L44 77 L46 79" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      <path d="M48 80 C50 79 54 78 58 79 C60 79.5 60 81 58 81.5 C54 82 50 82 48 81 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="50" y1="78.5" x2="51" y2="80.5" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.4"/>
      <line x1="54" y1="78.5" x2="55" y2="80.5" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.4"/>

      {/* --- WILDFLOWERS --- */}
      <circle cx="4" cy="82" r="2" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.8"/>
      <path d="M4 84 L4 88" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      <circle cx="10" cy="78" r="1.5" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <circle cx="62" cy="78" r="1.8" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <path d="M62 80 L62 84" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),

  // HIKING — layered mountain panorama: detailed peaks, pine forest, rocky trail
  hiking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="46" fill="hsl(var(--primary) / 0.03)"/>
      {/* --- SUN + RAYS --- */}
      <circle cx="82" cy="16" r="8" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      <circle cx="82" cy="16" r="5" fill="hsl(var(--primary) / 0.05)" stroke="none"/>
      {[0,45,90,135,180,225,270,315].map(d => { const a=d*Math.PI/180; return <line key={d} x1={82+10*Math.cos(a)} y1={16+10*Math.sin(a)} x2={82+14*Math.cos(a)} y2={16+14*Math.sin(a)} stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>; })}

      {/* --- CLOUDS --- */}
      <path d="M8 18 C10 14 14 12 18 14 C20 10 26 10 28 14 C30 12 34 14 34 18 C32 20 24 20 20 18 C16 20 10 20 8 18" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
      <path d="M36 26 C38 22 42 22 44 24 C46 22 50 22 50 26 C48 28 40 28 36 26" fill="hsl(var(--primary) / 0.04)" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>

      {/* --- DISTANT MOUNTAINS (far) --- */}
      <path d="M0 54 L14 32 L28 54 Z" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinejoin="round" opacity="0.5"/>
      <path d="M20 54 L42 20 L64 54 Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinejoin="round" opacity="0.6"/>
      <path d="M50 54 L68 28 L86 54 Z" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinejoin="round" opacity="0.5"/>
      {/* snow caps */}
      <path d="M42 20 L48 34 L42 32 L36 34 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinejoin="round" opacity="0.65"/>
      <path d="M68 28 L73 38 L68 36 L63 38 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinejoin="round" opacity="0.55"/>
      {/* mountain ridges */}
      <path d="M34 36 C38 34 42 32 46 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M60 36 C64 34 68 32 72 36" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      {/* horizon */}
      <line x1="0" y1="54" x2="100" y2="54" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>

      {/* --- MID-GROUND HILL --- */}
      <path d="M0 72 C10 64 22 60 38 64 C50 58 66 56 82 64 C92 68 98 72 100 78 L100 100 L0 100 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>

      {/* --- PINE FOREST --- */}
      {/* tree 1 — far left small */}
      <path d="M6 68 L10 58 L14 68 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinejoin="round"/>
      <path d="M7 64 L10 56 L13 64" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinejoin="round"/>
      <rect x="9" y="68" width="2" height="4" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>
      {/* tree 2 — larger */}
      <path d="M16 70 L22 56 L28 70 Z" fill="hsl(var(--primary) / 0.14)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M17.5 66 L22 54 L26.5 66" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinejoin="round"/>
      <path d="M19 62 L22 52 L25 62" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinejoin="round"/>
      <rect x="21" y="70" width="2.5" height="5" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      {/* tree 3 */}
      <path d="M30 68 L35 54 L40 68 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinejoin="round"/>
      <path d="M31 64 L35 52 L39 64" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinejoin="round"/>
      <rect x="34" y="68" width="2" height="4" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>
      {/* tree 4 — right cluster */}
      <path d="M78 68 L82 56 L86 68 Z" fill="hsl(var(--primary) / 0.14)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M79 64 L82 54 L85 64" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinejoin="round"/>
      <rect x="81" y="68" width="2" height="4" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>
      {/* tree 5 */}
      <path d="M88 66 L92 55 L96 66 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinejoin="round"/>
      <path d="M89 62 L92 53 L95 62" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinejoin="round"/>
      <rect x="91" y="66" width="2" height="4" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>

      {/* --- ROCKY TRAIL (perspective) --- */}
      <path d="M38 100 C40 92 44 84 46 76 C48 68 50 62 50 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" opacity="0.55"/>
      <path d="M62 100 C60 92 56 84 54 76 C52 68 50 62 50 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" opacity="0.55"/>
      <path d="M38 100 C40 92 44 84 46 76 C48 68 50 62 50 58 C50 62 52 68 54 76 C56 84 60 92 62 100 Z" fill="hsl(var(--primary) / 0.05)" stroke="none"/>
      {/* rocks */}
      <ellipse cx="48" cy="90" rx="3.5" ry="1.8" fill="hsl(var(--primary) / 0.13)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <ellipse cx="52" cy="82" rx="3" ry="1.5" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <ellipse cx="50" cy="74" rx="2.5" ry="1.2" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>
      <ellipse cx="49" cy="66" rx="1.8" ry="0.9" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
      {/* trail flowers */}
      <circle cx="34" cy="76" r="1.5" fill="hsl(var(--primary) / 0.22)" stroke="hsl(var(--primary))" strokeWidth="0.7"/>
      <circle cx="66" cy="74" r="1.2" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="0.6"/>
      <circle cx="32" cy="82" r="1" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
      <circle cx="68" cy="80" r="1" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
    </svg>
  ),

  // COOKING — detailed kitchen: cast iron pot, stove burner, herbs, garlic, wooden spoon
  cooking: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="46" fill="hsl(var(--primary) / 0.03)"/>
      {/* --- STOVE BURNER RINGS --- */}
      <ellipse cx="50" cy="84" rx="32" ry="7.5" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      <ellipse cx="50" cy="84" rx="26" ry="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.45"/>
      <ellipse cx="50" cy="84" rx="20" ry="4.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.4"/>
      <ellipse cx="50" cy="84" rx="14" ry="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.35"/>
      <ellipse cx="50" cy="84" rx="7" ry="1.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
      {/* grate */}
      <line x1="18" y1="84" x2="82" y2="84" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.25"/>
      <line x1="50" y1="76.5" x2="50" y2="91.5" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.25"/>
      <line x1="28" y1="78" x2="72" y2="90" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.2"/>
      <line x1="28" y1="90" x2="72" y2="78" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.2"/>

      {/* --- CAST IRON POT --- */}
      {/* body */}
      <path d="M20 56 C20 54 22 48 28 46 C34 44 42 43 50 43 C58 43 66 44 72 46 C78 48 80 54 80 56 L80 74 C80 78 76 82 68 84 C62 86 40 86 32 84 C24 82 20 78 20 74 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* pot body texture — subtle horizontal lines */}
      <path d="M22 60 C30 58 44 57 50 57 C60 57 72 58 78 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.2"/>
      <path d="M21 66 C30 64 44 63 50 63 C60 63 72 64 79 66" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.18"/>
      <path d="M21 72 C30 70 44 69 50 69 C60 69 72 70 79 72" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.15"/>
      {/* highlight on pot */}
      <path d="M24 52 C26 50 30 48 36 47" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      {/* rim */}
      <ellipse cx="50" cy="43" rx="30" ry="7.5" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* rim thickness */}
      <path d="M20 43 C20 45 24 47 30 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>

      {/* --- DOME LID --- */}
      <path d="M24 43 C26 37 36 31 50 31 C64 31 74 37 76 43" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.9" strokeLinecap="round"/>
      {/* lid interior arc */}
      <path d="M30 42 C32 38 40 34 50 34 C60 34 68 38 70 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      {/* knob */}
      <path d="M46 31 C46 27 47.5 25 50 25 C52.5 25 54 27 54 31" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="50" cy="25" rx="4.5" ry="2.5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* knob highlight */}
      <path d="M47 24 C48 23 50 23 51 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.3"/>

      {/* --- HANDLES --- */}
      <path d="M20 58 C14 58 10 62 10 67 C10 72 14 76 20 76" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M80 58 C86 58 90 62 90 67 C90 72 86 76 80 76" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
      {/* handle rivets */}
      <circle cx="20" cy="60" r="1" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
      <circle cx="20" cy="74" r="1" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
      <circle cx="80" cy="60" r="1" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
      <circle cx="80" cy="74" r="1" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" strokeWidth="0.5"/>

      {/* --- STEAM --- */}
      <path d="M36 28 C34 22 37 16 35 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      <path d="M50 26 C48 20 51 14 49 8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      <path d="M64 28 C66 22 63 16 65 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      {/* secondary thin wisps */}
      <path d="M42 28 C41 24 43 20 41 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.25"/>
      <path d="M58 28 C59 24 57 20 59 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.25"/>

      {/* --- WOODEN SPOON --- */}
      <path d="M64 40 C67 36 72 28 76 22 C78 18 78 14 76 12 C74 10 71 12 70 16 C68 20 66 26 64 34" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M70 16 C72 12 75 12 76 14" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
      <line x1="64" y1="40" x2="84" y2="60" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
      {/* wood grain on handle */}
      <path d="M66 42 C72 48 76 52 80 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.25"/>
      <path d="M68 44 C74 50 78 54 82 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.2"/>

      {/* --- GARLIC --- */}
      <path d="M6 72 C6 68 8 64 12 64 C16 64 18 68 18 72 C18 76 16 80 12 80 C8 80 6 76 6 72" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M10 64 C10 62 11 60 12 60 C13 60 14 62 14 64" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
      <path d="M8 70 C9 68 10 67 12 68" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M16 70 C15 68 14 67 12 68" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M12 64 L12 72" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.25"/>

      {/* --- ROSEMARY SPRIG --- */}
      <path d="M88 50 C86 56 84 62 86 68" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M86 54 C84 52 82 54 84 56" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      <path d="M87 56 C89 54 91 56 89 58" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      <path d="M86 58 C84 56 82 58 84 60" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      <path d="M87 60 C89 58 91 60 89 62" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      <path d="M86 62 C84 60 82 62 84 64" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
      <path d="M87 64 C89 62 91 64 89 66" fill="hsl(var(--primary) / 0.07)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>
    </svg>
  ),

  // MUSEUM — grand gallery with Venus de Milo sculpture
  museum: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="46" fill="hsl(var(--primary) / 0.03)"/>
      {/* --- GALLERY INTERIOR --- */}
      {/* floor perspective */}
      <path d="M0 96 L50 74 L100 96" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 96 L50 78 L92 96" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.2"/>
      <path d="M20 96 L50 82 L80 96" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.18"/>
      <path d="M32 96 L50 86 L68 96" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.15"/>

      {/* grand arch */}
      <path d="M14 96 L14 28 C14 14 28 6 50 6 C72 6 86 14 86 28 L86 96" fill="hsl(var(--primary) / 0.03)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 96 L20 32 C20 18 32 10 50 10 C68 10 80 18 80 32 L80 96" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.35"/>
      {/* keystone */}
      <path d="M46 6 L50 2 L54 6" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* arch molding */}
      <path d="M18 28 C18 24 20 20 24 18" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      <path d="M82 28 C82 24 80 20 76 18" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>

      {/* pillar details */}
      <rect x="10" y="90" width="12" height="5" rx="0.5" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      <rect x="78" y="90" width="12" height="5" rx="0.5" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      {/* capital details */}
      <path d="M12 28 C12 26 14 24 16 24 C18 24 18 26 20 28" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M80 28 C80 26 82 24 84 24 C86 24 86 26 88 28" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>

      {/* paintings on walls */}
      <rect x="2" y="28" width="10" height="14" rx="0.3" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.3"/>
      <rect x="3" y="29.5" width="8" height="11" rx="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.35"/>
      <rect x="88" y="24" width="10" height="16" rx="0.3" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.3"/>
      <rect x="89" y="25.5" width="8" height="13" rx="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.35"/>

      {/* --- VENUS DE MILO --- */}
      {/* pedestal */}
      <rect x="38" y="80" width="24" height="4" rx="0.5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      <rect x="40" y="76" width="20" height="4" rx="0.3" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.2"/>
      {/* pedestal detail */}
      <line x1="40" y1="78" x2="60" y2="78" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.3"/>

      {/* figure — Venus de Milo: classical contrapposto, missing arms, draped from hips */}
      {/* head — classical oval with hair bun */}
      <ellipse cx="50" cy="32" rx="4" ry="5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.4"/>
      {/* hair — swept up with center part and bun */}
      <path d="M46 31 C46 28 47.5 26 50 26 C52.5 26 54 28 54 31" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round"/>
      {/* hair bun at back/top */}
      <path d="M48 27 C48 24 50 23 51 23 C52 23 53 24 53 26" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round"/>
      {/* hair texture */}
      <path d="M47 29 C48 28 49 27 50 27" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.35"/>
      <path d="M50 27 C51 27 52 28 53 29" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.35"/>
      {/* face hint — nose line, brow */}
      <path d="M49 31 C49.5 30 50 30 50.5 30.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.35"/>
      <path d="M49 34 C49.5 33.5 50.5 33.5 51 34" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.3"/>

      {/* neck */}
      <path d="M48 37 C48.5 36 49 36 50 36 C51 36 51.5 36 52 37" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>

      {/* torso — bare upper body, no arms (Venus signature) */}
      {/* right shoulder + arm stump */}
      <path d="M52 37 C55 38 57 40 58 42 C58.5 43 58 44 57 44" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* left shoulder + arm stump */}
      <path d="M48 37 C45 38 43 40 42 42 C41.5 43 42 44 43 44" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* torso center contour */}
      <path d="M48 37 C47 40 46 44 46 48 C46 52 47 54 48 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M52 37 C53 40 54 44 54 48 C54 52 53 54 52 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round"/>
      {/* torso fill */}
      <path d="M48 37 C47 40 46 44 46 48 C46 52 47 54 48 56 L52 56 C53 54 54 52 54 48 C54 44 53 40 52 37 Z" fill="hsl(var(--primary) / 0.06)" stroke="none"/>
      {/* subtle anatomy lines */}
      <path d="M49 40 C49.5 42 50 44 50 46" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.25"/>
      <path d="M47 42 C48 44 48 46 48 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.35" strokeLinecap="round" opacity="0.2"/>
      <path d="M53 42 C52 44 52 46 52 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.35" strokeLinecap="round" opacity="0.2"/>

      {/* draped fabric from hips — Venus's signature garment */}
      {/* fabric wraps around hips and falls in folds */}
      <path d="M44 54 C43 56 42 58 42 62 C42 66 43 70 44 74 C45 76 49 76 50 76 C51 76 55 76 56 74 C57 70 58 66 58 62 C58 58 57 56 56 54" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* main fold lines */}
      <path d="M46 56 C45 60 45 64 46 68 C46 72 47 74 48 76" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
      <path d="M50 56 C50 60 50 64 50 68 C50 72 50 74 50 76" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.45"/>
      <path d="M54 56 C55 60 55 64 54 68 C54 72 53 74 52 76" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
      {/* secondary fold detail */}
      <path d="M44 58 C44.5 60 44 62 44.5 64" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      <path d="M56 58 C55.5 60 56 62 55.5 64" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.35"/>
      {/* draped knot/gathering at left hip */}
      <path d="M44 54 C42 55 41 56 42 58 C43 56 44 55 45 54" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
      {/* fabric edge detail */}
      <path d="M48 54 C48.5 53 49 53 50 53 C51 53 51.5 53 52 54" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>

      {/* --- SPOTLIGHT GLOW --- */}
      <circle cx="50" cy="50" r="20" fill="hsl(var(--primary) / 0.025)" stroke="none"/>
    </svg>
  ),

  // COCKTAILS — bar scene: detailed coupe glass, cherry, citrus twist, bubbles, ice
  cocktails: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="46" fill="hsl(var(--primary) / 0.03)"/>
      {/* --- BAR COUNTER --- */}
      <path d="M2 86 C16 84 32 82 50 82 C68 82 84 84 98 86" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M2 88 C16 86 32 84 50 84 C68 84 84 86 98 88" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      {/* bar surface reflection */}
      <path d="M28 84 C36 82.5 44 81.5 50 81.5 C56 81.5 64 82.5 72 84" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.2"/>

      {/* --- COUPE GLASS --- */}
      {/* bowl */}
      <path d="M14 30 C16 38 22 48 30 56 C36 62 42 66 50 68 C58 66 64 62 70 56 C78 48 84 38 86 30" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* rim */}
      <ellipse cx="50" cy="30" rx="36" ry="8" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="2"/>
      {/* rim highlight */}
      <path d="M16 28 C22 25 32 23 42 23.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.3"/>
      {/* drink fill */}
      <path d="M18 38 C20 44 26 52 32 58 C38 62 44 65 50 66 C56 65 62 62 68 58 C74 52 80 44 82 38" fill="hsl(var(--primary) / 0.1)" stroke="none"/>
      {/* fill line */}
      <path d="M18 38 C24 35 36 32 50 32 C64 32 76 35 82 38" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.9" strokeLinecap="round" opacity="0.55"/>
      {/* glass reflections */}
      <path d="M17 32 C17 38 19 46 22 54" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>
      <path d="M22 31 C22 36 23 44 25 52" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.45" strokeLinecap="round" opacity="0.22"/>
      <path d="M82 32 C82 36 81 42 80 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.2"/>
      {/* stem */}
      <path d="M47 68 C47.5 70 47.5 74 48 77 C48.5 79 51.5 79 52 77 C52.5 74 52.5 70 53 68" fill="hsl(var(--primary) / 0.05)" stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      {/* stem detail */}
      <path d="M48 70 C49 69 51 69 52 70" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.3"/>
      {/* foot */}
      <ellipse cx="50" cy="79" rx="14" ry="4" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="1.7"/>
      {/* foot highlight */}
      <path d="M38 79 C42 81 48 82 50 82 C52 82 58 81 62 79" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.25"/>

      {/* --- CHERRY --- */}
      <circle cx="58" cy="36" r="6" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      {/* cherry highlight */}
      <circle cx="56" cy="34" r="2" fill="hsl(var(--primary) / 0.15)" stroke="none"/>
      {/* cherry dimple */}
      <path d="M57 38 C58 37 59 38 58 39" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
      {/* cherry stem */}
      <path d="M58 30 C58 26 60 22 64 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round"/>
      {/* leaf at stem */}
      <path d="M62 22 C64 20 66 22 64 24" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round"/>

      {/* --- CITRUS TWIST (spiral) --- */}
      <path d="M72 22 C76 20 80 22 82 26 C84 30 82 34 78 36 C82 36 86 34 86 30 C88 28 86 24 82 22" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round"/>
      {/* peel texture */}
      <path d="M74 24 C76 22 78 24 76 26" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>
      <path d="M80 28 C82 26 84 28 82 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>

      {/* --- ICE CUBES (angular shapes) --- */}
      <path d="M32 42 L36 40 L40 42 L38 46 L34 46 Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinejoin="round" opacity="0.6"/>
      <path d="M36 40 L38 38 L42 40 L40 42" fill="hsl(var(--primary) / 0.04)" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinejoin="round" opacity="0.5"/>
      <path d="M62 48 L66 46 L69 48 L67 51 L63 51 Z" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinejoin="round" opacity="0.55"/>

      {/* --- BUBBLES (various) --- */}
      <circle cx="36" cy="50" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="42" cy="38" r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.45"/>
      <circle cx="46" cy="56" r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.4"/>
      <circle cx="62" cy="42" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.45"/>
      <circle cx="66" cy="56" r="1.8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.38"/>
      <circle cx="52" cy="52" r="1.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.35"/>
      <circle cx="38" cy="58" r="1.2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.3"/>
      <circle cx="56" cy="60" r="1" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="48" cy="44" r="1.2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
      {/* bubble highlights */}
      <path d="M34.5 49 C35 48.5 35.5 49 35 49.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.3"/>
      <path d="M60.5 41 C61 40.5 61.5 41 61 41.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.3"/>
    </svg>
  ),

  // STARGAZING — detailed night sky: realistic moon, constellations, couple, telescope
  stargazing: () => (
    <svg viewBox="0 0 100 100" className="w-20 h-20">
      <circle cx="50" cy="50" r="46" fill="hsl(var(--primary) / 0.06)"/>
      {/* --- MILKY WAY BAND (dense dot cloud) --- */}
      {[6,10,14,18,22,26,30,34,38,42,46,50,54,58,62,66,70].map((x,i) => (
        <circle key={`mw${i}`} cx={x+2} cy={12+Math.sin(x*0.25)*8+Math.cos(x*0.4)*3} r={0.4+Math.sin(x*0.6)*0.25} fill="hsl(var(--primary))" opacity={0.13+Math.sin(x*0.5)*0.07}/>
      ))}
      {[8,14,20,26,32,38,44,50,56,62,68].map((x,i) => (
        <circle key={`mw2${i}`} cx={x+1} cy={16+Math.sin(x*0.35)*6} r={0.3+Math.cos(x*0.8)*0.2} fill="hsl(var(--primary))" opacity={0.1+Math.cos(x*0.4)*0.06}/>
      ))}

      {/* --- CRESCENT MOON — realistic with terminator and craters --- */}
      {/* main crescent shape */}
      <path d="M74 8 C66 10 60 18 60 28 C60 38 66 46 74 48 C68 46 64 38 64 28 C64 18 68 10 74 8 Z" fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* terminator shading (gradate darkness) */}
      <path d="M74 8 C72 14 70 20 70 28 C70 36 72 42 74 48" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.25"/>
      <path d="M74 10 C71 15 69 22 69 28 C69 34 71 41 74 46" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.18"/>
      {/* craters */}
      <circle cx="66" cy="20" r="2.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.4"/>
      <path d="M64 20 C65 19 66 18.5 67.5 19" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" opacity="0.3"/>
      <circle cx="64" cy="30" r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.35"/>
      <circle cx="68" cy="36" r="1.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="66" cy="42" r="1.8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.3"/>
      {/* mare (dark area) */}
      <path d="M65 24 C66 22 68 22 69 24 C68 26 66 26 65 24" fill="hsl(var(--primary) / 0.06)" stroke="none"/>

      {/* --- BIG DIPPER --- */}
      <circle cx="10" cy="22" r="2" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="18" cy="18" r="1.8" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="26" cy="20" r="2" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="32" cy="26" r="1.8" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="30" cy="34" r="2" fill="hsl(var(--primary))" opacity="0.75"/>
      <circle cx="22" cy="36" r="1.8" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="14" cy="32" r="1.6" fill="hsl(var(--primary))" opacity="0.65"/>
      <polyline points="10,22 18,18 26,20 32,26 30,34 22,36 14,32 10,22" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" strokeLinejoin="round"/>
      {/* star halos */}
      <circle cx="10" cy="22" r="3.5" fill="hsl(var(--primary) / 0.04)" stroke="none"/>
      <circle cx="26" cy="20" r="3.5" fill="hsl(var(--primary) / 0.04)" stroke="none"/>

      {/* --- CASSIOPEIA --- */}
      <circle cx="42" cy="8" r="1.6" fill="hsl(var(--primary))" opacity="0.65"/>
      <circle cx="48" cy="12" r="1.8" fill="hsl(var(--primary))" opacity="0.7"/>
      <circle cx="54" cy="8" r="1.6" fill="hsl(var(--primary))" opacity="0.65"/>
      <circle cx="38" cy="12" r="1.4" fill="hsl(var(--primary))" opacity="0.6"/>
      <circle cx="58" cy="12" r="1.4" fill="hsl(var(--primary))" opacity="0.6"/>
      <polyline points="38,12 42,8 48,12 54,8 58,12" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.35" strokeLinecap="round" strokeLinejoin="round"/>

      {/* --- SCATTERED STARS (varied) --- */}
      <circle cx="82" cy="22" r="1" fill="hsl(var(--primary))" opacity="0.45"/>
      <circle cx="88" cy="36" r="0.8" fill="hsl(var(--primary))" opacity="0.35"/>
      <circle cx="78" cy="48" r="1" fill="hsl(var(--primary))" opacity="0.4"/>
      <circle cx="14" cy="46" r="0.9" fill="hsl(var(--primary))" opacity="0.35"/>
      <circle cx="22" cy="50" r="0.7" fill="hsl(var(--primary))" opacity="0.3"/>
      <circle cx="36" cy="20" r="0.8" fill="hsl(var(--primary))" opacity="0.3"/>
      <circle cx="42" cy="38" r="0.7" fill="hsl(var(--primary))" opacity="0.25"/>
      <circle cx="56" cy="32" r="0.8" fill="hsl(var(--primary))" opacity="0.3"/>
      <circle cx="84" cy="52" r="0.6" fill="hsl(var(--primary))" opacity="0.25"/>
      <circle cx="92" cy="28" r="0.7" fill="hsl(var(--primary))" opacity="0.3"/>
      <circle cx="6" cy="40" r="0.6" fill="hsl(var(--primary))" opacity="0.25"/>
      <circle cx="48" cy="24" r="0.6" fill="hsl(var(--primary))" opacity="0.25"/>
      {/* twinkling star */}
      <path d="M86 16 L87 14 L88 16 L87 18 Z" fill="hsl(var(--primary))" opacity="0.5"/>
      <path d="M85.5 16 L87 15 L88.5 16 L87 17 Z" fill="hsl(var(--primary))" opacity="0.3"/>

      {/* --- SHOOTING STAR --- */}
      <line x1="78" y1="6" x2="68" y2="12" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="78" y1="6" x2="82" y2="4" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.3"/>

      {/* --- ROLLING HILL --- */}
      <path d="M0 90 C12 80 26 74 42 76 C56 72 70 68 98 78 L98 100 L0 100 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* hill texture */}
      <path d="M6 88 C16 84 28 80 42 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.25"/>
      <path d="M60 76 C72 74 84 76 96 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/>

      {/* --- TELESCOPE --- */}
      {/* tube */}
      <path d="M76 78 C74 74 72 70 68 66 C66 64 68 62 72 62 C76 62 78 64 76 66 C74 68 74 72 76 76" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* lens cap */}
      <path d="M66 64 C64 62 64 60 66 60 C68 60 70 60 72 62" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      {/* tripod */}
      <line x1="74" y1="72" x2="68" y2="82" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/>
      <line x1="74" y1="72" x2="80" y2="82" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/>
      <line x1="74" y1="72" x2="74" y2="82" stroke="hsl(var(--primary))" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/>
      {/* tripod detail */}
      <path d="M70 78 L78 78" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.4"/>

      {/* --- COUPLE SILHOUETTES --- */}
      {/* person 1 */}
      <circle cx="42" cy="68" r="4" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.3"/>
      <path d="M38 72 C38 74 39 76 40 78 C41 80 42 82 42 84" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M46 72 C46 74 45 76 45 78 C45 80 44 82 44 84" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round"/>
      {/* person 2 */}
      <circle cx="52" cy="66" r="4" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" strokeWidth="1.3"/>
      <path d="M48 70 C48 72 49 74 49 76 C49 78 50 80 50 82" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M56 70 C56 72 55 74 55 76 C55 78 54 80 54 82" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round"/>
      {/* heads leaning together */}
      <path d="M46 67 C48 66 50 66 52 67" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeLinecap="round" opacity="0.35"/>
      {/* pointing arm */}
      <path d="M42 70 C40 66 38 62 36 58" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      {/* pointing hand */}
      <path d="M36 58 L34 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" strokeLinecap="round" opacity="0.4"/>
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
