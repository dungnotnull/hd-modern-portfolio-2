# Portfolio Customization Design Spec

## Overview

Transform the forked 3D room portfolio (sooahs-room-folio) from Kim Soo-ah's kawaii aesthetic to Hoang Dung's tech-focused AI agent engineer branding with dark theme + purple accent, while preserving the interactive 3D room experience and piano feature.

## Scope

- Full 2D visual rebrand (colors, images, text)
- Content replacement with Hoang Dung's portfolio information
- Minimal 3D changes (wallpaper/texture swaps only)
- All sections: About Me, Projects (6), Tech Stack, Vision, Contact
- Emphasis on AI agents expertise
- Preserve all interactive features (piano, music, navigation)

## Design Tokens

### Color Palette

| Purpose | Original | New |
|---------|----------|-----|
| Background | Light/pink tones | Dark (#0a0a0a) |
| Primary accent | Pink | Purple (#8b5cf6) |
| Secondary accent | Light pink | Violet (#a78bfa) |
| Text | Dark | White/light gray |
| Borders/edges | Pink | Purple/violet |

### Typography

- Keep existing fonts or switch to Inter/Roboto (decided during implementation)
- Ensure readability against dark background

## Content Mapping

### 1. Loading Screen

**Before:**
- Title: "수아's Room Folio"
- Instructions text

**After:**
- Title: "dungnotnull"
- Tagline: "Full-stack Engineer \| AI Agent Builder"
- Keep instructions text unchanged

### 2. About Me Modal

**Before:**
- Name: 김수아 (Kim Soo-ah) / Angelina
- Bio: SNU student, CS + Music, K-drama, LoL, piano practice
- Credits: Music by Daystar Project

**After:**
- Name: Hoang Dung (dungnotnull)
- Bio: M.Sc. in IDT, expertise in GenAI, Harness/Chaos Engineering, Computer Vision, Math
- Current work: AI agents, agentic coding workflows, autonomous engineering
- Interests: Tech, AI, building agents (replace K-drama/LoL)
- Credits: Update attribution appropriately

### 3. Projects/Work Modal

**Before:**
- 3 projects: Community Leader, MeloMochi, PianoScope

**After:**
- 6 projects with descriptions and tech stacks:

1. **hybrid-harness-chaos-process-prm**
   - AI Agent skill framework for Harness & Chaos Engineering
   - Python, 17 stars

2. **openCLI-all-your-LLM-just-need**
   - Unified AI CLI agent for 12+ LLMs
   - TypeScript

3. **futureminal2**
   - AI-native operating environment for developers
   - Rust

4. **scam-whisperer-agent**
   - Vision-first scam analysis platform
   - TypeScript

5. **wifi-sensing-based-elderlycare-deeplearning**
   - WiFi CSI elderly care monitoring
   - C

6. **ticket-suspicion-multicamera-pipeline-computer-vision**
   - Multi-camera video analytics
   - Jupyter Notebook

Each with: project name, description, tech stack tags, relevant image/screenshot

### 4. Tech Stack Section (NEW)

Add modal or expand existing modal to display skills:

**Primary Skills:**
- Python, TypeScript, Rust, C, React, Three.js, Docker

**AI/ML:**
- GenAI, LLMs, Machine Learning, Computer Vision

**Infrastructure:**
- Harness, Chaos Engineering

### 5. Vision Section (NEW)

Add modal or section:

**Content:**
- Focus: "Pushing boundaries of AI agents, agentic coding workflows, autonomous engineering"
- Direction: Building tools that enable autonomous engineering

### 6. Contact Modal

**Before:**
- Placeholder email, GitHub link to forked repo, LinkedIn, Instagram

**After:**
- Email: truonghoangdung57@gmail.com
- GitHub: https://github.com/dungnotnull
- LinkedIn: https://www.linkedin.com/in/truonghoangdung57/
- Instagram: Remove (not used professionally)

## Visual Assets

### Images to Replace

| Original Location | Purpose | New Source |
|-------------------|---------|------------|
| `public/images/profile_pic.webp` | Profile photo | `D:\my-modern-portfolio-space\public\images\ava.jpg` |
| `public/images/community.webp` | Project image | Screenshot from hybrid-harness project |
| `public/images/computer.webp` | Project image | Screenshot from openCLI project |
| `public/images/piano.webp` | Project image | Screenshot from scam-whisperer project |
| Wall wallpapers | Kawaii themes | Tech/AI themed images |
| `media/og-image.webp` | Open Graph | New portfolio screenshot |

### Tech Stack Icons

Copy from source portfolio:
- `D:\my-modern-portfolio-space\public\images\` → `public/images/tech/`
- Include: node, react, typescript, rust, python, docker, mongo, mysql, etc.

## 3D Changes

### Minimal Changes Only

**Keep Unchanged:**
- Room furniture and layout
- All 3D objects (desk, piano, computer, etc.)
- Raycaster interactions
- Camera controls
- All animations

**Replace:**
- Wall wallpapers (kawaii → tech/AI themed)
- Keep texture dimensions/formats identical

## Interactive Features

### Preserve All Features

- Piano with all 24 key sounds
- Background music (Cosmic Candy or replace)
- Click SFX
- Theme toggle (adjust colors for new theme)
- Mute toggle
- Mouse navigation (desktop and mobile)
- Modal open/close animations
- Loading screen

## Technical Files to Modify

### HTML
- `index.html` - Update meta tags, title, all modal content

### JavaScript
- `src/main.js` - Update color variables, image references, modal data structures

### SCSS
- `src/style.scss` - Update color scheme variables, all selectors

### Assets
- Copy images from `D:\my-modern-portfolio-space`
- Create new wallpaper images for walls
- Project screenshots (placeholders or provided)

## Implementation Order

1. Setup: Copy images from source portfolio
2. Colors: Update SCSS color variables
3. Content: Update HTML modal content
4. Images: Update image references in JS
5. Assets: Replace wallpapers and profile pictures
6. Contact: Update social links
7. Test: Verify all interactions work
8. Review: Final visual check

## Success Criteria

- [ ] All text references to Kim Soo-ah replaced with Hoang Dung
- [ ] Color scheme fully dark + purple accent
- [ ] All 6 projects displayed with accurate info
- [ ] Tech stack section added
- [ ] Vision section added
- [ ] Contact links functional and accurate
- [ ] Room interactive and 3D experience preserved
- [ ] Piano playable
- [ ] Theme toggle works with new colors
- [ ] No broken images or links
- [ ] Loading screen displays correctly

## Performance

- Maintain existing performance characteristics
- Image sizes optimized (WebP format preferred)
- No new dependencies introduced

## Git Strategy

- Skip current git flow as requested
- Work on main branch
- Commit after major milestones
