'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { BackToTop } from '@/components/site/back-to-top'
import { CookieConsent } from '@/components/site/cookie-consent'
import { SearchModal } from '@/components/site/search-modal'
import { useNav, initFromHash } from '@/lib/nav-store'
import { HomePageSkeleton } from '@/components/site/skeletons'

// Lazy-load all views to keep initial render fast
const HomePage = dynamic(() => import('@/components/pages/home').then((m) => m.HomePage), {
  loading: () => <HomePageSkeleton />,
})
const AboutPage = dynamic(() => import('@/components/pages/about').then((m) => m.AboutPage), {
  ssr: false,
})
const AcademicsPage = dynamic(() => import('@/components/pages/academics').then((m) => m.AcademicsPage), {
  ssr: false,
})
const AdmissionsPage = dynamic(() => import('@/components/pages/admissions').then((m) => m.AdmissionsPage), {
  ssr: false,
})
const NewsPage = dynamic(() => import('@/components/pages/news').then((m) => m.NewsPage), {
  ssr: false,
})
const GalleryPage = dynamic(() => import('@/components/pages/gallery').then((m) => m.GalleryPage), {
  ssr: false,
})
const ContactPage = dynamic(() => import('@/components/pages/contact').then((m) => m.ContactPage), {
  ssr: false,
})
const PortalLogin = dynamic(() => import('@/components/portals/portal-login').then((m) => m.PortalLogin), {
  ssr: false,
})
const StudentPortal = dynamic(() => import('@/components/portals/student-portal').then((m) => m.StudentPortal), {
  ssr: false,
})
const ParentPortal = dynamic(() => import('@/components/portals/parent-portal').then((m) => m.ParentPortal), {
  ssr: false,
})
const TeacherPortal = dynamic(() => import('@/components/portals/teacher-portal').then((m) => m.TeacherPortal), {
  ssr: false,
})
const AdminPortal = dynamic(() => import('@/components/portals/admin-portal').then((m) => m.AdminPortal), {
  ssr: false,
})

function PublicPage() {
  const view = useNav((s) => s.view)
  const page = view.kind === 'page' ? view.page : 'home'
  switch (page) {
    case 'home':
      return <HomePage />
    case 'about':
      return <AboutPage />
    case 'academics':
      return <AcademicsPage />
    case 'admissions':
      return <AdmissionsPage />
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

function PortalView() {
  const view = useNav((s) => s.view)
  if (view.kind !== 'portal') return null
  switch (view.role) {
    case 'student':
      return <StudentPortal />
    case 'parent':
      return <ParentPortal />
    case 'teacher':
      return <TeacherPortal />
    case 'admin':
      return <AdminPortal />
    default:
      return null
  }
}

export default function Home() {
  const view = useNav((s) => s.view)
  const inPortal = view.kind === 'portal'

  // Sync with URL hash after mount to avoid SSR/client hydration mismatch.
  React.useEffect(() => {
    initFromHash()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {inPortal ? (
        <PortalView />
      ) : (
        <>
          <Navbar />
          <main className="flex-1">
            {view.kind === 'portal-login' ? <PortalLogin /> : <PublicPage />}
          </main>
          <Footer />
        </>
      )}
      <BackToTop />
      <CookieConsent />
      <SearchModal />
    </div>
  )
}
