import React, { Suspense, useState, useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GlitchText } from '../ui/GlitchText'
import { MagneticButton } from '../ui/MagneticButton'

// Lazy load the R3F Canvas component to keep initial paint fast
const Hero3DScene = React.lazy(() => import('./Hero3DScene'))

export function Hero3D() {
  const isReduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [canvasLoaded, setCanvasLoaded] = useState(false)

  // Detect mobile screen layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Delayed mount of canvas to let critical DOM paint first
    const timer = setTimeout(() => {
      setCanvasLoaded(true)
    }, 500)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  // Static 2D Blueprint SVG schematic fallback for low performance/mobile screens
  const renderFallbackSchematic = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 select-none scale-90 sm:scale-100">
      <svg
        viewBox="0 0 200 200"
        className={`w-64 h-64 md:w-80 md:h-80 stroke-signal-cyan fill-none ${!isReduced ? 'animate-[bounce_6s_infinite_ease-in-out]' : ''}`}
        strokeWidth="1"
      >
        {/* Radar grids */}
        <circle cx="100" cy="100" r="85" strokeDasharray="2,6" />
        <circle cx="100" cy="100" r="55" className="stroke-warning-amber" strokeDasharray="4,4" />
        <circle cx="100" cy="100" r="25" strokeWidth="0.5" />
        
        {/* Crosshairs */}
        <line x1="10" y1="100" x2="190" y2="100" strokeDasharray="1,4" />
        <line x1="100" y1="10" x2="100" y2="190" strokeDasharray="1,4" />
        
        {/* Skull CAD wireframe path */}
        <path d="M 100,50 L 135,70 L 135,115 L 120,135 L 120,150 L 80,150 L 80,135 L 65,115 L 65,70 Z" />
        <path d="M 75,95 L 90,95 L 90,105 L 75,105 Z" />
        <path d="M 125,95 L 110,95 L 110,105 L 125,105 Z" />
        <path d="M 90,130 L 110,130" />
      </svg>
    </div>
  )

  return (
    <section
      id="identity-sys"
      className="relative w-full min-h-screen bg-void-black text-chrome flex flex-col justify-between overflow-hidden"
    >
      {/* HUD scanline and CRT grid textures inside Hero */}
      <div className="hud-scanline" />

      {/* Viewport Boundary Bracket Overlay */}
      <div className="absolute inset-4 md:inset-8 border border-chrome/5 pointer-events-none z-20">
        <div className="absolute top-[-1px] left-[-1px] w-6 h-6 border-t-2 border-l-2 border-signal-cyan/60" />
        <div className="absolute top-[-1px] right-[-1px] w-6 h-6 border-t-2 border-r-2 border-signal-cyan/60" />
        <div className="absolute bottom-[-1px] left-[-1px] w-6 h-6 border-b-2 border-l-2 border-signal-cyan/60" />
        <div className="absolute bottom-[-1px] right-[-1px] w-6 h-6 border-b-2 border-r-2 border-signal-cyan/60" />
      </div>

      {/* Top HUD Bar */}
      <div className="w-full flex justify-between items-start p-6 md:p-12 z-30 font-mono text-[9px] md:text-xs tracking-widest text-chrome/50">
        <div className="flex flex-col gap-1">
          <span>COGNITIVE.STATE: ONLINE</span>
          <span>NEURAL.LINK: ESTABLISHED (0x3F)</span>
        </div>
        <div className="text-right flex flex-col gap-1">
          <span className="text-warning-amber font-semibold animate-pulse">WARNING: BIO-CELL DEGRADATION</span>
          <span>SYSTEM.TEL: SYNTH-01_SYS_v2.09</span>
        </div>
      </div>

      {/* Middle Grid containing Title and 3D Canvas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-16 gap-8 z-10">
        
        {/* Left HUD Panel - Identity Telemetry */}
        <div className="lg:col-span-4 flex flex-col justify-center items-start text-left gap-4 lg:gap-6 pointer-events-none">
          <div className="font-mono text-[10px] tracking-widest text-signal-cyan font-bold bg-signal-cyan/10 px-2.5 py-1 border border-signal-cyan/20">
            [ SEC.IDENTITY.SYS ]
          </div>
          
          <h1 className="flex flex-col text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-none uppercase">
            <GlitchText text="SYNTH-01" className="text-signal-cyan" speed={30} delay={100} />
            <span className="text-chrome font-light text-xl md:text-2xl mt-1 tracking-widest">
              BIOPHONIC CONSCIOUSNESS
            </span>
          </h1>

          <p className="font-body text-xs md:text-sm text-chrome/60 max-w-sm font-light leading-relaxed">
            Final project submission for IIT Bombay final-year showcase. 
            Calibrating biomechanical telemetry, synaptic memory blocks, and diagnostic neural systems.
          </p>

          <div className="flex items-center gap-4 mt-2 pointer-events-auto">
            <MagneticButton glowColor="cyan" onClick={() => document.getElementById('core-spec')?.scrollIntoView({ behavior: 'smooth' })}>
              DIAGNOSE CORE SPEC
            </MagneticButton>
          </div>
        </div>

        {/* Center/Right 3D Interactive Model or Static Schematic Blueprint */}
        <div className="lg:col-span-8 h-[50vh] lg:h-[70vh] w-full relative flex items-center justify-center">
          
          {/* Diagnostic Crosshair overlays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 opacity-30">
            <div className="w-48 h-48 border border-chrome/10 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 border border-dashed border-chrome/10 rounded-full"></div>
            </div>
            <div className="absolute w-64 h-[1px] bg-chrome/10"></div>
            <div className="absolute h-64 w-[1px] bg-chrome/10"></div>
          </div>

          {/* Canvas Render with mobile degradation fallbacks */}
          {canvasLoaded ? (
            isMobile ? (
              // Mobile runs static SVG schematic fallback for lightweight performance
              renderFallbackSchematic()
            ) : (
              <Suspense fallback={renderFallbackSchematic()}>
                {/* Desktop runs full 3D with 300 sparkles */}
                <Hero3DScene particleCount={300} />
              </Suspense>
            )
          ) : (
            renderFallbackSchematic()
          )}

          {/* Interactive Help Prompt */}
          <div className="absolute bottom-4 right-4 bg-gunmetal/70 backdrop-blur-sm border border-chrome/10 px-3 py-1.5 font-mono text-[9px] text-chrome/40 tracking-wider pointer-events-none select-none">
            [ DRAG ROTATION MESH // TOUCH TO INSPECT ]
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full flex flex-col items-center justify-center pb-6 md:pb-10 font-mono text-[9px] tracking-widest text-chrome/40 select-none z-30">
        <span className="mb-2">ENGAGE SCROLL TO COMMENCE SYNC</span>
        <button
          onClick={() => document.getElementById('core-spec')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-8 h-8 rounded-full border border-chrome/10 flex items-center justify-center hover:border-signal-cyan/50 hover:text-signal-cyan cursor-pointer transition-all duration-300 group"
          aria-label="Scroll down to Core Spec module"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transform group-hover:translate-y-0.5 transition-transform duration-300 text-chrome/60 group-hover:text-signal-cyan"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
}
