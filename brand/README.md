# Brand marks

A small logo system derived from the client's UFO-goat illustration, giving them
a more "traditional" mark alongside the playful hero art.

| File | Use |
|------|-----|
| `mark-badge.svg` | Circular seal on **dark** backgrounds (stamps, footer, merch, watermark). |
| `mark-badge-light.svg` | Same seal for **light/cream** backgrounds. |
| `mark-horizontal.svg` | Icon + stacked wordmark — site headers, nav, email signatures, letterhead. |
| `goat-icon.svg` | Goat-head glyph alone — favicons, avatars, spot use, bullet/section marker. |
| `../assets/favicon.svg` | Goat head on a rounded night tile. |

The client's original `logo-primary.png` stays the **primary/hero** mark; these
are the secondary, scalable system for everywhere the full illustration is too
busy or too small.

## Design tokens

Colors (sampled from the logo):

| Token | Hex | Role |
|-------|-----|------|
| night | `#122634` | Base / sky |
| night-deep | `#0C1922` | Depth, footer |
| teal | `#0D475C` | UFO glow accent |
| bone | `#EDE3CC` | Primary text on dark |
| wheat | `#DEC394` | Warm secondary / labels |
| rust | `#BC5A32` | Primary action / accent |

Type: **Alfa Slab One** (display), **Work Sans** (body), **Space Mono** (labels,
coordinates, meta).

## Production note (important)

The SVG marks **reference the fonts by name** (Alfa Slab One, Space Mono) rather
than embedding them. They render correctly in browsers where those web fonts load,
but for portable logo files (print, third-party use, anywhere the font isn't
installed) **convert the text to outlines** before final delivery, e.g.:

```bash
inkscape mark-horizontal.svg --export-text-to-path \
  --export-plain-svg -o mark-horizontal-outlined.svg
```

These marks are original vector work inspired by the client's brand — not a
tracing of the original illustration.
