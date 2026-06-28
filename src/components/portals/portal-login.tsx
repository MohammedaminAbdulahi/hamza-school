'use client'

import * as React from 'react'
import {
  GraduationCap,
  Users,
  UserCog,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  KeyRound,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Logo } from '@/components/site/logo'
import { SmartImage } from '@/components/site/smart-image'
import { useNav, type PortalRole } from '@/lib/nav-store'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const ROLE_CONFIG: Record<
  PortalRole,
  { label: string; icon: React.ElementType; tagline: string; seed: string; demo: { email: string; pass: string } }
> = {
  student: {
    label: 'Student Portal',
    icon: GraduationCap,
    tagline: 'Grades, assignments, attendance & schedule',
    seed: 'student-portal',
    demo: { email: 'student@hamza.edu', pass: 'student123' },
  },
  parent: {
    label: 'Parent Portal',
    icon: Users,
    tagline: 'Track your child’s progress and fees',
    seed: 'parent-portal',
    demo: { email: 'parent@hamza.edu', pass: 'parent123' },
  },
  teacher: {
    label: 'Teacher Portal',
    icon: UserCog,
    tagline: 'Manage classes, grades & attendance',
    seed: 'teacher-portal',
    demo: { email: 'teacher@hamza.edu', pass: 'teacher123' },
  },
  admin: {
    label: 'Admin Panel',
    icon: ShieldCheck,
    tagline: 'School administration & analytics',
    seed: 'admin-portal',
    demo: { email: 'admin@hamza.edu', pass: 'admin123' },
  },
}

export function PortalLogin() {
  const view = useNav((s) => s.view)
  const goHome = useNav((s) => s.goHome)
  const enterPortal = useNav((s) => s.enterPortal)
  const loginAs = useNav((s) => s.loginAs)

  const role: PortalRole = view.kind === 'portal-login' ? view.role : 'student'
  const config = ROLE_CONFIG[role]

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPass, setShowPass] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      loginAs(role, email.split('@')[0] || role)
      toast.success(`Welcome back!`, {
        description: `Signed in to the ${config.label}.`,
      })
      enterPortal(role)
    }, 800)
  }

  const fillDemo = () => {
    setEmail(config.demo.email)
    setPassword(config.demo.pass)
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 -z-10">
        <SmartImage
          seed={config.seed}
          alt=""
          icon="Lock"
          rounded="rounded-none"
          className="h-full w-full opacity-90"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <button
          onClick={goHome}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </button>

        <Card className="overflow-hidden border-0 shadow-2xl">
          <div className="bg-primary p-6 text-center text-primary-foreground">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <config.icon className="size-7" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">{config.label}</h1>
            <p className="mt-1 text-sm text-primary-foreground/80">{config.tagline}</p>
          </div>
          <CardContent className="p-6 sm:p-7">
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hamza.edu"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="px-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="size-4 rounded border-border accent-primary" />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Keep me signed in
                </Label>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary shadow-md shadow-primary/20"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight className="size-4" />}
              </Button>
            </form>

            <div className="mt-5 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <KeyRound className="size-3.5" /> Demo Credentials
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {config.demo.email} · {config.demo.pass}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={fillDemo}
                className="mt-1.5 h-7 px-2 text-xs text-primary"
              >
                Auto-fill demo login
              </Button>
            </div>

            <div className="mt-5 border-t pt-4">
              <p className="text-center text-xs text-muted-foreground">
                Switch portal:
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(Object.keys(ROLE_CONFIG) as PortalRole[]).map((r) => {
                  const rc = ROLE_CONFIG[r]
                  return (
                    <button
                      key={r}
                      onClick={() => useNav.getState().openPortalLogin(r)}
                      className={cn(
                        'flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                        r === role
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:bg-accent'
                      )}
                    >
                      <rc.icon className="size-3.5" />
                      {r}
                    </button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-white/70">
          <Lock className="size-3" />
          Protected by Hamza School secure authentication
        </p>
      </motion.div>
    </div>
  )
}
