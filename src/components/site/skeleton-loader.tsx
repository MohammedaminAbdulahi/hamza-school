'use client'

import { motion } from 'framer-motion'

/**
 * Inline skeleton — shows a subtle shimmer pulse inside an element.
 * Use this for text/images that are loading from the database.
 */
export function InlineSkeleton({ className }: { className?: string }) {
  return (
    <span
      className={`inline-block animate-pulse rounded-sm bg-forest/10 ${className || ''}`}
      style={{ minHeight: '1em' }}
    />
  )
}

/**
 * Section skeleton — shows a pulsing block while a section loads.
 */
export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-sm bg-forest/5 ${className || ''}`} />
  )
}

/**
 * Image skeleton — shimmer box for images.
 */
export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-forest/10 ${className || ''}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.08), transparent)',
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      />
    </div>
  )
}

/**
 * Text skeleton — shimmer bar for text lines.
 */
export function TextSkeleton({
  className,
  lines = 1,
}: {
  className?: string
  lines?: number
}) {
  if (lines === 1) {
    return <InlineSkeleton className={className} />
  }
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <InlineSkeleton
          key={i}
          className={i === lines - 1 ? `w-2/3 ${className || ''}` : `w-full ${className || ''}`}
        />
      ))}
    </div>
  )
}
