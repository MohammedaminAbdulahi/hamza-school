'use client'

import * as React from 'react'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react'
import { Logo } from './logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNav, type PageId } from '@/lib/nav-store'
import { SCHOOL } from '@/lib/data/school'
import { toast } from 'sonner'

const QUICK_LINKS: { label: string; page: PageId }[] = [
  { label: 'About Us', page: 'about' },
  { label: 'Academics', page: 'academics' },
  { label: 'News & Events', page: 'news' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Contact', page: 'contact' },
]

export function Footer() {
  const goPage = useNav((s) => s.goPage)
  const [email, setEmail] = React.useState('')

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    toast.success('Subscribed!', {
      description: 'You’ll receive Hamza School news in your inbox.',
    })
    setEmail('')
  }

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40">
      {/* Newsletter band */}
      <div className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">Stay Connected with Hamza School</h3>
            <p className="mt-1 text-primary-foreground/80">
              Subscribe for news, events, and school updates.
            </p>
          </div>
          <form
            onSubmit={subscribe}
            className="flex w-full max-w-md items-center gap-2"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:bg-primary-foreground/15"
            />
            <Button
              type="submit"
              variant="secondary"
              className="shrink-0 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Send className="size-4" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo variant="default" />
          <p className="text-sm text-muted-foreground">
            {SCHOOL.tagline} A premier learning community nurturing curious minds and
            courageous hearts since {SCHOOL.established}.
          </p>
          <div className="flex gap-2">
            {[
              { icon: Facebook, href: SCHOOL.social.facebook, label: 'Facebook' },
              { icon: Twitter, href: SCHOOL.social.twitter, label: 'Twitter' },
              { icon: Instagram, href: SCHOOL.social.instagram, label: 'Instagram' },
              { icon: Youtube, href: SCHOOL.social.youtube, label: 'YouTube' },
              { icon: Send, href: SCHOOL.social.telegram, label: 'Telegram' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => goPage(l.page)}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Visit Us</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button
                onClick={() => goPage('contact')}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Book a Visit
              </button>
            </li>
            <li>
              <button
                onClick={() => goPage('news')}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Latest News
              </button>
            </li>
            <li>
              <button
                onClick={() => goPage('gallery')}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                School Gallery
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{SCHOOL.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-primary" />
              <span>{SCHOOL.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-primary" />
              <span>{SCHOOL.email}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{SCHOOL.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="hover:text-primary">Privacy Policy</button>
            <button className="hover:text-primary">Terms of Service</button>
            <button className="hover:text-primary">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
