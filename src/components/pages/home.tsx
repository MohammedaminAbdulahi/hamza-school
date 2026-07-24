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
  Sparkles,
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
import { SectionHeader } from '@/components/site/section-header'
import { AnimatedCounter } from '@/components/site/animated-counter'
import { DynamicIcon } from '@/components/site/dynamic-icon'
import { SmartImage } from '@/components/site/smart-image'
import { useNav } from '@/lib/nav-store'
import {
  STATS,
  WHY_CHOOSE,
  PROGRAMS,
  EVENTS,
  TESTIMONIALS,
  PRINCIPAL,
  MISSION,
  SCHOOL,
} from '@/lib/data/school'

export function HomePage() {
  const { goPage } = useNav()

  return (
    <div className="flex flex-col">
      {/* ===== HERO — full background photo with text overlay (matching design) ===== */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        {/* Background photo — the desk scene with books, notebook, plant */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-desk.jpeg"
            alt="A warm study desk with books labeled Knowledge, Faith, Character, Excellence, an open notebook with a Hadith quote, and a potted plant"
            className="h-full w-full object-cover"
          />
          {/* Dark overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/35" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
            >
              <Sparkles className="size-4 text-amber-300" />
              Welcome to Hamza School · Addis Ababa
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Nurturing Faith,{' '}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                Inspiring Futures.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg text-balance text-base text-white/85 sm:text-lg"
            >
              A warm, faith-based school in the heart of Addis Ababa. We blend
              quality education with strong values — helping every child grow in
              knowledge, character, and faith from Grade 1 to 8.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                onClick={() => goPage('contact')}
                className="h-12 bg-primary px-7 text-base shadow-xl shadow-primary/30 hover:bg-primary/90"
              >
                Enroll Now
                <ArrowRight className="size-4.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => goPage('about')}
                className="h-12 border-white/30 bg-white/10 px-7 text-base text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
              >
                Discover More
              </Button>
            </motion.div>

            {/* Admissions banner */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-7 flex items-center gap-3 rounded-xl border border-amber-400/40 bg-amber-500/15 p-3.5 backdrop-blur-md"
            >
              <Calendar className="size-5 shrink-0 text-amber-300" />
              <p className="text-sm font-medium text-amber-50">
                Admissions Open for 2025/2026 —{' '}
                <button onClick={() => goPage('contact')} className="font-bold underline underline-offset-2">
                  enroll your child today
                </button>
              </p>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/75"
            >
              {['Licensed by MoE', 'Grades 1–8', 'Small Classes', 'Faith-Based'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-amber-300" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES BAR — 4 pillars ===== */}
      <section className="border-y border-border/60 bg-card py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <DynamicIcon name={item.icon} className="size-6" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS — clean strip ===== */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="text-center">
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1.5 text-sm text-primary-foreground/80">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION — with Hadith quote ===== */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pattern-islamic absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <SmartImage
              seed="hamza-mission"
              alt="Students learning together"
              icon="HeartHandshake"
              label="Faith & Knowledge"
              className="aspect-[4/3] w-full shadow-xl"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              {MISSION.eyebrow}
            </span>
            <h2 className="mt-4 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {MISSION.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {MISSION.description}
            </p>
            <div className="mt-6 rounded-xl border-l-4 border-primary bg-primary/5 p-4">
              <p className="font-serif text-lg italic text-foreground">
                “{MISSION.quote}”
              </p>
              <p className="mt-2 text-sm font-semibold text-primary">— {MISSION.quoteSource}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PRINCIPAL'S MESSAGE ===== */}
      <section className="border-y border-border/60 bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-xs">
              <SmartImage
                seed="principal-hamza"
                alt={PRINCIPAL.name}
                icon="User"
                label={PRINCIPAL.name}
                className="aspect-[4/5] w-full"
              />
              <div className="absolute -bottom-4 left-1/2 w-[85%] -translate-x-1/2 rounded-xl border bg-card p-3 text-center shadow-lg">
                <p className="text-sm font-bold text-primary">{PRINCIPAL.name}</p>
                <p className="text-xs text-muted-foreground">{PRINCIPAL.title}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5" />
              A Word from Our Founder
            </span>
            <Quote className="mt-5 size-10 text-primary/25" />
            <p className="mt-3 text-balance font-serif text-lg leading-relaxed text-foreground/90 sm:text-xl">
              {PRINCIPAL.message}
            </p>
            <p className="mt-6 font-serif text-xl font-semibold text-primary">
              {PRINCIPAL.signature}
            </p>
            <Button onClick={() => goPage('about')} variant="outline" className="mt-6">
              Read Our Full Story
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <SectionHeader
              eyebrow="Academics"
              title="Programs from Grade 1 to 8"
              description="A clear path from early literacy to national exam readiness — built around your child at every step."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program, i) => (
              <Reveal key={program.title} delay={i * 0.08}>
                <Card className="group h-full overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <div className="relative h-36 overflow-hidden">
                    <SmartImage
                      seed={program.title}
                      alt={program.title}
                      icon={program.icon}
                      rounded="rounded-none"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute left-3 top-3 bg-white/90 text-foreground">
                      {program.level}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-semibold">{program.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Button onClick={() => goPage('academics')} variant="outline" size="lg">
              Explore Academics
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="border-t border-border/60 bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="What's On"
                title="Upcoming Events"
                description="Join us — we'd love to see you."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Button onClick={() => goPage('news')} variant="outline">
                View Calendar
                <ArrowRight className="size-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {EVENTS.slice(0, 4).map((event, i) => {
              const d = new Date(event.date)
              return (
                <Reveal key={event.title} delay={i * 0.06}>
                  <Card className="group h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="text-[10px] font-semibold uppercase">
                          {d.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-2xl font-bold leading-none">{d.getDate()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <Badge variant="outline" className="mb-1 text-[10px]">
                          {event.category}
                        </Badge>
                        <h3 className="truncate font-serif text-base font-semibold">{event.title}</h3>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" /> {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" /> {event.location}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <SectionHeader eyebrow="Voices" title="What families say" />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((t) => (
                  <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/2">
                    <Card className="h-full border-border/60">
                      <CardContent className="flex h-full flex-col p-8">
                        <Quote className="size-9 text-primary/25" />
                        <div className="mt-3 flex gap-0.5">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="mt-4 flex-1 text-balance text-base leading-relaxed text-foreground/90">
                          “{t.quote}”
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                          <Avatar className="size-11 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                              {t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-primary py-20 sm:py-28">
        <div className="pattern-islamic absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
          <Reveal>
            <h2 className="text-balance font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Come see the Hamza difference
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-white/85">
              We'd love to meet you and your child. Book a visit, meet our teachers,
              and feel the warmth of our community.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => goPage('contact')}
                className="h-12 bg-white px-8 text-base text-primary shadow-xl hover:bg-white/90"
              >
                Book a Visit
                <ArrowRight className="size-4.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => goPage('gallery')}
                className="h-12 border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
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
