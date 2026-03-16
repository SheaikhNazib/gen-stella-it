'use client'

import React from 'react'

type SizeKey = 'sm' | 'md' | 'lg'

type Props = {
  name?: string
  src?: string
  size?: SizeKey | number
  className?: string
}

const BG_VARIANTS = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-sky-500',
  'bg-pink-500',
]

function hashName(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (h << 5) - h + name.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function getInitials(name?: string) {
  if (!name) return ''
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  const first = parts[0][0] ?? ''
  const last = parts[parts.length - 1][0] ?? ''
  return (first + last).toUpperCase()
}

function sizeClasses(size: SizeKey | number | undefined) {
  if (typeof size === 'number') {
    return { style: { width: size, height: size }, className: '' }
  }
  switch (size) {
    case 'sm':
      return { style: undefined, className: 'w-8 h-8 text-sm' }
    case 'lg':
      return { style: undefined, className: 'w-16 h-16 text-lg' }
    default:
      return { style: undefined, className: 'w-12 h-12 text-base' }
  }
}

export default function ProfilePlaceholder({ name, src, size = 'md', className = '' }: Props) {
  const initials = getInitials(name)
  const { style, className: sizeClass } = sizeClasses(size)
  const bgIndex = name ? hashName(name) % BG_VARIANTS.length : Math.floor(Math.random() * BG_VARIANTS.length)
  const bgClass = BG_VARIANTS[bgIndex]

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? 'User avatar'}
        className={`rounded-full object-cover ${sizeClass} ${className}`}
        style={style as React.CSSProperties}
      />
    )
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-medium ${bgClass} ${sizeClass} ${className}`}
      style={style as React.CSSProperties}
      aria-hidden
    >
      {name ? (
        <span>{initials}</span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 12a5 5 0 1 0-0.001-9.999A5 5 0 0 0 12 12zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
        </svg>
      )}
    </div>
  )
}
