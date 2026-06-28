'use client'

import * as React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNav } from '@/lib/nav-store'
import { SmartImage } from './smart-image'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  seed: string
  icon?: string
  breadcrumb: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  seed,
  icon,
  breadcrumb,
}: PageHeroProps) {
  const goHome = useNav((s) => s.goHome)
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10">
        <SmartImage
          seed={seed}
          alt=""
          icon={icon}
          rounded="rounded-none"
          className="h-full w-full opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <button
            onClick={goHome}
            className="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Home className="size-3.5" />
            Home
          </button>
          <ChevronRight className="size-3.5" />
          <span className="font-medium text-primary">{breadcrumb}</span>
        </motion.nav>
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
