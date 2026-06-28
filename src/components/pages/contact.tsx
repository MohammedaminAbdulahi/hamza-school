'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
  MessageSquare,
  Building2,
  GraduationCap,
  Calculator,
  Bus,
} from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { useNav } from '@/lib/nav-store'
import { SCHOOL } from '@/lib/data/school'
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

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: [SCHOOL.address],
    action: 'Get Directions',
    href: 'https://www.google.com/maps?q=Riverside%20CA',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: [SCHOOL.phone, SCHOOL.altPhone],
    action: 'Call Now',
    href: `tel:${SCHOOL.phone.replace(/[^+\d]/g, '')}`,
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: [SCHOOL.email, SCHOOL.admissionsEmail],
    action: 'Send Email',
    href: `mailto:${SCHOOL.email}`,
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: [SCHOOL.hours, 'Sat – Sun: Closed'],
    action: '',
    href: '',
  },
]

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: Facebook, url: SCHOOL.social.facebook, color: 'hover:bg-blue-600 hover:border-blue-600' },
  { name: 'Twitter', icon: Twitter, url: SCHOOL.social.twitter, color: 'hover:bg-sky-500 hover:border-sky-500' },
  { name: 'Instagram', icon: Instagram, url: SCHOOL.social.instagram, color: 'hover:bg-rose-500 hover:border-rose-500' },
  { name: 'YouTube', icon: Youtube, url: SCHOOL.social.youtube, color: 'hover:bg-red-600 hover:border-red-600' },
  { name: 'LinkedIn', icon: Linkedin, url: SCHOOL.social.linkedin, color: 'hover:bg-emerald-700 hover:border-emerald-700' },
]

const DEPARTMENTS = [
  {
    name: 'Admissions Office',
    icon: GraduationCap,
    email: SCHOOL.admissionsEmail,
    phone: '+1 (555) 248-1992',
    hours: 'Mon–Fri, 8 AM – 4 PM',
  },
  {
    name: 'Academic Office',
    icon: Building2,
    email: 'academics@hamzaschool.edu',
    phone: '+1 (555) 248-1993',
    hours: 'Mon–Fri, 7:30 AM – 4 PM',
  },
  {
    name: 'Accounts & Finance',
    icon: Calculator,
    email: 'accounts@hamzaschool.edu',
    phone: '+1 (555) 248-1994',
    hours: 'Mon–Fri, 9 AM – 3 PM',
  },
  {
    name: 'Transport Office',
    icon: Bus,
    email: 'transport@hamzaschool.edu',
    phone: '+1 (555) 248-1995',
    hours: 'Mon–Fri, 6:30 AM – 5 PM',
  },
]

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactPage() {
  const goPage = useNav((s) => s.goPage)
  const [form, setForm] = React.useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = React.useState(false)

  const update =
    (key: keyof ContactForm) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please complete all fields before sending.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success("Message sent! We'll reply within 24 hours.", {
        description: `Thanks ${form.name}, our team will be in touch shortly.`,
      })
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 900)
  }

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Contact"
        title="Get in Touch With Hamza"
        description="Questions about admissions, programs, or visiting campus? We'd love to hear from you. Reach out and we'll respond within one business day."
        seed="contact-hero"
        icon="Mail"
        breadcrumb="Contact"
      />

      {/* ===== CONTACT INFO CARDS ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Reach Us"
              title="How Can We Help?"
              description="Four easy ways to connect with the Hamza School community. Pick what works for you."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_INFO.map((info, i) => (
              <Reveal key={info.title} delay={i * 0.08}>
                <Card className="group h-full border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <info.icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold">
                      {info.title}
                    </h3>
                    <div className="mt-2 flex-1 space-y-1">
                      {info.lines.map((line) => (
                        <p
                          key={line}
                          className="text-sm text-muted-foreground"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    {info.action && info.href && (
                      <a
                        href={info.href}
                        target={
                          info.href.startsWith('http')
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          info.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        {info.action}
                        <ArrowRight className="size-3.5" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM + MAP ===== */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
            {/* Form */}
            <Reveal>
              <Card className="h-full border-primary/10 shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MessageSquare className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Send Us a Message
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We typically reply within 24 hours.
                      </p>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="e.g. Sarah Mitchell"
                          value={form.name}
                          onChange={update('name')}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-rose-500">*</span>
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Subject <span className="text-rose-500">*</span>
                      </Label>
                      <Select
                        value={form.subject}
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, subject: v }))
                        }
                      >
                        <SelectTrigger id="subject" className="w-full">
                          <SelectValue placeholder="Choose a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="Admissions">
                            Admissions
                          </SelectItem>
                          <SelectItem value="Careers">Careers</SelectItem>
                          <SelectItem value="Feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-rose-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="How can we help you today?"
                        value={form.message}
                        onChange={update('message')}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full bg-primary text-base shadow-lg shadow-primary/30 hover:bg-primary/90"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      {!submitting && <Send className="size-4" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Reveal>

            {/* Map + Socials */}
            <Reveal delay={0.12}>
              <div className="flex h-full flex-col gap-6">
                <Card className="flex-1 overflow-hidden border-primary/10">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 border-b px-6 py-4">
                      <MapPin className="size-5 text-primary" />
                      <div>
                        <h3 className="text-base font-semibold">
                          Find Us on the Map
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {SCHOOL.address}
                        </p>
                      </div>
                    </div>
                    <div className="aspect-[4/3] w-full sm:aspect-[16/12]">
                      <iframe
                        title="Hamza School location map"
                        src="https://www.google.com/maps?q=Riverside%20CA&output=embed"
                        className="size-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold">
                          Follow Hamza School
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Stay connected on social media.
                        </p>
                      </div>
                      <Badge className="bg-primary/10 text-primary">
                        @hamzaschool
                      </Badge>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {SOCIAL_LINKS.map((s) => (
                        <a
                          key={s.name}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.name}
                          className={`flex size-12 items-center justify-center rounded-xl border bg-card text-foreground transition-all hover:text-white ${s.color}`}
                        >
                          <s.icon className="size-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== DEPARTMENT CONTACTS ===== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Direct Lines"
              title="Department Contacts"
              description="Need to reach a specific team? Use these direct lines for faster, more tailored help."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="mt-12 overflow-hidden border-primary/10">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5 hover:bg-primary/5">
                    <TableHead className="pl-6 text-sm font-semibold uppercase tracking-wider text-primary">
                      Department
                    </TableHead>
                    <TableHead className="text-sm font-semibold uppercase tracking-wider text-primary">
                      Email
                    </TableHead>
                    <TableHead className="text-sm font-semibold uppercase tracking-wider text-primary">
                      Phone
                    </TableHead>
                    <TableHead className="hidden pr-6 text-sm font-semibold uppercase tracking-wider text-primary md:table-cell">
                      Hours
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEPARTMENTS.map((d) => (
                    <TableRow key={d.name} className="text-sm sm:text-base">
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <d.icon className="size-4.5" />
                          </div>
                          <span className="font-medium">{d.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <a
                          href={`mailto:${d.email}`}
                          className="text-primary hover:underline"
                        >
                          {d.email}
                        </a>
                      </TableCell>
                      <TableCell className="py-4 text-muted-foreground">
                        <a
                          href={`tel:${d.phone.replace(/[^+\d]/g, '')}`}
                          className="hover:text-primary hover:underline"
                        >
                          {d.phone}
                        </a>
                      </TableCell>
                      <TableCell className="hidden pr-6 py-4 text-muted-foreground md:table-cell">
                        {d.hours}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                  Ready to Apply?
                </Badge>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  Take the next step toward joining Hamza
                </h2>
                <p className="mt-4 text-base text-primary-foreground/85 sm:text-lg">
                  Explore our admissions process, book a tour, or start your
                  application today. We're here to help at every turn.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => goPage('admissions')}
                  className="h-12 bg-amber-400 px-7 text-base text-amber-950 shadow-xl hover:bg-amber-300"
                >
                  Start Application
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => goPage('about')}
                  className="h-12 border-white/40 bg-white/10 px-7 text-base text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                >
                  Learn About Us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
