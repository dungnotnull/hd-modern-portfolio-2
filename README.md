# Hoang Dung — RoomFolio

> An interactive 3D room portfolio built with Three.js, GSAP, and Vite. Orbit a stylized room, toggle weather and time of day, and open in-scene modal panels showcasing selected work, opensource contributions, and an about-me page.

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.172-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![sass](https://img.shields.io/badge/Sass-1.83-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![simple-icons](https://img.shields.io/badge/simple--icons-16.23-444444)](https://simpleicons.org/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

**Live site:** <https://dungnotnull.dev/>

![Page screenshot](public/media/og-image.webp?raw=true "Page screenshot")

---

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Asset Pipeline](#asset-pipeline)
- [Performance Notes](#performance-notes)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)
- [License](#license)

---

## Overview

**Sooah's Room Folio** is the personal portfolio of **Hoang Dung** (`dungnotnull`) — M.Sc. in Interactive Digital Media, AI Agent Engineer, and Full-stack Developer working across GenAI, Harness/Chaos Engineering, Computer Vision, and applied mathematics.

Instead of a flat CV website, the portfolio renders as a hand-modeled 3D room. Visitors orbit around the room, click on in-world hotspots (laptop, artworks, books) to open modal panels showcasing selected client work, opensource contributions, and an about-me page. The scene reacts to the user with:

- Four full-screen shader-driven weather systems (clear / snow / rain / leaves)
- Day and night lighting themes with matching room textures
- Looping background music with mute and fade controls
- Continuously animated creatures (fish, chair, fans, clock hands, butterflies, fireflies)
- A live video texture running on the in-scene monitor

The site is single-page, dependency-light at runtime, and ships as static assets after `vite build`.

> This project is a fork and extensive rebuild of [Sooah's award-winning Room Folio](https://github.com/sooahplus/sooahs-room-folio). The 3D scene, modal system, and shader-driven weather are retained from the original; everything else — content, theme, brand icons, performance pass, asset cleanup — has been reworked for this author's portfolio.

---

## Highlights

- **Hand-built 3D scene** — A custom-modeled `Room_Portfolio.glb` (Draco-compressed) with hand-placed hotspots, ambient lights, and post-positioned props.
- **Four GPU weather systems** — Smoke, snow, rain, and leaves each use their own GLSL vertex + fragment shader running on `THREE.Points` geometry. Switchable at runtime.
- **Day / Night themes** — Toggle remaps shader uniforms, room textures, and creature behavior. CSS theme variables drive the modal UI in parallel.
- **In-scene modals** — The Work, About, and Contact panels are HTML overlays positioned to feel diegetic, animated with GSAP.
- **Brand-accurate icons** — Tech stack and AI agent sections render official logos with brand colors via `simple-icons`, plus a small `customBrandMap` for brands the package no longer ships (OpenAI, AWS, GLM).
- **Lazy-loaded media** — All modal imagery uses `loading="lazy"` and `decoding="async"` so initial page paint is not blocked.
- **Accessibility-aware** — ARIA labels on injected SVGs, semantic headings, alt text on every image, and a `prefers-reduced-motion`-respectful UI shell.
- **SEO + social** — Open Graph, Twitter Card, JSON-LD `Person` schema, sitemap, robots, and a canonical URL.

---

## Tech Stack

| Layer         | Library / Tool            | Purpose                                                  |
| ------------- | ------------------------- | -------------------------------------------------------- |
| Bundler / dev | Vite 6                    | Dev server, build, HMR                                   |
| 3D rendering  | Three.js 0.172            | Scene graph, loaders, materials, raycaster               |
| Animation     | GSAP 3.12                 | Modal transitions, hover states, button micro-interactions |
| Audio         | Howler 2.2                | Background music with fade in/out                        |
| Icons         | simple-icons 16           | Brand-accurate SVG logos with official hex colors        |
| Styling       | Sass 1.83                 | Theme variables, mixins, `include-media` breakpoints     |
| Shaders       | vite-plugin-glsl 1.3      | Import `.glsl` files as strings                          |
| Compression   | Draco (three/addons)      | Streaming decode of the compressed GLB                   |
| Fonts         | Motley Forces, Shifty Notes | Display + handwriting faces, self-hosted               |

---

## Project Structure

```
sooahs-room-folio/
├── index.html                  # Single-page shell, modal markup, JSON-LD
├── package.json
├── vite.config.js
├── .gitignore
├── README.md                   # This file
│
├── public/                     # Static assets served as-is
│   ├── audio/
│   │   └── music/cosmic_candy.ogg
│   ├── draco/                  # Draco decoder shipped with the app
│   ├── fonts/                  # Self-hosted woff / woff2
│   ├── images/
│   │   ├── opensources/        # Opensource project cards
│   │   └── projects/           # Client project cards
│   ├── media/                  # OG image, BTS, video, favicon set
│   ├── models/Room_Portfolio.glb
│   ├── shaders/                # GLSL source (mirror of src/shaders for raw fetches)
│   ├── textures/
│   │   └── room/{day,night}/   # PBR-style wall + floor texture sets
│   ├── robots.txt
│   └── sitemap.xml
│
└── src/
    ├── main.js                 # App entry: scene setup, render loop, modal logic
    ├── style.scss              # Theme tokens, layout, components
    ├── styles/                 # SCSS partials (variables, mixins)
    │
    ├── scripts/
    │   ├── brand-icons.js      # data-brand -> simple-icons resolver
    │   └── creatures.js        # Butterfly + firefly particle behavior
    │
    ├── shaders/
    │   ├── butterflies/        # Creature shaders
    │   ├── clouds/
    │   ├── fireflies/
    │   ├── includes/           # Shared GLSL helpers
    │   ├── leaves/             # Weather: autumn leaves
    │   ├── plants/
    │   ├── rain/               # Weather: rain
    │   ├── smoke/              # Ambient smoke (always on)
    │   ├── snow/               # Weather: snow
    │   └── theme/              # Sky / atmosphere shader
    │
    └── utils/
        └── OrbitControls.js    # Three.js orbit controls (addon)
```

> **Note on `blender files/`**: The original Blender source (`.blend`, baked textures, lightmaps) is intentionally **not** version-controlled. It lives locally and is ignored via `.gitignore`. Only the exported `Room_Portfolio.glb` ships with the project.

---

## Getting Started

### Prerequisites

- **Node.js 18+** (tested on 20 LTS)
- **npm 9+** (or pnpm / yarn — adapt commands accordingly)
- A WebGL2-capable browser (Chrome, Edge, Firefox, Safari 16+)

### Install

```bash
git clone <repo-url> sooahs-room-folio
cd sooahs-room-folio
npm install
```

### Develop

```bash
npm run dev
```

Vite starts on `http://localhost:5173` and exposes the dev server on your LAN via `--host`.

### Production build

```bash
npm run build      # Outputs to dist/
npm run preview    # Serves the production build locally
```

The build is fully static and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3 + CloudFront, etc.).

---

## Architecture

### Render loop

A single `requestAnimationFrame` loop in `src/main.js` drives everything:

1. Update shader uniforms (`uTime`) — but only for systems that are currently visible.
2. Update creatures (butterflies, fireflies) with day/night awareness.
3. Update `OrbitControls` damping.
4. Update animated props (clock hands synced to wall-clock time, fans, chair, fish).
5. Raycast against pre-built hitboxes when no modal is open — drives hover and click.
6. `renderer.render(scene, camera)`.

### Scene composition

- The `Room_Portfolio.glb` model is loaded once via `GLTFLoader` with a `DRACOLoader` pointing at `/draco/`.
- Interactive objects (laptop, artworks, books) are tagged with names ending in `Hover` or `Pointer`. Static hitboxes are generated for each so raycasting stays cheap.
- The video texture (`/media/vid1.mp4`) plays on the in-scene monitor and pauses automatically while a modal is open.

### Modal system

Three modals — **Work**, **About**, **Contact** — are HTML overlays toggled via GSAP. Opening a modal:

- Pauses the background music fade timer
- Pauses the video texture
- Disables orbit controls
- Disables the raycaster

Closing reverses each step.

### Theming

CSS uses a `themed()` mixin and a `t()` getter to switch tokens between light and dark themes. The 3D scene swaps room textures and shader uniforms in parallel. Theme is driven by a single source-of-truth class on `<html>`.

### Brand icons

`src/scripts/brand-icons.js` exports `applyBrandIcons(root)` which finds every `[data-brand="KEY"]` element and injects an SVG from a merge of `simple-icons` exports and a small `customBrandMap`:

| Key        | Source                   | Hex       |
| ---------- | ------------------------ | --------- |
| python     | simple-icons             | `#3776AB` |
| typescript | simple-icons             | `#3178C6` |
| rust       | simple-icons             | `#000000` |
| react      | simple-icons             | `#61DAFB` |
| nodejs     | simple-icons             | `#339933` |
| tensorflow | simple-icons             | `#FF6F00` |
| pytorch    | simple-icons             | `#EE4C2C` |
| postgresql | simple-icons             | `#4169E1` |
| mongodb    | simple-icons             | `#47A248` |
| docker     | simple-icons             | `#2496ED` |
| linux      | simple-icons             | `#FCC624` |
| claude     | simple-icons (Anthropic) | `#D97757` |
| gemini     | simple-icons             | `#8E75B2` |
| deepseek   | simple-icons             | `#4D6BFE` |
| copilot    | simple-icons             | `#000000` |
| cursor     | simple-icons             | `#000000` |
| chatgpt    | custom (OpenAI blossom)  | `#10A37F` |
| aws        | custom (smile arrow)     | `#FF9900` |
| glm        | custom (Z.ai mark)       | `#5C6BFC` |

---

## Asset Pipeline

### Models

- Author in Blender; export as glTF with **Draco compression** enabled.
- Drop the `.glb` in `public/models/`.
- The runtime `DRACOLoader` resolves decoder files from `public/draco/`.

### Textures

Room textures live under `public/textures/room/{day,night}/`. Each theme has four matching sets so walls, floor, ceiling, and props can swap together. Prefer **WebP** for photographic textures and keep each texture under ~1 MB.

### Audio

Replace `public/audio/music/cosmic_candy.ogg` to swap the soundtrack. The track is referenced from `src/main.js`:

```js
const backgroundMusic = new Howl({
  src: ["/audio/music/cosmic_candy.ogg"],
  loop: true,
  volume: 1,
});
```

Royalty-free sources that fit a calm, lo-fi room vibe:

- **Pixabay Music** — <https://pixabay.com/music/> (CC0 / Pixabay license)
- **Free Music Archive** — <https://freemusicarchive.org/> (filter by CC-BY)
- **incompetech** (Kevin MacLeod) — <https://incompetech.com/> (CC-BY, attribution required)
- **OpenGameArt** — <https://opengameart.org/> (multiple CC licenses, check each track)

Always check the specific license and credit the artist in the About modal or repo credits.

> **iOS / Safari note:** `.ogg` is not reliably supported on iOS. For production, ship a `.mp3` fallback alongside `.ogg` and let Howler pick — pass both in the `src` array: `src: ["/audio/music/track.ogg", "/audio/music/track.mp3"]`.

### Shaders

Each weather system has its own folder under `src/shaders/<system>/` containing `vertex.glsl` and `fragment.glsl`. They are imported as strings via `vite-plugin-glsl` and attached to `THREE.ShaderMaterial`. Shared helpers live in `src/shaders/includes/`.

---

## Performance Notes

The site targets smooth 60 FPS on mid-range hardware. Key optimizations already in place:

- **Lazy images** — Every `<img>` inside a modal uses `loading="lazy" decoding="async"`. The initial paint only fetches the loading-screen image, the GLB, and room textures.
- **Culled shader uniforms** — `uTime` is only advanced for weather systems whose `Points` object is `visible`. Hidden rain or leaves spend zero GPU on uniform updates.
- **Paused video texture** — The monitor's `VideoTexture` source video is paused whenever a modal is open, halting the most expensive per-frame CPU decode path.
- **Static raycaster hitboxes** — Each interactive prop gets a precomputed hitbox; raycasts run against a flat array rather than walking the full scene graph.
- **Pixel ratio cap** — `setPixelRatio(Math.min(window.devicePixelRatio, 2))` prevents Retina / 4K displays from rendering at unnecessary supersampling.
- **Draco compression** — The GLB ships compressed and is decoded in a Web Worker via the Draco decoder.
- **Tree-shaken icons** — Only the 16 brand icons actually used are bundled from `simple-icons`.

If you experience jank on a low-end device, consider lowering the pixel-ratio cap to `1.5`, reducing particle counts in each weather system's geometry, or converting the largest project PNGs to WebP.

---

## Customization Guide

### Change theme colors

Edit the theme map at the top of `src/style.scss`. Tokens used by both CSS and JS include `base-purple`, `base-dark-purple`, and `text`. Both light and dark theme maps must be updated to keep them in sync.

### Replace the soundtrack

1. Drop a new `.ogg` and `.mp3` into `public/audio/music/`.
2. Update the `src` array in `src/main.js` (`backgroundMusic = new Howl({...})`).
3. Verify the file is short enough to loop without an obvious seam (60–120 s works well).

### Edit showcased projects

Open `index.html` and find the `.modal.work` section. Each project card is a `<div class="work-card">` with a base image, optional hover image, title, and description. Add or remove cards as needed; the grid auto-flows.

### Add a new tech-stack or AI-agent icon

1. Open `src/scripts/brand-icons.js`.
2. If `simple-icons` ships the brand, add it to the import block and to `simpleBrandMap`.
3. If not, add a new entry to `customBrandMap` with `title`, `hex`, and `path` (24x24 viewBox).
4. In `index.html`, drop in `<div class="tech-icon" data-brand="your-key"></div>` (or `ai-icon` for the AI grid).

### Change starting camera position

Edit the `if (window.innerWidth < 768) { ... } else { ... }` block in `src/main.js` that sets `camera.position` and `controls.target` based on viewport width.

---

## Browser Support

Tested and supported:

- **Chrome / Edge** 110+
- **Firefox** 110+
- **Safari** 16+ (macOS 13+, iOS 16+)

Known limitations:

- **Safari < 16** — No `VideoTexture` audio sync, slower WebGL1 fallback.
- **iOS audio** — `.ogg` is unreliable; ship an `.mp3` fallback.
- **Mobile** — Works but expects a modern device. The starting camera and pixel ratio adapt automatically.

---

## Troubleshooting

**Black screen on load.**
Open DevTools -> Console. The most common cause is a 404 on `Room_Portfolio.glb` or `draco_wasm_wrapper.js`. Confirm both files exist under `public/`.

**Music does not autoplay.**
Browsers block autoplay with sound until the user interacts with the page. The site is designed around a "click to enter" gesture which unlocks playback. If you remove that gesture, you must call `backgroundMusic.play()` from a user-initiated handler.

**Brand icon shows blank.**
Check the `data-brand` key against the keys in `simpleBrandMap` and `customBrandMap` in `src/scripts/brand-icons.js`. Typos (e.g. `postgres` instead of `postgresql`) silently no-op.

**Modal images not loading.**
They are `loading="lazy"` — they fetch as they approach the viewport. If a card is far down a long modal, give the page a moment or scroll. If you want them eager, remove `loading="lazy"` from that `<img>`.

**Hover "vibration" on certain objects.**
Known issue inherited from the original template: when an animated object's intro or hover tween displaces its mesh, the raycaster can flicker between hovered and not-hovered each frame. The dual-hitbox approach in `createStaticHitbox` and `createDelayedHitboxes` mitigates this for most props; if you see it on a new object, attach a static invisible hitbox to it and let the raycaster use that instead.

**Build warning about chunk size.**
Expected — Three.js and friends push the bundle past 500 KB. The site loads fast in practice thanks to lazy images and Draco-compressed models. If you want to silence the warning, raise `build.chunkSizeWarningLimit` in `vite.config.js`.

---

## Credits

This project is a rebuild based on **Sooah's Room Folio** by Sooah Park. The original walkthrough of how the room was built is at <https://youtu.be/AB6sulUMRGE>.

### Inspiration

- [Bruno Simon's Room](https://my-room-in-3d.vercel.app/)
- [Rachel Wei's Room](https://rachelqrwei.ca/)

### Assets

- [Nicky Blender](https://www.instagram.com/nicky.blender/?hl=en) — modeling tutorials
- [Denis Wipart's Materials](https://wipart.artstation.com/store) — material library (commercial license)
- Background music — see `Asset Pipeline > Audio`
- [Click SFX](https://uppbeat.io/sfx/category/digital-and-ui/ui)
- [Piano SFX](https://pixabay.com/sound-effects/all-88-keys-on-a-piano-playing-fast-free-high-quality-sound-effects-71279/)
- [SVGs](https://www.svgrepo.com/)
- [Fonts](https://www.fontspace.com/niskala-huruf)

### Original project awards

- [Awwwards](https://www.awwwards.com/sites/suas-room-folio)
- [CSSDA](https://www.cssdesignawards.com/sites/sooahs-room-folio/47040/)

---

## License

Source code in this repository is released under the **MIT License**.

Third-party assets retain their original licenses:

- **Three.js** — MIT
- **GSAP** — Standard "No Charge" license (GreenSock)
- **simple-icons** — CC0 / various per-icon (see simpleicons.org)
- **Draco** — Apache 2.0
- Background music — see the source you obtained it from

The 3D model (`Room_Portfolio.glb`), project screenshots, and the likeness / personal information of Hoang Dung are **not** licensed for reuse. Use them as inspiration only.

---

> Built and customized by **Hoang Dung** (`dungnotnull`) — M.Sc. IDT, AI Agent Engineer, Full-stack Developer.
> Live site: <https://hoangdung.dev/>
