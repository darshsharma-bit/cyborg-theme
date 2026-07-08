import React from 'react'

export function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-void-black border-t border-chrome/10 py-8 px-6 md:px-16 font-mono text-[9px] md:text-xs text-chrome/40 relative z-30 select-none">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Status indicator line */}
        <div className="flex items-center gap-2">
          {/* LED blinker */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-cyan"></span>
          </span>
          <span className="tracking-widest">SYSTEM STATUS: COGNITIVE HUD ONLINE</span>
        </div>

        {/* IIT Bombay Academic Info */}
        <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-1 md:gap-4 tracking-widest text-chrome/30">
          <span>IIT BOMBAY // FINAL YEAR SHOWCASE</span>
          <span className="hidden md:inline">|</span>
          <span>©2026 CYBORG_LAB_SYNTH-01</span>
        </div>

        {/* Scroll back trigger */}
        <button
          onClick={handleScrollTop}
          className="uppercase tracking-widest hover:text-signal-cyan transition-colors duration-300 border border-chrome/10 hover:border-signal-cyan/50 px-3 py-1 bg-gunmetal/30 focus-visible:outline-signal-cyan"
        >
          [ RE-EXECUTE BOOT PATH ]
        </button>

      </div>
    </footer>
  )
}
