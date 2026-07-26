'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  CheckCircle2,
  Download,
  CalendarCheck,
  ArrowRight,
  Wallet,
  HelpCircle,
  ClipboardCheck,
} from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { SmartImage } from '@/components/site/smart-image'
import { DynamicIcon } from '@/components/site/dynamic-icon'
import { useNav } from '@/lib/nav-store'
import {
  ADMISSION_STEPS,
  ADMISSION_REQUIREMENTS,
  TUITION,
  FAQS,
  SCHOOL,
} from '@/lib/data/school'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const GRADES = [
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
]

const DOWNLOAD_FORMS = [
  {
    title: 'Application Form PDF',
    description:
      'Complete the full admission application. Required for all new applicants.',
    icon: 'FileText',
    file: 'hamza-application-form.pdf',
  },
  {
    title: 'Medical Form PDF',
    description:
      'Student health history, immunization records, and emergency contacts.',
    icon: 'Stethoscope',
    file: 'hamza-medical-form.pdf',
  },
  {
    title: 'Transport Form PDF',
    description:
      'Opt-in to school bus service and select your route and pickup point.',
    icon: 'Bus',
    file: 'hamza-transport-form.pdf',
  },
  {
    title: 'Recommendation Form PDF',
    description:
      'To be completed by the student’s current teacher or school counselor.',
    icon: 'ClipboardList',
    file: 'hamza-recommendation-form.pdf',
  },
]

interface ApplicationForm {
  studentName: string
  dob: string
  grade: string
  parentName: string
  email: string
  phone: string
  address: string
  message: string
}

export function AdmissionsPage() {
  const goPage = useNav((s) => s.goPage)
  const [form, setForm] = React.useState<ApplicationForm>({
    studentName: '',
    dob: '',
    grade: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  })
  const [submitting, setSubmitting] = React.useState(false)

  const update =
    (key: keyof ApplicationForm) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !form.studentName ||
      !form.parentName ||
      !form.email ||
      !form.grade
    ) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success('Application submitted!', {
        description:
          'Our admissions office will contact you within 2 business days.',
      })
      setForm({
        studentName: '',
        dob: '',
        grade: '',
        parentName: '',
        email: '',
        phone: '',
        address: '',
        message: '',
      })
    }, 900)
  }

  const handleDownload = (fileName: string) => {
    toast.success('Download started', {
      description: `${fileName} is being downloaded.`,
    })
  }

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Admissions"
        title="Begin Your Hamza Journey"
        description="From your first hello to your child's first day of school — we make the admissions process warm, transparent, and supportive for every family in Addis Ababa."
        seed="admissions-hero"
        icon="GraduationCap"
        breadcrumb="Admissions"
      />

      {/* ===== ADMISSION REQUIREMENTS ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="What You'll Need"
                title="Admission Requirements"
                description="A simple checklist of documents and information to prepare before submitting your application for Grades 1–8."
              />
              <Card className="mt-8 border-primary/10 shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <ul className="space-y-4">
                    {ADMISSION_REQUIREMENTS.map((req, i) => (
                      <li key={req} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span className="text-sm sm:text-base text-foreground">
                          {req}
                        </span>
                        <Badge
                          variant="secondary"
                          className="ml-auto hidden shrink-0 sm:inline-flex"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative">
                <SmartImage
                  seed="admissions-requirements"
                  alt="Admissions welcome desk"
                  icon="ClipboardCheck"
                  label="Admissions Office"
                  className="aspect-[4/3] w-full"
                />
                <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border bg-card p-5 shadow-xl sm:block">
                  <p className="text-3xl font-bold text-primary">500 ETB</p>
                  <p className="text-sm text-muted-foreground">
                    Application Fee
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== ADMISSION PROCESS ===== */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="How to Apply"
              title="A Simple 5-Step Admission Process"
              description="From your first hello to your child's first day, our team walks alongside you at every stage."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {ADMISSION_STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="group relative h-full">
                  {i < ADMISSION_STEPS.length - 1 && (
                    <div
                      className="absolute left-[2.25rem] top-9 hidden h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary/40 to-transparent lg:block"
                      aria-hidden
                    />
                  )}
                  <Card className="h-full border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                    <CardContent className="flex h-full flex-col items-start p-6">
                      <div className="relative flex size-12 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/30">
                        {s.step}
                        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-amber-950">
                          ★
                        </span>
                      </div>
                      <h3 className="mt-5 text-base font-semibold">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {s.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TUITION INFORMATION ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Tuition & Fees"
              title="Transparent Tuition Information"
              description="An investment in your child's future. Termly tuition by grade level, with sibling discounts and flexible payment plans available."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-12 overflow-hidden border-primary/10">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5 hover:bg-primary/5">
                    <TableHead className="pl-6 text-sm font-semibold uppercase tracking-wider text-primary">
                      Grade Level
                    </TableHead>
                    <TableHead className="text-sm font-semibold uppercase tracking-wider text-primary">
                      Termly Tuition
                    </TableHead>
                    <TableHead className="pr-6 text-sm font-semibold uppercase tracking-wider text-primary">
                      Notes
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TUITION.map((t) => (
                    <TableRow key={t.grade} className="text-base">
                      <TableCell className="pl-6 py-4 font-medium">
                        {t.grade}
                      </TableCell>
                      <TableCell className="py-4 font-bold text-primary">
                        {t.annual}
                      </TableCell>
                      <TableCell className="pr-6 py-4 text-muted-foreground">
                        {t.note}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-6 grid gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/40 dark:bg-amber-950/20 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-amber-400 text-amber-950">
                <Wallet className="size-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-amber-950 dark:text-amber-100">
                  Sibling Discounts &amp; Flexible Payment Plans
                </h3>
                <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-100/70">
                  Families enrolling two or more children receive a 10% sibling
                  discount on tuition for the second and subsequent children.
                  Termly and monthly payment plans are also available — speak with
                  our accounts office to find a plan that works for your family.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ONLINE APPLICATION FORM ===== */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <Reveal>
              <SectionHeader
                align="left"
                eyebrow="Apply Online"
                title="Start Your Application"
                description="Complete the form below and our admissions team will reach out within 2 business days to schedule your campus visit."
              />
              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: ClipboardCheck,
                    title: 'Quick & Secure',
                    desc: 'Submit online in under 10 minutes. Your data is encrypted and never shared.',
                  },
                  {
                    icon: CalendarCheck,
                    title: 'Schedule a Tour',
                    desc: 'After submitting, you can book a personalized campus visit at your convenience.',
                  },
                  {
                    icon: HelpCircle,
                    title: 'Need Help?',
                    desc: `Call us at ${SCHOOL.phone} or email ${SCHOOL.admissionsEmail}.`,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <Card className="border-primary/10 shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="studentName">
                          Student Name <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="studentName"
                          placeholder="e.g. Amanuel Tesfaye"
                          value={form.studentName}
                          onChange={update('studentName')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={form.dob}
                          onChange={update('dob')}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">
                        Grade Applying For{' '}
                        <span className="text-rose-500">*</span>
                      </Label>
                      <Select
                        value={form.grade}
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, grade: v }))
                        }
                      >
                        <SelectTrigger id="grade" className="w-full">
                          <SelectValue placeholder="Select a grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADES.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="parentName">
                          Parent / Guardian Name{' '}
                          <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="parentName"
                          placeholder="e.g. Mr. Tesfaye Bekele"
                          value={form.parentName}
                          onChange={update('parentName')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="e.g. +251 91 234 5678"
                          value={form.phone}
                          onChange={update('phone')}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={update('email')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Home Address</Label>
                      <Textarea
                        id="address"
                        rows={2}
                        placeholder="Sub-city, woreda, house number, Addis Ababa"
                        value={form.address}
                        onChange={update('address')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Anything else we should know?
                      </Label>
                      <Textarea
                        id="message"
                        rows={3}
                        placeholder="Tell us about your child's interests, learning needs, or questions for our team."
                        value={form.message}
                        onChange={update('message')}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full bg-primary text-base shadow-lg shadow-primary/30 hover:bg-primary/90"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                      {!submitting && <ArrowRight className="size-4" />}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      By submitting, you agree to our privacy policy. We will
                      only use your information to process this application.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOADABLE FORMS ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Printable Forms"
              title="Downloadable Admission Forms"
              description="Prefer paper? Download any of our admission forms as a PDF. Print, complete, and bring to the admissions office."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DOWNLOAD_FORMS.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <Card className="group flex h-full flex-col border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <DynamicIcon name={d.icon} className="size-6" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold">{d.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {d.description}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-5 w-full"
                      onClick={() => handleDownload(d.file)}
                    >
                      <Download className="size-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Frequently Asked"
              title="Admissions FAQ"
              description="Answers to the questions parents ask us most. Can't find what you're looking for? Reach out to our team anytime."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-12 border-primary/10">
              <CardContent className="p-2 sm:p-4">
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((faq, i) => (
                    <AccordionItem
                      key={faq.q}
                      value={`item-${i}`}
                      className="px-2 sm:px-4"
                    >
                      <AccordionTrigger className="text-left text-base font-medium">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground sm:text-base">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400">
                  Visit Us
                </Badge>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  See the Hamza difference for yourself
                </h2>
                <p className="mt-4 text-base text-primary-foreground/85 sm:text-lg">
                  Book a personalized campus tour. Walk our halls, meet our
                  teachers, and imagine your child thriving here.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => goPage('contact')}
                  className="h-12 bg-amber-400 px-7 text-base text-amber-950 shadow-xl hover:bg-amber-300"
                >
                  Book a Tour
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => goPage('about')}
                  className="h-12 border-white/40 bg-white/10 px-7 text-base text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                >
                  About Us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
