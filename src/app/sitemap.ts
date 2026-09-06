import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hamzaschool.vercel.app'
  const pages = ['', '#/about', '#/academics', '#/news', '#/gallery', '#/contact']

  return pages.map((page) => ({
    url: `${base}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))
}
