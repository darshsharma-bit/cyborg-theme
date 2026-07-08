import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Line } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Stylized procedural Cyborg Cranium/Core assembly
function CyborgModel({ isDragging, previousMouse, springApi, rotationSpring }) {
  const outerRef = useRef(null)
  const isReduced = useReducedMotion()

  // Slow idle bob and auto-rotation
  useFrame((state) => {
    if (isReduced) return
    const time = state.clock.getElapsedTime()
    
    if (outerRef.current) {
      // Y-axis bobbing
      outerRef.current.position.y = Math.sin(time * 1.2) * 0.15
      
      // Auto-rotation when not being dragged
      if (!isDragging.current) {
        outerRef.current.rotation.y = time * 0.08
      }
    }
  })

  return (
    <group ref={outerRef}>
      {/* React Spring animated group for drag-to-inspect rotation */}
      <animated.group rotation={rotationSpring}>
        
        {/* Core mechanical core - wireframe mesh for technical blueprints */}
        <mesh>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshBasicMaterial 
            color="#C8CDD3" 
            wireframe 
            transparent 
            opacity={0.35} 
          />
        </mesh>

        {/* Inner neural heart - glowing warning amber core */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial 
            color="#FF7A3D" 
            transparent 
            opacity={0.8}
            wireframe
          />
        </mesh>

        {/* Glowing cyan bio-eye visor cylinder */}
        <mesh position={[0.4, 0.3, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
          <meshBasicMaterial color="#4DE8E0" />
        </mesh>

        {/* Floating metal plates (Robotic jaw/forehead details) */}
        <mesh position={[0, -0.9, 0.6]}>
          <boxGeometry args={[0.8, 0.2, 0.5]} />
          <meshBasicMaterial color="#14161A" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.9, 0.6]}>
          <boxGeometry args={[0.8, 0.2, 0.5]} />
          <meshBasicMaterial color="#4DE8E0" wireframe />
        </mesh>

        {/* Outer Rotating Gimbal Rings (Diagnostics HUD) */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[2.0, 0.02, 6, 64]} />
          <meshBasicMaterial color="#4DE8E0" transparent opacity={0.4} />
        </mesh>

        {/* Secondary diagonal rotating ring */}
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.3, 0.015, 6, 64]} />
          <meshBasicMaterial color="#E8384F" transparent opacity={0.3} />
        </mesh>

        {/* Outer sensor bounds box */}
        <mesh>
          <boxGeometry args={[3.2, 3.2, 3.2]} />
          <meshBasicMaterial color="#C8CDD3" wireframe transparent opacity={0.06} />
        </mesh>

      </animated.group>
    </group>
  )
}

export default function Hero3DScene({ particleCount = 200 }) {
  const isReduced = useReducedMotion()
  const isDragging = useRef(false)
  const previousMouse = useRef({ x: 0, y: 0 })

  // Spring physics for smooth drag-inspect and snapback
  const [{ rotation }, springApi] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 2, tension: 120, friction: 18 }
  }))

  const handlePointerDown = (e) => {
    e.stopPropagation()
    isDragging.current = true
    previousMouse.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    const deltaX = e.clientX - previousMouse.current.x
    const deltaY = e.clientY - previousMouse.current.y
    
    // Rotate spring target
    const currentRot = rotation.get()
    springApi.start({
      rotation: [
        currentRot[0] + deltaY * 0.007,
        currentRot[1] + deltaX * 0.007,
        0
      ]
    })
    
    previousMouse.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
      aria-label="Interactive 3D mechanical model representing SYNTH-01 cranium diagnostics. Drag to inspect."
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Floating bio-mechanical particles */}
      {!isReduced && (
        <Sparkles
          count={particleCount}
          scale={5.5}
          size={1.5}
          speed={0.3}
          color="#4DE8E0"
        />
      )}

      <CyborgModel
        isDragging={isDragging}
        previousMouse={previousMouse}
        springApi={springApi}
        rotationSpring={rotation}
      />
    </Canvas>
  )
}
