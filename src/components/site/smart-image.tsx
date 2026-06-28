'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { DynamicIcon } from './dynamic-icon'

// Deterministic gradient palettes (avoiding blue/indigo)
const PALETTES: { from: string; to: string; icon: string }[] = [
  { from: 'from-emerald-500', to: 'to-teal-600', icon: 'GraduationCap' },
  { from: 'from-amber-500', to: 'to-orange-600', icon: 'Trophy' },
  { from: 'from-teal-500', to: 'to-emerald-700', icon: 'BookOpen' },
  { from: 'from-rose-500', to: 'to-pink-600', icon: 'Palette' },
  { from: 'from-orange-500', to: 'to-amber-700', icon: 'FlaskConical' },
  { from: 'from-emerald-600', to: 'to-green-800', icon: 'Trees' },
  { from: 'from-yellow-500', to: 'to-amber-600', icon: 'Music' },
  { from: 'from-teal-600', to: 'to-cyan-700', icon: 'Dumbbell' },
  { from: 'from-rose-600', to: 'to-red-700', icon: 'Users' },
  { from: 'from-amber-600', to: 'to-yellow-700', icon: 'Lightbulb' },
  { from: 'from-emerald-500', to: 'to-green-700', icon: 'Globe' },
  { from: 'from-orange-600', to: 'to-rose-700', icon: 'Sparkles' },
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

/**
 * A reliable, premium gradient-based image placeholder.
 * Renders a deterministic gradient + icon + subtle pattern.
 */
export function SmartImage({
  seed,
  alt,
  className,
  icon,
  label,
  rounded = 'rounded-2xl',
}: SmartImageProps) {
  const palette = PALETTES[hashSeed(seed) % PALETTES.length]
  const iconName = icon ?? palette.icon
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'relative overflow-hidden bg-gradient-to-br',
        palette.from,
        palette.to,
        rounded,
        className
      )}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      {/* Glow */}
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-12 -left-8 size-44 rounded-full bg-black/10 blur-3xl" />
      {/* Content */}
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-white">
        <DynamicIcon name={iconName} className="size-12 drop-shadow-lg sm:size-14" strokeWidth={1.5} />
        {label && (
          <span className="text-center text-xs font-semibold uppercase tracking-wider drop-shadow sm:text-sm">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
