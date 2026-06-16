# Portfolio Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the `sooahs-room-folio` portfolio with new project/opensource/tech-stack data, full SEO, a custom monogram favicon, a fix for the three overlapping toggle buttons, and four new cute 3D creature systems (butterflies, clouds, fireflies, plants).

**Architecture:** Vanilla JS + Vite + Three.js + SCSS (no React). New `creatures.js` module orchestrates four shader/mesh creature systems following the existing pattern in `main.js` (THREE.Points for particles, ShaderMaterial for vertex/fragment work, CPU-side position updates in the render loop). Button refactor wraps the three existing fixed-position buttons in a single flex container with CSS class-driven single-state visibility (no inline `style.display`).

**Tech Stack:** Vite 6, three 0.172, gsap 3.12, howler 2.2, sass 1.83, vite-plugin-glsl 1.3. New devDependency: `sharp` (for one-time favicon PNG/ICO generation).

**Spec reference:** `docs/superpowers/specs/2026-06-16-portfolio-update-design.md`

**Verification model:** No automated test framework is configured. Each task ends with a manual browser check (`npm run dev` then visual/interactive verification) plus a commit. Final task runs the `/final-before-start-dev` skill for full verification.

---

### Task 1: Generate favicon set with sharp

**Files:**
- Modify: `package.json` (add `sharp` devDependency)
- Create: `scripts/build-favicon.mjs`
- Create: `public/media/favicon/favicon.svg`
- Create: `public/media/favicon/favicon-96x96.png`
- Create: `public/media/favicon/apple-touch-icon.png`
- Create: `public/media/favicon/web-app-manifest-192x192.png`
- Create: `public/media/favicon/web-app-manifest-512x512.png`
- Create: `public/media/favicon/favicon.ico`
- Create: `public/media/favicon/site.webmanifest`

- [ ] **Step 1: Install sharp**

Run: `npm install --save-dev sharp`
Expected: `sharp` added to `devDependencies` in `package.json`.

- [ ] **Step 2: Create the source SVG**

Create `public/media/favicon/favicon.svg` with this exact content (monogram "D" with gradient purple background, rounded square, sparkle accent):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9333ea"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>
    <linearGradient id="dg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f3e8ff"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="64" height="64" rx="14" ry="14" fill="url(#bg)"/>
  <path d="M20 14 L20 50 L34 50 C44 50 50 42 50 32 C50 22 44 14 34 14 Z M27 20 L34 20 C40 20 43 25 43 32 C43 39 40 44 34 44 L27 44 Z" fill="url(#dg)"/>
  <circle cx="48" cy="14" r="3" fill="#fde047"/>
  <circle cx="52" cy="20" r="1.6" fill="#ffffff" opacity="0.85"/>
</svg>
```

- [ ] **Step 3: Create the build script**

Create `scripts/build-favicon.mjs`:

```javascript
import sharp from "sharp";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "media", "favicon");

mkdirSync(outDir, { recursive: true });

const svgPath = join(outDir, "favicon.svg");
const svgBuffer = readFileSync(svgPath);

const sizes = [
  { name: "favicon-96x96.png", size: 96 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "web-app-manifest-192x192.png", size: 192 },
  { name: "web-app-manifest-512x512.png", size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(svgBuffer).resize(size, size).png().toFile(join(outDir, name));
  console.log(`generated ${name} (${size}x${size})`);
}

// Build multi-size ICO (16, 32, 48) by packing PNGs in ICO container.
const icoSizes = [16, 32, 48];
const pngs = [];
for (const size of icoSizes) {
  pngs.push(await sharp(svgBuffer).resize(size, size).png().toBuffer());
}

const headerSize = 6 + icoSizes.length * 16;
const offsets = [];
let offset = headerSize;
for (let i = 0; i < pngs.length; i++) {
  offsets.push(offset);
  offset += pngs[i].length;
}

const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);

for (let i = 0; i < icoSizes.length; i++) {
  const size = icoSizes[i];
  const entryOffset = 6 + i * 16;
  header.writeUInt8(size === 256 ? 0 : size, entryOffset);
  header.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);
  header.writeUInt8(0, entryOffset + 2);
  header.writeUInt8(0, entryOffset + 3);
  header.writeUInt16LE(1, entryOffset + 4);
  header.writeUInt16LE(32, entryOffset + 6);
  header.writeUInt32LE(pngs[i].length, entryOffset + 8);
  header.writeUInt32LE(offsets[i], entryOffset + 12);
}

const ico = Buffer.concat([header, ...pngs]);
writeFileSync(join(outDir, "favicon.ico"), ico);
console.log("generated favicon.ico");

// Write manifest
const manifest = {
  name: "dungnotnull portfolio",
  short_name: "dungnotnull",
  icons: [
    { src: "/media/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/media/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" }
  ],
  theme_color: "#9333ea",
  background_color: "#0a0a0a",
  display: "standalone",
  start_url: "/"
};
writeFileSync(join(outDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));
console.log("generated site.webmanifest");
```

- [ ] **Step 4: Run the build script**

Run: `node scripts/build-favicon.mjs`
Expected output: prints `generated favicon-96x96.png (96x96)` etc. for each file, then `generated favicon.ico`, `generated site.webmanifest`. Verify files exist in `public/media/favicon/`.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json scripts/build-favicon.mjs public/media/favicon/
git commit -m "feat(favicon): generate monogram D favicon set via sharp build script"
```

---

### Task 2: Add SEO files (robots.txt + sitemap.xml)

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://dungnotnull.dev/sitemap.xml
```

- [ ] **Step 2: Create sitemap.xml**

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dungnotnull.dev/</loc>
    <lastmod>2026-06-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt public/sitemap.xml
git commit -m "feat(seo): add robots.txt and sitemap.xml"
```

---

### Task 3: Update `index.html` `<head>` for SEO and new favicon

**Files:**
- Modify: `index.html:1-24` (replace entire `<head>`)

- [ ] **Step 1: Replace the `<head>` block**

Open `index.html` and replace lines 1 through 24 (from `<!DOCTYPE html>` through the closing `</head>` tag — stopping just before `<body class="light-theme">`). Use this exact replacement:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#9333ea" />
    <meta name="color-scheme" content="dark light" />

    <title>dungnotnull — AI Agent Engineer &amp; Full-stack Developer | GenAI • Harness • Chaos Engineering</title>

    <meta name="description" content="Hoang Dung (dungnotnull) — M.Sc. in IDT, AI Agent Engineer & Full-stack Developer. Expertise in GenAI, Harness/Chaos Engineering, Computer Vision, Mathematics. Building autonomous engineering systems with Three.js interactive portfolio." />
    <meta name="keywords" content="AI Agent Engineer, Full-stack Developer, GenAI, Harness Engineering, Chaos Engineering, Computer Vision, Three.js, Hoang Dung, dungnotnull, autonomous systems" />
    <meta name="author" content="Hoang Dung (dungnotnull)" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="googlebot" content="index, follow" />
    <link rel="canonical" href="https://dungnotnull.dev/" />

    <link rel="stylesheet" href="./src/style.scss" />
    <link rel="icon" type="image/png" href="/media/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/media/favicon/favicon.svg" />
    <link rel="shortcut icon" href="/media/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/media/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/media/favicon/site.webmanifest" />

    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="dungnotnull portfolio" />
    <meta property="og:url" content="https://dungnotnull.dev/" />
    <meta property="og:title" content="dungnotnull — AI Agent Engineer &amp; Full-stack Developer" />
    <meta property="og:description" content="Hi, I'm Hoang Dung (dungnotnull). M.Sc. in IDT, AI Agent Engineer, Full-stack Developer. Expertise in GenAI, Harness/Chaos Engineering, Computer Vision, Math." />
    <meta property="og:image" content="/media/og-image.webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="dungnotnull — portfolio hero image" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="dungnotnull — AI Agent Engineer &amp; Full-stack Developer" />
    <meta name="twitter:description" content="M.Sc. in IDT, AI Agent Engineer, Full-stack Developer. GenAI • Harness • Chaos Engineering." />
    <meta name="twitter:image" content="/media/og-image.webp" />
    <meta name="twitter:creator" content="@dungnotnull" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Hoang Dung",
      "alternateName": "dungnotnull",
      "jobTitle": "AI Agent Engineer & Full-stack Developer",
      "description": "M.Sc. in IDT, AI Agent Engineer, Full-stack Developer. Expertise in GenAI, Harness/Chaos Engineering, Computer Vision, Mathematics.",
      "url": "https://dungnotnull.dev/",
      "email": "mailto:truonghoangdung57@gmail.com",
      "image": "/media/og-image.webp",
      "sameAs": [
        "https://github.com/dungnotnull",
        "https://www.linkedin.com/in/truonghoangdung57/"
      ],
      "knowsAbout": [
        "GenAI",
        "AI Agents",
        "Harness Engineering",
        "Chaos Engineering",
        "Computer Vision",
        "Deep Learning",
        "Three.js",
        "Full-stack Development"
      ]
    }
    </script>
  </head>
```

- [ ] **Step 2: Manual check**

Run: `npm run dev` then open the page. View source and confirm:
- Title bar shows new monogram D favicon.
- All `<meta>` tags render correctly.
- No console errors about missing files.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(seo): add full meta tags, OG, Twitter Card, JSON-LD, new favicon links"
```

---

### Task 4: Refactor toggle buttons — HTML wrap

**Files:**
- Modify: `index.html` (the three toggle button elements, currently around lines 46-134)

- [ ] **Step 1: Replace the three buttons with a wrapped group**

Open `index.html` and find the existing three toggle buttons (`<button class="mute-toggle-button toggle-buttons">`, `<button class="weather-toggle-button toggle-buttons">`, `<button class="theme-toggle-button toggle-buttons">`). Replace all three buttons with this exact block:

```html
    <div class="toggle-buttons-group">
      <button class="mute-toggle-button toggle-buttons" aria-label="Toggle sound" aria-pressed="false">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" class="sound-svg sound-off-svg" xmlns="http://www.w3.org/2000/svg">
          <path d="M366.064 567.04C430.064 624 508.464 663.04 545.584 650.56C612.784 625.6 623.984 490.557 623.984 397.117C623.984 371.197 623.984 341.76 620.464 312.641" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M596.134 200.963C592.038 188.521 585.44 177.047 576.746 167.252C568.051 157.456 557.443 149.545 545.578 144.002C506.218 129.282 422.698 175.999 353.578 237.119H302.375C268.427 237.119 235.87 250.606 211.865 274.611C187.86 298.616 174.375 331.171 174.375 365.12V429.12C174.365 453.795 181.488 477.952 194.887 498.672C208.285 519.395 227.387 535.802 249.894 545.92" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M720 77.4414L80 717.44" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" class="sound-svg sound-on-svg" xmlns="http://www.w3.org/2000/svg">
          <path d="M417.578 144.002C378.218 129.282 294.696 175.999 225.576 237.119H174.375C140.427 237.119 107.87 250.606 83.8653 274.611C59.8605 298.616 46.375 331.171 46.375 365.12V429.12C46.375 463.066 59.8605 495.626 83.8653 519.632C107.87 543.635 140.427 557.12 174.375 557.12H225.576C293.096 619.2 376.618 664.96 417.578 650.56C484.778 625.6 495.974 490.56 495.974 397.12C495.974 303.679 484.778 168.962 417.578 144.002Z" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M677.127 215.039C725.098 263.044 752.049 328.134 752.049 396C752.049 463.866 725.098 528.957 677.127 576.96" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M609.252 510.4C639.246 480.394 656.097 439.703 656.097 397.277C656.097 354.851 639.246 314.165 609.252 284.16" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button class="weather-toggle-button toggle-buttons weather-snow" aria-label="Cycle weather effect">
        <svg class="weather-svg weather-sun-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M733.333 550H66.666M666.666 666.667H133.333M399.999 100V166.667M133.333 433.333H66.666M210.47 243.804L163.329 196.663M589.516 243.804L636.659 196.663M733.333 433.333H666.666" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="weather-svg weather-snow-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(80,80) scale(0.8)">
            <path d="M400 200 L400 600 M200 400 L600 400 M260 260 L540 540 M540 260 L260 540" stroke-width="60" stroke-linecap="round"/>
          </g>
          <g transform="translate(120,120)" opacity="0.6">
            <circle cx="100" cy="100" r="20" fill="currentColor" stroke="none"/>
            <circle cx="500" cy="180" r="15" fill="currentColor" stroke="none"/>
            <circle cx="180" cy="500" r="18" fill="currentColor" stroke="none"/>
          </g>
        </svg>
        <svg class="weather-svg weather-rain-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M200 100L180 140M200 200L180 240M300 100L280 140M300 200L280 240M400 100L380 140M400 200L380 240M500 100L480 140M500 200L480 240M600 100L580 140M600 200L580 240" stroke-width="66.667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M250 150L230 190M350 150L330 190M450 150L430 190M550 150L530 190" stroke-width="66.667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="weather-svg weather-leaf-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M400 100C400 100 300 200 200 300" stroke-width="66.667" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M400 200C400 200 350 150 300 200" stroke-width="66.667" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M400 300C400 300 380 250 350 280" stroke-width="66.667" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </button>

      <button class="theme-toggle-button toggle-buttons" aria-label="Toggle day/night theme" aria-pressed="false">
        <svg class="sun-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M733.333 550H66.666M666.666 666.667H133.333M399.999 100V166.667M133.333 433.333H66.666M210.47 243.804L163.329 196.663M589.516 243.804L636.659 196.663M733.333 433.333H666.666M233.333 433.333C233.333 341.287 307.952 266.667 399.999 266.667C492.046 266.667 566.666 341.287 566.666 433.333" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="moon-svg" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M446.619 254.869C449.832 245.908 462.666 245.908 465.879 254.869L474.669 279.371C475.699 282.239 477.983 284.495 480.886 285.511L505.696 294.193C514.766 297.368 514.766 310.04 505.696 313.215L480.886 321.897C477.983 322.913 475.699 325.169 474.669 328.038L465.879 352.54C462.666 361.5 449.832 361.5 446.619 352.54L437.829 328.038C436.799 325.169 434.516 322.913 431.612 321.897L406.803 313.215C397.733 310.04 397.733 297.368 406.803 294.193L431.612 285.511C434.516 284.495 436.799 282.239 437.829 279.371L446.619 254.869Z" fill="currentColor"/>
          <path d="M543.581 363.74C545.724 357.766 554.278 357.766 556.421 363.74L562.281 380.073C562.968 381.986 564.491 383.49 566.427 384.166L582.964 389.956C589.014 392.073 589.014 400.52 582.964 402.636L566.427 408.423C564.491 409.103 562.968 410.606 562.281 412.52L556.421 428.853C554.278 434.826 545.724 434.826 543.581 428.853L537.721 412.52C537.034 410.606 535.511 409.103 533.574 408.423L517.037 402.636C510.987 400.52 510.987 392.073 517.037 389.956L533.574 384.166C535.511 383.49 537.034 381.986 537.721 380.073L543.581 363.74Z" fill="currentColor"/>
          <path d="M592.31 109.728C596.963 96.7573 615.537 96.7573 620.19 109.728L636.14 154.184C637.627 158.335 640.937 161.602 645.14 163.073L690.15 178.825C703.283 183.421 703.283 201.764 690.15 206.36L645.14 222.112C640.937 223.583 637.627 226.85 636.14 231.002L620.19 275.457C615.537 288.428 596.963 288.428 592.31 275.457L576.36 231.002C574.873 226.85 571.563 223.583 567.36 222.112L522.35 206.36C509.217 201.764 509.217 183.421 522.35 178.825L567.36 163.073C571.563 161.602 574.873 158.335 576.36 154.184L592.31 109.728Z" fill="currentColor"/>
          <path d="M100 448.657C100 587.47 215.807 700 358.66 700C468.637 700 562.58 633.31 600 539.277C570.363 552.803 537.27 560.363 502.363 560.363C375.38 560.363 272.441 460.337 272.441 336.947C272.441 285.342 290.446 237.824 320.685 200C195.834 217.85 100 322.377 100 448.657Z" stroke-width="85" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
```

Note: The weather-snow SVG has been replaced with a cleaner 4-pointed snowflake + sparkle design. All 4 weather SVGs share the class `weather-svg` plus their specific class (`weather-sun-svg`, `weather-snow-svg`, etc.) for SCSS targeting.

- [ ] **Step 2: Manual check (HTML structure only — SCSS not yet updated)**

Run: `npm run dev`. Confirm the page still loads (buttons will overlap — that's expected, fixed in Task 5). Confirm no console errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "refactor(buttons): wrap toggle buttons in group container with aria labels"
```

---

### Task 5: Update SCSS for button group + single-state visibility

**Files:**
- Modify: `src/style.scss` (button section, currently lines 584-745)

- [ ] **Step 1: Replace the toggle-button CSS section**

Open `src/style.scss`. Replace the entire block from the comment `// Toggle Buttons - Vertical Layout` (around line 584) through the end of `.weather-sun { display: none; }` rule (around line 745). Use this replacement:

```scss
// Toggle Buttons - Grouped Vertical Layout
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
  @include vars.centered;
  position: relative;
  width: 60px;
  height: 60px;
  padding: 0;
  border: 8px solid vars.$base-purple;
  background-color: vars.$base-light-purple;
  color: vars.$base-purple;
  border-radius: 1.2rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.15);
  }

  @include media.media("<=tablet") {
    width: 48px;
    height: 48px;
    border-width: 6px;
  }

  @include themed() {
    border-color: t("base-purple");
    background-color: t("base-light-purple");
    color: t("base-purple");
  }
}

.mute-toggle-button:hover { transform: rotate(-5deg) scale(1.15); }
.weather-toggle-button:hover { transform: rotate(3deg) scale(1.15); }
.theme-toggle-button:hover { transform: rotate(5deg) scale(1.15); }

// Inner SVGs — centered absolute, single-state visibility
.toggle-buttons svg {
  width: 32px;
  height: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;

  @include media.media("<=tablet") {
    width: 24px;
    height: 24px;
  }
}

// Sound: only one of on/off
.mute-toggle-button:not(.is-muted) .sound-on-svg,
.mute-toggle-button.is-muted .sound-off-svg {
  display: block;
}

// Theme: only sun OR moon
.theme-toggle-button:not(.is-night) .sun-svg,
.theme-toggle-button.is-night .moon-svg {
  display: block;
}

// Weather: only one of 4
.weather-toggle-button.weather-snow .weather-snow-svg,
.weather-toggle-button.weather-sun .weather-sun-svg,
.weather-toggle-button.weather-rain .weather-rain-svg,
.weather-toggle-button.weather-leaf .weather-leaf-svg {
  display: block;
}

// Themed strokes
.sound-svg,
.sun-svg,
.moon-svg,
.weather-svg,
.github,
.linkedin,
.instagram,
.mail {
  @include themed() {
    stroke: t("svgs");
    color: t("svgs");
  }
}
```

- [ ] **Step 2: Manual check**

Run: `npm run dev`. Confirm:
- Three buttons appear stacked vertically with clear spacing (no overlap).
- Sound button is fully visible.
- On hover each button rotates subtly.
- Theme is `light-theme` by default → sun icon should be visible (not moon).

- [ ] **Step 3: Commit**

```bash
git add src/style.scss
git commit -m "style(buttons): grouped vertical layout with single-state visibility"
```

---

### Task 6: Update `main.js` button logic to use classList

**Files:**
- Modify: `src/main.js:1697-1942` (mute, theme, weather handlers)

- [ ] **Step 1: Update `updateMuteState` to set the `is-muted` class**

In `src/main.js`, find the `updateMuteState` function (around line 1697). Replace the entire function with:

```javascript
const updateMuteState = (muted) => {
  muteToggleButton.classList.toggle("is-muted", muted);
  muteToggleButton.setAttribute("aria-pressed", String(muted));

  if (muted) {
    backgroundMusic.volume(0);
  } else {
    backgroundMusic.volume(BACKGROUND_MUSIC_VOLUME);
  }

  buttonSounds.click.mute(muted);
  Object.values(pianoSounds).forEach((sound) => {
    sound.mute(muted);
  });
};
```

- [ ] **Step 2: Simplify `handleMuteToggle` — remove inline `style.display`**

In `src/main.js`, find `handleMuteToggle` (around line 1710). Replace the body of the `onStart` callback that toggles `soundOffSvg.style.display` / `soundOnSvg.style.display`. The new `handleMuteToggle` is:

```javascript
const handleMuteToggle = (e) => {
  e.preventDefault();

  isMuted = !isMuted;
  updateMuteState(isMuted);
  buttonSounds.click.play();

  if (!backgroundMusic.playing()) {
    backgroundMusic.play();
  }

  gsap.to(muteToggleButton, {
    rotate: -45,
    scale: 1.5,
    duration: 0.5,
    ease: "back.out(2)",
    onComplete: () => {
      gsap.set(muteToggleButton, { clearProps: "all" });
    },
  });
};
```

Note: The nested gsap timeline was redundant — replaced with a single tween. The class toggle in `updateMuteState` already handles the SVG swap via CSS.

- [ ] **Step 3: Simplify `handleThemeToggle` — remove inline `style.display`**

Find `handleThemeToggle` (around line 1793). Replace with:

```javascript
const handleThemeToggle = (e) => {
  e.preventDefault();

  const isDark = document.body.classList.contains("dark-theme");
  document.body.classList.remove(isDark ? "dark-theme" : "light-theme");
  document.body.classList.add(isDark ? "light-theme" : "dark-theme");

  isNightMode = !isNightMode;
  themeToggleButton.classList.toggle("is-night", isNightMode);
  themeToggleButton.setAttribute("aria-pressed", String(isNightMode));
  buttonSounds.click.play();

  Object.values(roomMaterials).forEach((material) => {
    gsap.to(material.uniforms.uMixRatio, {
      value: isNightMode ? 1 : 0,
      duration: 1.5,
      ease: "power2.inOut",
    });
  });

  gsap.to(themeToggleButton, {
    rotate: 45,
    scale: 1.5,
    duration: 0.5,
    ease: "back.out(2)",
    onComplete: () => {
      gsap.set(themeToggleButton, { clearProps: "all" });
    },
  });
};
```

Note: removed the `toggleFavicons()` call (we now have a single favicon set shared between themes). Also removed the nested gsap timeline. The `is-night` class drives SVG visibility via CSS.

- [ ] **Step 4: Delete the now-unused `toggleFavicons` function and the now-unused DOM refs**

In `src/main.js`, delete:
- The entire `toggleFavicons` function (lines around 1770-1789).
- The `sunSvg`, `moonSvg`, `soundOffSvg`, `soundOnSvg` const declarations (around line 1692-1695) — they're no longer referenced.

The block at line 1689-1695 should now read:

```javascript
const themeToggleButton = document.querySelector(".theme-toggle-button");
const weatherToggleButton = document.querySelector(".weather-toggle-button");
const muteToggleButton = document.querySelector(".mute-toggle-button");
```

- [ ] **Step 5: Refactor `handleWeatherToggle` — classList instead of inline `style.display`**

Find `handleWeatherToggle` (around line 1863). Replace the entire function with:

```javascript
const weatherTypes = ["snow", "rain", "sun", "leaves"];

const handleWeatherToggle = (e) => {
  e.preventDefault();

  const currentIndex = weatherTypes.indexOf(currentWeather);
  const nextIndex = (currentIndex + 1) % weatherTypes.length;
  currentWeather = weatherTypes[nextIndex];

  buttonSounds.click.play();

  // Hide all weather systems first
  snowSystem.visible = false;
  rainSystem.visible = false;
  leavesSystem.visible = false;

  // Show selected system
  if (currentWeather === "snow") snowSystem.visible = true;
  else if (currentWeather === "rain") rainSystem.visible = true;
  else if (currentWeather === "leaves") leavesSystem.visible = true;

  // Update button state class — single source of truth for SVG visibility
  weatherToggleButton.classList.remove(
    "weather-snow",
    "weather-rain",
    "weather-sun",
    "weather-leaf"
  );
  weatherToggleButton.classList.add(`weather-${currentWeather}`);

  gsap.to(weatherToggleButton, {
    rotate: 360,
    scale: 1.3,
    duration: 0.4,
    ease: "back.out(2)",
    onComplete: () => {
      gsap.set(weatherToggleButton, { clearProps: "all" });
    },
  });
};
```

- [ ] **Step 6: Remove the stale `let currentWeather = 'snow';` if duplicated**

Search `src/main.js` for `currentWeather`. There's an existing declaration at line ~941 (`let currentWeather = 'snow';`). The `weatherTypes` const above should NOT redeclare `currentWeather`. Verify only one `let currentWeather` exists. If the new `weatherTypes` block is placed inside the function (which it is — see step 5), there's no conflict. If you find a duplicate declaration, remove the one inside `handleWeatherToggle`.

- [ ] **Step 7: Manual check**

Run: `npm run dev`. Verify in browser:
- Click mute → SVG swaps (on↔off) cleanly, no flicker.
- Click theme → SVG swaps (sun↔moon), scene darkens/lightens, favicon stable.
- Click weather → SVG cycles (snow→rain→sun→leaves), only one icon visible at a time, particle system swaps.
- Inspect element on each button → confirm only one SVG has `display: block` per button.

- [ ] **Step 8: Commit**

```bash
git add src/main.js
git commit -m "refactor(buttons): use classList for single-state SVG visibility"
```

---

### Task 7: Update `.work` modal data (projects + opensources)

**Files:**
- Modify: `index.html` (the `.work` modal block, around lines 137-438)

- [ ] **Step 1: Replace the entire `.work .modal-content-wrapper` inner content**

Open `index.html`, find the `<div class="work modal">` block. Inside, locate the `<div class="modal-content-wrapper">` and replace everything inside it (from `<h2 class="section-title">Projects</h2>` through the closing of the wrapper) with:

```html
            <h2 class="section-title">Projects</h2>
            <div class="projects-grid">

              <div class="work-project">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/projects/acb.png" alt="ACB Bank Official Website" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">ACB Bank</h2>
                    <p class="modal-paragraph-text">New official website for ACB Bank — one of Vietnam's leading commercial banks, delivering a modern digital banking experience.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: Full-stack, Banking system</p>
                  </div>
                </div>
              </div>

              <div class="work-project">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/projects/ski.png" alt="Ski Vacation Platform" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">Ski</h2>
                    <p class="modal-paragraph-text">Platform dedicated to simplifying and enhancing ski vacation planning and booking experiences and blogs.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: Full-stack, System Design</p>
                  </div>
                </div>
              </div>

              <div class="work-project">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/projects/valo.png" alt="VALOvietnam E-commerce Platform" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">VALOvietnam</h2>
                    <p class="modal-paragraph-text">Platform designed for suppliers and administrators to manage supplier side, and ecommerce website for buyers.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: Technical Lead, AI Focused</p>
                  </div>
                </div>
              </div>

              <div class="work-project">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/projects/balance.webp" alt="Balance Agriculture E-commerce" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">Balance</h2>
                    <p class="modal-paragraph-text">Agriculture E-commerce platform for connecting products and services between farmers and consumers.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: Full-stack, Solution Focused</p>
                  </div>
                </div>
              </div>

              <div class="work-project">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/projects/thermomix.png" alt="Thermomix Product Platform" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">Thermomix</h2>
                    <p class="modal-paragraph-text">Digital platform and companion experience for Thermomix smart kitchen appliances, enhancing the cooking journey.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: Full-stack, Frontend Focused</p>
                  </div>
                </div>
              </div>

            </div>

            <h2 class="section-title">Open Source</h2>
            <div class="projects-grid">

              <a class="work-project" href="https://github.com/dungnotnull/hybrid-harness-chaos-process-prm" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/opensources/harnessanhchaos.png" alt="Hybrid Harness Chaos PRM" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">Hybrid Harness Chaos PRM</h2>
                    <p class="modal-paragraph-text">Comprehensive AI Agent skill framework standardizing Harness &amp; Chaos Engineering workflows.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: Python, AI Agents, DevOps</p>
                  </div>
                </div>
              </a>

              <a class="work-project" href="https://github.com/dungnotnull/openCLI-all-your-LLM-just-need" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/opensources/opencli.png" alt="OpenCLI" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">OpenCLI</h2>
                    <p class="modal-paragraph-text">Unified self-improving AI CLI agent optimized for 12+ LLMs with context compression and cost tracking.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: TypeScript, LLMs, Docker</p>
                  </div>
                </div>
              </a>

              <a class="work-project" href="https://github.com/dungnotnull/futureminal2" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/opensources/futureminal2.png" alt="Futureminal2" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">Futureminal2</h2>
                    <p class="modal-paragraph-text">AI-native operating environment for developers combining intelligent terminals and automation.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: Rust, AI, Workflows</p>
                  </div>
                </div>
              </a>

              <a class="work-project" href="https://github.com/dungnotnull/scam-whisperer-agent" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/opensources/scam.png" alt="Scam Whisperer" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">Scam Whisperer</h2>
                    <p class="modal-paragraph-text">Vision-first scam analysis platform detecting phishing, impersonation, and social engineering attacks.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: TypeScript, CV, Security</p>
                  </div>
                </div>
              </a>

              <a class="work-project" href="https://github.com/dungnotnull/wifi-sensing-based-elderlycare-deeplearning" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/opensources/wifielderly.png" alt="WiFi Elderly Care" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">WiFi Elderly Care</h2>
                    <p class="modal-paragraph-text">Contactless elderly care monitoring using WiFi CSI with deep learning for activity recognition.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: C, Python, Deep Learning</p>
                  </div>
                </div>
              </a>

              <a class="work-project" href="https://github.com/dungnotnull/ticket-suspicion-multicamera-pipeline-computer-vision" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">
                <div class="work-project-wrapper">
                  <div class="work-image-wrapper">
                    <img class="work-base-image" src="/images/opensources/multicamera.png" alt="Multi-Camera Pipeline" />
                  </div>
                  <div class="paragraph-section">
                    <h2 class="modal-paragraph-header">Multi-Camera Pipeline</h2>
                    <p class="modal-paragraph-text">Multi-camera video analytics for detecting suspected cases with multi-object tracking and ReID.</p>
                    <p class="modal-paragraph-text sm-margin-top sm-font">Skills: Jupyter, Python, CV</p>
                  </div>
                </div>
              </a>

              <div class="linkedin-cta-wrapper">
                <a href="https://github.com/dungnotnull" target="_blank" rel="noopener noreferrer" class="linkedin-cta-button">
                  More 200+ opensources in Github →
                </a>
              </div>

            </div>
```

Note: opensource cards are wrapped in `<a>` for clickability. Inline `style` on each `<a>` prevents default link styling from breaking the card layout. (Could be moved to a SCSS rule in a follow-up, but inline is surgical.)

- [ ] **Step 2: Manual check**

Run: `npm run dev`. Click the work/projects hot-zone in the 3D scene (or trigger the work modal). Verify:
- 5 project cards display with new images and text.
- 6 opensource cards display with new images, descriptions, and clickable.
- CTA button shows "More 200+ opensources in Github →".
- No broken-image icons (all 11 thumbnails resolve).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(data): replace work modal with new projects and opensources data"
```

---

### Task 8: Update `.about` modal — tech stack and AI agents

**Files:**
- Modify: `index.html` (the `.about .modal-content-wrapper` block, around lines 444-614)

- [ ] **Step 1: Replace the Tech Stack section**

Open `index.html`, find the `.about` modal. Locate the block starting with `<h2 class="modal-paragraph-header xsm-margin-top">~ Tech Stack ~</h2>` and replace the three sub-sections (`Languages & Frameworks`, `AI & Machine Learning`, `Infrastructure & Tools`) with this single grid containing 12 inline-SVG tech items:

```html
              <h2 class="modal-paragraph-header xsm-margin-top">~ Tech Stack ~</h2>
              <div class="tech-grid">

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>
                  </div>
                  <span class="tech-name">Python</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.193 5.193 0 0 0-.717-.26 5.546 5.546 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164A5.544 5.544 0 0 1 12 21.412v-2.65c.388.293.83.534 1.32.723.49.19.98.346 1.47.467.49.122.94.18 1.35.18.336 0 .636-.03.9-.09.264-.06.487-.152.672-.275a1.1 1.1 0 0 0 .42-.466c.096-.187.144-.396.144-.627 0-.234-.05-.448-.15-.642a1.693 1.693 0 0 0-.438-.532c-.193-.163-.434-.323-.722-.48a13.503 13.503 0 0 0-1.02-.471c-.472-.2-.89-.41-1.255-.628a4.763 4.763 0 0 1-.945-.69 2.856 2.856 0 0 1-.612-.864 2.9 2.9 0 0 1-.218-1.16c0-.622.12-1.162.36-1.62.24-.46.572-.84.996-1.144.424-.304.929-.534 1.514-.69.585-.156 1.219-.234 1.9-.234zM3.564 9.75h9.156v2.16H9.42v9.84H6.864v-9.84H3.564z"/></svg>
                  </div>
                  <span class="tech-name">TypeScript</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M23.8346 11.7033c-.0165-.0415-.0185-.0813-.0385-.1238l-.003-.0073c-.0062-.0128-.0185-.0257-.026-.0386-.0217-.0347-.0456-.0653-.0712-.0958-.0123-.0148-.0246-.0294-.0386-.0435a.6816.6816 0 0 0-.0823-.0702.5666.5666 0 0 0-.0418-.0314l-.0294-.0233L13.4028 4.1087c-.3705-.2878-.8846-.3258-1.2973-.0338L1.5144 11.2702l-.0314.0233-.0418.0314a.6816.6816 0 0 0-.0823.0702c-.014.014-.0263.0287-.0386.0435a.7104.7104 0 0 0-.0712.0958c-.0075.0129-.0198.0258-.026.0386l-.003.0073c-.02.0425-.022.0823-.0385.1238C1.214 11.7489 1.2 11.7955 1.2 11.842v.0235c.0275.1653.1584.2945.3261.2945h1.8477v9.8473h-.8254a.5017.5017 0 0 0-.5013.5013v.7308c0 .2761.2251.5013.5013.5013h17.3026c.2762 0 .5013-.2252.5013-.5013v-.7308a.5017.5017 0 0 0-.5013-.5013h-.8254v-9.8473h1.8478c.1962 0 .3553-.1587.3553-.3554v-.0033c0-.0465-.014-.0931-.0278-.1392zM7.4562 12.16v9.8473H5.0607V12.16zm4.1474 0v9.8473H9.2083V12.16zm4.1474 0v9.8473h-2.3955V12.16zm4.1473 0v9.8473h-2.3954V12.16z"/></svg>
                  </div>
                  <span class="tech-name">Rust</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M 12 0 C 8.454545 0 5.454545 1.963636 3.927273 4.909091 L 1.090909 8.181818 C 0.436364 8.290909 0 8.727273 0 9.272727 L 0 14.727273 C 0 15.272727 0.436364 15.709091 1.090909 15.818182 L 3.927273 19.090909 C 5.454545 22.036364 8.454545 24 12 24 C 15.545455 24 18.545455 22.036364 20.072727 19.090909 L 22.909091 15.818182 C 23.563636 15.709091 24 15.272727 24 14.727273 L 24 9.272727 C 24 8.727273 23.563636 8.290909 22.909091 8.181818 L 20.072727 4.909091 C 18.545455 1.963636 15.545455 0 12 0 z M 12 6 C 14.181818 6 16.145455 7.418182 16.909091 9.454545 L 17.890909 9.454545 C 17.018182 6.981818 14.727273 5.454545 12 5.454545 C 9.272727 5.454545 6.981818 6.981818 6.109091 9.454545 L 7.090909 9.454545 C 7.854545 7.418182 9.818182 6 12 6 z M 12 18 C 9.818182 18 7.854545 16.581818 7.090909 14.545455 L 6.109091 14.545455 C 6.981818 17.018182 9.272727 18.545455 12 18.545455 C 14.727273 18.545455 17.018182 17.018182 17.890909 14.545455 L 16.909091 14.545455 C 16.145455 16.581818 14.181818 18 12 18 z"/></svg>
                  </div>
                  <span class="tech-name">React</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.978-0.786,1.395-2.642,1.395 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>
                  </div>
                  <span class="tech-name">Node.js</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 0L11.54 0v24l4.095-2.378V7.603l6.167 3.564-.015-5.31z"/></svg>
                  </div>
                  <span class="tech-name">TensorFlow</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12.005 0L4.952 1.546v4.05L0 8.879l1.545 1.544L0 11.967l1.545 1.544L0 14.055l4.952 4.952V24l7.053-1.546L19.058 24v-5.052L24 14.055l-1.546-1.544L24 11.967l-1.546-1.544L24 8.879l-4.942-3.282v-4.05L12.005 0zm-.022 2.298l4.415 1.6v8.793l-4.415 1.6-4.414-1.6V3.898l4.414-1.6z"/></svg>
                  </div>
                  <span class="tech-name">PyTorch</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M17.128 0L8.872 0C6.39 0 4.368 2.021 4.368 4.503l0 10.495C4.368 17.433 6.165 19.492 8.5 19.854l0 2.646L11.5 24l0-4.146 1 0 0 4.146 3 0 0-2.646c2.335-.362 4.132-2.421 4.132-4.856L19.632 4.503C19.632 2.021 17.61 0 17.128 0z M12 5.5l3.5 2.021 0 4.04L12 13.58l-3.5-2.02 0-4.04L12 5.5z"/></svg>
                  </div>
                  <span class="tech-name">PostgreSQL</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M17.193 9.555c-1.264-5.66-4.252-7.44-4.573-8.115-.28-.39-.475-.88-.475-.88v.013c-.064.13-.16.27-.16.27s-.193.55-.495.93c-.32.42-4.252 2.46-4.573 8.115-.32 5.654 4.252 8.39 4.252 8.39v.013l.012.013c.39.65.65 1.39.65 1.39v-.013l.012-.013c.39-.65.65-1.39.65-1.39s4.572-2.736 4.252-8.39l.025.013.026-.013zm-5.193 7.39v-7.39l-2.91-1.65 2.91-1.65 2.91 1.65-2.91 1.65v7.39z"/></svg>
                  </div>
                  <span class="tech-name">MongoDB</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>
                  </div>
                  <span class="tech-name">Docker</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M6.763 10.036c.511-.022 1.012.083 1.482.287.46.204.878.511 1.215.884.347.362.619.79.81 1.245.19.466.297.956.314 1.456.022.5-.057.992-.226 1.451-.18.46-.426.866-.763 1.227-.336.36-.727.654-1.175.866-.448.222-.934.343-1.434.383-.5.04-.99-.022-1.46-.18a4.079 4.079 0 0 1-1.27-.7 4.398 4.398 0 0 1-.926-1.108 5.277 5.277 0 0 1-.565-1.327 5.95 5.95 0 0 1-.199-1.46c.012-.5.094-.989.246-1.452.151-.474.375-.9.669-1.292.294-.39.654-.722 1.07-.982.404-.271.866-.466 1.345-.59Zm10.737-.182c.414.018.815.124 1.184.305.36.181.683.426.945.722.262.297.46.638.604 1.018.131.381.197.782.197 1.205 0 .425-.07.837-.21 1.227a3.737 3.737 0 0 1-.604 1.052 3.638 3.638 0 0 1-.93.78 3.94 3.94 0 0 1-1.16.461 4.42 4.42 0 0 1-1.296.076 4.527 4.527 0 0 1-1.243-.285 4.207 4.207 0 0 1-1.07-.617 3.815 3.815 0 0 1-.83-.92 4.314 4.314 0 0 1-.525-1.18 5.07 5.07 0 0 1-.18-1.4c.025-.483.13-.94.325-1.373.196-.434.46-.81.786-1.13.325-.32.71-.573 1.142-.758a3.66 3.66 0 0 1 1.402-.297Z M0 11.622c.04-1.314.326-2.582.858-3.802a9.677 9.677 0 0 1 2.219-3.197A10.278 10.278 0 0 1 6.305 2.43 11.064 11.064 0 0 1 10.137 1.5c1.326-.117 2.654-.03 3.96.266a10.494 10.494 0 0 1 3.5 1.51c.5.343.964.734 1.392 1.165.428.43.815.902 1.158 1.41a8.715 8.715 0 0 1 1.158 2.41 9.04 9.04 0 0 1 .428 1.736c.088.59.117 1.184.085 1.782a9.31 9.31 0 0 1-.266 1.75 8.446 8.446 0 0 1-.602 1.633 8.078 8.078 0 0 1-.893 1.45c-.354.439-.748.83-1.18 1.18a8.026 8.026 0 0 1-1.43.934 8.498 8.498 0 0 1-1.6.645 9.058 9.058 0 0 1-1.738.328 8.65 8.65 0 0 1-1.793.022c-.6-.04-1.183-.13-1.75-.266a8.566 8.566 0 0 1-1.633-.604 8.026 8.026 0 0 1-1.45-.893c-.439-.354-.83-.748-1.18-1.18a8.013 8.013 0 0 1-.934-1.43 8.498 8.498 0 0 1-.645-1.6 9.058 9.058 0 0 1-.328-1.738 8.65 8.65 0 0 1-.022-1.793Z"/></svg>
                  </div>
                  <span class="tech-name">AWS</span>
                </div>

                <div class="tech-item">
                  <div class="tech-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12.504 0c-.155 0-.315.008-.48.021C4.264.286-.165 4.378.005 12.216c.168 7.832 4.56 11.762 12.019 11.781 7.498-.019 11.817-3.95 11.982-11.781C24.187 4.378 19.701 0 12.504 0zm0 1.5c6.471 0 10.682 3.71 10.682 10.716 0 7.046-4.214 10.766-10.682 10.781-6.466-.015-10.681-3.735-10.681-10.781C1.823 5.21 6.034 1.5 12.504 1.5zm-.391 2.625c-1.273.025-2.594.415-3.696.969-1.398.703-2.498 1.93-2.866 3.484-.394 1.673-.019 3.632 1.197 4.853 1.218 1.225 2.469 1.969 4.057 2.094-.469.729-1.001 1.401-1.582 2.063-.563.653-1.184 1.284-1.842 1.938 1.36-.5 2.504-.865 3.925-1.063 1.421-.198 2.866-.18 4.292-.18-.556-.646-1.079-1.32-1.567-2.031-.484-.703-.924-1.453-1.317-2.234 1.582-.396 2.842-1.005 3.778-1.859 1.054-.964 1.566-2.294 1.566-3.706 0-1.422-.516-2.75-1.582-3.719-1.063-.969-2.404-1.469-3.778-1.469-.198 0-.398.013-.598.031-.078-.026-.18-.051-.296-.063-.035-.014-.078-.022-.13-.031h-.063zm.95 1.469c.788 0 1.426.245 1.953.719.516.476.781 1.071.781 1.876 0 .794-.265 1.408-.781 1.874-.526.476-1.165.719-1.953.719-.794 0-1.437-.245-1.97-.719-.534-.476-.812-1.087-.812-1.874 0-.792.278-1.4.812-1.876.533-.474 1.176-.719 1.97-.719z"/></svg>
                  </div>
                  <span class="tech-name">Linux</span>
                </div>

              </div>
```

- [ ] **Step 2: Add the "+ more" card to AI Agents section**

In the same `.about` modal, find the AI Agents block ending with the Cursor card (around line 614, right before the closing `</div>` of `ai-grid`). Insert this card just before that closing `</div>`:

```html
                <div class="ai-item ai-item--more">
                  <div class="ai-icon">
                    <span class="ai-more-dots">+ ···</span>
                  </div>
                  <span class="ai-name">more</span>
                </div>
```

- [ ] **Step 3: Add SCSS for `.tech-icon` container**

Open `src/style.scss`. Find the existing `.tech-item img` rule (around line 1055). After that rule, add:

```scss
.tech-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: vars.$base-purple;

  svg {
    width: 100%;
    height: 100%;
  }

  @include themed() {
    color: t("svgs");
  }

  @include media.media("<=tablet") {
    width: 40px;
    height: 40px;
  }
}

.ai-item--more {
  border-style: dashed;
  background-color: transparent;
  opacity: 0.7;
}

.ai-more-dots {
  font-size: 1.6rem;
  font-family: "Motley Forces";
  letter-spacing: 2px;
  @include themed() { color: t("svgs"); }
}
```

- [ ] **Step 4: Manual check**

Run: `npm run dev`. Open the `.about` modal. Verify:
- 12 tech cards display with inline SVG icons in purple.
- Hover effects (lift + rotate) work.
- AI agents grid shows 7 items + the "+ more" dashed card at the end.
- No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html src/style.scss
git commit -m "feat(data): update about modal tech stack with inline SVG icons and add more card"
```

---

### Task 9: Create butterfly creature system

**Files:**
- Create: `src/shaders/butterflies/vertex.glsl`
- Create: `src/shaders/butterflies/fragment.glsl`

- [ ] **Step 1: Create the vertex shader**

Create `src/shaders/butterflies/vertex.glsl`:

```glsl
uniform float uTime;

attribute float aOffset;
attribute float aSpeed;
attribute vec3 aColor;
attribute vec3 aCenter;
attribute float aRadius;

varying vec3 vColor;
varying vec2 vUv;

void main() {
  vUv = uv;
  vColor = aColor;

  // Wing flutter: scale x position by sin wave for flapping effect
  float flap = abs(sin(uTime * 8.0 + aOffset * 6.28));
  vec3 pos = position;
  pos.x *= mix(0.2, 1.0, flap);

  // Position the plane around its center
  vec3 center = aCenter;
  float angle = uTime * aSpeed + aOffset * 6.28;
  center.x += sin(angle) * aRadius;
  center.y += cos(angle * 0.7) * aRadius * 0.3;
  center.z += sin(angle * 0.5 + aOffset * 1.3) * aRadius;

  // Face the direction of movement
  float yaw = atan(cos(angle * 0.7), sin(angle));
  float c = cos(yaw);
  float s = sin(yaw);
  vec3 rotated;
  rotated.x = pos.x * c - pos.z * s;
  rotated.z = pos.x * s + pos.z * c;
  rotated.y = pos.y;
  pos = rotated + center;

  // Billboard: rotate to face camera (approximate, only Y axis)
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
```

- [ ] **Step 2: Create the fragment shader**

Create `src/shaders/butterflies/fragment.glsl`:

```glsl
uniform float uTime;

varying vec3 vColor;
varying vec2 vUv;

void main() {
  // Wing shape: ellipse mask
  vec2 p = vUv - 0.5;
  float dist = length(p * vec2(1.5, 1.0));
  float wing = smoothstep(0.5, 0.3, dist);

  // Wing pattern: subtle gradient + edge darkening
  float pattern = smoothstep(0.0, 0.5, length(p));
  vec3 color = mix(vColor * 1.2, vColor * 0.6, pattern);

  // Soft body line down the center
  float body = smoothstep(0.05, 0.0, abs(vUv.x - 0.5)) * smoothstep(0.5, 0.2, abs(vUv.y - 0.5));
  color = mix(color, vec3(0.1, 0.05, 0.0), body * 0.6);

  if (wing < 0.01) discard;
  gl_FragColor = vec4(color, wing);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/shaders/butterflies/
git commit -m "feat(creatures): add butterfly shader for wing flutter and path animation"
```

---

### Task 10: Create cloud creature system shaders

**Files:**
- Create: `src/shaders/clouds/vertex.glsl`
- Create: `src/shaders/clouds/fragment.glsl`

- [ ] **Step 1: Create the vertex shader**

Create `src/shaders/clouds/vertex.glsl`:

```glsl
uniform float uTime;

attribute float aOffset;
attribute float aSpeed;

varying vec2 vUv;
varying float vAlpha;

void main() {
  vUv = uv;
  vAlpha = 1.0;

  vec3 pos = position;
  // Subtle scale pulse
  float pulse = 1.0 + 0.04 * sin(uTime * 0.6 + aOffset);
  pos *= pulse;

  // Drift along x; wrapping handled CPU-side
  pos.x += mod(uTime * aSpeed + aOffset * 10.0, 50.0) - 25.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
```

- [ ] **Step 2: Create the fragment shader**

Create `src/shaders/clouds/fragment.glsl`:

```glsl
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;
varying float vAlpha;

void main() {
  // Soft blob: radial gradient
  float dist = length(vUv - 0.5);
  float blob = smoothstep(0.5, 0.0, dist);

  // Slight color variation at edges
  vec3 color = mix(uColor, uColor * 0.85, smoothstep(0.2, 0.5, dist));

  gl_FragColor = vec4(color, blob * uOpacity * vAlpha);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/shaders/clouds/
git commit -m "feat(creatures): add cloud shader for soft drifting blobs"
```

---

### Task 11: Create fireflies creature system shaders

**Files:**
- Create: `src/shaders/fireflies/vertex.glsl`
- Create: `src/shaders/fireflies/fragment.glsl`

- [ ] **Step 1: Create the vertex shader**

Create `src/shaders/fireflies/vertex.glsl`:

```glsl
uniform float uTime;

attribute float aSize;
attribute float aPhase;
attribute vec3 aCenter;
attribute float aRadius;

void main() {
  vec3 pos = aCenter;
  float t = uTime + aPhase;
  pos.x += sin(t * 0.8) * aRadius;
  pos.y += cos(t * 1.1 + aPhase) * aRadius * 0.5;
  pos.z += sin(t * 0.6 + aPhase * 1.7) * aRadius;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  // Pulse glow size
  float pulse = 0.7 + 0.5 * sin(uTime * 3.0 + aPhase);
  gl_PointSize = aSize * pulse * (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
```

- [ ] **Step 2: Create the fragment shader**

Create `src/shaders/fireflies/fragment.glsl`:

```glsl
uniform vec3 uColor;
uniform float uOpacity;

void main() {
  vec2 uv = gl_PointCoord;
  float dist = length(uv - 0.5);
  float glow = smoothstep(0.5, 0.0, dist);
  float core = smoothstep(0.2, 0.0, dist);

  vec3 color = mix(uColor, vec3(1.0, 1.0, 0.8), core);
  gl_FragColor = vec4(color, glow * uOpacity);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/shaders/fireflies/
git commit -m "feat(creatures): add firefly shader for glowing points"
```

---

### Task 12: Create plant creature system shaders

**Files:**
- Create: `src/shaders/plants/vertex.glsl`
- Create: `src/shaders/plants/fragment.glsl`

- [ ] **Step 1: Create the vertex shader**

Create `src/shaders/plants/vertex.glsl`:

```glsl
uniform float uTime;

// Stem sway: top vertices sway more than bottom (assumes geometry has Y-up with origin at base)
void main() {
  vec3 pos = position;
  float height = max(0.0, pos.y);
  float sway = sin(uTime * 1.5 + position.x * 2.0 + position.z * 2.0) * 0.05 * height;
  pos.x += sway;
  pos.z += sway * 0.6;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
```

- [ ] **Step 2: Create the fragment shader**

Create `src/shaders/plants/fragment.glsl`:

```glsl
uniform vec3 uColor;

void main() {
  gl_FragColor = vec4(uColor, 1.0);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/shaders/plants/
git commit -m "feat(creatures): add plant shader for gentle stem sway"
```

---

### Task 13: Create creatures.js module

**Files:**
- Create: `src/scripts/creatures.js`

- [ ] **Step 1: Create the module**

Create `src/scripts/creatures.js`:

```javascript
import * as THREE from "three";

import butterfliesVertexShader from "../shaders/butterflies/vertex.glsl";
import butterfliesFragmentShader from "../shaders/butterflies/fragment.glsl";
import cloudsVertexShader from "../shaders/clouds/vertex.glsl";
import cloudsFragmentShader from "../shaders/clouds/fragment.glsl";
import firefliesVertexShader from "../shaders/fireflies/vertex.glsl";
import firefliesFragmentShader from "../shaders/fireflies/fragment.glsl";
import plantsVertexShader from "../shaders/plants/vertex.glsl";
import plantsFragmentShader from "../shaders/plants/fragment.glsl";

const PASTEL_COLORS = [
  new THREE.Color("#f9a8d4"), // pink
  new THREE.Color("#c4b5fd"), // purple
  new THREE.Color("#fde68a"), // yellow
  new THREE.Color("#a7f3d0"), // mint
  new THREE.Color("#bfdbfe"), // sky
];

function createButterflies(scene) {
  const count = 10;
  const geometry = new THREE.PlaneGeometry(0.5, 0.4, 8, 1);

  const offsets = new Float32Array(count);
  const speeds = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const centers = new Float32Array(count * 3);
  const radii = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    offsets[i] = Math.random();
    speeds[i] = 0.3 + Math.random() * 0.4;
    const color = PASTEL_COLORS[i % PASTEL_COLORS.length];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    // Spread butterflies around upper-middle of the room
    centers[i * 3] = (Math.random() - 0.5) * 14;
    centers[i * 3 + 1] = 2 + Math.random() * 4;
    centers[i * 3 + 2] = (Math.random() - 0.5) * 14;
    radii[i] = 1 + Math.random() * 2;
  }

  // InstancedMesh via InstancedBufferGeometry
  const instanced = new THREE.InstancedBufferGeometry();
  instanced.index = geometry.index;
  instanced.attributes.position = geometry.attributes.position;
  instanced.attributes.uv = geometry.attributes.uv;
  instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 1));
  instanced.setAttribute("aSpeed", new THREE.InstancedBufferAttribute(speeds, 1));
  instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(colors, 3));
  instanced.setAttribute("aCenter", new THREE.InstancedBufferAttribute(centers, 3));
  instanced.setAttribute("aRadius", new THREE.InstancedBufferAttribute(radii, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: butterfliesVertexShader,
    fragmentShader: butterfliesFragmentShader,
    uniforms: { uTime: new THREE.Uniform(0) },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(instanced, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  return { mesh, material };
}

function createClouds(scene) {
  const count = 5;
  const geometry = new THREE.PlaneGeometry(3, 1.5);

  const offsets = new Float32Array(count);
  const speeds = new Float32Array(count);
  const centers = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    offsets[i] = Math.random();
    speeds[i] = 0.1 + Math.random() * 0.15;
    centers[i * 3] = (Math.random() - 0.5) * 20;
    centers[i * 3 + 1] = 8 + Math.random() * 3;
    centers[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
  }

  const instanced = new THREE.InstancedBufferGeometry();
  instanced.index = geometry.index;
  instanced.attributes.position = geometry.attributes.position;
  instanced.attributes.uv = geometry.attributes.uv;
  instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 1));
  instanced.setAttribute("aSpeed", new THREE.InstancedBufferAttribute(speeds, 1));
  instanced.setAttribute("aCenter", new THREE.InstancedBufferAttribute(centers, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: cloudsVertexShader,
    fragmentShader: cloudsFragmentShader,
    uniforms: {
      uTime: new THREE.Uniform(0),
      uColor: new THREE.Uniform(new THREE.Color("#ffffff")),
      uOpacity: new THREE.Uniform(0.7),
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(instanced, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  return { mesh, material };
}

function createFireflies(scene) {
  const count = 40;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const centers = new Float32Array(count * 3);
  const radii = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;
    sizes[i] = 2 + Math.random() * 2;
    phases[i] = Math.random() * 6.28;
    centers[i * 3] = (Math.random() - 0.5) * 16;
    centers[i * 3 + 1] = 1 + Math.random() * 5;
    centers[i * 3 + 2] = (Math.random() - 0.5) * 16;
    radii[i] = 0.3 + Math.random() * 0.8;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("aCenter", new THREE.BufferAttribute(centers, 3));
  geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    uniforms: {
      uTime: new THREE.Uniform(0),
      uColor: new THREE.Uniform(new THREE.Color("#ffe066")),
      uOpacity: new THREE.Uniform(0.85),
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  return { points, material };
}

function createPlants(scene) {
  const group = new THREE.Group();

  // Sway material (for foliage) — uniform-driven via uTime
  const swayMaterial = (color) =>
    new THREE.ShaderMaterial({
      vertexShader: plantsVertexShader,
      fragmentShader: plantsFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(color)),
      },
    });

  const stemMaterial = new THREE.MeshStandardMaterial({ color: "#3f6212" });

  // 6 plants scattered near piano area / corners
  const placements = [
    { x: -3, z: -1, flower: "#f472b6" },
    { x: 3.2, z: -1.4, flower: "#a78bfa" },
    { x: -2.5, z: 2.5, flower: "#fde047" },
    { x: 2.6, z: 2.3, flower: "#f9a8d4" },
    { x: 0, z: 3.2, flower: "#c084fc" },
    { x: -3.6, z: 0.5, flower: "#fbbf24" },
  ];

  const swayMaterials = [];

  for (const p of placements) {
    const plant = new THREE.Group();

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.07, 0.8, 6),
      stemMaterial
    );
    stem.position.y = 0.4;
    plant.add(stem);

    const flowerMat = swayMaterial(p.flower);
    swayMaterials.push(flowerMat);
    const flower = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.18, 0),
      flowerMat
    );
    flower.position.y = 0.95;
    plant.add(flower);

    plant.position.set(p.x, 0, p.z);
    group.add(plant);
  }

  scene.add(group);
  return { group, swayMaterials };
}

export function createCreatures(scene) {
  const butterflies = createButterflies(scene);
  const clouds = createClouds(scene);
  const fireflies = createFireflies(scene);
  const plants = createPlants(scene);

  function update(elapsedTime, nightMode) {
    butterflies.material.uniforms.uTime.value = elapsedTime;
    clouds.material.uniforms.uTime.value = elapsedTime;
    fireflies.material.uniforms.uTime.value = elapsedTime;
    for (const mat of plants.swayMaterials) {
      mat.uniforms.uTime.value = elapsedTime;
    }

    // Fireflies brighter at night, dimmer in day (but still visible)
    fireflies.material.uniforms.uOpacity.value = nightMode ? 0.9 : 0.25;

    // Clouds slightly more visible at day
    clouds.material.uniforms.uOpacity.value = nightMode ? 0.4 : 0.7;
  }

  return { butterflies, clouds, fireflies, plants, update };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/scripts/creatures.js
git commit -m "feat(creatures): add creatures module orchestrating 4 systems"
```

---

### Task 14: Wire creatures into `main.js`

**Files:**
- Modify: `src/main.js` (imports + scene setup + render loop)

- [ ] **Step 1: Add the creatures import**

At the top of `src/main.js`, after the existing shader imports (around line 19), add:

```javascript
import { createCreatures } from "./scripts/creatures.js";
```

- [ ] **Step 2: Initialize creatures after scene setup**

Find the line `scene.add(smoke);` (around line 890, end of smoke setup). Immediately after that line, add:

```javascript
/** -------------------------- Cute Creatures -------------------------- */
const creatures = createCreatures(scene);
```

- [ ] **Step 3: Call `creatures.update()` in the render loop**

Find the `render` function (around line 1963). After the `if (leavesSystem && leavesSystem.visible) { ... }` block (around line 1982), add:

```javascript
  // Update cute creatures
  if (creatures) {
    creatures.update(elapsedTime, isNightMode);
  }
```

- [ ] **Step 4: Manual check**

Run: `npm run dev`. Verify:
- No console errors (especially no shader compile errors).
- 10 butterflies flutter around the room (multi-colored pastel).
- 5 clouds drift slowly through the upper portion.
- 40 fireflies glow (dim during day, bright at night after clicking theme toggle).
- 6 plants with flowers sway gently near the floor.

- [ ] **Step 5: Commit**

```bash
git add src/main.js
git commit -m "feat(creatures): wire creatures module into scene and render loop"
```

---

### Task 15: Final verification with `/final-before-start-dev`

**Files:** None modified — verification only.

- [ ] **Step 1: Run the final verification skill**

Invoke the `/final-before-start-dev` skill. This will:
- Start the dev server.
- Kill conflicting processes.
- Monitor for compile/runtime errors.
- Auto-fix any issues.

- [ ] **Step 2: Browser walkthrough checklist**

In the browser, walk through:
1. Loading screen → click button → room visible.
2. **Buttons**: all 3 visible, no overlap, click each → SVG swaps cleanly, only one state visible.
3. **Mute**: music starts/stops, icon swaps.
4. **Theme**: scene darkens/lightens, favicon stays as monogram D, fireflies brighten at night.
5. **Weather**: cycles snow→rain→sun→leaves, particle system swaps.
6. **Creatures**: butterflies flutter, clouds drift, fireflies glow, plants sway.
7. **Work modal**: 5 new projects + 6 new opensources, opensources clickable, CTA reads "More 200+ opensources in Github →".
8. **About modal**: 12 tech icons + 7 AI agents + "+ more" card.
9. **SEO**: view-source → all meta tags, JSON-LD present. Validate JSON-LD at https://validator.schema.org/ if possible.
10. **Favicon**: browser tab shows monogram D.
11. **Responsive**: resize to ~768px → button group compacts, modals scroll.

- [ ] **Step 3: Final commit if any tweaks were made**

```bash
git status
git add -A
git commit -m "chore: final tweaks after verification"
```

---

## Self-Review

**1. Spec coverage:**
- Data update (projects/opensources/tech/AI): Tasks 7, 8 ✓
- Button text "More 200+ opensources in Github →": Task 7 ✓
- SEO (full): Tasks 2, 3 ✓
- Favicon (monogram D): Task 1 ✓
- Button layout fix + single-state visibility: Tasks 4, 5, 6 ✓
- 4 creatures (butterflies, clouds, fireflies, plants): Tasks 9-14 ✓
- Verification: Task 15 ✓

**2. Placeholder scan:** No "TBD", "implement later", or vague instructions. Plant placement uses explicit coordinates. All code blocks contain real code.

**3. Type/name consistency:**
- CSS class names: `is-muted`, `is-night`, `weather-{type}` consistent across HTML, SCSS, JS.
- Shader attribute names: `aOffset`, `aSpeed`, `aColor`, `aCenter`, `aRadius`, `aPhase`, `aSize` consistent between glsl files and `creatures.js`.
- Uniform names: `uTime`, `uColor`, `uOpacity` consistent.
- Function `createCreatures(scene)` signature matches import in `main.js`.
- `creatures.update(elapsedTime, nightMode)` signature matches call in `render()`.
- `isNightMode` already exists as `let` in `main.js` (line 1791) — referenced correctly.

**4. Risk notes:**
- `sharp` on Windows: prebuilt binaries available; if install fails, SVG favicon covers modern browsers, manual PNG export as fallback.
- Shader compile errors: best caught at first `npm run dev` after Task 14. Common pitfalls: typo in attribute names, missing semicolons, wrong varying names. Manual check step in Task 14 will surface these.
- Plant placement coordinates are best-guess based on existing scene; final task includes visual verification and tweaking opportunity.
