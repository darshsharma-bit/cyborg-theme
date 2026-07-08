import anime from 'animejs'

/**
 * Draws the stroke lines of an SVG path (e.g. for the boot logo or circuits)
 */
export function drawSvgPath(svgElement, duration = 1500, delayOffset = 150, callback) {
  if (!svgElement) return null

  const paths = svgElement.querySelectorAll('path')
  if (paths.length === 0) return null

  return anime({
    targets: paths,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutCubic',
    duration: duration,
    delay: (el, i) => i * delayOffset,
    complete: () => {
      if (callback) callback()
    }
  })
}

/**
 * Animates a numeric counter ticking upwards
 */
export function animateNumericCounter(element, startVal, endVal, duration = 2000, suffix = '') {
  if (!element) return null

  const obj = { val: startVal }
  return anime({
    targets: obj,
    val: endVal,
    round: 1, // Round to whole numbers
    easing: 'easeOutExpo',
    duration: duration,
    update: () => {
      element.innerHTML = `${obj.val.toLocaleString()}${suffix}`
    }
  })
}

/**
 * Animate HUD corner-bracket entrances
 */
export function animateCornerBrackets(containerElement) {
  if (!containerElement) return null

  const brackets = containerElement.querySelectorAll('.hud-bracket')
  if (brackets.length === 0) return null

  return anime({
    targets: brackets,
    opacity: [0, 1],
    scale: [0.7, 1],
    duration: 800,
    easing: 'easeOutElastic(1, .8)',
    delay: anime.stagger(100)
  })
}

/**
 * Subtle idle pulse loops for icons/nodes
 */
export function startIdlePulse(element, pulseScale = 1.05, duration = 1500) {
  if (!element) return null

  return anime({
    targets: element,
    scale: [1, pulseScale],
    opacity: [0.7, 1],
    duration: duration,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  })
}

/**
 * Subtle path drawing or rotation loop for circuit details
 */
export function startCircuitRotation(element, duration = 20000) {
  if (!element) return null

  return anime({
    targets: element,
    rotate: '1turn',
    duration: duration,
    loop: true,
    easing: 'linear'
  })
}
