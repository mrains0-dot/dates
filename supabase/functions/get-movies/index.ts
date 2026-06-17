import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Curated 2026 release calendar — format: YYYY-MM
const CURATED_2026: Array<{ id: string; label: string; releaseMonth: string; genre: string }> = [
  // January 2026
  { id: "dog-man", label: "Dog Man", releaseMonth: "2026-01", genre: "Animation/Comedy" },
  { id: "sonic-3", label: "Sonic the Hedgehog 3", releaseMonth: "2026-01", genre: "Animation/Action" },
  { id: "presence", label: "Presence", releaseMonth: "2026-01", genre: "Horror/Thriller" },
  { id: "flight-risk", label: "Flight Risk", releaseMonth: "2026-01", genre: "Action/Thriller" },
  // February 2026
  { id: "captain-america-bnw", label: "Captain America: Brave New World", releaseMonth: "2026-02", genre: "Action/Superhero" },
  { id: "paddington-peru", label: "Paddington in Peru", releaseMonth: "2026-02", genre: "Family/Adventure" },
  { id: "bridget-jones-4", label: "Bridget Jones: Mad About the Boy", releaseMonth: "2026-02", genre: "Romance/Comedy" },
  { id: "companion", label: "Companion", releaseMonth: "2026-02", genre: "Sci-Fi/Thriller" },
  // March 2026
  { id: "snow-white", label: "Snow White", releaseMonth: "2026-03", genre: "Fantasy/Musical" },
  { id: "how-to-train-dragon", label: "How to Train Your Dragon", releaseMonth: "2026-03", genre: "Animation/Fantasy" },
  { id: "black-bag", label: "Black Bag", releaseMonth: "2026-03", genre: "Spy/Thriller" },
  { id: "novocaine", label: "Novocaine", releaseMonth: "2026-03", genre: "Action/Comedy" },
  { id: "mickey-17", label: "Mickey 17", releaseMonth: "2026-03", genre: "Sci-Fi/Comedy" },
  // April 2026
  { id: "lilo-stitch", label: "Lilo & Stitch", releaseMonth: "2026-04", genre: "Animation/Family" },
  { id: "thunderbolts", label: "Thunderbolts*", releaseMonth: "2026-04", genre: "Action/Superhero" },
  { id: "sinners", label: "Sinners", releaseMonth: "2026-04", genre: "Horror/Drama" },
  { id: "until-dawn", label: "Until Dawn", releaseMonth: "2026-04", genre: "Horror/Thriller" },
  { id: "a-minecraft-movie", label: "A Minecraft Movie", releaseMonth: "2026-04", genre: "Animation/Adventure" },
  // May 2026
  { id: "avengers-doomsday", label: "Avengers: Doomsday", releaseMonth: "2026-05", genre: "Action/Superhero" },
  { id: "mission-impossible-fr", label: "Mission: Impossible – The Final Reckoning", releaseMonth: "2026-05", genre: "Action/Thriller" },
  { id: "karate-kid-legends", label: "Karate Kid: Legends", releaseMonth: "2026-05", genre: "Action/Drama" },
  { id: "f1-movie", label: "F1", releaseMonth: "2026-05", genre: "Action/Drama" },
  { id: "final-destination-reboot", label: "Final Destination Bloodlines", releaseMonth: "2026-05", genre: "Horror/Thriller" },
  { id: "ballerina", label: "Ballerina", releaseMonth: "2026-05", genre: "Action/Thriller" },
  // June 2026
  { id: "jurassic-world-rebirth", label: "Jurassic World Rebirth", releaseMonth: "2026-06", genre: "Action/Adventure" },
  { id: "28-years-later", label: "28 Years Later", releaseMonth: "2026-06", genre: "Horror/Thriller" },
  { id: "zootopia-2", label: "Zootopia 2", releaseMonth: "2026-06", genre: "Animation/Comedy" },
  { id: "wicked-part-2", label: "Wicked: For Good", releaseMonth: "2026-06", genre: "Fantasy/Musical" },
  { id: "m3gan-2", label: "M3GAN 2.0", releaseMonth: "2026-06", genre: "Horror/Sci-Fi" },
  { id: "ocean-gate", label: "Ocean Gate", releaseMonth: "2026-06", genre: "Drama/Thriller" },
  // July 2026
  { id: "fantastic-four", label: "The Fantastic Four: First Steps", releaseMonth: "2026-07", genre: "Action/Sci-Fi" },
  { id: "moana-2", label: "Moana 2", releaseMonth: "2026-07", genre: "Animation/Adventure" },
  { id: "tron-ares", label: "Tron: Ares", releaseMonth: "2026-07", genre: "Sci-Fi/Action" },
  { id: "live-action-tangled", label: "Tangled", releaseMonth: "2026-07", genre: "Fantasy/Musical" },
  // August 2026
  { id: "blade-mcu", label: "Blade", releaseMonth: "2026-08", genre: "Action/Horror" },
  { id: "cloverfield-sequel", label: "Cloverfield", releaseMonth: "2026-08", genre: "Sci-Fi/Horror" },
  { id: "masters-of-universe", label: "Masters of the Universe", releaseMonth: "2026-08", genre: "Fantasy/Action" },
  // September–October 2026
  { id: "batman-part-2", label: "The Batman Part II", releaseMonth: "2026-10", genre: "Action/Drama" },
  { id: "five-nights-2", label: "Five Nights at Freddy's 2", releaseMonth: "2026-10", genre: "Horror/Thriller" },
  // November–December 2026
  { id: "hunger-games-reaping", label: "The Hunger Games: Sunrise on the Reaping", releaseMonth: "2026-11", genre: "Dystopian/Drama" },
  { id: "toy-story-5", label: "Toy Story 5", releaseMonth: "2026-11", genre: "Animation/Family" },
  { id: "avatar-3", label: "Avatar: The Seed Bearer", releaseMonth: "2026-12", genre: "Sci-Fi/Adventure" },
  { id: "avengers-secret-wars", label: "Avengers: Secret Wars", releaseMonth: "2026-12", genre: "Action/Superhero" },
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
  cutoff.setDate(cutoff.getDate() - 84); // 12 weeks ago
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
