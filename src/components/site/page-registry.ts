import type { PageId } from '@/lib/nav-store'

export const PAGES: { id: PageId; label: string; description: string }[] = [
  { id: 'home', label: 'Home', description: 'Welcome to Hamza School' },
  { id: 'about', label: 'About Us', description: 'Our history, mission & community' },
  { id: 'academics', label: 'Academics', description: 'Curriculum, programs & activities' },
  { id: 'admissions', label: 'Admissions', description: 'How to join Hamza School' },
  { id: 'news', label: 'News & Events', description: 'Latest news and upcoming events' },
  { id: 'gallery', label: 'Gallery', description: 'Photos of campus life' },
  { id: 'contact', label: 'Contact', description: 'Get in touch with us' },
]
