'use client'

import * as React from 'react'
import {
  ArrowRight,
  BookOpen,
  Microscope,
  Library,
  Languages as LanguagesIcon,
  Palette,
  Music,
  GraduationCap,
  Leaf,
  Sun,
  Sprout,
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
    band: 'Lower Primary',
    grades: 'Grades 1–4',
    ages: 'Ages 6–9',
    milestones: 'Foundational literacy, numeracy, and a love for learning',
  },
  {
    band: 'Upper Primary',
    grades: 'Grades 5–6',
    ages: 'Ages 10–11',
    milestones: 'Deeper subject knowledge and focused Grade 6 national exam preparation',
  },
  {
    band: 'Junior Secondary',
    grades: 'Grades 7–8',
    ages: 'Ages 12–14',
    milestones: 'Scientific inquiry in our biology lab and rigorous Grade 8 exam readiness',
  },
]

const SCIENCE_FEATURES = [
  {
    icon: Microscope,
    title: 'Biology Laboratory',
    description:
      'Our flagship lab gives Grades 7–8 hands-on time with microscopes, plant and animal specimens, and real experiments that bring the textbook to life.',
  },
  {
    icon: Leaf,
    title: 'Nature & Observation',
    description:
      'Students observe local plants, insects, and weather patterns — learning science by studying the world just outside our classroom doors.',
  },
  {
    icon: Sprout,
    title: 'Environment Club Projects',
    description:
      'From composting to a small school garden, our students learn sustainability and the science of caring for our corner of Addis Ababa.',
  },
  {
    icon: Sun,
    title: 'Science Fair & Discovery',
    description:
      'Every year, students choose a question they care about — from clean water to healthy soil — and present their findings at our annual science fair.',
  },
]

const LANGUAGES = [
  {
    name: 'English',
    icon: BookOpen,
    level: 'Primary Language of Instruction',
    description:
      'English is used across all subjects from Grade 1, with daily reading, writing, and speaking practice throughout the school.',
    proficiency: 95,
  },
  {
    name: 'Amharic',
    icon: LanguagesIcon,
    level: 'Core Subject (Daily)',
    description:
      'Amharic is taught every day as a core subject — covering reading, writing, grammar, and Ethiopian literature and culture.',
    proficiency: 95,
  },
  {
    name: 'French',
    icon: LanguagesIcon,
    level: 'Optional from Grade 5',
    description:
      'Students who wish to study a third language can choose French from Grade 5, building conversational skills and cultural awareness.',
    proficiency: 65,
  },
]

const LABS = [
  {
    name: 'Biology Laboratory',
    iconName: 'Microscope',
    description:
      'Our only dedicated science lab — equipped with compound and stereo microscopes, slides, preserved specimens, and simple experiment kits. Every Grade 7–8 student uses it weekly.',
    equipment: ['Microscopes ×15', 'Prepared slides', 'Plant & animal specimens', 'Simple experiment kits'],
  },
]

const ARTS_FEATURES = [
  {
    icon: Music,
    title: 'Music & Singing',
    description:
      'Our music club learns traditional Ethiopian songs alongside simple recorder and keyboard — performing at school assemblies and holiday events.',
  },
  {
    icon: Palette,
    title: 'Visual Arts',
    description:
      'Drawing, painting, and crafts using locally available materials — with a small exhibition at the end of every term.',
  },
  {
    icon: BookOpen,
    title: 'Drama & Storytelling',
    description:
      'Our drama club rehearses short plays and oral storytelling — often drawing on Ethiopian folktales and history.',
  },
]

export function AcademicsPage() {
  const goPage = useNav((s) => s.goPage)

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Academics"
        title="A curriculum that grows with every student"
        description="From first letters and numbers in Grade 1 to the Grade 8 national examination, our academic program balances strong foundations, curiosity, and genuine care for each child."
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
              title="Three stages, one caring journey"
              description="Our Grades 1–8 curriculum builds understanding year after year — weaving together literacy, numeracy, scientific curiosity, and strong character."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              title="A clear path from Grade 1 to Grade 8"
              description="Each stage is thoughtfully designed to match the developmental milestones, academic goals, and growing needs of our students."
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
              title="Six departments, one shared standard of care"
              description="Our six departments work together across all grade levels to ensure continuity, depth, and a coherent learning experience for every student."
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
              title="A balanced academic menu"
              description="Eleven subject areas spanning sciences, languages, social studies, arts, and physical education — aligned with the Ethiopian national curriculum."
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

      {/* Science & Discovery */}
      <section className="paper-texture relative overflow-hidden py-20 sm:py-24">
        <div className="geo-pattern pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative grid items-center gap-10 rounded-sm border border-gold/18 bg-paper p-8 shadow-lg sm:p-12 lg:grid-cols-2">
              {/* Corner ornaments */}
              <div className="absolute left-4 top-4 size-3 border-l border-t border-gold/40" />
              <div className="absolute right-4 top-4 size-3 border-r border-t border-gold/40" />
              <div className="absolute bottom-4 left-4 size-3 border-b border-l border-gold/40" />
              <div className="absolute bottom-4 right-4 size-3 border-b border-r border-gold/40" />
              <div>
                <p className="section-label">Science &amp; Discovery</p>
                <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  Where curiosity meets the <em className="italic text-gold-deep">natural world</em>
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  At Hamza, science is hands-on. From observing plants in our
                  garden to using microscopes in our biology lab, students learn
                  science by doing — asking questions about the world around them
                  in Addis Ababa and beyond.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {SCIENCE_FEATURES.map((feature) => (
                    <div key={feature.title} className="flex gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest text-gold-light">
                        <feature.icon className="size-5" />
                      </div>
                      <div>
                        <div className="font-serif text-sm font-semibold text-foreground">{feature.title}</div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <SmartImage
                  seed="academics-science-discovery"
                  alt="Students observing plants and using microscopes in the biology lab"
                  icon="Microscope"
                  label="Biology Lab & Discovery"
                  className="aspect-[4/3] w-full"
                />
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
              eyebrow="Languages"
              title="English, Amharic, and a window to the world"
              description="Our language program builds strong literacy in English and Amharic — with French available as an optional third language from Grade 5."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    alt="Hamza reading corner with storybooks and quiet study tables"
                    icon="Library"
                    label="Reading Corner"
                    className="h-full min-h-64 w-full rounded-none"
                  />
                </div>
                <div className="p-8 sm:p-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    The Reading Corner
                  </span>
                  <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                    Our School Reading Corner
                  </h2>
                  <p className="mt-4 text-base text-muted-foreground">
                    A cozy, welcoming corner of our campus with storybooks, Amharic and
                    English readers, reference texts, and quiet study spaces. Staffed by
                    a caring librarian, it is one of the most loved spots in the school —
                    and the heart of our reading culture.
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      '3,000+ storybooks & readers',
                      'Amharic & English collections',
                      'Quiet study tables',
                      'Weekly library period for every class',
                      'Reading club meetings',
                      'Open before and after school',
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
              title="Hands-on science in our biology lab"
              description="Our biology laboratory gives Grades 7–8 students real, hands-on experience with microscopes, specimens, and simple experiments — bringing science off the page and into their hands."
            />
          </Reveal>
          <div className="mt-12 grid max-w-2xl gap-6">
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
                        alt="Students singing, painting, and performing short plays at Hamza School"
                        icon="Music"
                        label="Music, Art & Drama"
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
            <div className="relative overflow-hidden rounded-sm p-8 text-cream sm:p-12" style={{ background: 'linear-gradient(135deg, #0F2530 0%, #1B3A4B 50%, #1F3D2F 100%)' }}>
              <div className="geo-pattern pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="section-label text-gold-light">Visit Us This Term</p>
                  <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
                    Begin your child's <em className="italic text-gold-light">academic journey</em> with us
                  </h2>
                  <p className="mt-3 text-base text-cream/80 sm:text-lg">
                    Explore our programs in person. Schedule a personalized tour and see
                    our classrooms, biology lab, and reading corner in action.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 gap-2.5 rounded-sm bg-gold-deep px-8 text-xs font-medium uppercase tracking-[0.12em] text-cream hover:bg-gold"
                    onClick={() => goPage('contact')}
                  >
                    Book a Visit
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
