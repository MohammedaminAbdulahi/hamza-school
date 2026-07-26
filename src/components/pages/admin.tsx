'use client'

import * as React from 'react'
import {
  ArrowLeft,
  Image as ImageIcon,
  Newspaper,
  Calendar,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  Eye,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/site/logo'
import { useNav } from '@/lib/nav-store'
import { GALLERY, NEWS, EVENTS, GALLERY_CATEGORIES } from '@/lib/data/school'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// ─── Types ───
type GalleryItem = { title: string; category: string; image: string }
type NewsItem = { title: string; excerpt: string; date: string; category: string; author: string; image: string }
type EventItem = { title: string; date: string; time: string; location: string; category: string; description: string }

interface AdminContent {
  gallery: GalleryItem[]
  news: NewsItem[]
  events: EventItem[]
}

const STORAGE_KEY = 'hamza-admin-content'
const DEFAULT_CONTENT: AdminContent = {
  gallery: GALLERY,
  news: NEWS,
  events: EVENTS,
}

function loadContent(): AdminContent {
  if (typeof window === 'undefined') return DEFAULT_CONTENT
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...DEFAULT_CONTENT, ...JSON.parse(stored) }
  } catch {
    // ignore
  }
  return DEFAULT_CONTENT
}

function saveContent(content: AdminContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  } catch {
    // ignore
  }
}

type Tab = 'gallery' | 'news' | 'events'

export function AdminPage() {
  const goHome = useNav((s) => s.goHome)
  const goPage = useNav((s) => s.goPage)
  const [content, setContent] = React.useState<AdminContent>(loadContent)
  const [tab, setTab] = React.useState<Tab>('gallery')
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  const update = (key: keyof AdminContent, value: any) => {
    const next = { ...content, [key]: value }
    setContent(next)
    saveContent(next)
  }

  const tabs = [
    { id: 'gallery' as Tab, label: 'Gallery', icon: ImageIcon, count: content.gallery.length },
    { id: 'news' as Tab, label: 'News', icon: Newspaper, count: content.news.length },
    { id: 'events' as Tab, label: 'Events', icon: Calendar, count: content.events.length },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goHome} aria-label="Back to site" className="shrink-0">
              <ArrowLeft className="size-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold leading-none sm:text-lg">Content Manager</h1>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">Hamza School — Admin</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goPage(tab === 'gallery' ? 'gallery' : tab === 'news' ? 'news' : 'news')}
              className="hidden sm:inline-flex"
            >
              <Eye className="size-4" /> View
            </Button>
            <Button variant="ghost" size="icon" onClick={goHome} aria-label="Home" className="sm:hidden">
              <Home className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:py-8">
        {/* Sidebar / mobile nav */}
        <aside className="lg:w-60 lg:shrink-0">
          {/* Desktop sidebar */}
          <nav className="hidden flex-col gap-1 lg:flex">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Manage
            </p>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  tab === t.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground/80 hover:bg-accent'
                )}
              >
                <t.icon className="size-4.5" />
                <span className="flex-1 text-left">{t.label}</span>
                <Badge variant={tab === t.id ? 'secondary' : 'outline'} className="text-[10px]">
                  {t.count}
                </Badge>
              </button>
            ))}
            <div className="mt-4 border-t pt-3">
              <button
                onClick={goHome}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
              >
                <Home className="size-4.5" />
                Back to Website
              </button>
            </div>
          </nav>

          {/* Mobile horizontal tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                  tab === t.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card text-foreground/80'
                )}
              >
                <t.icon className="size-4" />
                {t.label}
                <Badge variant={tab === t.id ? 'secondary' : 'outline'} className="ml-1 text-[10px]">
                  {t.count}
                </Badge>
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Info banner */}
          <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm text-foreground">
              <strong>How this works:</strong> Changes save to your browser and appear on the live
              site instantly. You can edit or delete any item.
            </p>
          </div>

          {tab === 'gallery' && <GalleryManager items={content.gallery} onChange={(v) => update('gallery', v)} />}
          {tab === 'news' && <NewsManager items={content.news} onChange={(v) => update('news', v)} />}
          {tab === 'events' && <EventManager items={content.events} onChange={(v) => update('events', v)} />}
        </main>
      </div>
    </div>
  )
}

// ─── Gallery Manager ───
function GalleryManager({
  items,
  onChange,
}: {
  items: GalleryItem[]
  onChange: (v: GalleryItem[]) => void
}) {
  const [editing, setEditing] = React.useState<number | 'new' | null>(null)
  const [form, setForm] = React.useState<GalleryItem>({ title: '', category: 'Campus', image: '' })

  const startNew = () => {
    setForm({ title: '', category: 'Campus', image: '' })
    setEditing('new')
  }
  const startEdit = (idx: number) => {
    setForm({ ...items[idx] })
    setEditing(idx)
  }
  const cancel = () => setEditing(null)

  const save = () => {
    if (!form.title.trim()) {
      toast.error('Please enter a title')
      return
    }
    const image = form.image || form.title.toLowerCase().replace(/\s+/g, '-')
    const item = { ...form, image }
    if (editing === 'new') {
      onChange([item, ...items])
      toast.success('Gallery item added!')
    } else if (typeof editing === 'number') {
      onChange(items.map((it, i) => (i === editing ? item : it)))
      toast.success('Gallery item updated!')
    }
    setEditing(null)
  }

  const remove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx))
    toast.success('Item deleted')
  }

  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Gallery Items</h2>
            <p className="text-sm text-muted-foreground">{items.length} items</p>
          </div>
          {editing !== 'new' && (
            <Button size="sm" onClick={startNew}>
              <Plus className="size-4" /> Add Item
            </Button>
          )}
        </div>

        {/* Edit / Add form */}
        {editing !== null && (
          <div className="mb-5 grid gap-3 rounded-lg border bg-muted/30 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="g-title">Title</Label>
                <Input
                  id="g-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Science Fair 2025"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="g-cat">Category</Label>
                <select
                  id="g-cat"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                >
                  {GALLERY_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={save}>
                <Save className="size-4" /> {editing === 'new' ? 'Add' : 'Save Changes'}
              </Button>
              <Button size="sm" variant="outline" onClick={cancel}>
                <X className="size-4" /> Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Items list */}
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No gallery items yet. Click "Add Item" to create one.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg border bg-card">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 to-accent/30">
                  <ImageIcon className="size-8 text-primary/40" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <Badge variant="secondary" className="mt-1 text-[10px]">{item.category}</Badge>
                </div>
                {/* Action buttons — always visible on mobile, hover on desktop */}
                <div className="absolute right-2 top-2 flex gap-1.5">
                  <button
                    onClick={() => startEdit(idx)}
                    className="flex size-7 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Edit"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    onClick={() => remove(idx)}
                    className="flex size-7 items-center justify-center rounded-full bg-white/90 text-destructive shadow-sm transition-colors hover:bg-destructive hover:text-white"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── News Manager ───
function NewsManager({
  items,
  onChange,
}: {
  items: NewsItem[]
  onChange: (v: NewsItem[]) => void
}) {
  const [editing, setEditing] = React.useState<number | 'new' | null>(null)
  const [form, setForm] = React.useState<NewsItem>({
    title: '', excerpt: '', date: new Date().toISOString().slice(0, 10),
    category: 'Campus', author: 'Admin', image: '',
  })

  const startNew = () => {
    setForm({
      title: '', excerpt: '', date: new Date().toISOString().slice(0, 10),
      category: 'Campus', author: 'Admin', image: '',
    })
    setEditing('new')
  }
  const startEdit = (idx: number) => {
    setForm({ ...items[idx] })
    setEditing(idx)
  }
  const cancel = () => setEditing(null)

  const save = () => {
    if (!form.title.trim() || !form.excerpt.trim()) {
      toast.error('Please fill in title and excerpt')
      return
    }
    const image = form.image || form.title.toLowerCase().replace(/\s+/g, '-')
    const item = { ...form, image }
    if (editing === 'new') {
      onChange([item, ...items])
      toast.success('News article added!')
    } else if (typeof editing === 'number') {
      onChange(items.map((it, i) => (i === editing ? item : it)))
      toast.success('News article updated!')
    }
    setEditing(null)
  }

  const remove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx))
    toast.success('Article deleted')
  }

  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">News Articles</h2>
            <p className="text-sm text-muted-foreground">{items.length} articles</p>
          </div>
          {editing !== 'new' && (
            <Button size="sm" onClick={startNew}>
              <Plus className="size-4" /> Add Article
            </Button>
          )}
        </div>

        {editing !== null && (
          <div className="mb-5 grid gap-3 rounded-lg border bg-muted/30 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="n-title">Title</Label>
                <Input id="n-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Article title" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="n-author">Author</Label>
                <Input id="n-author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="n-date">Date</Label>
                <Input id="n-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="n-cat">Category</Label>
                <select id="n-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="h-9 w-full rounded-md border bg-background px-3 text-sm">
                  {['Campus', 'Achievement', 'Community', 'Academics', 'Arts'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="n-excerpt">Excerpt</Label>
              <Textarea id="n-excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary of the article" rows={3} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={save}>
                <Save className="size-4" /> {editing === 'new' ? 'Add Article' : 'Save Changes'}
              </Button>
              <Button size="sm" variant="outline" onClick={cancel}>
                <X className="size-4" /> Cancel
              </Button>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No news articles yet. Click "Add Article" to create one.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="group flex items-start gap-3 rounded-lg border bg-card p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{item.category}</Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="mt-1 font-medium">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                  <p className="mt-1 text-xs text-muted-foreground">By {item.author}</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    onClick={() => startEdit(idx)}
                    className="flex size-8 items-center justify-center rounded-lg border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={() => remove(idx)}
                    className="flex size-8 items-center justify-center rounded-lg border bg-background text-destructive transition-colors hover:bg-destructive hover:text-white"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Events Manager ───
function EventManager({
  items,
  onChange,
}: {
  items: EventItem[]
  onChange: (v: EventItem[]) => void
}) {
  const [editing, setEditing] = React.useState<number | 'new' | null>(null)
  const [form, setForm] = React.useState<EventItem>({
    title: '', date: new Date().toISOString().slice(0, 10), time: '9:00 AM',
    location: '', category: 'Academic', description: '',
  })

  const startNew = () => {
    setForm({
      title: '', date: new Date().toISOString().slice(0, 10), time: '9:00 AM',
      location: '', category: 'Academic', description: '',
    })
    setEditing('new')
  }
  const startEdit = (idx: number) => {
    setForm({ ...items[idx] })
    setEditing(idx)
  }
  const cancel = () => setEditing(null)

  const save = () => {
    if (!form.title.trim() || !form.location.trim()) {
      toast.error('Please fill in title and location')
      return
    }
    if (editing === 'new') {
      onChange([...items, { ...form }])
      toast.success('Event added!')
    } else if (typeof editing === 'number') {
      onChange(items.map((it, i) => (i === editing ? { ...form } : it)))
      toast.success('Event updated!')
    }
    setEditing(null)
  }

  const remove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx))
    toast.success('Event deleted')
  }

  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="text-sm text-muted-foreground">{items.length} events</p>
          </div>
          {editing !== 'new' && (
            <Button size="sm" onClick={startNew}>
              <Plus className="size-4" /> Add Event
            </Button>
          )}
        </div>

        {editing !== null && (
          <div className="mb-5 grid gap-3 rounded-lg border bg-muted/30 p-4">
            <div className="space-y-1.5">
              <Label htmlFor="e-title">Event Title</Label>
              <Input id="e-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Parent-Teacher Conference" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="e-date">Date</Label>
                <Input id="e-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="e-time">Time</Label>
                <Input id="e-time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="9:00 AM" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="e-cat">Category</Label>
                <select id="e-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="h-9 w-full rounded-md border bg-background px-3 text-sm">
                  {['Academic', 'Arts', 'Sports', 'Career', 'Community'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e-loc">Location</Label>
              <Input id="e-loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Main Hall" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e-desc">Description</Label>
              <Textarea id="e-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" rows={2} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={save}>
                <Save className="size-4" /> {editing === 'new' ? 'Add Event' : 'Save Changes'}
              </Button>
              <Button size="sm" variant="outline" onClick={cancel}>
                <X className="size-4" /> Cancel
              </Button>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No events yet. Click "Add Event" to create one.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="group flex items-start gap-3 rounded-lg border bg-card p-4">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="text-[10px] font-semibold uppercase">{new Date(item.date).toLocaleDateString('en', { month: 'short' })}</span>
                  <span className="text-lg font-bold leading-none">{new Date(item.date).getDate()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">{item.category}</Badge>
                    <span className="text-xs text-muted-foreground">{item.time} · {item.location}</span>
                  </div>
                  <p className="mt-1 font-medium">{item.title}</p>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    onClick={() => startEdit(idx)}
                    className="flex size-8 items-center justify-center rounded-lg border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    onClick={() => remove(idx)}
                    className="flex size-8 items-center justify-center rounded-lg border bg-background text-destructive transition-colors hover:bg-destructive hover:text-white"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
