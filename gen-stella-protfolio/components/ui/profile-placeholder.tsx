'use client'

import React, { useEffect, useRef, useState } from 'react'

type SizeKey = 'sm' | 'md' | 'lg'

type ShapeKey = 'circle' | 'square' | 'rounded'

type Props = {
  name?: string
  src?: string
  size?: SizeKey | number
  shape?: ShapeKey
  imagePositionX?: number
  imagePositionY?: number
  imageScale?: number
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

function shapeClasses(shape: ShapeKey) {
  switch (shape) {
    case 'square':
      return 'rounded-none'
    case 'rounded':
      return 'rounded-xl'
    default:
      return 'rounded-full'
  }
}

function isRasterImage(src?: string) {
  if (!src) return false
  const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg']
  return extensions.some((ext) => src.toLowerCase().endsWith(ext)) || src.startsWith('http') || src.startsWith('/')
}

export default function ProfilePlaceholder({
  name, 
  src, 
  size = 'md', 
  shape = 'circle',
  imagePositionX = 50,
  imagePositionY = 50,
  imageScale = 1,
  className = '' 
}: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const initials = getInitials(name)
  const cleanSrc = src?.trim() || ''
  const { style, className: sizeClass } = sizeClasses(size)
  const shapeClass = shapeClasses(shape)
  const bgIndex = name ? hashName(name) % BG_VARIANTS.length : Math.floor(Math.random() * BG_VARIANTS.length)
  const bgClass = BG_VARIANTS[bgIndex]
  const showImage = isRasterImage(cleanSrc) && !!cleanSrc && !imgError

  useEffect(() => {
    setImgError(false)
    setImgLoaded(false)
  }, [cleanSrc])

  useEffect(() => {
    if (!showImage) {
      return
    }

    const image = imgRef.current
    if (image?.complete && image.naturalWidth > 0) {
      setImgLoaded(true)
    }
  }, [showImage, cleanSrc])

  if (showImage) {
    return (
      <div
        className={`${shapeClass} overflow-hidden ${sizeClass} ${className} relative bg-slate-100`}
        style={style as React.CSSProperties}
      >
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
          </div>
        )}
        <img
          ref={imgRef}
          src={cleanSrc}
          alt={name ?? 'User avatar'}
          className="h-full w-full object-cover"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{
            objectPosition: `${imagePositionX}% ${imagePositionY}%`,
            transform: `scale(${imageScale})`,
            transformOrigin: 'center center',
            transition: 'opacity 120ms ease-in-out',
            opacity: imgLoaded ? 1 : 0,
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={`${shapeClass} flex items-center justify-center text-white font-medium ${bgClass} ${sizeClass} ${className}`}
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
