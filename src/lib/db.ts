import { Pool } from 'pg'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// The dev environment exposes a SQLite-style DATABASE_URL in the system env
// (file:/home/z/my-project/db/custom.db), which overrides the value in .env.
// To make sure we connect to the real Neon Postgres database, we parse .env
// directly and prefer its DATABASE_URL when present.
function readEnvFile(): Record<string, string> {
  try {
    const text = readFileSync(resolve(process.cwd(), '.env'), 'utf8')
    const out: Record<string, string> = {}
    for (const line of text.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      // Strip wrapping quotes
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      out[key] = val
    }
    return out
  } catch {
    return {}
  }
}

const envFile = readEnvFile()

// Exported so API routes can read .env values that the system env overrides
// (e.g. the dev sandbox sets DATABASE_URL=file:...sqlite which masks .env).
export const envFromDotenv = envFile

// Prefer the .env value; fall back to process.env.
const currentUrl =
  envFile.DATABASE_URL ||
  (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')
    ? process.env.DATABASE_URL
    : undefined)

// Singleton pool — reused across hot reloads in dev.
// We only cache the pool on globalThis when a valid URL is available,
// so that if the env loads late (e.g. after first dev compile), a fresh
// pool gets created with the correct connection string.
const globalForDb = globalThis as unknown as {
  pool: Pool | undefined
  __dbUrl?: string | undefined
}

function createPool(): Pool {
  return new Pool({
    connectionString: currentUrl,
    ssl: currentUrl ? { rejectUnauthorized: false } : false,
    max: 3,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  })
}

// Reuse cached pool only if it was created with the same DATABASE_URL.
// Otherwise create a fresh one (and update the cache).
export const pool =
  globalForDb.pool && globalForDb.__dbUrl === currentUrl && currentUrl
    ? globalForDb.pool
    : createPool()

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool
  globalForDb.__dbUrl = currentUrl
}

// ─── Initialize tables ───
export async function initDb() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS school_info (
        id INTEGER PRIMARY KEY DEFAULT 1,
        name TEXT NOT NULL,
        tagline TEXT,
        subtitle TEXT,
        established INTEGER,
        email TEXT,
        phone TEXT,
        alt_phone TEXT,
        address TEXT,
        hours TEXT,
        facebook TEXT,
        twitter TEXT,
        instagram TEXT,
        youtube TEXT,
        telegram TEXT,
        hero_eyebrow TEXT,
        hero_title TEXT,
        hero_description TEXT,
        hero_primary_button TEXT,
        hero_secondary_button TEXT,
        principal_name TEXT,
        principal_title TEXT,
        principal_message TEXT,
        principal_signature TEXT,
        mission_eyebrow TEXT,
        mission_title TEXT,
        mission_description TEXT,
        mission_quote TEXT,
        mission_quote_source TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    // Backfill any missing columns for older DBs that pre-date this schema.
    // ALTER TABLE ... ADD COLUMN IF NOT EXISTS is supported in Postgres 9.6+
    // (Neon supports it).
    const schoolCols: Array<[string, string]> = [
      ['tagline', 'TEXT'],
      ['subtitle', 'TEXT'],
      ['established', 'INTEGER'],
      ['email', 'TEXT'],
      ['phone', 'TEXT'],
      ['alt_phone', 'TEXT'],
      ['address', 'TEXT'],
      ['hours', 'TEXT'],
      ['facebook', 'TEXT'],
      ['twitter', 'TEXT'],
      ['instagram', 'TEXT'],
      ['youtube', 'TEXT'],
      ['telegram', 'TEXT'],
      ['hero_eyebrow', 'TEXT'],
      ['hero_title', 'TEXT'],
      ['hero_description', 'TEXT'],
      ['hero_primary_button', 'TEXT'],
      ['hero_secondary_button', 'TEXT'],
      ['principal_name', 'TEXT'],
      ['principal_title', 'TEXT'],
      ['principal_message', 'TEXT'],
      ['principal_signature', 'TEXT'],
      ['mission_eyebrow', 'TEXT'],
      ['mission_title', 'TEXT'],
      ['mission_description', 'TEXT'],
      ['mission_quote', 'TEXT'],
      ['mission_quote_source', 'TEXT'],
      // Photo + Vice Director (added in Task 10)
      ['principal_photo', 'TEXT'],
      ['vice_principal_name', 'TEXT'],
      ['vice_principal_title', 'TEXT'],
      ['vice_principal_message', 'TEXT'],
      ['vice_principal_photo', 'TEXT'],
      ['updated_at', 'TIMESTAMP DEFAULT NOW()'],
    ]
    for (const [col, type] of schoolCols) {
      await client.query(
        `ALTER TABLE school_info ADD COLUMN IF NOT EXISTS ${col} ${type}`
      )
    }
    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        sort_order INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    await client.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        subject TEXT NOT NULL,
        years INTEGER DEFAULT 0,
        initials TEXT,
        sort_order INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    await client.query(`
      CREATE TABLE IF NOT EXISTS leadership (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        bio TEXT,
        initials TEXT,
        sort_order INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    // Backfill the photo column for older DBs that pre-date Task 10.
    await client.query(
      `ALTER TABLE leadership ADD COLUMN IF NOT EXISTS photo TEXT`
    )
    await client.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT,
        date TEXT NOT NULL,
        category TEXT,
        author TEXT,
        image TEXT,
        sort_order INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT,
        location TEXT,
        category TEXT,
        description TEXT,
        sort_order INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
  } finally {
    client.release()
  }
}

// ─── Seed from content.ts if tables are empty ───
// Each table is seeded independently so a partial DB state (e.g. an old
// row in school_info but empty gallery) still gets the rest of the data.
export async function seedIfEmpty() {
  const {
    SCHOOL, HERO, PRINCIPAL, MISSION,
    GALLERY, TEACHERS, LEADERSHIP, NEWS, EVENTS,
  } = await import('@/lib/content')

  const client = await pool.connect()
  try {
    // school_info: seed if missing or if the existing row looks partial
    // (no hero/principal/mission data).
    const schoolRow = await client.query(
      'SELECT id, hero_eyebrow, principal_name, mission_title FROM school_info WHERE id = 1'
    )
    if (schoolRow.rows.length === 0) {
      await client.query(
        `INSERT INTO school_info (id, name, tagline, subtitle, established, email, phone, alt_phone, address, hours,
          facebook, twitter, instagram, youtube, telegram,
          hero_eyebrow, hero_title, hero_description, hero_primary_button, hero_secondary_button,
          principal_name, principal_title, principal_message, principal_signature,
          mission_eyebrow, mission_title, mission_description, mission_quote, mission_quote_source)
         VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)`,
        [
          SCHOOL.name, SCHOOL.tagline, SCHOOL.subtitle, SCHOOL.established,
          SCHOOL.email, SCHOOL.phone, SCHOOL.altPhone, SCHOOL.address, SCHOOL.hours,
          SCHOOL.social.facebook, SCHOOL.social.twitter, SCHOOL.social.instagram, SCHOOL.social.youtube, SCHOOL.social.telegram,
          HERO.eyebrow, HERO.title, HERO.description, HERO.primaryButton, HERO.secondaryButton,
          PRINCIPAL.name, PRINCIPAL.title, PRINCIPAL.message, PRINCIPAL.signature,
          MISSION.eyebrow, MISSION.title, MISSION.description, MISSION.quote, MISSION.quoteSource,
        ]
      )
    } else {
      const r = schoolRow.rows[0] as Record<string, unknown>
      const looksPartial =
        !r.hero_eyebrow && !r.principal_name && !r.mission_title
      if (looksPartial) {
        // Update the existing partial row with the full default content.
        await client.query(
          `UPDATE school_info SET
            name = $1, tagline = $2, subtitle = $3, established = $4,
            email = $5, phone = $6, alt_phone = $7, address = $8, hours = $9,
            facebook = $10, twitter = $11, instagram = $12, youtube = $13, telegram = $14,
            hero_eyebrow = $15, hero_title = $16, hero_description = $17, hero_primary_button = $18, hero_secondary_button = $19,
            principal_name = $20, principal_title = $21, principal_message = $22, principal_signature = $23,
            mission_eyebrow = $24, mission_title = $25, mission_description = $26, mission_quote = $27, mission_quote_source = $28,
            updated_at = NOW()
           WHERE id = 1`,
          [
            SCHOOL.name, SCHOOL.tagline, SCHOOL.subtitle, SCHOOL.established,
            SCHOOL.email, SCHOOL.phone, SCHOOL.altPhone, SCHOOL.address, SCHOOL.hours,
            SCHOOL.social.facebook, SCHOOL.social.twitter, SCHOOL.social.instagram, SCHOOL.social.youtube, SCHOOL.social.telegram,
            HERO.eyebrow, HERO.title, HERO.description, HERO.primaryButton, HERO.secondaryButton,
            PRINCIPAL.name, PRINCIPAL.title, PRINCIPAL.message, PRINCIPAL.signature,
            MISSION.eyebrow, MISSION.title, MISSION.description, MISSION.quote, MISSION.quoteSource,
          ]
        )
      }
    }

    // Seed remaining tables only if empty.
    await seedTableIfEmpty(
      client,
      'gallery',
      () => GALLERY.map((g) => [g.title, g.category, g.image]),
      'INSERT INTO gallery (title, category, image) VALUES ($1, $2, $3)'
    )
    await seedTableIfEmpty(
      client,
      'teachers',
      () => TEACHERS.map((t) => [t.name, t.subject, t.years, t.initials]),
      'INSERT INTO teachers (name, subject, years, initials) VALUES ($1, $2, $3, $4)'
    )
    await seedTableIfEmpty(
      client,
      'leadership',
      () => LEADERSHIP.map((l) => [l.name, l.role, l.bio, l.initials]),
      'INSERT INTO leadership (name, role, bio, initials) VALUES ($1, $2, $3, $4)'
    )
    await seedTableIfEmpty(
      client,
      'news',
      () => NEWS.map((n) => [n.title, n.excerpt, n.date, n.category, n.author, n.image]),
      'INSERT INTO news (title, excerpt, date, category, author, image) VALUES ($1, $2, $3, $4, $5, $6)'
    )
    await seedTableIfEmpty(
      client,
      'events',
      () => EVENTS.map((e) => [e.title, e.date, e.time, e.location, e.category, e.description]),
      'INSERT INTO events (title, date, time, location, category, description) VALUES ($1, $2, $3, $4, $5, $6)'
    )
    return true
  } finally {
    client.release()
  }
}

async function seedTableIfEmpty(
  client: { query: (text: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }> },
  table: string,
  getRows: () => unknown[][],
  insertSql: string
) {
  const { rows } = await client.query(`SELECT COUNT(*) FROM ${table}`)
  if (Number(rows[0].count) > 0) return
  for (const params of getRows()) {
    await client.query(insertSql, params)
  }
}

// ─── Check if DB is available ───
export async function isDbReady(): Promise<boolean> {
  try {
    const client = await pool.connect()
    client.release()
    return true
  } catch {
    return false
  }
}
