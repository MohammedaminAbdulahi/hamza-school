'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  SCHOOL, HERO, PRINCIPAL, MISSION, STATS,
  GALLERY, TEACHERS, LEADERSHIP, NEWS, EVENTS, FACILITIES,
} from '@/lib/content'

// ─── Types ───
type DbStat = { key: string; label: string; value: number; suffix: string }
type DbSchool = {
  name?: string
  tagline?: string
  subtitle?: string
  established?: number
  email?: string
  phone?: string
  altPhone?: string
  address?: string
  hours?: string
  social?: Record<string, string>
  hero?: Partial<typeof HERO>
  mission?: Partial<typeof MISSION>
  principal?: Partial<typeof PRINCIPAL> & { photo?: string }
  vicePrincipal?: { name?: string; title?: string; message?: string; photo?: string }
  stats?: DbStat[]
}
type DbEvent = { id?: number; title: string; date: string; time: string; location: string; category: string; description?: string }
type DbLeader = { id?: number; name: string; role: string; bio: string; initials: string; photo?: string }
type DbTeacher = { id?: number; name: string; subject: string; years: number; initials: string }
type DbGalleryItem = { id?: number; title: string; category: string; image: string }
type DbNewsItem = { id?: number; title: string; excerpt: string; date: string; category: string; author: string; image: string }
type DbFacility = { id?: number; name: string; description: string; icon: string; photo?: string }

export interface ContentData {
  school: {
    name: string
    tagline: string
    subtitle: string
    established: number
    email: string
    phone: string
    altPhone: string
    address: string
    hours: string
    social: typeof SCHOOL.social
    hero: typeof HERO
    mission: typeof MISSION
    principal: typeof PRINCIPAL & { photo?: string }
    vicePrincipal: { name: string; title: string; message: string; photo: string }
    stats: typeof STATS
  }
  gallery: DbGalleryItem[]
  teachers: DbTeacher[]
  leadership: DbLeader[]
  news: DbNewsItem[]
  events: DbEvent[]
  facilities: DbFacility[]
}

// ─── Context ───
const ContentContext = React.createContext<ContentData | null>(null)

export function useContent(): ContentData | null {
  return React.useContext(ContentContext)
}

// ─── Provider ───
export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<ContentData | null>(null)

  React.useEffect(() => {
    // Check if we already have cached data in window (survives page navigation)
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).__contentCache) {
      setData((window as unknown as Record<string, unknown>).__contentCache as ContentData)
      return
    }

    fetch('/api/content')
      .then((r) => r.json())
      .then((d: { school?: DbSchool; gallery?: DbGalleryItem[]; teachers?: DbTeacher[]; leadership?: DbLeader[]; news?: DbNewsItem[]; events?: DbEvent[]; facilities?: DbFacility[] }) => {
        const s = d.school || {}
        const merged: ContentData = {
          school: {
            name: s.name || SCHOOL.name,
            tagline: s.tagline || SCHOOL.tagline,
            subtitle: s.subtitle || SCHOOL.subtitle,
            established: s.established || SCHOOL.established,
            email: s.email || SCHOOL.email,
            phone: s.phone || SCHOOL.phone,
            altPhone: s.altPhone || SCHOOL.altPhone,
            address: s.address || SCHOOL.address,
            hours: s.hours || SCHOOL.hours,
            social: { ...SCHOOL.social, ...(s.social || {}) },
            hero: s.hero ? { ...HERO, ...s.hero } : HERO,
            mission: s.mission ? { ...MISSION, ...s.mission } : MISSION,
            principal: s.principal
              ? { ...PRINCIPAL, ...s.principal, photo: s.principal.photo ?? '' }
              : { ...PRINCIPAL, photo: '' },
            vicePrincipal: s.vicePrincipal
              ? {
                  name: s.vicePrincipal.name ?? '',
                  title: s.vicePrincipal.title ?? '',
                  message: s.vicePrincipal.message ?? '',
                  photo: s.vicePrincipal.photo ?? '',
                }
              : { name: '', title: '', message: '', photo: '' },
            stats:
              Array.isArray(s.stats) && s.stats.length === 4
                ? (s.stats.map((st, i) => ({
                    label: st.label ?? STATS[i]?.label ?? '',
                    value: Number(st.value) || 0,
                    suffix: st.suffix ?? STATS[i]?.suffix ?? '',
                  })) as typeof STATS)
                : STATS,
          },
          gallery: (d.gallery || GALLERY) as DbGalleryItem[],
          teachers: (d.teachers || TEACHERS) as DbTeacher[],
          leadership: (d.leadership || LEADERSHIP) as DbLeader[],
          news: (d.news || NEWS) as DbNewsItem[],
          events: (d.events || EVENTS) as DbEvent[],
          facilities: (d.facilities || FACILITIES) as DbFacility[],
        }

        // Cache in window so page navigation doesn't refetch
        if (typeof window !== 'undefined') {
          ;(window as unknown as Record<string, unknown>).__contentCache = merged
        }

        setData(merged)
      })
      .catch(() => {
        // DB failed — fall back to defaults
        const fallback: ContentData = {
          school: {
            ...SCHOOL,
            hero: HERO,
            mission: MISSION,
            principal: { ...PRINCIPAL, photo: '' },
            vicePrincipal: { name: '', title: '', message: '', photo: '' },
            stats: STATS,
          },
          gallery: GALLERY as DbGalleryItem[],
          teachers: TEACHERS as DbTeacher[],
          leadership: LEADERSHIP as DbLeader[],
          news: NEWS as DbNewsItem[],
          events: EVENTS as DbEvent[],
          facilities: FACILITIES as DbFacility[],
        }
        if (typeof window !== 'undefined') {
          ;(window as unknown as Record<string, unknown>).__contentCache = fallback
        }
        setData(fallback)
      })
  }, [])

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative size-12">
            <div className="absolute inset-0 rounded-full border-2 border-forest/15" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-forest"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
            />
          </div>
          <p className="font-serif text-sm italic tracking-wider text-gold-deep">
            Loading…
          </p>
        </div>
      </div>
    )
  }

  return <ContentContext.Provider value={data}>{children}</ContentContext.Provider>
}

// ─── Helper: get facility photo by name ───
export function useFacilityPhoto(name: string): string | undefined {
  const data = useContent()
  if (!data) return undefined
  const facility = data.facilities.find((f) => f.name === name)
  return facility?.photo
}
