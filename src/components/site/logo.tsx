'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useNav } from '@/lib/nav-store'

interface LogoProps {
  className?: string
  showText?: boolean
  variant?: 'default' | 'light'
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showText = true, variant = 'default', onClick, size = 'md' }: LogoProps) {
  const goHome = useNav((s) => s.goHome)
  const sizeClass = size === 'sm' ? 'size-10' : size === 'lg' ? 'size-14' : 'size-11'

  return (
    <button
      onClick={() => {
        onClick?.()
        goHome()
      }}
      className={cn('group flex items-center gap-2.5 outline-none', className)}
      aria-label="Hamza School home"
    >
      {/* Real logo image */}
      <img
        src="/hamza-logo.png"
        alt="Hamza School logo"
        className={cn(sizeClass, 'shrink-0 rounded-full object-cover ring-1 ring-border transition-transform group-hover:scale-105')}
      />
      {showText && (
        <span className="flex flex-col items-start leading-none">
          <span
            className={cn(
              'font-serif text-xl font-semibold tracking-tight lg:text-2xl',
              variant === 'light' ? 'text-cream' : 'text-foreground'
            )}
          >
            Hamza School
          </span>
          <span
            className={cn(
              'mt-1 text-[11px] font-medium uppercase tracking-[0.25em]',
              variant === 'light' ? 'text-gold-light' : 'text-gold-deep'
            )}
          >
            P/ &amp; M/ Level
          </span>
        </span>
      )}
    </button>
  )
}
