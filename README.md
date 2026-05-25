# BVH Enterprises LLC — Corporate Website

A modern, multi-page corporate website for **BVH Enterprises LLC**, a managed IT services and technology consulting company. Built as a single-page application (SPA) with pure HTML, CSS, and vanilla JavaScript — no frameworks, no build tools required.

🌐 **Live Site:** `https://YOUR_USERNAME.github.io/bvh-enterprises` *(update after first deploy)*

---

## 📋 Pages

| Page | Description |
|------|-------------|
| **Home** | Hero, partner bar, value props, stats strip, 6-service grid, content splits, expertise cards, testimonials, CTA |
| **Managed Services** | Full breakdown of all 6 IT service offerings |
| **Why BVH Enterprises** | Differentiators, metrics, client testimonials |
| **Our Advantage** | 8 key advantages + certifications & partnerships |
| **About** | Company story, mission, vision, and values |
| **Contact Us** | Inquiry form with service selector and confirmation state |

---

## 🗂️ Project Structure

```
bvh-enterprises/
├── index.html                        # Main HTML — all pages (SPA routing)
├── css/
│   └── styles.css                    # All styles, layout, animations, responsive
├── js/
│   └── main.js                       # SPA routing, sliders, scroll-reveal motion
├── assets/
│   ├── video/
│   │   └── hero-bg.mp4               # Hero background video (Git LFS tracked)
│   └── images/
│       ├── business-professionals.jpg
│       ├── team-colleagues-tablet.jpg
│       ├── digital-transformation.jpg
│       ├── it-consulting-team.jpg
│       └── README.md                 # Image placement guide
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Pages auto-deploy (with LFS)
├── .gitattributes                    # Git LFS rules + line endings
├── .gitignore
├── LICENSE
└── README.md
```

---

## ✨ Motion & Interactions

The site includes a lightweight motion system (no animation libraries):

- **Scroll reveal** — sections, cards, and content fade up as they enter the viewport (IntersectionObserver, animates once per element)
- **Hero entrance** — staggered fade-in on headline, sub-copy, buttons; fade-right on hero image
- **Card hover lifts** — service / expert / advantage / hex / testimonial cards lift 6px with a soft shadow; icons mini-bounce
- **Image hover zoom** — hero-right and hexagon images scale to 1.05× on hover
- **Button micro-lift** — primary buttons rise 2px with a blue glow
- **Nav underline** — animated underline slides under nav links on hover / active
- **SPA page fade** — switching between pages fades the new view in instead of snapping
- **Floating badge** — the "500+ Businesses Served" badge gently bobs
- **`prefers-reduced-motion`** — all motion is disabled when the user has reduced-motion enabled

---

## 🖥️ Services on Homepage

| # | Service |
|---|---------|
| 1 | Custom Website Development |
| 2 | IT Consulting Services |
| 3 | Cloud Solutions & System Integration |
| 4 | Cybersecurity & Network Protection |
| 5 | Software Development & Business Automation |
| 6 | Technical Support & IT Maintenance |

---

## 🚀 Quick Start (Local)

No build tools required — pure HTML, CSS, and vanilla JavaScript.

```bash
# Serve locally (recommended — enables video autoplay & relative paths)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

> Opening `index.html` as a `file://` URL may suppress the hero video autoplay in some browsers. Use a local server for full functionality.

---

## 🌐 Deploy to GitHub Pages (web upload — no Git needed)

### 1. Create the repo
- On github.com → **New repository**
- Name: `bvh-enterprises`
- Visibility: **Public** (private repos need a paid plan for Pages)
- Check **"Add a README file"** so the repo starts with a `main` branch
- **Create repository**

### 2. Upload the files
- In your new repo → **Add file → Upload files**
- Open the unzipped `bvh-enterprises/` folder on your computer
- Select **everything inside** (Cmd/Ctrl+A) — including hidden items:
  - macOS: press **Cmd+Shift+.** in Finder to reveal `.github/`, `.gitattributes`, `.gitignore`
  - Windows: **File Explorer → View → Show → Hidden items**
- Drag all of it into the GitHub upload area
- When asked about the existing `README.md`, let the upload overwrite it
- Commit message: `Initial commit — BVH Enterprises corporate site`
- **Commit changes**

### 3. Enable GitHub Pages
- **Settings → Pages**
- Under **Build and deployment**, set **Source** to **GitHub Actions**

### 4. Watch the deploy
- **Actions** tab → "Deploy to GitHub Pages" runs automatically (~1–2 min)
- Site goes live at: `https://YOUR_USERNAME.github.io/bvh-enterprises`

> **Note on the hero video:** `hero-bg.mp4` is 21 MB — under GitHub's 25 MB web-upload limit. If you ever need to swap it for a larger video, you'll have to either compress it under 25 MB or switch to Git + Git LFS.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#0A1628` | Dark backgrounds, headings, service cards |
| `--blue` | `#1B4FD8` | Primary brand blue, CTAs |
| `--blue-light` | `#2563EB` | Hover states |
| `--accent` | `#0EA5E9` | Highlights, hero italic text |
| `--accent-green` | `#10B981` | Success states |
| `--gray-50` | `#F8FAFC` | Alternate section backgrounds |

**Fonts:** [Barlow](https://fonts.google.com/specimen/Barlow) + [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed)

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `> 1024px` | Full desktop — multi-col grids, side-by-side layouts |
| `768–1024px` | Tablet — 2-col grids, stacked hero |
| `< 600px` | Mobile — single column, hamburger nav |

---

## 🔧 Customization

**Contact info** — Search `index.html` for `(800) BVH-TECH` and `info@bvhenterprises.com`

**Stats** — Find `.stats-strip` / hero stats in `index.html` and update numbers to real data

**Testimonials** — Find the testimonial sections and replace placeholder quotes/names

**Logo** — Replace the inline SVG in `<nav>` and `<footer>` with:
```html
<img src="assets/images/BVH_Enterprises_logo_transparent_400w.png" alt="BVH Enterprises" style="height:40px;">
```

**Motion** — All motion is in the `MOTION EFFECTS` block at the bottom of `css/styles.css` and the IIFE at the bottom of `js/main.js`. To add scroll-reveal to a new element, add the class `reveal` (or `reveal-left` / `reveal-right` / `reveal-scale`) — or extend the `REVEAL_SELECTORS` array in `main.js` to auto-tag new sections.

---

## 📄 License

© 2025 BVH Enterprises LLC. All rights reserved.
This codebase is proprietary. See [LICENSE](./LICENSE) for terms.
