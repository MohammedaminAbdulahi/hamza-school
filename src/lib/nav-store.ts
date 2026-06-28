'use client'

import { create } from 'zustand'

export type PageId =
  | 'home'
  | 'about'
  | 'academics'
  | 'admissions'
  | 'news'
  | 'gallery'
  | 'contact'

export type PortalRole = 'student' | 'parent' | 'teacher' | 'admin'

export type View =
  | { kind: 'page'; page: PageId }
  | { kind: 'portal-login'; role: PortalRole }
  | { kind: 'portal'; role: PortalRole }

interface NavState {
  view: View
  navigate: (view: View) => void
  goHome: () => void
  goPage: (page: PageId) => void
  openPortalLogin: (role: PortalRole) => void
  enterPortal: (role: PortalRole) => void
  exitPortal: () => void
  // session for the active portal (mock)
  session: { role: PortalRole; name: string } | null
  loginAs: (role: PortalRole, name: string) => void
  logout: () => void
  // mobile menu
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  // search
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

const HOME: View = { kind: 'page', page: 'home' }

function viewToHash(view: View): string {
  switch (view.kind) {
    case 'page':
      return view.page === 'home' ? '#/' : `#/${view.page}`
    case 'portal-login':
      return `#/login/${view.role}`
    case 'portal':
      return `#/portal/${view.role}`
  }
}

function hashToView(hash: string): View {
  const clean = hash.replace(/^#\/?/, '')
  const parts = clean.split('/').filter(Boolean)
  if (parts.length === 0) return HOME
  if (parts[0] === 'login' && parts[1]) {
    const role = parts[1] as PortalRole
    if (['student', 'parent', 'teacher', 'admin'].includes(role)) {
      return { kind: 'portal-login', role }
    }
  }
  if (parts[0] === 'portal' && parts[1]) {
    const role = parts[1] as PortalRole
    if (['student', 'parent', 'teacher', 'admin'].includes(role)) {
      return { kind: 'portal', role }
    }
  }
  const pages: PageId[] = ['home', 'about', 'academics', 'admissions', 'news', 'gallery', 'contact']
  if (pages.includes(parts[0] as PageId)) {
    return { kind: 'page', page: parts[0] as PageId }
  }
  return HOME
}

export const useNav = create<NavState>((set, get) => ({
  // Always initialize to HOME to avoid SSR/client hydration mismatch.
  // The hash is synced after mount via initFromHash().
  view: HOME,
  navigate: (view) => {
    if (typeof window !== 'undefined') {
      const newHash = viewToHash(view)
      if (window.location.hash !== newHash) {
        window.location.hash = newHash
      }
    }
    set({ view, mobileNavOpen: false })
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  },
  goHome: () => get().navigate(HOME),
  goPage: (page) => get().navigate({ kind: 'page', page }),
  openPortalLogin: (role) => get().navigate({ kind: 'portal-login', role }),
  enterPortal: (role) => get().navigate({ kind: 'portal', role }),
  exitPortal: () => {
    set({ session: null })
    get().goHome()
  },
  session: null,
  loginAs: (role, name) => set({ session: { role, name } }),
  logout: () => {
    set({ session: null })
    get().goHome()
  },
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
}))

// Sync the store with the URL hash after hydration (client-only).
// This runs in a useEffect via the NavHashSync component to avoid SSR mismatch.
export function initFromHash() {
  if (typeof window === 'undefined') return
  useNav.setState({ view: hashToView(window.location.hash), mobileNavOpen: false })
}

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    useNav.setState({ view: hashToView(window.location.hash), mobileNavOpen: false })
    window.scrollTo({ top: 0, behavior: 'auto' })
  })
}
