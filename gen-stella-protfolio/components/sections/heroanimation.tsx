'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

export default function HeroAnimation() {
  const [stage, setStage] = useState<'approaching' | 'collision' | 'exploded'>('approaching')
  
  const particles = useMemo(() => {
    return [...Array(45)].map((_, i) => ({
      id: i,
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 450 + 150,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 2 + 0.8,
      color: i % 2 === 0 ? '#60a5fa' : '#c084fc' // Blue and Purple
    }))
  }, [stage === 'approaching'])

  useEffect(() => {
    const sequence = async () => {
      setStage('approaching')
      setTimeout(() => setStage('collision'), 1000)
      setTimeout(() => setStage('exploded'), 1200)
    }

    sequence()
    const interval = setInterval(sequence, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* 1. THE DUAL METEORS (Pure SVG Stars) */}
      <AnimatePresence>
        {stage === 'approaching' && (
          <>
            {/* Meteor From Top Left */}
            <motion.div
              initial={{ x: '-10vw', y: '-10vh', opacity: 0, scale: 0 }}
              animate={{ x: '50vw', y: '50vh', opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="absolute z-20"
            >
              <StarIcon color="fill-blue-400" glow="shadow-[0_0_20px_#60a5fa]" trail="from-blue-500" rotate={45} />
            </motion.div>

            {/* Meteor From Bottom Right */}
            <motion.div
              initial={{ x: '110vw', y: '110vh', opacity: 0, scale: 0 }}
              animate={{ x: '50vw', y: '50vh', opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="absolute z-20"
            >
              <StarIcon color="fill-purple-400" glow="shadow-[0_0_20px_#a855f7]" trail="from-purple-500" rotate={225} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. THE IMPACT ZONE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        
        {/* The White "Digital Flash" */}
        {stage === 'collision' && (
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 6, opacity: 0 }}
            className="w-16 h-16 bg-white rounded-full blur-md z-50"
          />
        )}

        {/* The "Star Shrapnel" */}
        {stage === 'exploded' && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ 
              x: Math.cos(p.angle) * p.distance, 
              y: Math.sin(p.angle) * p.distance,
              opacity: 0,
              scale: 0,
              rotate: 180
            }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            className="absolute"
            style={{ 
              width: p.size, height: p.size, 
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              borderRadius: '50%'
            }}
          />
        ))}

        {/* Geometric Shockwave */}
        {stage === 'exploded' && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8, rotate: 0 }}
            animate={{ scale: 3, opacity: 0, rotate: 90 }}
            transition={{ duration: 1.5 }}
            className="w-64 h-64 border border-blue-500/30 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>
    </div>
  )
}

// Helper Component for the Star Meteor
function StarIcon({ color, glow, trail, rotate }: { color: string, glow: string, trail: string, rotate: number }) {
  return (
    <div className="relative" style={{ transform: `rotate(${rotate}deg)` }}>
      <svg className={`w-8 h-8 ${color} ${glow} drop-shadow-2xl`} viewBox="0 0 24 24">
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
      </svg>
      <div className={`absolute top-1/2 right-full h-[2px] w-64 bg-gradient-to-l ${trail} to-transparent -translate-y-1/2`} />
    </div>
  )
}