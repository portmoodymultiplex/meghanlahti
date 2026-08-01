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

## 1. The password

The password is **canvasscrew123** and it already works. No configuration needed, just deploy.

It is checked on Netlify's servers, so it never reaches the browser and cannot be read from page source. It is written in `netlify/edge-functions/canvass-gate.ts` as a fallback default.

**If this repo is public on GitHub, change that.** Anything committed to git stays in the history forever, even after you delete it. To move the password out of the repo:

1. In Netlify: **Site configuration → Environment variables → Add a variable**, key `CANVASS_PASSWORD`, value `canvasscrew123`.
2. Delete the `DEFAULT_PASSWORD` line from the edge function and commit.

The environment variable always wins over the default, so you can do step 1 now and step 2 whenever.

## 2. Push and deploy

The edge function runs automatically on any request to `/canvasserteam` or anything under it. Nothing else on the site is affected.

## 3. Check it worked

- Open `lahti2026.com/canvasserteam` in a private window. You should get the branded password screen.
- Enter the password. You should land on the hub.
- The cookie lasts 60 days, so volunteers log in roughly once per campaign.

## Do not add it to robots.txt

`robots.txt` is a public file. Listing `/canvasserteam` there is the fastest way to tell someone exactly where to look. The page already carries `noindex, nofollow` in a meta tag, and `netlify.toml` adds the same as an HTTP header, which is what well-behaved crawlers obey. Just make sure the page is not in your sitemap and is not linked from any public page on the site.

## If you want to revoke everyone at once

Change `CANVASS_PASSWORD` in Netlify. Every existing cookie stops matching immediately and everyone is asked to log in again. No redeploy needed.
