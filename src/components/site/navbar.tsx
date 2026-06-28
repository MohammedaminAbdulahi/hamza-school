'use client'

import * as React from 'react'
import {
  Menu,
  Search,
  Sun,
  Moon,
  ChevronDown,
  GraduationCap,
  Users,
  ShieldCheck,
  UserCog,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Logo } from './logo'
import { useNav, type PageId, type PortalRole } from '@/lib/nav-store'
import { cn } from '@/lib/utils'
import { SCHOOL } from '@/lib/data/school'

const PAGES: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'academics', label: 'Academics' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'news', label: 'News & Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

const PORTALS: {
  role: PortalRole
  label: string
  desc: string
  icon: React.ElementType
}[] = [
  { role: 'student', label: 'Student Portal', desc: 'Grades, assignments & schedule', icon: GraduationCap },
  { role: 'parent', label: 'Parent Portal', desc: 'Track your child’s progress', icon: Users },
  { role: 'teacher', label: 'Teacher Portal', desc: 'Manage classes & grading', icon: UserCog },
  { role: 'admin', label: 'Admin Panel', desc: 'School administration', icon: ShieldCheck },
]

export function Navbar() {
  const { view, goPage, openPortalLogin, mobileNavOpen, setMobileNavOpen, setSearchOpen } = useNav()
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

  const activePage = view.kind === 'page' ? view.page : null

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
                activePage === p.id ? 'text-primary' : 'text-foreground/80'
              )}
            >
              {p.label}
              {activePage === p.id && (
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

          {/* Portals dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden gap-1.5 md:inline-flex">
                Portals
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="text-muted-foreground">
                Secure access
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PORTALS.map((portal) => (
                <DropdownMenuItem
                  key={portal.role}
                  onClick={() => openPortalLogin(portal.role)}
                  className="flex items-start gap-3 py-2.5"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <portal.icon className="size-4.5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{portal.label}</span>
                    <span className="text-xs text-muted-foreground">{portal.desc}</span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => goPage('admissions')}
            className="hidden bg-primary shadow-md shadow-primary/20 hover:bg-primary/90 sm:inline-flex"
          >
            Apply Now
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
                      activePage === p.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 border-t pt-4">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Portals
                </p>
                {PORTALS.map((portal) => (
                  <button
                    key={portal.role}
                    onClick={() => openPortalLogin(portal.role)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-accent"
                  >
                    <portal.icon className="size-4.5 text-primary" />
                    {portal.label}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => goPage('admissions')}
                className="mt-6 w-full bg-primary shadow-md shadow-primary/20"
              >
                Apply Now
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
