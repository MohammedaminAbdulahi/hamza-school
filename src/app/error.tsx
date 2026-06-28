'use client'

import * as React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/site/logo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted/40 px-4 py-12">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <Logo />

        <div className="relative mt-12">
          <span className="bg-gradient-to-br from-rose-500 to-amber-500 bg-clip-text text-[120px] font-bold leading-none tracking-tighter text-transparent sm:text-[160px]">
            500
          </span>
          <AlertTriangle className="absolute -right-4 -top-2 size-10 text-amber-500 sm:size-14" />
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Something Went Wrong
        </h1>
        <p className="mt-3 max-w-md text-balance text-muted-foreground">
          We apologize for the inconvenience. Our team has been notified and is
          working to resolve the issue. Please try again.
        </p>

        {error.digest && (
          <p className="mt-4 rounded-lg border bg-muted/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} className="bg-primary shadow-md shadow-primary/20">
            <RefreshCw className="size-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Need help? Contact us at{' '}
          <a
            href="mailto:info@hamzaschool.edu"
            className="font-medium text-primary hover:underline"
          >
            info@hamzaschool.edu
          </a>
        </p>
      </div>
    </div>
  )
}
