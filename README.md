# Meghan Lahti for Mayor, Port Moody 2026

Campaign website for Meghan Lahti's 2026 mayoral re-election campaign.

## Deployment

Static site. Deploy to Netlify:

1. Push this repo to GitHub
2. Connect to Netlify
3. Build command: none
4. Publish directory: `.` (root)

## Pages

The site is five primary pages, plus Donate and the password gate.

| File | Page |
|------|------|
| `index.html` | Home (includes bio, leadership philosophy, four priorities) |
| `endorsements.html` | Endorsements (+ submit-an-endorsement form) |
| `what-we-built.html` | What We Built (the public record) |
| `volunteer.html` | Volunteer (+ signup form) |
| `contact.html` | Contact (campaign form + official City channels) |
| `donate.html` | Donate (linked from nav/footer) |
| `preview-access.html` | Password gate landing |

Old pages (`about.html`, `platform.html`, `the-record.html`) were consolidated;
`_redirects` maps the old URLs to their new homes.

## The four priorities

The homepage is organized around four priorities:

1. A City That Moves
2. Growth We Can Be Proud Of
3. Value for Every Tax Dollar
4. Experienced Leadership That Brings People Together

## Voice

Plain language, in Meghan's voice. No em dashes or en dashes. No opponent
references. "Fight" and its variants are banned. Facts do the work: every
number, date, and project status must trace to the verified facts ledger.

## Design

Restrained, editorial, photographic. The existing campaign palette is kept and
applied sparingly (ink and cream do the work, rose as a sparing accent). No
motion, no card grids, no decorative numbers. `shared.css` holds typography,
colour, nav, footer, buttons, and shared components. Page-specific styles live
inline in each HTML file's `<style>` block. `shared.js` handles only the mobile
menu toggle.

## Password gate

`password-gate.js` is loaded by every public page and gates the site behind
`preview-access.html`. Leave it in place until you're ready to launch publicly.
To remove the gate, delete the `<script src="password-gate.js"></script>` line at
the bottom of each HTML page and delete the two files (`password-gate.js`,
`preview-access.html`).

## Forms

Three forms post in parallel to the same two endpoints:

1. `https://formsubmit.co/ajax/sheri@zadagroup.ca` (email)
2. `https://hooks.zapier.com/hooks/catch/27087516/u7y60l6/` (Zapier webhook)

- Contact form: `handleContact` in `contact.html`
- Volunteer signup: `handleVolunteer` in `volunteer.html`
- Endorsement submission: `handleEndorse` in `endorsements.html`

If either endpoint changes, update all three handlers.

## Unreferenced files

`edit-mode.js` and `supabase-setup.sql` powered an inline editor that only ran on
the old `about.html`. They are no longer loaded by any page. Kept in the repo in
case the inline-editing workflow is wanted again; safe to delete otherwise.
