"use client"

import { FC, useEffect, useRef, useState } from "react"
import { motion, useSpring } from "motion/react"

interface Position {
  x: number
  y: number
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

// Optimized modern cursor with glow effect
const ModernCursor: FC = () => {
  return (
    <div className="relative">
      {/* Outer glow ring */}
      <div className="absolute -inset-3 rounded-full bg-purple-500/20 blur-md" />
      {/* Main cursor dot */}
      <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/50" />
      {/* Center highlight */}
      <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/60" />
    </div>
  )
}

export function SmoothCursor({
  cursor = <ModernCursor />,
  springConfig = {
    damping: 25,      // Lower = more bouncy/smooth
    stiffness: 200,   // Lower = slower/smoother following
    mass: 0.5,        // Lower = lighter/faster response
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const [isMoving, setIsMoving] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 300,
    damping: 20,
  })

  useEffect(() => {
    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      // Show cursor after first move
      if (!isVisible) setIsVisible(true)

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      )

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      if (speed > 0.1) {
        // Scale down slightly when moving fast
        scale.set(0.8)
        setIsMoving(true)

        // Clear previous timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        // Reset scale after movement stops
        timeoutRef.current = setTimeout(() => {
          scale.set(1)
          setIsMoving(false)
        }, 100)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Use RAF for smooth 60fps updates
    let rafId: number
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        handleMouseMove(e)
      })
    }

    document.body.style.cursor = "none"
    window.addEventListener("mousemove", throttledMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.body.style.cursor = "auto"
      if (rafId) cancelAnimationFrame(rafId)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [cursorX, cursorY, scale, isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        scale: scale,
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
    >
      {cursor}
    </motion.div>
  )
}
