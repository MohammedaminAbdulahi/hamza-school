import { NextResponse } from 'next/server'
import { pool, initDb, seedIfEmpty } from '@/lib/db'
import {
  SCHOOL,
  HERO,
  PRINCIPAL,
  MISSION,
  STATS,
  GALLERY,
  TEACHERS,
  LEADERSHIP,
  NEWS,
  EVENTS,
  FACILITIES,
} from '@/lib/content'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Stats shape returned to the public site + admin
type StatRow = { key: string; label: string; value: number; suffix: string }
const STAT_KEYS = ['years', 'students', 'educators', 'passRate'] as const
const STAT_COLS: Record<(typeof STAT_KEYS)[number], { value: string; suffix: string; label: string }> = {
  years: { value: 'stat_years', suffix: 'stat_years_suffix', label: 'stat_years_label' },
  students: { value: 'stat_students', suffix: 'stat_students_suffix', label: 'stat_students_label' },
  educators: { value: 'stat_educators', suffix: 'stat_educators_suffix', label: 'stat_educators_label' },
  passRate: { value: 'stat_pass_rate', suffix: 'stat_pass_rate_suffix', label: 'stat_pass_rate_label' },
}

function statsFromRow(s: Record<string, unknown>): StatRow[] {
  return STAT_KEYS.map((key) => {
    const cols = STAT_COLS[key]
    const rawValue = s[cols.value]
    return {
      key,
      label: typeof s[cols.label] === 'string' ? (s[cols.label] as string) : '',
      value: rawValue === null || rawValue === undefined ? 0 : Number(rawValue) || 0,
      suffix: typeof s[cols.suffix] === 'string' ? (s[cols.suffix] as string) : '',
    }
  })
}

// Default stats from content.ts — used when the DB is unreachable or
// the stats columns are empty.
function defaultStats(): StatRow[] {
  return [
    { key: 'years', ...STATS[0] },
    { key: 'students', ...STATS[1] },
    { key: 'educators', ...STATS[2] },
    { key: 'passRate', ...STATS[3] },
  ]
}

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
      stats: defaultStats(),
    },
    gallery: GALLERY.map((g, id) => ({ id: id + 1, ...g })),
    teachers: TEACHERS.map((t, id) => ({ id: id + 1, ...t })),
    leadership: LEADERSHIP.map((l, id) => ({ id: id + 1, ...l })),
    news: NEWS.map((n, id) => ({ id: id + 1, ...n })),
    events: EVENTS.map((e, id) => ({ id: id + 1, ...e })),
    facilities: FACILITIES.map((f, id) => ({ id: id + 1, ...f, photo: '' })),
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
    facilitiesRes,
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
    pool.query(
      'SELECT id, name, description, icon, photo FROM facilities ORDER BY id ASC'
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
        stats: statsFromRow(s),
      }
    : null

  return {
    school,
    gallery: galleryRes.rows,
    teachers: teachersRes.rows,
    leadership: leadershipRes.rows,
    news: newsRes.rows,
    events: eventsRes.rows,
    facilities: facilitiesRes.rows,
  }
}

export async function GET() {
  try {
    const data = await fetchAll()
    if (!data.school) {
      // Nothing in DB yet — fall back to defaults so the site never breaks.
      return NextResponse.json(defaults())
    }
    // If the stats columns came back empty (NULL or all zeros with no label),
    // merge in the content.ts defaults so the homepage always shows real numbers.
    if (data.school.stats && !data.school.stats.some((s) => s.label || s.value)) {
      data.school.stats = defaultStats()
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
