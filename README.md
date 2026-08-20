# Kirtipur — a 3D cultural site

React + Vite + React Three Fiber + GSAP ScrollTrigger. Single-page scroll
experience: Hero → Intro → History timeline → three temple 3D sections
(Bagh Bhairab, Uma Maheshwor, Chilancho) → Explore Kirtipur → Footer.

This was built without internet access in the build environment, so it
has **not** been run with `npm install` / `npm run dev` — read it over
before you rely on it, and the first `npm run dev` will surface anything
that needs a small fix.

## 1. Compressing the models (do this first)

Your three GLBs are 41–90MB — too large to ship as-is. Compress them with
[`gltf-transform`](https://gltf-transform.dev/):

```bash
npm install --global @gltf-transform/cli

gltf-transform optimize bagh_bhairab.glb public/models/bagh-bhairab/model.glb \
  --texture-compress webp --texture-size 2048

gltf-transform optimize chilancho.glb public/models/chilancho/model.glb \
  --texture-compress webp --texture-size 2048

gltf-transform optimize uma_maheshowar.glb public/models/uma-maheshwor/model.glb \
  --texture-compress webp --texture-size 2048
```

`optimize` runs Draco geometry compression, prunes unused nodes/materials,
and resizes textures in one pass. Check the resulting file sizes — if
they're still over ~10MB, drop `--texture-size` to `1024` or check for
duplicate/unused UV sets in the source scene. The code loads these via
`@react-three/drei`'s `useGLTF`, which already speaks Draco (it pulls the
decoder from Google's CDN at runtime, so no extra setup needed there).

## 2. Install & run

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## 3. What's built vs. what's left

The original brief described a much larger site (routing, gallery, culture
cards, timeline animation, an interactive model-switcher, Tau Daha and
Kirti Bihar sections, reduced-motion pass, full a11y sweep, etc.). We
scoped this pass to a **complete, working core** rather than a half-built
version of everything:

**Done:** loading screen, responsive navbar, hero with parallax silhouette
background, intro strip, horizontal-on-desktop/vertical-on-mobile history
timeline, three fully interactive 3D temple sections (each with a
different scroll-entrance choreography), an Explore Kirtipur card grid,
final CTA, footer, base `prefers-reduced-motion` handling, lazy-mounted
3D canvases (each model only fetches once its section nears the viewport).

**Not built yet — natural next steps:**
- Separate `/history`, `/heritage`, `/places`, `/gallery`, `/about` routes
  (currently one scrolling page with anchor links; `react-router-dom`
  wasn't added since nothing needs it yet)
- Tau Daha and Nagar Mandap Shri Kirti Bihar sections
- A gallery (needs real photography — see below)
- The "Meet Kirtipur in 3D" model-switcher widget
- A real loading screen gated on asset progress rather than a fixed timer
- Cross-browser/device QA — impossible to do from this sandbox

## 4. Known gaps you should know about

- **No real photography.** `PlaceCard` renders a styled gradient
  placeholder, not a photo — I didn't have any Kirtipur images to use, and
  didn't want to hotlink stock photos into a codebase you're going to
  own. Drop images into `src/assets/images/` and swap the placeholder
  `<div>` in `PlaceCard.jsx` for an `<img>`.
- **The "baker-and-the-bridge" model wasn't used.** It's the Mostar
  reference project's stone-bridge-over-a-river asset — geographically
  and culturally specific to Bosnia, not Kirtipur. Using it here would
  visually claim Kirtipur has a bridge it doesn't. The hero background
  is a procedural silhouette scene instead.
- **Historical copy is deliberately hedged.** Sources disagree on
  Kirtipur's founding date and some temple dates (11th vs. 16th century
  shows up depending on the source); the timeline and section text use
  general wording rather than picking one number to state as fact.
- **Untested.** Everything here was written by inspecting the reference
  project's working patterns (Suspense + `useGLTF` + `<Stage>` +
  `OrbitControls`, which is proven in `mostar-site`) and following
  well-documented GSAP ScrollTrigger recipes, but nothing was run in a
  browser. Expect to fix a handful of small issues on first `npm run dev`.

## 5. File map

```
src/
  components/   Navbar, LoadingScreen, Reveal (scroll-in animation
                wrapper), TempleCanvas (shared R3F model viewer),
                PlaceCard, Footer
  sections/     HeroSection, IntroSection, HistorySection,
                BaghBhairabSection, UmaMaheshworSection, ChilanchoSection,
                ExploreSection
  data/         timeline.js, places.js
  styles/       global.css
public/models/  drop compressed model.glb files here (see §1)
```
