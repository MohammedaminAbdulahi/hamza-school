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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
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
  ACHIEVEMENTS,
  EVENTS,
  NEWS,
  TESTIMONIALS,
  PRINCIPAL,
  SCHOOL,
} from '@/lib/data/school'
import { cn } from '@/lib/utils'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function HomePage() {
  const { goPage } = useNav()

  return (
    <div className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        {/* Warm layered background — soft gradient with subtle pattern */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.3),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.4),transparent_45%)]" />
        {/* Subtle grain */}
        <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
        {/* Floating decorative shapes */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute right-[8%] top-[18%] hidden size-32 rounded-full bg-amber-400/20 blur-2xl lg:block"
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute bottom-[15%] left-[10%] hidden size-40 rounded-full bg-emerald-400/20 blur-2xl lg:block"
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
            >
              <Sparkles className="size-4 text-amber-300" />
              Welcome to Hamza School · Addis Ababa, Ethiopia
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Where every child is{' '}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                seen, valued, and inspired
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-balance text-lg text-white/85 sm:text-xl"
            >
              A warm, family-like school in the heart of Addis Ababa. We nurture
              curious minds from Grade 1 to 8 — with caring teachers, a real biology
              lab, and a love for learning that lasts a lifetime.
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
                className="h-12 bg-amber-500 px-7 text-base text-amber-950 shadow-xl shadow-amber-500/30 hover:bg-amber-400"
              >
                Get in Touch
                <ArrowRight className="size-4.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => goPage('about')}
                className="h-12 border-white/30 bg-white/10 px-7 text-base text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
              >
                Learn About Us
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/80"
            >
              {['Licensed by MoE', 'Grades 1–8', 'Small Class Sizes', '96% National Exam Pass'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-amber-300" />
                    {item}
                  </span>
                )
              )}
            </motion.div>
          </div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="size-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== INTRODUCTION ===== */}
      <section className="border-b border-border/60 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="relative">
              <SmartImage
                seed="hamza-welcome-intro"
                alt="Students learning at Hamza School"
                icon="BookOpen"
                label="Our Community"
                className="aspect-[4/3] w-full"
              />
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border bg-card p-5 shadow-xl sm:block">
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Years of Caring</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Our Story
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              A small school with a big heart
            </h2>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Founded in {SCHOOL.established} by Mr. Abdulsemed Hamza, our school began
              with one simple belief — that every child deserves to be seen. Today, we
              serve over 850 students from Grade 1 to 8, with small classes, caring
              teachers, and a real focus on learning that lasts.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              From our biology lab to our reading corner, from national exam prep to
              playtime in the sun — everything we do is built around your child.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => goPage('about')} className="bg-primary">
                Discover Our Story
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" onClick={() => goPage('contact')}>
                Visit Our Campus
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Why Hamza"
              title="Why Choose Hamza School"
              description="Six pillars that make a Hamza education unlike any other—an investment in your child’s future that lasts a lifetime."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <DynamicIcon name={item.icon} className="size-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="text-center">
                <div className="text-4xl font-bold sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium text-primary-foreground/80 sm:text-base">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRINCIPAL'S MESSAGE ===== */}
      <section className="border-b border-border/60 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-2">
            <div className="relative mx-auto max-w-sm">
              <SmartImage
                seed="principal-pierce"
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
          <Reveal delay={0.15} className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Principal’s Welcome
            </span>
            <Quote className="mt-5 size-10 text-primary/30" />
            <p className="mt-4 text-balance text-lg leading-relaxed text-foreground/90 sm:text-xl">
              {PRINCIPAL.message}
            </p>
            <p className="mt-6 font-handwriting text-2xl font-semibold text-primary">
              {PRINCIPAL.signature}
            </p>
            <p className="text-sm text-muted-foreground">{PRINCIPAL.title}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== FEATURED PROGRAMS ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Academics"
              title="Featured Academic Programs"
              description="A seamless journey from early years to graduation, designed to challenge, inspire, and prepare students for a changing world."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((program, i) => (
              <Reveal key={program.title} delay={i * 0.08}>
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <div className="relative h-32 overflow-hidden">
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
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold">{program.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{program.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Button onClick={() => goPage('academics')} variant="outline" size="lg">
              Explore All Programs
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="border-y border-border/60 bg-card/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Pride"
              title="Student Achievements"
              description="From national championships to community service, Hamza students consistently reach new heights."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <DynamicIcon name={a.icon} className="size-6" />
                      </span>
                      <Badge variant="secondary" className="font-semibold">
                        {a.year}
                      </Badge>
                    </div>
                    <h3 className="mt-4 text-base font-semibold leading-snug">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="What’s On"
                title="Upcoming Events"
                description="Join us for performances, competitions, and community celebrations."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Button onClick={() => goPage('news')} variant="outline">
                View Calendar
                <ArrowRight className="size-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EVENTS.map((event, i) => {
              const d = new Date(event.date)
              return (
                <Reveal key={event.title} delay={i * 0.07}>
                  <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <span className="text-[10px] font-semibold uppercase">
                            {d.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className="text-xl font-bold leading-none">
                            {d.getDate()}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                      <h3 className="mt-4 text-base font-semibold leading-snug">
                        {event.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-primary" /> {event.time}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-primary" /> {event.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== LATEST NEWS ===== */}
      <section className="border-t border-border/60 bg-card/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="Latest"
                title="News & Stories"
                description="Catch up on the latest from across the Hamza community."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Button onClick={() => goPage('news')} variant="outline">
                All News
                <ArrowRight className="size-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {NEWS.slice(0, 3).map((article, i) => (
              <Reveal key={article.title} delay={i * 0.08}>
                <Card
                  className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
                  onClick={() => goPage('news')}
                >
                  <div className="relative h-48 overflow-hidden">
                    <SmartImage
                      seed={article.image}
                      alt={article.title}
                      icon="Newspaper"
                      rounded="rounded-none"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute left-3 top-3 bg-white/90 text-foreground">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      {formatDate(article.date)}
                      <span>·</span>
                      <span>{article.author}</span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Voices"
              title="What Our Community Says"
              description="Parents, alumni, and students share their Hamza experience."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((t) => (
                  <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/2">
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col p-7">
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

      {/* ===== ADMISSIONS CTA ===== */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            seed="hamza-apply-cta"
            alt=""
            icon="GraduationCap"
            rounded="rounded-none"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/75" />
        </div>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
              <Sparkles className="size-4 text-amber-300" />
              Visit Us This Term
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Come See the Hamza Difference
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-white/85">
              We'd love to meet you and your child. Book a visit, meet our teachers,
              and feel the warmth of our community for yourself.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => goPage('contact')}
                className="h-12 bg-white px-7 text-base text-primary shadow-xl hover:bg-white/90"
              >
                Contact Us
                <ArrowRight className="size-4.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => goPage('contact')}
                className="h-12 border-white/40 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
              >
                Book a Campus Tour
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
