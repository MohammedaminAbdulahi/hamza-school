'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  Plus,
  Search,
  Check,
  X,
  Clock,
  Send,
  Save,
  GraduationCap,
  Users,
  ClipboardList,
  TrendingUp,
  Calendar,
  MessageSquare,
  Megaphone,
  FileText,
  Bell,
} from 'lucide-react'
import {
  PortalShell,
  PortalStat,
  PortalSectionHeader,
  type PortalNavItem,
} from './portal-shell'
import { useNav } from '@/lib/nav-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

// ============================================================
// Mock data
// ============================================================

interface ClassInfo {
  id: string
  name: string
  grade: string
  period: string
  students: number
  room: string
  seed: string
}

const CLASSES: ClassInfo[] = [
  { id: 'c1', name: 'Algebra II', grade: 'Grade 10', period: 'Period 1 · 08:00–08:50', students: 28, room: 'Rm 204', seed: 'algebra-ii' },
  { id: 'c2', name: 'Pre-Calculus', grade: 'Grade 11', period: 'Period 2 · 09:00–09:50', students: 24, room: 'Rm 204', seed: 'pre-calc' },
  { id: 'c3', name: 'AP Calculus AB', grade: 'Grade 12', period: 'Period 3 · 10:00–10:50', students: 22, room: 'Rm 310', seed: 'ap-calc' },
  { id: 'c4', name: 'Geometry', grade: 'Grade 9', period: 'Period 5 · 12:00–12:50', students: 30, room: 'Rm 112', seed: 'geometry' },
  { id: 'c5', name: 'Statistics', grade: 'Grade 12', period: 'Period 6 · 13:00–13:50', students: 26, room: 'Rm 310', seed: 'statistics' },
  { id: 'c6', name: 'Math Lab', grade: 'Grade 9-12', period: 'Period 7 · 14:00–14:50', students: 12, room: 'Rm 105', seed: 'math-lab' },
]

interface Student {
  id: string
  name: string
  grade: string
  className: string
  email: string
  attendance: number
  gpa: number
}

const STUDENTS: Student[] = [
  { id: 's1', name: 'Aisha Rahman', grade: '10', className: 'Algebra II', email: 'aisha.r@hamza.edu', attendance: 96, gpa: 3.8 },
  { id: 's2', name: 'Brandon Lee', grade: '10', className: 'Algebra II', email: 'brandon.l@hamza.edu', attendance: 92, gpa: 3.5 },
  { id: 's3', name: 'Clara Mendez', grade: '11', className: 'Pre-Calculus', email: 'clara.m@hamza.edu', attendance: 98, gpa: 4.0 },
  { id: 's4', name: 'Daniel Okoye', grade: '11', className: 'Pre-Calculus', email: 'daniel.o@hamza.edu', attendance: 89, gpa: 3.2 },
  { id: 's5', name: 'Elena Petrov', grade: '12', className: 'AP Calculus AB', email: 'elena.p@hamza.edu', attendance: 100, gpa: 4.0 },
  { id: 's6', name: 'Farhan Iqbal', grade: '12', className: 'AP Calculus AB', email: 'farhan.i@hamza.edu', attendance: 94, gpa: 3.7 },
  { id: 's7', name: 'Grace O\u2019Neil', grade: '9', className: 'Geometry', email: 'grace.o@hamza.edu', attendance: 91, gpa: 3.3 },
  { id: 's8', name: 'Hiro Tanaka', grade: '9', className: 'Geometry', email: 'hiro.t@hamza.edu', attendance: 87, gpa: 3.1 },
  { id: 's9', name: 'Isabella Cruz', grade: '12', className: 'Statistics', email: 'isabella.c@hamza.edu', attendance: 95, gpa: 3.9 },
  { id: 's10', name: 'Jamal Davis', grade: '12', className: 'Statistics', email: 'jamal.d@hamza.edu', attendance: 90, gpa: 3.4 },
  { id: 's11', name: 'Kavya Patel', grade: '10', className: 'Algebra II', email: 'kavya.p@hamza.edu', attendance: 97, gpa: 3.8 },
  { id: 's12', name: 'Liam Walsh', grade: '11', className: 'Pre-Calculus', email: 'liam.w@hamza.edu', attendance: 85, gpa: 3.0 },
  { id: 's13', name: 'Maya Singh', grade: '12', className: 'AP Calculus AB', email: 'maya.s@hamza.edu', attendance: 99, gpa: 4.0 },
  { id: 's14', name: 'Noah Kim', grade: '9', className: 'Geometry', email: 'noah.k@hamza.edu', attendance: 93, gpa: 3.4 },
  { id: 's15', name: 'Olivia Brooks', grade: '12', className: 'Statistics', email: 'olivia.b@hamza.edu', attendance: 88, gpa: 3.2 },
  { id: 's16', name: 'Pablo Reyes', grade: '10', className: 'Algebra II', email: 'pablo.r@hamza.edu', attendance: 94, gpa: 3.6 },
  { id: 's17', name: 'Qing Wei', grade: '11', className: 'Pre-Calculus', email: 'qing.w@hamza.edu', attendance: 96, gpa: 3.9 },
  { id: 's18', name: 'Rashid Ali', grade: '12', className: 'AP Calculus AB', email: 'rashid.a@hamza.edu', attendance: 92, gpa: 3.7 },
  { id: 's19', name: 'Sofia Marin', grade: '9', className: 'Geometry', email: 'sofia.m@hamza.edu', attendance: 90, gpa: 3.3 },
  { id: 's20', name: 'Tariq Hassan', grade: '12', className: 'Statistics', email: 'tariq.h@hamza.edu', attendance: 97, gpa: 3.9 },
  { id: 's21', name: 'Uma Patel', grade: '10', className: 'Algebra II', email: 'uma.p@hamza.edu', attendance: 91, gpa: 3.5 },
  { id: 's22', name: 'Victor Chen', grade: '11', className: 'Pre-Calculus', email: 'victor.c@hamza.edu', attendance: 88, gpa: 3.1 },
]

const SCHEDULE_TODAY = [
  { time: '08:00', class: 'Algebra II', room: 'Rm 204', students: 28 },
  { time: '09:00', class: 'Pre-Calculus', room: 'Rm 204', students: 24 },
  { time: '10:00', class: 'AP Calculus AB', room: 'Rm 310', students: 22 },
  { time: '12:00', class: 'Geometry', room: 'Rm 112', students: 30 },
  { time: '13:00', class: 'Statistics', room: 'Rm 310', students: 26 },
]

const ASSIGNMENTS_TO_GRADE = [
  { id: 'a1', title: 'Quadratic Equations Quiz', class: 'Algebra II', submissions: 26, total: 28, due: 'Apr 12' },
  { id: 'a2', title: 'Limits Worksheet', class: 'AP Calculus AB', submissions: 22, total: 22, due: 'Apr 11' },
  { id: 'a3', title: 'Triangle Proofs', class: 'Geometry', submissions: 28, total: 30, due: 'Apr 10' },
  { id: 'a4', title: 'Probability Set', class: 'Statistics', submissions: 20, total: 26, due: 'Apr 09' },
]

const ASSIGNMENTS_LIST = [
  { id: 'a1', title: 'Quadratic Equations Quiz', class: 'Algebra II', due: 'Apr 12, 2025', submissions: 26, total: 28, points: 50, status: 'Grading' },
  { id: 'a2', title: 'Limits Worksheet', class: 'AP Calculus AB', due: 'Apr 11, 2025', submissions: 22, total: 22, points: 30, status: 'Grading' },
  { id: 'a3', title: 'Triangle Proofs', class: 'Geometry', due: 'Apr 10, 2025', submissions: 28, total: 30, points: 40, status: 'Open' },
  { id: 'a4', title: 'Probability Set', class: 'Statistics', due: 'Apr 09, 2025', submissions: 20, total: 26, points: 35, status: 'Open' },
  { id: 'a5', title: 'Trig Identities Test', class: 'Pre-Calculus', due: 'Apr 05, 2025', submissions: 24, total: 24, points: 100, status: 'Closed' },
  { id: 'a6', title: 'Chapter 4 Homework', class: 'Algebra II', due: 'Apr 02, 2025', submissions: 28, total: 28, points: 20, status: 'Closed' },
]

const EXAMS = [
  { id: 'e1', name: 'Midterm Exam — Algebra II', class: 'Algebra II', date: 'Apr 22, 2025', time: '09:00', room: 'Rm 204', marks: 100 },
  { id: 'e2', name: 'Calculus Midterm', class: 'AP Calculus AB', date: 'Apr 24, 2025', time: '10:00', room: 'Rm 310', marks: 100 },
  { id: 'e3', name: 'Geometry Unit Test', class: 'Geometry', date: 'Apr 28, 2025', time: '12:00', room: 'Rm 112', marks: 80 },
  { id: 'e4', name: 'Statistics Final', class: 'Statistics', date: 'May 02, 2025', time: '13:00', room: 'Rm 310', marks: 120 },
]

const ANNOUNCEMENTS = [
  { id: 'an1', title: 'Extra tutoring sessions this week', audience: 'All Students', date: 'Apr 08', body: 'I will be available in Rm 310 after school on Tuesday and Thursday for extra help with calculus concepts before the midterm.' },
  { id: 'an2', title: 'Quiz rescheduled', audience: 'Algebra II', date: 'Apr 06', body: 'The Quadratic Equations quiz has been moved to Friday. Please review chapters 4.1–4.3.' },
  { id: 'an3', title: 'Parent-teacher conference signups', audience: 'Parents', date: 'Apr 03', body: 'Conference slots are now open for May 1st. Please use the parent portal to reserve a 15-minute slot.' },
]

const MESSAGES = [
  { id: 'm1', from: 'Aisha Rahman', subject: 'Question about homework', preview: 'Hi Ms. Carter, I had a question about problem 7 on the...', time: '2h ago', unread: true },
  { id: 'm2', from: 'Daniel Okoye', subject: 'Absence tomorrow', preview: 'I will be missing class tomorrow for a doctor\u2019s appointment...', time: '5h ago', unread: true },
  { id: 'm3', from: 'Mrs. Petrov (Parent)', subject: 'Elena\u2019s progress', preview: 'Thank you for the recent update. We wanted to discuss...', time: '1d ago', unread: false },
  { id: 'm4', from: 'Farhan Iqbal', subject: 'Extra credit opportunity', preview: 'Is there any extra credit work I could do to bring my...', time: '2d ago', unread: false },
  { id: 'm5', from: 'Mr. Brooks (Parent)', subject: 'Meeting request', preview: 'Could we schedule a brief call to discuss Olivia\u2019s...', time: '3d ago', unread: false },
]

const NOTIFICATIONS = [
  { title: 'New submission from Aisha Rahman', time: '5 min ago' },
  { title: 'Parent message from Mrs. Petrov', time: '2 hours ago' },
  { title: 'Faculty meeting reminder at 3:30 PM', time: '4 hours ago' },
  { title: 'Quarterly grades due Friday', time: '1 day ago' },
]

// ============================================================
// Main component
// ============================================================

const NAV_ITEMS: PortalNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'classes', label: 'Classes', icon: 'BookOpen', badge: 6 },
  { id: 'attendance', label: 'Attendance', icon: 'ClipboardCheck' },
  { id: 'assignments', label: 'Assignments', icon: 'FileText', badge: 18 },
  { id: 'grades', label: 'Grades', icon: 'GraduationCap' },
  { id: 'exams', label: 'Exams', icon: 'FileBadge' },
  { id: 'students', label: 'Students', icon: 'Users' },
  { id: 'announcements', label: 'Announcements', icon: 'Megaphone' },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare', badge: 2 },
  { id: 'profile', label: 'Profile', icon: 'UserCog' },
]

export function TeacherPortal() {
  const session = useNav((s) => s.session)
  const userName = session?.name ?? 'Ms. Emily Carter'
  const [active, setActive] = React.useState('dashboard')

  return (
    <PortalShell
      role="teacher"
      title="Teacher Portal"
      navItems={NAV_ITEMS}
      activeSection={active}
      onSectionChange={setActive}
      userName={userName}
      userMeta="Mathematics · Grades 9-12"
      notifications={NOTIFICATIONS}
    >
      {active === 'dashboard' && <DashboardSection />}
      {active === 'classes' && <ClassesSection />}
      {active === 'attendance' && <AttendanceSection />}
      {active === 'assignments' && <AssignmentsSection />}
      {active === 'grades' && <GradesSection />}
      {active === 'exams' && <ExamsSection />}
      {active === 'students' && <StudentsSection />}
      {active === 'announcements' && <AnnouncementsSection />}
      {active === 'messages' && <MessagesSection />}
      {active === 'profile' && <ProfileSection userName={userName} />}
    </PortalShell>
  )
}

// ============================================================
// Dashboard
// ============================================================

function DashboardSection() {
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Welcome back, Ms. Carter"
        description="Here's what's happening with your classes today."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PortalStat label="Active Classes" value="6" icon="BookOpen" trend="2 today" accent="primary" />
        <PortalStat label="Total Students" value="142" icon="Users" trend="+4 this term" accent="teal" />
        <PortalStat label="Assignments to Grade" value="18" icon="ClipboardList" accent="amber" />
        <PortalStat label="Avg Class Score" value="84%" icon="TrendingUp" trend="+3%" accent="primary" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="size-5 text-primary" /> Today's Schedule
            </CardTitle>
            <CardDescription>Monday, April 14, 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {SCHEDULE_TODAY.map((s) => (
              <div
                key={s.time}
                className="flex items-center gap-4 rounded-lg border bg-muted/30 p-3 transition-colors hover:bg-muted/60"
              >
                <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="text-[10px] font-semibold uppercase">Period</span>
                  <span className="text-sm font-bold">{Number(s.time.split(':')[0]) - 7}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{s.class}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.time} · {s.room} · {s.students} students
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardList className="size-5 text-amber-600" /> Needs Grading
            </CardTitle>
            <CardDescription>Recent submissions awaiting review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ASSIGNMENTS_TO_GRADE.map((a) => (
              <div key={a.id} className="rounded-lg border p-3">
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.class}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px]">
                    {a.submissions}/{a.total} submitted
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => toast.success(`Opening ${a.title} for grading`)}
                  >
                    Grade
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Megaphone className="size-5 text-primary" /> Recent Announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {ANNOUNCEMENTS.map((a) => (
            <div key={a.id} className="rounded-lg border bg-muted/20 p-4">
              <div className="mb-2 flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">{a.audience}</Badge>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
              <p className="text-sm font-semibold">{a.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// Classes
// ============================================================

function ClassesSection() {
  const [selected, setSelected] = React.useState<ClassInfo | null>(null)
  const roster = React.useMemo(() => STUDENTS.filter((s) => s.className === selected?.name), [selected])

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="My Classes"
        description="Click a class card to view the full roster and details."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CLASSES.map((c) => (
          <Dialog key={c.id}>
            <Card
              className="cursor-pointer transition-all hover:border-primary/40 hover:shadow-md"
              onClick={() => setSelected(c)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{c.name}</CardTitle>
                    <CardDescription className="text-xs">{c.grade}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{c.room}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" /> {c.period}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" /> {c.students} students enrolled
                </div>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    View Roster
                  </Button>
                </DialogTrigger>
              </CardContent>
            </Card>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <GraduationCap className="size-5 text-primary" />
                  {c.name} — Roster
                </DialogTitle>
                <DialogDescription>
                  {c.grade} · {c.period} · {c.room} · {roster.length} students
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[400px] overflow-y-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>GPA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(roster.length ? roster : STUDENTS.slice(0, 8)).map((s, i) => (
                      <TableRow key={s.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="size-8">
                              <AvatarFallback className="bg-primary/10 text-xs text-primary">
                                {s.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{s.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          #{1000 + i + 1}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn('text-[10px]', s.attendance >= 95 ? 'text-emerald-600' : s.attendance >= 90 ? 'text-amber-600' : 'text-rose-600')}>
                            {s.attendance}%
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{s.gpa.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
                <Button onClick={() => toast.success(`Attendance sheet opened for ${c.name}`)}>Take Attendance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Attendance
// ============================================================

type AttendanceState = 'present' | 'absent' | 'late'

function AttendanceSection() {
  const [classId, setClassId] = React.useState('c1')
  const [date, setDate] = React.useState('2025-04-14')
  const roster = React.useMemo(() => STUDENTS.slice(0, 18), [])
  const [states, setStates] = React.useState<Record<string, AttendanceState>>(() =>
    Object.fromEntries(roster.map((s) => [s.id, 'present' as AttendanceState]))
  )

  const setStudent = (id: string, s: AttendanceState) =>
    setStates((prev) => ({ ...prev, [id]: s }))

  const presentCount = Object.values(states).filter((s) => s === 'present').length
  const absentCount = Object.values(states).filter((s) => s === 'absent').length
  const lateCount = Object.values(states).filter((s) => s === 'late').length

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Attendance"
        description="Mark attendance for each class. Changes are saved per session."
        action={
          <Button onClick={() => toast.success('Attendance saved!', { description: `${presentCount} present · ${lateCount} late · ${absentCount} absent` })}>
            <Save className="size-4" /> Save Attendance
          </Button>
        }
      />

      <Card>
        <CardContent className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
          <div>
            <Label className="text-xs">Class</Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger className="mt-1.5 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CLASSES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5" />
          </div>
          <div className="flex items-end gap-2">
            <Badge variant="secondary" className="text-emerald-600">{presentCount} Present</Badge>
            <Badge variant="secondary" className="text-amber-600">{lateCount} Late</Badge>
            <Badge variant="secondary" className="text-rose-600">{absentCount} Absent</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roster.map((s, i) => {
                  const st = states[s.id]
                  return (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-xs text-primary">
                              {s.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">#{1000 + i + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1.5">
                          <Button
                            size="sm"
                            variant={st === 'present' ? 'default' : 'outline'}
                            className="h-8 gap-1 px-2.5 text-xs"
                            onClick={() => setStudent(s.id, 'present')}
                          >
                            <Check className="size-3.5" /> Present
                          </Button>
                          <Button
                            size="sm"
                            variant={st === 'late' ? 'default' : 'outline'}
                            className={cn('h-8 gap-1 px-2.5 text-xs', st === 'late' && 'bg-amber-500 text-white hover:bg-amber-600')}
                            onClick={() => setStudent(s.id, 'late')}
                          >
                            <Clock className="size-3.5" /> Late
                          </Button>
                          <Button
                            size="sm"
                            variant={st === 'absent' ? 'default' : 'outline'}
                            className={cn('h-8 gap-1 px-2.5 text-xs', st === 'absent' && 'bg-rose-500 text-white hover:bg-rose-600')}
                            onClick={() => setStudent(s.id, 'absent')}
                          >
                            <X className="size-3.5" /> Absent
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// Assignments
// ============================================================

function AssignmentsSection() {
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({ title: '', class: '', due: '', points: '50', description: '' })

  const submit = () => {
    if (!form.title || !form.class) {
      toast.error('Please fill in the title and class')
      return
    }
    toast.success('Assignment created!', { description: `${form.title} → ${form.class}` })
    setForm({ title: '', class: '', due: '', points: '50', description: '' })
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Assignments"
        description="Create and track assignments across all your classes."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="size-4" /> Create Assignment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Assignment</DialogTitle>
                <DialogDescription>Fill in the details below to publish a new assignment.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Chapter 5 Homework" className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Class</Label>
                    <Select value={form.class} onValueChange={(v) => setForm({ ...form, class: v })}>
                      <SelectTrigger className="mt-1.5 w-full"><SelectValue placeholder="Select class" /></SelectTrigger>
                      <SelectContent>
                        {CLASSES.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <Input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label>Points</Label>
                  <Input type="number" value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} className="mt-1.5 max-w-32" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Assignment instructions..." className="mt-1.5" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit}>Publish Assignment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ASSIGNMENTS_LIST.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.class}</TableCell>
                    <TableCell className="text-sm">{a.due}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{a.submissions}/{a.total}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{a.points}</TableCell>
                    <TableCell>
                      <Badge variant={a.status === 'Open' ? 'default' : a.status === 'Grading' ? 'secondary' : 'outline'} className="text-[10px]">
                        {a.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                        onClick={() => toast.success(`Opening ${a.title} for grading`)}
                      >
                        Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// Grades
// ============================================================

function GradesSection() {
  const [classId, setClassId] = React.useState('c1')
  const [assignment, setAssignment] = React.useState('a1')
  const cls = CLASSES.find((c) => c.id === classId)!
  const roster = React.useMemo(() => STUDENTS.slice(0, 15), [])
  const [grades, setGrades] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(roster.map((s, i) => [s.id, String(75 + ((i * 7) % 25))]))
  )

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Grade Entry"
        description="Enter grades for an assignment. Click Save to commit."
        action={
          <Button onClick={() => toast.success('Grades saved!', { description: `${roster.length} students graded for ${cls.name}` })}>
            <Save className="size-4" /> Save Grades
          </Button>
        }
      />

      <Card>
        <CardContent className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Class</Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CLASSES.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Assignment</Label>
            <Select value={assignment} onValueChange={setAssignment}>
              <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ASSIGNMENTS_LIST.map((a) => <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Grade (/100)</TableHead>
                  <TableHead>Letter</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roster.map((s, i) => {
                  const g = Number(grades[s.id] || 0)
                  const letter = g >= 90 ? 'A' : g >= 80 ? 'B' : g >= 70 ? 'C' : g >= 60 ? 'D' : 'F'
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">#{1000 + i + 1}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={grades[s.id]}
                          onChange={(e) => setGrades({ ...grades, [s.id]: e.target.value })}
                          className="h-8 w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          'text-[10px] font-semibold',
                          letter === 'A' ? 'text-emerald-600' : letter === 'B' ? 'text-teal-600' : letter === 'C' ? 'text-amber-600' : 'text-rose-600'
                        )}>
                          {letter}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// Exams
// ============================================================

function ExamsSection() {
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({ name: '', class: '', date: '', time: '', room: '', marks: '100' })

  const submit = () => {
    if (!form.name || !form.class) {
      toast.error('Please fill in the exam name and class')
      return
    }
    toast.success('Exam scheduled!', { description: form.name })
    setForm({ name: '', class: '', date: '', time: '', room: '', marks: '100' })
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Exams"
        description="Schedule and manage upcoming exams for your classes."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="size-4" /> Schedule Exam</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Exam</DialogTitle>
                <DialogDescription>Set the date, time, and room for the upcoming exam.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Exam Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Chapter 5 Test" className="mt-1.5" />
                </div>
                <div>
                  <Label>Class</Label>
                  <Select value={form.class} onValueChange={(v) => setForm({ ...form, class: v })}>
                    <SelectTrigger className="mt-1.5 w-full"><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      {CLASSES.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="mt-1.5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Room</Label>
                    <Input value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="e.g. Rm 204" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Total Marks</Label>
                    <Input type="number" value={form.marks} onChange={(e) => setForm({ ...form, marks: e.target.value })} className="mt-1.5" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit}>Schedule Exam</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {EXAMS.map((e) => (
          <Card key={e.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{e.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{e.class}</p>
                </div>
                <Badge variant="secondary" className="text-[10px]">{e.marks} marks</Badge>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="text-[10px] uppercase text-muted-foreground">Date</p>
                  <p className="font-medium">{e.date}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="text-[10px] uppercase text-muted-foreground">Time</p>
                  <p className="font-medium">{e.time}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="text-[10px] uppercase text-muted-foreground">Room</p>
                  <p className="font-medium">{e.room}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.success(`Editing ${e.name}`)}>Edit</Button>
                <Button variant="ghost" size="sm" className="text-rose-600" onClick={() => toast.success(`Exam cancelled: ${e.name}`)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// Students
// ============================================================

function StudentsSection() {
  const [query, setQuery] = React.useState('')
  const filtered = React.useMemo(() => {
    const q = query.toLowerCase()
    return STUDENTS.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.className.toLowerCase().includes(q) ||
      s.grade.includes(q)
    )
  }, [query])

  return (
    <div className="space-y-6">
      <PortalSectionHeader title="Student Directory" description={`${STUDENTS.length} students across your classes.`} />
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or class..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>GPA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      No students found matching &ldquo;{query}&rdquo;.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-xs text-primary">
                              {s.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{s.name}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">G{s.grade}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{s.className}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{s.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('text-[10px]', s.attendance >= 95 ? 'text-emerald-600' : s.attendance >= 90 ? 'text-amber-600' : 'text-rose-600')}>
                          {s.attendance}%
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{s.gpa.toFixed(1)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// Announcements
// ============================================================

function AnnouncementsSection() {
  const [form, setForm] = React.useState({ audience: 'All Students', title: '', body: '' })

  const submit = () => {
    if (!form.title || !form.body) {
      toast.error('Please fill in the title and body')
      return
    }
    toast.success('Announcement sent!', { description: `Audience: ${form.audience}` })
    setForm({ audience: 'All Students', title: '', body: '' })
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader title="Announcements" description="Send announcements to students, classes, or parents." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">New Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs">Audience</Label>
              <Select value={form.audience} onValueChange={(v) => setForm({ ...form, audience: v })}>
                <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Students">All Students</SelectItem>
                  <SelectItem value="Specific Class">Specific Class</SelectItem>
                  <SelectItem value="Parents">Parents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Announcement title" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-xs">Body</Label>
              <Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} placeholder="Write your announcement..." className="mt-1.5" />
            </div>
            <Button className="w-full" onClick={submit}>
              <Send className="size-4" /> Send Announcement
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Past Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ANNOUNCEMENTS.map((a) => (
              <div key={a.id} className="rounded-lg border bg-muted/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">{a.audience}</Badge>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================================
// Messages
// ============================================================

function MessagesSection() {
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({ recipient: '', subject: '', body: '' })

  const submit = () => {
    if (!form.recipient || !form.subject) {
      toast.error('Please add a recipient and subject')
      return
    }
    toast.success('Message sent!', { description: `To: ${form.recipient}` })
    setForm({ recipient: '', subject: '', body: '' })
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Messages"
        description="Inbox of messages from students and parents."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="size-4" /> Compose</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compose Message</DialogTitle>
                <DialogDescription>Send a message to a student or parent.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Recipient</Label>
                  <Input value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} placeholder="Name or email" className="mt-1.5" />
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} className="mt-1.5" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit}>Send</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {MESSAGES.map((m) => (
              <div key={m.id} className={cn('flex items-start gap-4 p-4 transition-colors hover:bg-muted/30', m.unread && 'bg-primary/5')}>
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {m.from.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={cn('text-sm', m.unread ? 'font-semibold' : 'font-medium')}>{m.from}</p>
                    <span className="text-xs text-muted-foreground">{m.time}</span>
                  </div>
                  <p className={cn('text-sm', m.unread ? 'font-medium' : 'text-muted-foreground')}>{m.subject}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{m.preview}</p>
                </div>
                {m.unread && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// Profile
// ============================================================

function ProfileSection({ userName }: { userName: string }) {
  const [form, setForm] = React.useState({
    name: userName,
    email: 'emily.carter@hamza.edu',
    phone: '+1 (555) 872-4410',
    office: 'Mon–Fri, 3:00 PM – 4:30 PM in Rm 310',
    bio: 'Mathematics educator with 12 years of experience teaching Algebra through AP Calculus. Passionate about helping students build quantitative confidence and problem-solving skills.',
  })

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Profile Settings"
        description="Update your contact information and office hours."
        action={
          <Button onClick={() => toast.success('Profile saved!')}>
            <Save className="size-4" /> Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <Avatar className="size-24 border-4 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-teal-500 to-emerald-700 text-2xl font-bold text-white">
                {userName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </AvatarFallback>
            </Avatar>
            <p className="mt-4 text-lg font-semibold">{userName}</p>
            <p className="text-sm text-muted-foreground">Mathematics · Grades 9-12</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-[10px]">Faculty</Badge>
              <Badge variant="secondary" className="text-[10px]">Math Dept</Badge>
              <Badge variant="secondary" className="text-[10px]">10+ yrs</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs">Full Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs">Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs">Office Hours</Label>
                <Input value={form.office} onChange={(e) => setForm({ ...form, office: e.target.value })} className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label className="text-xs">Bio</Label>
              <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="mt-1.5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
