'use client'

import * as React from 'react'
import {
  Menu,
  Search,
  Sun,
  Moon,
  Phone,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from './logo'
import { useNav, type PageId } from '@/lib/nav-store'
import { cn } from '@/lib/utils'
import { SCHOOL } from '@/lib/data/school'

const PAGES: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'academics', label: 'Academics' },
  { id: 'gallery', label: 'Student Life' },
  { id: 'news', label: 'News' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const { view, goPage, mobileNavOpen, setMobileNavOpen, setSearchOpen } = useNav()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-xl shadow-sm'
          : 'bg-background/60 backdrop-blur-md'
      )}
    >
      {/* Top utility bar */}
      <div className="hidden border-b border-border/40 bg-primary/5 lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Phone className="size-3.5 text-primary" />
            <span>{SCHOOL.phone}</span>
            <span className="mx-2 text-border">|</span>
            <span>{SCHOOL.hours}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-primary">{SCHOOL.tagline}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => goPage(p.id)}
              className={cn(
                'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                view === p.id ? 'text-primary' : 'text-foreground/80'
              )}
            >
              {p.label}
              {view === p.id && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="hidden sm:inline-flex"
          >
            <Search className="size-4.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="size-4.5" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </Button>

          <Button
            onClick={() => goPage('contact')}
            className="hidden bg-primary shadow-md shadow-primary/20 hover:bg-primary/90 sm:inline-flex"
          >
            Contact Us
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto sm:w-[360px]">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo onClick={() => setMobileNavOpen(false)} />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {PAGES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => goPage(p.id)}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-accent',
                      view === p.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => goPage('contact')}
                className="mt-6 w-full bg-primary shadow-md shadow-primary/20"
              >
                Contact Us
              </Button>
              <div className="mt-6 space-y-1 border-t pt-4 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-primary" /> {SCHOOL.phone}
                </p>
                <p>{SCHOOL.hours}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
