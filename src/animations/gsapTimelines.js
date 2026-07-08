import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Pins the CoreSpec section and staggers readouts
 */
export function initSpecTimeline(sectionElement, listElements, manifestElement) {
  if (!sectionElement || !listElements || listElements.length === 0) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionElement,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    }
  })

  // Entrance manifests fade and slide
  if (manifestElement) {
    tl.fromTo(manifestElement, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.5 }
    )
  }

  // Telemetry items slide in and highlight
  tl.fromTo(listElements, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' },
    '-=0.3'
  )

  return tl
}

/**
 * Draws the vertical line in NEURAL.LOG down as the user scrolls
 */
export function initLogLineTimeline(containerElement, lineElement) {
  if (!containerElement || !lineElement) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerElement,
      start: 'top 50%',
      end: 'bottom 70%',
      scrub: 0.5,
    }
  })

  tl.fromTo(lineElement, 
    { scaleY: 0 },
    { scaleY: 1, ease: 'none', transformOrigin: 'top center' }
  )

  return tl
}

/**
 * Horizontal scroll for showcase tiles in UPLINK.SIGNAL
 */
export function initShowcaseTimeline(sectionElement, horizontalContainer, scrollProgressContainer) {
  if (!sectionElement || !horizontalContainer) return null

  const getScrollAmount = () => {
    return horizontalContainer.scrollWidth - window.innerWidth + 120 // margin buffer
  }

  const scrollAmount = getScrollAmount()
  if (scrollAmount <= 0) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionElement,
      start: 'top top',
      end: () => `+=${getScrollAmount()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  })

  // Scrub the horizontal translate
  tl.to(horizontalContainer, {
    x: () => -getScrollAmount(),
    ease: 'none'
  })

  // If there's an active scroll progress indicator line in the HUD
  if (scrollProgressContainer) {
    tl.fromTo(scrollProgressContainer, 
      { width: '0%' },
      { width: '100%', ease: 'none' },
      0
    )
  }

  return tl
}
