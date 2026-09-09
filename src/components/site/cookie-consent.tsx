'use client'

import * as React from 'react'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'hamza-cookie-consent-v2'
// Remember the choice for 1 year
const EXPIRY_DAYS = 365

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        // Check if it's expired
        const data = JSON.parse(stored)
        const now = new Date().getTime()
        if (data.expiry && now < data.expiry) {
          return // still valid, don't show
        }
      }
      // Not stored or expired — show after a short delay
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    } catch {
      // localStorage might be blocked — don't show repeatedly
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  const dismiss = (choice: 'accept' | 'decline') => {
    try {
      const expiry = new Date().getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, expiry }))
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={cn(
        'fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl sm:p-5',
        'animate-in slide-in-from-bottom-4 duration-500'
      )}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-12">
          <Cookie className="size-5 sm:size-6" />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-semibold">We value your privacy</p>
          <p className="text-muted-foreground">
            Hamza School uses cookies to enhance your browsing experience. See our
            Privacy Policy for details.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="outline" onClick={() => dismiss('decline')}>
            Decline
          </Button>
          <Button size="sm" onClick={() => dismiss('accept')}>
            Accept
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="sm:hidden"
            onClick={() => dismiss('decline')}
            aria-label="Close"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
