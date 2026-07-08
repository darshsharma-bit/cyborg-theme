import React, { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const GLITCH_CHARS = '01XYZ_[]+%#&<>?@$*-/=\\'

export function GlitchText({
  text,
  speed = 25,
  delay = 0,
  trigger = true,
  className = '',
  hoverTrigger = true
}) {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef(null)
  const isRunning = useRef(false)
  const isReduced = useReducedMotion()

  const triggerGlitch = () => {
    if (isRunning.current || isReduced) return
    isRunning.current = true
    let iteration = 0
    
    clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      })

      if (iteration >= text.length) {
        clearInterval(intervalRef.current)
        isRunning.current = false
      }
      
      iteration += 1 / 2 // Reveal rate
    }, speed)
  }

  useEffect(() => {
    if (isReduced) {
      setDisplayText(text)
      return
    }

    if (trigger) {
      const timeoutId = setTimeout(triggerGlitch, delay)
      return () => {
        clearTimeout(timeoutId)
        clearInterval(intervalRef.current)
      }
    } else {
      setDisplayText(text)
    }
  }, [text, trigger, delay, isReduced])

  return (
    <span
      className={`font-display tracking-wider cursor-default ${className}`}
      onMouseEnter={hoverTrigger ? triggerGlitch : undefined}
    >
      {displayText}
    </span>
  )
}
