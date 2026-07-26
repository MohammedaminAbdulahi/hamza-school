// ============================================================
// Hamza School API — Express backend
// ============================================================
// This is a small Express server that serves real database data
// to the Hamza School frontend.
//
// DATABASE: Uses SQLite (better-sqlite3) for local development.
// To switch to PostgreSQL when deploying:
//   1. npm install pg
//   2. Replace the db.js import below with a pg Pool
//   3. Change SQL syntax if needed (SQLite and Postgres are very similar)
//
// PORT: 4000 (accessed via gateway as /api/...?XTransformPort=4000)
// ============================================================

import express from 'express'
import cors from 'cors'
import { initDb, db } from './db.js'

const app = express()
const PORT = 4000

// ─── Middleware ───
app.use(cors())
app.use(express.json())

// ─── Initialize database (creates tables + seed data) ───
initDb()

// ============================================================
// ROUTES
// ============================================================

// ─── Health check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hamza API is running' })
})

// ─── NEWS (the first thing we're converting) ───

// GET all news articles
app.get('/api/news', (req, res) => {
  const { category } = req.query
  let articles
  if (category && category !== 'All') {
    articles = db.prepare(
      'SELECT * FROM news_articles WHERE category = ? ORDER BY date DESC'
    ).all(category)
  } else {
    articles = db.prepare(
      'SELECT * FROM news_articles ORDER BY date DESC'
    ).all()
  }
  res.json(articles)
})

// GET a single news article
app.get('/api/news/:id', (req, res) => {
  const article = db.prepare('SELECT * FROM news_articles WHERE id = ?').get(req.params.id)
  if (!article) return res.status(404).json({ error: 'Article not found' })
  res.json(article)
})

// POST a new news article (for admin)
app.post('/api/news', (req, res) => {
  const { title, excerpt, date, category, author, image } = req.body
  const info = db.prepare(
    `INSERT INTO news_articles (title, excerpt, date, category, author, image)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(title, excerpt, date, category, author, image || 'default')
  const newArticle = db.prepare('SELECT * FROM news_articles WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(newArticle)
})

// ─── EVENTS ───
app.get('/api/events', (req, res) => {
  const events = db.prepare('SELECT * FROM events ORDER BY date ASC').all()
  res.json(events)
})

// ─── SCHOOL INFO ───
app.get('/api/school', (req, res) => {
  const info = db.prepare('SELECT * FROM school_info WHERE id = 1').get()
  res.json(info)
})

// ─── Start server ───
app.listen(PORT, () => {
  console.log(`✓ Hamza API running on http://localhost:${PORT}`)
  console.log(`  Health check: http://localhost:${PORT}/api/health`)
})
