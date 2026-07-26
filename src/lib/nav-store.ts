'use client'

import { create } from 'zustand'

export type PageId =
  | 'home'
  | 'about'
  | 'academics'
  | 'news'
  | 'gallery'
  | 'contact'

interface NavState {
  view: PageId
  navigate: (view: PageId) => void
  goHome: () => void
  goPage: (page: PageId) => void
  // mobile menu
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  // search
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

const HOME: PageId = 'home'

function viewToHash(view: PageId): string {
  return view === 'home' ? '#/' : `#/${view}`
}

function hashToView(hash: string): PageId {
  const clean = hash.replace(/^#\/?/, '')
  const parts = clean.split('/').filter(Boolean)
  if (parts.length === 0) return HOME
  const pages: PageId[] = ['home', 'about', 'academics', 'news', 'gallery', 'contact']
  if (pages.includes(parts[0] as PageId)) {
    return parts[0] as PageId
  }
  return HOME
}

export const useNav = create<NavState>((set, get) => ({
  // Always initialize to HOME to avoid SSR/client hydration mismatch.
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
  goPage: (page) => get().navigate(page),
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
}))

// Sync the store with the URL hash after hydration (client-only).
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
