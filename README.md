# Agape Bible Church — Website (agapebangalore.org)

Static multi-page site. No build step, no dependencies. Total ~3 MB.

## Deploy to Vercel (same domain as current site)

1. `cd agape-website && npx vercel --prod` (or drag the folder into vercel.com/new)
2. Point the existing `agapebangalore.org` domain at the new project (Project → Settings → Domains).
3. Done. Folder routing means /sermons/, /ministry/, /pastor-biography/, /prayer/ all resolve directly — this fixes the 404-on-deep-link bug of the old SPA. `vercel.json` adds redirects from the old non-slash URLs plus long-cache headers for images.

## Preview locally

`cd agape-website && python3 -m http.server 8742` → http://localhost:8742/

## Structure

- `index.html` + `sermons/` `ministry/` `pastor-biography/` `prayer/` (folder = URL)
- `assets/css/main.css` — design system ("Cathedral": parchment/ink/gold, Fraunces + Inter)
- `assets/js/main.js` — nav, reveal animations, counters, sermon filters, prayer form (mailto/WhatsApp handoff, no backend), copy buttons
- `images/` — optimized WebP from the original repo + church YouTube channel
- `sitemap.xml`, `robots.txt`, `manifest.json`, `404.html`, icons

## Before go-live checklist

- [ ] **Verify bank details on /ministry/#give** — currently A/C 1234567890, IFSC ABCD0123456, UPI agapebible@upi (as confirmed; they pattern-match placeholders, so check once more).
- [ ] Confirm titles: site uses "Rev. Dr." for Jim Reuben Elliot in leadership copy and "Bishop Dr." on the June 2026 sermon credits (matching the church's own posters). Standardize if desired.
- [ ] Prayer requests go to jim@agapebangalore.org (email) / +91 99016 13901 (WhatsApp).

## Content notes

- All text preserved from the old site; new additions (Jim Reuben Elliot, 50 Years of Mission Life, June 2026 sermons) are sourced from the church's own YouTube channel and sermon posters.
- Two watermarked stock photos from the old repo (iStock/Dreamstime) were deliberately excluded.
- Sermon links point to the church's YouTube videos; podcast embed is the church's Spotify show.
