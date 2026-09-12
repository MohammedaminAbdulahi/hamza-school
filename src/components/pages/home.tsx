'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Clock,
  MapPin,
  Star,
  Quote,
  Feather,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { DynamicIcon } from '@/components/site/dynamic-icon'
import { useNav } from '@/lib/nav-store'
import { WHY_CHOOSE, PROGRAMS, TESTIMONIALS } from '@/lib/content'
import { isDataUrl } from '@/lib/image-upload'
import { useContent } from '@/lib/content-context'

export function HomePage() {
  const { goPage } = useNav()
  const data = useContent()!
  const { school, events } = data
  const { hero, mission, principal, vicePrincipal, stats } = school

  return (
    <div className="flex flex-col">
      {/* ===== HERO — split layout: cream text side + photo side (no dark overlay) ===== */}
      <section className="relative overflow-hidden pt-28 pb-12">
        <div className="mx-auto grid min-h-[88vh] w-full max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-12 lg:py-16">
          {/* Left: text on cream paper */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            {/* Welcome label with line */}
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-12 bg-gold" />
              <span className="text-xs uppercase tracking-[0.4em] text-gold-deep">
                {hero.eyebrow}
              </span>
            </div>

            {/* Hero title */}
            <h1 className="font-serif text-6xl font-medium leading-[0.92] tracking-tight text-forest sm:text-7xl lg:text-8xl xl:text-9xl">
              Guiding
              <br />
              <em className="font-normal italic text-gold-deep">Hearts.</em>
              <br />
              Growing
              <br />
              <em className="font-normal italic text-gold-deep">Minds.</em>
            </h1>

            {/* Gold accent line */}
            <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />

            <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-foreground/80">
              {hero.description}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                onClick={() => goPage('contact')}
                className="h-14 gap-2.5 rounded-sm bg-forest px-9 text-xs font-medium uppercase tracking-[0.12em] text-cream transition-all hover:bg-gold-deep"
              >
                {hero.primaryButton}
                <ArrowRight className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => goPage('about')}
                className="h-14 gap-2.5 rounded-sm border-forest bg-paper px-8 text-xs font-medium uppercase tracking-[0.12em] text-forest transition-all hover:bg-forest hover:text-cream"
              >
                {hero.secondaryButton}
              </Button>
            </div>

            {/* Prophetic message badge */}
            <div className="mt-12 inline-flex max-w-xl items-center gap-4 rounded-sm border border-gold/30 bg-paper px-6 py-4">
              <Feather className="size-5 shrink-0 text-gold-deep" />
              <span className="font-serif text-sm italic tracking-wide text-foreground/80">
                &ldquo;{hero.propheticQuote}&rdquo; — {hero.propheticSource}
              </span>
            </div>
          </motion.div>

          {/* Right: the photo (clean, no dark overlay) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-sm border border-gold/20 shadow-2xl">
                <img
                  src="/hero-desk.jpeg"
                  alt="A warm study desk with books labeled Knowledge, Faith, Character, Excellence"
                  className="aspect-[4/5] w-full object-cover lg:aspect-[4/3]"
                />
              </div>
              {/* Floating foundation card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-4 hidden w-64 border-l-4 border-forest bg-cream p-5 shadow-xl sm:block"
              >
                <div className="mb-2 flex items-center gap-2">
                  <DynamicIcon name="BookOpen" className="size-5 text-forest" />
                  <span className="font-serif text-base font-semibold text-foreground">Our Foundation</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hero.foundationLabels.map((label, idx) => {
                    const colors = ['bg-forest', 'bg-gold-deep', 'bg-navy', 'bg-crimson']
                    return (
                      <span key={label} className={`rounded-sm px-2.5 py-1 text-[10px] uppercase tracking-widest text-cream ${colors[idx % colors.length]}`}>
                        {label}
                      </span>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
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
            {WHY_CHOOSE.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="value-card h-full border border-gold/18 bg-paper p-12 transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-[0_24px_48px_rgba(60,35,10,0.12)]">
                  <div className="mb-7 flex size-18 items-center justify-center rounded-full bg-gradient-to-br from-forest to-green-mid text-gold-light shadow-lg" style={{ width: '72px', height: '72px' }}>
                    <DynamicIcon name={v.icon} className="size-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROPHETIC WISDOM QUOTE ===== */}
      <section className="paper-texture relative overflow-hidden py-28">
        <div className="geo-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
          <Reveal>
            <div className="ornament mb-8">
              <span className="text-gold text-2xl">✦</span>
            </div>
            <Quote className="mx-auto mb-8 size-12 text-gold/60" />
            <p className="font-serif text-3xl font-light italic leading-relaxed text-forest sm:text-4xl lg:text-5xl">
              &ldquo;Seeking knowledge is an obligation upon every Muslim.&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold/50" />
              <p className="font-serif text-lg text-gold-deep">Prophet Muhammad ﷺ</p>
              <div className="h-px w-12 bg-gold/50" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-forest py-20 text-cream">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label + i} delay={i * 0.1} className="text-center">
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
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <Reveal>
            <p className="section-label">Our Mission</p>
            <h2 className="mt-4 font-serif text-5xl font-medium leading-tight text-foreground lg:text-6xl">
              Guiding Hearts. <em className="italic text-gold-deep">Growing Minds.</em>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              {mission.description}
            </p>
            <div className="mt-8 flex items-start gap-4 rounded-sm border-l-2 border-gold bg-cream/50 p-5">
              <Feather className="mt-1 size-5 shrink-0 text-gold-deep" />
              <div>
                <p className="font-serif text-lg italic text-foreground">&ldquo;{mission.quote}&rdquo;</p>
                <p className="mt-2 text-sm font-semibold text-gold-deep">— {mission.quoteSource}</p>
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
            {events.slice(0, 4).map((event, i) => {
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

      {/* ===== PRINCIPAL'S MESSAGE ===== */}
      <section className="paper-texture relative overflow-hidden py-32">
        <div className="geo-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-xs">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border-2 border-gold/30 shadow-2xl">
                {isDataUrl(principal.photo) ? (
                  <img
                    src={principal.photo}
                    alt={principal.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src="/hero-desk.jpeg"
                    alt={principal.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 border border-gold/30 bg-forest p-4 text-center shadow-xl">
                <p className="font-serif text-base font-bold text-cream">{principal.name}</p>
                <p className="text-xs text-gold-light">{principal.title}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <p className="section-label">A Word from Our Founder</p>
            <Quote className="mt-6 size-12 text-gold/50" />
            <p className="mt-4 font-serif text-2xl font-light italic leading-relaxed text-foreground/80 sm:text-3xl">
              {principal.message}
            </p>
            <p className="mt-8 font-serif text-2xl font-semibold text-gold-deep">{principal.signature}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== VICE DIRECTOR'S MESSAGE (only if a vice director name is set) ===== */}
      {vicePrincipal.name.trim() !== '' && (
        <section className="paper-texture relative overflow-hidden py-32 bg-cream/40">
          <div className="geo-pattern pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
            <Reveal delay={0.15} className="order-2 lg:order-1 lg:col-span-7">
              <p className="section-label">A Word from Our Vice Director</p>
              <Quote className="mt-6 size-12 text-gold/50" />
              <p className="mt-4 font-serif text-2xl font-light italic leading-relaxed text-foreground/80 sm:text-3xl">
                {vicePrincipal.message}
              </p>
              <p className="mt-8 font-serif text-2xl font-semibold text-gold-deep">
                {vicePrincipal.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {vicePrincipal.title}
              </p>
            </Reveal>
            <Reveal className="order-1 lg:order-2 lg:col-span-5">
              <div className="relative mx-auto max-w-xs">
                <div className="aspect-[4/5] overflow-hidden rounded-sm border-2 border-gold/30 shadow-2xl">
                  {isDataUrl(vicePrincipal.photo) ? (
                     
                    <img
                      src={vicePrincipal.photo}
                      alt={vicePrincipal.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-forest text-gold-light">
                      <span className="font-serif text-6xl font-semibold">
                        {vicePrincipal.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 border border-gold/30 bg-forest p-4 text-center shadow-xl">
                  <p className="font-serif text-base font-bold text-cream">
                    {vicePrincipal.name}
                  </p>
                  <p className="text-xs text-gold-light">{vicePrincipal.title}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

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
