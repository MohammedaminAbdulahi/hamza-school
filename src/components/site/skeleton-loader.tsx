'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Skeleton placeholder with a blur-pulse animation.
 * Used for images and content that's being fetched from the database.
 * Shows a shimmering blur effect until the real data arrives.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-forest/10',
        className
      )}
    >
      {/* Shimmer effect */}
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
 * Skeleton for image placeholders — shows a blurred shimmer box
 * until the real image loads.
 */
export function SkeletonImage({
  className,
  aspect = 'aspect-[4/3]',
}: {
  className?: string
  aspect?: string
}) {
  return <Skeleton className={cn(aspect, 'w-full rounded-sm', className)} />
}

/**
 * Skeleton for text lines — shows a blurred shimmer bar.
 */
export function SkeletonText({
  className,
  width = 'w-full',
}: {
  className?: string
  width?: string
}) {
  return <Skeleton className={cn('h-4 rounded-sm', width, className)} />
}
