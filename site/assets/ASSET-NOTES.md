# THE FUEL — design asset pack

Curated from the client's own Instagram assets. Every file here is referenced by the design plan (image numbers in the plan, such as "image 45", match the `fNNN` in the file names).

## Brand facts (read from the client's own posts)

- Name: **THE FUEL**. Tagline: **Espresso Yourself!** Instagram: @thefuelespresso (write it as THE FUEL, not "Fuel Expresso")
- Address: The Fuel Espresso, Al-Ghani Plaza, 4th Floor, Sector-C, DHA Phase 6, Lahore
- Hours: 8 AM to 2 AM every day (the client's own post says "18 hours of pure espresso")
- Lines the brand already uses: "Flaky outside, soft inside." · "Baked fresh to fuel every moment." · "Made with love." · "Hidden coffee shop in DHA"
- NOT known yet, use placeholders: prices `[PRICE]`, phone/WhatsApp `[NUMBER]`, delivery and map links `[LINK]`, email `[EMAIL]`

## Folders

- `hero/` : the approved hero clip. `hero-loop-1280x720.mp4` / `.webm` is a 6.5 s seamless loop (muted, no audio), cut from seconds 2.5 to 10 of the Veo take with a 1 s crossfade so the end matches the start. Poster frame in `.webp` and `.jpg`. `source-still_f045...jpg` is the photo it was generated from.
- `brand/logo/` : the emblem traced to vector. `emblem-two-tone.svg` is the master (caramel fill, brown lines). `emblem-mono-currentColor.svg` takes any colour via CSS. The emblem has no wordmark: set "THE FUEL" in live type. Do not rely on the logo printed on the cup in the video, it blurs.
- `brand/palette.json` : raw Instagram swatches, derived neutrals and the six product-world palettes. `instagram-palette-original.txt` is the client's list.
- `worlds/01..06` : images per product world. The file starting with `HERO_` is the hero for that world.
- `space/` : interior and counter. `brand-moments/` : cups, people, bags, patterns.
- `reference-only-baked-text/` : posters with text printed into the picture. Use them for mood and composition only. Never place these in the UI, the text clashes with live type and cannot be edited or translated.

## Image list

### `brand-moments`

- `f036_pink-cup-stacks.jpg` (1279×1600, source 3274×4096). Stacks of pink cups in front of the espresso machine
- `f093_pink-cups-pattern.jpg` (1280×1600, source 1350×1688). Pink cups on cream in a grid, one with latte art. Good for patterns
- `f037_barista-pour.jpg` (1279×1600, source 3274×4096). Barista pouring milk into a pink cup
- `f014_iced-drink-paper-bag.jpg` (792×1402, source 792×1402). Hand with an iced drink and branded paper bag
- `f118_matchday-cup-reference.jpg` (1280×1600, source 1440×1800). Gradient cup with a stadium inside. Campaign mood only, do not copy

### `reference-only-baked-text`

- `f105_location-poster.jpg` (1280×1600, source 1440×1800). Location poster. Source of the address. Do NOT place in UI, text baked in
- `f016_18-hours-open-post.jpg` (1280×1600, source 1350×1688). "18 hours of pure espresso" hours post. Text baked in
- `f107_kraft-cup-poster.jpg` (1280×1600, source 1440×1800). Kraft cup poster. Text baked in
- `f108_made-with-love-poster.jpg` (1280×1600, source 1440×1800). "Made with love" poster. Text baked in
- `f109_flaky-outside-poster.jpg` (1280×1600, source 1440×1800). "Flaky outside, soft inside" poster. Text baked in
- `f003_hidden-coffee-shop-story.jpg` (610×1084, source 610×1084). Story with a baked-in caption. LOW-RES
- `f026_table-annotated-story.jpg` (816×1448, source 816×1448). Table spread with baked-in annotations

### `space`

- `f088_interior-lattes-window.jpg` (1279×1600, source 3274×4096). Interior with the FUEL wall sign, two lattes on a wooden tray
- `f055_interior-wall-sign.jpg` (1008×1344, source 1008×1344). Bright seating area with the FUEL wall letters
- `f001_interior-pink-swings.jpg` (640×1136, source 640×1136). Pink room with swing seats and window. LOW-RES 640x1136
- `f058_swing-seat-window.jpg` (640×1136, source 640×1136). Swing seat by the window at golden hour. LOW-RES, has a small baked-in caption
- `f006_neon-iced-latte.jpg` (901×1600, source 2306×4096). Pink interior with neon sign, iced drink in hand. LOW-RES-ish
- `f027_jenga-table.jpg` (540×960, source 540×960). Jenga on the table, menu folder, sunny window. LOW-RES 540x960
- `f080_counter-seating-wide.jpg` (640×1136, source 640×1136). Counter and seating, wide. LOW-RES
- `f094_counter-wide-landscape.jpg` (720×405, source 720×405). Counter and pastry display, landscape. LOW-RES 720x405
- `f029_counter-barista-sign.jpg` (900×1600, source 1170×2080). Counter with THE FUEL sign and barista

### `worlds/01-roast`

- `HERO_f040_cups-latte-art.jpg` (1279×1600, source 3274×4096). HERO for Roast. Stacked pink cups around a latte-art flat white
- `f067_latte-art-topdown.jpg` (1279×1600, source 3274×4096). Top-down latte on warm cream, dried grass props
- `f074_espresso-pull.jpg` (720×1280, source 720×1280). Espresso pouring into a glass, blurred warm bokeh
- `f072_bean-grinder.jpg` (900×1600, source 1206×2144). Beans in the grinder hopper, cool blue highlight (dark, moody)
- `f085_iced-latte-scale.jpg` (480×854, source 480×854). Layered iced latte on a scale. LOW-RES 480x854
- `f087_two-iced-lattes.jpg` (1279×1600, source 3274×4096). Two iced lattes held in cream knitwear

### `worlds/02-matcha`

- `HERO_f097_torn-paper-matcha.jpg` (1280×1600, source 1350×1688). HERO for Matcha. Iced matcha latte breaking through green paper
- `f068_tray-matcha-croissant.jpg` (1279×1600, source 3274×4096). Matcha latte and croissant on a tray, deep green backdrop
- `f071_hands-matcha-green-knit.jpg` (1279×1600, source 3274×4096). Matcha latte held in green knitwear
- `f056_stacked-matcha-cups.jpg` (1280×1600, source 1350×1688). Three matcha lattes stacked mid-air on caramel
- `f051_matcha-cup-dessert.jpg` (1122×1122, source 1122×1122). Matcha cup dessert on ribbed brown surface

### `worlds/03-bakery`

- `HERO_f033_croissant-terracotta-plate.jpg` (1279×1600, source 3274×4096). HERO for Bakery. Croissant on a terracotta plate, caramel backdrop
- `f028_pain-au-chocolat-stack.jpg` (1279×1600, source 3274×4096). Pain au chocolat stack on dark brown gradient (dark mood)
- `f047_croissant-paper-bag.jpg` (1280×1600, source 1350×1688). Branded pink bag with two croissants
- `f031_baker-tray.jpg` (1279×1600, source 3274×4096). Staff member in apron holding a tray of croissants
- `f013_flatlay-cups-croissants-beans.jpg` (1279×1600, source 3274×4096). Flat lay: white cups, croissants, scattered beans
- `f015_cup-croissant-beans-hand.jpg` (1279×1600, source 3274×4096). Hand touching a white cup, croissant and beans

### `worlds/04-shakes`

- `HERO_f092_shake-splash-storefront.jpg` (1280×1600, source 1350×1688). HERO for Shakes. Caramel shake splash in front of the real storefront sign
- `f086_caramel-blast-shake.jpg` (900×1600, source 1206×2144). Caramel Blast Shake at the counter. Has a baked-in "Go and Grab" sticker and label. LOW-RES
- `f099_almond-croissant-cookies-cream.jpg` (640×1136, source 640×1136). Poster-style shot. Baked-in text, mood and composition reference. LOW-RES

### `worlds/05-coolers`

- `HERO_f100_strawberry-chiller-hand.jpg` (1279×1600, source 3040×3804). HERO for Coolers. Strawberry chiller in hand on cream
- `f102_mango-cooler-dark.jpg` (1280×1600, source 1600×2000). Mango cooler, warm dark background
- `f077_cooler-car-window.jpg` (1279×1600, source 3040×3804). Woman with a red cooler leaning out of a car window (lifestyle)
- `f073_strawberry-chiller-story.jpg` (720×1280, source 720×1280). Strawberry chiller, small baked-in label. LOW-RES
- `f104_layered-cooler-counter.jpg` (640×1136, source 640×1136). Layered green and pink cooler on marble. LOW-RES

### `worlds/06-desserts`

- `HERO_f111_brownie-fork.jpg` (1280×1600, source 1440×1800). HERO for Desserts. Brownie stack on a fork with chocolate drip
- `f035_cheesecake-terracotta.jpg` (1279×1600, source 3274×4096). Cheesecake slice on terracotta plate
- `f070_tiramisu-four-forks.jpg` (1279×1600, source 3274×4096). Tiramisu shared with four forks, deep green table
- `f110_cookie-plate-poster.jpg` (1280×1600, source 1440×1800). Cookie plate with baked-in "Espresso Yourself" text. Reference

## Known limits (design around these)

- Images marked LOW-RES come from Instagram stories (about 640×1136). Use them small, in blur-up frames or behind overlays. Never full-bleed on desktop. Ask the client for the originals.
- There is no transparent cut-out of the cup. Variant B needs one, so design the cup stage with a placeholder and mark where the cut-out goes.
- Several campaign posts show UEFA League marks. They are excluded from this pack on purpose. Do not reproduce any third-party sports or brand marks.
- The video is photoreal but the tagline on the cup is blurred. Overlay the real emblem and wordmark in HTML.
- Not included on purpose: the competitor reference sites, their assets, and the Mossary reference video (copyrighted, style reference only).