import React, { useState, useEffect, useRef } from 'react'
import { HudPanel } from '../ui/HudPanel'
import { MagneticButton } from '../ui/MagneticButton'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import anime from 'animejs'

export function TransmitForm() {
  const isReduced = useReducedMotion()
  const bgRef = useRef(null)
  const [formData, setFormData] = useState({
    alias: '',
    address: '',
    data: ''
  })
  
  const [statusLogs, setStatusLogs] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Subtle animated circuit-board lines loop in the background
  useEffect(() => {
    if (isReduced || !bgRef.current) return

    const paths = bgRef.current.querySelectorAll('path')
    const animation = anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 4000,
      delay: anime.stagger(400),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    })

    return () => {
      animation.pause()
    }
  }, [isReduced])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting || isSuccess) return

    setIsSubmitting(true)
    setStatusLogs([
      '>> INITIATING COMPRESSION PROTOCOL...',
      '>> ENCRYPTING PAYLOAD WITH QUANTUM SCHEME...',
      '>> ESTABLISHING SECURE SATELLITE TETHER [IITB.GATEWAY]...'
    ])

    try {
      // Real fetch POST request to httpbin to verify network operations in browser
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Read real response
      await response.json()

      setTimeout(() => {
        setStatusLogs((prev) => [...prev, '>> CORRELATING SENSORY PACKETS...'])
      }, 700)

      setTimeout(() => {
        setStatusLogs((prev) => [
          ...prev,
          `>> SERVER RESPONDED // HOST: ${response.url.split('/')[2]}`,
          `>> TRANSMISSION COMPLETE // STATUS: ${response.status} ${response.statusText}`
        ])
        setIsSubmitting(false)
        setIsSuccess(true)
        setFormData({ alias: '', address: '', data: '' })
      }, 1500)

    } catch (error) {
      console.error('Uplink failed:', error)
      setStatusLogs((prev) => [
        ...prev,
        `>> ERROR: UPLINK FAILED // ${error.message.toUpperCase()}`,
        '>> ABORTING TRANSMISSION...'
      ])
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="transmit-msg"
      className="relative min-h-screen bg-void-black text-chrome flex items-center justify-center py-20 px-6 md:px-16 overflow-hidden"
    >
      {/* Loop drawing circuit board path overlays in backing space */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-20 flex items-center justify-center">
        <svg
          ref={bgRef}
          viewBox="0 0 800 600"
          className="w-full h-full max-w-4xl stroke-signal-cyan fill-none"
          strokeWidth="1"
        >
          {/* Circuit nodes & paths */}
          <path d="M 50,300 L 150,300 L 200,250 L 350,250 L 400,300 L 600,300" />
          <path d="M 150,300 L 180,330 L 300,330 L 330,300" />
          <path d="M 350,250 L 370,200 L 500,200 L 550,250" />
          <path d="M 200,250 L 200,100 L 250,50 L 400,50" />
          <path d="M 400,300 L 400,500 L 450,550 L 650,550" />
          {/* Static round junction rings */}
          <circle cx="50" cy="300" r="4" className="fill-void-black stroke-signal-cyan" />
          <circle cx="600" cy="300" r="4" className="fill-void-black stroke-signal-cyan" />
          <circle cx="400" cy="50" r="4" className="fill-void-black stroke-warning-amber" strokeWidth="1.5" />
          <circle cx="650" cy="550" r="4" className="fill-void-black stroke-signal-cyan" />
        </svg>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-2xl z-10 relative">
        <HudPanel
          title="TRANSMIT.MSG // UPLINK INTERFACE"
          status={isSuccess ? 'DELIVERED' : isSubmitting ? 'SENDING' : 'READY'}
          glowColor={isSuccess ? 'cyan' : 'amber'}
        >
          <div className="mb-6 font-mono text-[10px] text-chrome/50 tracking-wider flex justify-between select-none">
            <span>PACKET_DEST: IIT_BOMBAY_PORTFOLIO_DB</span>
            <span>ENCRYPTION: AES-256-GCM</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
            {/* Input 1: Alias */}
            <div className="flex flex-col gap-2">
              <label htmlFor="alias" className="font-mono text-[10px] tracking-widest text-signal-cyan uppercase font-bold">
                [ 01.NEURAL_ALIAS ]
              </label>
              <input
                id="alias"
                type="text"
                name="alias"
                required
                value={formData.alias}
                onChange={handleInputChange}
                disabled={isSubmitting || isSuccess}
                placeholder="INPUT SUBJECT NAME / CALLSIGN"
                className="w-full bg-void-black border border-chrome/15 p-3 font-mono text-xs text-chrome placeholder-chrome/30 focus:border-signal-cyan focus:shadow-[0_0_10px_rgba(77,232,224,0.15)] focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Input 2: Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="font-mono text-[10px] tracking-widest text-signal-cyan uppercase font-bold">
                [ 02.UPLINK_ADDRESS ]
              </label>
              <input
                id="address"
                type="email"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                disabled={isSubmitting || isSuccess}
                placeholder="INPUT TRANSMITTER_EMAIL@DOMAIN.SYS"
                className="w-full bg-void-black border border-chrome/15 p-3 font-mono text-xs text-chrome placeholder-chrome/30 focus:border-signal-cyan focus:shadow-[0_0_10px_rgba(77,232,224,0.15)] focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Input 3: Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="data" className="font-mono text-[10px] tracking-widest text-signal-cyan uppercase font-bold">
                [ 03.TRANSMIT_DATA ]
              </label>
              <textarea
                id="data"
                name="data"
                required
                rows={4}
                value={formData.data}
                onChange={handleInputChange}
                disabled={isSubmitting || isSuccess}
                placeholder="ENTER ACADEMIC ENQUIRIES / PROJECT COLLABORATION PROPOSALS..."
                className="w-full bg-void-black border border-chrome/15 p-3 font-mono text-xs text-chrome placeholder-chrome/30 focus:border-signal-cyan focus:shadow-[0_0_10px_rgba(77,232,224,0.15)] focus:outline-none resize-none transition-all duration-300"
              />
            </div>

            {/* Terminal Live Diagnostics Logs Output */}
            {(statusLogs.length > 0 || isSuccess) && (
              <div className="border border-chrome/10 bg-void-black p-4 font-mono text-[10px] text-left flex flex-col gap-1 select-none">
                <span className="text-warning-amber border-b border-chrome/5 pb-1 mb-1 font-semibold uppercase">HUD TRANSMIT LOGS:</span>
                {statusLogs.map((log, i) => (
                  <div
                    key={i}
                    className={
                      log.includes('OK') || log.includes('COMPLETE') 
                        ? 'text-signal-cyan' 
                        : 'text-chrome/60'
                    }
                  >
                    {log}
                  </div>
                ))}
                {isSuccess && (
                  <div className="text-signal-cyan font-bold mt-1 text-center animate-pulse uppercase">
                    &gt;&gt;&gt; DIALOG PROTOCOLS SYNCED SUCCESSFULLY &lt;&lt;&lt;
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="border-t border-chrome/10 pt-4 flex justify-between items-center">
              {isSuccess ? (
                <MagneticButton glowColor="cyan" onClick={() => setIsSuccess(false)}>
                  ESTABLISH NEW TETHER
                </MagneticButton>
              ) : (
                <MagneticButton
                  type="submit"
                  glowColor="amber"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'INITIALIZE BROADCAST'}
                </MagneticButton>
              )}
              <span className="font-mono text-[9px] text-chrome/30 tracking-widest select-none">
                SYS.UPLINK: ACTIVE
              </span>
            </div>
          </form>
        </HudPanel>
      </div>
    </section>
  )
}
