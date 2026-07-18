// ============================================================
// Database connection + initialization
// ============================================================
// Uses Bun's built-in SQLite (bun:sqlite) — no install needed.
// The API is nearly identical to better-sqlite3.
//
// To switch to PostgreSQL when deploying:
//   1. npm install pg
//   2. Replace this file with:
//      import pg from 'pg'
//      const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
//      export const db = pool
//   3. Change db.prepare().all() → await pool.query()
//      and make route handlers async.
// ============================================================

import { Database } from 'bun:sqlite'

// Create/open the database file
export const db = new Database('hamza.db')

// ─── Create tables and seed data ───
export function initDb() {
  // SCHOOL INFO table
  db.run(`
    CREATE TABLE IF NOT EXISTS school_info (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      tagline TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      hours TEXT
    )
  `)

  // NEWS ARTICLES table
  db.run(`
    CREATE TABLE IF NOT EXISTS news_articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT,
      date TEXT NOT NULL,
      category TEXT,
      author TEXT,
      image TEXT
    )
  `)

  // EVENTS table
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      location TEXT,
      category TEXT,
      description TEXT
    )
  `)

  // ─── Seed data only if tables are empty ───
  const newsCount = db.query('SELECT COUNT(*) as count FROM news_articles').get().count
  if (newsCount === 0) {
    console.log('🌱 Seeding database with initial data...')

    // Seed school info
    db.run(`
      INSERT INTO school_info (id, name, tagline, phone, email, address, hours)
      VALUES (1, 'Hamza School', 'Inspiring Excellence, Building Tomorrow''s Leaders.',
              '+1 (555) 248-1990', 'info@hamzaschool.edu',
              '1200 Cedar Grove Avenue, Riverside, CA 92501',
              'Mon – Fri: 7:30 AM – 4:30 PM')
    `)

    // Seed news articles (same data from school.ts)
    const insertNews = db.prepare(
      `INSERT INTO news_articles (title, excerpt, date, category, author, image)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    const news = [
      ['Hamza School Launches New AI & Robotics Lab',
       'A generous alumni gift has funded a cutting-edge lab featuring collaborative robots and machine-learning workstations.',
       '2025-02-18', 'Campus', 'Communications Office', 'ai-robotics'],
      ['Class of 2024 Sets Record University Placements',
       'Every graduate earned admission to their first-choice university, with 70% receiving merit scholarships.',
       '2025-02-04', 'Achievement', 'College Counseling', 'graduation'],
      ['Students Lead Citywide Environmental Initiative',
       'Our Eco Club mobilized 600 volunteers to plant 2,000 trees across Riverside parks.',
       '2025-01-22', 'Community', 'Student Council', 'environment'],
      ['New Dual-Language Mandarin Program Announced',
       'Beginning Fall 2025, Primary students can enroll in an immersive English-Mandarin track.',
       '2025-01-10', 'Academics', 'Academic Office', 'language'],
      ['Hamza Musicians Selected for All-State Orchestra',
       'Nine of our students earned chairs in the prestigious state honors ensemble.',
       '2024-12-15', 'Arts', 'Arts Department', 'music'],
      ['Winter Term Honor Roll Celebrated',
       '382 students achieved distinction for academic excellence and exemplary conduct.',
       '2024-12-02', 'Academics', 'Academic Office', 'honor-roll'],
    ]
    for (const n of news) insertNews.run(...n)

    // Seed events
    const insertEvent = db.prepare(
      `INSERT INTO events (title, date, time, location, category, description)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    const events = [
      ['Annual Science & Innovation Fair', '2025-03-15', '9:00 AM', 'Hamza Science Hall', 'Academic',
       'Students showcase original research and engineering projects. Open to families and community judges.'],
      ['Spring Music & Arts Festival', '2025-04-10', '6:00 PM', 'Amphitheater', 'Arts',
       'An evening of orchestral, choral, and visual arts celebrating our students creativity.'],
      ['Inter-House Athletics Meet', '2025-05-02', '8:30 AM', 'Hamza Sports Complex', 'Sports',
       'A full day of track, field, and team sports across our four school houses.'],
      ['College & Careers Day', '2025-05-22', '10:00 AM', 'Main Auditorium', 'Career',
       'Representatives from 50+ universities and industries meet our high school students.'],
    ]
    for (const e of events) insertEvent.run(...e)

    console.log('✓ Database seeded successfully')
  }
}
