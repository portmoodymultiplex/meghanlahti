# Website Audit — Meghan Lahti for Mayor 2026

**Prepared:** April 30, 2026 (Thursday)
**Pages reviewed:** index.html, about.html, platform.html, the-record.html (full); volunteer/contact/donate/rsvp/preview-access (footer only)
**Status:** Site is currently down. Fixes can be applied before re-deploy.

---

## How to read this

Three tiers:

- **TIER 1 — MUST FIX before re-launch.** These are confirmed factual errors, including the one circulating on Facebook. Fixing these is non-negotiable.
- **TIER 2 — SHOULD FIX.** Internal inconsistencies (the site contradicts itself) and likely overclaims that a critical reader could call out next.
- **TIER 3 — NEEDS MEGHAN TO CONFIRM.** Specific numbers and award wording that I couldn't verify from public sources. Don't re-launch with these unconfirmed.

---

## TIER 1 — MUST FIX (confirmed errors)

### 1. Rocky Point Park westward expansion is NOT funded
**This is the FB error.** Sites currently say it is "funded and planned" / "Active planning and funding underway." Per Meghan's own clarification, the western expansion is being discussed in the OCP (Official Community Plan) only — it is NOT funded.

- `index.html` line 325: *"Rocky Point Park westward expansion — funded and planned"* → **REPLACE WITH:** *"Rocky Point Park westward expansion — in the Official Community Plan, with an acquisition fund growing through community amenity contributions"*
- `platform.html` line 329 (Pillar 02 commits): *"Active planning and funding underway. The acquisition fund is growing from development contributions."* → **REPLACE WITH:** *"In the Official Community Plan. The acquisition fund is growing from community amenity contributions secured in major development approvals."*

### 2. "Thirty years on council" is incorrect
Meghan was first elected in **1996**, not 1994. She entered the political fight in 1994 over Bert Flinn Park (per her own story), but her council tenure starts 1996, with at least one gap before becoming mayor in 2022. Tri-Cities Dispatch refers to her as "one of the longest serving" — not the longest. Public sources put her council service at ~19 years before 2022.

- `platform.html` line 322: *"nearly thirty years on council"* → **REPLACE WITH:** *"more than two decades on council"* (or get specific numbers from Meghan)
- `index.html` line 368: *"Meghan's 30-year record proves she shapes it"* → **REPLACE WITH:** *"Meghan's record proves she shapes it"* (or "30 years of community leadership" if including 1994 advocacy)
- Meta description on every page: *"Thirty years of delivering for Port Moody"* → **REPLACE WITH:** *"Three decades of fighting for Port Moody"* (this works because it covers community + council combined)
- `about.html` line 235 + `index.html`: *"The longest-serving elected official in the city's history"* → **REMOVE** unless Meghan can confirm. Defensible alternative: *"One of the longest-serving elected officials in the city's history."*

### 3. Coronation Park / Portwood are conflated
The site treats these as the same project. They are NOT.

- **Portwood** = the 23-acre Edgar Development at 296 Angela Dr. Within it, "The Creek" project = 328 below-market rentals, completing late 2026.
- **Coronation Park** = a separate Wesgroup Properties multi-tower development.

The 328 affordable units belong to Portwood / The Creek. Coronation Park has its own (different) numbers — 342 rentals in phase 1, 85 affordable per CMHC criteria.

- `the-record.html` line 240: Headline *"Portwood — Affordable Housing"* with body referencing "December 2024 ground-breaking" and "$150 million in BC Housing funding" — see #4 below for funding.
- `platform.html` line 289: *"328 non-market rental apartments are now under construction at Coronation Park"* → **REPLACE WITH:** *"328 non-market rental apartments are now under construction at Portwood (The Creek), the 23-acre Edgar Development."*
- `platform.html` line 299 ("Already Delivered" card #1): same fix — change "at Coronation Park" to "at Portwood."

### 4. BC Housing funding figure is wrong on multiple pages
The site claims $140M (platform.html) and $150M (the-record.html) in BC Housing funding for the 328 affordable units. Public sources confirm BC Housing's contribution is **$10.6M Deepening Affordability + $2.3M Innovation = $12.9M**, plus federal CMHC $19.9M + $16.4M forgivable loan ≈ **$49M total package** across BC Housing + CMHC. Neither $140M nor $150M is supportable.

- `platform.html` line 289: *"backed by $140 million in BC Housing funding"* → **REPLACE WITH:** *"backed by senior-government funding from BC Housing and CMHC"* (until Meghan confirms exact figure)
- `platform.html` line 299: *"$140M BC Housing funding secured"* → **REPLACE WITH:** *"Senior-government funding secured from BC Housing and CMHC"* (and update the proof number to remove $140M)
- `the-record.html` line 241: *"$150 million in BC Housing funding"* → **REPLACE WITH:** *"approximately $49 million in combined BC Housing and CMHC funding"* (subject to Meghan's confirmation of exact total)
- `the-record.html` line 241: *"Largest single BC Housing investments to date"* → **REMOVE** (almost certainly an overclaim and easy to disprove)

### 5. Internal contradiction: ground-breaking date
`platform.html` says ground broke **December 2025**. `the-record.html` says **December 2024**. The actual ground-breaking for Portwood/The Creek per BC Housing news release was **August 2024**. Confirm with Meghan and standardize.

- `platform.html` line 299: *"Ground broke December 2025"* → likely **2024** (confirm with Meghan)
- `the-record.html` line 241: *"December 2024 ground-breaking"* — confirm

### 6. Internal contradiction: which SkyTrain station the overpass goes to
- `the-record.html` line 241 says Coronation Park has *"a pedestrian overpass to Inlet Centre SkyTrain"*
- The PCI Moody Centre development has *"a pedestrian overpass to Rocky Point Park"* (this one is confirmed by news coverage)

These are two different overpasses on two different projects. Make sure each is described correctly. The Inlet Centre overpass claim for Coronation Park needs Meghan to verify.

---

## TIER 2 — SHOULD FIX

### 7. Typo: "Bert flinn Park"
`about.html` line 244: lowercase "f" in "flinn." Should be "Bert Flinn Park."

### 8. Commercial space — 56,000 vs ~55,000 sq ft
News coverage says the PCI Moody Centre development includes 40,000 sq ft grocery + 15,000 sq ft retail = 55,000 sq ft. Site says 56,000 sq ft repeatedly. Close enough that it's defensible, but worth checking the development agreement to use the exact number.

### 9. Footer Platform column — Governance link missing on the-record.html
`the-record.html` line 291: footer Platform list is missing the *Governance* link that other pages include. Add for consistency.

### 10. CSS bug: duplicate `style` attribute
`the-record.html` line 223: `<span class="t-label" style="display:block..." style="color:var(--rose);">` — two `style` attributes on one tag. Browsers will only honour one. Merge them.

### 11. Vague proof of "Three-and-a-half times the required amenity package"
`platform.html` and `the-record.html` cite an "independent review" finding the Coronation Park project delivered 3.5× the required amenity package. If this is a real finding from a specific report, **cite it by name and date** (e.g., "*per the [Report Name], [Date]*"). Uncited it sounds like marketing.

### 12. Footer "fundamentally" lines on every page
The "*She entered politics in 1994 to save a park*" footer line appears on every single page (donate.html, rsvp.html, contact.html, volunteer.html). If Meghan confirms 1994 is the right year for the *origin* of her political involvement (even if she didn't formally run/win until 1996), this is fine. If not, change globally.

---

## TIER 3 — NEEDS MEGHAN TO CONFIRM

Send these to Meghan as a fact-check checklist before re-launch:

1. **1994 origin story.** Did your political involvement start in 1994 over Bert Flinn Park? (Public record only confirms 1996 as first elected.)
2. **Council tenure.** Total years on Port Moody council before becoming Mayor in 2022? Were there gaps?
3. **"Longest-serving elected official in city history"** — is this confirmable? Or should it be "one of the longest-serving"?
4. **Metro Vancouver Director years.** Site says 16 years, 2002–2018. Confirm.
5. **Finance Committee Chair — 15 consecutive years.** Confirm exact years.
6. **Portwood / The Creek funding total.** Exact dollar figures and which agencies (BC Housing vs CMHC) — for both the senior-government grant amounts and any total package number you want to use publicly.
7. **Coronation Park dollar breakdown** ($8.1M CACs, $43.2M infrastructure, $17.9M park/overpass/civic, $25.8M DCCs, $4.8M public art = $99.8M). What's the source document? Is this from the staff report?
8. **"Three-and-a-half times the required amenity package"** — citation for this independent review.
9. **PCI commercial space** — 56,000 sq ft or 55,000 sq ft (exact figure from the rezoning bylaw)?
10. **Ground-breaking date for Portwood / The Creek** — is it August 2024 (BC Housing release), December 2024, or December 2025?
11. **Coronation Park: pedestrian overpass to Inlet Centre SkyTrain** — confirm this is a real commitment in the development agreement.
12. **First female mayor in 109 years** — Port Moody incorporated 1913, so 109 to 2022 is correct math, but confirm she's actually the first female mayor in the city's full history.
13. **Clements Award wording.** Public sources call it the "*national environmental Clements Award, in the category of Most Outstanding Canadian Politician*." Site sometimes drops the "environmental" framing. Standardize.
14. **International Livable Communities Award — "Planning for the Future."** Confirm year, category, and that this was a Port Moody recognition (not a personal one to Meghan).
15. **"284 jobs" and "$2.1M annual property tax revenue"** — sources for these numbers (likely from the PCI staff report — confirm).
16. **Beedie Spring Street $6.6M off-site servicing** — confirm.
17. **Mayor's Town Halls — "5"** and **Youth Summits — "2"** — exact counts.
18. **"0.42 jobs per resident target / Port Moody currently 0.25"** — source.

---

## Recommended sequence

1. Send this audit to Meghan with the Tier 3 questions highlighted. Ask for answers on those before re-launching.
2. While waiting, apply the Tier 1 (confirmed) fixes I have ready to go.
3. Apply Tier 2 fixes.
4. Apply Tier 3 fixes once Meghan confirms.
5. One final read-through together before re-deploy.
