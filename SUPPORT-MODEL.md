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
  state the FMV so donors know their deductible amount. This is the single biggest reason to
  frame it as *support with a thank-you*, not a sale.
- The site is a **static site on Vercel** — no backend we control. The payment flow lives in
  Stripe (hosted), not in our own server.

## 2. Reward economics — the 5-step model

### Step 1 — Set the Fair Market Value (FMV)
Research local/retail prices for each item: what it would cost if sold directly in an online
store. That number is the FMV, and it's what gets subtracted from a gift to find the
deductible portion.

| Item | FMV (draft) |
|---|---|
| Sticker | $2 |
| Poster | $10 |
| T-shirt | $25 |
| Hoodie | $50 |
| Bundle | $75 |

### Step 2 — Set the donation multipliers
Price each donation level at **3×–4× the item's retail value**, and keep **fulfillment cost
under 20% of the incoming donation**. This is what makes it *support with a thank-you* rather
than a thinly-disguised sale.

| Tier | Donation | Reward | FMV | ≈ multiplier |
|---|---|---|---|---|
| Give any amount | any | — (no reward) | $0 | — |
| Sticker | **$15** | Ram-mark sticker | $2 | 7.5× (token gift) |
| Poster | **$35** | Creation poster | $10 | 3.5× |
| T-shirt | **$75** | Ram-mark tee | $25 | 3× |
| Hoodie | **$150** | Ram-mark hoody | $50 | 3× |
| Bundle | **$250** | The full kit | $75 | 3.3× |
| Handwoven piece | inquire | commissioned weaving | — | direct |

### Step 3 — Write the legal receipt copy
The automated donor-receipt email states the deductible math explicitly:
*deduction = total donation − FMV of the gift.*

> **Example:** "Thank you for your **$150** gift. Because you received a hoodie (FMV **$50**),
> your tax-deductible contribution is **$100**."

Stripe receipts support custom text; Confluence's EIN and this formula go in the footer.

### Step 4 — Tag the "token gifts"
Separate the **low-value tier (sticker)** from the **apparel tiers**. Inexpensive items that
carry the org's logo fall under the **IRS "insubstantial benefit" / low-cost-article safe
harbors**, so a donor at the sticker tier can claim a **100% deduction with no FMV math**.
(The exact cost/donation thresholds are indexed annually — Confluence's accountant confirms
the current numbers, but a $2 logo sticker at a $15 gift is comfortably inside them.)

- **Sticker tier → receipt says "100% tax-deductible."**
- **Poster and up → receipt shows the donation − FMV math from Step 3.**

### Step 5 — Build the automated shipping pipeline
Connect a **print-on-demand supplier** (e.g. Printful / Printify) to the checkout so rewards
are produced and shipped automatically — no packing boxes by hand, and no inventory to hold.
Add an **"I'd rather not receive the reward" opt-out checkbox** to the donation form:
opting out means 100% deductible *and* nothing to fulfill.

> Integration note: Stripe Payment Links don't call a POD service on their own. Wire it with
> a **Stripe webhook → automation (Zapier/Make) → Printful order**, or use a fundraising/
> checkout platform that has POD built in. Confluence's tooling choice (§7) decides which.

## 3. Recommended payment path — Stripe Payment Links (no backend)

Stripe **Payment Links** are hosted checkout URLs created *inside Confluence's Stripe account*,
so all funds settle to Confluence and the camp never touches card data or API keys. Our static
site is just buttons that link out — lowest-risk, lowest-maintenance, keeps the two orgs
cleanly separated.

**One Payment Link per path** (tiers from §2):

- **Give any amount** — "customer chooses price"; collects email; receipt says 100% deductible.
- **$15 Sticker** — fixed; collects email + shipping (unless opted out); 100% deductible.
- **$35 / $75 / $150 / $250** — fixed; collect email + shipping; apparel links add a **size**
  custom field (S/M/L/XL); receipts show the FMV math.
- **Handwoven piece** — "contact us", not a checkout link.

Config notes: enable shipping-address + the opt-out on reward links, set custom receipt text
per Step 3, statement descriptor `CONFLUENCE CO / KADY CAMP`, and a metadata tag
`fund: kady-youth-sheep-camp` for clean reporting.

## 4. What's on the site

The single support page is **built and live behind the coming-soon gate at `/support`**
(`support.html`; the "Support the Camp" CTA everywhere points to it). It has:

1. **Hero** — "Keep the apprenticeship going", framing it as support, not a store.
2. **Give any amount** — a prominent "Donate directly" block (100% tax-deductible).
3. **Support with a thank-you** — the §2 reward tiers, each card: product mockup, donation
   amount, what you get, and the **FMV / deductible line**. Mockups live in `assets/merch/`.
4. **Handwoven piece** — "Inquire" → Contact page.

**What's still interim / to wire up:**
- Every "Support for $X" button and the "Donate directly" block currently point to the **same
  Confluence donation page** — it can't yet capture which tier/reward or a shipping address.
  Those get swapped for the per-tier **Stripe Payment Links** (§3) once §7 is settled.
- The FMV / deductible figures on the cards are the **§2 draft values** — confirm with
  Confluence's accountant.
- Still to add when we wire Stripe: the **opt-out checkbox** and the print-on-demand hookup (§5),
  and the fine-print paragraph (fiscal sponsorship, deduction = donation − FMV, shipping).

## 5. Fulfillment & operations (Confluence + camp)

- **Rewards:** print-on-demand (Step 5) — orders flow from checkout to the supplier
  automatically; no inventory. Opt-out means nothing to ship.
- **Receipts:** Stripe sends the payment receipt with the Step 3 deductible language;
  Confluence issues any formal year-end acknowledgment per their donor process.
- **Reporting:** the `fund` metadata tag lets Confluence report Kady gifts separately.

## 6. Alternative if more control is needed later

- **Stripe Checkout via a Vercel serverless function** — on-site checkout, but needs
  Confluence's Stripe secret key on the camp's Vercel (mixes orgs' credentials + PCI/ops
  burden). Only if the redirect UX becomes a real problem.
- **A donation platform Confluence already uses** (Givebutter, Donorbox, Classy) — several
  bundle POD + receipts + opt-out logic already. If Confluence runs one, matching it may be
  less work than net-new Payment Links + Zapier.

**Recommendation:** ship Payment Links + POD automation first. Revisit serverless Checkout
only if needed.

## 7. Open questions for Confluence Colorado

1. **Raw Stripe Payment Links**, or an existing donation platform (which may already do POD +
   receipts + opt-out)?
2. Who creates/owns the Payment Links, and which **print-on-demand** supplier do we connect?
3. Confirm the **FMVs** in §2 (drafts) and the current **token-gift safe-harbor thresholds**
   with your accountant.
4. Preferred **receipt / acknowledgment** language and **EIN** to display.
5. A **fund/metadata tag** so Kady gifts report separately inside your Stripe.

---

*Prepared as a build plan — no payment code has been written. Next step is a short call with
Confluence to answer §7, then we wire the buttons to their links.*
