'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useNav } from '@/lib/nav-store'

interface LogoProps {
  className?: string
  showText?: boolean
  variant?: 'default' | 'light'
  onClick?: () => void
}

export function Logo({ className, showText = true, variant = 'default', onClick }: LogoProps) {
  const goHome = useNav((s) => s.goHome)
  return (
    <button
      onClick={() => {
        onClick?.()
        goHome()
      }}
      className={cn(
        'group flex items-center gap-2.5 outline-none',
        className
      )}
      aria-label="Hamza School home"
    >
      <span className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-6"
          aria-hidden="true"
        >
          {/* Graduation cap */}
          <path
            d="M12 4 2 9l10 5 10-5-10-5Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M6 11.5v3.2c0 .7.4 1.3 1 1.6 1.5.8 3.2 1.2 5 1.2s3.5-.4 5-1.2c.6-.3 1-.9 1-1.6v-3.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M21 9v5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {showText && (
        <span className="flex flex-col items-start leading-none">
          <span
            className={cn(
              'text-lg font-bold tracking-tight',
              variant === 'light' ? 'text-white' : 'text-foreground'
            )}
          >
            Hamza School
          </span>
          <span
            className={cn(
              'text-[10px] font-medium uppercase tracking-[0.18em]',
              variant === 'light' ? 'text-white/70' : 'text-muted-foreground'
            )}
          >
            Inspiring Excellence
          </span>
        </span>
      )}
    </button>
  )
}
