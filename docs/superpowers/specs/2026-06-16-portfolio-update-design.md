# Portfolio Update Design — 2026-06-16

## Goal

Update `sooahs-room-folio` portfolio with: new project/opensource/tech-stack/AI-agent data, full SEO, new monogram favicon, button layout fix (3 right-side toggle buttons), and 4 cute 3D creature systems (butterflies, clouds, fireflies, plants).

## Context

Project is **vanilla JS + Vite + Three.js + SCSS** (not React). User supplied React-style reference data — adapted to vanilla JS. Existing shaders in `src/shaders/{snow,rain,leaves,smoke,theme}/` already handle weather. Existing `index.html` has outdated hardcoded project data using SVG files that no longer exist; new PNG/WEBP images are already in `public/images/projects/` and `public/images/opensources/`.

The three toggle buttons (`.mute-toggle-button`, `.weather-toggle-button`, `.theme-toggle-button`) are `position: fixed` with `top: 36px / 96px / 156px`. With ~76px button height each, they overlap by ~16px — sound button is occluded by weather button. Inline `style.display` toggles create race conditions and ambiguous state visibility.

## Non-Goals

- No React migration.
- No new heavy dependencies (no `react-icons`, no `sharp` runtime, no model loaders beyond existing `GLTFLoader`/`DRACOLoader`).
- No GLB model imports for creatures — all procedural via shaders/meshes.
- No changes to existing weather shader systems (snow/rain/leaves) — those keep working.

## Architecture

```
src/
  main.js                              (modified: button group init, creatures wiring)
  style.scss                           (modified: button group, state classes, creature visibility)
  shaders/
    butterflies/{vertex,fragment}.glsl (NEW)
    clouds/{vertex,fragment}.glsl      (NEW)
    fireflies/{vertex,fragment}.glsl   (NEW)
    plants/{vertex,fragment}.glsl      (NEW)
  scripts/
    creatures.js                       (NEW: factory for 4 systems + update)
public/
  media/
    favicon/                           (NEW: monogram D set, replaces light-favicon + dark-favicon)
      favicon.svg
      favicon-96x96.png
      favicon.ico
      apple-touch-icon.png
      site.webmanifest
      web-app-manifest-192x192.png
      web-app-manifest-512x512.png
  robots.txt                           (NEW)
  sitemap.xml                          (NEW)
index.html                             (modified: head SEO, button group wrap, modal data)
```

## Components

### 1. Data Update (index.html)

**`.work` modal → Projects section** (replace 6 old SVG cards with 5 new PNG/WEBP cards):

| Name | Category | Tools | Thumbnail |
|---|---|---|---|
| ACB Bank | Official Website | Full-stack, Banking system | `/images/projects/acb.png` |
| Ski | Official System | Full-stack, System Design | `/images/projects/ski.png` |
| VALOvietnam | E-commerce Platform | Technical Lead, AI Focused | `/images/projects/valo.png` |
| Balance | E-commerce Platform | Full-stack, Solution Focused | `/images/projects/balance.webp` |
| Thermomix | Product Platform | Full-stack, Frontend Focused | `/images/projects/thermomix.png` |

**`.work` modal → Open Source section** (replace 6 old SVG cards with 6 new PNG cards):

| Name | Category | Tools | Link | Thumbnail |
|---|---|---|---|---|
| Hybrid Harness Chaos PRM | AI Agent Framework | Python, AI Agents, DevOps | github.com/dungnotnull/hybrid-harness-chaos-process-prm | `/images/opensources/harnessanhchaos.png` |
| OpenCLI | AI CLI Agent | TypeScript, LLMs, Docker | github.com/dungnotnull/openCLI-all-your-LLM-just-need | `/images/opensources/opencli.png` |
| Futureminal2 | AI-Native Environment | Rust, AI, Workflows | github.com/dungnotnull/futureminal2 | `/images/opensources/futureminal2.png` |
| Scam Whisperer | Computer Vision | TypeScript, CV, Security | github.com/dungnotnull/scam-whisperer-agent | `/images/opensources/scam.png` |
| WiFi Elderly Care | Deep Learning | C, Python, Deep Learning | github.com/dungnotnull/wifi-sensing-based-elderlycare-deeplearning | `/images/opensources/wifielderly.png` |
| Multi-Camera Pipeline | Computer Vision | Jupyter, Python, CV | github.com/dungnotnull/ticket-suspicion-multicamera-pipeline-computer-vision | `/images/opensources/multicamera.png` |

Each opensource card becomes a clickable `<a>` wrapper (target `_blank`, `rel="noopener noreferrer"`).

**Button text change**: Open Source CTA "View more on GitHub →" → "More 200+ opensources in Github →".

**`.about` modal → Tech Stack section** (replace plain text cards with inline SVG icons):

12 items: Python, TypeScript, Rust, React, Node.js, TensorFlow, PyTorch, PostgreSQL, MongoDB, Docker, AWS, Linux.

SVG paths sourced from `react-icons/fa` and `react-icons/si` (copy path data only — no React import).

**`.about` modal → AI Agents section** (replace 7 SVG cards with 7 inline SVG + "+ more" card):

7 items: Claude, Gemini, ChatGPT, DeepSeek, GLM, Copilot, Cursor — using existing inline SVGs already in HTML (no change needed except adding "+ more" card if missing).

### 2. SEO (`index.html` `<head>`)

- **Title**: `dungnotnull — AI Agent Engineer & Full-stack Developer | GenAI • Harness • Chaos Engineering`
- **Meta description** (~155 chars): brief bio mentioning M.Sc. IDT, AI Agent Engineer, Full-stack, GenAI, Harness/Chaos Engineering, Computer Vision.
- **Meta keywords**: AI Agent Engineer, Full-stack Developer, GenAI, Harness Engineering, Chaos Engineering, Computer Vision, Three.js, Hoang Dung, dungnotnull.
- **Meta author**: `Hoang Dung (dungnotnull)`.
- **Meta robots**: `index, follow`.
- **Canonical**: `https://dungnotnull.dev/`.
- **Open Graph**: og:title, og:description, og:url, og:image (1200x630), og:image:width/height, og:site_name, og:locale (existing), og:type (existing).
- **Twitter Card**: summary_large_image, twitter:title, twitter:description, twitter:image, twitter:creator.
- **Performance**: `preconnect` for fonts (if used), `theme-color` (#9333ea), `color-scheme` (dark light).
- **JSON-LD Person schema**: name, alternateName (dungnotnull), jobTitle, url, email, sameAs (GitHub, LinkedIn), knowsAbout.
- **Lang attribute**: keep `en`.
- **Semantic HTML**: keep existing landmarks, add `aria-label` to icon-only buttons.

**New files**:
- `public/robots.txt`: allow all, point to sitemap.
- `public/sitemap.xml`: single URL entry (homepage).

### 3. Favicon — Monogram "D"

**SVG design**:
- Rounded-square viewBox `0 0 64 64`, corner radius 16.
- Background: linear gradient 135deg `#9333ea` → `#c084fc`.
- Center: bold white "D" using a system rounded font (`font-family: "Arial Rounded MT Bold", "SF Pro Rounded", system-ui, sans-serif; font-weight: 900`), or as a path for cross-renderer consistency.
- Optional: tiny sparkle/dot at corner for cute factor.

**PNG sizes** (generated from SVG via Node script `scripts/build-favicon.mjs` using `canvas` or `sharp` — decided: use `sharp` since it's a single dev script invocation, not runtime):
- 16, 32, 96, 180 (apple-touch), 192, 512.

**Apple-touch-icon**: 180x180 with full-bleed gradient (no transparency — Apple adds rounded corners).
**favicon.ico**: Multi-size ICO containing 16/32/48.

**site.webmanifest**:
```json
{
  "name": "dungnotnull portfolio",
  "short_name": "dungnotnull",
  "icons": [
    { "src": "/media/favicon/web-app-manifest-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/media/favicon/web-app-manifest-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#9333ea",
  "background_color": "#0a0a0a",
  "display": "standalone"
}
```

**index.html `<head>`**: replace existing 5 favicon `<link>` tags with new `/media/favicon/...` paths. Theme-aware swap removed (single favicon for both themes — simpler, matches "surgical changes" principle).

### 4. Button Layout Fix

**HTML change** — wrap three buttons in a flex container:
```html
<div class="toggle-buttons-group">
  <button class="mute-toggle-button toggle-buttons" aria-label="Toggle sound" aria-pressed="false">
    <svg class="sound-on-svg">...</svg>
    <svg class="sound-off-svg">...</svg>
  </button>
  <button class="weather-toggle-button toggle-buttons weather-snow" aria-label="Toggle weather">
    <svg class="weather-snow-svg">...</svg>
    <svg class="weather-sun-svg">...</svg>
    <svg class="weather-rain-svg">...</svg>
    <svg class="weather-leaf-svg">...</svg>
  </button>
  <button class="theme-toggle-button toggle-buttons" aria-label="Toggle theme" aria-pressed="false">
    <svg class="sun-svg">...</svg>
    <svg class="moon-svg">...</svg>
  </button>
</div>
```

**SCSS** — group layout + single-state visibility:
```scss
.toggle-buttons-group {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @include media.media("<=tablet") {
    top: 16px;
    right: 16px;
    gap: 0.75rem;
  }
}

.toggle-buttons {
  position: relative;
  width: 60px;
  height: 60px;
  padding: 0;
  // existing border/bg/shadow preserved

  @include media.media("<=tablet") {
    width: 48px;
    height: 48px;
  }
}

// Sound: only one of on/off visible at a time
.mute-toggle-button .sound-on-svg,
.mute-toggle-button .sound-off-svg { display: none; }
.mute-toggle-button:not(.is-muted) .sound-on-svg { display: block; }
.mute-toggle-button.is-muted .sound-off-svg { display: block; }

// Theme: only sun OR moon
.theme-toggle-button .sun-svg,
.theme-toggle-button .moon-svg { display: none; }
.theme-toggle-button:not(.is-night) .sun-svg { display: block; }
.theme-toggle-button.is-night .moon-svg { display: block; }

// Weather: only one of 4 states
.weather-toggle-button .weather-snow-svg,
.weather-toggle-button .weather-sun-svg,
.weather-toggle-button .weather-rain-svg,
.weather-toggle-button .weather-leaf-svg { display: none; }
.weather-toggle-button.weather-snow  .weather-snow-svg  { display: block; }
.weather-toggle-button.weather-sun   .weather-sun-svg   { display: block; }
.weather-toggle-button.weather-rain  .weather-rain-svg  { display: block; }
.weather-toggle-button.weather-leaf  .weather-leaf-svg  { display: block; }
```

Inline `style.display` removed from `main.js`. JS sets only class:
- Mute: `muteToggleButton.classList.toggle('is-muted', isMuted)` + `aria-pressed`.
- Theme: `themeToggleButton.classList.toggle('is-night', isNightMode)` + `aria-pressed`.
- Weather: clear `weather-snow|sun|rain|leaf` classes, add `weather-{currentWeather}`.

### 5. 3D Cute Creatures

**Module** `src/scripts/creatures.js`:

```js
export function createCreatures(scene, { isNightMode }) {
  const butterflies = createButterflies(scene);
  const clouds = createClouds(scene);
  const fireflies = createFireflies(scene);
  const plants = createPlants(scene);

  function update(elapsedTime, nightMode) {
    butterflies.material.uniforms.uTime.value = elapsedTime;
    clouds.material.uniforms.uTime.value = elapsedTime;
    fireflies.material.uniforms.uTime.value = elapsedTime;
    plants.swayMaterial.uniforms.uTime.value = elapsedTime;

    // Butterfly path animation
    for (let i = 0; i < butterflies.count; i++) {
      // position update via sin/cos with per-instance phase
    }

    // Fireflies only visible at night (or always subtle, brighter at night)
    fireflies.points.material.opacity = nightMode ? 0.9 : 0.25;
  }

  return { butterflies, clouds, fireflies, plants, update };
}
```

#### Butterflies (8-12 instances, Plane geometry + shader)
- **Geometry**: `PlaneGeometry(0.5, 0.4, 8, 1)`.
- **Per-instance attributes**: `aOffset`, `aSpeed`, `aColor`, `aCenter` (Vector3).
- **Vertex shader**:
  - Wing flutter: scale `position.x` around center by `0.3 + 0.7 * abs(sin(uTime * 8.0 + aOffset))` → wings appear to flap.
  - Path: rotate plane to face movement direction.
- **Fragment shader**: gradient pink→purple, soft wing edge via `smoothstep(vUv.y, 0.0)`, darken at edges.
- **Movement** (CPU side, per frame): each butterfly position = `center + vec3(sin(t*speed+offset) * radius, cos(t*speed*0.7+offset) * radius*0.3, sin(t*speed*0.5+offset*1.3) * radius)`.
- **Billboarding**: plane always faces camera (set in vertex shader using camera matrix).

#### Clouds (4-5 sprite groups)
- **Geometry**: each cloud = `Group` of 3-5 `Mesh` with `PlaneGeometry(2, 1)` using a soft-circle shader.
- **Vertex shader**: subtle scale pulse `1.0 + 0.05 * sin(uTime + offset)`.
- **Fragment shader**: radial `smoothstep` for soft edge, color `#ffffff` at 70% opacity, slight purple tint at edges for theme cohesion.
- **Movement**: clouds drift slowly along `+x`, wrap when `x > 25` back to `-25`.
- **Placement**: y between 8-12 (above room), z between -10 to 10.

#### Fireflies (30-50 Points, additive blending)
- **Geometry**: `BufferGeometry` with `aOffset`, `aRadius`, `aPhase` attributes.
- **Vertex shader**: glow size `gl_PointSize = base * (0.7 + 0.5 * sin(uTime * 3.0 + aPhase))`; position oscillates around center.
- **Fragment shader**: radial gradient warm yellow `#ffe066` → transparent, additive blending.
- **Theme reactivity**: `material.opacity` set to `0.9` at night, `0.2` during day (still visible but dim).
- **Pattern**: reuse structure of existing snow/rain shader (Points + size attenuation).

#### Plants (5-7 small plants)
- **Geometry per plant**: `CylinderGeometry(0.05, 0.08, 1.0)` (stem) + `ConeGeometry(0.3, 0.5)` or `SphereGeometry(0.2)` (foliage/flower) merged via `Group`.
- **Vertex shader (foliage/flower only)**: top vertices sway — `position.x += sin(uTime * 1.5 + position.y * 3.0) * 0.05 * position.y`.
- **Stem**: static dark green.
- **Flower colors**: pink (#f472b6), purple (#a78bfa), yellow (#fde047), white — pastel palette.
- **Placement**: scattered near the piano (visible at `controls.target` area) and along the baseboard — exact coordinates picked at implementation time by inspecting existing scene AABB; goal is "visible but not blocking main furniture". Implementation note: log placement positions during dev so they can be tuned in one pass.
- **Movement**: subtle continuous sway, not too distracting.

### 6. Update Loop Integration

In existing `render(timestamp)` function in `main.js`, before `renderer.render()`:
```js
if (creatures) {
  creatures.update(elapsedTime, isNightMode);
}
```

`isNightMode` already exists as a top-level `let` in main.js — pass by reference (closure) since `creatures.update` is called from inside `render`.

## Data Flow

1. Page load → `index.html` renders with new SEO meta, new favicon link, new button group, new modal data.
2. `main.js` imports creatures module → calls `createCreatures(scene, { isNightMode })` after scene init.
3. Button clicks → JS toggles state class → SCSS shows single SVG → callback updates Three.js (weather, audio, theme materials).
4. Each frame: `render()` updates weather shaders (existing) + calls `creatures.update()` (new).
5. Theme toggle: `isNightMode` flips → theme materials interpolate (existing) + fireflies opacity changes (new).

## Error Handling

- **Sharp install for favicon build**: dev dependency only. If install fails on Windows, fall back to providing only `favicon.svg` + manually-exported PNGs (acceptable since SVG covers modern browsers).
- **Creatures init failure**: wrap in try/catch, log to console, continue without creatures (don't break the room).
- **Missing image assets**: hard-fail at build (Vite will throw on missing import). All referenced images already exist in repo — verified.

## Testing

Manual testing via `/final-before-start-dev` skill at completion:
1. `npm run dev` — Vite starts without errors.
2. Browser opens — loading screen → click button → room visible.
3. **Button group**: all 3 buttons visible, no overlap, hover works, click toggles state, only one SVG visible per button.
4. **Mute toggle**: music plays/stops, SVG swaps.
5. **Theme toggle**: scene darkens/lightens, favicon stable, fireflies brighten.
6. **Weather toggle**: cycles snow→rain→sun→leaves, each particle system swaps, no double-system.
7. **Creatures visible**: butterflies flutter, clouds drift, fireflies glow, plants sway.
8. **Modal data**: open `.work` → see 5 projects + 6 opensources with new images, button text "More 200+ opensources in Github →". Open `.about` → 12 tech icons + 7 AI agents.
9. **SEO check**: view-source → all meta tags present, JSON-LD valid (paste into Schema.org validator), Twitter Card preview tool.
10. **Responsive**: resize to tablet/mobile — button group compacts, modals scroll.
11. **Favicon**: tab shows monogram D, manifest loads.

## Build Sequence

1. Add `sharp` devDependency.
2. Create `scripts/build-favicon.mjs` — generate SVG + render PNG sizes + ICO.
3. Run script, output to `public/media/favicon/`.
4. Create `public/robots.txt` + `public/sitemap.xml`.
5. Update `index.html` `<head>`: SEO meta, JSON-LD, favicon links, theme-color.
6. Update `index.html` body: wrap 3 buttons in `.toggle-buttons-group`.
7. Update `index.html` `.work` modal: replace existing 12 project/opensource cards with 11 new cards (5 projects + 6 opensources).
8. Update `index.html` `.about` modal: replace tech stack (12 inline SVGs) + verify AI agents (7 + more card).
9. Update `src/style.scss`: button group layout, single-state visibility rules.
10. Update `src/main.js`: button logic (classList toggle, remove inline `style.display`).
11. Create 4 shader folders under `src/shaders/`.
12. Create `src/scripts/creatures.js` with 4 system factories.
13. Wire `creatures.js` into `main.js` (import + init + update call).
14. Run `npm run dev` + browser test.
15. `/final-before-start-dev` skill verification.
16. Commit.

## Risks

- **Sharp on Windows**: may require native build tools. Mitigation: pre-built binaries for win32 x64 exist in npm; should install clean. Fallback: SVG-only favicon.
- **Shader compatibility**: existing shaders use `glslify`-style includes (see `includes/rotate2D.glsl`). New shaders should follow same import pattern via `vite-plugin-glsl`.
- **Performance**: adding 4 creature systems to existing scene with weather particles. Estimated additional draw calls: ~20 (butterflies + clouds as instanced/multi-mesh; fireflies as single Points; plants as ~30 meshes). Should be fine on modern hardware. If FPS drops, reduce counts.
- **Mobile**: button group + creatures must respect mobile viewport. Use existing `<=tablet` media query pattern.
