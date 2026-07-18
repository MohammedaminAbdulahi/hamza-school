// ============================================================
// API client for the Hamza School frontend
// ============================================================
// All requests go through the gateway on port 3000/81 with
// XTransformPort=4000 so they reach the Express API.
//
// Usage in any component:
//   import { api } from '@/lib/api'
//   const news = await api.getNews()
// ============================================================

const API_PORT = 4000

function apiUrl(path: string) {
  // Append XTransformPort as a query param
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}XTransformPort=${API_PORT}`
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  })
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`)
  }
  return res.json() as Promise<T>
}

// ─── Types (match the database schema) ───
export interface NewsArticle {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  author: string
  image: string
}

export interface SchoolEvent {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
}

export interface SchoolInfo {
  id: number
  name: string
  tagline: string
  phone: string
  email: string
  address: string
  hours: string
}

// ─── API methods ───
export const api = {
  // News
  getNews: (category?: string) =>
    request<NewsArticle[]>(`/api/news${category ? `?category=${category}` : ''}`),

  getNewsArticle: (id: number) =>
    request<NewsArticle>(`/api/news/${id}`),

  createNews: (article: Omit<NewsArticle, 'id'>) =>
    request<NewsArticle>('/api/news', {
      method: 'POST',
      body: JSON.stringify(article),
    }),

  // Events
  getEvents: () => request<SchoolEvent[]>('/api/events'),

  // School info
  getSchoolInfo: () => request<SchoolInfo>('/api/school'),
}
