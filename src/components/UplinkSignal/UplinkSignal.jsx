import React, { useEffect, useRef, useState } from 'react'
import { HudPanel } from '../ui/HudPanel'
import { MagneticButton } from '../ui/MagneticButton'
import { initShowcaseTimeline } from '../../animations/gsapTimelines'

const PROJECTS = [
  {
    num: '01',
    code: 'BIO.LIMB.SYS',
    title: 'Prosthetic Actuator Limb',
    labs: 'IITB MECHATRONICS LAB A-12',
    tech: 'SOLIDWORKS // C++ // REACT SPRING',
    desc: 'Development of an active robotic limb with built-in closed-loop sensory feed. Achieved synaptic latency under 15ms using spring load torque equations.',
    specFile: 'BIO_LIMB_SPEC_v4.pdf'
  },
  {
    num: '02',
    code: 'EYE.TRACK.MOD',
    title: 'Neural Eye Tracking Grid',
    labs: 'IITB COGNITIVE RESEARCH WING',
    tech: 'PYTHON // OPENCV // TENSORFLOW',
    desc: 'Real-time eye coordinate HUD targeting system. Tracks pupil coordinates with calibration algorithms and maps vector focal planes on glass overlays.',
    specFile: 'EYE_HUD_CALIBRATION.dat'
  },
  {
    num: '03',
    code: 'SIG.FILTER.AMP',
    title: 'Biophonic Frequency Filter',
    labs: 'IITB SIGNALS & CIRCUITS DIV',
    tech: 'MATLAB // SPICE // ANALOG FILTER',
    desc: 'Analog filter array resolving ambient signal degradation in synthetic neural pathways. Dampens electronic muscle crosstalk and isolates microvolt spikes.',
    specFile: 'FILTER_CIRCUIT_SCHEM.cad'
  }
]

export function UplinkSignal() {
  const sectionRef = useRef(null)
  const horizontalRef = useRef(null)
  const progressRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen breakpoint for responsive degradation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hook horizontal timeline on desktop
  useEffect(() => {
    if (isMobile) return

    const section = sectionRef.current
    const container = horizontalRef.current
    const progress = progressRef.current

    const tl = initShowcaseTimeline(section, container, progress)

    return () => {
      if (tl) tl.kill()
    }
  }, [isMobile])

  return (
    <section
      id="uplink-signal"
      ref={sectionRef}
      className={`relative bg-void-black text-chrome flex flex-col justify-center overflow-hidden ${
        isMobile ? 'py-20 px-6' : 'h-screen'
      }`}
    >
      {/* Background visual grid elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(20,22,26,0.6)_0%,rgba(10,11,13,1)_100%)] z-0" />

      {/* Viewport content */}
      <div className={`w-full max-w-7xl mx-auto z-10 relative flex flex-col ${!isMobile ? 'h-full justify-between py-12' : ''}`}>
        
        {/* Section Header */}
        <div className="border-b border-chrome/10 pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between text-left">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs tracking-widest text-signal-cyan font-bold">
              [ SEC.UPLINK.SIGNAL ]
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-black tracking-wider uppercase">
              PROJECT PORTFOLIO
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end font-mono text-[9px] text-chrome/40 mt-2 md:mt-0 gap-1">
            <span>UPLINK_STATUS: CHANNEL_ESTABLISHED</span>
            {!isMobile && (
              <div className="w-48 h-1 bg-gunmetal relative mt-1 border border-chrome/10">
                <div ref={progressRef} className="absolute left-0 top-0 bottom-0 bg-signal-cyan" />
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Project Tiles Scroller */}
        {isMobile ? (
          // Mobile Fallback: Standard vertical stack
          <div className="flex flex-col gap-8 text-left">
            {PROJECTS.map((proj) => (
              <HudPanel
                key={proj.num}
                title={`PRJ.${proj.num} // ${proj.code}`}
                status="ONLINE"
                glowColor="cyan"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-warning-amber">{proj.labs}</span>
                    <h3 className="font-display text-lg font-black uppercase tracking-wider text-chrome">{proj.title}</h3>
                  </div>
                  <p className="font-body text-xs md:text-sm text-chrome/60 font-light leading-relaxed">{proj.desc}</p>
                  
                  <div className="border-t border-chrome/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <span className="font-mono text-[9px] text-chrome/30">{proj.tech}</span>
                    <MagneticButton glowColor="cyan" className="w-full sm:w-auto">
                      DOWNLOAD SPECS
                    </MagneticButton>
                  </div>
                </div>
              </HudPanel>
            ))}
          </div>
        ) : (
          // Desktop: GSAP pinned horizontal slider
          <div className="flex-1 flex items-center relative overflow-hidden">
            <div
              ref={horizontalRef}
              className="flex gap-8 px-4 items-stretch absolute left-0"
              style={{ width: 'max-content' }}
            >
              {PROJECTS.map((proj) => (
                <div key={proj.num} className="w-[500px] flex text-left">
                  <HudPanel
                    title={`PRJ.${proj.num} // ${proj.code}`}
                    status="ONLINE"
                    glowColor="cyan"
                    className="w-full flex flex-col justify-between p-8"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] text-warning-amber tracking-widest">{proj.labs}</span>
                        <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-wide text-chrome/90">{proj.title}</h3>
                      </div>
                      <p className="font-body text-xs md:text-sm text-chrome/60 leading-relaxed font-light">{proj.desc}</p>
                    </div>

                    <div className="border-t border-chrome/5 pt-6 mt-8 flex justify-between items-center gap-4">
                      <span className="font-mono text-[9px] text-chrome/30 tracking-wider">{proj.tech}</span>
                      <MagneticButton glowColor="cyan">
                        DOWNLOAD SPECS
                      </MagneticButton>
                    </div>
                  </HudPanel>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer layout detail */}
        {!isMobile && (
          <div className="font-mono text-[9px] text-chrome/30 tracking-widest border-t border-chrome/10 pt-4 flex justify-between items-center select-none">
            <span>IIT BOMBAY // MECHATRONICS SHOWCASE</span>
            <span>UPLINK_BANDWIDTH: 1.2 GB/S // RETRY_COUNT: 0</span>
          </div>
        )}

      </div>
    </section>
  )
}
