/**
 * Centralized Framer Motion Variants
 *
 * Import these presets instead of defining inline motion configs.
 * All variants respect `prefers-reduced-motion` via the `reduced` helper.
 */

import type { Variants, Transition } from 'framer-motion'

// ── Timing constants ─────────────────────────────────────
const DURATION = 0.4
const STAGGER = 0.08
const HOVER_DURATION = 0.2

// ── Shared transition presets ────────────────────────────
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
}

export const smoothTransition: Transition = {
  duration: DURATION,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for silky feel
}

// ── Entrance variants ────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: smoothTransition },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: smoothTransition },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: smoothTransition },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: smoothTransition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: smoothTransition },
}

// ── Container / stagger ──────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: smoothTransition },
}

// ── Hover / tap helpers ──────────────────────────────────

export const hoverLift = {
  y: -8,
  transition: { duration: HOVER_DURATION },
}

export const hoverScale = {
  scale: 1.03,
  transition: { duration: HOVER_DURATION },
}

export const tapScale = {
  scale: 0.97,
}

// ── Page transition ──────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

// ── Viewport defaults ────────────────────────────────────
// Use with whileInView: <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewport}>
export const viewport = { once: true, margin: '-40px' } as const
