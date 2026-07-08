import React from 'react'

export function HudPanel({
  children,
  title,
  status = 'ONLINE',
  cornerAccents = true,
  glowColor = 'cyan', // 'cyan' | 'amber' | 'red'
  bleed = 'none', // 'left' | 'right' | 'none'
  className = '',
  id,
}) {
  // Glow styles mapping
  const borderGlowMap = {
    cyan: 'border-signal-cyan/20 hover:border-signal-cyan/50 focus-within:border-signal-cyan/50 hover:shadow-[0_0_15px_rgba(77,232,224,0.15)]',
    amber: 'border-warning-amber/20 hover:border-warning-amber/50 focus-within:border-warning-amber/50 hover:shadow-[0_0_15px_rgba(255,122,61,0.15)]',
    red: 'border-vein-red/20 hover:border-vein-red/50 focus-within:border-vein-red/50 hover:shadow-[0_0_15px_rgba(232,56,79,0.15)]',
  }

  const textGlowMap = {
    cyan: 'text-signal-cyan',
    amber: 'text-warning-amber',
    red: 'text-vein-red',
  }

  const borderLightMap = {
    cyan: 'border-signal-cyan',
    amber: 'border-warning-amber',
    red: 'border-vein-red',
  }

  // Bleed classes
  const bleedClass = {
    left: 'bleed-left md:-ml-8 md:pl-8',
    right: 'bleed-right md:-mr-8 md:pr-8',
    none: '',
  }[bleed]

  return (
    <div
      id={id}
      className={`relative bg-glass-overlay backdrop-blur-md border border-chrome/10 ${borderGlowMap[glowColor]} transition-all duration-300 p-6 font-body text-chrome ${bleedClass} ${className}`}
    >
      {/* Corner Brackets */}
      {cornerAccents && (
        <>
          <div className={`absolute top-[-1px] left-[-1px] w-3 h-3 border-t-2 border-l-2 ${borderLightMap[glowColor]}`} />
          <div className={`absolute top-[-1px] right-[-1px] w-3 h-3 border-t-2 border-r-2 ${borderLightMap[glowColor]}`} />
          <div className={`absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-2 border-l-2 ${borderLightMap[glowColor]}`} />
          <div className={`absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-2 border-r-2 ${borderLightMap[glowColor]}`} />
        </>
      )}

      {/* Decorative Viewfinder ticks (Micro-details) */}
      <div className="absolute top-2 right-4 flex items-center gap-1 opacity-40 text-[9px] font-mono">
        <span className="w-1.5 h-1.5 bg-chrome/40 inline-block rounded-full"></span>
        <span>SYS.{status}</span>
      </div>

      {/* Panel Title */}
      {title && (
        <div className="mb-4 border-b border-chrome/10 pb-2 flex items-center justify-between">
          <h3 className={`font-display text-sm md:text-base font-semibold uppercase tracking-widest ${textGlowMap[glowColor]}`}>
            // {title}
          </h3>
          <span className="font-mono text-[9px] opacity-40">LOC.0x{Math.floor(Math.random() * 256).toString(16).toUpperCase()}</span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Decorative background grid line element */}
      <div className="absolute bottom-2 left-4 w-12 h-[1px] bg-chrome/5"></div>
    </div>
  )
}
