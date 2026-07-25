'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Star,
  Quote,
  CheckCircle2,
  Feather,
  BookOpen,
  Users,
  Trophy,
  HeartHandshake,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Reveal } from '@/components/site/reveal'
import { AnimatedCounter } from '@/components/site/animated-counter'
import { useNav } from '@/lib/nav-store'
import {
  STATS,
  PROGRAMS,
  EVENTS,
  TESTIMONIALS,
  PRINCIPAL,
  MISSION,
} from '@/lib/data/school'

export function HomePage() {
  const { goPage } = useNav()

  return (
    <div className="flex flex-col">
      {/* ===== HERO — full background photo + "Guiding Hearts. Growing Minds." ===== */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12">
        {/* Background photo */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-desk.jpeg"
            alt="A warm study desk with books labeled Knowledge, Faith, Character, Excellence"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/85 via-forest/75 to-wood-dark/65" style={{ background: 'linear-gradient(135deg, rgba(15,37,48,0.88) 0%, rgba(31,61,47,0.78) 50%, rgba(92,66,38,0.68) 100%)' }} />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-12 lg:py-20">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-cream"
          >
            {/* Welcome label with line */}
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-12 bg-gold" />
              <span className="text-xs uppercase tracking-[0.4em] text-gold-light">
                Welcome to Hamza School
              </span>
            </div>

            {/* Hero title — "Guiding Hearts. Growing Minds." */}
            <h1 className="font-serif text-6xl font-medium leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl">
              Guiding
              <br />
              <em className="font-normal italic text-gold-light">Hearts.</em>
              <br />
              Growing
              <br />
              <em className="font-normal italic text-gold-light">Minds.</em>
            </h1>

            <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-cream/85">
              An institution where knowledge meets character — nurturing faith,
              excellence, and a lifelong love of learning in every child.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                onClick={() => goPage('contact')}
                className="h-14 gap-2.5 rounded-sm bg-gold-deep px-9 text-xs font-medium uppercase tracking-[0.12em] text-cream transition-all hover:bg-gold"
              >
                Begin Enrollment
                <ArrowRight className="size-3.5" />
              </Button>
              <Button
                onClick={() => goPage('about')}
                variant="outline"
                className="h-14 gap-2.5 rounded-sm border border-cream px-8 text-xs font-medium uppercase tracking-[0.12em] text-cream transition-all hover:bg-cream hover:text-forest"
              >
                Discover Hamza
              </Button>
            </div>

            {/* Prophetic message badge */}
            <div className="mt-14 inline-flex max-w-xl items-center gap-4 rounded-sm border border-gold/30 bg-cream/10 px-6 py-4 backdrop-blur-md">
              <Feather className="size-5 shrink-0 text-gold-light" />
              <span className="font-serif text-sm italic tracking-wide text-cream/90">
                &ldquo;Seeking knowledge is an obligation upon every individual.&rdquo; — Prophet Muhammad ﷺ
              </span>
            </div>
          </motion.div>

          {/* Right: floating info cards (desktop only) */}
          <div className="relative hidden h-[600px] lg:block">
            {/* Card 1: Our Foundation — books reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="animate-float absolute right-0 top-8 w-80 border-l-4 border-forest bg-cream/95 p-8 shadow-2xl backdrop-blur-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <BookOpen className="size-6 text-forest" />
                <span className="font-serif text-xl font-semibold text-foreground">Our Foundation</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-sm bg-forest px-4 py-1.5 text-[11px] uppercase tracking-widest text-cream">Knowledge</span>
                <span className="rounded-sm bg-gold-deep px-4 py-1.5 text-[11px] uppercase tracking-widest text-cream">Faith</span>
                <span className="rounded-sm bg-navy px-4 py-1.5 text-[11px] uppercase tracking-widest text-cream">Character</span>
                <span className="rounded-sm bg-crimson px-4 py-1.5 text-[11px] uppercase tracking-widest text-cream">Excellence</span>
              </div>
            </motion.div>

            {/* Card 2: Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="animate-float absolute bottom-20 right-16 w-72 border border-gold/30 bg-paper p-8 shadow-2xl"
              style={{ animationDelay: '1.5s' }}
            >
              <Quote className="mb-3 block size-6 text-gold" />
              <p className="font-serif text-base italic leading-relaxed text-foreground">
                The beautiful thing about learning is that no one can take it away from you.
              </p>
              <p className="mt-4 text-right text-sm font-medium text-gold-deep">— B.B. King</p>
            </motion.div>

            {/* Card 3: Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="animate-float absolute left-0 top-1/2 w-56 bg-forest p-6 shadow-2xl"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="font-serif text-5xl font-semibold text-gold-light">10+</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-cream/80">Years of Excellence</div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="relative h-12 w-px bg-cream/30">
            <div className="absolute left-0 top-0 h-3 w-px bg-gold" />
          </div>
        </div>
      </section>

      {/* ===== VALUES — 4 pillars (Knowledge, Faith, Character, Excellence) ===== */}
      <section className="paper-texture relative overflow-hidden py-32">
        <div className="geo-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mb-16 text-center">
            <div className="ornament mb-6">
              <span className="text-gold">✦</span>
            </div>
            <p className="section-label">Our Core Values</p>
            <h2 className="mt-4 font-serif text-5xl font-medium text-foreground lg:text-6xl">
              The pillars of <em className="italic text-gold-deep">Hamza</em>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Every lesson, every interaction, and every day at Hamza is built on these four foundations.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, title: 'Knowledge', desc: 'A rigorous academic program that builds strong foundations in literacy, numeracy, and critical thinking.' },
              { icon: HeartHandshake, title: 'Faith', desc: 'Rooted in Islamic values — nurturing a deep love for Allah and His Messenger in every child.' },
              { icon: Users, title: 'Character', desc: 'Honesty, kindness, and responsibility — shaping students who are a credit to their families.' },
              { icon: Trophy, title: 'Excellence', desc: 'A culture of high expectations where every child is challenged to reach their full potential.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="value-card h-full border border-gold/18 bg-paper p-12 transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-[0_24px_48px_rgba(60,35,10,0.12)]">
                  <div className="mb-7 flex size-18 items-center justify-center rounded-full bg-gradient-to-br from-forest to-green-mid text-gold-light shadow-lg" style={{ width: '72px', height: '72px' }}>
                    <v.icon className="size-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROPHETIC WISDOM QUOTE ===== */}
      <section className="relative overflow-hidden py-28" style={{ background: 'linear-gradient(135deg, #0F2530 0%, #1B3A4B 50%, #1F3D2F 100%)' }}>
        <div className="geo-pattern pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
          <Reveal>
            <div className="ornament mb-8">
              <span className="text-gold text-2xl">✦</span>
            </div>
            <Quote className="mx-auto mb-8 size-12 text-gold/60" />
            <p className="font-serif text-3xl font-light italic leading-relaxed text-cream sm:text-4xl lg:text-5xl">
              &ldquo;Seeking knowledge is an obligation upon every Muslim.&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold/50" />
              <p className="font-serif text-lg text-gold-light">Prophet Muhammad ﷺ</p>
              <div className="h-px w-12 bg-gold/50" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-forest py-20 text-cream">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="text-center">
                <div className="font-serif text-5xl font-semibold text-gold-light sm:text-6xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm uppercase tracking-wider text-cream/80">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT / MISSION ===== */}
      <section className="paper-texture relative overflow-hidden py-32">
        <div className="geo-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <Reveal>
            <p className="section-label">Our Mission</p>
            <h2 className="mt-4 font-serif text-5xl font-medium leading-tight text-foreground lg:text-6xl">
              Guiding Hearts. <em className="italic text-gold-deep">Growing Minds.</em>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              {MISSION.description}
            </p>
            <div className="mt-8 flex items-start gap-4 rounded-sm border-l-2 border-gold bg-cream/50 p-5">
              <Feather className="mt-1 size-5 shrink-0 text-gold-deep" />
              <div>
                <p className="font-serif text-lg italic text-foreground">&ldquo;{MISSION.quote}&rdquo;</p>
                <p className="mt-2 text-sm font-semibold text-gold-deep">— {MISSION.quoteSource}</p>
              </div>
            </div>
            <Button
              onClick={() => goPage('about')}
              variant="outline"
              className="mt-8 h-12 gap-2 rounded-sm border-forest px-8 text-xs font-medium uppercase tracking-[0.12em] text-forest hover:bg-forest hover:text-cream"
            >
              Read Our Full Story
              <ArrowRight className="size-3.5" />
            </Button>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <img
                  src="/hero-desk.jpeg"
                  alt="Hamza School learning environment"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Floating stat */}
              <div className="animate-float absolute -bottom-8 -left-8 bg-forest p-6 shadow-2xl">
                <div className="font-serif text-4xl font-semibold text-gold-light">96%</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-cream/80">National Exam Pass Rate</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="bg-cream py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="mb-16 text-center">
            <div className="ornament mb-6">
              <span className="text-gold">✦</span>
            </div>
            <p className="section-label">Academics</p>
            <h2 className="mt-4 font-serif text-5xl font-medium text-foreground lg:text-6xl">
              Programs for every <em className="italic text-gold-deep">stage</em>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="value-card h-full border border-gold/18 bg-paper p-10 transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-[0_24px_48px_rgba(60,35,10,0.12)]">
                  <span className="inline-block rounded-sm bg-forest px-4 py-1.5 text-[11px] uppercase tracking-widest text-cream">{p.level}</span>
                  <h3 className="mt-6 font-serif text-3xl font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <button
                    onClick={() => goPage('academics')}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-gold-deep transition-colors hover:text-forest"
                  >
                    Learn More <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EVENTS ===== */}
      <section className="paper-texture relative overflow-hidden py-32">
        <div className="geo-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <p className="section-label">What's On</p>
              <h2 className="mt-4 font-serif text-5xl font-medium text-foreground lg:text-6xl">
                Upcoming <em className="italic text-gold-deep">Events</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Button
                onClick={() => goPage('news')}
                variant="outline"
                className="h-11 gap-2 rounded-sm border-forest px-6 text-xs font-medium uppercase tracking-[0.12em] text-forest hover:bg-forest hover:text-cream"
              >
                View Calendar <ArrowRight className="size-3.5" />
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {EVENTS.slice(0, 4).map((event, i) => {
              const d = new Date(event.date)
              return (
                <Reveal key={event.title} delay={i * 0.07}>
                  <div className="flex items-center gap-5 border border-gold/18 bg-paper p-6 transition-all duration-300 hover:border-gold hover:shadow-lg">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center bg-forest text-cream">
                      <span className="text-[10px] font-semibold uppercase">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="font-serif text-2xl font-bold leading-none">{d.getDate()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="rounded-sm bg-gold/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold-deep">{event.category}</span>
                      <h3 className="mt-1.5 font-serif text-xl font-semibold text-foreground">{event.title}</h3>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="size-3" /> {event.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="size-3" /> {event.location}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-cream py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <Reveal className="mb-16 text-center">
            <div className="ornament mb-6"><span className="text-gold">✦</span></div>
            <p className="section-label">Voices</p>
            <h2 className="mt-4 font-serif text-5xl font-medium text-foreground lg:text-6xl">
              What families <em className="italic text-gold-deep">say</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((t) => (
                  <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/2">
                    <div className="h-full border border-gold/18 bg-paper p-10">
                      <Quote className="size-8 text-gold/50" />
                      <div className="mt-3 flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="mt-5 flex-1 font-serif text-lg italic leading-relaxed text-foreground">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="mt-7 flex items-center gap-3">
                        <Avatar className="size-12 border-2 border-gold/30">
                          <AvatarFallback className="bg-forest font-serif font-semibold text-gold-light">
                            {t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-serif font-semibold text-foreground">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ===== PRINCIPAL'S MESSAGE ===== */}
      <section className="relative overflow-hidden py-32" style={{ background: 'linear-gradient(135deg, #0F2530 0%, #1B3A4B 50%, #1F3D2F 100%)' }}>
        <div className="geo-pattern pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-xs">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border-2 border-gold/30 shadow-2xl">
                <img
                  src="/hero-desk.jpeg"
                  alt={PRINCIPAL.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 border border-gold/30 bg-cream p-4 text-center shadow-xl">
                <p className="font-serif text-base font-bold text-forest">{PRINCIPAL.name}</p>
                <p className="text-xs text-muted-foreground">{PRINCIPAL.title}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7 text-cream">
            <p className="section-label text-gold-light">A Word from Our Founder</p>
            <Quote className="mt-6 size-12 text-gold/40" />
            <p className="mt-4 font-serif text-2xl font-light italic leading-relaxed text-cream/90 sm:text-3xl">
              {PRINCIPAL.message}
            </p>
            <p className="mt-8 font-serif text-2xl font-semibold text-gold-light">{PRINCIPAL.signature}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA / CONTACT ===== */}
      <section className="paper-texture relative overflow-hidden py-32">
        <div className="geo-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-12">
          <Reveal>
            <div className="ornament mb-6"><span className="text-gold text-2xl">✦</span></div>
            <h2 className="font-serif text-5xl font-medium text-foreground lg:text-6xl">
              Begin your <em className="italic text-gold-deep">journey</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              We'd love to meet you and your child. Book a visit, meet our teachers,
              and feel the warmth of our community.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={() => goPage('contact')}
                className="h-14 gap-2.5 rounded-sm bg-forest px-9 text-xs font-medium uppercase tracking-[0.12em] text-cream transition-all hover:bg-gold-deep"
              >
                Book a Visit <ArrowRight className="size-3.5" />
              </Button>
              <Button
                onClick={() => goPage('gallery')}
                variant="outline"
                className="h-14 gap-2.5 rounded-sm border-forest px-8 text-xs font-medium uppercase tracking-[0.12em] text-forest transition-all hover:bg-forest hover:text-cream"
              >
                See Photos
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
