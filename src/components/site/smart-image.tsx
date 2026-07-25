'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { DynamicIcon } from './dynamic-icon'

// Elegant paper-textured panel with a refined circular icon.
// Replaces the old ugly gradient placeholders.
const ACCENTS = [
  { bg: 'bg-forest', text: 'text-gold-light' },
  { bg: 'bg-gold-deep', text: 'text-cream' },
  { bg: 'bg-navy', text: 'text-gold-light' },
  { bg: 'bg-crimson', text: 'text-cream' },
  { bg: 'bg-green-mid', text: 'text-cream' },
  { bg: 'bg-wood-dark', text: 'text-gold-light' },
]

function hashSeed(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

interface SmartImageProps {
  seed: string
  alt: string
  className?: string
  icon?: string
  label?: string
  rounded?: string
}

export function SmartImage({
  seed,
  alt,
  className,
  icon,
  label,
  rounded = 'rounded-sm',
}: SmartImageProps) {
  const palette = ACCENTS[hashSeed(seed) % ACCENTS.length]
  const iconName = icon ?? 'BookOpen'
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'paper-texture relative flex flex-col items-center justify-center gap-4 overflow-hidden border border-gold/15 p-8',
        rounded,
        className
      )}
    >
      {/* Geometric pattern overlay */}
      <div className="geo-pattern pointer-events-none absolute inset-0" />
      {/* Corner ornaments */}
      <div className="absolute left-3 top-3 size-2 border-l border-t border-gold/40" />
      <div className="absolute right-3 top-3 size-2 border-r border-t border-gold/40" />
      <div className="absolute bottom-3 left-3 size-2 border-b border-l border-gold/40" />
      <div className="absolute bottom-3 right-3 size-2 border-b border-r border-gold/40" />

      {/* Circular icon */}
      <div className={cn('relative flex size-20 items-center justify-center rounded-full shadow-lg', palette.bg)}>
        <DynamicIcon name={iconName} className={cn('size-9', palette.text)} strokeWidth={1.5} />
      </div>

      {label && (
        <span className="relative font-serif text-sm font-medium uppercase tracking-[0.2em] text-foreground/70">
          {label}
        </span>
      )}
    </div>
  )
}
