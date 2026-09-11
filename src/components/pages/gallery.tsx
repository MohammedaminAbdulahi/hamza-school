'use client'

import * as React from 'react'
import { Images, Maximize2, X, ArrowRight, Camera } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { SmartImage } from '@/components/site/smart-image'
import { useNav } from '@/lib/nav-store'
import { GALLERY, GALLERY_CATEGORIES } from '@/lib/content'
import { isDataUrl } from '@/lib/image-upload'
import { SkeletonImage } from '@/components/site/skeleton-loader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface GalleryItem {
  title: string
  category: string
  image: string
}

function getCategoryBadgeClass(category: string) {
  switch (category) {
    case 'Campus':
      return 'bg-emerald-100 text-emerald-700'
    case 'Events':
      return 'bg-amber-100 text-amber-700'
    case 'Sports':
      return 'bg-teal-100 text-teal-700'
    case 'Arts':
      return 'bg-rose-100 text-rose-700'
    case 'Culture':
      return 'bg-orange-100 text-orange-700'
    case 'Graduation':
      return 'bg-amber-200 text-amber-800'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export function GalleryPage() {
  // Loading state is tracked but no longer blocks rendering — content.ts
  // defaults render immediately and silently update when DB data arrives.
  const [loading, setLoading] = React.useState(true)

  const goPage = useNav((s) => s.goPage)
  const [activeCategory, setActiveCategory] = React.useState('All')
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(
    null
  )

  const [gallery, setGallery] = React.useState<GalleryItem[]>(GALLERY)

  React.useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d: { gallery?: GalleryItem[] }) => {
        if (Array.isArray(d.gallery) && d.gallery.length > 0) {
          setGallery(d.gallery)
        }
      })
      .catch(() => { /* keep defaults on error */ })
      .finally(() => setLoading(false))
  }, [])

  const filtered: GalleryItem[] = React.useMemo(() => {
    return activeCategory === 'All'
      ? gallery
      : gallery.filter((g) => g.category === activeCategory)
  }, [activeCategory, gallery])

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + filtered.length) % filtered.length
    )
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length))

  // Keyboard navigation in lightbox
  React.useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, filtered.length])

  const current =
    lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Gallery"
        title="Moments That Make Us Hamza"
        description="A vibrant look at life on campus — classrooms, championships, creativity, and community. Click any image to view it up close."
        seed="gallery-hero"
        icon="Images"
        breadcrumb="Gallery"
      />

      {/* ===== GALLERY ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                align="left"
                eyebrow="Photo Gallery"
                title="Explore Our Campus in Pictures"
                description="Filter by category to find the moments that matter most to you."
              />
              <Badge
                variant="secondary"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary"
              >
                <Images className="size-4" />
                {filtered.length} of {gallery.length} images
              </Badge>
            </div>
          </Reveal>

          {/* Filter buttons */}
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-2">
              {GALLERY_CATEGORIES.map((cat) => {
                const count =
                  cat === 'All'
                    ? gallery.length
                    : gallery.filter((g) => g.category === cat).length
                return (
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
                    <span
                      className={cn(
                        'ml-1.5 rounded-full px-1.5 text-xs',
                        activeCategory === cat
                          ? 'bg-primary-foreground/20'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {count}
                    </span>
                  </Button>
                )
              })}
            </div>
          </Reveal>

          {/* Clean grid — big images, easy to see */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => {
              const isPhoto = isDataUrl(item.image)
              return (
                <Reveal
                  key={`${item.title}-${i}`}
                  delay={(i % 3) * 0.07}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <button
                    onClick={() => openLightbox(i)}
                    className="block w-full text-left"
                    aria-label={`View ${item.title} larger`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {loading ? (
                        <SkeletonImage aspect="size-full" />
                      ) : isPhoto ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src="/hero-desk.jpeg"
                          alt={item.title}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <span
                        className={cn(
                          'absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md',
                          getCategoryBadgeClass(item.category)
                        )}
                      >
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <span className="text-sm font-semibold">{item.title}</span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Maximize2 className="size-4" />
                      </span>
                    </div>
                  </button>
                </Reveal>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center">
              <Camera className="size-12 text-muted-foreground/50" />
              <p className="text-base font-medium">
                No photos in this category yet.
              </p>
              <Button
                variant="outline"
                onClick={() => setActiveCategory('All')}
              >
                View all photos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400">
                  See It Live
                </Badge>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  Pictures don't do it justice
                </h2>
                <p className="mt-4 text-base text-primary-foreground/85 sm:text-lg">
                  Visit our campus to experience the energy, warmth, and
                  wonder of Hamza School in person.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => goPage('contact')}
                  className="h-12 bg-amber-400 px-7 text-base text-amber-950 shadow-xl hover:bg-amber-300"
                >
                  Book a Campus Tour
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => goPage('contact')}
                  className="h-12 border-white/40 bg-white/10 px-7 text-base text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) closeLightbox()
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
        >
          {current && (
            <div className="overflow-hidden rounded-2xl bg-card">
              <div className="relative">
                {isDataUrl(current.image) ? (
                   
                  <img
                    src={current.image}
                    alt={current.title}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <img
                    src="/hero-desk.jpeg"
                    alt={current.title}
                    className="aspect-[16/10] w-full object-cover"
                  />
                )}
                <button
                  onClick={closeLightbox}
                  aria-label="Close"
                  className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                >
                  <X className="size-5" />
                </button>
                <button
                  onClick={showPrev}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                >
                  <ArrowRight className="size-5 rotate-180" />
                </button>
                <button
                  onClick={showNext}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    {current.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    Photo {lightboxIndex! + 1} of {filtered.length}
                  </DialogDescription>
                </div>
                <Badge
                  className={cn(
                    'shrink-0',
                    getCategoryBadgeClass(current.category)
                  )}
                >
                  {current.category}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
