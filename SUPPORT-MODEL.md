# Support the Camp — combined support + rewards model

A plan for merging the **Support** and **Merch** sections into a single "support the
camp" experience, processed through **Confluence Colorado's Stripe account**.

> **Core framing:** This is not a store. You are supporting the youth apprenticeship.
> At certain levels of support the camp sends a thank-you (sticker, poster, tee, hoody,
> a handwoven piece). You can also give any amount with no reward at all.

---

## 1. Why this shape

- **Confluence Colorado is the fiscal sponsor** (a 501(c)(3)). Gifts are made *to Confluence,
  restricted to the Kady Youth Sheep Camp fund*, so they are tax-deductible and the camp
  doesn't need its own nonprofit status or merchant account.
- Because a reward has fair-market value (FMV), the IRS "quid pro quo" rules apply: the
  **deductible portion = amount given − FMV of the reward**. The page and the receipt must
  state the FMV of each reward so donors know their deductible amount. This is the single
  biggest reason to frame it as *support with a thank-you*, not a sale.
- The site is a **static site on Vercel** — no backend, no database, no server we control.
  The payment flow must live in something hosted (Stripe), not in our own server.

## 2. Recommended approach — Stripe Payment Links (no backend)

Stripe **Payment Links** are hosted checkout URLs. They are created *inside Confluence's
Stripe account*, so all funds settle to Confluence and the camp never touches card data or
API keys. Our static site is just buttons that link out. This is the lowest-risk, lowest-
maintenance option and keeps the two orgs cleanly separated.

**One Payment Link per path:**

| Link | Type | Collects | Note shown |
|---|---|---|---|
| Give any amount | "Customer chooses price" | email | 100% tax-deductible |
| $5 · Sticker | Fixed $5 | email + **shipping address** | ~$2 FMV; ~$3 deductible |
| $10 · Poster | Fixed $10 | email + shipping | ~$5 FMV |
| $25 · Tee | Fixed $25, **size selector** | email + shipping | ~$12 FMV |
| $50 · Hoody | Fixed $50, size selector | email + shipping | ~$25 FMV |
| $100 · Bundle | Fixed $100 | email + shipping | ~$40 FMV |
| Handwoven piece | "Contact us" (not a link) | — | commissioned, inquire |

Configuration notes for whoever sets these up in Stripe:
- **Product/price** per tier; enable **"collect shipping address"** on reward links only.
- **Sizes** (tee/hoody): add a Price with adjustable quantity won't do sizes — instead use
  a product with a **custom field** (dropdown: S/M/L/XL) on the Payment Link.
- Turn on **Stripe tax receipts / custom receipt text** referencing Confluence's EIN and the
  FMV/deductible language.
- Set the statement descriptor to something like `CONFLUENCE CO / KADY CAMP`.
- Confluence can restrict/track these via a Stripe **"Kady Youth Sheep Camp"** product group
  or metadata (`fund: kady-youth-sheep-camp`) so reporting is clean.

## 3. What we build on the site

Replace the separate **Merch** page and the **Support the Camp** button target with one page:
`support.html` (nav label **"Support"**; keep `/merch` and `/support` both pointing here).

Page structure:
1. **Hero** (existing pattern) — headline that makes the framing explicit, e.g.
   *"Support the camp — every gift keeps the apprenticeship going."*
2. **Give any amount** — a prominent primary block → the flexible Payment Link. Copy: "Give
   directly to the camp through Confluence Colorado. 100% tax-deductible; no reward, all
   impact."
3. **Support with a thank-you** — the reward tiers (sticker → bundle), each card:
   product mockup, amount, what you get, **FMV / deductible line**, and a button → its
   Payment Link. This reuses the mockups already in `assets/merch/`.
4. **Handwoven piece** — "Inquire" → Contact page (commissioned, not checkout).
5. **Fine print** — one paragraph: fiscal sponsorship by Confluence Colorado, tax-deductible
   minus FMV, rewards shipped by the camp, allow N weeks, questions → contact.

No code touches Stripe keys. Each button is `<a href="https://buy.stripe.com/...">`.

## 4. Fulfillment & operations (Confluence + camp)

- **Orders / addresses:** reward Payment Links collect shipping addresses; these appear in
  Confluence's Stripe dashboard. Agree how the camp gets them — options: (a) camp gets
  read-only Stripe dashboard access filtered to the Kady product group, or (b) Stripe emails
  a receipt + a Zapier/Make automation drops orders into a shared Google Sheet the camp works
  from. (b) is cleanest if Confluence doesn't want to share dashboard access.
- **Receipts / acknowledgment:** Stripe sends the payment receipt automatically. Confluence
  issues the formal **tax-acknowledgment letter** (with FMV subtracted) per their normal
  donor process — confirm their threshold and cadence.
- **Inventory:** camp holds sticker/poster/tee/hoody stock; mark a tier "sold out" by pausing
  its Payment Link and hiding/greying its card.

## 5. Alternative if more control is needed later

If down the road you want on-site checkout (no redirect), matching branding, or upsells:
- **Stripe Checkout via a Vercel serverless function** — needs Confluence's Stripe *secret
  key* deployed to the camp's Vercel project, which mixes the two orgs' credentials and adds
  PCI/ops burden. Only worth it if the redirect UX becomes a real problem.
- **A donation platform Confluence already uses** (Givebutter, Donorbox, Classy) — if
  Confluence prefers their existing tooling, embed that instead of raw Stripe. Ask Confluence
  what they run today; matching it may be less work than net-new Payment Links.

**Recommendation:** ship Payment Links first (fast, safe, no backend). Revisit serverless
Checkout only if the redirect experience proves limiting.

## 6. Open questions for Confluence Colorado

1. Do you want us on **raw Stripe Payment Links**, or your existing donation platform?
2. Who creates/owns the Payment Links — and how should the camp receive **shipping addresses**?
3. Confirm the **FMV** to print for each reward (values above are placeholders).
4. Your preferred **receipt / tax-acknowledgment** language and EIN to display.
5. A **fund/metadata tag** so Kady gifts report separately inside your Stripe.

---

*Prepared as a build plan — no payment code has been written. Next step is a short call with
Confluence to answer §6, then we wire the buttons to their links.*
