# SYNTH-01 // BIOPHONIC CONSCIOUSNESS
### Cybernetic Diagnostic HUD & Neural Uplink Interface

[![Status: Operational](https://img.shields.io/badge/System_Status-Operational-0ae8e0?style=flat-square&logo=cpu&logoColor=0ae8e0)](https://github.com/)
[![React Version: ^19.2.7](https://img.shields.io/badge/React-v19.2.7-20232a?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS: v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite Version: ^8.1.1](https://img.shields.io/badge/Vite-v8.1.1-646cff?style=flat-square&logo=vite)](https://vite.dev/)

**SYNTH-01** is a high-fidelity, single-page cyborg-themed landing page representing a futuristic diagnostic Heads-Up Display (HUD). Built using a cutting-edge frontend stack (React 19, Vite, Tailwind CSS v4, React Three Fiber, and GSAP), the application simulates a real-time biophonic consciousness telemetry terminal.

---

## 🖥️ System Showcase

Below is the active biophonic core overview displaying system synchronization status and the interactive 3D neural mesh:

![SYNTH-01 Hero Interface](docs/hero-dashboard.png)

---

## ⚡ Core Capabilities

- 🌀 **Boot Sequencer & Memory Decognizer:** A simulated diagnostic loading screen checking subsystem indexes, bios-level processes, and synapse links up to 100% prior to entering the console.
- 📐 **Interactive 3D Neural Mesh:** A fully interactive, responsive Three.js canvas utilizing `@react-three/fiber` and `@react-three/drei` rendering an orbiting wireframe mesh that users can drag and inspect.
- 📺 **HUD CRT Simulation Overlay:** Retro scanlines and a linear CRT scan texture overlaying the screen to emphasize the cybernetic console aesthetic.
- 📊 **Subsystem Telemetry Grid:** Status readouts, neon telemetry gauges, and micro-led pulse animations highlighting system health, CPU load, latency, and core temperatures.
- 📡 **Live Neural Log Feed:** A real-time system log simulating diagnostic updates on connection stability, kernel logs, and bios integrations, managed via high-performance GSAP timelines.
- ✉️ **Secure Uplink Transmitter:** An interactive diagnostic contact form equipped with glowing input states, sending messages that return real-time database write updates and system validation headers (`STATUS: 200 OK`).

---

## 🎬 Interactive Walkaround Demo

Watch the complete interactive boot sequence, HUD panel transitions, subsystem glows, and uplink submission form in action:

![Interactive Walkaround](docs/walkaround-demo.webp)

---

## 🛠️ Tech Stack & Dependencies

* **Framework:** React 19 + Vite (High-performance hot module replacement)
* **Styling & Themes:** Tailwind CSS v4 (configured via `@theme` utility tokens in pure CSS)
* **3D Engine:** Three.js / React Three Fiber / @react-three/drei
* **Animations:**
  * **GSAP (GreenSock):** Complex sequential logs and system tick intervals
  * **Framer Motion:** Smooth boot sequence fade-outs and page transitions
  * **Anime.js / CSS Keyframes:** Micro-LED pulses and scanline behaviors

---

## 📂 Project Directory Anatomy

```text
cyborg-theme/
├── .vscode/
│   └── settings.json         # Workspace CSS validator bypass for Tailwind v4
├── docs/
│   ├── hero-dashboard.png    # Showcase screenshot
│   └── walkaround-demo.webp  # WebP walkthrough demonstration recording
├── public/
│   ├── favicon.svg           # Custom cyborg system icon
│   └── icons.svg             # SVG icon spritesheet
├── src/
│   ├── animations/
│   │   └── gsapTimelines.js  # GSAP ticker setups and logger controls
│   ├── components/
│   │   ├── BootSequence/     # System initializer boot-up screen
│   │   ├── Hero3D/           # 3D interactive mesh scene
│   │   ├── CoreSpec/         # System structural data grid
│   │   ├── ModuleGrid/       # Neon metrics telemetry panels
│   │   ├── NeuralLog/        # Dynamic diagnostic logging feed
│   │   ├── UplinkSignal/     # Transmission monitoring graphs
│   │   ├── TransmitForm/     # Broadcast contact form
│   │   └── Footer/           # Terminal console status footer
│   ├── styles/
│   │   ├── tokens.css        # Raw custom hex color tokens and variables
│   │   └── globals.css       # Core Tailwind CSS imports and @theme configurations
│   ├── App.jsx               # Entry router and layout coordinator
│   └── main.jsx              # DOM bootstrapper
├── vite.config.js            # Tailwind v4 plugin compilation config
├── package.json              # System configuration and script registry
└── README.md                 # System overview manual
```

---

## 🚀 Installation & Local Execution

To run the terminal interface locally:

### 1. Clone & Install Dependencies
Ensure you have Node.js installed on your system. Run:
```bash
# Clone the repository
git clone https://github.com/your-username/cyborg-theme.git

# Navigate into the project directory
cd cyborg-theme

# Install packages
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will spin up on `http://localhost:5173/` (or `http://localhost:5174/` if 5173 is occupied).

### 3. Build for Production
To build a highly optimized distribution bundle:
```bash
npm run build
```

---

## ⚙️ Tailwind CSS v4 Customization

This project uses the modern **Tailwind CSS v4** styling framework. All design system configurations are managed inside [src/styles/globals.css](src/styles/globals.css) via the new `@theme` directive, linking to CSS variables declared in [src/styles/tokens.css](src/styles/tokens.css):

```css
@theme {
  --color-void-black: var(--void-black);
  --color-signal-cyan: var(--signal-cyan);
  --color-warning-amber: var(--warning-amber);
  --color-vein-red: var(--vein-red);
  
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}
```

If your IDE reports linting issues under the `@theme` directive, check the `.vscode/settings.json` file which bypasses the built-in validator:
```json
{
  "css.lint.unknownAtRules": "ignore"
}
```

---

*SYNTH-01 // COGNITIVE INTEGRITY IS GUARANTEED*
