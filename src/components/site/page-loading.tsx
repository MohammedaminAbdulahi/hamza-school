'use client'

import { motion } from 'framer-motion'

/**
 * Full-page loading spinner shown while fetching content from the database.
 * Shows on the cream background with a forest-green spinner — clean, no flash.
 */
export function PageLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-forest/15" />
          {/* Spinning arc */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-forest"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
          />
        </div>
        <p className="font-serif text-sm italic tracking-wider text-gold-deep">
          Loading…
        </p>
      </div>
    </div>
  )
}
