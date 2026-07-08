import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { HudPanel } from '../ui/HudPanel'
import { initLogLineTimeline } from '../../animations/gsapTimelines'

const TIMELINE_NODES = [
  {
    step: '01',
    code: 'ORG.ORIGIN',
    title: 'Biological Base Frame',
    date: 'YEAR.000',
    description: 'Human nervous system baseline established. Synaptic memory structures initialized. Normal cognitive mapping, emotional anchoring, and mechatronic blueprinting.',
    status: 'RECORDED',
    color: 'cyan'
  },
  {
    step: '02',
    code: 'MECH.AUGMENT',
    title: 'Biomechanical Integration',
    date: 'YEAR.002',
    description: 'Surgical augmentation of primary limbs with carbon-fiber shells and titanium actuators. Synaptic bridges installed for digital neural loopbacks.',
    status: 'INTEGRATED',
    color: 'amber'
  },
  {
    step: '03',
    code: 'COG.OVERRIDE',
    title: 'Cognitive Synapse Splice',
    date: 'YEAR.003',
    description: 'Full bio-silicon splice executed in mechatronics labs. Biological mind-state synced with digital recovery bootloaders. SYNTH-01 designation online.',
    status: 'ONLINE',
    color: 'red'
  }
]

export function NeuralLog() {
  const containerRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const line = lineRef.current

    // Initialize GSAP scroll-drawn timeline progress line
    const tl = initLogLineTimeline(container, line)

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <section
      id="neural-log"
      ref={containerRef}
      className="relative min-h-screen bg-void-black text-chrome flex flex-col justify-center py-20 px-6 md:px-16 overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Section Header */}
        <div className="mb-16 border-b border-chrome/10 pb-4 flex flex-col md:flex-row md:items-end justify-between">
          <div className="flex flex-col gap-2 text-left">
            <span className="font-mono text-xs tracking-widest text-warning-amber font-bold">
              [ SEC.NEURAL.LOG ]
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-black tracking-wider uppercase">
              CHRONOLOGY PROTOCOL
            </h2>
          </div>
          <span className="font-mono text-[9px] text-chrome/40 tracking-widest mt-2 md:mt-0">
            SEQUENCE_TYPE: GENUINE_UPGRADES // TELEMETRY: READABLE
          </span>
        </div>

        {/* Timeline body with left-aligned animated line */}
        <div className="relative pl-8 md:pl-16 text-left">
          
          {/* Static gray timeline backing line */}
          <div className="absolute left-[3px] md:left-[7px] top-4 bottom-4 w-[1px] bg-chrome/10" />

          {/* GSAP Scroll-scrubbed active glowing line */}
          <div 
            ref={lineRef} 
            className="absolute left-[2px] md:left-[6px] top-4 bottom-4 w-[3px] bg-gradient-to-b from-signal-cyan via-warning-amber to-vein-red origin-top" 
          />

          {/* List of nodes */}
          <div className="flex flex-col gap-12">
            {TIMELINE_NODES.map((node, i) => {
              const borderLightMap = {
                cyan: 'bg-signal-cyan shadow-[0_0_10px_rgba(77,232,224,0.8)]',
                amber: 'bg-warning-amber shadow-[0_0_10px_rgba(255,122,61,0.8)]',
                red: 'bg-vein-red shadow-[0_0_10px_rgba(232,56,79,0.8)]'
              }

              return (
                <motion.div
                  key={node.step}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative"
                >
                  {/* Glowing connector dot on vertical line */}
                  <span className={`absolute left-[-37px] md:left-[-45px] top-6 w-3 h-3 rounded-full border border-void-black z-20 ${borderLightMap[node.color]}`} />

                  {/* Date details hanging next to the node dot */}
                  <div className="absolute left-[-37px] md:left-[-45px] top-12 font-mono text-[8px] text-chrome/30 tracking-widest uppercase rotate-90 origin-left mt-2 whitespace-nowrap">
                    {node.date}
                  </div>

                  {/* Main HUD card panel */}
                  <HudPanel
                    title={`UPGRADE.LOG_${node.step} // ${node.code}`}
                    status={node.status}
                    glowColor={node.color}
                    className="shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex flex-col gap-2">
                      <h4 className="font-display text-base md:text-lg font-black uppercase text-chrome/90">
                        {node.title}
                      </h4>
                      <p className="font-body text-xs md:text-sm text-chrome/60 leading-relaxed font-light">
                        {node.description}
                      </p>
                    </div>
                  </HudPanel>
                </motion.div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
