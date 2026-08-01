# Deploying the volunteer hub behind a password

Drop these into the lahti2026.com repo alongside the existing site, at the same level as `index.html`.

```
canvasserteam/index.html                <- the hub page          COMMIT
netlify/edge-functions/canvass-gate.ts  <- the password gate     COMMIT
netlify.toml                            <- routing and headers   COMMIT (merge into yours if it exists)
README-deploy.md                        <- these notes           optional, does not affect the deploy
```

**Yes, `netlify/` goes in git.** It is source code that Netlify reads out of the repo at deploy time, not a build artifact. If it is not committed, the gate silently does nothing and the page is wide open.

**Do not commit `.netlify/`** (with a leading dot). That is a local cache folder the Netlify CLI creates on your Mac. Different thing, same name, easy to mix up. There is a `.gitignore-additions.txt` in this bundle with the two lines to add.

Both `netlify.toml` and `netlify/` must sit at the **root of the repo**, not inside a subfolder, unless you have set a custom base directory in Netlify.

## 1. Set the password

In Netlify: **Site configuration → Environment variables → Add a variable**

- Key: `CANVASS_PASSWORD`
- Value: whatever you choose
- Scopes: leave as all

The password lives only in Netlify, never in the repo and never in page source. Change it any time without a redeploy.

**Note:** if `CANVASS_PASSWORD` is not set, the gate stays open rather than locking everyone out. That is deliberate, so a missed env var never blocks a Saturday canvass. Set it before you share the link.

## 2. Push and deploy

The edge function runs automatically on any request to `/canvasserteam` or anything under it. Nothing else on the site is affected.

## 3. Check it worked

- Open `lahti2026.com/canvasserteam` in a private window. You should get the branded password screen.
- Enter the password. You should land on the hub.
- The cookie lasts 60 days, so volunteers log in roughly once per campaign.

## Do not add it to robots.txt

`robots.txt` is a public file. Listing `/canvasserteam` there is the fastest way to tell someone exactly where to look. The page already carries `noindex, nofollow` in a meta tag, and `netlify.toml` adds the same as an HTTP header, which is what well-behaved crawlers obey. Just make sure the page is not in your sitemap and is not linked from any public page on the site.

## About the password

The password is in the volunteer welcome message and the group chat description. It is **not** written in this repo on purpose. If this repository is ever public, or becomes public later, anything committed here is permanently in the git history even after you delete it.

Set it only in the Netlify environment variable. That is the one place it belongs.

## If you want to revoke everyone at once

Change `CANVASS_PASSWORD` in Netlify. Every existing cookie stops matching immediately and everyone is asked to log in again. No redeploy needed.
