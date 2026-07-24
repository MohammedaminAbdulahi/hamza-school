'use client'

import * as React from 'react'

/**
 * Recreates the warm desk scene from the Hamza School design:
 * A stack of books (Knowledge, Faith, Character, Excellence),
 * an open notebook with the Hadith quote, a potted plant,
 * and a pen holder — all in CSS.
 */
export function HeroScene() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-2xl">
      {/* Soft window light from left */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />
      {/* Wall */}
      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-stone-100 to-stone-50" />
      {/* Desk surface */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-amber-100 to-amber-200">
        {/* Wood grain */}
        <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(90deg,transparent,transparent_18px,rgba(120,80,40,0.3)_19px,rgba(120,80,40,0.3)_20px)]" />
      </div>

      {/* Framed Arabic calligraphy on wall */}
      <div className="absolute left-[8%] top-[8%] hidden h-[30%] w-[24%] rounded-sm border-2 border-stone-700 bg-white shadow-md sm:block">
        <div className="flex h-full items-center justify-center p-2">
          <span className="font-serif text-2xl text-stone-800" style={{ fontFamily: 'serif' }}>
            ﷽
          </span>
        </div>
      </div>

      {/* Potted plant (left) */}
      <div className="absolute bottom-[20%] left-[10%]">
        {/* Leaves */}
        <div className="relative mx-auto mb-1 h-20 w-16">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-8 left-1/2 h-12 w-3 origin-bottom rounded-full bg-gradient-to-t from-emerald-600 to-emerald-400"
              style={{
                transform: `translateX(-50%) rotate(${(i - 3) * 22}deg)`,
                transformOrigin: 'bottom center',
              }}
            />
          ))}
        </div>
        {/* Pot */}
        <div className="mx-auto h-12 w-14 rounded-b-lg rounded-t-sm bg-gradient-to-b from-stone-300 to-stone-400 shadow-md" />
      </div>

      {/* Stack of books (center-right) */}
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 sm:left-[55%]">
        <div className="flex flex-col-reverse items-center">
          {/* Bottom book - dark green "Excellence" */}
          <Book color="bg-emerald-900" textColor="text-amber-200" label="Excellence" width="w-32" />
          {/* Second - cream "Character" */}
          <Book color="bg-amber-50 border border-stone-300" textColor="text-emerald-900" label="Character" width="w-28" />
          {/* Middle - sage "Education" */}
          <Book color="bg-emerald-100" textColor="text-emerald-900" label="Education" width="w-28" />
          {/* Second from top - tan "Faith" */}
          <Book color="bg-amber-100 border border-stone-300" textColor="text-emerald-900" label="Faith" width="w-24" />
          {/* Top - deep emerald "Knowledge" */}
          <Book color="bg-emerald-800" textColor="text-amber-200" label="Knowledge" width="w-24" />
        </div>
      </div>

      {/* Open notebook (foreground) */}
      <div className="absolute bottom-[10%] left-[8%] w-[45%] max-w-[260px] -rotate-3 sm:left-[15%]">
        <div className="relative rounded-sm bg-white shadow-xl">
          {/* Spiral binding */}
          <div className="absolute left-0 top-0 flex h-full flex-col justify-around py-2 pl-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full border border-stone-400 bg-stone-200" />
            ))}
          </div>
          {/* Page content */}
          <div className="px-6 py-4 sm:px-7 sm:py-5">
            {/* Ruled lines */}
            <div className="absolute inset-x-6 top-4 bottom-4 opacity-10 [background-image:repeating-linear-gradient(transparent,transparent_16px,#94a3b8_17px)]" />
            <p className="relative font-serif text-[11px] italic leading-snug text-stone-800 sm:text-sm">
              &ldquo;Seeking knowledge is an obligation upon every Muslim.&rdquo;
            </p>
            <p className="relative mt-2 text-right font-serif text-[10px] font-semibold text-emerald-800 sm:text-xs">
              — Prophet Muhammad ﷺ
            </p>
          </div>
        </div>
      </div>

      {/* Pen holder (right) */}
      <div className="absolute bottom-[24%] right-[12%] hidden sm:block">
        <div className="relative h-16 w-10 rounded-b-lg rounded-t-md bg-emerald-900 shadow-lg">
          {/* Logo circle on holder */}
          <div className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-200 bg-white" />
          {/* Pens */}
          <div className="absolute -top-5 left-1 h-7 w-1 rounded-full bg-stone-800" />
          <div className="absolute -top-6 left-3 h-8 w-1 rounded-full bg-stone-700" />
          <div className="absolute -top-4 left-5 h-6 w-1 rounded-full bg-stone-900" />
        </div>
      </div>
    </div>
  )
}

function Book({
  color,
  textColor,
  label,
  width,
}: {
  color: string
  textColor: string
  label: string
  width: string
}) {
  return (
    <div className={`${color} ${width} relative my-0.5 flex h-5 items-center justify-center rounded-sm shadow-sm`}>
      {/* Pages (white edge) */}
      <div className="absolute inset-x-1 bottom-0 h-1 bg-white/60" />
      <span className={`${textColor} text-[8px] font-bold uppercase tracking-wider sm:text-[9px]`} style={{ fontFamily: 'serif' }}>
        {label}
      </span>
    </div>
  )
}
