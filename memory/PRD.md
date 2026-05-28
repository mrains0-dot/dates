# Date Planner — PRD

## Original Problem Statement
User uploaded `dates-main.zip` containing a Vite + React + TS "Date Planner" app originally built on Supabase. Asked: "can you create this". The task was to rebuild the app on the standard Emergent stack (FastAPI + MongoDB + React/Vite) while preserving the original UX, flow and design.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite (port 3000) + Tailwind v4 + wouter (routing) + TanStack Query + lucide-react + canvas-confetti
- **Backend**: FastAPI (port 8001, `/api` prefix) + Motor (async MongoDB)
- **Database**: MongoDB (`date_planner_db`)
- Frontend → Backend via `REACT_APP_BACKEND_URL` (exposed to Vite via `define`)

## Core Routes (Frontend)
- `/`        — Landing: "Will you go on a date with me?" + escaping "No thanks" button
- `/when`    — Pick date & time
- `/where`   — 8 date type tiles (Restaurant, Movie Night, Picnic, Hiking, Cooking, Museum, Cocktails, Stargazing)
- `/where/restaurant`          — Pick cuisine (Italian/Mexican/Asian/American/Seafood/Steakhouse)
- `/where/restaurant/business` — Pick restaurant (Budget / Upscale, fetched from API)
- `/where/cinema`              — Pick movie (2026 Releases / Classics, fetched from API)
- `/confirm` — Confetti + summary + "Send Details to Email" form

## Backend Endpoints
- `GET  /api/`                                       — health
- `GET  /api/movies`                                 — `{ newReleases, popularClassics }`, weekly rotation
- `GET  /api/restaurants?cuisine_type=Italian`       — `[ ...budget(3), ...upscale(3) ]`
- `POST /api/send-date-email`                        — stores plan in `date_plans`; MOCKED (no real email sent — mirrors original Supabase edge function which only logged)

## Seed Data (auto-seeded on first backend start)
- 16 new-release movies (2026, week-rotated 1–4)
- 15 classic romance movies
- 10 budget + 10 upscale restaurants

## Status
- ✅ All flows working end-to-end (verified by testing agent — 100% pass)
- ✅ MongoDB auto-seeding works on first run
- ⚠️ POST `/api/send-date-email` is **MOCKED** — only logs + stores; no real email delivery

## Implemented (2026-05-28)
- Recreated full app from uploaded zip
- Ported Supabase calls → FastAPI endpoints
- Vite configured for port 3000 + supervisor `yarn start`
- Auto-seed of movies/restaurants

## Backlog / P1
- Wire `/api/send-date-email` to a real provider (Resend / SendGrid / Gmail)
- Add custom "Stargazing", "Picnic" etc. sub-pages similar to Restaurant/Cinema
- Persist & share date plans via shareable link

## Future Enhancements
- AI-suggested date ideas based on partner profile (GPT integration)
- Calendar invite (.ics) attached to the email confirmation
- Multiple-choice date proposal sent to a partner who picks their favorite
