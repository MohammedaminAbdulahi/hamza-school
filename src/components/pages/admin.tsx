'use client'

import * as React from 'react'
import {
  ArrowLeft,
  Image as ImageIcon,
  Newspaper,
  Calendar,
  Plus,
  Trash2,
  Save,
  Eye,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/site/logo'
import { useNav } from '@/lib/nav-store'
import { GALLERY, NEWS, EVENTS, GALLERY_CATEGORIES } from '@/lib/data/school'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// ─── localStorage helpers ───
const STORAGE_KEY = 'hamza-admin-content'

interface AdminContent {
  gallery: typeof GALLERY
  news: typeof NEWS
  events: typeof EVENTS
}

function loadContent(): AdminContent {
  if (typeof window === 'undefined') return { gallery: GALLERY, news: NEWS, events: EVENTS }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return { gallery: GALLERY, news: NEWS, events: EVENTS }
}

function saveContent(content: AdminContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  } catch {
    // ignore
  }
}

// ─── Tabs ───
type Tab = 'gallery' | 'news' | 'events'

export function AdminPage() {
  const goHome = useNav((s) => s.goHome)
  const goPage = useNav((s) => s.goPage)
  const [content, setContent] = React.useState<AdminContent>(loadContent)
  const [tab, setTab] = React.useState<Tab>('gallery')

  const update = (key: keyof AdminContent, value: any) => {
    const next = { ...content, [key]: value }
    setContent(next)
    saveContent(next)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goHome} aria-label="Back to site">
              <ArrowLeft className="size-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold leading-none">Content Manager</h1>
              <p className="text-xs text-muted-foreground">Hamza School — Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => goPage('gallery')}>
              <Eye className="size-4" /> View Gallery
            </Button>
            <Button variant="outline" size="sm" onClick={() => goPage('news')}>
              <Eye className="size-4" /> View News
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Info banner */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-foreground">
            <strong>How this works:</strong> Changes you make here are saved in your browser
            and appear on the live site. This is a demo tool — for a real site, changes would
            save to a database.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {([
            { id: 'gallery' as Tab, label: 'Gallery', icon: ImageIcon, count: content.gallery.length },
            { id: 'news' as Tab, label: 'News', icon: Newspaper, count: content.news.length },
            { id: 'events' as Tab, label: 'Events', icon: Calendar, count: content.events.length },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                tab === t.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card text-foreground/80 hover:bg-accent'
              )}
            >
              <t.icon className="size-4" />
              {t.label}
              <Badge variant={tab === t.id ? 'secondary' : 'outline'} className="ml-1">
                {t.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Content panels */}
        {tab === 'gallery' && <GalleryManager items={content.gallery} onChange={(v) => update('gallery', v)} />}
        {tab === 'news' && <NewsManager items={content.news} onChange={(v) => update('news', v)} />}
        {tab === 'events' && <EventManager items={content.events} onChange={(v) => update('events', v)} />}
      </div>
    </div>
  )
}

// ─── Gallery Manager ───
function GalleryManager({
  items,
  onChange,
}: {
  items: typeof GALLERY
  onChange: (v: typeof GALLERY) => void
}) {
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({ title: '', category: 'Campus' })

  const add = () => {
    if (!form.title.trim()) {
      toast.error('Please enter a title')
      return
    }
    onChange([
      { title: form.title, category: form.category, image: form.title.toLowerCase().replace(/\s+/g, '-') },
      ...items,
    ])
    toast.success('Gallery item added!')
    setForm({ title: '', category: 'Campus' })
    setAdding(false)
  }

  const remove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx))
    toast.success('Item removed')
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gallery Items</CardTitle>
        <Button size="sm" onClick={() => setAdding(!adding)}>
          <Plus className="size-4" /> Add Item
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {adding && (
          <div className="grid gap-3 rounded-lg border bg-muted/30 p-4 sm:grid-cols-[1fr_auto_auto]">
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
                className="h-9 rounded-md border bg-background px-3 text-sm"
              >
                {GALLERY_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button size="sm" onClick={add}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-lg border bg-card">
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20">
                <ImageIcon className="size-8 text-primary/40" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">{item.title}</p>
                <Badge variant="secondary" className="mt-1 text-[10px]">{item.category}</Badge>
              </div>
              <button
                onClick={() => remove(idx)}
                className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-destructive/90 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Delete"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── News Manager ───
function NewsManager({
  items,
  onChange,
}: {
  items: typeof NEWS
  onChange: (v: typeof NEWS) => void
}) {
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({
    title: '', excerpt: '', date: new Date().toISOString().slice(0, 10),
    category: 'Campus', author: 'Admin',
  })

  const add = () => {
    if (!form.title.trim() || !form.excerpt.trim()) {
      toast.error('Please fill in title and excerpt')
      return
    }
    onChange([
      { ...form, image: form.title.toLowerCase().replace(/\s+/g, '-') },
      ...items,
    ])
    toast.success('News article added!')
    setForm({ title: '', excerpt: '', date: new Date().toISOString().slice(0, 10), category: 'Campus', author: 'Admin' })
    setAdding(false)
  }

  const remove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx))
    toast.success('Article removed')
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>News Articles</CardTitle>
        <Button size="sm" onClick={() => setAdding(!adding)}>
          <Plus className="size-4" /> Add Article
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {adding && (
          <div className="grid gap-3 rounded-lg border bg-muted/30 p-4">
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
              <Button size="sm" onClick={add}><Save className="size-4" /> Save Article</Button>
              <Button size="sm" variant="outline" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="group flex items-start gap-3 rounded-lg border bg-card p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">{item.category}</Badge>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="mt-1 font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                <p className="mt-1 text-xs text-muted-foreground">By {item.author}</p>
              </div>
              <button
                onClick={() => remove(idx)}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                aria-label="Delete"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Events Manager ───
function EventManager({
  items,
  onChange,
}: {
  items: typeof EVENTS
  onChange: (v: typeof EVENTS) => void
}) {
  const [adding, setAdding] = React.useState(false)
  const [form, setForm] = React.useState({
    title: '', date: new Date().toISOString().slice(0, 10), time: '9:00 AM',
    location: '', category: 'Academic', description: '',
  })

  const add = () => {
    if (!form.title.trim() || !form.location.trim()) {
      toast.error('Please fill in title and location')
      return
    }
    onChange([...items, { ...form }])
    toast.success('Event added!')
    setForm({ title: '', date: new Date().toISOString().slice(0, 10), time: '9:00 AM', location: '', category: 'Academic', description: '' })
    setAdding(false)
  }

  const remove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx))
    toast.success('Event removed')
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Events</CardTitle>
        <Button size="sm" onClick={() => setAdding(!adding)}>
          <Plus className="size-4" /> Add Event
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {adding && (
          <div className="grid gap-3 rounded-lg border bg-muted/30 p-4">
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
              <Button size="sm" onClick={add}><Save className="size-4" /> Save Event</Button>
              <Button size="sm" variant="outline" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="group flex items-start gap-3 rounded-lg border bg-card p-4">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="text-[10px] font-semibold uppercase">{new Date(item.date).toLocaleDateString('en', { month: 'short' })}</span>
                <span className="text-lg font-bold leading-none">{new Date(item.date).getDate()}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">{item.category}</Badge>
                  <span className="text-xs text-muted-foreground">{item.time} · {item.location}</span>
                </div>
                <p className="mt-1 font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{item.description}</p>
              </div>
              <button
                onClick={() => remove(idx)}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                aria-label="Delete"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
