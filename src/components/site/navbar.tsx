'use client'

import * as React from 'react'
import {
  Menu,
  Search,
  X,
  ArrowRight,
} from 'lucide-react'
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

const PAGES: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'academics', label: 'Values' },
  { id: 'gallery', label: 'Community' },
  { id: 'academics', label: 'Programs' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const { view, goPage, mobileNavOpen, setMobileNavOpen, setSearchOpen } = useNav()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On home page, navbar is transparent over hero until scrolled
  const onHome = view === 'home'
  const transparent = onHome && !scrolled

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
        scrolled
          ? 'bg-cream/97 backdrop-blur-xl shadow-[0_4px_30px_rgba(60,35,10,0.1)] py-3'
          : 'bg-transparent py-4'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <Logo
          variant={transparent ? 'light' : 'default'}
          size="md"
        />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Main navigation">
          {PAGES.map((p, i) => (
            <button
              key={`${p.id}-${i}`}
              onClick={() => goPage(p.id)}
              className={cn(
                'nav-link-underline text-sm font-medium transition-colors',
                transparent ? 'text-cream hover:text-gold-light' : 'text-foreground hover:text-gold-deep',
                view === p.id && 'active'
              )}
            >
              {p.label}
            </button>
          ))}
          <Button
            onClick={() => goPage('contact')}
            className={cn(
              'h-11 gap-2 rounded-sm px-6 text-xs font-medium uppercase tracking-[0.12em] transition-all',
              transparent
                ? 'bg-gold-deep text-cream hover:bg-gold'
                : 'bg-forest text-cream hover:bg-forest/90'
            )}
          >
            Enroll Now
            <ArrowRight className="size-3.5" />
          </Button>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 lg:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className={cn('hidden sm:inline-flex', transparent && 'text-cream hover:bg-white/10 hover:text-cream')}
          >
            <Search className="size-4.5" />
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn('lg:hidden', transparent && 'text-cream hover:bg-white/10 hover:text-cream')}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-0 bg-cream p-8 sm:w-96">
              <SheetHeader className="flex-row items-center justify-between space-y-0">
                <SheetTitle className="text-left">
                  <Logo onClick={() => setMobileNavOpen(false)} size="sm" />
                </SheetTitle>
                <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(false)} aria-label="Close">
                  <X className="size-5" />
                </Button>
              </SheetHeader>
              <nav className="mt-12 flex flex-col gap-6" aria-label="Mobile navigation">
                {PAGES.map((p, i) => (
                  <button
                    key={`${p.id}-${i}`}
                    onClick={() => {
                      goPage(p.id)
                      setMobileNavOpen(false)
                    }}
                    className="font-serif text-3xl text-foreground transition-colors hover:text-gold-deep"
                  >
                    {p.label}
                  </button>
                ))}
              </nav>
              <Button
                onClick={() => {
                  goPage('contact')
                  setMobileNavOpen(false)
                }}
                className="mt-10 h-12 w-full gap-2 rounded-sm bg-forest text-xs font-medium uppercase tracking-[0.12em] text-cream"
              >
                Enroll Now
                <ArrowRight className="size-3.5" />
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
