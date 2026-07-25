'use client'

import * as React from 'react'
import { Quote, ArrowRight, Target, Eye, Award, ShieldCheck, Sparkles } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { SmartImage } from '@/components/site/smart-image'
import { DynamicIcon } from '@/components/site/dynamic-icon'
import { AnimatedCounter } from '@/components/site/animated-counter'
import { useNav } from '@/lib/nav-store'
import {
  SCHOOL,
  CORE_VALUES,
  LEADERSHIP,
  TEACHERS,
  FACILITIES,
  ACCREDITATIONS,
  POLICIES,
  HISTORY,
  PRINCIPAL,
} from '@/lib/data/school'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const QUICK_STATS = [
  { value: 10, suffix: '+', label: 'Years of Excellence' },
  { value: 850, suffix: '+', label: 'Students Enrolled' },
  { value: 48, suffix: '+', label: 'Caring Educators' },
  { value: 96, suffix: '%', label: 'National Exam Pass Rate' },
]

export function AboutPage() {
  const goPage = useNav((s) => s.goPage)

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="About Us"
        title="A community where every child is seen, valued, and inspired"
        description={`Since ${SCHOOL.established}, ${SCHOOL.name} has been a family-like learning home in Addis Ababa — where children grow in confidence, character, and curiosity. Meet the people, places, and principles that make us who we are.`}
        seed="about-hero"
        icon="School"
        breadcrumb="About Us"
      />

      {/* Quick stats strip */}
      <section className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {QUICK_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* School History — vertical timeline */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Our Journey"
              title="A story of small beginnings, steady growth"
              description="From a single rented building on Bole Road to a warm 850-student campus, every chapter of our story reflects a commitment to children, community, and care."
            />
          </Reveal>
          <div className="mx-auto mt-14 max-w-3xl">
            <ol className="relative border-l border-primary/30 pl-8">
              {HISTORY.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.06}>
                  <li className="relative mb-10 last:mb-0">
                    <span className="absolute -left-[2.55rem] flex size-7 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm">
                      <span className="size-2.5 rounded-full bg-primary" />
                    </span>
                    <Card className="gap-3 py-5">
                      <CardHeader className="gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="bg-primary/10 text-primary">{item.year}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Our Purpose"
              title="Mission & Vision"
              description="Two ideas guide every decision we make — what we strive to do today, and the future we are building together."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.05}>
              <Card className="h-full overflow-hidden border-primary/20 py-0">
                <div className="relative">
                  <SmartImage
                    seed="about-mission"
                    alt="Illustration representing our mission to inspire students"
                    icon="Target"
                    label="Mission"
                    className="aspect-[16/7] w-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Target className="size-5" />
                    </div>
                    <CardTitle className="text-xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    To create a warm, family-like school in Addis Ababa where every
                    child is seen, valued, and inspired to learn. We build strong
                    foundations in literacy, numeracy, and character — and we help
                    each child discover the joy of asking questions, the courage to
                    try, and the pride of steady progress.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.12}>
              <Card className="h-full overflow-hidden border-amber-500/20 py-0">
                <div className="relative">
                  <SmartImage
                    seed="about-vision"
                    alt="Illustration representing our vision for the future"
                    icon="Eye"
                    label="Vision"
                    className="aspect-[16/7] w-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Eye className="size-5" />
                    </div>
                    <CardTitle className="text-xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    To be a school in Addis Ababa where children leave Grade 8 not
                    only ready for secondary school, but ready for life — confident
                    in who they are, kind to those around them, and curious about the
                    world. We dream of graduates who carry the Hamza spirit of
                    integrity, hard work, and care wherever they go next.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="What We Stand For"
              title="Our Core Values"
              description="Six principles anchor our culture, inform our decisions, and shape the character of every Hamza student."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <DynamicIcon name={value.icon} className="size-6" />
                    </div>
                    <CardTitle className="mt-3 text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" delay={0.05}>
              <div className="relative mx-auto max-w-sm">
                <SmartImage
                  seed="about-principal"
                  alt={`Portrait of ${PRINCIPAL.name}`}
                  icon="UserRound"
                  label={PRINCIPAL.name}
                  className="aspect-[4/5] w-full"
                />
                <div className="absolute -bottom-4 -right-4 hidden rounded-xl border bg-background p-4 shadow-lg sm:block">
                  <div className="flex items-center gap-2">
                    <Award className="size-5 text-amber-500" />
                    <div>
                      <div className="text-xs text-muted-foreground">Leading since</div>
                      <div className="text-sm font-semibold">2015</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.12}>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Principal's Message
                </span>
                <Quote className="mt-5 size-8 text-primary/30" />
                <blockquote className="mt-3 text-pretty text-lg font-medium leading-relaxed sm:text-xl">
                  &ldquo;{PRINCIPAL.message}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <div>
                    <div className="font-semibold">{PRINCIPAL.signature}</div>
                    <div className="text-sm text-muted-foreground">{PRINCIPAL.title}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Leadership"
              title="Meet our leadership team"
              description="Experienced educators and dedicated mentors who shape the vision and daily life of our school."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.06}>
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="size-14 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <div className="text-sm font-medium text-primary">{member.role}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers & Staff */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Our Educators"
              title="Teachers who know every child"
              description="Passionate specialists with deep subject expertise and an unwavering commitment to student success."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEACHERS.map((teacher, i) => (
              <Reveal key={teacher.name} delay={i * 0.05}>
                <Card className="h-full text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="size-16 border-2 border-amber-500/20">
                      <AvatarFallback className="bg-amber-500/10 text-lg font-semibold text-amber-600 dark:text-amber-400">
                        {teacher.initials}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-base">{teacher.name}</CardTitle>
                    <div className="mt-1 text-sm font-medium text-primary">
                      {teacher.subject}
                    </div>
                    <Badge variant="secondary" className="mt-3">
                      {teacher.years} years exp.
                    </Badge>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* School Facilities */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Our Campus"
              title="Small, warm spaces built for discovery"
              description="Our campus is intentionally modest — focused on the spaces that truly help children learn, play, and feel at home."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map((facility, i) => (
              <Reveal key={facility.name} delay={i * 0.06}>
                <Card className="group h-full overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative">
                    <SmartImage
                      seed={`about-facility-${facility.name}`}
                      alt={facility.name}
                      icon={facility.icon}
                      label={facility.name}
                      className="aspect-[16/9] w-full"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <DynamicIcon name={facility.icon} className="size-5 text-primary" />
                      <CardTitle className="text-base">{facility.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{facility.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations & Achievements */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Recognition"
              title="Licensed & trusted by Ethiopian authorities"
              description="Our school is fully registered with the Ethiopian Ministry of Education and recognized by the Addis Ababa Education Bureau — meeting national standards for primary and junior secondary education."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ACCREDITATIONS.map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col items-start gap-4 pt-6">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Accredited
                      </div>
                      <div className="mt-1 text-sm font-medium leading-snug">{item}</div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* School Policies */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeader
                align="left"
                eyebrow="Governance"
                title="Policies that protect our community"
                description="Clear, fair, and caring guidelines ensure every student learns in a safe, respectful, and supportive environment."
              />
              <div className="mt-6 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <Sparkles className="size-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  All policies are reviewed annually with input from staff, parents, and
                  our student council.
                </p>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <Card>
                <CardContent className="pt-2">
                  <Accordion type="single" collapsible className="w-full">
                    {POLICIES.map((policy, i) => (
                      <AccordionItem key={policy.title} value={`policy-${i}`}>
                        <AccordionTrigger className="text-left text-base font-semibold">
                          {policy.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {policy.description}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-sm p-8 text-cream sm:p-12" style={{ background: 'linear-gradient(135deg, #0F2530 0%, #1B3A4B 50%, #1F3D2F 100%)' }}>
              <div className="geo-pattern pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                    Ready to become part of our <em className="italic text-gold-light">story?</em>
                  </h2>
                  <p className="mt-3 text-base text-cream/80 sm:text-lg">
                    Schedule a campus visit, meet our educators, and discover why families
                    across Addis Ababa choose {SCHOOL.name} for their children's education.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 gap-2.5 rounded-sm bg-gold-deep px-8 text-xs font-medium uppercase tracking-[0.12em] text-cream hover:bg-gold"
                    onClick={() => goPage('contact')}
                  >
                    Contact Us
                    <ArrowRight className="size-3.5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 gap-2.5 rounded-sm border border-cream/40 bg-transparent px-8 text-xs font-medium uppercase tracking-[0.12em] text-cream hover:bg-cream/10 hover:text-cream"
                    onClick={() => goPage('gallery')}
                  >
                    See Photos
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
