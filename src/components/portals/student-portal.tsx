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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
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
  BarChart,
  Bar,
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
// Mock data — realistic student records for Alex Morgan (Grade 10, Cedar House)
// ----------------------------------------------------------------------------

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

const ASSIGNMENTS = [
  { id: 1, title: 'Quadratic Equations Problem Set', subject: 'Mathematics', due: 'Tomorrow · 11:59 PM', status: 'Pending', points: 30 },
  { id: 2, title: 'Essay: Themes in Macbeth', subject: 'English Literature', due: 'Fri, Mar 14', status: 'Pending', points: 50 },
  { id: 3, title: 'Lab Report — Pendulum Motion', subject: 'Physics', due: 'Mon, Mar 17', status: 'Pending', points: 40 },
  { id: 4, title: 'Cell Mitosis Diagram', subject: 'Biology', due: 'Submitted Mar 5', status: 'Submitted', points: 25 },
  { id: 5, title: 'WWII Causes Worksheet', subject: 'World History', due: 'Submitted Mar 3', status: 'Submitted', points: 20 },
  { id: 6, title: 'Python Loop Exercises', subject: 'Computer Science', due: 'Graded Mar 8', status: 'Graded', points: 30, score: 29 },
  { id: 7, title: 'Stoichiometry Quiz', subject: 'Chemistry', due: 'Graded Mar 6', status: 'Graded', points: 25, score: 23 },
  { id: 8, title: 'Poetry Analysis — Frost', subject: 'English Literature', due: 'Graded Mar 4', status: 'Graded', points: 40, score: 36 },
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

const SCHEDULE = [
  { period: 1, time: '08:00 – 08:50', mon: { subj: 'Mathematics', room: 'B-204', t: 'Carter' }, tue: { subj: 'Physics', room: 'L-101', t: 'Rahman' }, wed: { subj: 'English', room: 'A-110', t: 'Bennett' }, thu: { subj: 'Mathematics', room: 'B-204', t: 'Carter' }, fri: { subj: 'Biology', room: 'L-102', t: 'Shah' } },
  { period: 2, time: '08:55 – 09:45', mon: { subj: 'English', room: 'A-110', t: 'Bennett' }, tue: { subj: 'Chemistry', room: 'L-103', t: 'Khaled' }, wed: { subj: 'Mathematics', room: 'B-204', t: 'Carter' }, thu: { subj: 'History', room: 'C-201', t: 'Whitfield' }, fri: { subj: 'Physics', room: 'L-101', t: 'Rahman' } },
  { period: 3, time: '09:50 – 10:40', mon: { subj: 'History', room: 'C-201', t: 'Whitfield' }, tue: { subj: 'Comp Sci', room: 'T-305', t: 'Adeyemi' }, wed: { subj: 'Chemistry', room: 'L-103', t: 'Khaled' }, thu: { subj: 'Biology', room: 'L-102', t: 'Shah' }, fri: { subj: 'Comp Sci', room: 'T-305', t: 'Adeyemi' } },
  { period: 4, time: '10:45 – 11:35', mon: { subj: 'Biology', room: 'L-102', t: 'Shah' }, tue: { subj: 'English', room: 'A-110', t: 'Bennett' }, wed: { subj: 'PE', room: 'Gym', t: 'Moore' }, thu: { subj: 'Physics', room: 'L-101', t: 'Rahman' }, fri: { subj: 'History', room: 'C-201', t: 'Whitfield' } },
  { period: 5, time: '11:40 – 12:30', mon: { subj: 'Lunch', room: 'Cafeteria', t: '—' }, tue: { subj: 'Lunch', room: 'Cafeteria', t: '—' }, wed: { subj: 'Lunch', room: 'Cafeteria', t: '—' }, thu: { subj: 'Lunch', room: 'Cafeteria', t: '—' }, fri: { subj: 'Lunch', room: 'Cafeteria', t: '—' } },
  { period: 6, time: '12:35 – 13:25', mon: { subj: 'Comp Sci', room: 'T-305', t: 'Adeyemi' }, tue: { subj: 'Mathematics', room: 'B-204', t: 'Carter' }, wed: { subj: 'History', room: 'C-201', t: 'Whitfield' }, thu: { subj: 'English', room: 'A-110', t: 'Bennett' }, fri: { subj: 'Chemistry', room: 'L-103', t: 'Khaled' } },
  { period: 7, time: '13:30 – 14:20', mon: { subj: 'Physics Lab', room: 'L-101', t: 'Rahman' }, tue: { subj: 'Biology Lab', room: 'L-102', t: 'Shah' }, wed: { subj: 'Library', room: 'Library', t: 'Self-study' }, thu: { subj: 'Comp Sci', room: 'T-305', t: 'Adeyemi' }, fri: { subj: 'Mathematics', room: 'B-204', t: 'Carter' } },
  { period: 8, time: '14:25 – 15:15', mon: { subj: 'Study Hall', room: 'B-204', t: 'Self-study' }, tue: { subj: 'Club: Robotics', room: 'T-305', t: 'Adeyemi' }, wed: { subj: 'PE', room: 'Gym', t: 'Moore' }, thu: { subj: 'Art', room: 'D-101', t: 'Rivera' }, fri: { subj: 'Assembly', room: 'Hall', t: 'All' } },
]

const EXAMS = [
  { name: 'Midterm Exam', subject: 'Mathematics', date: 'Mar 20, 2025', time: '09:00 AM', room: 'B-204', duration: '2 hrs' },
  { name: 'Unit Test 4', subject: 'Physics', date: 'Mar 22, 2025', time: '10:30 AM', room: 'L-101', duration: '1.5 hrs' },
  { name: 'Essay Exam', subject: 'English Literature', date: 'Mar 25, 2025', time: '09:00 AM', room: 'A-110', duration: '2 hrs' },
  { name: 'Lab Practical', subject: 'Chemistry', date: 'Mar 27, 2025', time: '01:00 PM', room: 'L-103', duration: '1.5 hrs' },
  { name: 'Final Project Demo', subject: 'Computer Science', date: 'Mar 29, 2025', time: '11:00 AM', room: 'T-305', duration: '1 hr' },
  { name: 'Map Quiz', subject: 'World History', date: 'Apr 02, 2025', time: '09:30 AM', room: 'C-201', duration: '45 min' },
]

const MATERIALS = [
  { subject: 'Mathematics', items: [
    { title: 'Ch.7 — Quadratic Functions.pdf', size: '2.4 MB', type: 'Textbook' },
    { title: 'Practice Worksheet 12.pdf', size: '340 KB', type: 'Worksheet' },
    { title: 'Lecture Notes — Factoring.pdf', size: '1.1 MB', type: 'Notes' },
  ]},
  { subject: 'Physics', items: [
    { title: 'Ch.9 — Wave Motion.pdf', size: '3.2 MB', type: 'Textbook' },
    { title: 'Pendulum Lab Guide.pdf', size: '780 KB', type: 'Lab Guide' },
  ]},
  { subject: 'Computer Science', items: [
    { title: 'Python Loops — Slides.pdf', size: '1.8 MB', type: 'Slides' },
    { title: 'Project Spec — Calculator.pdf', size: '420 KB', type: 'Project' },
    { title: 'Reference Sheet — Syntax.pdf', size: '210 KB', type: 'Notes' },
  ]},
  { subject: 'English Literature', items: [
    { title: 'Macbeth — Full Text.pdf', size: '5.1 MB', type: 'Textbook' },
    { title: 'Essay Rubric.pdf', size: '180 KB', type: 'Rubric' },
  ]},
]

const MESSAGES = [
  { id: 1, sender: 'Mr. Daniel Carter', subject: 'Great improvement in problem set!', preview: 'I wanted to let you know your latest submission showed real growth in...', date: '2 hrs ago', body: 'Dear Alex,\n\nI wanted to let you know your latest submission showed real growth in your understanding of quadratic equations. Your work on problems 4 and 7 was especially strong — keep this momentum going into the midterm.\n\nIf you want extra practice, drop by during office hours on Thursday.\n\nBest,\nMr. Carter' },
  { id: 2, sender: 'Ms. Olivia Bennett', subject: 'Macbeth essay — feedback', preview: 'Your thesis is solid, but the body paragraphs could use more textual...', date: 'Yesterday', body: 'Hi Alex,\n\nYour thesis is solid, but the body paragraphs could use more textual evidence. Refer to scenes 2 and 4 in Act III for stronger support of your argument about ambition.\n\nLet\'s discuss revisions in class tomorrow.\n\n— Ms. Bennett' },
  { id: 3, sender: 'Dr. Sami Rahman', subject: 'Lab safety reminder', preview: 'Reminder: closed-toe shoes required for all physics lab sessions...', date: '2 days ago', body: 'Students,\n\nReminder: closed-toe shoes required for all physics lab sessions. We will be working with pendulum apparatus next week.\n\nDr. Rahman' },
  { id: 4, sender: 'Coach Lisa Moore', subject: 'Track team signup', preview: 'Spring track season starts next Monday. Sign-ups close Friday...', date: '3 days ago', body: 'Hi Alex,\n\nSpring track season starts next Monday. Sign-ups close Friday at 4 PM. We\'d love to have you on the 400m team!\n\nCoach Moore' },
  { id: 5, sender: 'Admin Office', subject: 'Yearbook photo day', preview: 'Yearbook photos will be taken on March 18th. Dress code: formal...', date: '4 days ago', body: 'Dear Students,\n\nYearbook photos will be taken on March 18th in the main hall. Dress code: formal uniform. Please arrive during your scheduled time slot posted on the notice board.\n\nAdmin Office' },
]

const ANNOUNCEMENTS = [
  { title: 'Spring Break — School Closed', date: 'Mar 24, 2025', category: 'Holiday', body: 'The school will be closed from March 24th to March 28th for spring break. Classes resume Monday, March 31st. Have a restful and safe break!' },
  { title: 'Annual Science Fair Registration Open', date: 'Mar 12, 2025', category: 'Event', body: 'Registration for the Annual Science Fair is now open. Submit your project proposals by March 28th. Top three projects will represent Hamza School at the regional competition.' },
  { title: 'Library Extended Hours During Exam Week', date: 'Mar 10, 2025', category: 'Academic', body: 'The library will be open until 9 PM during exam week (March 17–21) to support student study sessions. Librarians will be available for research help.' },
  { title: 'New Cafeteria Menu', date: 'Mar 08, 2025', category: 'Campus', body: 'We have updated the cafeteria menu with more vegetarian and halal options. Check the display board for the new weekly rotation.' },
]

const TODAY_SCHEDULE = [
  { period: 'P2', time: '08:55', subj: 'Chemistry', room: 'L-103', color: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' },
  { period: 'P3', time: '09:50', subj: 'Comp Sci', room: 'T-305', color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  { period: 'P4', time: '10:45', subj: 'English', room: 'A-110', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
  { period: 'P6', time: '12:35', subj: 'Mathematics', room: 'B-204', color: 'bg-teal-500/15 text-teal-600 dark:text-teal-400' },
  { period: 'P7', time: '13:30', subj: 'Biology Lab', room: 'L-102', color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
]

const RECENT_GRADES = [
  { subject: 'Computer Science', item: 'Python Loop Exercises', score: '29/30', grade: 'A', date: 'Mar 8' },
  { subject: 'Chemistry', item: 'Stoichiometry Quiz', score: '23/25', grade: 'A-', date: 'Mar 6' },
  { subject: 'English Literature', item: 'Poetry Analysis', score: '36/40', grade: 'B+', date: 'Mar 4' },
  { subject: 'World History', item: 'WWII Worksheet', score: '19/20', grade: 'A', date: 'Mar 3' },
]

const ATTENDANCE_PIE = [
  { name: 'Present', value: 22, color: '#10b981' },
  { name: 'Late', value: 1, color: '#f59e0b' },
  { name: 'Absent', value: 2, color: '#f43f5e' },
]

// ----------------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------------

const NAV_ITEMS: PortalNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'grades', label: 'Grades', icon: 'GraduationCap' },
  { id: 'assignments', label: 'Assignments', icon: 'ClipboardList', badge: 3 },
  { id: 'attendance', label: 'Attendance', icon: 'CalendarCheck' },
  { id: 'schedule', label: 'Schedule', icon: 'CalendarDays' },
  { id: 'exams', label: 'Exams', icon: 'FileText', badge: 6 },
  { id: 'materials', label: 'Materials', icon: 'BookOpen' },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare', badge: 2 },
  { id: 'announcements', label: 'Announcements', icon: 'Megaphone' },
  { id: 'profile', label: 'Profile', icon: 'UserRound' },
]

const NOTIFICATIONS = [
  { title: 'New grade posted: Python Loops', time: '2 hours ago' },
  { title: 'Assignment due tomorrow — Math', time: '5 hours ago' },
  { title: 'Mr. Carter sent you a message', time: '2 hours ago' },
  { title: 'Spring Break starts Mar 24', time: '1 day ago' },
]

function letterColor(letter: string): string {
  if (letter.startsWith('A')) return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
  if (letter.startsWith('B')) return 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
  if (letter.startsWith('C')) return 'bg-orange-500/15 text-orange-700 dark:text-orange-400'
  return 'bg-rose-500/15 text-rose-700 dark:text-rose-400'
}

export function StudentPortal() {
  const session = useNav((s) => s.session)
  const userName = session?.name ?? 'Alex Morgan'
  const [activeSection, setActiveSection] = React.useState('dashboard')

  return (
    <PortalShell
      role="student"
      title="Student Portal"
      navItems={NAV_ITEMS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      userName={userName}
      userMeta="Grade 10 · House: Cedar"
      notifications={NOTIFICATIONS}
    >
      {activeSection === 'dashboard' && <DashboardSection onNavigate={setActiveSection} />}
      {activeSection === 'grades' && <GradesSection />}
      {activeSection === 'assignments' && <AssignmentsSection />}
      {activeSection === 'attendance' && <AttendanceSection />}
      {activeSection === 'schedule' && <ScheduleSection />}
      {activeSection === 'exams' && <ExamsSection />}
      {activeSection === 'materials' && <MaterialsSection />}
      {activeSection === 'messages' && <MessagesSection />}
      {activeSection === 'announcements' && <AnnouncementsSection />}
      {activeSection === 'profile' && <ProfileSection userName={userName} />}
    </PortalShell>
  )
}

// ----------------------------------------------------------------------------
// 1. Dashboard
// ----------------------------------------------------------------------------

function DashboardSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Welcome back, Alex!"
        description="Here's your academic snapshot for today, March 11, 2025."
        action={
          <Button onClick={() => onNavigate('assignments')} className="bg-primary text-primary-foreground">
            View Assignments
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStat label="Current GPA" value="3.8" icon="TrendingUp" trend="+0.2" accent="primary" />
        <PortalStat label="Attendance Rate" value="96%" icon="CalendarCheck" trend="+1%" accent="teal" />
        <PortalStat label="Assignments Due" value="3" icon="ClipboardList" accent="amber" />
        <PortalStat label="Class Rank" value="12th" icon="Trophy" trend="Top 15%" accent="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today's schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Tuesday, March 11 · 5 classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {TODAY_SCHEDULE.map((c) => (
              <div
                key={c.period}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className={cn('flex size-10 flex-col items-center justify-center rounded-lg text-[10px] font-semibold', c.color)}>
                  <span>{c.period}</span>
                  <span className="opacity-70">{c.time}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{c.subj}</p>
                  <p className="text-xs text-muted-foreground">Room {c.room}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Announcements snippet */}
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Latest from school</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ANNOUNCEMENTS.slice(0, 3).map((a) => (
              <button
                key={a.title}
                onClick={() => onNavigate('announcements')}
                className="block w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted/50"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-[10px]">{a.category}</Badge>
                  <span className="text-[11px] text-muted-foreground">{a.date}</span>
                </div>
                <p className="text-sm font-semibold leading-tight">{a.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{a.body}</p>
              </button>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('announcements')}>
              View all announcements
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent grades */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Last 4 graded items</CardDescription>
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
          </CardContent>
        </Card>

        {/* Upcoming assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Due soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ASSIGNMENTS.filter((a) => a.status === 'Pending').map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.subject} · {a.points} pts</p>
                </div>
                <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs">
                  {a.due}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 2. Grades
// ----------------------------------------------------------------------------

function GradesSection() {
  const chartData = SUBJECTS.map((s) => ({ subject: s.name.split(' ')[0], score: s.final }))
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Academic Grades"
        description="Term 3 grades — final scores and GPA breakdown."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PortalStat label="Term GPA" value="3.8" icon="TrendingUp" trend="+0.2" accent="primary" />
        <PortalStat label="Best Subject" value="Comp Sci" icon="Award" accent="teal" />
        <PortalStat label="Credits Earned" value="6.5 / 7" icon="BookMarked" accent="amber" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>GPA Progress</CardTitle>
          <CardDescription>Current GPA relative to a 4.0 scale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">3.8 / 4.0</span>
            <span className="text-muted-foreground">95% of max</span>
          </div>
          <Progress value={95} className="h-3" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Final Scores</CardTitle>
          <CardDescription>Bar chart of final percentages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="score" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gradebook</CardTitle>
          <CardDescription>Quarterly scores by subject</CardDescription>
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
// 3. Assignments
// ----------------------------------------------------------------------------

function AssignmentsSection() {
  const [tab, setTab] = React.useState('Pending')

  const handleSubmit = (title: string) => {
    toast.success('Assignment submitted!', { description: `"${title}" has been turned in.` })
  }

  const renderCard = (a: typeof ASSIGNMENTS[number]) => (
    <Card key={a.id}>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">{a.subject}</Badge>
            <span className="text-xs text-muted-foreground">{a.points} points</span>
          </div>
          <p className="font-semibold leading-tight">{a.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{a.due}</p>
          {a.status === 'Graded' && (
            <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Score: {a.score}/{a.points} ({Math.round(((a.score ?? 0) / a.points) * 100)}%)
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {a.status === 'Pending' && (
            <Button size="sm" onClick={() => handleSubmit(a.title)} className="bg-primary text-primary-foreground">
              Submit
            </Button>
          )}
          {a.status === 'Submitted' && (
            <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400">
              Awaiting grade
            </Badge>
          )}
          {a.status === 'Graded' && (
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">Graded</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Assignments"
        description="Track upcoming, submitted, and graded work."
      />
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="Pending">Pending ({ASSIGNMENTS.filter((a) => a.status === 'Pending').length})</TabsTrigger>
          <TabsTrigger value="Submitted">Submitted ({ASSIGNMENTS.filter((a) => a.status === 'Submitted').length})</TabsTrigger>
          <TabsTrigger value="Graded">Graded ({ASSIGNMENTS.filter((a) => a.status === 'Graded').length})</TabsTrigger>
        </TabsList>
        <TabsContent value="Pending" className="space-y-3">
          {ASSIGNMENTS.filter((a) => a.status === 'Pending').map(renderCard)}
        </TabsContent>
        <TabsContent value="Submitted" className="space-y-3">
          {ASSIGNMENTS.filter((a) => a.status === 'Submitted').map(renderCard)}
        </TabsContent>
        <TabsContent value="Graded" className="space-y-3">
          {ASSIGNMENTS.filter((a) => a.status === 'Graded').map(renderCard)}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 4. Attendance
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
        title="Attendance"
        description="Your attendance record for March 2025."
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
// 5. Schedule
// ----------------------------------------------------------------------------

function ScheduleSection() {
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Weekly Schedule"
        description="Full timetable — Monday through Friday, 8 periods."
      />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Period</TableHead>
                <TableHead className="min-w-[110px]">Time</TableHead>
                <TableHead className="min-w-[140px]">Monday</TableHead>
                <TableHead className="min-w-[140px]">Tuesday</TableHead>
                <TableHead className="min-w-[140px]">Wednesday</TableHead>
                <TableHead className="min-w-[140px]">Thursday</TableHead>
                <TableHead className="min-w-[140px]">Friday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SCHEDULE.map((p) => (
                <TableRow key={p.period}>
                  <TableCell className="font-semibold">P{p.period}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.time}</TableCell>
                  {[p.mon, p.tue, p.wed, p.thu, p.fri].map((cell, idx) => {
                    const isLunch = cell.subj === 'Lunch'
                    const isBreak = cell.subj === 'Study Hall' || cell.subj === 'Assembly'
                    return (
                      <TableCell key={idx}>
                        <div className={cn(
                          'rounded-md px-2 py-1.5',
                          isLunch && 'bg-amber-500/10',
                          isBreak && 'bg-muted',
                          !isLunch && !isBreak && 'bg-emerald-500/10'
                        )}>
                          <p className="text-xs font-semibold leading-tight">{cell.subj}</p>
                          <p className="text-[10px] text-muted-foreground">{cell.room} · {cell.t}</p>
                        </div>
                      </TableCell>
                    )
                  })}
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
// 6. Exams
// ----------------------------------------------------------------------------

function ExamsSection() {
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Exam Schedule"
        description="Upcoming exams for Term 3."
        action={<Button variant="outline">Export to Calendar</Button>}
      />
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
          <CardDescription>6 exams scheduled in the next 3 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {EXAMS.map((e) => (
                <TableRow key={e.name + e.subject}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">{e.subject}</Badge>
                  </TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>{e.time}</TableCell>
                  <TableCell className="text-muted-foreground">{e.room}</TableCell>
                  <TableCell>{e.duration}</TableCell>
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
// 7. Materials
// ----------------------------------------------------------------------------

function MaterialsSection() {
  const handleDownload = (title: string) => {
    toast.success('Download started', { description: `"${title}" is being downloaded.` })
  }
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Course Materials"
        description="Textbook chapters, worksheets, and lecture notes — grouped by subject."
      />
      <div className="space-y-6">
        {MATERIALS.map((group) => (
          <Card key={group.subject}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DynamicIcon name="BookOpen" className="size-4" />
                </span>
                {group.subject}
              </CardTitle>
              <CardDescription>{group.items.length} resources available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {group.items.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <DynamicIcon name="FileText" className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.type} · {item.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(item.title)}>
                    <DynamicIcon name="Download" className="mr-1.5 size-4" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// small wrapper kept removed — using DynamicIcon directly

// ----------------------------------------------------------------------------
// 8. Messages
// ----------------------------------------------------------------------------

function MessagesSection() {
  const [open, setOpen] = React.useState<number | null>(null)
  const active = MESSAGES.find((m) => m.id === open)

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Messages"
        description="Inbox of messages from your teachers and school admin."
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
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
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
// 9. Announcements
// ----------------------------------------------------------------------------

function AnnouncementsSection() {
  const categoryColor: Record<string, string> = {
    Holiday: 'bg-rose-500/15 text-rose-700 dark:text-rose-400',
    Event: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    Academic: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    Campus: 'bg-teal-500/15 text-teal-700 dark:text-teal-400',
  }
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Announcements"
        description="School-wide notices and updates."
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
// 10. Profile
// ----------------------------------------------------------------------------

function ProfileSection({ userName }: { userName: string }) {
  const [name, setName] = React.useState(userName)
  const [email, setEmail] = React.useState('alex.morgan@hamza.edu')
  const [phone, setPhone] = React.useState('+1 (415) 555-0182')
  const [bio, setBio] = React.useState('Grade 10 student passionate about computer science and track. Member of the Robotics Club and Cedar House captain.')
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

  const handleSave = () => {
    toast.success('Profile saved', { description: 'Your changes have been updated.' })
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Profile Settings"
        description="Manage your personal information and account security."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>Your initials avatar</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-bold text-white shadow-lg">
              {initials}
            </div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">Grade 10 · House: Cedar</p>
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
