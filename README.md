<div align="center">

# SYNTH-01 // Diagnostic HUD

*A cyborg-themed, fully interactive 3D diagnostic HUD landing page — boot sequence, live telemetry, and a mesh you can actually drag around.*

[![React](https://img.shields.io/badge/React-19.2.7-20232a?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1.1-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-green?style=flat-square&logo=greensock)](https://greensock.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

<br />

<img src="docs/hero-dashboard.png" width="850" alt="SYNTH-01 System Interface Dashboard" />

<sub>Live view: the interactive neural mesh, mid-scan, HUD panels reading out.</sub>

</div>

---

## Overview

SYNTH-01 is a single-page interactive HUD simulation — the pitch is "what if a boot terminal and a cybernetic diagnostic panel had a baby, and you could drag its brain around." Built with React, React Three Fiber, GSAP, and Tailwind CSS v4, it leans into the bit: warning ticks, neural-link status lines, a mesh that reacts to your cursor.

---

## Demo

<div align="center">
  <img src="docs/walkaround-demo.webp" width="850" alt="HUD Interface Walkaround" />
  <p><em>Boot sequence → drag-to-inspect the 3D core → GSAP scroll-pinned sections → uplink transmission form.</em></p>
</div>

---

## Features

- 🧠 **Interactive 3D Core Model** — a procedural mechanical cranium wireframe (Three.js / R3F) you can grab and rotate to inspect from any angle, spring-physics driven.
- ⚡ **Boot Sequencer** — a simulated BIOS-style diagnostic loader that counts up to 100% before handing off to the main dashboard.
- 📡 **GSAP Scroll Timelines** — pinned sections, staggered telemetry reveals, and a scroll-drawn neural log line.
- 📨 **Uplink Transmitter** — a real, working contact form (POSTs to `https://httpbin.org/post`) with live terminal-style status logs as it "transmits."
- 📱 **Mobile-Aware** — swaps to a static SVG blueprint schematic on small/low-power screens to keep GPU load in check, plus full `prefers-reduced-motion` support.

---

## Tech Stack

| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `19.2.7` | UI framework |
| **Vite** | `8.1.1` | Build toolchain |
| **Tailwind CSS** | `4.3.2` | Styling & design tokens |
| **Three.js** | `0.185.1` | 3D graphics core |
| **React Three Fiber** | `9.6.1` | React renderer for Three.js |
| **@react-three/drei** | `10.7.7` | R3F helpers (Sparkles, etc.) |
| **React Spring** | `10.1.2` | Drag-to-inspect rotation physics |
| **GSAP** | `3.15.0` | Scroll-triggered timelines |
| **Anime.js** | `3.2.2` | Background circuit-line loops |
| **Motion** | `12.42.2` | Boot sequence & layout transitions |

---

## Typography

Three typefaces, each doing one job:

- **Chakra Petch** — the display face. Geometric, square-cut, does all the heavy lifting for that mechanical feel in headings.
- **IBM Plex Sans** — the body face. Humanist and legible, keeps the actual reading parts readable once the theme is out of the way.
- **Space Mono** — the mono face. Every HUD label, log line, and telemetry readout runs through this.

Loaded via Google Fonts.

---

## Getting Started

### Prerequisites
- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Installation

```bash
git clone https://github.com/darshsharma-bit/cyborg-theme.git
cd cyborg-theme
npm install
```

### Run it

```bash
npm run dev      # local dev server
npm run lint     # oxlint
npm run build    # production build
```

---

## Project Structure

```text
cyborg-theme/
├── .vscode/
│   └── settings.json         # CSS validator config for Tailwind v4 @theme
├── docs/
│   ├── hero-dashboard.png    # Live interface screenshot
│   └── walkaround-demo.webp  # Interactive walkthrough recording
├── public/
│   └── favicon.svg           # Core HUD icon asset
└── src/
    ├── animations/
    │   └── gsapTimelines.js  # GSAP scroll triggers and logger feeds
    ├── components/
    │   ├── BootSequence/     # Initializer loading screen
    │   ├── Hero3D/           # Three.js viewport + SVG mobile fallback
    │   ├── CoreSpec/         # System specifications list
    │   ├── ModuleGrid/       # Grid of telemetry sensors
    │   ├── NeuralLog/        # Scroll-driven timeline items
    │   ├── UplinkSignal/     # Pulse telemetry panels
    │   ├── TransmitForm/     # Network POST contact form
    │   └── Footer/           # HUD status bar footer
    ├── styles/
    │   ├── tokens.css        # Color variables and font stacks
    │   └── globals.css       # Tailwind directives and @theme config
    ├── App.jsx               # Router and layout coordinator
    └── main.jsx              # DOM entrypoint
```

---

## Tailwind v4 Theme Integration

Custom tokens live in [`src/styles/tokens.css`](src/styles/tokens.css) and get wired into Tailwind's `@theme` directive in [`src/styles/globals.css`](src/styles/globals.css):

```css
@theme {
  --color-void-black: var(--void-black);
  --color-signal-cyan: var(--signal-cyan);
  --color-warning-amber: var(--warning-amber);
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}
```

If your editor flags `@theme` as an unknown at-rule, this is already handled in [`.vscode/settings.json`](.vscode/settings.json):

```json
{ "css.lint.unknownAtRules": "ignore" }
```

---

<div align="center">

Built as a final-year project submission for IIT Bombay.
Licensed under the [MIT License](LICENSE).

`[ SYSTEM STATUS: READY ]` — `[ CONNECTION: SECURE ]` — `[ CORE: CALIBRATED ]`

</div>
