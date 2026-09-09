import { NextResponse } from 'next/server'
import { pool, initDb, seedIfEmpty } from '@/lib/db'
import {
  SCHOOL,
  HERO,
  PRINCIPAL,
  MISSION,
  GALLERY,
  TEACHERS,
  LEADERSHIP,
  NEWS,
  EVENTS,
} from '@/lib/content'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Shape returned to the public site + admin
function defaults() {
  return {
    school: {
      ...SCHOOL,
      hero: {
        eyebrow: HERO.eyebrow,
        title: HERO.title,
        description: HERO.description,
        primaryButton: HERO.primaryButton,
        secondaryButton: HERO.secondaryButton,
      },
      principal: { ...PRINCIPAL },
      mission: { ...MISSION },
    },
    gallery: GALLERY.map((g, id) => ({ id: id + 1, ...g })),
    teachers: TEACHERS.map((t, id) => ({ id: id + 1, ...t })),
    leadership: LEADERSHIP.map((l, id) => ({ id: id + 1, ...l })),
    news: NEWS.map((n, id) => ({ id: id + 1, ...n })),
    events: EVENTS.map((e, id) => ({ id: id + 1, ...e })),
  }
}

async function fetchAll() {
  await initDb()
  await seedIfEmpty()

  const [
    schoolRes,
    galleryRes,
    teachersRes,
    leadershipRes,
    newsRes,
    eventsRes,
  ] = await Promise.all([
    pool.query('SELECT * FROM school_info WHERE id = 1 LIMIT 1'),
    pool.query(
      'SELECT id, title, category, image FROM gallery ORDER BY id ASC'
    ),
    pool.query(
      'SELECT id, name, subject, years, initials FROM teachers ORDER BY id ASC'
    ),
    pool.query(
      'SELECT id, name, role, bio, initials, photo FROM leadership ORDER BY id ASC'
    ),
    pool.query(
      'SELECT id, title, excerpt, date, category, author, image FROM news ORDER BY date DESC, id ASC'
    ),
    pool.query(
      'SELECT id, title, date, time, location, category, description FROM events ORDER BY date ASC, id ASC'
    ),
  ])

  const s = schoolRes.rows[0] as Record<string, unknown> | undefined
  const school = s
    ? {
        name: s.name,
        tagline: s.tagline,
        subtitle: s.subtitle,
        established: s.established,
        email: s.email,
        phone: s.phone,
        altPhone: s.alt_phone,
        address: s.address,
        hours: s.hours,
        social: {
          facebook: s.facebook,
          twitter: s.twitter,
          instagram: s.instagram,
          youtube: s.youtube,
          telegram: s.telegram,
        },
        hero: {
          eyebrow: s.hero_eyebrow,
          title: s.hero_title,
          description: s.hero_description,
          primaryButton: s.hero_primary_button,
          secondaryButton: s.hero_secondary_button,
        },
        principal: {
          name: s.principal_name,
          title: s.principal_title,
          message: s.principal_message,
          signature: s.principal_signature,
          photo: s.principal_photo ?? '',
        },
        vicePrincipal: {
          name: s.vice_principal_name ?? '',
          title: s.vice_principal_title ?? '',
          message: s.vice_principal_message ?? '',
          photo: s.vice_principal_photo ?? '',
        },
        mission: {
          eyebrow: s.mission_eyebrow,
          title: s.mission_title,
          description: s.mission_description,
          quote: s.mission_quote,
          quoteSource: s.mission_quote_source,
        },
      }
    : null

  return {
    school,
    gallery: galleryRes.rows,
    teachers: teachersRes.rows,
    leadership: leadershipRes.rows,
    news: newsRes.rows,
    events: eventsRes.rows,
  }
}

export async function GET() {
  try {
    const data = await fetchAll()
    if (!data.school) {
      // Nothing in DB yet — fall back to defaults so the site never breaks.
      return NextResponse.json(defaults())
    }
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  } catch {
    // DB unavailable — return defaults so the public site never breaks.
    return NextResponse.json(defaults(), {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  }
}
