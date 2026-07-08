import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HudPanel } from '../ui/HudPanel'
import { Cpu, Eye, Activity, Radio } from 'lucide-react'
import { startIdlePulse, startCircuitRotation } from '../../animations/animeSequences'

const MODULES = [
  {
    id: 'M-01',
    code: 'COGNITIVE.PRO',
    title: 'Cognitive Processor',
    description: '128-core bio-silicon neural array. Handles pattern extraction, real-time sensor fusion, and predictive diagnostic tracking.',
    icon: Cpu,
    color: 'cyan',
    pulse: true,
  },
  {
    id: 'M-02',
    code: 'OPTIC.HUD',
    title: 'Optic Overlay',
    description: 'Active heads-up display rendering target telemetry, thermal overlay coordinates, and mechanical damage wireframes.',
    icon: Eye,
    color: 'cyan',
    pulse: false,
    rotate: true,
  },
  {
    id: 'M-03',
    code: 'ACTUATOR.SYS',
    title: 'Joint Actuation',
    description: 'Feedback-loop motor controllers governing micro-mechanical joints, hydraulic limb valves, and recoil absorption.',
    icon: Activity,
    color: 'amber',
    pulse: true,
  },
  {
    id: 'M-04',
    code: 'UPLINK.COM',
    title: 'Satellite Uplink',
    description: 'High-bandwidth encrypted telemetry bridge streaming local diagnostic logs directly to main mechatronics labs.',
    icon: Radio,
    color: 'cyan',
    pulse: false,
    rotate: true,
  },
]

export function ModuleGrid() {
  const iconRefs = useRef([])

  useEffect(() => {
    const animations = []
    
    // Apply anime.js loop animations based on card configurations
    MODULES.forEach((mod, index) => {
      const el = iconRefs.current[index]
      if (!el) return

      if (mod.pulse) {
        const anim = startIdlePulse(el, 1.08, 1200 + index * 200)
        if (anim) animations.push(anim)
      } else if (mod.rotate) {
        const anim = startCircuitRotation(el, 15000 + index * 5000)
        if (anim) animations.push(anim)
      }
    })

    return () => {
      // Clean up animations on unmount
      animations.forEach(anim => anim.pause())
    }
  }, [])

  // Framer Motion staggered transition parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 90, 
        damping: 14 
      } 
    }
  }

  return (
    <section
      id="module-grid"
      className="relative min-h-screen bg-void-black text-chrome flex flex-col justify-center py-20 px-6 md:px-16 overflow-hidden"
    >
      {/* Background GRID grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,205,211,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,205,211,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        {/* Header HUD detail */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-chrome/10 pb-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-widest text-signal-cyan font-bold">
              [ SEC.MODULE.GRID ]
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-black tracking-wider uppercase">
              CYBERNETIC SUB-SYSTEMS
            </h2>
          </div>
          <span className="font-mono text-[9px] text-chrome/40 tracking-widest mt-2 md:mt-0">
            TOTAL_ACTIVE_MODULES: 0x04 // CODE_STATUS: STEADY
          </span>
        </div>

        {/* Staggered cards list using motion.div */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {MODULES.map((mod, index) => {
            const IconComp = mod.icon
            return (
              <motion.div
                key={mod.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="h-full flex"
              >
                <HudPanel
                  title={`${mod.id} // ${mod.code}`}
                  status="STABLE"
                  glowColor={mod.color}
                  className="w-full flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    {/* SVG Icon inside circular trace */}
                    <div className="flex justify-start">
                      <div className="p-3 border border-chrome/10 bg-void-black relative">
                        {/* Brackets around icon */}
                        <span className="absolute top-[-1px] left-[-1px] w-1.5 h-1.5 border-t border-l border-signal-cyan" />
                        <span className="absolute bottom-[-1px] right-[-1px] w-1.5 h-1.5 border-b border-r border-signal-cyan" />
                        
                        <div ref={el => iconRefs.current[index] = el}>
                          <IconComp 
                            className={`w-6 h-6 ${mod.color === 'amber' ? 'text-warning-amber' : 'text-signal-cyan'}`} 
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="font-display text-base font-bold uppercase tracking-wider text-chrome/90">
                        {mod.title}
                      </h4>
                      <p className="font-body text-xs text-chrome/60 leading-relaxed font-light">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-chrome/5 pt-4 mt-6 flex justify-between items-center font-mono text-[9px] text-chrome/30">
                    <span>SECTOR_0x0{index + 1}</span>
                    <span>ACTIVE_LINK</span>
                  </div>
                </HudPanel>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
