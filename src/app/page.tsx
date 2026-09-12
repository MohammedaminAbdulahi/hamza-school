'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { BackToTop } from '@/components/site/back-to-top'
import { CookieConsent } from '@/components/site/cookie-consent'
import { SearchModal } from '@/components/site/search-modal'
import { useNav, initFromHash } from '@/lib/nav-store'
import { ContentProvider, useContent } from '@/lib/content-context'
import { HomePage } from '@/components/pages/home'

const AboutPage = dynamic(() => import('@/components/pages/about').then((m) => m.AboutPage), { ssr: false })
const AcademicsPage = dynamic(() => import('@/components/pages/academics').then((m) => m.AcademicsPage), { ssr: false })
const NewsPage = dynamic(() => import('@/components/pages/news').then((m) => m.NewsPage), { ssr: false })
const GalleryPage = dynamic(() => import('@/components/pages/gallery').then((m) => m.GalleryPage), { ssr: false })
const ContactPage = dynamic(() => import('@/components/pages/contact').then((m) => m.ContactPage), { ssr: false })

export default function Home() {
  const view = useNav((s) => s.view)

  React.useEffect(() => {
    initFromHash()
  }, [])

  return (
    <ContentProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <PageContent view={view} />
        </main>
        <Footer />
        <BackToTop />
        <CookieConsent />
        <SearchModal />
      </div>
    </ContentProvider>
  )
}

function PageContent({ view }: { view: string }) {
  // This component is inside ContentProvider, so useContent() works.
  // The provider shows the loading spinner until data is ready.
  const data = useContent()

  switch (view) {
    case 'home':
      return <HomePage />
    case 'about':
      return <AboutPage />
    case 'academics':
      return <AcademicsPage />
    case 'news':
      return <NewsPage />
    case 'gallery':
      return <GalleryPage />
    case 'contact':
      return <ContactPage />
    default:
      return <HomePage />
  }
}
