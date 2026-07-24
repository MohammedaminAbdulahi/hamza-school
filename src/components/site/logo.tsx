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

/**
 * Hamza School Logo — circular emblem with two hands cupping soil
 * and a green sprout (symbolizing nurturing/growth).
 * Includes Amharic (ሀምዛ ትምህርት ቤት) and English text around the circle.
 */
export function Logo({ className, showText = true, variant = 'default', onClick, size = 'md' }: LogoProps) {
  const goHome = useNav((s) => s.goHome)
  const sizeClass = size === 'sm' ? 'size-9' : size === 'lg' ? 'size-14' : 'size-11'

  return (
    <button
      onClick={() => {
        onClick?.()
        goHome()
      }}
      className={cn('group flex items-center gap-2.5 outline-none', className)}
      aria-label="Hamza School home"
    >
      {/* Circular emblem */}
      <svg
        viewBox="0 0 100 100"
        className={cn(sizeClass, 'shrink-0 transition-transform group-hover:scale-105')}
        aria-hidden="true"
      >
        {/* Outer circle (dark green ring) */}
        <circle cx="50" cy="50" r="48" fill="#1B4D3E" />
        <circle cx="50" cy="50" r="44" fill="#fefcf7" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#1B4D3E" strokeWidth="0.8" />

        {/* Amharic text arc (top) - simplified representation */}
        <defs>
          <path id="topArc" d="M 12 50 A 38 38 0 0 1 88 50" fill="none" />
          <path id="bottomArc" d="M 14 54 A 37 37 0 0 0 86 54" fill="none" />
        </defs>
        <text fontSize="7.5" fontWeight="600" fill="#1B4D3E" fontFamily="serif" letterSpacing="0.5">
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">
            ሀምዛ ትምህርት ቤት
          </textPath>
        </text>
        <text fontSize="6.5" fontWeight="700" fill="#1B4D3E" fontFamily="sans-serif" letterSpacing="1.2">
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
            HAMZA SCHOOL
          </textPath>
        </text>

        {/* Stars on sides */}
        <g fill="#1B4D3E">
          <polygon points="14,50 16,48 18,50 16,52" />
          <polygon points="82,50 84,48 86,50 84,52" />
        </g>

        {/* Green growth rays behind hands */}
        <g stroke="#2d7a5f" strokeWidth="0.8" opacity="0.5">
          <line x1="50" y1="62" x2="42" y2="72" />
          <line x1="50" y1="62" x2="50" y2="74" />
          <line x1="50" y1="62" x2="58" y2="72" />
        </g>

        {/* Cupped hands (brown/tan) */}
        <g>
          {/* Left hand */}
          <path
            d="M 32 62 Q 30 68 34 72 Q 40 74 46 72 Q 44 66 42 62 Q 38 60 35 61 Z"
            fill="#b8855c"
          />
          {/* Right hand */}
          <path
            d="M 68 62 Q 70 68 66 72 Q 60 74 54 72 Q 56 66 58 62 Q 62 60 65 61 Z"
            fill="#b8855c"
          />
          {/* Soil in hands */}
          <ellipse cx="50" cy="68" rx="16" ry="5" fill="#4a3520" />
        </g>

        {/* Sprout growing from soil */}
        <g>
          {/* Stem */}
          <path d="M 50 68 Q 50 60 50 52" stroke="#2d7a5f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Left leaf */}
          <path
            d="M 50 58 Q 44 56 42 52 Q 46 51 50 55 Z"
            fill="#3d9968"
          />
          {/* Right leaf */}
          <path
            d="M 50 54 Q 56 52 58 48 Q 54 47 50 51 Z"
            fill="#3d9968"
          />
          {/* Top leaf */}
          <path
            d="M 50 52 Q 48 48 50 44 Q 52 48 50 52 Z"
            fill="#4ab87a"
          />
        </g>
      </svg>

      {showText && (
        <span className="flex flex-col items-start leading-none">
          <span
            className={cn(
              'font-serif text-lg font-bold tracking-tight',
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
            Nurturing Faith
          </span>
        </span>
      )}
    </button>
  )
}
