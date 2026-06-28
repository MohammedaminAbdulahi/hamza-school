'use client'

import * as React from 'react'
import {
  Bell,
  Search,
  LogOut,
  Menu,
  Home,
  ChevronDown,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
import { DynamicIcon } from '@/components/site/dynamic-icon'
import { Logo } from '@/components/site/logo'
import { useNav, type PortalRole } from '@/lib/nav-store'
import { cn } from '@/lib/utils'

export interface PortalNavItem {
  id: string
  label: string
  icon: string
  badge?: string | number
}

interface PortalShellProps {
  role: PortalRole
  title: string
  navItems: PortalNavItem[]
  activeSection: string
  onSectionChange: (id: string) => void
  userName: string
  userMeta?: string
  notifications?: { title: string; time: string }[]
  children: React.ReactNode
}

const ROLE_LABEL: Record<PortalRole, string> = {
  student: 'Student',
  parent: 'Parent',
  teacher: 'Teacher',
  admin: 'Administrator',
}

const ROLE_COLOR: Record<PortalRole, string> = {
  student: 'from-emerald-500 to-teal-600',
  parent: 'from-amber-500 to-orange-600',
  teacher: 'from-teal-500 to-emerald-700',
  admin: 'from-rose-500 to-pink-600',
}

export function PortalShell({
  role,
  title,
  navItems,
  activeSection,
  onSectionChange,
  userName,
  userMeta,
  notifications = [],
  children,
}: PortalShellProps) {
  const exitPortal = useNav((s) => s.exitPortal)
  const goHome = useNav((s) => s.goHome)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleNavigate = (onNavigate?: () => void) => (itemId: string) => {
    onSectionChange(itemId)
    onNavigate?.()
  }

  const renderNavList = (onNavigate?: () => void) => (
    <nav className="flex flex-col gap-1" aria-label="Portal navigation">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavigate(onNavigate)(item.id)}
          className={cn(
            'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            activeSection === item.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )}
        >
          <DynamicIcon
            name={item.icon}
            className={cn(
              'size-4.5 shrink-0',
              activeSection === item.id ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'
            )}
          />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge != null && (
            <Badge
              variant={activeSection === item.id ? 'secondary' : 'outline'}
              className="h-5 px-1.5 text-[10px]"
            >
              {item.badge}
            </Badge>
          )}
        </button>
      ))}
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b px-4">
          <Logo onClick={() => goHome()} />
        </div>
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <span
            className={cn(
              'flex size-8 items-center justify-center rounded-lg bg-gradient-to-br text-white',
              ROLE_COLOR[role]
            )}
          >
            <DynamicIcon name={role === 'admin' ? 'ShieldCheck' : role === 'teacher' ? 'UserCog' : role === 'parent' ? 'Users' : 'GraduationCap'} className="size-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-[11px] text-muted-foreground">{ROLE_LABEL[role]} access</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Menu
          </p>
          {renderNavList()}
        </div>
        <div className="border-t p-3">
          <button
            onClick={exitPortal}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-xl sm:px-6">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="border-b">
                <SheetTitle className="text-left">
                  <Logo onClick={() => setMobileOpen(false)} />
                </SheetTitle>
              </SheetHeader>
              <div className="p-3">
                {renderNavList(() => setMobileOpen(false))}
              </div>
              <div className="mt-auto border-t p-3">
                <button
                  onClick={exitPortal}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="size-4.5" />
                  Sign Out
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden flex-1 items-center md:flex">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={`Search ${title.toLowerCase()}...`}
                className="h-9 w-64 pl-9 lg:w-72"
              />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goHome()}
              className="hidden sm:inline-flex"
              aria-label="Back to website"
            >
              <Home className="size-4.5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="size-4.5" />
                  {notifications.length > 0 && (
                    <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-destructive" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  <Badge variant="secondary" className="text-[10px]">
                    {notifications.length} new
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-sm text-muted-foreground">
                    You’re all caught up!
                  </p>
                ) : (
                  notifications.map((n, i) => (
                    <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5 py-2.5">
                      <span className="text-sm font-medium">{n.title}</span>
                      <span className="text-xs text-muted-foreground">{n.time}</span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-accent">
                  <Avatar className="size-8 border-2 border-primary/20">
                    <AvatarFallback className={cn('bg-gradient-to-br text-white text-xs font-semibold', ROLE_COLOR[role])}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold leading-none">{userName}</p>
                    {userMeta && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{userMeta}</p>
                    )}
                  </div>
                  <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{userName}</p>
                  <p className="text-xs font-normal text-muted-foreground">{ROLE_LABEL[role]}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSectionChange('profile')}>
                  <Settings className="size-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => goHome()}>
                  <Home className="size-4" />
                  Back to Website
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={exitPortal} className="text-destructive focus:text-destructive">
                  <LogOut className="size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

// Reusable portal stat card
export function PortalStat({
  label,
  value,
  icon,
  trend,
  accent = 'primary',
}: {
  label: string
  value: string
  icon: string
  trend?: string
  accent?: 'primary' | 'amber' | 'rose' | 'teal'
}) {
  const colors: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
    teal: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
  }
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between">
        <span className={cn('flex size-10 items-center justify-center rounded-lg', colors[accent])}>
          <DynamicIcon name={icon} className="size-5" />
        </span>
        {trend && (
          <Badge variant="secondary" className="text-[10px] font-semibold text-emerald-600">
            {trend}
          </Badge>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function PortalSectionHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}
