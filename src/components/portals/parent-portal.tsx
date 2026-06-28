'use client'

import * as React from 'react'
import { toast } from 'sonner'
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
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  PortalShell,
  PortalStat,
  PortalSectionHeader,
  type PortalNavItem,
} from '@/components/portals/portal-shell'
import { DynamicIcon } from '@/components/site/dynamic-icon'
import { useNav } from '@/lib/nav-store'
import { cn } from '@/lib/utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from 'recharts'

// ----------------------------------------------------------------------------
// Mock data — Sarah Mitchell (parent of Alex Morgan, Grade 10)
// ----------------------------------------------------------------------------

const CHILDREN = [
  { id: 1, name: 'Alex Morgan', grade: 'Grade 10', house: 'Cedar', gpa: 3.8, initials: 'AM' },
  { id: 2, name: 'Emma Morgan', grade: 'Grade 7', house: 'Oak', gpa: 3.6, initials: 'EM' },
]

const SUBJECTS = [
  { name: 'Mathematics', teacher: 'Mr. Daniel Carter', q1: 88, q2: 92, q3: 90, final: 91, letter: 'A' },
  { name: 'English Literature', teacher: 'Ms. Olivia Bennett', q1: 85, q2: 87, q3: 89, final: 87, letter: 'B+' },
  { name: 'Physics', teacher: 'Dr. Sami Rahman', q1: 92, q2: 94, q3: 91, final: 93, letter: 'A' },
  { name: 'Biology', teacher: 'Ms. Priya Shah', q1: 79, q2: 83, q3: 86, final: 84, letter: 'B' },
  { name: 'World History', teacher: 'Mr. James Whitfield', q1: 90, q2: 88, q3: 92, final: 90, letter: 'A-' },
  { name: 'Chemistry', teacher: 'Dr. Hana Khaled', q1: 84, q2: 86, q3: 88, final: 86, letter: 'B+' },
  { name: 'Computer Science', teacher: 'Mr. Yusuf Adeyemi', q1: 95, q2: 97, q3: 96, final: 96, letter: 'A+' },
  { name: 'Physical Education', teacher: 'Coach Lisa Moore', q1: 100, q2: 100, q3: 100, final: 100, letter: 'A+' },
]

const GPA_TREND = [
  { term: 'Term 1', gpa: 3.5 },
  { term: 'Term 2', gpa: 3.6 },
  { term: 'Term 3', gpa: 3.8 },
  { term: 'Term 4', gpa: 3.7 },
  { term: 'Term 5', gpa: 3.8 },
  { term: 'Term 6', gpa: 3.9 },
]

const ATTENDANCE_MONTH = [
  { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'present' },
  { day: 4, status: 'weekend' }, { day: 5, status: 'weekend' }, { day: 6, status: 'present' },
  { day: 7, status: 'present' }, { day: 8, status: 'late' }, { day: 9, status: 'present' },
  { day: 10, status: 'present' }, { day: 11, status: 'weekend' }, { day: 12, status: 'weekend' },
  { day: 13, status: 'present' }, { day: 14, status: 'absent' }, { day: 15, status: 'present' },
  { day: 16, status: 'present' }, { day: 17, status: 'present' }, { day: 18, status: 'weekend' },
  { day: 19, status: 'weekend' }, { day: 20, status: 'present' }, { day: 21, status: 'present' },
  { day: 22, status: 'present' }, { day: 23, status: 'present' }, { day: 24, status: 'absent' },
  { day: 25, status: 'weekend' }, { day: 26, status: 'weekend' }, { day: 27, status: 'present' },
  { day: 28, status: 'present' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
  { day: 31, status: 'present' },
]

const ATTENDANCE_PIE = [
  { name: 'Present', value: 22, color: '#10b981' },
  { name: 'Late', value: 1, color: '#f59e0b' },
  { name: 'Absent', value: 2, color: '#f43f5e' },
]

const FEE_PAYMENTS = [
  { date: 'Sep 02, 2024', description: 'Tuition — Term 1', amount: 4500, status: 'Paid', method: 'Bank Transfer' },
  { date: 'Sep 02, 2024', description: 'Activity Fee (Annual)', amount: 350, status: 'Paid', method: 'Bank Transfer' },
  { date: 'Nov 28, 2024', description: 'Tuition — Term 2', amount: 4500, status: 'Paid', method: 'Credit Card' },
  { date: 'Feb 14, 2025', description: 'Tuition — Term 3', amount: 4500, status: 'Paid', method: 'Credit Card' },
  { date: 'Mar 15, 2025', description: 'Exam Registration Fee', amount: 120, status: 'Pending', method: '—' },
  { date: 'Apr 05, 2025', description: 'Yearbook & Graduation (due)', amount: 85, status: 'Pending', method: '—' },
]

const REPORTS = [
  { term: 'Term 1 Report Card', period: 'Sep – Nov 2024', gpa: 3.5, attendance: '94%', date: 'Dec 01, 2024' },
  { term: 'Term 2 Report Card', period: 'Dec 2024 – Feb 2025', gpa: 3.6, attendance: '95%', date: 'Mar 01, 2025' },
  { term: 'Term 3 Report Card', period: 'Mar – May 2025', gpa: 3.8, attendance: '96%', date: 'Draft (in progress)' },
]

const NOTIFICATIONS = [
  { id: 1, title: 'Absence recorded — March 14', type: 'Attendance', time: '2 hours ago', unread: true, body: 'Your child Alex Morgan was marked absent on March 14. If this is an error, please contact the attendance office.' },
  { id: 2, title: 'New grade: Computer Science — 29/30', type: 'Grades', time: '5 hours ago', unread: true, body: 'A new grade has been posted for Python Loop Exercises. Score: 29/30 (A). View the gradebook for details.' },
  { id: 3, title: 'Fee reminder: Exam Registration', type: 'Fees', time: '1 day ago', unread: true, body: 'A fee of $120 for exam registration is due by March 15, 2025. Please pay via the Fees section.' },
  { id: 4, title: 'Parent-Teacher Conference invite', type: 'Events', time: '2 days ago', unread: false, body: 'You are invited to the spring parent-teacher conference on March 22, 2025. RSVP through the portal.' },
  { id: 5, title: 'Grade update: English Literature', type: 'Grades', time: '3 days ago', unread: false, body: 'A new grade has been posted for Poetry Analysis. Score: 36/40 (B+).' },
  { id: 6, title: 'Spring Break notice', type: 'Events', time: '4 days ago', unread: false, body: 'School will be closed March 24–28 for spring break. Classes resume March 31.' },
]

const MESSAGES = [
  { id: 1, sender: 'Mr. Daniel Carter (Math)', subject: 'Alex doing great in class', preview: 'I wanted to share that Alex has shown remarkable improvement this term...', date: '2 hrs ago', body: 'Dear Ms. Mitchell,\n\nI wanted to share that Alex has shown remarkable improvement this term, especially in problem-solving. He consistently contributes to class discussions. With the midterm approaching, a bit of extra practice on quadratic equations would help solidify his understanding.\n\nFeel free to reach out if you have any questions.\n\nBest regards,\nMr. Carter\nMathematics Department' },
  { id: 2, sender: 'Ms. Olivia Bennett (English)', subject: 'Macbeth essay — revision plan', preview: 'Alex\'s essay shows promise but needs more textual evidence...', date: 'Yesterday', body: 'Hi Sarah,\n\nAlex\'s essay shows promise but needs more textual evidence. We\'ve discussed a revision plan and he seems motivated. I\'m confident the rewrite will be much stronger.\n\n— Ms. Bennett' },
  { id: 3, sender: 'Admin Office', subject: 'Parent-Teacher Conference', preview: 'Spring conferences scheduled for March 22. Please RSVP...', date: '2 days ago', body: 'Dear Parents,\n\nSpring parent-teacher conferences are scheduled for Saturday, March 22, 2025, from 9 AM to 1 PM. Each meeting slot is 10 minutes. Please RSVP and select your preferred time slots through the portal by March 18.\n\nAdmin Office' },
  { id: 4, sender: 'Coach Lisa Moore (PE)', subject: 'Track team selection', preview: 'Alex has been selected for the 400m relay team...', date: '3 days ago', body: 'Hi Sarah,\n\nAlex has been selected for the 400m relay team for the regional meet in April. Practices are Mon/Wed/Fri after school. Looking forward to a great season!\n\nCoach Moore' },
  { id: 5, sender: 'Dr. Sami Rahman (Physics)', subject: 'Lab safety reminder', preview: 'Closed-toe shoes required for all physics labs...', date: '5 days ago', body: 'Dear Parents,\n\nA gentle reminder that closed-toe shoes are required for all physics lab sessions. Please ensure your child comes prepared.\n\nDr. Rahman' },
]

const ANNOUNCEMENTS = [
  { title: 'Parent-Teacher Conference — March 22', date: 'Mar 12, 2025', category: 'Event', body: 'Spring parent-teacher conferences will be held on Saturday, March 22, from 9 AM to 1 PM. Each meeting slot is 10 minutes. Please RSVP and select your preferred time slots through the portal by March 18.' },
  { title: 'Spring Break — School Closed', date: 'Mar 10, 2025', category: 'Holiday', body: 'The school will be closed from March 24th to March 28th for spring break. Classes resume Monday, March 31st. Have a restful and safe break!' },
  { title: 'Annual Science Fair — Volunteers Needed', date: 'Mar 08, 2025', category: 'Event', body: 'We are seeking parent volunteers to judge the Annual Science Fair on April 5th. If interested, please sign up through the portal.' },
  { title: 'New Cafeteria Menu with Halal Options', date: 'Mar 05, 2025', category: 'Campus', body: 'We have updated the cafeteria menu with more vegetarian and halal options. Check the display board for the new weekly rotation.' },
  { title: 'Tuition Payment Reminder — Term 3', date: 'Mar 01, 2025', category: 'Fees', body: 'Term 3 tuition payments are due by March 15, 2025. Please complete payment through the Fees section to avoid late fees.' },
]

const RECENT_GRADES = [
  { subject: 'Computer Science', item: 'Python Loop Exercises', score: '29/30', grade: 'A', date: 'Mar 8' },
  { subject: 'Chemistry', item: 'Stoichiometry Quiz', score: '23/25', grade: 'A-', date: 'Mar 6' },
  { subject: 'English Literature', item: 'Poetry Analysis', score: '36/40', grade: 'B+', date: 'Mar 4' },
  { subject: 'World History', item: 'WWII Worksheet', score: '19/20', grade: 'A', date: 'Mar 3' },
]

const FEE_BREAKDOWN_PIE = [
  { name: 'Tuition', value: 13500, color: '#10b981' },
  { name: 'Activities', value: 350, color: '#f59e0b' },
  { name: 'Exam Fees', value: 120, color: '#f43f5e' },
  { name: 'Other', value: 85, color: '#14b8a6' },
]

// ----------------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------------

const NAV_ITEMS: PortalNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'grades', label: 'Grades', icon: 'GraduationCap' },
  { id: 'attendance', label: 'Attendance', icon: 'CalendarCheck' },
  { id: 'fees', label: 'Fees', icon: 'Wallet', badge: 2 },
  { id: 'reports', label: 'Reports', icon: 'FileText' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', badge: 3 },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare', badge: 1 },
  { id: 'announcements', label: 'Announcements', icon: 'Megaphone' },
  { id: 'profile', label: 'Profile', icon: 'UserRound' },
]

const PORTAL_NOTIFICATIONS = [
  { title: 'Alex marked absent — March 14', time: '2 hours ago' },
  { title: 'New grade posted: Computer Science', time: '5 hours ago' },
  { title: 'Fee due: Exam Registration ($120)', time: '1 day ago' },
  { title: 'Parent-Teacher Conference invite', time: '2 days ago' },
]

function letterColor(letter: string): string {
  if (letter.startsWith('A')) return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
  if (letter.startsWith('B')) return 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
  if (letter.startsWith('C')) return 'bg-orange-500/15 text-orange-700 dark:text-orange-400'
  return 'bg-rose-500/15 text-rose-700 dark:text-rose-400'
}

export function ParentPortal() {
  const session = useNav((s) => s.session)
  const userName = session?.name ?? 'Sarah Mitchell'
  const [activeSection, setActiveSection] = React.useState('dashboard')
  const [activeChild, setActiveChild] = React.useState(CHILDREN[0].id)

  return (
    <PortalShell
      role="parent"
      title="Parent Portal"
      navItems={NAV_ITEMS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      userName={userName}
      userMeta={`Parent of ${CHILDREN.find((c) => c.id === activeChild)?.name ?? 'Alex Morgan'}`}
      notifications={PORTAL_NOTIFICATIONS}
    >
      {activeSection === 'dashboard' && (
        <DashboardSection
          activeChild={activeChild}
          onChildChange={setActiveChild}
          onNavigate={setActiveSection}
        />
      )}
      {activeSection === 'grades' && <GradesSection />}
      {activeSection === 'attendance' && <AttendanceSection />}
      {activeSection === 'fees' && <FeesSection />}
      {activeSection === 'reports' && <ReportsSection />}
      {activeSection === 'notifications' && <NotificationsSection />}
      {activeSection === 'messages' && <MessagesSection />}
      {activeSection === 'announcements' && <AnnouncementsSection />}
      {activeSection === 'profile' && <ProfileSection userName={userName} />}
    </PortalShell>
  )
}

// ----------------------------------------------------------------------------
// 1. Dashboard
// ----------------------------------------------------------------------------

function DashboardSection({
  activeChild,
  onChildChange,
  onNavigate,
}: {
  activeChild: number
  onChildChange: (id: number) => void
  onNavigate: (id: string) => void
}) {
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Family Dashboard"
        description="An overview of your children's academic progress at Hamza School."
      />

      {/* Child selector */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CHILDREN.map((c) => {
          const isActive = c.id === activeChild
          return (
            <button
              key={c.id}
              onClick={() => onChildChange(c.id)}
              className={cn(
                'flex items-center gap-4 rounded-xl border-2 bg-card p-4 text-left transition-all hover:shadow-md',
                isActive ? 'border-primary ring-2 ring-primary/20' : 'border-border'
              )}
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-base font-bold text-white">
                {c.initials}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.grade} · House: {c.house}</p>
                <p className="mt-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  GPA {c.gpa}
                </p>
              </div>
              {isActive && (
                <Badge className="bg-primary text-primary-foreground text-[10px]">Active</Badge>
              )}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStat label="Child's GPA" value="3.8" icon="TrendingUp" trend="+0.2" accent="primary" />
        <PortalStat label="Attendance" value="96%" icon="CalendarCheck" trend="+1%" accent="teal" />
        <PortalStat label="Fees Paid" value="92%" icon="Wallet" accent="amber" />
        <PortalStat label="Upcoming Events" value="4" icon="CalendarDays" accent="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent grades */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Grades — Alex</CardTitle>
            <CardDescription>Latest graded work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_GRADES.map((g) => (
              <div key={g.item} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{g.item}</p>
                  <p className="text-xs text-muted-foreground">{g.subject} · {g.date}</p>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">{g.score}</span>
                <Badge className={cn('text-xs', letterColor(g.grade))}>{g.grade}</Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('grades')}>
              View full gradebook
            </Button>
          </CardContent>
        </Card>

        {/* Attendance snapshot */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Snapshot</CardTitle>
            <CardDescription>March 2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Present</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">22 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Late</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">1 day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Absent</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">2 days</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Rate</span>
              <span className="text-lg font-bold text-primary">96%</span>
            </div>
            <Progress value={96} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Fee status */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Status</CardTitle>
          <CardDescription>Academic year 2024–2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Total Paid</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">$13,850</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Outstanding</p>
              <p className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">$205</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="mt-1 text-2xl font-bold text-primary">92%</p>
              <Progress value={92} className="mt-2 h-2" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => onNavigate('fees')} className="bg-primary text-primary-foreground">
              View Fee Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 2. Grades
// ----------------------------------------------------------------------------

function GradesSection() {
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Academic Grades"
        description="Alex Morgan — Grade 10, Term 3 (read-only parent view)."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PortalStat label="Current GPA" value="3.8" icon="TrendingUp" trend="+0.2" accent="primary" />
        <PortalStat label="Class Rank" value="12 / 80" icon="Trophy" accent="teal" />
        <PortalStat label="Best Subject" value="Comp Sci" icon="Award" accent="amber" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>GPA Trend</CardTitle>
          <CardDescription>GPA progression over the last 6 terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={GPA_TREND} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="term" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[3, 4]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="gpa"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#10b981' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gradebook</CardTitle>
          <CardDescription>Quarterly scores by subject (read-only)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead className="text-center">Q1</TableHead>
                <TableHead className="text-center">Q2</TableHead>
                <TableHead className="text-center">Q3</TableHead>
                <TableHead className="text-center">Final</TableHead>
                <TableHead className="text-center">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SUBJECTS.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-muted-foreground">{s.teacher}</TableCell>
                  <TableCell className="text-center">{s.q1}</TableCell>
                  <TableCell className="text-center">{s.q2}</TableCell>
                  <TableCell className="text-center">{s.q3}</TableCell>
                  <TableCell className="text-center font-semibold">{s.final}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={cn('text-xs', letterColor(s.letter))}>{s.letter}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 3. Attendance
// ----------------------------------------------------------------------------

function AttendanceSection() {
  const cellColor: Record<string, string> = {
    present: 'bg-emerald-500 text-white',
    late: 'bg-amber-500 text-white',
    absent: 'bg-rose-500 text-white',
    weekend: 'bg-muted text-muted-foreground',
  }
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Attendance — Alex Morgan"
        description="Attendance record for March 2025."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PortalStat label="Present" value="22 days" icon="CheckCheck" accent="teal" />
        <PortalStat label="Absent" value="2 days" icon="XCircle" accent="rose" />
        <PortalStat label="Late" value="1 day" icon="Clock" accent="amber" />
        <PortalStat label="Rate" value="96%" icon="Percent" trend="+1%" accent="primary" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>March 2025 — Daily Attendance</CardTitle>
            <CardDescription>Color-coded by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-emerald-500" /> Present</span>
              <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-amber-500" /> Late</span>
              <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-rose-500" /> Absent</span>
              <span className="flex items-center gap-1.5"><span className="size-3 rounded bg-muted" /> Weekend</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {ATTENDANCE_MONTH.map((d) => (
                <div
                  key={d.day}
                  className={cn(
                    'flex aspect-square flex-col items-center justify-center rounded-lg text-xs font-medium',
                    cellColor[d.status]
                  )}
                >
                  <span>{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Breakdown</CardTitle>
            <CardDescription>Attendance distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ATTENDANCE_PIE}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {ATTENDANCE_PIE.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 4. Fees
// ----------------------------------------------------------------------------

function FeesSection() {
  const totalDue = FEE_PAYMENTS.reduce((sum, f) => sum + f.amount, 0)
  const totalPaid = FEE_PAYMENTS.filter((f) => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0)
  const balance = totalDue - totalPaid
  const pct = Math.round((totalPaid / totalDue) * 100)

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Fees & Payments"
        description="Academic year 2024–2025 — payment history and outstanding balances."
      />

      {/* Summary card */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
          <CardDescription>Across all fee categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-muted/30 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Due</p>
              <p className="mt-2 text-3xl font-bold">${totalDue.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border bg-emerald-500/5 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Paid</p>
              <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">${totalPaid.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border bg-amber-500/5 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Balance</p>
              <p className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">${balance.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">Payment progress</span>
              <span className="text-muted-foreground">{pct}% paid</span>
            </div>
            <Progress value={pct} className="h-3" />
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button variant="outline">Download Statement</Button>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={() => toast.success('Redirecting to payment...', { description: 'Opening secure payment gateway.' })}
            >
              <DynamicIcon name="CreditCard" className="mr-1.5 size-4" />
              Pay Now (${balance.toLocaleString()})
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>All transactions for this academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FEE_PAYMENTS.map((f, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{f.date}</TableCell>
                    <TableCell className="font-medium">{f.description}</TableCell>
                    <TableCell className="text-right font-semibold">${f.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      {f.status === 'Paid' ? (
                        <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs">Paid</Badge>
                      ) : (
                        <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{f.method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Breakdown</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={FEE_BREAKDOWN_PIE}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {FEE_BREAKDOWN_PIE.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                    }}
                    formatter={(v) => `$${Number(v).toLocaleString()}`}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 5. Reports
// ----------------------------------------------------------------------------

function ReportsSection() {
  const handleDownload = (term: string) => {
    toast.success('Report card downloaded', { description: `"${term}" has been downloaded as PDF.` })
  }
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Report Cards"
        description="Term-wise report cards for Alex Morgan — download as PDF."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r) => {
          const isDraft = r.date.includes('Draft')
          return (
            <Card key={r.term} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <DynamicIcon name="FileText" className="size-5" />
                  </div>
                  {isDraft && (
                    <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 text-[10px]">
                      Draft
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base">{r.term}</CardTitle>
                <CardDescription>{r.period}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-[11px] text-muted-foreground">GPA</p>
                    <p className="text-lg font-bold text-primary">{r.gpa}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[11px] text-muted-foreground">Attendance</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{r.attendance}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Published: {r.date}</p>
              </CardContent>
              <div className="px-6 pb-6">
                <Button
                  className="w-full bg-primary text-primary-foreground"
                  disabled={isDraft}
                  onClick={() => handleDownload(r.term)}
                >
                  <DynamicIcon name="Download" className="mr-1.5 size-4" />
                  {isDraft ? 'Not yet available' : 'Download PDF'}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 6. Notifications
// ----------------------------------------------------------------------------

function NotificationsSection() {
  const [items, setItems] = React.useState(NOTIFICATIONS)
  const [open, setOpen] = React.useState<number | null>(null)
  const active = items.find((n) => n.id === open)

  const typeColor: Record<string, string> = {
    Attendance: 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
    Grades: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    Fees: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    Events: 'bg-teal-500/15 text-teal-700 dark:text-teal-400',
  }

  const markRead = (id: number) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
    toast.success('All notifications marked as read')
  }

  const unreadCount = items.filter((n) => n.unread).length

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Notifications"
        description={`${unreadCount} unread of ${items.length} notifications`}
        action={
          <Button variant="outline" onClick={markAllRead} disabled={unreadCount === 0}>
            <DynamicIcon name="CheckCheck" className="mr-1.5 size-4" />
            Mark all as read
          </Button>
        }
      />
      <Card>
        <CardContent className="divide-y p-0">
          {items.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                markRead(n.id)
                setOpen(n.id)
              }}
              className={cn(
                'flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50',
                n.unread && 'bg-primary/5'
              )}
            >
              <div className={cn('mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg', typeColor[n.type])}>
                <DynamicIcon
                  name={n.type === 'Attendance' ? 'CalendarX' : n.type === 'Grades' ? 'GraduationCap' : n.type === 'Fees' ? 'Wallet' : 'CalendarDays'}
                  className="size-4.5"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn('text-sm', n.unread ? 'font-semibold' : 'font-medium')}>{n.title}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{n.body}</p>
                <Badge variant="secondary" className="mt-1.5 text-[10px]">{n.type}</Badge>
              </div>
              {n.unread && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
            </button>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="sm:max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant="secondary" className="mr-2 text-[10px]">{active.type}</Badge>
                  {active.time}
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-foreground/90">{active.body}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 7. Messages
// ----------------------------------------------------------------------------

function MessagesSection() {
  const [open, setOpen] = React.useState<number | null>(null)
  const active = MESSAGES.find((m) => m.id === open)

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Messages"
        description="Communications from teachers and the school office."
      />
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>{MESSAGES.length} messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {MESSAGES.map((m) => (
            <button
              key={m.id}
              onClick={() => setOpen(m.id)}
              className="flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50"
            >
              <Avatar className="size-10 border">
                <AvatarFallback className="bg-amber-500/15 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {m.sender.split(' ').map((s) => s[0]).slice(0, 2).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{m.sender}</p>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{m.date}</span>
                </div>
                <p className="truncate text-sm font-medium">{m.subject}</p>
                <p className="truncate text-xs text-muted-foreground">{m.preview}</p>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="sm:max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.subject}</DialogTitle>
                <DialogDescription>
                  From <span className="font-medium text-foreground">{active.sender}</span> · {active.date}
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[50vh] overflow-y-auto">
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">{active.body}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-primary text-primary-foreground"
                  onClick={() => {
                    toast.success('Reply drafted', { description: 'Opening reply composer...' })
                    setOpen(null)
                  }}
                >
                  Reply
                </Button>
                <Button variant="outline" onClick={() => setOpen(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 8. Announcements
// ----------------------------------------------------------------------------

function AnnouncementsSection() {
  const categoryColor: Record<string, string> = {
    Holiday: 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
    Event: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    Fees: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    Campus: 'bg-teal-500/15 text-teal-700 dark:text-teal-400',
  }
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Announcements"
        description="School-wide notices and updates for parents."
      />
      <div className="space-y-3">
        {ANNOUNCEMENTS.map((a) => (
          <Card key={a.title}>
            <CardContent className="p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <Badge className={cn('text-[10px]', categoryColor[a.category])}>{a.category}</Badge>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
              <h3 className="font-semibold leading-tight">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 9. Profile
// ----------------------------------------------------------------------------

function ProfileSection({ userName }: { userName: string }) {
  const [name, setName] = React.useState(userName)
  const [email, setEmail] = React.useState('sarah.mitchell@email.com')
  const [phone, setPhone] = React.useState('+1 (415) 555-0149')
  const [bio, setBio] = React.useState('Parent of Alex (Grade 10) and Emma (Grade 7). Active in the PTA and volunteer judge for the science fair.')

  // notification preferences
  const [prefs, setPrefs] = React.useState({
    attendance: true,
    grades: true,
    fees: true,
    events: true,
    weekly: true,
    sms: false,
  })

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }))
  }

  const handleSave = () => {
    toast.success('Profile saved', { description: 'Your changes have been updated.' })
  }

  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

  const prefRows: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: 'attendance', label: 'Attendance Alerts', desc: 'Get notified when your child is marked absent or late' },
    { key: 'grades', label: 'Grade Updates', desc: 'Receive alerts when new grades are posted' },
    { key: 'fees', label: 'Fee Reminders', desc: 'Notifications about upcoming and overdue fees' },
    { key: 'events', label: 'Events & Invites', desc: 'Parent-teacher conferences, school events' },
    { key: 'weekly', label: 'Weekly Digest', desc: 'A weekly summary email every Sunday' },
    { key: 'sms', label: 'SMS Notifications', desc: 'Critical alerts via text message' },
  ]

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Profile Settings"
        description="Manage your account, linked children, and notification preferences."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>Your initials avatar</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-2xl font-bold text-white shadow-lg">
              {initials}
            </div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">Parent Account</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => toast.info('Photo upload coming soon')}>
              Change Photo
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button className="bg-primary text-primary-foreground" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Linked children */}
      <Card>
        <CardHeader>
          <CardTitle>Linked Children</CardTitle>
          <CardDescription>Children associated with your parent account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {CHILDREN.map((c) => (
            <div key={c.id} className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white">
                  {c.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.grade} · House: {c.house} · GPA {c.gpa}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => toast.info('Cannot remove — contact admin')}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={() => toast.info('Contact the school admin to add a child')}>
            <DynamicIcon name="UserPlus" className="mr-1.5 size-4" />
            Add Another Child
          </Button>
        </CardContent>
      </Card>

      {/* Notification preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what you want to be notified about</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {prefRows.map((row, idx) => (
            <div key={row.key}>
              <div className="flex items-center justify-between py-3">
                <div className="flex-1 pr-4">
                  <p className="text-sm font-medium">{row.label}</p>
                  <p className="text-xs text-muted-foreground">{row.desc}</p>
                </div>
                <Switch
                  checked={prefs[row.key]}
                  onCheckedChange={() => togglePref(row.key)}
                  aria-label={row.label}
                />
              </div>
              {idx < prefRows.length - 1 && <Separator />}
            </div>
          ))}
          <div className="mt-4 flex justify-end">
            <Button className="bg-primary text-primary-foreground" onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="cur">Current Password</Label>
              <Input id="cur" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Separator />
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => toast.success('Password updated', { description: 'You will be asked to sign in again.' })}
            >
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
