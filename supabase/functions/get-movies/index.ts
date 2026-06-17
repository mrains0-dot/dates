import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Curated 2026 release calendar — format: YYYY-MM
const CURATED_2026: Array<{ id: string; label: string; releaseMonth: string; genre: string }> = [
  // Jan–Feb 2026
  { id: "dog-man", label: "Dog Man", releaseMonth: "2026-01", genre: "Animation/Comedy" },
  { id: "captain-america-bnw", label: "Captain America: Brave New World", releaseMonth: "2026-02", genre: "Action/Superhero" },
  { id: "paddington-peru", label: "Paddington in Peru", releaseMonth: "2026-02", genre: "Family/Adventure" },
  // Mar–Apr 2026
  { id: "snow-white", label: "Snow White", releaseMonth: "2026-03", genre: "Fantasy/Musical" },
  { id: "how-to-train-dragon", label: "How to Train Your Dragon", releaseMonth: "2026-03", genre: "Animation/Fantasy" },
  { id: "lilo-stitch", label: "Lilo & Stitch", releaseMonth: "2026-04", genre: "Animation/Family" },
  { id: "thunderbolts", label: "Thunderbolts*", releaseMonth: "2026-04", genre: "Action/Superhero" },
  // May–Jun 2026
  { id: "avengers-doomsday", label: "Avengers: Doomsday", releaseMonth: "2026-05", genre: "Action/Superhero" },
  { id: "mission-impossible-fr", label: "Mission: Impossible – The Final Reckoning", releaseMonth: "2026-05", genre: "Action/Thriller" },
  { id: "karate-kid-new", label: "Karate Kid: Legends", releaseMonth: "2026-05", genre: "Action/Drama" },
  { id: "jurassic-world-rebirth", label: "Jurassic World Rebirth", releaseMonth: "2026-06", genre: "Action/Adventure" },
  { id: "28-years-later", label: "28 Years Later", releaseMonth: "2026-06", genre: "Horror/Thriller" },
  // Jul–Aug 2026
  { id: "fantastic-four", label: "The Fantastic Four: First Steps", releaseMonth: "2026-07", genre: "Action/Sci-Fi" },
  { id: "moana-2", label: "Moana 2", releaseMonth: "2026-07", genre: "Animation/Adventure" },
  { id: "blade-mcu", label: "Blade", releaseMonth: "2026-08", genre: "Action/Horror" },
  // Sep–Dec 2026
  { id: "hunger-games-reaping", label: "The Hunger Games: Sunrise on the Reaping", releaseMonth: "2026-11", genre: "Dystopian/Drama" },
  { id: "batman-part-2", label: "The Batman Part II", releaseMonth: "2026-10", genre: "Action/Drama" },
  { id: "avatar-3", label: "Avatar: The Seed Bearer", releaseMonth: "2026-12", genre: "Sci-Fi/Adventure" },
];

const CLASSICS = [
  { id: "notebook", label: "The Notebook", year: "2004", genre: "Romance" },
  { id: "titanic", label: "Titanic", year: "1997", genre: "Romance/Drama" },
  { id: "pride", label: "Pride & Prejudice", year: "2005", genre: "Romance/Drama" },
  { id: "lalaland", label: "La La Land", year: "2016", genre: "Romance/Musical" },
  { id: "10things", label: "10 Things I Hate About You", year: "1999", genre: "Romance/Comedy" },
  { id: "whenhary", label: "When Harry Met Sally", year: "1989", genre: "Romance/Comedy" },
  { id: "nottinghill", label: "Notting Hill", year: "1999", genre: "Romance/Comedy" },
  { id: "crazyrach", label: "Crazy, Rich Asians", year: "2018", genre: "Romance/Comedy" },
];

function getNowShowing(): Array<{ id: string; label: string; year: string; genre: string }> {
  const now = new Date();
  const currentYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  // "In theaters" = released in past 8 weeks or this / next month (upcoming this month counts as "coming soon")
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - 56); // 8 weeks ago
  const cutoffYM = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, "0")}`;

  const showing = CURATED_2026.filter(
    (m) => m.releaseMonth >= cutoffYM && m.releaseMonth <= currentYM
  );

  // If nothing fits the window (e.g. gap in calendar), expand to ±1 month
  if (showing.length < 3) {
    const expanded = cutoff;
    expanded.setMonth(expanded.getMonth() - 1);
    const expandedYM = `${expanded.getFullYear()}-${String(expanded.getMonth() + 1).padStart(2, "0")}`;
    const next = new Date(now);
    next.setMonth(next.getMonth() + 1);
    const nextYM = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
    return CURATED_2026.filter((m) => m.releaseMonth >= expandedYM && m.releaseMonth <= nextYM)
      .map((m) => ({ ...m, year: m.releaseMonth.slice(0, 4) }));
  }

  return showing.map((m) => ({ ...m, year: m.releaseMonth.slice(0, 4) }));
}

async function getNowShowingFromTMDB(apiKey: string) {
  const url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  const data = await res.json();
  return (data.results || []).slice(0, 8).map((m: Record<string, unknown>) => ({
    id: String(m.id),
    label: String(m.title),
    year: String(m.release_date).slice(0, 4),
    genre: "Now in Theaters",
  }));
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const tmdbKey = Deno.env.get("TMDB_API_KEY");
    let nowShowing: Array<{ id: string; label: string; year: string; genre?: string }>;

    if (tmdbKey) {
      try {
        nowShowing = await getNowShowingFromTMDB(tmdbKey);
      } catch {
        nowShowing = getNowShowing();
      }
    } else {
      nowShowing = getNowShowing();
    }

    return new Response(
      JSON.stringify({ nowShowing, classics: CLASSICS }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
