'use client'

import * as React from 'react'
import {
  ArrowRight,
  BookOpen,
  Cpu,
  Library,
  Languages as LanguagesIcon,
  Palette,
  Music,
  GraduationCap,
  FlaskConical,
  Microscope,
  Atom,
  TestTube,
} from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { SmartImage } from '@/components/site/smart-image'
import { DynamicIcon } from '@/components/site/dynamic-icon'
import { useNav } from '@/lib/nav-store'
import {
  PROGRAMS,
  DEPARTMENTS,
  SUBJECTS,
  CLUBS,
  SPORTS,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const GRADE_LEVELS = [
  {
    band: 'Early Years',
    grades: 'Pre-K – K',
    ages: 'Ages 3–5',
    milestones: 'Foundational literacy, numeracy & social-emotional learning',
  },
  {
    band: 'Primary School',
    grades: 'Grades 1–5',
    ages: 'Ages 6–10',
    milestones: 'Core academics, creativity, and collaborative projects',
  },
  {
    band: 'Middle School',
    grades: 'Grades 6–8',
    ages: 'Ages 11–13',
    milestones: 'Interdisciplinary study, critical thinking & independence',
  },
  {
    band: 'High School',
    grades: 'Grades 9–12',
    ages: 'Ages 14–18',
    milestones: 'AP courses, college counseling & capstone projects',
  },
]

const STEM_FEATURES = [
  {
    icon: Cpu,
    title: 'Robotics & AI Lab',
    description:
      'Collaborative robots, 3D printers, and machine-learning workstations where students design, build, and program autonomous systems.',
  },
  {
    icon: BookOpen,
    title: 'Coding Curriculum',
    description:
      'A spiraled K–12 curriculum spanning Scratch, Python, JavaScript, and AP Computer Science — culminating in student-led software projects.',
  },
  {
    icon: FlaskConical,
    title: 'Science Laboratories',
    description:
      'Six specialist labs for physics, chemistry, and biology with university-grade equipment and inquiry-based experimental design.',
  },
  {
    icon: Microscope,
    title: 'Research & Innovation',
    description:
      'Annual science fairs, mentorships with university researchers, and a senior capstone program that produces publishable student work.',
  },
]

const LANGUAGES = [
  {
    name: 'English',
    icon: BookOpen,
    level: 'Fluent / Native Track',
    description:
      'Core literacy from Early Years, with AP English Literature and academic writing in High School.',
    proficiency: 95,
  },
  {
    name: 'Mandarin',
    icon: LanguagesIcon,
    level: 'Dual-Language Immersion',
    description:
      'Immersive English–Mandarin track in Primary; full HSK-aligned progression through High School.',
    proficiency: 80,
  },
  {
    name: 'French',
    icon: LanguagesIcon,
    level: 'Intermediate – Advanced',
    description:
      'DELF-aligned instruction from Grade 6, with exchange opportunities in Lyon and Dakar.',
    proficiency: 70,
  },
  {
    name: 'Spanish',
    icon: LanguagesIcon,
    level: 'Beginner – Advanced',
    description:
      'Conversational to AP Spanish; cultural immersion trips to Mexico City and Madrid.',
    proficiency: 65,
  },
]

const LABS = [
  {
    name: 'Physics Laboratory',
    iconName: 'Atom',
    description:
      'Digital data-logging stations, optical benches, and a wind tunnel for mechanics and waves experiments.',
    equipment: ['Wind tunnel', 'Oscilloscopes', 'Air track', 'Optical benches'],
  },
  {
    name: 'Chemistry Laboratory',
    iconName: 'TestTube',
    description:
      'Eight fume hoods, an analytical balance room, and chromatography stations for organic and inorganic chemistry.',
    equipment: ['Fume hoods ×8', 'Spectrophotometer', 'Rotary evaporator', 'pH meters'],
  },
  {
    name: 'Biology Laboratory',
    iconName: 'Microscope',
    description:
      'Compound and stereo microscopes, a controlled-growth chamber, and a DNA electrophoresis station.',
    equipment: ['Microscopes ×20', 'PCR machine', 'Growth chamber', 'Electrophoresis'],
  },
]

const ARTS_FEATURES = [
  {
    icon: Music,
    title: 'Performing Arts',
    description:
      'Orchestra, choir, jazz band, and drama society stage six major productions each year in our 600-seat auditorium.',
  },
  {
    icon: Palette,
    title: 'Visual Arts',
    description:
      'Studios for drawing, painting, ceramics, and digital design — with an annual gallery exhibition of student work.',
  },
  {
    icon: BookOpen,
    title: 'Media & Film',
    description:
      'A broadcast studio and editing suite where students produce documentaries, podcasts, and short films.',
  },
]

export function AcademicsPage() {
  const goPage = useNav((s) => s.goPage)

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Academics"
        title="A curriculum that grows with every student"
        description="From play-based Early Years to Advanced Placement and capstone research, our academic program balances rigor, curiosity, and care."
        seed="academics-hero"
        icon="BookOpen"
        breadcrumb="Academics"
      />

      {/* Curriculum Overview */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Curriculum Overview"
              title="Four stages, one continuous journey"
              description="Our spiraled K–12 curriculum builds conceptual understanding year over year — weaving together inquiry, mastery, and real-world application."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((program, i) => (
              <Reveal key={program.title} delay={i * 0.06}>
                <Card className="group h-full overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <SmartImage
                    seed={`academics-program-${program.title}`}
                    alt={program.title}
                    icon={program.icon}
                    label={program.level}
                    className="aspect-[16/10] w-full rounded-none"
                  />
                  <CardHeader>
                    <CardTitle className="text-base">{program.title}</CardTitle>
                    <CardDescription className="text-xs font-medium uppercase tracking-wider text-primary">
                      {program.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{program.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Levels — Table */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Grade Levels"
              title="A clear path from Pre-K to graduation"
              description="Each grade band is thoughtfully designed to match developmental milestones, academic goals, and the changing needs of growing learners."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-12 overflow-hidden py-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5 hover:bg-primary/5">
                    <TableHead className="px-6 py-4 text-sm font-semibold">Stage</TableHead>
                    <TableHead className="px-6 py-4 text-sm font-semibold">Grades</TableHead>
                    <TableHead className="px-6 py-4 text-sm font-semibold">Ages</TableHead>
                    <TableHead className="px-6 py-4 text-sm font-semibold">Key Milestones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {GRADE_LEVELS.map((row) => (
                    <TableRow key={row.band}>
                      <TableCell className="px-6 py-4 font-semibold text-primary">
                        {row.band}
                      </TableCell>
                      <TableCell className="px-6 py-4">{row.grades}</TableCell>
                      <TableCell className="px-6 py-4">{row.ages}</TableCell>
                      <TableCell className="px-6 py-4 text-muted-foreground">
                        {row.milestones}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Departments"
              title="Specialist departments, shared standards"
              description="Six departments collaborate across grade levels to ensure continuity, depth, and a coherent learning experience for every student."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept, i) => (
              <Reveal key={dept.name} delay={i * 0.06}>
                <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <DynamicIcon name={dept.icon} className="size-6" />
                      </div>
                      <Badge variant="secondary">{dept.subjects} subjects</Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg">{dept.name}</CardTitle>
                    <CardDescription>
                      Department Head: <span className="font-medium text-foreground">{dept.head}</span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Subjects Offered"
              title="A broad and balanced academic menu"
              description="Twelve subject areas spanning the sciences, humanities, arts, and languages — complemented by electives that grow each year."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-12">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  {SUBJECTS.map((subject) => (
                    <Badge
                      key={subject}
                      variant="outline"
                      className="border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* STEM Education */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 text-primary-foreground sm:p-12">
              <div className="absolute -right-16 -top-16 size-72 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 size-80 rounded-full bg-white/10 blur-3xl" />
              <div className="relative grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    <span className="size-1.5 rounded-full bg-amber-300" />
                    STEM Education
                  </span>
                  <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                    Where curiosity becomes invention
                  </h2>
                  <p className="mt-4 text-base text-primary-foreground/85 sm:text-lg">
                    From a kindergartener's first circuit to a senior's published
                    research, our STEM pathway immerses students in robotics, coding,
                    data science, and authentic laboratory inquiry.
                  </p>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {STEM_FEATURES.map((feature) => (
                      <div key={feature.title} className="flex gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                          <feature.icon className="size-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{feature.title}</div>
                          <p className="mt-1 text-xs leading-relaxed text-primary-foreground/80">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <SmartImage
                    seed="academics-stem"
                    alt="Students conducting experiments in the STEM and robotics lab"
                    icon="Cpu"
                    label="Innovation Lab"
                    className="aspect-[4/3] w-full border border-white/20"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Language Programs */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="World Languages"
              title="Multilingual learners, global citizens"
              description="Our language programs develop communicative competence, cultural fluency, and the confidence to connect across borders."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map((lang, i) => (
              <Reveal key={lang.name} delay={i * 0.06}>
                <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                      <lang.icon className="size-6" />
                    </div>
                    <CardTitle className="mt-3 text-lg">{lang.name}</CardTitle>
                    <CardDescription className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {lang.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{lang.description}</p>
                    <div className="mt-4">
                      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Proficiency target</span>
                        <span className="font-semibold text-foreground">{lang.proficiency}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-600"
                          style={{ width: `${lang.proficiency}%` }}
                          role="progressbar"
                          aria-valuenow={lang.proficiency}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Library + Laboratories — two columns */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Library feature */}
          <Reveal>
            <Card className="overflow-hidden border-primary/20 py-0">
              <div className="grid lg:grid-cols-2">
                <div className="relative">
                  <SmartImage
                    seed="academics-library"
                    alt="Hamza Learning Resource Center with reading atriums and digital archives"
                    icon="Library"
                    label="Learning Resource Center"
                    className="h-full min-h-64 w-full rounded-none"
                  />
                </div>
                <div className="p-8 sm:p-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    The Library
                  </span>
                  <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                    The Hamza Learning Resource Center
                  </h2>
                  <p className="mt-4 text-base text-muted-foreground">
                    A 12,000-square-foot hub of inquiry housing over <strong className="text-foreground">40,000 volumes</strong>,
                    digital archives, peer-tutoring suites, and silent study atriums.
                    Staffed by two full-time librarians and a digital-learning specialist,
                    the LRC is the academic heart of our campus.
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      '40,000+ print volumes',
                      '12 academic databases',
                      'Quiet study atriums',
                      'Peer-tutoring suites',
                      'Maker corner with 3D printers',
                      'Daily after-school hours',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <BookOpen className="size-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Laboratories */}
          <Reveal className="mt-16">
            <SectionHeader
              eyebrow="Laboratories"
              title="Science in practice"
              description="Three specialist laboratories give students hands-on experience with the methods and tools of real scientific inquiry."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {LABS.map((lab, i) => (
              <Reveal key={lab.name} delay={i * 0.08}>
                <Card className="group h-full overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <SmartImage
                    seed={`academics-lab-${lab.name}`}
                    alt={lab.name}
                    icon={lab.iconName}
                    label={lab.name}
                    className="aspect-[16/10] w-full rounded-none"
                  />
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <DynamicIcon name={lab.iconName} className="size-5 text-primary" />
                      <CardTitle className="text-base">{lab.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{lab.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {lab.equipment.map((eq) => (
                        <Badge key={eq} variant="secondary" className="text-xs">
                          {eq}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Extracurricular — Tabs */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Beyond the Classroom"
              title="Clubs, sports & the arts"
              description="A vibrant co-curricular program develops leadership, teamwork, and lifelong passions — every student finds their stage."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Tabs defaultValue="clubs" className="mt-12">
              <TabsList className="h-auto w-full justify-center bg-background p-1 sm:w-auto">
                <TabsTrigger value="clubs" className="flex-1 gap-1.5 px-6 py-2 sm:flex-none">
                  <DynamicIcon name="Users" className="size-4" />
                  Clubs
                </TabsTrigger>
                <TabsTrigger value="sports" className="flex-1 gap-1.5 px-6 py-2 sm:flex-none">
                  <DynamicIcon name="Dumbbell" className="size-4" />
                  Sports
                </TabsTrigger>
                <TabsTrigger value="arts" className="flex-1 gap-1.5 px-6 py-2 sm:flex-none">
                  <DynamicIcon name="Palette" className="size-4" />
                  Arts &amp; Music
                </TabsTrigger>
              </TabsList>

              {/* Clubs */}
              <TabsContent value="clubs" className="mt-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {CLUBS.map((club, i) => (
                    <Reveal key={club.name} delay={i * 0.04}>
                      <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <DynamicIcon name={club.icon} className="size-5" />
                            </div>
                            <Badge variant="secondary">{club.members} members</Badge>
                          </div>
                          <div className="mt-4 font-semibold">{club.name}</div>
                        </CardContent>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </TabsContent>

              {/* Sports */}
              <TabsContent value="sports" className="mt-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {SPORTS.map((sport, i) => (
                    <Reveal key={sport.name} delay={i * 0.05}>
                      <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                        <CardContent className="flex items-center gap-4 pt-6">
                          <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white dark:text-amber-400">
                            <DynamicIcon name={sport.icon} className="size-6" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{sport.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Season: <span className="font-medium text-foreground">{sport.season}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </TabsContent>

              {/* Arts & Music */}
              <TabsContent value="arts" className="mt-8">
                <div className="grid gap-8 lg:grid-cols-12">
                  <Reveal className="lg:col-span-5">
                    <div className="relative h-full min-h-64">
                      <SmartImage
                        seed="academics-arts"
                        alt="Students performing in the Hamza auditorium and exhibiting visual art"
                        icon="Music"
                        label="Performing & Visual Arts"
                        className="h-full w-full"
                      />
                    </div>
                  </Reveal>
                  <Reveal className="lg:col-span-7" delay={0.1}>
                    <div className="grid gap-5 sm:grid-cols-1">
                      {ARTS_FEATURES.map((feat, i) => (
                        <Card key={feat.title} className="transition-all hover:shadow-md">
                          <CardContent className="flex gap-4 pt-6">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <feat.icon className="size-5" />
                            </div>
                            <div>
                              <div className="font-semibold">{feat.title}</div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {feat.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-8 text-white sm:p-12">
              <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 size-72 rounded-full bg-emerald-600/20 blur-3xl" />
              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-7" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Admissions Open for 2025–2026
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    Begin your child's academic journey with us
                  </h2>
                  <p className="mt-3 text-base text-white/85 sm:text-lg">
                    Explore our programs in person. Schedule a personalized tour and see
                    our classrooms, labs, and studios in action.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-white text-amber-700 hover:bg-white/90"
                    onClick={() => goPage('admissions')}
                  >
                    Start Application
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    onClick={() => goPage('contact')}
                  >
                    Book a Tour
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
