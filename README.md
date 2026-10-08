# THE FUEL — Website

Marketing and ordering website for **THE FUEL**, a café on the 4th floor of Al-Ghani Plaza, DHA Phase 6, Lahore (open 8 AM to 2 AM).

A plain static site: **HTML + CSS + vanilla JavaScript**. No framework, no bundler, no build step.

| Page | URL | File |
| --- | --- | --- |
| Home, Variant B ("scroll theatre", default) | `/` | `site/index.html` |
| Home, Variant A ("cinematic") | `/home-a` | `site/home-a.html` |
| Menu (six product worlds, bag) | `/menu`, `/menu?world=matcha` | `site/menu.html` |
| Our Space and Visit | `/space`, `/space?page=visit` | `site/space.html` |

## Quick start

```bash
npx serve site
```

Open http://localhost:3000. Serve over HTTP rather than `file://`, because the pages load `js/lib/fuel-theme.js` as an ES module.

## Project structure

```
.
├── site/                    # Deploy root (everything served to visitors)
│   ├── index.html           # Home, Variant B
│   ├── home-a.html          # Home, Variant A
│   ├── menu.html
│   ├── space.html
│   ├── css/
│   │   └── styles.css       # Tokens, base styles, keyframes, hover/focus/active states
│   ├── js/
│   │   ├── lib/             # Shared helpers
│   │   │   ├── fuel-theme.js    # Theme tokens, product worlds, Lahore time, theme transition, hairline loader
│   │   │   ├── fuel-boot.js     # Applies the saved theme before first paint; arrival half of the route loader
│   │   │   └── fuel-cursor.js   # Ring + coffee-bean cursor (fine pointers only)
│   │   ├── parts/           # Shared page parts
│   │   │   ├── fuel-views.js    # Markup templates: nav, visit, footer
│   │   │   └── fuel-parts.js    # Their behaviour: nav, bag drawer, reservation dialog, toast, map
│   │   └── pages/           # One script per page
│   │       ├── home-b.js
│   │       ├── home-a.js
│   │       ├── menu.js
│   │       └── space.js
│   ├── assets/              # Images, video and logo SVGs used by the site
│   └── vercel.json          # Clean URLs and cache headers
├── prototype/               # Original design prototypes (reference only, not deployed)
└── docs/
    ├── context.html         # Design and brand reference: the source of truth
    └── HANDOFF.md           # Original design handoff notes
```

## How it works

- **Static first.** Every page ships its full markup, including the nav, Visit section and footer, so content renders without JavaScript.
- **Page scripts** (`js/pages/*.js`) load synchronously at the end of `<body>`, so they run before first paint. They find elements through `data-*` hooks (for example `data-on-click="reserve"` or `data-hero`) and update them directly.
- **Shared parts** (`js/parts/`) hold state in small classes. On a change they re-render their template and patch the live DOM in place, which keeps focus, input values and CSS transitions intact.
- **Motion and data preferences.** `prefers-reduced-motion` turns off the pinned scroll scenes, the intro and the parallax. Under Save-Data or reduced motion the hero video is never created; it sits in a `<template>` until it's needed.

### Browser state

| Key | Purpose |
| --- | --- |
| `localStorage['fuel-theme']` | `latte` or `espresso` |
| `localStorage['fuel-bag']` | `[{ name, world, qty }]` |
| `sessionStorage['fuel-intro']` / `['fuel-pour']` | The intro plays once per session |
| `sessionStorage['fuel-route']` | Tells the next page to finish the hairline loader |

Events: `fuel-add` (`{ detail: { add, world } }`) adds an item to the bag; `fuel-reserve` opens the reservation dialog.

## Deployment (Vercel)

Import the repository in Vercel with:

- **Root Directory:** `site`
- **Framework Preset:** Other
- **Build Command:** none
- **Output Directory:** `.`

Or deploy from the CLI:

```bash
cd site
npx vercel        # preview
npx vercel --prod # production
```

`site/vercel.json` turns on clean URLs (`/menu` serves `menu.html`) and caches `/assets/*` as immutable.

## Design

`docs/context.html` is the source of truth for tokens, type, motion and behaviour.

- **Latte (day):** bg `#FBF6EE`, surface `#F3E6D6`, ink `#270402`, accent `#814D35`
- **Espresso (night):** bg `#270402`, surface `#3A1A0F`, ink `#FBF6EE`, accent `#E29A64`
- **Type:** Bodoni Moda (display), Jost (UI and body), DM Mono (labels). Icons: Phosphor 2.1.1
- **Motion:** easing `cubic-bezier(.16,1,.3,1)`. Radii: pill 999px, card 18px, arch `999px 999px 18px 18px`

## Open items

- `[PRICE]`, `[NUMBER]`, `[LINK]` and `[EMAIL]` are placeholders waiting for real values.
- Order and reservation submission is not connected yet (WhatsApp or a booking service).
- Choose between Variant A and Variant B, then remove the review-only `.fuel-variant` switch (in `index.html`, `home-a.html` and `css/styles.css`).
- The prototype's clock numerals and AM/PM label do not render. The static site matches the prototype, but `docs/context.html` specifies visible numerals.

---

Developed by [PrismoVector](https://www.prismovector.com).
