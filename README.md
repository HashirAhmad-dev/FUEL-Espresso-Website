# Handoff: THE FUEL website (Home A/B, Menu, Space & Visit)

## Overview
Marketing and ordering website for THE FUEL, a café on the 4th floor of Al-Ghani Plaza, DHA Phase 6, Lahore (open 8 AM to 2 AM). It has two home-page variants, a six-world menu with a bag, a space/visit page, and a reservation flow with date, time and seats.

**Open `context.html` first.** It is the full design and brand reference: brand facts, voice, colour tokens, product-world palettes, type scale, shapes, the motion spec, page breakdowns, component behaviour, build notes and open items.

## About the design files
The files in `prototype/` are **design references built in HTML**. They show the intended look and behaviour, but they are not production code to copy. Recreate them in the target stack. If none exists, Next.js or Astro with React is recommended, with CSS variables for tokens. Use the logic classes inside each `.dc.html` as behaviour specs.

To view them, serve the folder over HTTP: `npx serve prototype`, then open `Fuel Home B.dc.html`. Don't open them as `file://`.

## Fidelity
**High-fidelity.** Colours, typography, spacing, radii, copy and interactions are final, apart from the placeholders `[PRICE]`, `[NUMBER]`, `[LINK]` and `[EMAIL]`. Match them pixel for pixel.

## Files
- `context.html`: the design and brand bible. It is the source of truth for tokens and behaviour.
- `prototype/Fuel Home A.dc.html`: home, Variant A ("cinematic").
- `prototype/Fuel Home B.dc.html`: home, Variant B ("scroll theatre", pinned scroll-driven scenes).
- `prototype/Fuel Products.dc.html`: the menu, with six product worlds and a fixed pill bar; supports `?world=`.
- `prototype/Fuel Space and Visit.dc.html`: Our Space; `?page=visit` jumps to Visit.
- `prototype/Fuel Nav.dc.html`: nav, bag drawer, reservation dialog and toast (shared by all pages).
- `prototype/Fuel Visit.dc.html`: shared Visit section with the map facade.
- `prototype/Fuel Footer.dc.html`: shared footer.
- `prototype/fuel-theme.js`: tokens, `WORLDS` data, Lahore time helpers, theme transition and hairline loader.
- `prototype/fuel-boot.js`: theme applied before paint, view-transition CSS, the arrival half of the route loader.
- `prototype/fuel-cursor.js`: circle ring and coffee-bean cursor (fine pointer only).
- `prototype/support.js`: the prototype runtime. **Not needed in production.**
- `prototype/assets/`: every image, video and logo the pages use, plus `ASSET-NOTES.md` (provenance, resolutions, LOW-RES warnings), `brand/palette.json` and the master `emblem-two-tone.svg`.

## Key tokens (full list in context.html)
- Latte theme: bg `#FBF6EE`, surface `#F3E6D6`, ink `#270402`, ink2 `#592D14`, accent `#814D35`, caramel `#E29A64`.
- Espresso theme: bg `#270402`, surface `#3A1A0F`, ink `#FBF6EE`, ink2 `#E3CBB3`, accent `#E29A64`.
- Fonts: Bodoni Moda (display), Jost (UI and body), DM Mono (labels). Icons: Phosphor 2.1.1.
- Easing `cubic-bezier(.16,1,.3,1)`. Radii: pill 999px, card 18px, arch `999px 999px 18px 18px`.

## State
- `localStorage['fuel-theme']`: `latte` or `espresso`.
- `localStorage['fuel-bag']`: `[{name, world, qty}]`.
- `sessionStorage['fuel-intro']` / `['fuel-pour']`: the intro plays once per session.
- `sessionStorage['fuel-route']`: tells the next page to finish the hairline loader.
- Events: `fuel-add` `{detail:{add, world}}`, `fuel-reserve`.

## Still to do
These are the things the prototypes leave open:
- Order and reservation submission (connect to WhatsApp or a booking service).
- Real contact details and prices.
- Client approval of the site copy.
- A transparent cup cut-out.
- Choosing between Variant A and Variant B.
