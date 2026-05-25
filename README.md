# Meghan Lahti for Mayor, Port Moody 2026

Campaign website for Meghan Lahti's 2026 mayoral re-election campaign.

## Deployment

Static site. Deploy to Netlify:

1. Push this repo to GitHub
2. Connect to Netlify
3. Build command: none
4. Publish directory: `.` (root)

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About Meghan |
| `platform.html` | The Platform |
| `the-record.html` | What We've Done |
| `volunteer.html` | Volunteer |
| `donate.html` | Donate |
| `contact.html` | Contact |
| `preview-access.html` | Password gate landing |

## The Five Pillars

The site is built around five campaign pillars:

1. Transportation
2. Housing and Affordability
3. Good Governance and Transparency
4. Experience as an Asset
5. Fiscal Responsibility

All banners and highlight strips reflect these pillars.

## Voice

Plain language. No em dashes or en dashes. No money-talk banners. Born from love for this community, and pride in helping shape it.

## Stylesheet

`shared.css` is the single source of truth for typography, colour, nav, footer, page banners, pull quotes, pillar strips, and buttons. Page-specific styles live inline in each HTML file's `<style>` block.

## Password gate

`password-gate.js` is loaded by every public page and gates the site behind `preview-access.html`. Leave it in place until you're ready to launch publicly. To remove the gate, delete the `<script src="password-gate.js"></script>` line at the bottom of each HTML page and delete the two files (`password-gate.js`, `preview-access.html`).

## Contact form

`contact.html` posts to two endpoints on submit:

1. `https://formsubmit.co/ajax/sheri@zadagroup.ca` (email)
2. `https://hooks.zapier.com/hooks/catch/27087516/u7y60l6/` (Zapier webhook)

Both run in parallel. If either changes, edit the `handleContact` function at the bottom of `contact.html`.
