import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { drawSvgPath } from '../../animations/animeSequences'
import { MagneticButton } from '../ui/MagneticButton'

const DIAGNOSTIC_MESSAGES = [
  '>> CONFIGURING NEURAL BRIDGE [PORT.0x4F]... OK',
  '>> SYNAPTIC INJECTORS CALIBRATING [STABLE]... OK',
  '>> LOAD BINARY SHADERS: CORE.SPEC // GLITCH.SYS... OK',
  '>> INTEGRITY CHECK: 89.2% RECONSTRUCTED... OK',
  '>> RETINA HUD SCANNER: IDENTIFIED: SYNTH-01... OK',
  '>> UPLINK CONNECTIVITY: SECURE CHANNEL ESTABLISHED... OK',
  '>> SYSTEM STATUS: COGNITIVE OVERRIDE ACTIVE.'
]

export function BootSequence({ onComplete }) {
  const [messages, setMessages] = useState([])
  const [showLogo, setShowLogo] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const svgRef = useRef(null)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < DIAGNOSTIC_MESSAGES.length) {
        setMessages((prev) => [...prev, DIAGNOSTIC_MESSAGES[index]])
        index++
      } else {
        clearInterval(interval)
        setShowLogo(true)
      }
    }, 250)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showLogo && svgRef.current) {
      // Trigger SVG path drawing
      drawSvgPath(svgRef.current, 2000, 150, () => {
        // SVG drawing complete, show terminal unlock button
        setShowBtn(true)
      })
    }
  }, [showLogo])

  // Trigger glitch transition out
  const handleBootComplete = () => {
    onComplete()
  }

  return (
    <div className="fixed inset-0 bg-void-black text-chrome font-mono flex flex-col items-center justify-center p-6 z-[9999] overflow-hidden select-none">
      {/* HUD scanline & CRT scan */}
      <div className="hud-scanline" />
      <div className="crt-overlay" />

      {/* Terminal Viewport */}
      <div className="w-full max-w-2xl border border-chrome/15 bg-gunmetal/80 backdrop-blur-md p-6 relative">
        {/* Corners */}
        <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-2 border-l-2 border-signal-cyan" />
        <div className="absolute top-[-1px] right-[-1px] w-3 h-3 border-t-2 border-r-2 border-signal-cyan" />
        <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-2 border-l-2 border-signal-cyan" />
        <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-2 border-r-2 border-signal-cyan" />

        {/* Viewport bar */}
        <div className="flex justify-between items-center text-[10px] border-b border-chrome/10 pb-2 mb-4 opacity-60">
          <span>MODULE: BOOT.SYS // UNIT: SYNTH-01</span>
          <span>SYS.LOAD: 98.4%</span>
        </div>

        {/* Text Area */}
        <div className="h-44 text-xs md:text-sm text-left flex flex-col justify-start gap-1 overflow-hidden">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={i === DIAGNOSTIC_MESSAGES.length - 1 ? 'text-signal-cyan font-semibold' : 'text-chrome/70'}
            >
              {msg}
            </motion.div>
          ))}
          {/* Pulsing prompt dot */}
          {messages.length < DIAGNOSTIC_MESSAGES.length && (
            <span className="w-2 h-4 bg-signal-cyan animate-pulse inline-block"></span>
          )}
        </div>

        {/* Dynamic Vector Logo container */}
        <div className="h-36 flex items-center justify-center my-4">
          {showLogo && (
            <svg
              ref={svgRef}
              viewBox="0 0 100 100"
              className="w-24 h-24 stroke-signal-cyan fill-none"
              strokeWidth="1.5"
            >
              {/* Outer mechanical hexagon bracket */}
              <path d="M 50,5 L 89,27.5 L 89,72.5 L 50,95 L 11,72.5 L 11,27.5 Z" />
              {/* Inner geometric core cross */}
              <path d="M 50,20 L 50,80" />
              <path d="M 20,50 L 80,50" />
              {/* Corner sub-lines */}
              <path d="M 27,27 L 43,43" />
              <path d="M 73,27 L 57,43" />
              <path d="M 27,73 L 43,57" />
              <path d="M 73,73 L 57,57" />
              {/* Bio-mechanical central core ring */}
              <path d="M 50,40 A 10,10 0 1,0 50,60 A 10,10 0 1,0 50,40" className="stroke-warning-amber" />
            </svg>
          )}
        </div>

        {/* Buttons / Skip actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center border-t border-chrome/10 pt-4">
          {showBtn ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
            >
              <MagneticButton onClick={handleBootComplete} glowColor="amber">
                INITIALIZE HUD COGNITION
              </MagneticButton>
            </motion.div>
          ) : (
            <div className="w-full flex justify-between items-center px-4">
              <span className="text-[10px] opacity-40 uppercase tracking-widest animate-pulse">Running Diagnostic Sequence...</span>
              <button
                onClick={handleBootComplete}
                className="text-[10px] text-warning-amber/80 hover:text-warning-amber font-bold tracking-widest uppercase hover:underline cursor-pointer border border-warning-amber/20 hover:border-warning-amber/50 px-3 py-1 bg-void-black/50"
              >
                SKIP INTERFACE CHECK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
