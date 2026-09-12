import { NextRequest, NextResponse } from 'next/server'
import { pool, initDb, seedIfEmpty, envFromDotenv } from '@/lib/db'
import { timingSafeEqual } from 'crypto'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// ─── Auth ───
const ADMIN_PASSWORD =
  envFromDotenv.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD

// Timing-safe password comparison to prevent timing attacks
function authOk(password: unknown): boolean {
  if (typeof password !== 'string' || password.length === 0) return false
  if (typeof ADMIN_PASSWORD !== 'string' || ADMIN_PASSWORD.length === 0) return false
  try {
    const a = Buffer.from(password)
    const b = Buffer.from(ADMIN_PASSWORD)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

// ─── Rate limiting (in-memory, per-IP) ───
// Blocks IP after 3 failed attempts for 15 minutes
const MAX_ATTEMPTS = 3
const BLOCK_MS = 15 * 60 * 1000
const attempts = new Map<string, { count: number; firstAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry) return false
  // Reset after block period
  if (now - entry.firstAt > BLOCK_MS) {
    attempts.delete(ip)
    return false
  }
  return entry.count >= MAX_ATTEMPTS
}

function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now - entry.firstAt > BLOCK_MS) {
    attempts.set(ip, { count: 1, firstAt: now })
  } else {
    entry.count++
  }
}

function clearAttempts(ip: string) {
  attempts.delete(ip)
}

function getClientIp(req: NextRequest): string {
  const xf = req.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0].trim()
  const xr = req.headers.get('x-real-ip')
  if (xr) return xr.trim()
  return 'unknown'
}

// ─── Body size limit (6MB max — enough for base64 photos) ───
const MAX_BODY = 6 * 1024 * 1024

// ─── Helpers ───
function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status })
}

function str(v: unknown, max = 4096): string {
  if (v === null || v === undefined) return ''
  const s = String(v)
  return s.length > max ? s.slice(0, max) : s
}

// Like str(), but allows much larger payloads so we can store base64 photos
// (a 800px-wide JPEG at 80% quality is typically 50–200KB → ~70–270KB base64).
const IMAGE_MAX = 5_000_000
function strImg(v: unknown): string {
  return str(v, IMAGE_MAX)
}

function num(v: unknown): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

// ─── Stats helpers ───
// The DB stores 4 stats as flat columns (stat_years, stat_years_suffix, …).
// The API shape exposes them as a `stats` array of 4 objects:
//   { key, label, value, suffix }
// Order is fixed: years, students, educators, passRate.
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

// Pull stats out of the body. Accepts either a `stats` array of 4 objects OR
// flat legacy fields (ignored if `stats` is present).
function statsFromBody(body: Record<string, unknown>): StatRow[] {
  const incoming = body.stats
  if (Array.isArray(incoming) && incoming.length === 4) {
    return STAT_KEYS.map((key, i) => {
      const item = (incoming[i] ?? {}) as Record<string, unknown>
      return {
        key,
        label: str(item.label, 200),
        value: num(item.value),
        suffix: str(item.suffix, 20),
      }
    })
  }
  // Fall back: leave zeros/empties (caller should always pass `stats`)
  return STAT_KEYS.map((key) => ({ key, label: '', value: 0, suffix: '' }))
}

// ─── Re-fetch everything for a fresh snapshot ───
async function getAll() {
  await initDb()

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
    ok: true,
    school,
    gallery: galleryRes.rows,
    teachers: teachersRes.rows,
    leadership: leadershipRes.rows,
    news: newsRes.rows,
    events: eventsRes.rows,
    facilities: facilitiesRes.rows,
  }
}

// ─── School update ───
async function updateSchool(school: Record<string, unknown>) {
  const social = (school.social ?? {}) as Record<string, unknown>
  const hero = (school.hero ?? {}) as Record<string, unknown>
  const principal = (school.principal ?? {}) as Record<string, unknown>
  const vicePrincipal = (school.vicePrincipal ?? {}) as Record<string, unknown>
  const mission = (school.mission ?? {}) as Record<string, unknown>
  const stats = statsFromBody(school)

  await pool.query(
    `INSERT INTO school_info (
        id, name, tagline, subtitle, established, email, phone, alt_phone, address, hours,
        facebook, twitter, instagram, youtube, telegram,
        hero_eyebrow, hero_title, hero_description, hero_primary_button, hero_secondary_button,
        principal_name, principal_title, principal_message, principal_signature, principal_photo,
        vice_principal_name, vice_principal_title, vice_principal_message, vice_principal_photo,
        mission_eyebrow, mission_title, mission_description, mission_quote, mission_quote_source,
        stat_years, stat_years_suffix, stat_years_label,
        stat_students, stat_students_suffix, stat_students_label,
        stat_educators, stat_educators_suffix, stat_educators_label,
        stat_pass_rate, stat_pass_rate_suffix, stat_pass_rate_label,
        updated_at
      ) VALUES (1, $1,$2,$3,$4,$5,$6,$7,$8,$9, $10,$11,$12,$13,$14, $15,$16,$17,$18,$19, $20,$21,$22,$23,$24, $25,$26,$27,$28, $29,$30,$31,$32,$33, $34,$35,$36, $37,$38,$39, $40,$41,$42, $43,$44,$45, NOW())
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        tagline = EXCLUDED.tagline,
        subtitle = EXCLUDED.subtitle,
        established = EXCLUDED.established,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        alt_phone = EXCLUDED.alt_phone,
        address = EXCLUDED.address,
        hours = EXCLUDED.hours,
        facebook = EXCLUDED.facebook,
        twitter = EXCLUDED.twitter,
        instagram = EXCLUDED.instagram,
        youtube = EXCLUDED.youtube,
        telegram = EXCLUDED.telegram,
        hero_eyebrow = EXCLUDED.hero_eyebrow,
        hero_title = EXCLUDED.hero_title,
        hero_description = EXCLUDED.hero_description,
        hero_primary_button = EXCLUDED.hero_primary_button,
        hero_secondary_button = EXCLUDED.hero_secondary_button,
        principal_name = EXCLUDED.principal_name,
        principal_title = EXCLUDED.principal_title,
        principal_message = EXCLUDED.principal_message,
        principal_signature = EXCLUDED.principal_signature,
        principal_photo = EXCLUDED.principal_photo,
        vice_principal_name = EXCLUDED.vice_principal_name,
        vice_principal_title = EXCLUDED.vice_principal_title,
        vice_principal_message = EXCLUDED.vice_principal_message,
        vice_principal_photo = EXCLUDED.vice_principal_photo,
        mission_eyebrow = EXCLUDED.mission_eyebrow,
        mission_title = EXCLUDED.mission_title,
        mission_description = EXCLUDED.mission_description,
        mission_quote = EXCLUDED.mission_quote,
        mission_quote_source = EXCLUDED.mission_quote_source,
        stat_years = EXCLUDED.stat_years,
        stat_years_suffix = EXCLUDED.stat_years_suffix,
        stat_years_label = EXCLUDED.stat_years_label,
        stat_students = EXCLUDED.stat_students,
        stat_students_suffix = EXCLUDED.stat_students_suffix,
        stat_students_label = EXCLUDED.stat_students_label,
        stat_educators = EXCLUDED.stat_educators,
        stat_educators_suffix = EXCLUDED.stat_educators_suffix,
        stat_educators_label = EXCLUDED.stat_educators_label,
        stat_pass_rate = EXCLUDED.stat_pass_rate,
        stat_pass_rate_suffix = EXCLUDED.stat_pass_rate_suffix,
        stat_pass_rate_label = EXCLUDED.stat_pass_rate_label,
        updated_at = NOW()
      `,
    [
      str(school.name, 200),
      str(school.tagline, 300),
      str(school.subtitle, 200),
      num(school.established),
      str(school.email, 200),
      str(school.phone, 100),
      str(school.altPhone, 100),
      str(school.address, 400),
      str(school.hours, 200),
      str(social.facebook, 500),
      str(social.twitter, 500),
      str(social.instagram, 500),
      str(social.youtube, 500),
      str(social.telegram, 500),
      str(hero.eyebrow, 200),
      str(hero.title, 300),
      str(hero.description, 2000),
      str(hero.primaryButton, 100),
      str(hero.secondaryButton, 100),
      str(principal.name, 200),
      str(principal.title, 200),
      str(principal.message, 4000),
      str(principal.signature, 200),
      strImg(principal.photo),
      str(vicePrincipal.name, 200),
      str(vicePrincipal.title, 200),
      str(vicePrincipal.message, 4000),
      strImg(vicePrincipal.photo),
      str(mission.eyebrow, 100),
      str(mission.title, 300),
      str(mission.description, 4000),
      str(mission.quote, 500),
      str(mission.quoteSource, 200),
      // Stats — order: years, students, educators, passRate
      stats[0].value, stats[0].suffix, stats[0].label,
      stats[1].value, stats[1].suffix, stats[1].label,
      stats[2].value, stats[2].suffix, stats[2].label,
      stats[3].value, stats[3].suffix, stats[3].label,
    ]
  )
}

// ─── POST handler ───
export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  // In-memory rate limit (backup for when Arcjet is not configured)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many failed attempts. Try again in 15 minutes.' },
      { status: 429 }
    )
  }

  // Body size check (before parsing)
  const contentLength = parseInt(req.headers.get('content-length') || '0', 10)
  if (contentLength > MAX_BODY) {
    return NextResponse.json(
      { error: 'Request body too large' },
      { status: 413 }
    )
  }

  let body: Record<string, unknown>
  try {
    const text = await req.text()
    if (text.length > MAX_BODY) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      )
    }
    body = JSON.parse(text) as Record<string, unknown>
  } catch {
    return bad('Invalid JSON body')
  }

  if (!authOk(body.password)) {
    recordFailedAttempt(ip)
    const entry = attempts.get(ip)
    const remaining = MAX_ATTEMPTS - (entry?.count || 0)
    if (remaining <= 0) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Try again in 15 minutes.' },
        { status: 429 }
      )
    }
    return NextResponse.json(
      { error: `Invalid password. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining before lockout.` },
      { status: 401 }
    )
  }

  // Successful auth — clear rate limit attempts
  clearAttempts(ip)

  const action = String(body.action ?? '')

  // Audit log (fire and forget — don't block the response)
  pool.query(
    'INSERT INTO admin_log (action, ip) VALUES ($1, $2)',
    [action, ip]
  ).catch(() => {})

  try {
    await initDb()
    await seedIfEmpty()

    switch (action) {
      case 'get': {
        return NextResponse.json(await getAll())
      }

      case 'update_school': {
        const school = (body.school ?? {}) as Record<string, unknown>
        await updateSchool(school)
        return NextResponse.json(await getAll())
      }

      // ── Gallery ──
      case 'add_gallery': {
        await pool.query(
          'INSERT INTO gallery (title, category, image) VALUES ($1, $2, $3)',
          [str(body.title, 200), str(body.category, 100), strImg(body.image)]
        )
        return NextResponse.json(await getAll())
      }
      case 'update_gallery': {
        await pool.query(
          'UPDATE gallery SET title=$1, category=$2, image=$3, updated_at=NOW() WHERE id=$4',
          [str(body.title, 200), str(body.category, 100), strImg(body.image), num(body.id)]
        )
        return NextResponse.json(await getAll())
      }
      case 'delete_gallery': {
        await pool.query('DELETE FROM gallery WHERE id=$1', [num(body.id)])
        return NextResponse.json(await getAll())
      }

      // ── Teachers ──
      case 'add_teacher': {
        await pool.query(
          'INSERT INTO teachers (name, subject, years, initials) VALUES ($1, $2, $3, $4)',
          [str(body.name, 200), str(body.subject, 200), num(body.years), str(body.initials, 10)]
        )
        return NextResponse.json(await getAll())
      }
      case 'update_teacher': {
        await pool.query(
          'UPDATE teachers SET name=$1, subject=$2, years=$3, initials=$4, updated_at=NOW() WHERE id=$5',
          [str(body.name, 200), str(body.subject, 200), num(body.years), str(body.initials, 10), num(body.id)]
        )
        return NextResponse.json(await getAll())
      }
      case 'delete_teacher': {
        await pool.query('DELETE FROM teachers WHERE id=$1', [num(body.id)])
        return NextResponse.json(await getAll())
      }

      // ── Leadership ──
      case 'add_leadership': {
        await pool.query(
          'INSERT INTO leadership (name, role, bio, initials, photo) VALUES ($1, $2, $3, $4, $5)',
          [str(body.name, 200), str(body.role, 200), str(body.bio, 1000), str(body.initials, 10), strImg(body.photo)]
        )
        return NextResponse.json(await getAll())
      }
      case 'update_leadership': {
        await pool.query(
          'UPDATE leadership SET name=$1, role=$2, bio=$3, initials=$4, photo=$5, updated_at=NOW() WHERE id=$6',
          [str(body.name, 200), str(body.role, 200), str(body.bio, 1000), str(body.initials, 10), strImg(body.photo), num(body.id)]
        )
        return NextResponse.json(await getAll())
      }
      case 'delete_leadership': {
        await pool.query('DELETE FROM leadership WHERE id=$1', [num(body.id)])
        return NextResponse.json(await getAll())
      }

      // ── News ──
      case 'add_news': {
        await pool.query(
          'INSERT INTO news (title, excerpt, date, category, author, image) VALUES ($1, $2, $3, $4, $5, $6)',
          [
            str(body.title, 300),
            str(body.excerpt, 2000),
            str(body.date, 20),
            str(body.category, 100),
            str(body.author, 200),
            strImg(body.image),
          ]
        )
        return NextResponse.json(await getAll())
      }
      case 'update_news': {
        await pool.query(
          'UPDATE news SET title=$1, excerpt=$2, date=$3, category=$4, author=$5, image=$6, updated_at=NOW() WHERE id=$7',
          [
            str(body.title, 300),
            str(body.excerpt, 2000),
            str(body.date, 20),
            str(body.category, 100),
            str(body.author, 200),
            strImg(body.image),
            num(body.id),
          ]
        )
        return NextResponse.json(await getAll())
      }
      case 'delete_news': {
        await pool.query('DELETE FROM news WHERE id=$1', [num(body.id)])
        return NextResponse.json(await getAll())
      }

      // ── Events ──
      case 'add_event': {
        await pool.query(
          'INSERT INTO events (title, date, time, location, category, description) VALUES ($1, $2, $3, $4, $5, $6)',
          [
            str(body.title, 300),
            str(body.date, 20),
            str(body.time, 50),
            str(body.location, 200),
            str(body.category, 100),
            str(body.description, 2000),
          ]
        )
        return NextResponse.json(await getAll())
      }
      case 'update_event': {
        await pool.query(
          'UPDATE events SET title=$1, date=$2, time=$3, location=$4, category=$5, description=$6, updated_at=NOW() WHERE id=$7',
          [
            str(body.title, 300),
            str(body.date, 20),
            str(body.time, 50),
            str(body.location, 200),
            str(body.category, 100),
            str(body.description, 2000),
            num(body.id),
          ]
        )
        return NextResponse.json(await getAll())
      }
      case 'delete_event': {
        await pool.query('DELETE FROM events WHERE id=$1', [num(body.id)])
        return NextResponse.json(await getAll())
      }

      // ─── Facilities ───
      case 'add_facility': {
        await pool.query(
          'INSERT INTO facilities (name, description, icon, photo) VALUES ($1, $2, $3, $4)',
          [str(body.name, 200), str(body.description, 1000), str(body.icon, 100), strImg(body.photo)]
        )
        return NextResponse.json(await getAll())
      }
      case 'update_facility': {
        await pool.query(
          'UPDATE facilities SET name=$1, description=$2, icon=$3, photo=$4, updated_at=NOW() WHERE id=$5',
          [str(body.name, 200), str(body.description, 1000), str(body.icon, 100), strImg(body.photo), num(body.id)]
        )
        return NextResponse.json(await getAll())
      }
      case 'delete_facility': {
        await pool.query('DELETE FROM facilities WHERE id=$1', [num(body.id)])
        return NextResponse.json(await getAll())
      }

      default:
        return bad(`Unknown action: ${action}`)
    }
  } catch (e) {
    // Log full error server-side only — never send internal details to client
    console.error('[/api/admin] error:', e)
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}

// Allow GET to surface a 405 for clarity
export async function GET() {
  return NextResponse.json(
    { error: 'Use POST with a password + action.' },
    { status: 405 }
  )
}
