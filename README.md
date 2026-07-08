<div align="center">

# SYNTH-01 // Diagnostic HUD
*A high-fidelity cyborg-themed diagnostic HUD landing page and neural uplink terminal.*

[![React](https://img.shields.io/badge/React-19.2.7-20232a?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1.1-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-green?style=flat-square&logo=greensock)](https://greensock.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

<br />

<img src="docs/hero-dashboard.png" width="850" alt="SYNTH-01 System Interface Dashboard" />

</div>

---

## Overview

SYNTH-01 is a premium, single-page interactive portfolio and diagnostic HUD simulation. The project replicates a futuristic cybernetic interface using React, React Three Fiber, GSAP, and Tailwind CSS v4.

---

## Demo

<div align="center">
  <img src="docs/walkaround-demo.webp" width="850" alt="HUD Interface Walkaround" />
  <p><em>Demonstration: Boot sequence initialization → 3D model interaction → GSAP scroll-triggered sections → network-tethered contact form submission.</em></p>
</div>

---

## Features

- **Interactive 3D Core Model:** Procedural mechanical cranium wireframe built in Three.js (R3F) featuring orbital drag-to-inspect interaction with rotation persistence.
- **Boot Sequencer & Initializer:** Simulated BIOS diagnostics loading animation transitioning to the main dashboard interface.
- **GSAP Scroll Timelines:** Linear chronologies, scroll-triggered log tick feeds, and telemetry section animations.
- **Uplink Network Transmitter:** Interactive email transmitter form utilizing real HTTP POST requests to `https://httpbin.org/post` with log status diagnostics.
- **Mobile Fallback & Accessibility:** Automatic viewport detection displaying static vector SVG blueprint schematics on mobile devices to prevent GPU load, with built-in reduced-motion support.

---

## Tech Stack

| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `19.2.7` | UI Framework |
| **Vite** | `8.1.1` | Build Toolchain |
| **Tailwind CSS** | `4.3.2` | Core Styles & Variables |
| **Three.js** | `0.185.1` | 3D Graphics Core |
| **React Three Fiber** | `9.6.1` | R3F Wrapper |
| **@react-three/drei** | `10.7.7` | R3F Helpers (Sparkles) |
| **React Spring (Three/Web)**| `10.1.2` | Drag Rotation Physics |
| **GSAP** | `3.15.0` | Scroll-Triggered Timelines |
| **Anime.js** | `3.2.2` | Background SVG Nodes Loop |
| **Motion** | `12.42.2` | Layout & Boot Transitions |

---

## Typography

The project utilizes three distinct font families loaded via Google Fonts link:
* **Display Font (`Chakra Petch`):** A geometric, square-cut display typeface used for all main section headings to establish the mechanical theme.
* **Body Font (`IBM Plex Sans`):** A legible humanist sans-serif face ensuring high readability for paragraphs and descriptions.
* **Monospace Font (`Space Mono`):** A monospaced coding font utilized for telemetry readouts, terminal labels, and system logs.

---

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/darshsharma-bit/cyborg-theme.git
   cd cyborg-theme
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build the application for production:
   ```bash
   npm run build
   ```

5. Run linters:
   ```bash
   npm run lint
   ```

---

## Project Structure

```text
cyborg-theme/
├── .vscode/
│   └── settings.json         # CSS validator configuration for Tailwind CSS v4
├── docs/
│   ├── hero-dashboard.png    # Live interface screenshot
│   └── walkaround-demo.webp  # Interactive walkthrough animation
├── public/
│   └── favicon.svg           # Core HUD icon asset
└── src/
    ├── animations/
    │   └── gsapTimelines.js  # GSAP scroll triggers and logger feeds
    ├── components/
    │   ├── BootSequence/     # Initializer loading screen
    │   ├── Hero3D/           # Three.js viewport and SVG mobile fallback
    │   ├── CoreSpec/         # System specifications list
    │   ├── ModuleGrid/       # Grid of telemetry sensors
    │   ├── NeuralLog/        # Scroll-driven timeline items
    │   ├── UplinkSignal/     # Pulse telemetry panels
    │   ├── TransmitForm/     # Network POST contact form
    │   └── Footer/           # HUD status bar footer
    ├── styles/
    │   ├── tokens.css        # Core color variables and font stacks
    │   └── globals.css       # Tailwind directives and CSS theme overrides
    ├── App.jsx               # Router and layout coordinator
    └── main.jsx              # Main DOM entrypoint
```

---

## Project Context
This application was built as a final project submission for the IIT Bombay final-year showcase. 

Licensed under the [MIT License](LICENSE).
