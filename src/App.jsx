import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BootSequence } from './components/BootSequence/BootSequence'
import { Hero3D } from './components/Hero3D/Hero3D'
import { CoreSpec } from './components/CoreSpec/CoreSpec'
import { ModuleGrid } from './components/ModuleGrid/ModuleGrid'
import { NeuralLog } from './components/NeuralLog/NeuralLog'
import { UplinkSignal } from './components/UplinkSignal/UplinkSignal'
import { TransmitForm } from './components/TransmitForm/TransmitForm'
import { Footer } from './components/Footer/Footer'

const NAV_MODULES = [
  { code: 'IDENTITY.SYS', target: 'identity-sys' },
  { code: 'CORE.SPEC', target: 'core-spec' },
  { code: 'MODULE.GRID', target: 'module-grid' },
  { code: 'NEURAL.LOG', target: 'neural-log' },
  { code: 'UPLINK.SIGNAL', target: 'uplink-signal' },
  { code: 'TRANSMIT.MSG', target: 'transmit-msg' },
]

function App() {
  const [bootComplete, setBootComplete] = useState(false)

  const handleScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative bg-void-black text-chrome selection:bg-signal-cyan/30 selection:text-signal-cyan min-h-screen">
      {/* Global CRT overlay texture */}
      <div className="crt-overlay" />

      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <motion.div
            key="boot"
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              filter: 'blur(10px) brightness(2)',
              transition: { duration: 0.8, ease: 'easeInOut' } 
            }}
          >
            <BootSequence onComplete={() => setBootComplete(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen"
          >
            {/* Sticky HUD Navigation Header */}
            <motion.header
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 15 }}
              className="sticky top-0 z-50 w-full bg-void-black/80 backdrop-blur-md border-b border-chrome/10 py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 select-none"
            >
              {/* Brand identifier */}
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScrollTo('identity-sys')}>
                <span className="font-display font-black text-sm tracking-widest text-signal-cyan">
                  SYNTH-01
                </span>
                <span className="font-mono text-[9px] text-chrome/30 tracking-widest border border-chrome/20 px-2 py-0.5">
                  SYS.V.01
                </span>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-wrap justify-center gap-2 md:gap-6 font-mono text-[9px] md:text-xs">
                {NAV_MODULES.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => handleScrollTo(item.target)}
                    className="hover:text-signal-cyan active:scale-95 transition-all text-chrome/60 tracking-widest uppercase cursor-pointer py-1 px-2 border border-transparent hover:border-signal-cyan/20 hover:bg-signal-cyan/5 focus-visible:outline-signal-cyan"
                  >
                    {item.code}
                  </button>
                ))}
              </nav>

              {/* Auxiliary System telemetry indicators */}
              <div className="hidden lg:flex items-center gap-4 font-mono text-[9px] text-chrome/40 tracking-wider">
                <span>COORD.404_BOMBAY</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan pulse-led-cyan" />
                  <span>SYNC.OK</span>
                </div>
              </div>
            </motion.header>

            {/* Dashboard Sections */}
            <main className="flex-1 w-full">
              <Hero3D />
              <CoreSpec />
              <ModuleGrid />
              <NeuralLog />
              <UplinkSignal />
              <TransmitForm />
            </main>

            {/* Sticky/Interactive Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
