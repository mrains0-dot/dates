import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "re_NVrZRdXB_2a5GvkAjULofubau6QzqBJX1";
const SENDER_EMAIL = "onboarding@resend.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function buildEmailHtml(title: string, date: string | null, location: string | null): string {
  const safeTitle = (title || "Our Date").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeDate = (date || "TBD").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeLocation = (location || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const locationRow = safeLocation
    ? `<tr><td style="padding:6px 0;color:#5a4044;font-size:14px;">📍 <strong>Where:</strong> ${safeLocation}</td></tr>`
    : "";

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#faf6f1;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f1;padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;box-shadow:0 4px 20px rgba(190,18,60,0.08);overflow:hidden;max-width:520px;">
        <tr><td style="background:#BE123C;color:#ffffff;text-align:center;padding:32px 24px;">
          <div style="font-size:42px;line-height:1;margin-bottom:8px;">♥</div>
          <h1 style="margin:0;font-size:24px;font-weight:600;letter-spacing:-0.5px;">It's a date!</h1>
        </td></tr>
        <tr><td style="padding:32px 28px 8px 28px;color:#3b2024;">
          <p style="margin:0 0 18px 0;font-size:16px;line-height:1.5;color:#5a4044;">
            Your date plan has been confirmed. Here are the details:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf2f6;border:1px solid #fbd5e0;border-radius:12px;padding:18px 20px;">
            <tr><td style="padding:6px 0;color:#3b2024;font-size:18px;font-weight:600;">${safeTitle}</td></tr>
            <tr><td style="padding:6px 0;color:#5a4044;font-size:14px;">🗓️ <strong>When:</strong> ${safeDate}</td></tr>
            ${locationRow}
          </table>
        </td></tr>
        <tr><td style="padding:24px 28px 32px 28px;color:#7a5a60;font-size:13px;line-height:1.5;text-align:center;">
          Have a wonderful time. ✨<br>
          <span style="color:#9a7a80;">— Sent from Date Planner</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, title, date, location } = await req.json();

    if (!email || !title) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email and title" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = buildEmailHtml(title, date ?? null, location ?? null);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [email],
        subject: `💌 Date confirmed: ${title}`,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: data }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
