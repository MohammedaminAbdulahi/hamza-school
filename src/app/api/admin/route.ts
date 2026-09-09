import { NextRequest, NextResponse } from 'next/server'
import { pool, initDb, seedIfEmpty, envFromDotenv } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// ─── Auth ───
// Read ADMIN_PASSWORD from .env (system env can override .env, but in this
// dev sandbox the system env only sets a SQLite-style DATABASE_URL).
const ADMIN_PASSWORD =
  envFromDotenv.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD

function authOk(password: unknown): boolean {
  return (
    typeof password === 'string' &&
    password.length > 0 &&
    typeof ADMIN_PASSWORD === 'string' &&
    ADMIN_PASSWORD.length > 0 &&
    password === ADMIN_PASSWORD
  )
}

// ─── Helpers ───
function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status })
}

function str(v: unknown, max = 4096): string {
  if (v === null || v === undefined) return ''
  const s = String(v)
  return s.length > max ? s.slice(0, max) : s
}

function num(v: unknown): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
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
  ] = await Promise.all([
    pool.query('SELECT * FROM school_info WHERE id = 1 LIMIT 1'),
    pool.query(
      'SELECT id, title, category, image FROM gallery ORDER BY id ASC'
    ),
    pool.query(
      'SELECT id, name, subject, years, initials FROM teachers ORDER BY id ASC'
    ),
    pool.query(
      'SELECT id, name, role, bio, initials FROM leadership ORDER BY id ASC'
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
    ok: true,
    school,
    gallery: galleryRes.rows,
    teachers: teachersRes.rows,
    leadership: leadershipRes.rows,
    news: newsRes.rows,
    events: eventsRes.rows,
  }
}

// ─── School update ───
async function updateSchool(school: Record<string, unknown>) {
  const social = (school.social ?? {}) as Record<string, unknown>
  const hero = (school.hero ?? {}) as Record<string, unknown>
  const principal = (school.principal ?? {}) as Record<string, unknown>
  const mission = (school.mission ?? {}) as Record<string, unknown>

  await pool.query(
    `INSERT INTO school_info (
        id, name, tagline, subtitle, established, email, phone, alt_phone, address, hours,
        facebook, twitter, instagram, youtube, telegram,
        hero_eyebrow, hero_title, hero_description, hero_primary_button, hero_secondary_button,
        principal_name, principal_title, principal_message, principal_signature,
        mission_eyebrow, mission_title, mission_description, mission_quote, mission_quote_source,
        updated_at
      ) VALUES (1, $1,$2,$3,$4,$5,$6,$7,$8,$9, $10,$11,$12,$13,$14, $15,$16,$17,$18,$19, $20,$21,$22,$23, $24,$25,$26,$27,$28, NOW())
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
        mission_eyebrow = EXCLUDED.mission_eyebrow,
        mission_title = EXCLUDED.mission_title,
        mission_description = EXCLUDED.mission_description,
        mission_quote = EXCLUDED.mission_quote,
        mission_quote_source = EXCLUDED.mission_quote_source,
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
      str(mission.eyebrow, 100),
      str(mission.title, 300),
      str(mission.description, 4000),
      str(mission.quote, 500),
      str(mission.quoteSource, 200),
    ]
  )
}

// ─── POST handler ───
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return bad('Invalid JSON body')
  }

  if (!authOk(body.password)) {
    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  }

  const action = String(body.action ?? '')
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
          [str(body.title, 200), str(body.category, 100), str(body.image, 500)]
        )
        return NextResponse.json(await getAll())
      }
      case 'update_gallery': {
        await pool.query(
          'UPDATE gallery SET title=$1, category=$2, image=$3, updated_at=NOW() WHERE id=$4',
          [str(body.title, 200), str(body.category, 100), str(body.image, 500), num(body.id)]
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
          'INSERT INTO leadership (name, role, bio, initials) VALUES ($1, $2, $3, $4)',
          [str(body.name, 200), str(body.role, 200), str(body.bio, 1000), str(body.initials, 10)]
        )
        return NextResponse.json(await getAll())
      }
      case 'update_leadership': {
        await pool.query(
          'UPDATE leadership SET name=$1, role=$2, bio=$3, initials=$4, updated_at=NOW() WHERE id=$5',
          [str(body.name, 200), str(body.role, 200), str(body.bio, 1000), str(body.initials, 10), num(body.id)]
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
            str(body.image, 500),
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
            str(body.image, 500),
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

      default:
        return bad(`Unknown action: ${action}`)
    }
  } catch (e) {
    // AggregateError (e.g. pg pool connect failures) carries nested errors[]
    const agg = e as AggregateError
    let msg: string
    if (agg && Array.isArray(agg.errors) && agg.errors.length > 0) {
      msg = agg.errors
        .map((er) => (er instanceof Error ? er.message : String(er)))
        .join('; ')
    } else if (e instanceof Error) {
      msg = e.message
    } else if (typeof e === 'string') {
      msg = e
    } else {
      msg = 'Server error'
    }
    console.error('[/api/admin] error:', e, 'stack:', (e as Error)?.stack)
    return NextResponse.json({ error: msg || 'Server error' }, { status: 500 })
  }
}

// Allow GET to surface a 405 for clarity
export async function GET() {
  return NextResponse.json(
    { error: 'Use POST with a password + action.' },
    { status: 405 }
  )
}
