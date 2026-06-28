'use client'

import * as React from 'react'
import { toast } from 'sonner'
import {
  Plus,
  Search,
  Save,
  Send,
  Trash2,
  Pencil,
  Eye,
  Check,
  X,
  Upload,
  Download,
  Ban,
  ShieldCheck,
  TrendingUp,
  Users,
  GraduationCap,
  DollarSign,
  FileCheck,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
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
import { Checkbox } from '@/components/ui/checkbox'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SmartImage } from '@/components/site/smart-image'
import { cn } from '@/lib/utils'

// ============================================================
// Mock data
// ============================================================

const ENROLLMENT_TREND = [
  { month: 'Sep', students: 1680 },
  { month: 'Oct', students: 1712 },
  { month: 'Nov', students: 1745 },
  { month: 'Dec', students: 1758 },
  { month: 'Jan', students: 1789 },
  { month: 'Feb', students: 1802 },
  { month: 'Mar', students: 1825 },
  { month: 'Apr', students: 1840 },
]

const GRADE_DISTRIBUTION = [
  { grade: 'A', count: 412 },
  { grade: 'B', count: 528 },
  { grade: 'C', count: 396 },
  { grade: 'D', count: 184 },
  { grade: 'F', count: 58 },
]

const ATTENDANCE_WEEK = [
  { day: 'Mon', rate: 96.2 },
  { day: 'Tue', rate: 97.1 },
  { day: 'Wed', rate: 95.4 },
  { day: 'Thu', rate: 96.8 },
  { day: 'Fri', rate: 94.2 },
]

const DEPT_GRADES = [
  { dept: 'Math', A: 32, B: 28, C: 18 },
  { dept: 'Science', A: 28, B: 30, C: 22 },
  { dept: 'English', A: 35, B: 26, C: 19 },
  { dept: 'History', A: 26, B: 32, C: 24 },
  { dept: 'Arts', A: 38, B: 24, C: 16 },
  { dept: 'PE', A: 42, B: 22, C: 12 },
]

interface UserRow {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Teacher' | 'Student' | 'Parent'
  status: 'Active' | 'Suspended'
  lastActive: string
}

const USERS: UserRow[] = [
  { id: 'u1', name: 'Dr. Jonathan Pierce', email: 'jonathan.p@hamza.edu', role: 'Admin', status: 'Active', lastActive: '2 min ago' },
  { id: 'u2', name: 'Ms. Emily Carter', email: 'emily.c@hamza.edu', role: 'Teacher', status: 'Active', lastActive: '15 min ago' },
  { id: 'u3', name: 'Mr. David Okoro', email: 'david.o@hamza.edu', role: 'Teacher', status: 'Active', lastActive: '1 hr ago' },
  { id: 'u4', name: 'Mrs. Sophia Lin', email: 'sophia.l@hamza.edu', role: 'Teacher', status: 'Active', lastActive: '3 hr ago' },
  { id: 'u5', name: 'Aisha Rahman', email: 'aisha.r@hamza.edu', role: 'Student', status: 'Active', lastActive: '20 min ago' },
  { id: 'u6', name: 'Brandon Lee', email: 'brandon.l@hamza.edu', role: 'Student', status: 'Suspended', lastActive: '2 days ago' },
  { id: 'u7', name: 'Clara Mendez', email: 'clara.m@hamza.edu', role: 'Student', status: 'Active', lastActive: '4 hr ago' },
  { id: 'u8', name: 'Elena Petrov', email: 'elena.p@hamza.edu', role: 'Student', status: 'Active', lastActive: '1 hr ago' },
  { id: 'u9', name: 'Mrs. Maria Petrov', email: 'maria.p@gmail.com', role: 'Parent', status: 'Active', lastActive: '5 hr ago' },
  { id: 'u10', name: 'Mr. James Brooks', email: 'james.b@gmail.com', role: 'Parent', status: 'Active', lastActive: '1 day ago' },
  { id: 'u11', name: 'Dr. Amina Saeed', email: 'amina.s@hamza.edu', role: 'Admin', status: 'Active', lastActive: '30 min ago' },
  { id: 'u12', name: 'Mr. Robert Walsh', email: 'robert.w@hamza.edu', role: 'Teacher', status: 'Suspended', lastActive: '1 week ago' },
  { id: 'u13', name: 'Farhan Iqbal', email: 'farhan.i@hamza.edu', role: 'Student', status: 'Active', lastActive: '10 min ago' },
]

const STUDENTS_ADMIN = [
  { id: 'S-1001', name: 'Aisha Rahman', grade: 'G10', class: '10-A', guardian: 'Mrs. Rahman', status: 'Active', enrolled: 'Aug 2023' },
  { id: 'S-1002', name: 'Brandon Lee', grade: 'G10', class: '10-B', guardian: 'Mr. Lee', status: 'Active', enrolled: 'Aug 2023' },
  { id: 'S-1003', name: 'Clara Mendez', grade: 'G11', class: '11-A', guardian: 'Mrs. Mendez', status: 'Active', enrolled: 'Aug 2022' },
  { id: 'S-1004', name: 'Daniel Okoye', grade: 'G11', class: '11-B', guardian: 'Mr. Okoye', status: 'Active', enrolled: 'Aug 2022' },
  { id: 'S-1005', name: 'Elena Petrov', grade: 'G12', class: '12-A', guardian: 'Mrs. Petrov', status: 'Active', enrolled: 'Aug 2021' },
  { id: 'S-1006', name: 'Farhan Iqbal', grade: 'G12', class: '12-A', guardian: 'Mr. Iqbal', status: 'Active', enrolled: 'Aug 2021' },
  { id: 'S-1007', name: 'Grace O\u2019Neil', grade: 'G9', class: '9-B', guardian: 'Mrs. O\u2019Neil', status: 'Active', enrolled: 'Aug 2024' },
  { id: 'S-1008', name: 'Hiro Tanaka', grade: 'G9', class: '9-A', guardian: 'Mr. Tanaka', status: 'Active', enrolled: 'Aug 2024' },
  { id: 'S-1009', name: 'Isabella Cruz', grade: 'G12', class: '12-B', guardian: 'Mrs. Cruz', status: 'Active', enrolled: 'Aug 2021' },
  { id: 'S-1010', name: 'Jamal Davis', grade: 'G12', class: '12-B', guardian: 'Mr. Davis', status: 'Inactive', enrolled: 'Aug 2021' },
  { id: 'S-1011', name: 'Kavya Patel', grade: 'G10', class: '10-A', guardian: 'Dr. Patel', status: 'Active', enrolled: 'Aug 2023' },
  { id: 'S-1012', name: 'Liam Walsh', grade: 'G11', class: '11-A', guardian: 'Mr. Walsh', status: 'Active', enrolled: 'Aug 2022' },
  { id: 'S-1013', name: 'Maya Singh', grade: 'G12', class: '12-A', guardian: 'Mrs. Singh', status: 'Active', enrolled: 'Aug 2021' },
  { id: 'S-1014', name: 'Noah Kim', grade: 'G9', class: '9-A', guardian: 'Mr. Kim', status: 'Active', enrolled: 'Aug 2024' },
  { id: 'S-1015', name: 'Olivia Brooks', grade: 'G12', class: '12-B', guardian: 'Mr. Brooks', status: 'Active', enrolled: 'Aug 2021' },
  { id: 'S-1016', name: 'Pablo Reyes', grade: 'G10', class: '10-B', guardian: 'Mrs. Reyes', status: 'Active', enrolled: 'Aug 2023' },
]

const TEACHERS = [
  { id: 't1', name: 'Ms. Emily Carter', dept: 'Mathematics', subjects: 'Algebra II, AP Calculus', classes: 6, exp: '12 yrs', status: 'Active' },
  { id: 't2', name: 'Mr. David Okoro', dept: 'Science', subjects: 'Physics, Chemistry', classes: 5, exp: '8 yrs', status: 'Active' },
  { id: 't3', name: 'Mrs. Sophia Lin', dept: 'English', subjects: 'Literature, Composition', classes: 5, exp: '15 yrs', status: 'Active' },
  { id: 't4', name: 'Mr. Robert Walsh', dept: 'History', subjects: 'World History, Govt', classes: 4, exp: '6 yrs', status: 'On Leave' },
  { id: 't5', name: 'Dr. Amina Saeed', dept: 'Science', subjects: 'Biology, AP Bio', classes: 5, exp: '10 yrs', status: 'Active' },
  { id: 't6', name: 'Mr. Carlos Rivera', dept: 'Arts', subjects: 'Visual Arts, Design', classes: 4, exp: '7 yrs', status: 'Active' },
  { id: 't7', name: 'Mrs. Hannah Park', dept: 'Languages', subjects: 'Spanish, French', classes: 5, exp: '9 yrs', status: 'Active' },
  { id: 't8', name: 'Mr. James Brooks', dept: 'Physical Ed', subjects: 'PE, Health', classes: 8, exp: '5 yrs', status: 'Active' },
  { id: 't9', name: 'Mrs. Linda Hayes', dept: 'Mathematics', subjects: 'Geometry, Stats', classes: 5, exp: '14 yrs', status: 'Active' },
  { id: 't10', name: 'Mr. Omar Faruk', dept: 'Computer Sci', subjects: 'CS, Web Dev', classes: 4, exp: '4 yrs', status: 'Active' },
  { id: 't11', name: 'Ms. Priya Nair', dept: 'English', subjects: 'AP English, Drama', classes: 4, exp: '11 yrs', status: 'Active' },
]

const PARENTS = [
  { id: 'p1', name: 'Mrs. Maria Petrov', email: 'maria.p@gmail.com', phone: '+1 (555) 234-1122', children: 'Elena, Mark', status: 'Active' },
  { id: 'p2', name: 'Mr. James Brooks', email: 'james.b@gmail.com', phone: '+1 (555) 871-2233', children: 'Olivia', status: 'Active' },
  { id: 'p3', name: 'Mrs. Rahman', email: 'rahman.f@gmail.com', phone: '+1 (555) 998-1144', children: 'Aisha', status: 'Active' },
  { id: 'p4', name: 'Mr. Lee', email: 'lee.j@gmail.com', phone: '+1 (555) 442-7788', children: 'Brandon', status: 'Active' },
  { id: 'p5', name: 'Mr. Okoye', email: 'okoye.d@gmail.com', phone: '+1 (555) 661-3399', children: 'Daniel', status: 'Active' },
  { id: 'p6', name: 'Dr. Patel', email: 'patel.k@gmail.com', phone: '+1 (555) 220-7766', children: 'Kavya, Anika', status: 'Active' },
  { id: 'p7', name: 'Mr. Tanaka', email: 'tanaka.h@gmail.com', phone: '+1 (555) 113-9090', children: 'Hiro', status: 'Active' },
  { id: 'p8', name: 'Mrs. Cruz', email: 'cruz.i@gmail.com', phone: '+1 (555) 552-3344', children: 'Isabella', status: 'Active' },
  { id: 'p9', name: 'Mr. Davis', email: 'davis.j@gmail.com', phone: '+1 (555) 778-1212', children: 'Jamal', status: 'Active' },
  { id: 'p10', name: 'Mrs. Singh', email: 'singh.m@gmail.com', phone: '+1 (555) 334-5566', children: 'Maya', status: 'Active' },
]

const ADMISSIONS = [
  { id: 'app1', applicant: 'Nadia Hassan', grade: 'G9', date: 'Apr 10, 2025', status: 'Pending', parent: 'Mr. Hassan' },
  { id: 'app2', applicant: 'Liam Chen', grade: 'G10', date: 'Apr 09, 2025', status: 'Reviewing', parent: 'Mrs. Chen' },
  { id: 'app3', applicant: 'Sara Ahmed', grade: 'G11', date: 'Apr 08, 2025', status: 'Reviewing', parent: 'Dr. Ahmed' },
  { id: 'app4', applicant: 'Marcus Webb', grade: 'G9', date: 'Apr 07, 2025', status: 'Accepted', parent: 'Mr. Webb' },
  { id: 'app5', applicant: 'Yuki Sato', grade: 'G10', date: 'Apr 06, 2025', status: 'Pending', parent: 'Mrs. Sato' },
  { id: 'app6', applicant: 'Aaliyah Jones', grade: 'G12', date: 'Apr 05, 2025', status: 'Rejected', parent: 'Mr. Jones' },
  { id: 'app7', applicant: 'Diego Torres', grade: 'G9', date: 'Apr 03, 2025', status: 'Accepted', parent: 'Mrs. Torres' },
  { id: 'app8', applicant: 'Priya Sharma', grade: 'G11', date: 'Apr 02, 2025', status: 'Pending', parent: 'Dr. Sharma' },
  { id: 'app9', applicant: 'Omar Khalil', grade: 'G10', date: 'Apr 01, 2025', status: 'Reviewing', parent: 'Mr. Khalil' },
]

const COURSES = [
  { id: 'cr1', name: 'Algebra II', code: 'MATH-201', dept: 'Mathematics', teacher: 'Ms. Carter', enrolled: 28, capacity: 30 },
  { id: 'cr2', name: 'AP Calculus AB', code: 'MATH-401', dept: 'Mathematics', teacher: 'Ms. Carter', enrolled: 22, capacity: 24 },
  { id: 'cr3', name: 'Physics I', code: 'SCI-301', dept: 'Science', teacher: 'Mr. Okoro', enrolled: 26, capacity: 28 },
  { id: 'cr4', name: 'AP Biology', code: 'SCI-402', dept: 'Science', teacher: 'Dr. Saeed', enrolled: 24, capacity: 24 },
  { id: 'cr5', name: 'World Literature', code: 'ENG-201', dept: 'English', teacher: 'Mrs. Lin', enrolled: 30, capacity: 30 },
  { id: 'cr6', name: 'AP English', code: 'ENG-401', dept: 'English', teacher: 'Ms. Nair', enrolled: 18, capacity: 22 },
  { id: 'cr7', name: 'World History', code: 'HIS-201', dept: 'History', teacher: 'Mr. Walsh', enrolled: 28, capacity: 30 },
  { id: 'cr8', name: 'Spanish II', code: 'LANG-202', dept: 'Languages', teacher: 'Mrs. Park', enrolled: 22, capacity: 25 },
  { id: 'cr9', name: 'Visual Arts', code: 'ART-101', dept: 'Arts', teacher: 'Mr. Rivera', enrolled: 20, capacity: 24 },
  { id: 'cr10', name: 'Computer Science', code: 'CS-301', dept: 'Computer Sci', teacher: 'Mr. Faruk', enrolled: 24, capacity: 26 },
  { id: 'cr11', name: 'Statistics', code: 'MATH-302', dept: 'Mathematics', teacher: 'Mrs. Hayes', enrolled: 26, capacity: 28 },
]

const CLASS_AVERAGES = [
  { class: 'Algebra II', teacher: 'Carter', avg: 84, students: 28 },
  { class: 'AP Calculus AB', teacher: 'Carter', avg: 89, students: 22 },
  { class: 'Physics I', teacher: 'Okoro', avg: 81, students: 26 },
  { class: 'AP Biology', teacher: 'Saeed', avg: 88, students: 24 },
  { class: 'World Literature', teacher: 'Lin', avg: 86, students: 30 },
  { class: 'Spanish II', teacher: 'Park', avg: 90, students: 22 },
  { class: 'Computer Science', teacher: 'Faruk', avg: 92, students: 24 },
  { class: 'World History', teacher: 'Walsh', avg: 78, students: 28 },
]

const ATTENDANCE_BY_GRADE = [
  { grade: 'Grade 9', rate: 95.8, present: 412, absent: 18 },
  { grade: 'Grade 10', rate: 96.4, present: 425, absent: 16 },
  { grade: 'Grade 11', rate: 97.1, present: 432, absent: 13 },
  { grade: 'Grade 12', rate: 96.9, present: 421, absent: 14 },
]

const EVENTS_ADMIN = [
  { id: 'ev1', title: 'Spring Science Fair', date: 'Apr 22, 2025', category: 'Academic', location: 'Main Hall', status: 'Upcoming' },
  { id: 'ev2', title: 'Parent-Teacher Conference', date: 'May 01, 2025', category: 'Meeting', location: 'Classrooms', status: 'Upcoming' },
  { id: 'ev3', title: 'Senior Graduation', date: 'May 28, 2025', category: 'Ceremony', location: 'Auditorium', status: 'Planning' },
  { id: 'ev4', title: 'Annual Sports Day', date: 'Mar 18, 2025', category: 'Sports', location: 'Sports Field', status: 'Completed' },
  { id: 'ev5', title: 'Art Exhibition', date: 'May 10, 2025', category: 'Arts', location: 'Art Wing', status: 'Upcoming' },
  { id: 'ev6', title: 'Founders Day', date: 'Apr 30, 2025', category: 'Ceremony', location: 'Main Hall', status: 'Upcoming' },
]

const GALLERY_ADMIN = [
  { id: 'g1', title: 'Science Fair 2024', category: 'Academic' },
  { id: 'g2', title: 'Sports Day', category: 'Sports' },
  { id: 'g3', title: 'Art Exhibition', category: 'Arts' },
  { id: 'g4', title: 'Graduation 2024', category: 'Ceremony' },
  { id: 'g5', title: 'Library Reading', category: 'Campus' },
  { id: 'g6', title: 'Music Recital', category: 'Arts' },
  { id: 'g7', title: 'Field Trip', category: 'Activities' },
  { id: 'g8', title: 'Robotics Lab', category: 'Academic' },
]

const NEWS_ADMIN = [
  { id: 'n1', title: 'Hamza School Wins Regional Science Olympiad', category: 'Achievement', date: 'Apr 10, 2025', author: 'Dr. Pierce', status: 'Published' },
  { id: 'n2', title: 'New STEM Wing Opening Fall 2025', category: 'Announcement', date: 'Apr 05, 2025', author: 'Dr. Saeed', status: 'Published' },
  { id: 'n3', title: 'Spring Concert Highlights', category: 'Events', date: 'Mar 28, 2025', author: 'Mr. Rivera', status: 'Published' },
  { id: 'n4', title: 'College Acceptances Update', category: 'Academic', date: 'Mar 22, 2025', author: 'Mrs. Lin', status: 'Published' },
  { id: 'n5', title: 'Summer Camp Registration Open', category: 'Announcement', date: 'Mar 15, 2025', author: 'Dr. Pierce', status: 'Draft' },
  { id: 'n6', title: 'Alumni Spotlight: Class of 2014', category: 'Alumni', date: 'Mar 10, 2025', author: 'Ms. Nair', status: 'Draft' },
]

const FILES_ADMIN = [
  { id: 'f1', name: 'Student Handbook 2024-25.pdf', type: 'PDF', size: '2.4 MB', downloads: 1240 },
  { id: 'f2', name: 'Academic Calendar.pdf', type: 'PDF', size: '480 KB', downloads: 2150 },
  { id: 'f3', name: 'Admission Form.docx', type: 'DOCX', size: '88 KB', downloads: 856 },
  { id: 'f4', name: 'Tuition Fee Structure.xlsx', type: 'XLSX', size: '64 KB', downloads: 1432 },
  { id: 'f5', name: 'Annual Report 2024.pdf', type: 'PDF', size: '5.1 MB', downloads: 421 },
  { id: 'f6', name: 'Curriculum Guide.pdf', type: 'PDF', size: '3.2 MB', downloads: 980 },
  { id: 'f7', name: 'Code of Conduct.pdf', type: 'PDF', size: '1.1 MB', downloads: 1640 },
  { id: 'f8', name: 'Sports Schedule.xlsx', type: 'XLSX', size: '42 KB', downloads: 312 },
]

const CONTACT_MESSAGES = [
  { id: 'cm1', name: 'Jennifer Hayes', email: 'j.hayes@email.com', subject: 'Admission inquiry for Grade 6', date: 'Apr 14, 2025', status: 'New' },
  { id: 'cm2', name: 'Robert Lin', email: 'r.lin@email.com', subject: 'Tour scheduling request', date: 'Apr 13, 2025', status: 'New' },
  { id: 'cm3', name: 'Aisha Mohamed', email: 'a.mohamed@email.com', subject: 'Scholarship information', date: 'Apr 12, 2025', status: 'Read' },
  { id: 'cm4', name: 'David Chen', email: 'd.chen@email.com', subject: 'Bus route question', date: 'Apr 11, 2025', status: 'Read' },
  { id: 'cm5', name: 'Maria Gomez', email: 'm.gomez@email.com', subject: 'Volunteer opportunity', date: 'Apr 10, 2025', status: 'Read' },
  { id: 'cm6', name: 'Thomas Wright', email: 't.wright@email.com', subject: 'Career fair participation', date: 'Apr 09, 2025', status: 'Read' },
]

const ADMIN_ANNOUNCEMENTS = [
  { id: 'aa1', title: 'Spring Break Notice', audience: 'All', date: 'Apr 08, 2025', body: 'School will be closed from April 14-18 for spring break. Classes resume Monday, April 21.' },
  { id: 'aa2', title: 'Faculty Meeting', audience: 'Teachers', date: 'Apr 05, 2025', body: 'Monthly faculty meeting scheduled for Friday at 3:30 PM in the conference room.' },
  { id: 'aa3', title: 'Report Card Distribution', audience: 'Parents', date: 'Apr 02, 2025', body: 'Quarterly report cards will be sent home with students on Friday.' },
]

const PERMISSIONS_MATRIX = [
  { role: 'Admin', perms: [true, true, true, true, true, true] },
  { role: 'Teacher', perms: [true, false, true, true, true, false] },
  { role: 'Student', perms: [true, false, false, false, true, false] },
  { role: 'Parent', perms: [true, false, false, false, true, false] },
]
const PERMISSION_LABELS = ['View Dashboard', 'Manage Users', 'Edit Grades', 'Post Announcements', 'Send Messages', 'Manage Events']

const NOTIFICATIONS_ADMIN = [
  { title: '3 new admission applications', time: '12 min ago' },
  { title: 'System backup completed', time: '2 hr ago' },
  { title: 'Faculty meeting at 3:30 PM', time: '3 hr ago' },
  { title: 'Quarterly reports due Friday', time: '1 day ago' },
]

// ============================================================
// Main component
// ============================================================

const NAV_ITEMS: PortalNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'users', label: 'Users', icon: 'Users', badge: 13 },
  { id: 'students', label: 'Students', icon: 'GraduationCap' },
  { id: 'teachers', label: 'Teachers', icon: 'UserCog' },
  { id: 'parents', label: 'Parents', icon: 'UsersRound' },
  { id: 'admissions', label: 'Admissions', icon: 'FileCheck', badge: 28 },
  { id: 'courses', label: 'Courses', icon: 'BookOpen' },
  { id: 'grades', label: 'Grades', icon: 'ClipboardList' },
  { id: 'attendance', label: 'Attendance', icon: 'ClipboardCheck' },
  { id: 'events', label: 'Events', icon: 'Calendar' },
  { id: 'gallery', label: 'Gallery', icon: 'Image' },
  { id: 'news', label: 'News', icon: 'Newspaper' },
  { id: 'announcements', label: 'Announcements', icon: 'Megaphone' },
  { id: 'files', label: 'Files', icon: 'FolderOpen' },
  { id: 'messages', label: 'Messages', icon: 'Mail', badge: 2 },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
]

export function AdminPortal() {
  const session = useNav((s) => s.session)
  const userName = session?.name ?? 'Dr. Jonathan Pierce'
  const [active, setActive] = React.useState('dashboard')

  return (
    <PortalShell
      role="admin"
      title="Admin Panel"
      navItems={NAV_ITEMS}
      activeSection={active}
      onSectionChange={setActive}
      userName={userName}
      userMeta="Principal · Administrator"
      notifications={NOTIFICATIONS_ADMIN}
    >
      {active === 'dashboard' && <DashboardSection />}
      {active === 'users' && <UsersSection />}
      {active === 'students' && <StudentsAdminSection />}
      {active === 'teachers' && <TeachersSection />}
      {active === 'parents' && <ParentsSection />}
      {active === 'admissions' && <AdmissionsSection />}
      {active === 'courses' && <CoursesSection />}
      {active === 'grades' && <GradesAdminSection />}
      {active === 'attendance' && <AttendanceAdminSection />}
      {active === 'events' && <EventsSection />}
      {active === 'gallery' && <GallerySection />}
      {active === 'news' && <NewsSection />}
      {active === 'announcements' && <AdminAnnouncementsSection />}
      {active === 'files' && <FilesSection />}
      {active === 'messages' && <ContactMessagesSection />}
      {active === 'settings' && <SettingsSection />}
    </PortalShell>
  )
}

// ============================================================
// Shared helpers
// ============================================================

function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pl-9" />
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variant: 'default' | 'secondary' | 'outline' = status === 'Active' || status === 'Published' || status === 'Upcoming' || status === 'Accepted' ? 'default' : status === 'Suspended' || status === 'Rejected' || status === 'Inactive' ? 'outline' : 'secondary'
  const color = (status === 'Active' || status === 'Published' || status === 'Upcoming' || status === 'Accepted') ? 'text-emerald-600'
    : (status === 'Suspended' || status === 'Rejected' || status === 'Inactive') ? 'text-rose-600'
    : 'text-amber-600'
  return (
    <Badge variant={variant} className={cn('text-[10px] font-semibold', color)}>{status}</Badge>
  )
}

// ============================================================
// 1. Dashboard
// ============================================================

function DashboardSection() {
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Admin Dashboard"
        description="School-wide overview for the 2024-25 academic year."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PortalStat label="Total Students" value="1,840" icon="GraduationCap" trend="+2.4%" accent="primary" />
        <PortalStat label="Teachers" value="142" icon="Users" trend="+5 new" accent="teal" />
        <PortalStat label="Annual Revenue" value="$4.2M" icon="DollarSign" trend="+8.1%" accent="primary" />
        <PortalStat label="Pending Admissions" value="28" icon="FileCheck" accent="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-5 text-primary" /> Enrollment Trend
            </CardTitle>
            <CardDescription>Last 8 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ENROLLMENT_TREND} margin={{ left: -16, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" domain={[1600, 1900]} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                  <Area type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2.5} fill="url(#enrollGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="size-5 text-primary" /> Grade Distribution
            </CardTitle>
            <CardDescription>Current term</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={GRADE_DISTRIBUTION} margin={{ left: -16, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="grade" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} cursor={{ fill: 'rgba(16,185,129,0.08)' }} />
                  <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Admission Applications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ADMISSIONS.slice(0, 5).map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.applicant}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{a.grade}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.date}</TableCell>
                      <TableCell><StatusBadge status={a.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="size-5 text-amber-600" /> System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'Storage 78% full', desc: 'Consider archiving old records', color: 'amber' },
              { title: '3 users suspended', desc: 'Review access policy violations', color: 'rose' },
              { title: 'Backup successful', desc: 'Auto backup ran at 2:00 AM', color: 'emerald' },
              { title: 'Term ends in 6 weeks', desc: 'Prepare report cards', color: 'primary' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3">
                <span className={cn('mt-1 size-2 shrink-0 rounded-full', a.color === 'amber' && 'bg-amber-500', a.color === 'rose' && 'bg-rose-500', a.color === 'emerald' && 'bg-emerald-500', a.color === 'primary' && 'bg-primary')} />
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================================
// 2. Users
// ============================================================

function UsersSection() {
  const [query, setQuery] = React.useState('')
  const [role, setRole] = React.useState('all')
  const [users, setUsers] = React.useState(USERS)

  const filtered = users.filter((u) => {
    const q = query.toLowerCase()
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchR = role === 'all' || u.role === role
    return matchQ && matchR
  })

  const toggleStatus = (id: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
  }

  const roleBadge = (r: string) => {
    const cls = r === 'Admin' ? 'text-rose-600' : r === 'Teacher' ? 'text-teal-600' : r === 'Student' ? 'text-emerald-600' : 'text-amber-600'
    return <Badge variant="secondary" className={cn('text-[10px] font-semibold', cls)}>{r}</Badge>
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader title="User Management" description={`${users.length} registered users across the platform.`} />
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput value={query} onChange={setQuery} placeholder="Search users..." />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Role:</span>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-9 w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Teacher">Teacher</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Parent">Parent</SelectItem>
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
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">{u.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                    <TableCell>{roleBadge(u.role)}</TableCell>
                    <TableCell><StatusBadge status={u.status} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className={cn('h-8 text-xs', u.status === 'Active' ? 'text-rose-600' : 'text-emerald-600')}>
                            <Ban className="size-3.5" /> {u.status === 'Active' ? 'Suspend' : 'Activate'}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{u.status === 'Active' ? 'Suspend user?' : 'Activate user?'}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {u.status === 'Active'
                                ? `${u.name} will lose access to the portal immediately.`
                                : `${u.name} will regain portal access.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                toggleStatus(u.id)
                                toast.success(u.status === 'Active' ? `User suspended: ${u.name}` : `User activated: ${u.name}`)
                              }}
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
// 3. Students (admin)
// ============================================================

function StudentsAdminSection() {
  const [query, setQuery] = React.useState('')
  const filtered = STUDENTS_ADMIN.filter((s) => {
    const q = query.toLowerCase()
    return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.guardian.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Student Management"
        description={`${STUDENTS_ADMIN.length} students enrolled.`}
        action={<Button onClick={() => toast.success('Add student dialog opened')}><Plus className="size-4" /> Add Student</Button>}
      />
      <Card>
        <CardContent className="pt-6"><SearchInput value={query} onChange={setQuery} placeholder="Search students..." /></CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.id}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{s.grade}</Badge></TableCell>
                    <TableCell className="text-sm">{s.class}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.guardian}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.enrolled}</TableCell>
                    <TableCell><StatusBadge status={s.status} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success(`Viewing ${s.name}`)}><Eye className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success(`Editing ${s.name}`)}><Pencil className="size-4" /></Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 text-rose-600"><Trash2 className="size-4" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete student?</AlertDialogTitle>
                              <AlertDialogDescription>This will permanently remove {s.name} ({s.id}) from the system.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => toast.success(`Student deleted: ${s.name}`)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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
// 4. Teachers
// ============================================================

function TeachersSection() {
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({ name: '', dept: 'Mathematics', subjects: '', email: '', phone: '', exp: '' })

  const submit = () => {
    if (!form.name || !form.email) { toast.error('Please fill in name and email'); return }
    toast.success('Teacher added!', { description: form.name })
    setForm({ name: '', dept: 'Mathematics', subjects: '', email: '', phone: '', exp: '' })
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Teacher Management"
        description={`${TEACHERS.length} faculty members across departments.`}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="size-4" /> Add Teacher</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>Enter the teacher's details to create their profile.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Full Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" placeholder="e.g. Mr. John Smith" /></div>
                  <div>
                    <Label>Department</Label>
                    <Select value={form.dept} onValueChange={(v) => setForm({ ...form, dept: v })}>
                      <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Mathematics', 'Science', 'English', 'History', 'Arts', 'Languages', 'Physical Ed', 'Computer Sci'].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Subjects</Label><Input value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} className="mt-1.5" placeholder="e.g. Algebra, Calculus" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" /></div>
                  <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" /></div>
                </div>
                <div><Label>Experience</Label><Input value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} className="mt-1.5" placeholder="e.g. 8 yrs" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit}>Add Teacher</Button>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TEACHERS.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{t.dept}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.subjects}</TableCell>
                    <TableCell className="text-sm">{t.classes}</TableCell>
                    <TableCell className="text-sm">{t.exp}</TableCell>
                    <TableCell><StatusBadge status={t.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success(`Editing ${t.name}`)}><Pencil className="size-4" /></Button>
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
// 5. Parents
// ============================================================

function ParentsSection() {
  return (
    <div className="space-y-6">
      <PortalSectionHeader title="Parent Management" description={`${PARENTS.length} parents registered.`} action={<Button onClick={() => toast.success('Add parent dialog opened')}><Plus className="size-4" /> Add Parent</Button>} />
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Children</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PARENTS.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.email}</TableCell>
                    <TableCell className="text-sm">{p.phone}</TableCell>
                    <TableCell className="text-sm">{p.children}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success(`Editing ${p.name}`)}><Pencil className="size-4" /></Button>
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
// 6. Admissions
// ============================================================

function AdmissionsSection() {
  const [apps, setApps] = React.useState(ADMISSIONS)

  const setStatus = (id: string, status: string) => {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status } : a))
    toast.success(`Application ${status.toLowerCase()}`, { description: apps.find((a) => a.id === id)?.applicant })
  }

  const pending = apps.filter((a) => a.status === 'Pending').length
  const reviewing = apps.filter((a) => a.status === 'Reviewing').length
  const accepted = apps.filter((a) => a.status === 'Accepted').length

  return (
    <div className="space-y-6">
      <PortalSectionHeader title="Admissions" description="Review and process admission applications." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-amber-600">{pending}</p><p className="text-sm text-muted-foreground">Pending</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-teal-600">{reviewing}</p><p className="text-sm text-muted-foreground">Reviewing</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-emerald-600">{accepted}</p><p className="text-sm text-muted-foreground">Accepted</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-2xl font-bold">{apps.length}</p><p className="text-sm text-muted-foreground">Total</p></CardContent></Card>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.applicant}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{a.grade}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.parent}</TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1 text-xs text-emerald-600" onClick={() => setStatus(a.id, 'Accepted')}>
                          <Check className="size-3.5" /> Accept
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 gap-1 text-xs text-rose-600" onClick={() => setStatus(a.id, 'Rejected')}>
                          <X className="size-3.5" /> Reject
                        </Button>
                      </div>
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
// 7. Courses
// ============================================================

function CoursesSection() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Course Management"
        description={`${COURSES.length} active courses across departments.`}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="size-4" /> Add Course</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>Create a new course offering.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div><Label>Course Name</Label><Input className="mt-1.5" placeholder="e.g. AP Chemistry" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Code</Label><Input className="mt-1.5" placeholder="e.g. SCI-405" /></div>
                  <div>
                    <Label>Department</Label>
                    <Select defaultValue="Mathematics">
                      <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Mathematics', 'Science', 'English', 'History', 'Arts', 'Languages', 'Computer Sci'].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Teacher</Label><Input className="mt-1.5" placeholder="e.g. Mr. Okoro" /></div>
                <div><Label>Capacity</Label><Input type="number" className="mt-1.5 max-w-32" defaultValue={30} /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => { toast.success('Course created!'); setOpen(false) }}>Create Course</Button>
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
                  <TableHead>Course</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COURSES.map((c) => {
                  const pct = (c.enrolled / c.capacity) * 100
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{c.code}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{c.dept}</Badge></TableCell>
                      <TableCell className="text-sm">{c.teacher}</TableCell>
                      <TableCell>
                        <span className={cn('text-sm font-medium', pct >= 100 && 'text-rose-600')}>{c.enrolled}</span>
                        <span className="text-xs text-muted-foreground"> / {c.capacity}</span>
                      </TableCell>
                      <TableCell>
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                          <div className={cn('h-full rounded-full', pct >= 100 ? 'bg-rose-500' : pct >= 80 ? 'bg-amber-500' : 'bg-emerald-500')} style={{ width: `${pct}%` }} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success(`Editing ${c.name}`)}><Pencil className="size-4" /></Button>
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
// 8. Grades (admin overview)
// ============================================================

function GradesAdminSection() {
  return (
    <div className="space-y-6">
      <PortalSectionHeader title="Grade Overview" description="Department-wise grade distribution and class averages." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Grade Distribution by Department</CardTitle>
            <CardDescription>A/B/C grade counts per department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEPT_GRADES} margin={{ left: -16, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="dept" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} cursor={{ fill: 'rgba(16,185,129,0.08)' }} />
                  <Bar dataKey="A" stackId="g" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="B" stackId="g" fill="#f59e0b" />
                  <Bar dataKey="C" stackId="g" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-emerald-500" /> A</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-amber-500" /> B</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-rose-500" /> C</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Class Averages</CardTitle>
            <CardDescription>Top performing classes this term</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Avg</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CLASS_AVERAGES.map((c, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{c.class}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.teacher}</TableCell>
                      <TableCell className="text-sm">{c.students}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('text-[10px] font-semibold', c.avg >= 90 ? 'text-emerald-600' : c.avg >= 80 ? 'text-amber-600' : 'text-rose-600')}>
                          {c.avg}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================================
// 9. Attendance (admin)
// ============================================================

function AttendanceAdminSection() {
  return (
    <div className="space-y-6">
      <PortalSectionHeader title="School-wide Attendance" description="Weekly attendance rate and grade-level breakdown." />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Attendance Rate</CardTitle>
          <CardDescription>April 7 – April 11, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ATTENDANCE_WEEK} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" domain={[90, 100]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 5, fill: '#10b981' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance by Grade</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Grade</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Absent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ATTENDANCE_BY_GRADE.map((g) => (
                  <TableRow key={g.grade}>
                    <TableCell className="font-medium">{g.grade}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-semibold text-emerald-600">{g.rate}%</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{g.present}</TableCell>
                    <TableCell className="text-sm text-rose-600">{g.absent}</TableCell>
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
// 10. Events
// ============================================================

function EventsSection() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Event Management"
        description={`${EVENTS_ADMIN.length} events scheduled.`}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="size-4" /> Add Event</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Event</DialogTitle>
                <DialogDescription>Create a new event for the school calendar.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div><Label>Event Title</Label><Input className="mt-1.5" placeholder="e.g. Spring Concert" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Date</Label><Input type="date" className="mt-1.5" /></div>
                  <div>
                    <Label>Category</Label>
                    <Select defaultValue="Academic">
                      <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Academic', 'Sports', 'Arts', 'Ceremony', 'Meeting', 'Activities'].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>Location</Label><Input className="mt-1.5" placeholder="e.g. Main Hall" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => { toast.success('Event scheduled!'); setOpen(false) }}>Add Event</Button>
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
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EVENTS_ADMIN.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.title}</TableCell>
                    <TableCell className="text-sm">{e.date}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{e.category}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{e.location}</TableCell>
                    <TableCell><StatusBadge status={e.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success(`Editing ${e.title}`)}><Pencil className="size-4" /></Button>
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
// 11. Gallery
// ============================================================

function GallerySection() {
  const [items, setItems] = React.useState(GALLERY_ADMIN)
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({ title: '', category: 'Academic' })

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    toast.success('Image removed')
  }

  const upload = () => {
    if (!form.title) { toast.error('Please add a title'); return }
    setItems((prev) => [{ id: `g${Date.now()}`, title: form.title, category: form.category }, ...prev])
    toast.success('Image uploaded!', { description: form.title })
    setForm({ title: '', category: 'Academic' })
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Gallery Management"
        description={`${items.length} images in the public gallery.`}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Upload className="size-4" /> Upload Image</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Image</DialogTitle>
                <DialogDescription>Add a new image to the gallery.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" placeholder="e.g. Spring Concert 2025" /></div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Academic', 'Sports', 'Arts', 'Ceremony', 'Campus', 'Activities'].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 text-sm text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="size-6" />
                    Click to browse files
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={upload}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div key={g.id} className="group relative overflow-hidden rounded-xl border">
            <SmartImage seed={g.id} alt={g.title} icon="Image" className="aspect-[4/3] w-full" label={g.title} />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <div>
                <p className="text-xs font-semibold text-white">{g.title}</p>
                <p className="text-[10px] text-white/70">{g.category}</p>
              </div>
              <Button variant="destructive" size="icon" className="size-7" onClick={() => remove(g.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// 12. News
// ============================================================

function NewsSection() {
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({ title: '', category: 'Announcement', author: 'Dr. Pierce', body: '' })

  const submit = () => {
    if (!form.title) { toast.error('Please add a title'); return }
    toast.success('Article published!', { description: form.title })
    setForm({ title: '', category: 'Announcement', author: 'Dr. Pierce', body: '' })
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="News Management"
        description={`${NEWS_ADMIN.length} articles published.`}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="size-4" /> New Article</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create News Article</DialogTitle>
                <DialogDescription>Write and publish a new article.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" placeholder="Article title" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                      <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Achievement', 'Announcement', 'Events', 'Academic', 'Alumni'].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Author</Label><Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="mt-1.5" /></div>
                </div>
                <div><Label>Body</Label><Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={6} className="mt-1.5" placeholder="Article content..." /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={submit}>Publish</Button>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {NEWS_ADMIN.map((n) => (
                  <TableRow key={n.id}>
                    <TableCell className="max-w-xs font-medium">{n.title}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{n.category}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{n.date}</TableCell>
                    <TableCell className="text-sm">{n.author}</TableCell>
                    <TableCell><StatusBadge status={n.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success(`Editing ${n.title}`)}><Pencil className="size-4" /></Button>
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
// 13. Announcements (admin)
// ============================================================

function AdminAnnouncementsSection() {
  const [form, setForm] = React.useState({ audience: 'All', title: '', body: '' })
  const submit = () => {
    if (!form.title || !form.body) { toast.error('Please fill in title and body'); return }
    toast.success('Announcement published!', { description: `Audience: ${form.audience}` })
    setForm({ audience: 'All', title: '', body: '' })
  }
  return (
    <div className="space-y-6">
      <PortalSectionHeader title="Announcements" description="Publish school-wide announcements." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-base">New Announcement</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs">Audience</Label>
              <Select value={form.audience} onValueChange={(v) => setForm({ ...form, audience: v })}>
                <SelectTrigger className="mt-1.5 w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Teachers">Teachers</SelectItem>
                  <SelectItem value="Students">Students</SelectItem>
                  <SelectItem value="Parents">Parents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5" /></div>
            <div><Label className="text-xs">Body</Label><Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} className="mt-1.5" /></div>
            <Button className="w-full" onClick={submit}><Send className="size-4" /> Publish</Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Recent Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {ADMIN_ANNOUNCEMENTS.map((a) => (
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
// 14. Files
// ============================================================

function FilesSection() {
  const [files, setFiles] = React.useState(FILES_ADMIN)
  const [open, setOpen] = React.useState(false)

  const remove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    toast.success('File deleted')
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="File Management"
        description={`${files.length} files available for download.`}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Upload className="size-4" /> Upload File</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload File</DialogTitle>
                <DialogDescription>Add a new downloadable file.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div><Label>File Name</Label><Input className="mt-1.5" placeholder="e.g. Summer Camp Brochure.pdf" /></div>
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 text-sm text-muted-foreground">
                  <div className="flex flex-col items-center gap-2"><Upload className="size-6" />Click to browse</div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => { toast.success('File uploaded!'); setOpen(false) }}>Upload</Button>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><FileCheck className="size-4" /></span>
                      {f.name}
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{f.type}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{f.size}</TableCell>
                    <TableCell className="text-sm">{f.downloads.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success(`Downloading ${f.name}`)}><Download className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="size-8 text-rose-600" onClick={() => remove(f.id)}><Trash2 className="size-4" /></Button>
                      </div>
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
// 15. Contact messages
// ============================================================

function ContactMessagesSection() {
  const [selected, setSelected] = React.useState<typeof CONTACT_MESSAGES[number] | null>(null)
  const [messages, setMessages] = React.useState(CONTACT_MESSAGES)

  const open = (m: typeof CONTACT_MESSAGES[number]) => {
    setSelected(m)
    setMessages((prev) => prev.map((x) => x.id === m.id ? { ...x, status: 'Read' } : x))
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader title="Contact Messages" description={`${messages.filter((m) => m.status === 'New').length} new messages from website visitors.`} />
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => open(m)}
                className="flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-muted/30"
              >
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">{m.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={cn('text-sm', m.status === 'New' ? 'font-semibold' : 'font-medium')}>{m.name}</p>
                    <span className="text-xs text-muted-foreground">{m.date}</span>
                  </div>
                  <p className={cn('text-sm', m.status === 'New' ? 'font-medium' : 'text-muted-foreground')}>{m.subject}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                {m.status === 'New' && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
                <ChevronRight className="mt-2 size-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.subject}</DialogTitle>
            <DialogDescription>From {selected?.name} · {selected?.email}</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border bg-muted/20 p-4 text-sm">
            <p>Dear Hamza School Administration,</p>
            <p className="mt-2">I hope this message finds you well. I am reaching out regarding {selected?.subject.toLowerCase()}. I would appreciate any information you could provide about enrollment procedures, campus tours, and required documentation.</p>
            <p className="mt-2">Please let me know a convenient time to discuss further. Thank you for your time and assistance.</p>
            <p className="mt-2">Best regards,<br />{selected?.name}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
            <Button onClick={() => { toast.success(`Reply sent to ${selected?.name}`); setSelected(null) }}><Send className="size-4" /> Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ============================================================
// 16. Settings
// ============================================================

function SettingsSection() {
  const [form, setForm] = React.useState({
    name: 'Hamza School',
    tagline: 'Excellence in Education Since 1985',
    email: 'info@hamza.edu',
    phone: '+1 (555) 200-4500',
    address: '4500 Cedar Lane, Springfield, IL 62704',
    hours: 'Mon–Fri, 7:30 AM – 4:00 PM',
  })
  const [matrix, setMatrix] = React.useState(PERMISSIONS_MATRIX)

  const togglePerm = (ri: number, pi: number) => {
    setMatrix((prev) => prev.map((r, i) => i === ri ? { ...r, perms: r.perms.map((p, j) => j === pi ? !p : p) } : r))
  }

  return (
    <div className="space-y-6">
      <PortalSectionHeader
        title="Website Settings"
        description="Manage school information and role-based permissions."
        action={<Button onClick={() => toast.success('Settings saved!')}><Save className="size-4" /> Save Settings</Button>}
      />
      <Card>
        <CardHeader><CardTitle className="text-base">School Information</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><Label className="text-xs">School Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" /></div>
          <div><Label className="text-xs">Tagline</Label><Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="mt-1.5" /></div>
          <div><Label className="text-xs">Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" /></div>
          <div><Label className="text-xs">Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" /></div>
          <div className="sm:col-span-2"><Label className="text-xs">Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1.5" /></div>
          <div className="sm:col-span-2"><Label className="text-xs">Office Hours</Label><Input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} className="mt-1.5" /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="size-5 text-primary" /> Role-Based Permissions
          </CardTitle>
          <CardDescription>Configure what each role can access.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  {PERMISSION_LABELS.map((p) => <TableHead key={p} className="text-center text-xs">{p}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {matrix.map((row, ri) => (
                  <TableRow key={row.role}>
                    <TableCell className="font-medium">{row.role}</TableCell>
                    {row.perms.map((p, pi) => (
                      <TableCell key={pi} className="text-center">
                        <Checkbox checked={p} onCheckedChange={() => togglePerm(ri, pi)} className="mx-auto" />
                      </TableCell>
                    ))}
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
