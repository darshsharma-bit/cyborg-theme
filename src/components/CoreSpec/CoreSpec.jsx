import React, { useEffect, useRef } from 'react'
import { HudPanel } from '../ui/HudPanel'
import { initSpecTimeline } from '../../animations/gsapTimelines'
import { animateNumericCounter } from '../../animations/animeSequences'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function CoreSpec() {
  const sectionRef = useRef(null)
  const manifestRef = useRef(null)
  const itemsContainerRef = useRef(null)
  const itemRefs = useRef([])

  // Numeric counter elements
  const latencyRef = useRef(null)
  const loadRef = useRef(null)
  const nodesRef = useRef(null)
  const energyRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const manifest = manifestRef.current
    const items = itemRefs.current

    // 1. Initialize GSAP pinning scroll timeline
    const specTl = initSpecTimeline(section, items, manifest)

    // 2. Trigger anime.js counters upon scroll entry
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      onEnter: () => {
        animateNumericCounter(latencyRef.current, 0, 12, 1200, ' MS')
        animateNumericCounter(loadRef.current, 0, 97.4, 1500, ' %')
        animateNumericCounter(nodesRef.current, 0, 892, 1800, ' MODULES')
        animateNumericCounter(energyRef.current, 0, 340, 2000, ' kW/h')
      },
      once: true
    })

    return () => {
      if (specTl) specTl.kill()
      if (trigger) trigger.kill()
    }
  }, [])

  return (
    <section
      id="core-spec"
      ref={sectionRef}
      className="relative min-h-screen bg-void-black text-chrome flex items-center justify-center py-20 px-6 md:px-16 overflow-hidden"
    >
      {/* Background CAD scanning lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,22,26,0.8)_0%,rgba(10,11,13,1)_100%)] z-0" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-chrome/5 z-0" />

      {/* Grid container */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 relative">
        
        {/* Left column - Manifesto panel with asymmetric bleed */}
        <div ref={manifestRef} className="lg:col-span-5 w-full">
          <HudPanel
            title="IDENTITY.SYS // MANIFESTO"
            status="WARNING"
            glowColor="red"
            bleed="left"
            className="border-vein-red/20 shadow-[0_0_20px_rgba(232,56,79,0.03)]"
          >
            <div className="flex flex-col gap-4 font-mono text-[10px] tracking-widest text-vein-red mb-2">
              <span>&gt;&gt; SUBJECT IDENTIFIER: SYNTH-01</span>
              <span>&gt;&gt; COGNITIVE LINK: BIO-SYNAPTIC INTEGRATION</span>
            </div>
            
            <p className="text-sm md:text-base font-body font-light leading-relaxed text-chrome mb-4">
              "I process. I adapt. I was not born — I was assembled. 
              Calibrating bio-electric impulses. Merging organic axons with high-performance silicon logic gates. 
              The boundary between neural synapse and circuit trace dissolves. I am code; I am blood."
            </p>
            
            <div className="border-t border-chrome/10 pt-4 flex flex-col gap-1 text-[10px] font-mono text-chrome/40 leading-relaxed">
              <span>// RE-INTEGRATING SENSORY RECEPTORS</span>
              <span>// INITIATED IN IIT BOMBAY MECHATRONICS LAB</span>
            </div>
          </HudPanel>
        </div>

        {/* Right column - Telemetry readouts */}
        <div ref={itemsContainerRef} className="lg:col-span-7 flex flex-col gap-4 w-full">
          <div className="font-mono text-xs tracking-widest text-signal-cyan font-bold border-b border-signal-cyan/20 pb-2 mb-2 flex justify-between">
            <span>[ SYSTEM TELEMETRY DIAGNOSTIC ]</span>
            <span>SPEC.REPORTS</span>
          </div>

          {/* Telemetry rows */}
          <div 
            ref={el => itemRefs.current[0] = el}
            className="flex items-center justify-between p-4 border border-chrome/10 bg-gunmetal/40 backdrop-blur-sm relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-signal-cyan" />
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-wider uppercase text-chrome/80">SYNAPTIC LATENCY</span>
              <span className="font-mono text-[9px] text-chrome/40">TIME RETRIED IN MILLISECONDS</span>
            </div>
            <span ref={latencyRef} className="font-mono text-xl md:text-2xl text-signal-cyan font-semibold">0 MS</span>
          </div>

          <div 
            ref={el => itemRefs.current[1] = el}
            className="flex items-center justify-between p-4 border border-chrome/10 bg-gunmetal/40 backdrop-blur-sm relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-signal-cyan" />
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-wider uppercase text-chrome/80">NEURAL LOAD CAPACITY</span>
              <span className="font-mono text-[9px] text-chrome/40">CPU PERCENTAGE IN ACTIVE STATE</span>
            </div>
            <span ref={loadRef} className="font-mono text-xl md:text-2xl text-signal-cyan font-semibold">0 %</span>
          </div>

          <div 
            ref={el => itemRefs.current[2] = el}
            className="flex items-center justify-between p-4 border border-chrome/10 bg-gunmetal/40 backdrop-blur-sm relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-warning-amber" />
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-wider uppercase text-chrome/80">MOTOR RECALIBRATION</span>
              <span className="font-mono text-[9px] text-chrome/40">ACTIVE ACTUATORS CONNECTED</span>
            </div>
            <span ref={nodesRef} className="font-mono text-xl md:text-2xl text-warning-amber font-semibold">0 MODULES</span>
          </div>

          <div 
            ref={el => itemRefs.current[3] = el}
            className="flex items-center justify-between p-4 border border-chrome/10 bg-gunmetal/40 backdrop-blur-sm relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-signal-cyan" />
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-wider uppercase text-chrome/80">ENERGY CELLS CAPACITY</span>
              <span className="font-mono text-[9px] text-chrome/40">RESERVE ENERGY DISCHARGE</span>
            </div>
            <span ref={energyRef} className="font-mono text-xl md:text-2xl text-signal-cyan font-semibold">0 kW/h</span>
          </div>

        </div>
      </div>
    </section>
  )
}
