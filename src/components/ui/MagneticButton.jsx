import React, { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function MagneticButton({
  children,
  onClick,
  className = '',
  glowColor = 'cyan', // 'cyan' | 'amber' | 'red'
  disabled = false,
  type = 'button',
  ...props
}) {
  const buttonRef = useRef(null)
  const isReduced = useReducedMotion()

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 180, friction: 12 }
  }))

  const handleMouseMove = (e) => {
    if (disabled || isReduced || !buttonRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    
    // Calculate distance from center of the button
    const centerX = left + width / 2
    const centerY = top + height / 2
    const dx = clientX - centerX
    const dy = clientY - centerY

    // Pull intensity limit (15px max)
    const maxPull = 12
    const pullX = (dx / (width / 2)) * maxPull
    const pullY = (dy / (height / 2)) * maxPull

    api.start({ x: pullX, y: pullY })
  }

  const handleMouseLeave = () => {
    if (disabled || isReduced) return
    api.start({ x: 0, y: 0 })
  }

  // Glow theme configuration
  const themes = {
    cyan: 'border-signal-cyan text-signal-cyan hover:bg-signal-cyan/10 hover:shadow-[0_0_15px_rgba(77,232,224,0.4)] focus-visible:outline-signal-cyan',
    amber: 'border-warning-amber text-warning-amber hover:bg-warning-amber/10 hover:shadow-[0_0_15px_rgba(255,122,61,0.4)] focus-visible:outline-warning-amber',
    red: 'border-vein-red text-vein-red hover:bg-vein-red/10 hover:shadow-[0_0_15px_rgba(232,56,79,0.4)] focus-visible:outline-vein-red'
  }

  const cornerLight = {
    cyan: 'bg-signal-cyan',
    amber: 'bg-warning-amber',
    red: 'bg-vein-red'
  }

  return (
    <animated.button
      ref={buttonRef}
      type={type}
      style={isReduced ? {} : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider text-xs md:text-sm border bg-void-black px-6 py-3 cursor-pointer select-none active:scale-[0.98] transition-transform transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${themes[glowColor]} ${className}`}
      {...props}
    >
      {/* HUD corner lines for button */}
      <span className={`absolute top-0 left-0 w-1.5 h-[1px] ${cornerLight[glowColor]}`} />
      <span className={`absolute top-0 left-0 w-[1px] h-1.5 ${cornerLight[glowColor]}`} />
      <span className={`absolute top-0 right-0 w-1.5 h-[1px] ${cornerLight[glowColor]}`} />
      <span className={`absolute top-0 right-0 w-[1px] h-1.5 ${cornerLight[glowColor]}`} />
      <span className={`absolute bottom-0 left-0 w-1.5 h-[1px] ${cornerLight[glowColor]}`} />
      <span className={`absolute bottom-0 left-0 w-[1px] h-1.5 ${cornerLight[glowColor]}`} />
      <span className={`absolute bottom-0 right-0 w-1.5 h-[1px] ${cornerLight[glowColor]}`} />
      <span className={`absolute bottom-0 right-0 w-[1px] h-1.5 ${cornerLight[glowColor]}`} />

      {/* Button text / content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </animated.button>
  )
}
