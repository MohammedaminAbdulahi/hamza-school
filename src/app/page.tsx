'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { BackToTop } from '@/components/site/back-to-top'
import { CookieConsent } from '@/components/site/cookie-consent'
import { SearchModal } from '@/components/site/search-modal'
import { useNav, initFromHash } from '@/lib/nav-store'
// Direct-import the Home page — it's the landing page and must render instantly.
import { HomePage } from '@/components/pages/home'

// Lazy-load non-home pages (loaded on-demand when navigated to)
const AboutPage = dynamic(() => import('@/components/pages/about').then((m) => m.AboutPage), {
  ssr: false,
  loading: () => <PageLoader />,
})
const AcademicsPage = dynamic(() => import('@/components/pages/academics').then((m) => m.AcademicsPage), {
  ssr: false,
  loading: () => <PageLoader />,
})
const NewsPage = dynamic(() => import('@/components/pages/news').then((m) => m.NewsPage), {
  ssr: false,
  loading: () => <PageLoader />,
})
const GalleryPage = dynamic(() => import('@/components/pages/gallery').then((m) => m.GalleryPage), {
  ssr: false,
  loading: () => <PageLoader />,
})
const ContactPage = dynamic(() => import('@/components/pages/contact').then((m) => m.ContactPage), {
  ssr: false,
  loading: () => <PageLoader />,
})

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  )
}

export default function Home() {
  const view = useNav((s) => s.view)

  // Sync with URL hash after mount to avoid SSR/client hydration mismatch.
  React.useEffect(() => {
    initFromHash()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {view === 'home' && <HomePage />}
        {view === 'about' && <AboutPage />}
        {view === 'academics' && <AcademicsPage />}
        {view === 'news' && <NewsPage />}
        {view === 'gallery' && <GalleryPage />}
        {view === 'contact' && <ContactPage />}
      </main>
      <Footer />
      <BackToTop />
      <CookieConsent />
      <SearchModal />
    </div>
  )
}
