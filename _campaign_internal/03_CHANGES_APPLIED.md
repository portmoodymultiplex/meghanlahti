# Website Changes Applied — April 30, 2026

**Scope:** TIER 1 (confirmed errors) only. TIER 2 polish and TIER 3 (needs Meghan's confirmation) are NOT yet applied — they're listed in `01_WEBSITE_AUDIT.md`.

**Site is still down.** Do not re-deploy until Meghan confirms TIER 3 items.

---

## Applied changes by file

### `index.html`
- **Line 325 (Pillar 02 card):** Removed "funded and planned" claim about Rocky Point Park. Now reads: *"Rocky Point Park western expansion — in the Official Community Plan, with an acquisition fund growing through community amenity contributions"*
- **Line 368 ("The Record" intro):** Changed "Meghan's 30-year record" → "Meghan's record" (avoiding the contested 30-year framing).
- **Lines 380–381 (Portwood proof card):** Replaced "$150 million in BC Housing funding / One of the largest BC Housing investments / pedestrian overpass to Inlet Centre SkyTrain / Ground broke December 2024" with "senior-government funding through BC Housing and CMHC / pedestrian connection to transit / Ground broke 2024." Removed the "largest BC Housing investment" overclaim. Tagged correctly as **Portwood**, not Coronation Park.
- **Line 411 (story block):** Reworded "the longest-serving member in the city's history" → "one of the longest-serving members in the city's history." Also changed "She's served on Port Moody council since 1996" → "She first won a seat on Port Moody council in 1996" (more accurate given service gaps).
- **Line 414 (timeline 1996):** Same softening — "longest-serving" → "one of the longest-serving."

### `platform.html`
- **Line 289 (Pillar 01 body):** "328 non-market rental apartments are now under construction at Coronation Park — backed by $140 million in BC Housing funding" → "328 non-market rental apartments are now under construction at Portwood (The Creek, 296 Angela Dr) — backed by senior-government funding through BC Housing and CMHC."
- **Line 299 (Pillar 01 proof #1):** "under construction at Coronation Park, backed by $140M in BC Housing funding. Ground broke December 2025" → "under construction at Portwood (The Creek, 296 Angela Dr), backed by senior-government funding through BC Housing and CMHC. Ground broke 2024."
- **Line 299 (Pillar 01 proof #3):** "$140M / BC Housing funding secured" → "Funded / Senior-government funding secured from BC Housing and CMHC."
- **Line 322 (Pillar 02 body):** "nearly thirty years on council" → "more than two decades of council service." Also added "By 1996 she was on Port Moody City Council" for clarity.
- **Line 329 (Pillar 02 commits):** "Active planning and funding underway" claim about Rocky Point Park western expansion → "In the Official Community Plan." Now factually accurate per Meghan's own correction.

### `the-record.html`
- **Line 223 (page banner label):** Fixed CSS bug — duplicate `style` attribute merged into one.
- **Lines 240–241 (Portwood card):** Headline kept as "Portwood (The Creek) — Affordable Housing." Body rewritten: "$150 million in BC Housing funding / Largest single BC Housing investments to date" → "senior-government funding through BC Housing and CMHC" + project context (23-acre Edgar Development at 296 Angela Dr). Removed the "largest investment" overclaim. Changed the SkyTrain-specific overpass language to "pedestrian connection to transit" until Meghan confirms which station.

### `about.html`
- **Line 235 (intro):** "The longest-serving elected official in the city's history" → "One of the longest-serving elected officials in the city's history."
- **Line 244 (origin paragraph):** Typo fix — "Bert flinn Park" → "Bert Flinn Park."
- **Line 270 (council card):** "The longest-serving member in Port Moody history" → "One of the longest-serving members in Port Moody council history."

---

## NOT YET APPLIED — needs Meghan's confirmation

These remain pending. See `01_WEBSITE_AUDIT.md` Tier 3 for the full list. Quick highlights:

- Exact ground-breaking date for Portwood / The Creek
- Exact senior-government funding totals (BC Housing + CMHC) — currently using vague "senior-government funding" language
- Coronation Park: pedestrian overpass to Inlet Centre SkyTrain — does this exist as a confirmed commitment?
- Ratification of all dollar figures in the $99M+ Coronation Park breakdown
- Ratification of "284 jobs" / "$2.1M annual tax revenue" / "12,300 sq ft childcare"
- Ratification of "Three-and-a-half times required amenity package" — what's the source document?
- Confirm the 1994 Bert Flinn Park origin story
- Confirm "first female mayor in 109 years" framing
- Confirm Meghan wants to keep the "30 years" framing in meta descriptions (currently still "Thirty years of delivering for Port Moody")

---

## Re-deploy checklist (when ready)

1. [ ] Meghan reviews `01_WEBSITE_AUDIT.md` and confirms Tier 3 items
2. [ ] Sheri (with Meghan's confirmations) applies remaining edits
3. [ ] Final read-through of all five pages
4. [ ] Volunteer form tested on staging
5. [ ] Donate page tested on staging
6. [ ] Re-deploy
7. [ ] Meghan posts the FB community-group response (in `02_DRAFTS_FOR_REVIEW.md`)
