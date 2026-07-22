'use client'

import * as React from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useNav, type PageId } from '@/lib/nav-store'
import { PAGES } from './page-registry'

interface SearchItem {
  title: string
  description: string
  page: PageId
  keywords: string[]
}

const SEARCH_INDEX: SearchItem[] = [
  ...PAGES.map((p) => ({
    title: p.label,
    description: p.description,
    page: p.id,
    keywords: [p.label.toLowerCase(), p.id],
  })),
  { title: 'Biology Lab', description: 'Our hands-on science program', page: 'academics', keywords: ['science', 'biology', 'lab', 'experiment'] },
  { title: 'School Calendar', description: 'Upcoming events and dates', page: 'news', keywords: ['calendar', 'events', 'dates', 'schedule'] },
  { title: 'School Facilities', description: 'Campus, labs, library & spaces', page: 'about', keywords: ['campus', 'facilities', 'library', 'lab'] },
  { title: 'Clubs & Activities', description: 'Student clubs and societies', page: 'academics', keywords: ['clubs', 'activities', 'extracurricular'] },
  { title: 'Contact Us', description: 'Phone, email, address & map', page: 'contact', keywords: ['contact', 'phone', 'email', 'address', 'map'] },
]

export function SearchModal() {
  const { searchOpen, setSearchOpen, goPage } = useNav()
  const [query, setQuery] = React.useState('')

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SEARCH_INDEX.slice(0, 5)
    return SEARCH_INDEX.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
      )
    })
  }, [query])

  const select = (page: PageId) => {
    goPage(page)
    setSearchOpen(false)
    setQuery('')
  }

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setSearchOpen])

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="max-w-xl gap-0 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Hamza School</DialogTitle>
          <DialogDescription>Find pages and information</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-5 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Hamza School..."
            className="h-14 border-0 px-0 text-base shadow-none focus-visible:ring-0"
          />
          <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
            ESC
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No results for “{query}”.
            </p>
          ) : (
            results.map((item) => (
              <button
                key={item.title}
                onClick={() => select(item.page)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-accent"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Search className="size-4" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground" />
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
