# Kady Youth Sheep Camp — kadysheepcamp.org

Temporary "coming soon" landing page for the Kady Youth Sheep Camp Apprenticeship
(Teec Nos Pos, Navajo Nation). Static site, no build step.

## Structure

```
index.html            Landing page (self-contained: CSS + JS inline)
vercel.json           Static hosting config + security headers
assets/
  logo-primary.png    Client's UFO-goat mark (hero)
  photo-camp.jpg      Camp photo (mission band)
  og-image.png        1200×630 social-share image
  favicon.svg         Goat-head favicon
brand/
  mark-badge.svg          Circular seal (for dark backgrounds)
  mark-badge-light.svg    Circular seal (for light backgrounds)
  mark-horizontal.svg     Icon + stacked wordmark (headers/nav)
  goat-icon.svg           Goat-head glyph only
  README.md               Mark usage, tokens, production notes
```

## Local preview

No tooling required — it's a static file:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (Vercel)

1. Push this repo (already at github.com/bwright77/kadysheepcamp).
2. In Vercel: **Add New → Project → import bwright77/kadysheepcamp**.
   Framework preset: **Other**. No build command, output dir = root.
3. **Domains → add `kadysheepcamp.org`** (and `www.kadysheepcamp.org`).
   Point DNS as Vercel instructs (apex A record `76.76.21.21` or Vercel
   nameservers; `www` as CNAME to `cname.vercel-dns.com`). SSL is automatic.

Every push to the default branch redeploys.

## Before the full site replaces this

- [ ] Get **client sign-off on all copy** — the mission text is adapted from
      Roy Kady's own GoFundMe wording; confirm it's how they want it stated,
      and check any Diné Bizaad spelling with the community (not machine).
- [ ] Replace `assets/logo-primary.png` with a **higher-res original**
      (current file is 480×480 — fine on screen, too small for print/retina).
- [ ] Confirm the two links (Facebook profile, GoFundMe) are the ones they
      want public, and add any others (Instagram, email, mailing list).
- [ ] Decide whether the UFO mark or the badge mark leads the permanent brand.
