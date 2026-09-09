'use client'

import * as React from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  ArrowLeft,
  Lock,
  Save,
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
  Building2,
  Images,
  Users,
  GraduationCap,
  Newspaper,
  CalendarDays,
  Loader2,
  Eye,
  EyeOff,
  Upload,
  ImageIcon,
} from 'lucide-react'
import { fileToResizedBase64, isDataUrl } from '@/lib/image-upload'

// ─── Types ───
type School = {
  name: string
  tagline: string
  subtitle: string
  established: number
  email: string
  phone: string
  altPhone: string
  address: string
  hours: string
  social: {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
    telegram: string
  }
  hero: {
    eyebrow: string
    title: string
    description: string
    primaryButton: string
    secondaryButton: string
  }
  principal: {
    name: string
    title: string
    message: string
    signature: string
    photo: string
  }
  vicePrincipal: {
    name: string
    title: string
    message: string
    photo: string
  }
  mission: {
    eyebrow: string
    title: string
    description: string
    quote: string
    quoteSource: string
  }
}

type GalleryItem = {
  id?: number
  title: string
  category: string
  image: string
}
type Teacher = {
  id?: number
  name: string
  subject: string
  years: number
  initials: string
}
type Leader = {
  id?: number
  name: string
  role: string
  bio: string
  initials: string
  photo: string
}
type NewsItem = {
  id?: number
  title: string
  excerpt: string
  date: string
  category: string
  author: string
  image: string
}
type EventItem = {
  id?: number
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
}

type AllData = {
  school: School | null
  gallery: GalleryItem[]
  teachers: Teacher[]
  leadership: Leader[]
  news: NewsItem[]
  events: EventItem[]
}

const GALLERY_CATEGORIES = [
  'Campus',
  'Events',
  'Sports',
  'Arts',
  'Culture',
  'Graduation',
]
const NEWS_CATEGORIES = [
  'Campus',
  'Achievement',
  'Community',
  'Academics',
  'Arts',
]
const EVENT_CATEGORIES = [
  'Academic',
  'Arts',
  'Sports',
  'Community',
  'Holiday',
]

const STORAGE_KEY = 'hamza_admin_pw'

// ─── Admin Page ───
export default function AdminPage() {
  const [authed, setAuthed] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [storedPw, setStoredPw] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<AllData | null>(null)
  const [showPw, setShowPw] = React.useState(false)

  // Auto-login from localStorage on mount
  React.useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      setStoredPw(saved)
      void tryLogin(saved)
    }
  }, [])

  async function tryLogin(pw: string) {
    setLoading(true)
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw, action: 'get' }),
      })
      if (res.ok) {
        const json = (await res.json()) as AllData
        setData(json)
        setAuthed(true)
        setStoredPw(pw)
        try {
          localStorage.setItem(STORAGE_KEY, pw)
        } catch {
          /* ignore */
        }
        toast.success('Welcome back, admin!')
      } else {
        const j = (await res.json().catch(() => ({}))) as { error?: string }
        toast.error(j.error || 'Login failed')
        try {
          localStorage.removeItem(STORAGE_KEY)
        } catch {
          /* ignore */
        }
        setStoredPw(null)
      }
    } catch {
      toast.error('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!password.trim()) {
      toast.error('Please enter the admin password.')
      return
    }
    void tryLogin(password)
  }

  function logout() {
    setAuthed(false)
    setPassword('')
    setStoredPw(null)
    setData(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    toast.success('Signed out.')
  }

  async function callAdmin(payload: Record<string, unknown>): Promise<AllData> {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, password: storedPw }),
    })
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      throw new Error(j.error || 'Request failed')
    }
    return (await res.json()) as AllData
  }

  async function refresh() {
    try {
      const json = await callAdmin({ action: 'get' })
      setData(json)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Refresh failed')
    }
  }

  // ─── LOGIN SCREEN ───
  if (!authed) {
    return (
      <div className="paper-texture flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gold-deep transition-colors hover:text-forest"
          >
            <ArrowLeft className="size-4" />
            Back to website
          </Link>

          <Card className="overflow-hidden border-gold/30 shadow-2xl">
            <div className="bg-forest px-8 py-10 text-center text-cream">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border-2 border-gold/40 bg-forest/40">
                <Lock className="size-7 text-gold-light" />
              </div>
              <h1 className="font-serif text-3xl font-semibold tracking-tight">
                Hamza Admin
              </h1>
              <p className="mt-2 text-sm text-cream/70">
                Content management for Hamza School
              </p>
            </div>

            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
                    Admin Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-12 rounded-sm border-gold/30 bg-paper pr-11 text-base"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-forest"
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                    >
                      {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full gap-2 rounded-sm bg-forest text-xs font-medium uppercase tracking-[0.15em] text-cream transition-all hover:bg-gold-deep"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 rounded-sm border border-gold/20 bg-cream/60 p-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-gold-deep">Hint:</span>{' '}
                  The default admin password is set in the server environment
                  variable <code className="rounded bg-muted px-1.5 py-0.5 text-[10px]">ADMIN_PASSWORD</code>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ─── DASHBOARD ───
  return (
    <div className="paper-texture min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-gold/20 bg-forest text-cream shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full border border-gold/40 bg-forest/40">
              <GraduationCap className="size-5 text-gold-light" />
            </div>
            <div>
              <div className="font-serif text-lg font-semibold leading-none">
                Hamza Admin
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gold-light/80">
                Content Dashboard
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 gap-2 rounded-sm border-gold/40 bg-transparent text-xs font-medium uppercase tracking-wider text-cream hover:bg-gold hover:text-forest"
            >
              <Link href="/">
                <ArrowLeft className="size-3.5" />
                <span className="hidden sm:inline">Back to website</span>
                <span className="sm:hidden">Site</span>
              </Link>
            </Button>
            <Button
              onClick={logout}
              size="sm"
              className="h-9 gap-2 rounded-sm bg-crimson text-xs font-medium uppercase tracking-wider text-cream hover:bg-crimson/80"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-2">
          <p className="section-label">Admin Panel</p>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-forest sm:text-5xl">
            Manage your <em className="italic text-gold-deep">content</em>
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Edit school info, gallery, teachers, leadership, news, and events.
            Changes appear live on the public site within seconds.
          </p>
        </div>

        {loading && !data ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-gold-deep" />
          </div>
        ) : data ? (
          <Tabs defaultValue="school" className="w-full">
            <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-start gap-1 rounded-sm border border-gold/20 bg-cream p-1.5">
              <TabsTrigger
                value="school"
                className="flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium uppercase tracking-wider data-[state=active]:bg-forest data-[state=active]:text-cream"
              >
                <Building2 className="size-3.5" />
                School Info
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium uppercase tracking-wider data-[state=active]:bg-forest data-[state=active]:text-cream"
              >
                <Images className="size-3.5" />
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="teachers"
                className="flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium uppercase tracking-wider data-[state=active]:bg-forest data-[state=active]:text-cream"
              >
                <Users className="size-3.5" />
                Teachers
              </TabsTrigger>
              <TabsTrigger
                value="leadership"
                className="flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium uppercase tracking-wider data-[state=active]:bg-forest data-[state=active]:text-cream"
              >
                <GraduationCap className="size-3.5" />
                Leadership
              </TabsTrigger>
              <TabsTrigger
                value="news"
                className="flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium uppercase tracking-wider data-[state=active]:bg-forest data-[state=active]:text-cream"
              >
                <Newspaper className="size-3.5" />
                News
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium uppercase tracking-wider data-[state=active]:bg-forest data-[state=active]:text-cream"
              >
                <CalendarDays className="size-3.5" />
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="school" className="mt-0">
              {data.school ? (
                <SchoolTab
                  school={data.school}
                  onSave={async (school) => {
                    try {
                      const json = await callAdmin({
                        action: 'update_school',
                        school,
                      })
                      setData(json)
                      toast.success('School info saved.')
                    } catch (e) {
                      toast.error(e instanceof Error ? e.message : 'Save failed')
                    }
                  }}
                />
              ) : (
                <div className="rounded-sm border border-gold/30 bg-cream p-8 text-center text-muted-foreground">
                  No school info in the database yet.
                </div>
              )}
            </TabsContent>

            <TabsContent value="gallery" className="mt-0">
              <GalleryTab
                items={data.gallery}
                onAdd={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'add_gallery', ...item })
                    setData(json)
                    toast.success('Gallery item added.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Add failed')
                  }
                }}
                onUpdate={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'update_gallery', ...item })
                    setData(json)
                    toast.success('Gallery item updated.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Update failed')
                  }
                }}
                onDelete={async (id) => {
                  try {
                    const json = await callAdmin({ action: 'delete_gallery', id })
                    setData(json)
                    toast.success('Gallery item deleted.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Delete failed')
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="teachers" className="mt-0">
              <TeachersTab
                items={data.teachers}
                onAdd={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'add_teacher', ...item })
                    setData(json)
                    toast.success('Teacher added.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Add failed')
                  }
                }}
                onUpdate={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'update_teacher', ...item })
                    setData(json)
                    toast.success('Teacher updated.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Update failed')
                  }
                }}
                onDelete={async (id) => {
                  try {
                    const json = await callAdmin({ action: 'delete_teacher', id })
                    setData(json)
                    toast.success('Teacher deleted.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Delete failed')
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="leadership" className="mt-0">
              <LeadershipTab
                items={data.leadership}
                onAdd={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'add_leadership', ...item })
                    setData(json)
                    toast.success('Leader added.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Add failed')
                  }
                }}
                onUpdate={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'update_leadership', ...item })
                    setData(json)
                    toast.success('Leader updated.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Update failed')
                  }
                }}
                onDelete={async (id) => {
                  try {
                    const json = await callAdmin({ action: 'delete_leadership', id })
                    setData(json)
                    toast.success('Leader deleted.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Delete failed')
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="news" className="mt-0">
              <NewsTab
                items={data.news}
                onAdd={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'add_news', ...item })
                    setData(json)
                    toast.success('News article added.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Add failed')
                  }
                }}
                onUpdate={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'update_news', ...item })
                    setData(json)
                    toast.success('News article updated.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Update failed')
                  }
                }}
                onDelete={async (id) => {
                  try {
                    const json = await callAdmin({ action: 'delete_news', id })
                    setData(json)
                    toast.success('News article deleted.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Delete failed')
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <EventsTab
                items={data.events}
                onAdd={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'add_event', ...item })
                    setData(json)
                    toast.success('Event added.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Add failed')
                  }
                }}
                onUpdate={async (item) => {
                  try {
                    const json = await callAdmin({ action: 'update_event', ...item })
                    setData(json)
                    toast.success('Event updated.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Update failed')
                  }
                }}
                onDelete={async (id) => {
                  try {
                    const json = await callAdmin({ action: 'delete_event', id })
                    setData(json)
                    toast.success('Event deleted.')
                  } catch (e) {
                    toast.error(e instanceof Error ? e.message : 'Delete failed')
                  }
                }}
              />
            </TabsContent>
          </Tabs>
        ) : null}

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-gold/20 pt-6">
          <p className="text-xs text-muted-foreground">
            Tip: changes are saved to the live database and appear on the public site immediately.
          </p>
          <Button
            onClick={refresh}
            variant="outline"
            size="sm"
            className="h-9 gap-2 rounded-sm border-forest text-xs font-medium uppercase tracking-wider text-forest hover:bg-forest hover:text-cream"
          >
            <Loader2 className="size-3.5" />
            Refresh
          </Button>
        </div>
      </main>
    </div>
  )
}

// ─── Reusable Section Card ───
function SectionCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-gold/20 bg-paper">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-forest">{title}</CardTitle>
        {description ? (
          <CardDescription className="text-sm">{description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
      {children}
    </Label>
  )
}

// ─── Reusable image upload widget (client-side resize → base64 data URL) ───
function ImageUpload({
  value,
  onChange,
  label,
  aspect = 'aspect-square',
  maxSize = 'size-24',
}: {
  value: string
  onChange: (v: string) => void
  label: string
  aspect?: string
  maxSize?: string
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = React.useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    try {
      const base64 = await fileToResizedBase64(file)
      onChange(base64)
      toast.success('Photo ready. Save to keep it.')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not read image')
    } finally {
      setUploading(false)
    }
  }

  const hasPhoto = isDataUrl(value)

  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-start gap-4">
        <div
          className={`${maxSize} ${aspect} shrink-0 overflow-hidden rounded-sm border border-gold/30 bg-cream/70`}
        >
          {hasPhoto ? (
             
            <img
              src={value}
              alt={label}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-gold-deep/50">
              <ImageIcon className="size-6" />
              <span className="text-[10px] uppercase tracking-wider">No photo</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void handleFile(f)
              // reset so picking the same file twice still fires onChange
              e.target.value = ''
            }}
            className="hidden"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="h-8 gap-1.5 rounded-sm border-forest/40 text-xs font-medium text-forest hover:bg-forest hover:text-cream"
          >
            {uploading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <Upload className="size-3.5" />
                {hasPhoto ? 'Change Photo' : 'Upload Photo'}
              </>
            )}
          </Button>
          {hasPhoto && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => onChange('')}
              className="h-8 gap-1.5 rounded-sm text-xs font-medium text-crimson hover:bg-crimson/10"
            >
              <Trash2 className="size-3.5" />
              Remove
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        JPG or PNG. Image is resized to max 800px wide before saving.
      </p>
    </div>
  )
}

// ─── School Info Tab ───
function SchoolTab({
  school,
  onSave,
}: {
  school: School
  onSave: (s: School) => Promise<void>
}) {
  const [form, setForm] = React.useState<School>(school)
  const [saving, setSaving] = React.useState(false)

  // Re-sync when prop changes
  React.useEffect(() => {
    setForm(school)
  }, [school])

  function update<K extends keyof School>(key: K, value: School[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }
  function updateSocial(key: keyof School['social'], value: string) {
    setForm((f) => ({ ...f, social: { ...f.social, [key]: value } }))
  }
  function updateHero(key: keyof School['hero'], value: string) {
    setForm((f) => ({ ...f, hero: { ...f.hero, [key]: value } }))
  }
  function updatePrincipal(key: keyof School['principal'], value: string) {
    setForm((f) => ({ ...f, principal: { ...f.principal, [key]: value } }))
  }
  function updateVicePrincipal(key: keyof School['vicePrincipal'], value: string) {
    setForm((f) => ({ ...f, vicePrincipal: { ...f.vicePrincipal, [key]: value } }))
  }
  function updateMission(key: keyof School['mission'], value: string) {
    setForm((f) => ({ ...f, mission: { ...f.mission, [key]: value } }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <SectionCard
        title="School Identity"
        description="The basics — name, contact details, and office hours."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>School Name</FieldLabel>
            <Input
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Subtitle</FieldLabel>
            <Input
              value={form.subtitle}
              onChange={(e) => update('subtitle', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Tagline</FieldLabel>
            <Input
              value={form.tagline}
              onChange={(e) => update('tagline', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Year Established</FieldLabel>
            <Input
              type="number"
              value={form.established}
              onChange={(e) => update('established', Number(e.target.value))}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Phone</FieldLabel>
            <Input
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Alt Phone</FieldLabel>
            <Input
              value={form.altPhone}
              onChange={(e) => update('altPhone', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Office Hours</FieldLabel>
            <Input
              value={form.hours}
              onChange={(e) => update('hours', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
        </div>

        <div className="space-y-2">
          <FieldLabel>Address</FieldLabel>
          <Input
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Social Links"
        description="Used in the footer and contact page."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Facebook URL</FieldLabel>
            <Input
              value={form.social.facebook}
              onChange={(e) => updateSocial('facebook', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="https://facebook.com/..."
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Twitter / X URL</FieldLabel>
            <Input
              value={form.social.twitter}
              onChange={(e) => updateSocial('twitter', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="https://twitter.com/..."
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Instagram URL</FieldLabel>
            <Input
              value={form.social.instagram}
              onChange={(e) => updateSocial('instagram', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>YouTube URL</FieldLabel>
            <Input
              value={form.social.youtube}
              onChange={(e) => updateSocial('youtube', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="https://youtube.com/..."
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <FieldLabel>Telegram URL</FieldLabel>
            <Input
              value={form.social.telegram}
              onChange={(e) => updateSocial('telegram', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="https://t.me/..."
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Hero Section (Homepage)"
        description="The first thing visitors see on the homepage."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Hero Eyebrow</FieldLabel>
            <Input
              value={form.hero.eyebrow}
              onChange={(e) => updateHero('eyebrow', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Hero Title</FieldLabel>
            <Input
              value={form.hero.title}
              onChange={(e) => updateHero('title', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Hero Description</FieldLabel>
          <Textarea
            rows={3}
            value={form.hero.description}
            onChange={(e) => updateHero('description', e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Primary Button Label</FieldLabel>
            <Input
              value={form.hero.primaryButton}
              onChange={(e) => updateHero('primaryButton', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Secondary Button Label</FieldLabel>
            <Input
              value={form.hero.secondaryButton}
              onChange={(e) => updateHero('secondaryButton', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Principal / Founder"
        description="The principal's message on the homepage and About page."
      >
        <ImageUpload
          label="Principal Photo"
          value={form.principal.photo}
          onChange={(v) => updatePrincipal('photo', v)}
          aspect="aspect-[4/5]"
          maxSize="size-28"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Principal Name</FieldLabel>
            <Input
              value={form.principal.name}
              onChange={(e) => updatePrincipal('name', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Principal Title</FieldLabel>
            <Input
              value={form.principal.title}
              onChange={(e) => updatePrincipal('title', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Principal Message</FieldLabel>
          <Textarea
            rows={6}
            value={form.principal.message}
            onChange={(e) => updatePrincipal('message', e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel>Principal Signature (printed name)</FieldLabel>
          <Input
            value={form.principal.signature}
            onChange={(e) => updatePrincipal('signature', e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Vice Director"
        description="Optional. Leave the name blank to hide the Vice Director section on the homepage."
      >
        <ImageUpload
          label="Vice Director Photo"
          value={form.vicePrincipal.photo}
          onChange={(v) => updateVicePrincipal('photo', v)}
          aspect="aspect-[4/5]"
          maxSize="size-28"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Vice Director Name</FieldLabel>
            <Input
              value={form.vicePrincipal.name}
              onChange={(e) => updateVicePrincipal('name', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. Mrs. Hiwot Tadesse"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Vice Director Title</FieldLabel>
            <Input
              value={form.vicePrincipal.title}
              onChange={(e) => updateVicePrincipal('title', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. Vice Principal, Academics"
            />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Vice Director Message</FieldLabel>
          <Textarea
            rows={5}
            value={form.vicePrincipal.message}
            onChange={(e) => updateVicePrincipal('message', e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="A short message shown on the homepage alongside the principal's."
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Mission Section"
        description="The mission statement shown on the homepage and About page."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Mission Eyebrow</FieldLabel>
            <Input
              value={form.mission.eyebrow}
              onChange={(e) => updateMission('eyebrow', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Mission Title</FieldLabel>
            <Input
              value={form.mission.title}
              onChange={(e) => updateMission('title', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Mission Description</FieldLabel>
          <Textarea
            rows={5}
            value={form.mission.description}
            onChange={(e) => updateMission('description', e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Mission Quote</FieldLabel>
            <Textarea
              rows={2}
              value={form.mission.quote}
              onChange={(e) => updateMission('quote', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Mission Quote Source</FieldLabel>
            <Input
              value={form.mission.quoteSource}
              onChange={(e) => updateMission('quoteSource', e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
        </div>
      </SectionCard>

      {/* Sticky save bar */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 rounded-sm border border-gold/30 bg-forest px-5 py-4 text-cream shadow-xl">
        <div className="flex items-center gap-3">
          <Save className="size-5 text-gold-light" />
          <div>
            <div className="font-serif text-base font-semibold">Save changes</div>
            <div className="text-xs text-cream/70">
              Updates school info, hero, principal, and mission across the site.
            </div>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="h-11 gap-2 rounded-sm bg-gold px-6 text-xs font-semibold uppercase tracking-wider text-forest transition-all hover:bg-gold-light"
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save All
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// ─── Generic CRUD tab scaffolding ───
function CrudHeader({
  title,
  count,
  onAdd,
  addLabel,
}: {
  title: string
  count: number
  onAdd: () => void
  addLabel: string
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-2xl font-medium text-forest">{title}</h2>
        <Badge className="bg-gold/20 text-gold-deep">{count} items</Badge>
      </div>
      <Button
        onClick={onAdd}
        className="h-10 gap-2 rounded-sm bg-forest text-xs font-medium uppercase tracking-wider text-cream hover:bg-gold-deep"
      >
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  )
}

function ItemRow({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border-gold/15 bg-paper transition-colors hover:border-gold/40">
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  )
}

function ItemActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex shrink-0 gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={onEdit}
        className="h-8 gap-1.5 rounded-sm border-forest/40 text-xs font-medium text-forest hover:bg-forest hover:text-cream"
      >
        <Pencil className="size-3.5" />
        Edit
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={onDelete}
        className="h-8 gap-1.5 rounded-sm border-crimson/40 text-xs font-medium text-crimson hover:bg-crimson hover:text-cream"
      >
        <Trash2 className="size-3.5" />
        Delete
      </Button>
    </div>
  )
}

// ─── Gallery Tab ───
function GalleryTab({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: {
  items: GalleryItem[]
  onAdd: (item: GalleryItem) => Promise<void>
  onUpdate: (item: GalleryItem) => Promise<void>
  onDelete: (id: number) => Promise<void>
}) {
  const [editing, setEditing] = React.useState<GalleryItem | null>(null)
  const [adding, setAdding] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState<GalleryItem | null>(null)

  return (
    <div>
      <CrudHeader
        title="Gallery Items"
        count={items.length}
        onAdd={() => setAdding(true)}
        addLabel="Add Image"
      />

      {items.length === 0 ? (
        <div className="rounded-sm border border-dashed border-gold/30 bg-cream/50 p-12 text-center text-muted-foreground">
          No gallery items yet. Click &ldquo;Add Image&rdquo; to create one.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemRow key={item.id}>
              <div className="flex h-full flex-col gap-3">
                <div className="aspect-[4/3] overflow-hidden rounded-sm border border-gold/20 bg-cream/60">
                  {isDataUrl(item.image) ? (
                     
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-gold-deep/40">
                      <ImageIcon className="size-7" />
                      <span className="text-[10px] uppercase tracking-wider">
                        Placeholder: {item.image || '—'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-serif text-base font-semibold text-forest">
                      {item.title}
                    </div>
                    <Badge className="mt-1 bg-gold/15 text-gold-deep">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <ItemActions
                    onEdit={() => setEditing(item)}
                    onDelete={() => setConfirmDelete(item)}
                  />
                </div>
              </div>
            </ItemRow>
          ))}
        </div>
      )}

      <GalleryFormDialog
        open={adding}
        onOpenChange={setAdding}
        title="Add Gallery Image"
        onSubmit={async (item) => {
          await onAdd(item)
          setAdding(false)
        }}
      />
      <GalleryFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        title="Edit Gallery Image"
        initial={editing ?? undefined}
        onSubmit={async (item) => {
          await onUpdate(item)
          setEditing(null)
        }}
      />

      <AlertDialog
        open={!!confirmDelete}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
      >
        <AlertDialogContent className="rounded-sm border-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-forest">
              Delete gallery image?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDelete
                ? `“${confirmDelete.title}” will be permanently removed. This cannot be undone.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-sm bg-crimson text-cream hover:bg-crimson/80"
              onClick={() => {
                if (confirmDelete?.id) void onDelete(confirmDelete.id)
                setConfirmDelete(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function GalleryFormDialog({
  open,
  onOpenChange,
  title,
  initial,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: string
  initial?: GalleryItem
  onSubmit: (item: GalleryItem) => Promise<void>
}) {
  const [title_, setTitle] = React.useState('')
  const [category, setCategory] = React.useState(GALLERY_CATEGORIES[0])
  const [image, setImage] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? '')
      setCategory(initial?.category ?? GALLERY_CATEGORIES[0])
      setImage(initial?.image ?? '')
    }
  }, [open, initial])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title_.trim()) {
      toast.error('Title is required.')
      return
    }
    setSaving(true)
    try {
      await onSubmit({
        id: initial?.id,
        title: title_.trim(),
        category,
        image: image.trim(),
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FormDialogShell open={open} onOpenChange={onOpenChange} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <FieldLabel>Title</FieldLabel>
          <Input
            value={title_}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="e.g. Annual Graduation Ceremony"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel>Category</FieldLabel>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="rounded-sm border-gold/30 bg-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GALLERY_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ImageUpload
          label="Photo (or text seed for placeholder)"
          value={image}
          onChange={setImage}
          aspect="aspect-[4/3]"
          maxSize="size-32"
        />
        <div className="space-y-2">
          <FieldLabel>Or enter a text seed for a placeholder</FieldLabel>
          <Input
            value={isDataUrl(image) ? '' : image}
            onChange={(e) => setImage(e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="e.g. graduation, science-fair, campus"
            disabled={isDataUrl(image)}
          />
          <p className="text-xs text-muted-foreground">
            If no photo is uploaded, this seed generates a deterministic
            gradient placeholder via SmartImage.
          </p>
        </div>
        <FormActions saving={saving} onCancel={() => onOpenChange(false)} />
      </form>
    </FormDialogShell>
  )
}

// ─── Teachers Tab ───
function TeachersTab({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: {
  items: Teacher[]
  onAdd: (item: Teacher) => Promise<void>
  onUpdate: (item: Teacher) => Promise<void>
  onDelete: (id: number) => Promise<void>
}) {
  const [editing, setEditing] = React.useState<Teacher | null>(null)
  const [adding, setAdding] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState<Teacher | null>(null)

  return (
    <div>
      <CrudHeader
        title="Teachers"
        count={items.length}
        onAdd={() => setAdding(true)}
        addLabel="Add Teacher"
      />

      {items.length === 0 ? (
        <div className="rounded-sm border border-dashed border-gold/30 bg-cream/50 p-12 text-center text-muted-foreground">
          No teachers yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <ItemRow key={t.id}>
              <div className="flex h-full flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-lg font-semibold text-gold-light">
                    {t.initials || t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-base font-semibold text-forest">
                      {t.name}
                    </div>
                    <div className="text-xs text-gold-deep">{t.subject}</div>
                    <Badge variant="secondary" className="mt-1">
                      {t.years} yrs
                    </Badge>
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <ItemActions
                    onEdit={() => setEditing(t)}
                    onDelete={() => setConfirmDelete(t)}
                  />
                </div>
              </div>
            </ItemRow>
          ))}
        </div>
      )}

      <TeacherFormDialog
        open={adding}
        onOpenChange={setAdding}
        title="Add Teacher"
        onSubmit={async (item) => {
          await onAdd(item)
          setAdding(false)
        }}
      />
      <TeacherFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        title="Edit Teacher"
        initial={editing ?? undefined}
        onSubmit={async (item) => {
          await onUpdate(item)
          setEditing(null)
        }}
      />

      <AlertDialog
        open={!!confirmDelete}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
      >
        <AlertDialogContent className="rounded-sm border-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-forest">
              Delete teacher?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDelete
                ? `${confirmDelete.name} will be permanently removed.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-sm bg-crimson text-cream hover:bg-crimson/80"
              onClick={() => {
                if (confirmDelete?.id) void onDelete(confirmDelete.id)
                setConfirmDelete(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function TeacherFormDialog({
  open,
  onOpenChange,
  title,
  initial,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: string
  initial?: Teacher
  onSubmit: (item: Teacher) => Promise<void>
}) {
  const [name, setName] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [years, setYears] = React.useState(0)
  const [initials, setInitials] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setName(initial?.name ?? '')
      setSubject(initial?.subject ?? '')
      setYears(initial?.years ?? 0)
      setInitials(initial?.initials ?? '')
    }
  }, [open, initial])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !subject.trim()) {
      toast.error('Name and subject are required.')
      return
    }
    setSaving(true)
    try {
      await onSubmit({
        id: initial?.id,
        name: name.trim(),
        subject: subject.trim(),
        years: Number(years) || 0,
        initials: initials.trim().toUpperCase().slice(0, 3),
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FormDialogShell open={open} onOpenChange={onOpenChange} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Name</FieldLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. Mrs. Hiwot Tadesse"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Initials (2–3 letters)</FieldLabel>
            <Input
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              maxLength={3}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. HT"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Subject</FieldLabel>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. Mathematics"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Years of Experience</FieldLabel>
            <Input
              type="number"
              min={0}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
        </div>
        <FormActions saving={saving} onCancel={() => onOpenChange(false)} />
      </form>
    </FormDialogShell>
  )
}

// ─── Leadership Tab ───
function LeadershipTab({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: {
  items: Leader[]
  onAdd: (item: Leader) => Promise<void>
  onUpdate: (item: Leader) => Promise<void>
  onDelete: (id: number) => Promise<void>
}) {
  const [editing, setEditing] = React.useState<Leader | null>(null)
  const [adding, setAdding] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState<Leader | null>(null)

  return (
    <div>
      <CrudHeader
        title="Leadership Team"
        count={items.length}
        onAdd={() => setAdding(true)}
        addLabel="Add Leader"
      />

      {items.length === 0 ? (
        <div className="rounded-sm border border-dashed border-gold/30 bg-cream/50 p-12 text-center text-muted-foreground">
          No leadership members yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((l) => (
            <ItemRow key={l.id}>
              <div className="flex items-start gap-4">
                {isDataUrl(l.photo) ? (
                   
                  <img
                    src={l.photo}
                    alt={l.name}
                    className="size-14 shrink-0 rounded-full object-cover border-2 border-gold/30"
                  />
                ) : (
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-lg font-semibold text-gold-light">
                    {l.initials || l.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-base font-semibold text-forest">
                    {l.name}
                  </div>
                  <div className="text-xs font-medium text-gold-deep">{l.role}</div>
                  <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">
                    {l.bio}
                  </p>
                  <div className="mt-3">
                    <ItemActions
                      onEdit={() => setEditing(l)}
                      onDelete={() => setConfirmDelete(l)}
                    />
                  </div>
                </div>
              </div>
            </ItemRow>
          ))}
        </div>
      )}

      <LeaderFormDialog
        open={adding}
        onOpenChange={setAdding}
        title="Add Leader"
        onSubmit={async (item) => {
          await onAdd(item)
          setAdding(false)
        }}
      />
      <LeaderFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        title="Edit Leader"
        initial={editing ?? undefined}
        onSubmit={async (item) => {
          await onUpdate(item)
          setEditing(null)
        }}
      />

      <AlertDialog
        open={!!confirmDelete}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
      >
        <AlertDialogContent className="rounded-sm border-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-forest">
              Delete leader?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDelete
                ? `${confirmDelete.name} will be permanently removed.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-sm bg-crimson text-cream hover:bg-crimson/80"
              onClick={() => {
                if (confirmDelete?.id) void onDelete(confirmDelete.id)
                setConfirmDelete(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function LeaderFormDialog({
  open,
  onOpenChange,
  title,
  initial,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: string
  initial?: Leader
  onSubmit: (item: Leader) => Promise<void>
}) {
  const [name, setName] = React.useState('')
  const [role, setRole] = React.useState('')
  const [bio, setBio] = React.useState('')
  const [initials, setInitials] = React.useState('')
  const [photo, setPhoto] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setName(initial?.name ?? '')
      setRole(initial?.role ?? '')
      setBio(initial?.bio ?? '')
      setInitials(initial?.initials ?? '')
      setPhoto(initial?.photo ?? '')
    }
  }, [open, initial])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !role.trim()) {
      toast.error('Name and role are required.')
      return
    }
    setSaving(true)
    try {
      await onSubmit({
        id: initial?.id,
        name: name.trim(),
        role: role.trim(),
        bio: bio.trim(),
        initials: initials.trim().toUpperCase().slice(0, 3),
        photo,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FormDialogShell open={open} onOpenChange={onOpenChange} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ImageUpload
          label="Leader Photo"
          value={photo}
          onChange={setPhoto}
          aspect="aspect-square"
          maxSize="size-28"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Name</FieldLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. Mr. Abdulsemed Hamza"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Initials</FieldLabel>
            <Input
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              maxLength={3}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. AH"
            />
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Role / Title</FieldLabel>
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="e.g. Founder & Principal"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel>Bio</FieldLabel>
          <Textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="A short biography shown on the About page."
          />
        </div>
        <FormActions saving={saving} onCancel={() => onOpenChange(false)} />
      </form>
    </FormDialogShell>
  )
}

// ─── News Tab ───
function NewsTab({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: {
  items: NewsItem[]
  onAdd: (item: NewsItem) => Promise<void>
  onUpdate: (item: NewsItem) => Promise<void>
  onDelete: (id: number) => Promise<void>
}) {
  const [editing, setEditing] = React.useState<NewsItem | null>(null)
  const [adding, setAdding] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState<NewsItem | null>(null)

  return (
    <div>
      <CrudHeader
        title="News Articles"
        count={items.length}
        onAdd={() => setAdding(true)}
        addLabel="Add Article"
      />

      {items.length === 0 ? (
        <div className="rounded-sm border border-dashed border-gold/30 bg-cream/50 p-12 text-center text-muted-foreground">
          No news articles yet.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((n) => (
            <ItemRow key={n.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-sm border border-gold/20 bg-cream/60">
                    {isDataUrl(n.image) ? (
                       
                      <img
                        src={n.image}
                        alt={n.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gold-deep/40">
                        <ImageIcon className="size-6" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-gold/15 text-gold-deep">{n.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {n.date} · by {n.author || 'Unknown'}
                      </span>
                    </div>
                    <div className="mt-1 font-serif text-lg font-semibold text-forest">
                      {n.title}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {n.excerpt}
                    </p>
                    {!isDataUrl(n.image) && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="font-semibold uppercase tracking-wider text-gold-deep">Seed:</span>{' '}
                        <code>{n.image || '—'}</code>
                      </div>
                    )}
                  </div>
                </div>
                <ItemActions
                  onEdit={() => setEditing(n)}
                  onDelete={() => setConfirmDelete(n)}
                />
              </div>
            </ItemRow>
          ))}
        </div>
      )}

      <NewsFormDialog
        open={adding}
        onOpenChange={setAdding}
        title="Add News Article"
        onSubmit={async (item) => {
          await onAdd(item)
          setAdding(false)
        }}
      />
      <NewsFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        title="Edit News Article"
        initial={editing ?? undefined}
        onSubmit={async (item) => {
          await onUpdate(item)
          setEditing(null)
        }}
      />

      <AlertDialog
        open={!!confirmDelete}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
      >
        <AlertDialogContent className="rounded-sm border-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-forest">
              Delete article?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDelete
                ? `“${confirmDelete.title}” will be permanently removed.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-sm bg-crimson text-cream hover:bg-crimson/80"
              onClick={() => {
                if (confirmDelete?.id) void onDelete(confirmDelete.id)
                setConfirmDelete(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function NewsFormDialog({
  open,
  onOpenChange,
  title,
  initial,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: string
  initial?: NewsItem
  onSubmit: (item: NewsItem) => Promise<void>
}) {
  const [title_, setTitle] = React.useState('')
  const [excerpt, setExcerpt] = React.useState('')
  const [date, setDate] = React.useState('')
  const [category, setCategory] = React.useState(NEWS_CATEGORIES[0])
  const [author, setAuthor] = React.useState('')
  const [image, setImage] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? '')
      setExcerpt(initial?.excerpt ?? '')
      setDate(initial?.date ?? new Date().toISOString().slice(0, 10))
      setCategory(initial?.category ?? NEWS_CATEGORIES[0])
      setAuthor(initial?.author ?? '')
      setImage(initial?.image ?? '')
    }
  }, [open, initial])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title_.trim() || !date) {
      toast.error('Title and date are required.')
      return
    }
    setSaving(true)
    try {
      await onSubmit({
        id: initial?.id,
        title: title_.trim(),
        excerpt: excerpt.trim(),
        date,
        category,
        author: author.trim(),
        image: image.trim(),
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FormDialogShell open={open} onOpenChange={onOpenChange} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <FieldLabel>Title</FieldLabel>
          <Input
            value={title_}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="Article headline"
          />
        </div>
        <div className="space-y-2">
          <FieldLabel>Excerpt</FieldLabel>
          <Textarea
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="A short summary shown on the news card."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Date</FieldLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Category</FieldLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-sm border-gold/30 bg-cream">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NEWS_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <FieldLabel>Author</FieldLabel>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. Communications Office"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Or enter a text seed for the placeholder</FieldLabel>
            <Input
              value={isDataUrl(image) ? '' : image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. science-club, graduation"
              disabled={isDataUrl(image)}
            />
          </div>
        </div>
        <ImageUpload
          label="Article Photo"
          value={image}
          onChange={setImage}
          aspect="aspect-[16/10]"
          maxSize="size-32"
        />
        <FormActions saving={saving} onCancel={() => onOpenChange(false)} />
      </form>
    </FormDialogShell>
  )
}

// ─── Events Tab ───
function EventsTab({
  items,
  onAdd,
  onUpdate,
  onDelete,
}: {
  items: EventItem[]
  onAdd: (item: EventItem) => Promise<void>
  onUpdate: (item: EventItem) => Promise<void>
  onDelete: (id: number) => Promise<void>
}) {
  const [editing, setEditing] = React.useState<EventItem | null>(null)
  const [adding, setAdding] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState<EventItem | null>(null)

  return (
    <div>
      <CrudHeader
        title="Events"
        count={items.length}
        onAdd={() => setAdding(true)}
        addLabel="Add Event"
      />

      {items.length === 0 ? (
        <div className="rounded-sm border border-dashed border-gold/30 bg-cream/50 p-12 text-center text-muted-foreground">
          No events yet.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((ev) => (
            <ItemRow key={ev.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-sm bg-forest px-2 py-2 text-cream">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-light">
                      {ev.date
                        ? new Date(ev.date).toLocaleDateString('en-US', {
                            month: 'short',
                          })
                        : '—'}
                    </span>
                    <span className="font-serif text-2xl font-bold leading-none">
                      {ev.date ? new Date(ev.date).getDate() : '—'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-gold/15 text-gold-deep">
                        {ev.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {ev.time} · {ev.location}
                      </span>
                    </div>
                    <div className="mt-1 font-serif text-lg font-semibold text-forest">
                      {ev.title}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {ev.description}
                    </p>
                  </div>
                </div>
                <ItemActions
                  onEdit={() => setEditing(ev)}
                  onDelete={() => setConfirmDelete(ev)}
                />
              </div>
            </ItemRow>
          ))}
        </div>
      )}

      <EventFormDialog
        open={adding}
        onOpenChange={setAdding}
        title="Add Event"
        onSubmit={async (item) => {
          await onAdd(item)
          setAdding(false)
        }}
      />
      <EventFormDialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
        title="Edit Event"
        initial={editing ?? undefined}
        onSubmit={async (item) => {
          await onUpdate(item)
          setEditing(null)
        }}
      />

      <AlertDialog
        open={!!confirmDelete}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
      >
        <AlertDialogContent className="rounded-sm border-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl text-forest">
              Delete event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDelete
                ? `“${confirmDelete.title}” will be permanently removed.`
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-sm bg-crimson text-cream hover:bg-crimson/80"
              onClick={() => {
                if (confirmDelete?.id) void onDelete(confirmDelete.id)
                setConfirmDelete(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function EventFormDialog({
  open,
  onOpenChange,
  title,
  initial,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: string
  initial?: EventItem
  onSubmit: (item: EventItem) => Promise<void>
}) {
  const [title_, setTitle] = React.useState('')
  const [date, setDate] = React.useState('')
  const [time, setTime] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [category, setCategory] = React.useState(EVENT_CATEGORIES[0])
  const [description, setDescription] = React.useState('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? '')
      setDate(initial?.date ?? new Date().toISOString().slice(0, 10))
      setTime(initial?.time ?? '9:00 AM')
      setLocation(initial?.location ?? '')
      setCategory(initial?.category ?? EVENT_CATEGORIES[0])
      setDescription(initial?.description ?? '')
    }
  }, [open, initial])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title_.trim() || !date) {
      toast.error('Title and date are required.')
      return
    }
    setSaving(true)
    try {
      await onSubmit({
        id: initial?.id,
        title: title_.trim(),
        date,
        time: time.trim(),
        location: location.trim(),
        category,
        description: description.trim(),
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FormDialogShell open={open} onOpenChange={onOpenChange} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <FieldLabel>Event Title</FieldLabel>
          <Input
            value={title_}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="e.g. Annual Science Fair"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Date</FieldLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Time</FieldLabel>
            <Input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. 9:00 AM"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Location</FieldLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-sm border-gold/30 bg-cream"
              placeholder="e.g. Science Hall"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel>Category</FieldLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-sm border-gold/30 bg-cream">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EVENT_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Description</FieldLabel>
          <Textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-sm border-gold/30 bg-cream"
            placeholder="A short description of the event."
          />
        </div>
        <FormActions saving={saving} onCancel={() => onOpenChange(false)} />
      </form>
    </FormDialogShell>
  )
}

// ─── Shared Dialog Shell ───
function FormDialogShell({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  title: string
  children: React.ReactNode
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[90vh] overflow-y-auto rounded-sm border-gold/30 bg-paper p-0 sm:max-w-lg">
        <div className="flex items-center justify-between border-b border-gold/20 bg-forest px-5 py-4 text-cream">
          <AlertDialogTitle className="font-serif text-xl text-cream">
            {title}
          </AlertDialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm p-1 text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function FormActions({
  saving,
  onCancel,
}: {
  saving: boolean
  onCancel: () => void
}) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-gold/15 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="h-10 rounded-sm border-gold/40 text-xs font-medium uppercase tracking-wider text-forest hover:bg-muted"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={saving}
        className="h-10 gap-2 rounded-sm bg-forest text-xs font-semibold uppercase tracking-wider text-cream hover:bg-gold-deep"
      >
        {saving ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Saving…
          </>
        ) : (
          <>
            <Save className="size-4" />
            Save
          </>
        )}
      </Button>
    </div>
  )
}
