'use client'

import * as React from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Pin,
  Bell,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { SmartImage } from '@/components/site/smart-image'
import { DynamicIcon } from '@/components/site/dynamic-icon'
import { useNav } from '@/lib/nav-store'
import { NEWS, EVENTS, NEWS_CATEGORIES, ANNOUNCEMENTS } from '@/lib/content'
import { isDataUrl } from '@/lib/image-upload'
import { SkeletonImage } from '@/components/site/skeleton-loader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 3

type DbNews = typeof NEWS[number]
type DbEvent = typeof EVENTS[number]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getCategoryBadgeClass(category: string) {
  switch (category) {
    case 'Campus':
      return 'bg-emerald-100 text-emerald-700'
    case 'Achievement':
      return 'bg-amber-100 text-amber-700'
    case 'Community':
      return 'bg-teal-100 text-teal-700'
    case 'Academics':
      return 'bg-rose-100 text-rose-700'
    case 'Arts':
      return 'bg-orange-100 text-orange-700'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

// Build a March 2025 calendar grid
const CALENDAR_YEAR = 2025
const CALENDAR_MONTH = 2 // March (0-indexed)
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function buildMarchCalendar() {
  const firstDay = new Date(CALENDAR_YEAR, CALENDAR_MONTH, 1).getDay()
  const daysInMonth = new Date(CALENDAR_YEAR, CALENDAR_MONTH + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function NewsPage() {
  // Loading state is tracked but no longer blocks rendering — content.ts
  // defaults render immediately and silently update when DB data arrives.
  const [loading, setLoading] = React.useState(true)

  const goPage = useNav((s) => s.goPage)
  const [activeCategory, setActiveCategory] = React.useState('All')
  const [page, setPage] = React.useState(1)

  const [news, setNews] = React.useState(NEWS)
  const [events, setEvents] = React.useState(EVENTS)

  React.useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then(
        (d: { news?: DbNews[]; events?: DbEvent[] }) => {
          if (Array.isArray(d.news) && d.news.length > 0) {
            setNews(d.news as unknown as typeof NEWS)
          }
          if (Array.isArray(d.events) && d.events.length > 0) {
            setEvents(d.events as unknown as typeof EVENTS)
          }
        }
      )
      .catch(() => { /* keep defaults on error */ })
      .finally(() => setLoading(false))
  }, [])

  // News comes from /api/content (with content.ts fallback)
  const filtered = React.useMemo(() => {
    const list =
      activeCategory === 'All'
        ? news
        : news.filter((n) => n.category === activeCategory)
    return list
  }, [activeCategory, news])

  React.useEffect(() => {
    setPage(1)
  }, [activeCategory])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  const calendarCells = React.useMemo(() => buildMarchCalendar(), [])

  function eventsOnDay(day: number | null) {
    if (day === null) return []
    const iso = `${CALENDAR_YEAR}-${String(CALENDAR_MONTH + 1).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`
    return events.filter((e) => e.date === iso)
  }

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="News & Events"
        title="News & Events at Hamza"
        description="Stories from our classrooms, achievements worth celebrating, and a calendar full of moments that bring our community together."
        seed="news-hero"
        icon="Newspaper"
        breadcrumb="News & Events"
      />

      {/* ===== NEWS ARTICLES ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Latest Stories"
              title="School News"
              description="Discover what's happening on campus — from student wins to program launches and community initiatives."
            />
          </Reveal>

          {/* Category filter */}
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-2">
              {NEWS_CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={
                    activeCategory === cat ? 'default' : 'outline'
                  }
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'h-9 rounded-full px-4',
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                      : 'hover:border-primary hover:text-primary'
                  )}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="ml-1.5 rounded-full bg-primary-foreground/20 px-1.5 text-xs">
                      {filtered.length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </Reveal>

          {/* News grid */}
          {pageItems.length === 0 ? (
            <div className="mt-10 flex min-h-[300px] items-center justify-center text-muted-foreground">
              No articles found in this category.
            </div>
          ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((article, i) => {
              const isPhoto = isDataUrl(article.image)
              return (
              <Reveal key={article.title} delay={i * 0.08}>
                <Card className="group flex h-full flex-col overflow-hidden border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <div className="relative">
                    {loading ? (
                      <SkeletonImage aspect="aspect-[16/10] w-full" />
                    ) : isPhoto ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    ) : (
                      <img
                        src="/hero-desk.jpeg"
                        alt={article.title}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    )}
                    <span
                      className={cn(
                        'absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm',
                        getCategoryBadgeClass(article.category)
                      )}
                    >
                      <Tag className="size-3" />
                      {article.category}
                    </span>
                  </div>
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      {formatDate(article.date)}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      <span className="text-xs font-medium text-muted-foreground">
                        By {article.author}
                      </span>
                      <div className="flex items-center gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-muted-foreground hover:text-primary"
                              aria-label="Share article"
                            >
                              <Share2 className="size-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(
                                  `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                    window.location.href
                                  )}`,
                                  '_blank',
                                  'noopener,noreferrer'
                                )
                              }
                            >
                              <Facebook className="size-4" />
                              Share on Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(
                                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                    article.title
                                  )}&url=${encodeURIComponent(window.location.href)}`,
                                  '_blank',
                                  'noopener,noreferrer'
                                )
                              }
                            >
                              <Twitter className="size-4" />
                              Share on Twitter
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(
                                  `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                    window.location.href
                                  )}`,
                                  '_blank',
                                  'noopener,noreferrer'
                                )
                              }
                            >
                              <Linkedin className="size-4" />
                              Share on LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                if (navigator.share) {
                                  navigator.share({ title: article.title, text: article.excerpt })
                                } else if (navigator.clipboard) {
                                  navigator.clipboard.writeText(window.location.href)
                                  import('sonner').then(({ toast }) =>
                                    toast.success('Link copied to clipboard!')
                                  )
                                }
                              }}
                            >
                              <Link2 className="size-4" />
                              Copy link
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 px-2 text-primary hover:bg-primary/10"
                        >
                          Read
                          <ArrowRight className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
              )
            })}
          </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Reveal delay={0.1}>
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setPage((p) => Math.max(1, p - 1))
                      }
                      className={cn(
                        page === 1 &&
                          'pointer-events-none opacity-40'
                      )}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <PaginationItem key={idx}>
                      <PaginationLink
                        isActive={page === idx + 1}
                        onClick={() => setPage(idx + 1)}
                      >
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={cn(
                        page === totalPages &&
                          'pointer-events-none opacity-40'
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </Reveal>
          )}
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Mark Your Calendar"
              title="Upcoming Events"
              description="Join us at our flagship gatherings throughout the semester — from science fairs to athletic meets, there's something for every family."
            />
          </Reveal>
          <div className="mt-14 space-y-4">
            {events.map((event, i) => {
              const d = new Date(event.date)
              const month = d.toLocaleDateString('en-US', {
                month: 'short',
              })
              const day = d.getDate()
              return (
                <Reveal key={event.title} delay={i * 0.06}>
                  <Card className="group border-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                      <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-teal-600 px-6 py-4 text-primary-foreground shadow-lg shadow-primary/20 sm:w-28">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                          {month}
                        </span>
                        <span className="text-3xl font-bold leading-none">
                          {day}
                        </span>
                        <span className="mt-1 text-xs text-primary-foreground/80">
                          {d.toLocaleDateString('en-US', {
                            weekday: 'short',
                          })}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                              getCategoryBadgeClass(event.category)
                            )}
                          >
                            {event.category}
                          </span>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-primary sm:text-xl">
                          {event.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="size-3.5 text-primary" />
                            {event.time}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-primary" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={() => goPage('contact')}
                      >
                        Add to Calendar
                        <ArrowRight className="size-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SCHOOL CALENDAR ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="At a Glance"
              title="School Calendar — March 2025"
              description="A snapshot of the month ahead. Days with scheduled events are highlighted."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-12 border-primary/10">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-primary" />
                    <span className="text-lg font-semibold">
                      March 2025
                    </span>
                  </div>
                  <Badge className="bg-primary/10 text-primary">
                    {events.filter((e) => e.date.startsWith('2025-03'))
                      .length}{' '}
                    events
                  </Badge>
                </div>
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {WEEKDAYS.map((w) => (
                    <div
                      key={w}
                      className="py-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {w}
                    </div>
                  ))}
                  {calendarCells.map((day, idx) => {
                    const evs = eventsOnDay(day)
                    const hasEvents = evs.length > 0
                    return (
                      <div
                        key={idx}
                        className={cn(
                          'relative flex aspect-square flex-col items-center justify-center rounded-xl border text-sm transition-colors sm:text-base',
                          day === null
                            ? 'border-transparent bg-transparent'
                            : hasEvents
                              ? 'border-primary bg-primary/10 font-semibold text-primary'
                              : 'border-border/60 bg-card text-foreground hover:bg-muted/50'
                        )}
                      >
                        {day !== null && (
                          <>
                            <span>{day}</span>
                            {hasEvents && (
                              <span className="absolute bottom-1.5 flex gap-0.5">
                                {evs.slice(0, 3).map((e) => (
                                  <span
                                    key={e.title}
                                    className="size-1.5 rounded-full bg-primary"
                                    title={e.title}
                                  />
                                ))}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
                {/* Event legend */}
                <div className="mt-6 space-y-2 border-t pt-5">
                  {events.filter((e) => e.date.startsWith('2025-03')).map(
                    (e) => (
                      <div
                        key={e.title}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {new Date(e.date).getDate()}
                        </span>
                        <span className="font-medium">{e.title}</span>
                        <Badge
                          variant="secondary"
                          className="ml-auto text-xs"
                        >
                          {e.category}
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ===== ANNOUNCEMENTS ===== */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Notice Board"
              title="Announcements"
              description="Important updates for parents, students, and staff. Pin this page — notices refresh weekly."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {ANNOUNCEMENTS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <Card
                  className={cn(
                    'group h-full border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                    a.tone === 'amber' &&
                      'border-l-amber-400 hover:shadow-amber-500/10',
                    a.tone === 'emerald' &&
                      'border-l-primary hover:shadow-primary/10',
                    a.tone === 'teal' &&
                      'border-l-teal-500 hover:shadow-teal-500/10',
                    a.tone === 'rose' &&
                      'border-l-rose-400 hover:shadow-rose-500/10',
                    a.tone === 'navy' &&
                      'border-l-foreground hover:shadow-foreground/10'
                  )}
                >
                  <CardContent className="flex h-full gap-4 p-6">
                    <div
                      className={cn(
                        'flex size-11 shrink-0 items-center justify-center rounded-xl',
                        a.tone === 'amber' && 'bg-amber-100 text-amber-700',
                        a.tone === 'emerald' &&
                          'bg-primary/10 text-primary',
                        a.tone === 'teal' &&
                          'bg-teal-100 text-teal-700',
                        a.tone === 'rose' &&
                          'bg-rose-100 text-rose-700',
                        a.tone === 'navy' &&
                          'bg-foreground/10 text-foreground'
                      )}
                    >
                      <DynamicIcon name={a.icon} className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Pin className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {a.date}
                        </span>
                      </div>
                      <h3 className="mt-1 text-base font-semibold">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {a.body}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-6 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Bell className="size-5" />
                </div>
                <div>
                  <p className="font-semibold">Never miss an update</p>
                  <p className="text-sm text-muted-foreground">
                    Subscribe to our weekly newsletter for the latest
                    announcements.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => goPage('contact')}
                className="bg-primary"
              >
                Stay Informed
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
