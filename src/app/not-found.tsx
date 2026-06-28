'use client'

import * as React from 'react'
import Link from 'next/link'
import { Home, ArrowLeft, Search, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/site/logo'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted/40 px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <Logo />

        <div className="relative mt-12">
          <span className="bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-[120px] font-bold leading-none tracking-tighter text-transparent sm:text-[160px]">
            404
          </span>
          <Compass className="absolute -right-6 top-2 size-12 animate-spin-slow text-amber-500 sm:size-16" />
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md text-balance text-muted-foreground">
          The page you’re looking for seems to have wandered off campus. Let’s
          help you find your way back to Hamza School.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-primary shadow-md shadow-primary/20">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Search className="size-4" />
              Search the Site
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: 'About Us', href: '/#about' },
            { label: 'Academics', href: '/#academics' },
            { label: 'Admissions', href: '/#admissions' },
            { label: 'News & Events', href: '/#news' },
            { label: 'Gallery', href: '/#gallery' },
            { label: 'Contact', href: '/#contact' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Return to homepage
        </Link>
      </div>
    </div>
  )
}
