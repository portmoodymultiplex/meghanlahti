// Password gate for the volunteer hub.
// Real server-side check: the password never appears in page source.
// Set CANVASS_PASSWORD in Netlify: Site configuration > Environment variables.

import type { Context } from "@netlify/edge-functions";

const COOKIE = "lahti_canvass";
const MAX_AGE = 60 * 60 * 24 * 60; // 60 days

// The volunteer password. Works out of the box with no configuration.
// To change it without touching the repo, set CANVASS_PASSWORD in
// Netlify > Site configuration > Environment variables. That value wins.
const DEFAULT_PASSWORD = "canvasscrew123";

async function tokenFor(password: string): Promise<string> {
  const data = new TextEncoder().encode("lahti2026:" + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default async (request: Request, context: Context) => {
  const password = Deno.env.get("CANVASS_PASSWORD") || DEFAULT_PASSWORD;

  const expected = await tokenFor(password);
  const url = new URL(request.url);

  // 1. Submitted the form
  if (request.method === "POST") {
    const form = await request.formData();
    const given = String(form.get("password") ?? "");
    if (safeEqual(await tokenFor(given), expected)) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: url.pathname,
          "Set-Cookie": `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return new Response(loginPage(true), {
      status: 401,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  // 2. Already has a valid cookie
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]{64})`));
  if (match && safeEqual(match[1], expected)) return context.next();

  // 3. Show the form
  return new Response(loginPage(false), {
    status: 401,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
};

export const config = { path: "/canvasserteam*" };

function loginPage(failed: boolean): string {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Volunteer Access | Meghan Lahti 2026</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',-apple-system,Helvetica,Arial,sans-serif;background:#2D3A5C;color:#fff;
 min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;line-height:1.55}
.card{width:100%;max-width:420px}
.kick{font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#C77DA1;margin-bottom:14px}
h1{font-family:'Playfair Display',Georgia,serif;font-size:34px;line-height:1.1;font-weight:700;margin-bottom:12px}
p{color:rgba(255,255,255,.78);font-size:15.5px;margin-bottom:22px}
label{display:block;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
 color:rgba(255,255,255,.6);margin-bottom:7px}
input{width:100%;padding:14px 16px;font:inherit;font-size:16px;border-radius:10px;border:1.5px solid rgba(255,255,255,.22);
 background:rgba(255,255,255,.08);color:#fff;outline:none;margin-bottom:14px}
input:focus{border-color:#C77DA1;background:rgba(255,255,255,.13)}
button{width:100%;padding:14px;font:inherit;font-size:16px;font-weight:700;border:0;border-radius:10px;
 background:#C77DA1;color:#fff;cursor:pointer}
button:hover{background:#A8628A}
.err{background:rgba(199,125,161,.22);border:1px solid #C77DA1;border-radius:9px;padding:11px 14px;
 font-size:14.5px;margin-bottom:18px}
.foot{margin-top:26px;font-size:13px;color:rgba(255,255,255,.5)}
.foot a{color:#C77DA1}
</style></head><body>
<div class="card">
  <div class="kick">Meghan Lahti 2026 &middot; Volunteers</div>
  <h1>Canvasser Hub</h1>
  <p>This area is for our canvassing team. Enter the password from your welcome message or the group chat.</p>
  ${failed ? '<div class="err">That password did not work. Check the group chat, or email sheri@lahti2026.com.</div>' : ""}
  <form method="POST">
    <label for="p">Password</label>
    <input id="p" name="password" type="password" autocomplete="current-password" autofocus required>
    <button type="submit">Enter</button>
  </form>
  <p class="foot">Not a volunteer yet and want to help? Email <a href="mailto:sheri@lahti2026.com">sheri@lahti2026.com</a>.</p>
</div></body></html>`;
}
