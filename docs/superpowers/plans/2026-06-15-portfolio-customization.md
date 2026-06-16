# Portfolio Customization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the forked 3D room portfolio from Kim Soo-ah's kawaii aesthetic to Hoang Dung's tech-focused AI agent engineer branding with dark theme + purple accent, while preserving the interactive 3D room experience.

**Architecture:** Direct modification of existing vanilla JS/Three.js codebase - no framework changes. Replace 2D content (colors, text, images) while keeping 3D scene intact. Copy assets from source portfolio, update modal content in HTML, modify color variables in SCSS/JS.

**Tech Stack:** Vanilla JavaScript, Three.js, GSAP, SCSS, Vite (existing stack)

---

## File Structure

**Files to modify:**
- `index.html` - Update meta tags, title, loading screen, all modal content
- `src/style.scss` - Update color scheme variables and selectors
- `src/main.js` - Update color variables, image references, modal interactions

**Assets to copy:**
- `public/images/` - Copy profile picture, tech stack icons from source
- `public/media/` - Update Open Graph image
- Create placeholder project screenshots

**New directories to create:**
- `public/images/tech/` - Tech stack icons

---

### Task 1: Setup - Copy Assets from Source Portfolio

**Files:**
- Copy from: `D:\my-modern-portfolio-space\public\images\`
- Copy to: `public/images/tech/`

- [ ] **Step 1: Create tech images directory**

Run:
```bash
mkdir -p "public/images/tech"
```

Expected: Directory created successfully

- [ ] **Step 2: Copy profile picture**

Run:
```bash
copy "D:\my-modern-portfolio-space\public\images\ava.jpg" "public\images\profile_pic.jpg"
```

Expected: File copied to `public/images/profile_pic.jpg`

- [ ] **Step 3: Copy tech stack icons**

Run:
```bash
copy "D:\my-modern-portfolio-space\public\images\node.webp" "public\images\tech\node.webp"
copy "D:\my-modern-portfolio-space\public\images\react.webp" "public\images\tech\react.webp"
copy "D:\my-modern-portfolio-space\public\images\typescript.webp" "public\images\tech\typescript.webp"
copy "D:\my-modern-portfolio-space\public\images\next.webp" "public\images\tech\next.webp"
copy "D:\my-modern-portfolio-space\public\images\javascript.webp" "public\images\tech\javascript.webp"
copy "D:\my-modern-portfolio-space\public\images\python.webp" "public\images\tech\python.webp" || echo "python.webp not found, skipping"
```

Expected: Tech stack icons copied to `public/images/tech/`

- [ ] **Step 4: Copy other tech icons**

Run:
```bash
copy "D:\my-modern-portfolio-space\public\images\mongo.webp" "public\images\tech\mongo.webp"
copy "D:\my-modern-portfolio-space\public\images\mysql.webp" "public\images\tech\mysql.webp"
copy "D:\my-modern-portfolio-space\public\images\express.webp" "public\images\tech\express.webp"
copy "D:\my-modern-portfolio-space\public\images\node2.webp" "public\images\tech\node2.webp"
copy "D:\my-modern-portfolio-space\public\images\next1.webp" "public\images\tech\next1.webp"
copy "D:\my-modern-portfolio-space\public\images\next2.webp" "public\images\tech\next2.webp"
copy "D:\my-modern-portfolio-space\public\images\react2.webp" "public\images\tech\react2.webp"
copy "D:\my-modern-portfolio-space\public\images\nextBL.webp" "public\images\tech\nextBL.webp"
```

Expected: Additional tech icons copied

- [ ] **Step 5: Verify copied assets**

Run:
```bash
ls public/images/tech/
```

Expected: List of copied tech icons (node.webp, react.webp, typescript.webp, etc.)

- [ ] **Step 6: Commit**

```bash
git add public/images/
git commit -m "feat: copy tech stack icons and profile picture from source portfolio"
```

---

### Task 2: Create Placeholder Project Images

**Files:**
- Create: `public/images/projects/`

- [ ] **Step 1: Create projects directory**

Run:
```bash
mkdir -p "public/images/projects"
```

Expected: Directory created

- [ ] **Step 2: Create placeholder project images**

Create SVG placeholder for project screenshots:

Run: Create file `public/images/projects/hybrid-harness.svg` with content:
```xml
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#0a0a0a"/>
  <text x="400" y="300" font-family="Arial, sans-serif" font-size="32" fill="#8b5cf6" text-anchor="middle">hybrid-harness-chaos-process-prm</text>
  <text x="400" y="350" font-family="Arial, sans-serif" font-size="18" fill="#a78bfa" text-anchor="middle">AI Agent skill framework for Harness & Chaos Engineering</text>
</svg>
```

- [ ] **Step 3: Create remaining project placeholders**

Run: Create files for remaining projects:
- `public/images/projects/opencli.svg` - "Unified AI CLI agent for 12+ LLMs"
- `public/images/projects/futureminal2.svg` - "AI-native operating environment"
- `public/images/projects/scam-whisperer.svg` - "Vision-first scam analysis platform"
- `public/images/projects/wifi-sensing.svg` - "WiFi CSI elderly care monitoring"
- `public/images/projects/ticket-suspicion.svg` - "Multi-camera video analytics"

Each with same template, different title/description

- [ ] **Step 4: Verify project images**

Run:
```bash
ls public/images/projects/
```

Expected: 6 SVG files created

- [ ] **Step 5: Commit**

```bash
git add public/images/projects/
git commit -m "feat: add placeholder project images"
```

---

### Task 3: Update HTML - Meta Tags and Title

**Files:**
- Modify: `index.html:1-25`

- [ ] **Step 1: Update page title**

Find in `index.html` line 7:
```html
<title>수아's Room Folio</title>
```

Replace with:
```html
<title>dungnotnull | AI Agent Engineer & Full-stack Developer</title>
```

- [ ] **Step 2: Update meta description**

Find in `index.html` lines 20-23:
```html
<meta
  property="og:description"
  content="안녕하세요, I'm 김수아 (Kim Soo-ah)..."
/>
```

Replace with:
```html
<meta
  property="og:description"
  content="Hi, I'm Hoang Dung (dungnotnull). M.Sc. in IDT, AI Agent Engineer, Full-stack Developer. Expertise in GenAI, Harness/Chaos Engineering, Computer Vision, Math. Building autonomous engineering systems."
/>
```

- [ ] **Step 3: Update page language**

Find in `index.html` line 15:
```html
<meta name="language" content="English" />
```

Keep unchanged (already correct)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: update meta tags and title for personal branding"
```

---

### Task 4: Update HTML - Loading Screen

**Files:**
- Modify: `index.html:28-39`

- [ ] **Step 1: Update loading screen button text**

Find in `index.html` lines 29-31:
```html
<button class="loading-screen-button">
  Loading...
</button>
```

Replace with:
```html
<button class="loading-screen-button">
  dungnotnull
</button>
```

- [ ] **Step 2: Add tagline after loading button**

Find in `index.html` after line 31, before line 33:
```html
<button class="loading-screen-button">
  dungnotnull
</button>

```

Add after:
```html
<p class="loading-tagline">Full-stack Engineer | AI Agent Builder</p>
```

- [ ] **Step 3: Verify loading screen structure**

The loading screen section should now have:
- Loading button with "dungnotnull"
- Tagline paragraph
- Instructions (unchanged)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: update loading screen with personal branding"
```

---

### Task 5: Update HTML - Work Modal with 6 Projects

**Files:**
- Modify: `index.html:113-240`

- [ ] **Step 1: Replace work modal content**

Find in `index.html` lines 113-240 (entire work modal):

```html
<div class="work modal">
  <div class="modal-wrapper">
    <h1 class="modal-title">~ My Work ~</h1>
    <!-- existing content -->
  </div>
</div>
```

Replace with:
```html
<div class="work modal">
  <div class="modal-wrapper">
    <h1 class="modal-title">~ My Projects ~</h1>

    <div class="modal-content">
      <div class="modal-content-wrapper">
        <div class="work-project">
          <div class="work-project-wrapper">
            <div class="work-image-wrapper">
              <img
                class="work-base-image"
                src="/images/projects/hybrid-harness.svg"
                alt="Hybrid Harness Chaos Process PRM"
              />
            </div>
            <div class="paragraph-section">
              <h2 class="modal-paragraph-header">hybrid-harness-chaos-process-prm</h2>
              <p class="modal-paragraph-text">
                AI Agent skill framework for Harness & Chaos Engineering. Building intelligent agents that automate infrastructure testing and reliability engineering workflows.
              </p>
              <p class="modal-paragraph-text sm-margin-top sm-font">
                Skills: Python, AI Agents, Harness, Chaos Engineering, Process Mining, RPA, Automation
              </p>
            </div>
          </div>
        </div>
        <div class="work-project">
          <div class="work-project-wrapper">
            <div class="work-image-wrapper">
              <img
                class="work-base-image"
                src="/images/projects/opencli.svg"
                alt="OpenCLI All Your LLM Just Need"
              />
            </div>
            <div class="paragraph-section">
              <h2 class="modal-paragraph-header">openCLI-all-your-LLM-just-need</h2>
              <p class="modal-paragraph-text">
                Unified AI CLI agent that interfaces with 12+ different LLM providers. Simplifies AI interactions through a single command-line interface.
              </p>
              <p class="modal-paragraph-text sm-margin-top sm-font">
                Skills: TypeScript, CLI Tools, LLM Integration, API Design, Node.js
              </p>
            </div>
          </div>
        </div>
        <div class="work-project">
          <div class="work-project-wrapper">
            <div class="work-image-wrapper">
              <img
                class="work-base-image"
                src="/images/projects/futureminal2.svg"
                alt="Futureminal2"
              />
            </div>
            <div class="paragraph-section">
              <h2 class="modal-paragraph-header">futureminal2</h2>
              <p class="modal-paragraph-text">
                AI-native operating environment designed for developers. Building the future of terminal-based workflows with intelligent automation.
              </p>
              <p class="modal-paragraph-text sm-margin-top sm-font">
                Skills: Rust, Systems Programming, Terminal UI, AI Integration
              </p>
            </div>
          </div>
        </div>
        <div class="work-project">
          <div class="work-project-wrapper">
            <div class="work-image-wrapper">
              <img
                class="work-base-image"
                src="/images/projects/scam-whisperer.svg"
                alt="Scam Whisperer Agent"
              />
            </div>
            <div class="paragraph-section">
              <h2 class="modal-paragraph-header">scam-whisperer-agent</h2>
              <p class="modal-paragraph-text">
                Vision-first scam analysis platform using computer vision and ML to detect and analyze potential scams in real-time.
              </p>
              <p class="modal-paragraph-text sm-margin-top sm-font">
                Skills: TypeScript, Computer Vision, Machine Learning, Image Processing, React
              </p>
            </div>
          </div>
        </div>
        <div class="work-project">
          <div class="work-project-wrapper">
            <div class="work-image-wrapper">
              <img
                class="work-base-image"
                src="/images/projects/wifi-sensing.svg"
                alt="WiFi Sensing Elderly Care"
              />
            </div>
            <div class="paragraph-section">
              <h2 class="modal-paragraph-header">wifi-sensing-based-elderlycare-deeplearning</h2>
              <p class="modal-paragraph-text">
                WiFi CSI-based elderly care monitoring system using deep learning. Detects falls and unusual activity patterns through WiFi signal analysis.
              </p>
              <p class="modal-paragraph-text sm-margin-top sm-font">
                Skills: C, Deep Learning, Signal Processing, WiFi CSI, IoT, Computer Vision
              </p>
            </div>
          </div>
        </div>
        <div class="work-project">
          <div class="work-project-wrapper">
            <div class="work-image-wrapper">
              <img
                class="work-base-image"
                src="/images/projects/ticket-suspicion.svg"
                alt="Ticket Suspicion Multi-Camera Pipeline"
              />
            </div>
            <div class="paragraph-section">
              <h2 class="modal-paragraph-header">ticket-suspicion-multicamera-pipeline-computer-vision</h2>
              <p class="modal-paragraph-text">
                Multi-camera video analytics pipeline for detecting suspicious behavior in crowded environments using computer vision.
              </p>
              <p class="modal-paragraph-text sm-margin-top sm-font">
                Skills: Python, OpenCV, Multi-camera Tracking, Object Detection, Video Analytics, Jupyter
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="modal-exit-button">
    <svg
      width="98"
      height="96"
      viewBox="0 0 98 96"
      class="exit-button-svg"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
        fill="currentColor"
      />
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
        fill="currentColor"
      />
    </svg>
  </button>
</div>
```

- [ ] **Step 2: Verify HTML structure**

Run: Open `index.html` in browser
Expected: Work modal shows 6 projects with new content

- [ ] **Step 3: Commit**

```bash
git add index.html
git add public/images/projects/
git commit -m "feat: replace work modal with 6 AI/tech projects"
```

---

### Task 6: Update HTML - About Me Modal

**Files:**
- Modify: `index.html:241-332`

- [ ] **Step 1: Replace about modal content**

Find in `index.html` lines 241-332 (entire about modal):

```html
<div class="about modal">
  <!-- existing content -->
</div>
```

Replace with:
```html
<div class="about modal">
  <div class="modal-wrapper">
    <h1 class="modal-title">~ About Me ~</h1>

    <div class="modal-content">
      <div class="modal-content-wrapper">
        <div class="paragraph-section">
          <div class="image-wrapper">
            <img
              class="base-image"
              src="/images/profile_pic.jpg"
              alt="Hoang Dung"
            />
          </div>
          <h2 class="modal-paragraph-header">
            AI Agent Engineer & Full-stack Developer
          </h2>
          <p class="modal-paragraph-text">
            Hi, I'm Hoang Dung (dungnotnull). I hold an M.Sc. in IDT and specialize in building intelligent systems that push the boundaries of what's possible with AI agents and autonomous engineering.
          </p>
          <p class="modal-paragraph-text sm-margin-top">
            My expertise spans GenAI, Harness/Chaos Engineering, Computer Vision, and Mathematics. I'm passionate about creating tools that enable agentic coding workflows and autonomous systems.
          </p>
          <h2 class="modal-paragraph-header">What I'm Up To:</h2>
          <ul>
            <li class="list-text">
              Building AI agent frameworks that automate complex engineering workflows
            </li>
            <li class="list-text">
              Developing tools for harness and chaos engineering to improve system reliability
            </li>
            <li class="list-text">
              Exploring the intersection of computer vision and deep learning for practical applications
            </li>
            <li class="list-text">
              Contributing to open-source projects in AI/ML and developer tools
            </li>
          </ul>
          <h2 class="modal-paragraph-header-2">Portfolio credits and Inspiration:</h2>
          <ul>
            <li class="list-text-2">
              3D room concept inspired by Bruno Simon's and Rachel Wei's Room Portfolios
            </li>
            <li class="list-text-2">
              Materials and art inspired by Denis Wipart's and Nicky Blender's work
            </li>
            <li class="list-text-2">
              The piano in this portfolio works! Give it a try and play a song
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <button class="modal-exit-button">
    <svg
      width="98"
      height="96"
      viewBox="0 0 98 96"
      class="exit-button-svg"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
        fill="currentColor"
      />
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
        fill="currentColor"
      />
    </svg>
  </button>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: update about modal with personal information"
```

---

### Task 7: Update HTML - Contact Modal

**Files:**
- Modify: `index.html:333-451`

- [ ] **Step 1: Replace contact modal content**

Find in `index.html` lines 333-451 (entire contact modal):

Replace the contact section with:
```html
<div class="contact modal">
  <div class="modal-wrapper">
    <h1 class="modal-title">~ Say hello! ~</h1>

    <div class="modal-content">
      <div class="modal-content-wrapper">
        <div class="paragraph-section">
          <h2 class="modal-paragraph-header xsm-margin-top">
            Let's connect! I'm always interested in discussions about AI agents, autonomous systems, and innovative engineering.
          </h2>
          <div class="contact-button-wrapper">
            <a
              class="contact-link"
              href="mailto:truonghoangdung57@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="contact-svg mail" width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M656.85 209.817C608.726 166.348 527.66 150 400 150C272.34 150 191.272 166.348 143.15 209.817M656.85 209.817C700.01 248.804 716.666 309.608 716.666 400C716.666 591.177 642.156 650 400 650C157.843 650 83.333 591.177 83.333 400C83.333 309.608 99.9903 248.804 143.15 209.817M656.85 209.817L447.14 419.527C421.103 445.56 378.893 445.56 352.86 419.527L143.15 209.817" stroke="currentColor" stroke-width="66.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a
              class="contact-link"
              href="https://github.com/dungnotnull"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="800"
                height="800"
                viewBox="0 0 800 800"
                fill="none"
                class="contact-svg github"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M700 400C700 565.687 565.687 700 400 700C234.315 700 100 565.687 100 400C100 234.315 234.315 100 400 100C565.687 100 700 234.315 700 400Z"
                  stroke="currentColor"
                  stroke-width="66.6667"
                />
                <path
                  d="M457.234 296.059C419.604 285.652 380.397 285.652 342.767 296.059C342.124 296.237 341.481 296.418 340.841 296.603C336.891 297.74 332.642 296.967 329.357 294.497C289.771 264.731 269.093 266.061 263.976 267.054C263.154 267.214 262.529 267.827 262.245 268.615C262.173 268.814 262.102 269.013 262.031 269.212C253.88 292.169 252.635 317.605 258.426 341.417C258.764 342.804 259.124 344.184 259.509 345.557C259.534 345.647 259.56 345.737 259.585 345.827C259.919 347.007 259.674 348.277 258.927 349.254C258.359 349.994 257.799 350.744 257.248 351.5C241.494 373.13 232.97 400.71 233.346 429.157C233.346 544.664 293.466 571.194 351.167 579.037L352.361 579.194C384.491 583.997 415.291 583.7 447.317 578.264L448.127 578.167C506.107 571.13 566.654 545.29 566.654 429.157C567.031 400.71 558.507 373.13 542.754 351.5C542.247 350.807 541.734 350.117 541.214 349.434L541.174 349.384C540.367 348.327 540.101 346.95 540.461 345.67C540.857 344.257 541.227 342.84 541.571 341.417C547.367 317.537 546.051 292.026 537.764 269.059C537.711 268.918 537.661 268.777 537.611 268.637C537.317 267.835 536.681 267.21 535.841 267.048C530.701 266.055 510.137 264.794 470.644 294.497C467.361 296.966 463.111 297.733 459.161 296.602C458.521 296.418 457.877 296.237 457.234 296.059Z"
                  stroke="currentColor"
                  stroke-width="66.6667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a
              class="contact-link"
              href="https://www.linkedin.com/in/truonghoangdung57/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="800"
                height="800"
                viewBox="0 0 800 800"
                class="contact-svg linkedin"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_371_15)">
                  <path
                    d="M600 100C655.23 100 700 144.772 700 200V600C700 655.23 655.23 700 600 700H200C144.772 700 100 655.23 100 600V200C100 144.772 144.772 100 200 100H600ZM600 166.667H200C181.591 166.667 166.667 181.591 166.667 200V600C166.667 618.41 181.591 633.333 200 633.333H600C618.41 633.333 633.333 618.41 633.333 600V200C633.333 181.591 618.41 166.667 600 166.667ZM266.667 333.333C283.761 333.333 297.85 346.201 299.776 362.779L300 366.667V533.333C300 551.743 285.076 566.667 266.667 566.667C249.572 566.667 235.483 553.799 233.558 537.221L233.333 533.333V366.667C233.333 348.257 248.257 333.333 266.667 333.333ZM366.667 300C383.043 300 396.66 311.809 399.47 327.376C406.21 323.478 413.167 319.964 420.223 316.946C442.463 307.432 475.773 302.198 505.83 311.65C521.587 316.603 537.44 325.969 549.193 341.853C559.682 356.034 565.33 373.28 566.456 392.642L566.667 400V533.333C566.667 551.74 551.743 566.667 533.333 566.667C516.238 566.667 502.15 553.796 500.224 537.22L500 533.333V400C500 389.023 497.337 383.857 495.6 381.503C493.81 379.087 490.913 376.843 485.837 375.247C474.227 371.597 457.537 373.493 446.443 378.24C429.742 385.383 414.491 396.571 404.131 406.945L400 411.327V533.333C400 551.743 385.077 566.667 366.667 566.667C349.572 566.667 335.483 553.799 333.558 537.221L333.333 533.333V333.333C333.333 314.924 348.257 300 366.667 300ZM266.667 233.333C285.076 233.333 300 248.257 300 266.667C300 285.076 285.076 300 266.667 300C248.257 300 233.333 285.076 233.333 266.667C233.333 248.257 248.257 233.333 266.667 233.333Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_371_15">
                    <rect width="800" height="800" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="modal-exit-button">
    <svg
      width="98"
      height="96"
      viewBox="0 0 98 96"
      class="exit-button-svg"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
        fill="currentColor"
      />
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
        fill="currentColor"
      />
    </svg>
  </button>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: update contact modal with personal social links"
```

---

### Task 8: Add Tech Stack Modal

**Files:**
- Modify: `index.html` - Add after work modal, before about modal

- [ ] **Step 1: Add tech stack modal after work modal**

Find in `index.html` after line 240 (after work modal closes):

```html
  </button>
</div>
<div class="about modal">
```

Add before `<div class="about modal">`:
```html
<div class="tech-stack modal">
  <div class="modal-wrapper">
    <h1 class="modal-title">~ Tech Stack ~</h1>

    <div class="modal-content">
      <div class="modal-content-wrapper">
        <div class="paragraph-section">
          <h2 class="modal-paragraph-header">Languages & Frameworks</h2>
          <div class="tech-grid">
            <div class="tech-item">
              <img src="/images/tech/typescript.webp" alt="TypeScript" />
              <span>TypeScript</span>
            </div>
            <div class="tech-item">
              <img src="/images/tech/javascript.webp" alt="JavaScript" />
              <span>JavaScript</span>
            </div>
            <div class="tech-item">
              <img src="/images/tech/python.webp" alt="Python" />
              <span>Python</span>
            </div>
            <div class="tech-item">
              <img src="/images/tech/react.webp" alt="React" />
              <span>React</span>
            </div>
            <div class="tech-item">
              <img src="/images/tech/next.webp" alt="Next.js" />
              <span>Next.js</span>
            </div>
            <div class="tech-item">
              <img src="/images/tech/node.webp" alt="Node.js" />
              <span>Node.js</span>
            </div>
          </div>

          <h2 class="modal-paragraph-header">AI & Machine Learning</h2>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-text">GenAI</span>
            </div>
            <div class="tech-item">
              <span class="tech-text">LLMs</span>
            </div>
            <div class="tech-item">
              <span class="tech-text">Computer Vision</span>
            </div>
            <div class="tech-item">
              <span class="tech-text">Deep Learning</span>
            </div>
          </div>

          <h2 class="modal-paragraph-header">Infrastructure & Tools</h2>
          <div class="tech-grid">
            <div class="tech-item">
              <span class="tech-text">Harness</span>
            </div>
            <div class="tech-item">
              <span class="tech-text">Chaos Engineering</span>
            </div>
            <div class="tech-item">
              <span class="tech-text">Docker</span>
            </div>
            <div class="tech-item">
              <span class="tech-text">Git</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="modal-exit-button">
    <svg
      width="98"
      height="96"
      viewBox="0 0 98 96"
      class="exit-button-svg"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
        fill="currentColor"
      />
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
        fill="currentColor"
      />
    </svg>
  </button>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add tech stack modal"
```

---

### Task 9: Add Vision Modal

**Files:**
- Modify: `index.html` - Add after tech stack modal

- [ ] **Step 1: Add vision modal after tech stack modal**

Find in `index.html` after the tech stack modal closes (before about modal):

Add before `<div class="about modal">`:
```html
<div class="vision modal">
  <div class="modal-wrapper">
    <h1 class="modal-title">~ Vision ~</h1>

    <div class="modal-content">
      <div class="modal-content-wrapper">
        <div class="paragraph-section">
          <h2 class="modal-paragraph-header">Pushing the Boundaries of AI Agents</h2>
          <p class="modal-paragraph-text">
            I believe the future of software development lies in autonomous systems that can reason, plan, and execute complex tasks independently.
          </p>
          <p class="modal-paragraph-text sm-margin-top">
            My work focuses on building AI agent frameworks that enable agentic coding workflows — systems that don't just assist developers, but actively participate in the engineering process.
          </p>
          <h2 class="modal-paragraph-header">Autonomous Engineering</h2>
          <p class="modal-paragraph-text">
            From chaos engineering infrastructure testing to multi-LLM integration, I'm building tools that make autonomous engineering a practical reality.
          </p>
          <p class="modal-paragraph-text sm-margin-top">
            The goal isn't just to automate tasks — it's to create intelligent systems that can learn, adapt, and improve over time.
          </p>
        </div>
      </div>
    </div>
  </div>
  <button class="modal-exit-button">
    <svg
      width="98"
      height="96"
      viewBox="0 0 98 96"
      class="exit-button-svg"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(-0.696845 0.717222 0.717222 0.696845 83.1709 0)"
        fill="currentColor"
      />
      <rect
        width="115.92"
        height="17.889"
        rx="8.94448"
        transform="matrix(0.73406 0.679084 0.679084 -0.73406 0 13.1318)"
        fill="currentColor"
      />
    </svg>
  </button>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add vision modal"
```

---

### Task 10: Update SCSS - Color Variables

**Files:**
- Modify: `src/style.scss`

- [ ] **Step 1: Read current SCSS file**

Run:
```bash
cat src/style.scss | head -100
```

Expected: View first 100 lines of SCSS file

- [ ] **Step 2: Identify color variable definitions**

Look for patterns like:
```scss
$color-primary: 
$color-secondary:
$background-color:
```

- [ ] **Step 3: Update color variables**

Based on the actual file structure, update color variables to:

Find and replace color definitions with:
```scss
// Dark theme colors
$background-color: #0a0a0a;
$text-color: #ffffff;
$text-secondary: #a78bfa;

// Purple accent colors
$color-primary: #8b5cf6;
$color-secondary: #a78bfa;
$color-accent: #7c3aed;

// Modal backgrounds
$modal-background: rgba(10, 10, 10, 0.95);
$modal-border: #8b5cf6;

// Button colors
$button-hover: #7c3aed;
$button-text: #ffffff;
```

- [ ] **Step 4: Commit**

```bash
git add src/style.scss
git commit -m "feat: update color scheme to dark theme with purple accent"
```

---

### Task 11: Update SCSS - Modal Styles

**Files:**
- Modify: `src/style.scss`

- [ ] **Step 1: Add tech grid styles**

Add to `src/style.scss`:
```scss
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
  }

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  span, .tech-text {
    font-size: 0.875rem;
    color: #a78bfa;
    text-align: center;
  }
}
```

- [ ] **Step 2: Add loading tagline style**

Add to `src/style.scss`:
```scss
.loading-tagline {
  text-align: center;
  font-size: 1rem;
  color: $color-secondary;
  margin-top: 1rem;
  opacity: 0.8;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/style.scss
git commit -m "feat: add tech grid and tagline styles"
```

---

### Task 12: Update JavaScript - Color References

**Files:**
- Modify: `src/main.js`

- [ ] **Step 1: Search for color references in main.js**

Run:
```bash
grep -n "color\|Color" src/main.js | head -20
```

Expected: List of lines with color references

- [ ] **Step 2: Update theme-related color variables**

Find theme color definitions in the theme section and update to purple accent scheme

Look for patterns like:
```javascript
const themeColors = {
  // update these
}
```

Update to:
```javascript
const themeColors = {
  primary: '#8b5cf6',
  secondary: '#a78bfa',
  background: '#0a0a0a',
  text: '#ffffff'
}
```

- [ ] **Step 3: Commit**

```bash
git add src/main.js
git commit -m "feat: update JS color references to purple accent"
```

---

### Task 13: Create Dark/Light Theme Wallpaper Images

**Files:**
- Create: `public/images/wallpapers/`

- [ ] **Step 1: Create wallpapers directory**

Run:
```bash
mkdir -p "public/images/wallpapers"
```

Expected: Directory created

- [ ] **Step 2: Create dark theme wallpaper SVG**

Create `public/images/wallpapers/dark-theme.svg`:
```xml
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#0a0a0a"/>
  <circle cx="960" cy="540" r="300" fill="#8b5cf6" opacity="0.1"/>
  <circle cx="600" cy="400" r="150" fill="#a78bfa" opacity="0.05"/>
  <circle cx="1300" cy="700" r="200" fill="#7c3aed" opacity="0.08"/>
  <text x="960" y="540" font-family="Arial, sans-serif" font-size="48" fill="#8b5cf6" text-anchor="middle" opacity="0.3">AI AGENT ENGINEER</text>
</svg>
```

- [ ] **Step 3: Create light theme wallpaper SVG**

Create `public/images/wallpapers/light-theme.svg`:
```xml
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#f5f5f5"/>
  <circle cx="960" cy="540" r="300" fill="#8b5cf6" opacity="0.1"/>
  <circle cx="600" cy="400" r="150" fill="#a78bfa" opacity="0.08"/>
  <circle cx="1300" cy="700" r="200" fill="#7c3aed" opacity="0.05"/>
  <text x="960" y="540" font-family="Arial, sans-serif" font-size="48" fill="#8b5cf6" text-anchor="middle" opacity="0.3">AI AGENT ENGINEER</text>
</svg>
```

- [ ] **Step 4: Commit**

```bash
git add public/images/wallpapers/
git commit -m "feat: add dark/light theme wallpapers"
```

---

### Task 14: Verify All Changes

**Files:**
- Test: All modified files

- [ ] **Step 1: Start dev server**

Run:
```bash
npm run dev
```

Expected: Server starts successfully

- [ ] **Step 2: Open in browser**

Navigate to `http://localhost:5173`

Expected: Portfolio loads with dark theme

- [ ] **Step 3: Test all modals**

Click through: Work, About, Contact, Tech Stack, Vision modals

Expected: All modals open and display correct content

- [ ] **Step 4: Test theme toggle**

Click theme toggle button

Expected: Colors change appropriately

- [ ] **Step 5: Test piano**

Click piano keys

Expected: Piano sounds play

- [ ] **Step 6: Test 3D navigation**

Use mouse to navigate 3D room

Expected: Room navigates correctly

- [ ] **Step 7: Check all images**

Run: Open browser DevTools, check Console for 404s

Expected: No broken image references

- [ ] **Step 8: Final commit**

```bash
git add .
git commit -m "feat: complete portfolio customization - dark theme with purple accent"
```

---

### Task 15: Final Review and Cleanup

**Files:**
- Review: All changes

- [ ] **Step 1: Review git log**

Run:
```bash
git log --oneline -15
```

Expected: See all commits from this implementation

- [ ] **Step 2: Check for any TODO comments**

Run:
```bash
grep -r "TODO\|FIXME" src/ index.html
```

Expected: No TODOs remaining

- [ ] **Step 3: Verify all placeholder images**

Check if any project images still need actual screenshots

- [ ] **Step 4: Update README**

Update `README.md` to reflect personal branding:

Find and update title/description

- [ ] **Step 5: Final commit**

```bash
git add README.md
git commit -m "docs: update README with personal branding"
```

- [ ] **Step 6: Build verification**

Run:
```bash
npm run build
```

Expected: Build completes successfully

---

## Implementation Complete Checklist

- [ ] All 6 projects displayed
- [ ] Tech stack section added
- [ ] Vision section added
- [ ] Contact links accurate
- [ ] Color scheme dark + purple accent
- [ ] All text references to Kim Soo-ah replaced
- [ ] Room interactive and 3D experience preserved
- [ ] Piano playable
- [ ] Theme toggle works
- [ ] No broken images or links
- [ ] Loading screen displays correctly
- [ ] All modals functional

## Notes for Future Work

- Replace placeholder project SVGs with actual screenshots
- Add actual project screenshots to `public/images/projects/`
- Consider adding more tech stack icons as needed
- Update wallpapers with actual AI/neural network imagery if desired
