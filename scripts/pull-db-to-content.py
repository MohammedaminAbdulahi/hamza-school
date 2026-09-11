#!/usr/bin/env python3
"""
Pull current database content and update src/lib/content.ts with it.

Usage:
  python3 scripts/pull-db-to-content.py

This script:
1. Fetches /api/content from the running dev server
2. Generates a new src/lib/content.ts with the DB data as defaults
3. Creates a backup of the old content.ts

Run this when you want to make the admin's current data the new code defaults.
Then commit + push to GitHub so Vercel deploys with the updated defaults.
"""

import json
import urllib.request
import sys
import os
import shutil
from datetime import datetime

CONTENT_FILE = "src/lib/content.ts"
BACKUP_FILE = "src/lib/content.ts.backup"
API_URL = "http://localhost:3000/api/content"

def fetch_content():
    try:
        with urllib.request.urlopen(API_URL, timeout=30) as resp:
            return json.loads(resp.read())
    except Exception as e:
        print(f"Error fetching from {API_URL}: {e}")
        print("Make sure the dev server is running (bun run dev)")
        sys.exit(1)

def ts(val, indent=4):
    pad = ' ' * indent
    if val is None: return 'null'
    if isinstance(val, bool): return 'true' if val else 'false'
    if isinstance(val, (int, float)): return str(val)
    if isinstance(val, str):
        escaped = val.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')
        return f"'{escaped}'"
    if isinstance(val, list):
        if not val: return '[]'
        items = ',\n'.join(f"{pad}  {ts(v, indent+2)}" for v in val)
        return f'[\n{items},\n{pad}]'
    if isinstance(val, dict):
        if not val: return '{}'
        items = ',\n'.join(f"{pad}  {k}: {ts(v, indent+2)}" for k, v in val.items())
        return f'{{\n{items},\n{pad}}}'
    return 'null'

def main():
    print("Fetching content from database...")
    data = fetch_content()
    s = data.get('school', {})
    hero = s.get('hero', {})
    principal = s.get('principal', {})
    vp = s.get('vicePrincipal', {})
    mission = s.get('mission', {})
    stats = s.get('stats', [])
    social = s.get('social', {})

    # Backup
    if os.path.exists(CONTENT_FILE):
        shutil.copy2(CONTENT_FILE, BACKUP_FILE)
        print(f"Backed up old content.ts to {BACKUP_FILE}")

    lines = []
    lines.append("// ============================================================")
    lines.append("// HAMZA SCHOOL — ALL EDITABLE CONTENT IN ONE FILE")
    lines.append("// ============================================================")
    lines.append(f"// Last synced from database: {datetime.now().isoformat()}")
    lines.append("// Run `python3 scripts/pull-db-to-content.py` to re-sync.")
    lines.append("// ============================================================")
    lines.append("")

    # SCHOOL
    lines.append("export const SCHOOL = {")
    lines.append(f"  name: {ts(s.get('name', 'Hamza School'))},")
    lines.append(f"  tagline: {ts(s.get('tagline', ''))},")
    lines.append(f"  subtitle: {ts(s.get('subtitle', ''))},")
    lines.append(f"  established: {ts(s.get('established', 2015))},")
    lines.append(f"  email: {ts(s.get('email', ''))},")
    lines.append(f"  phone: {ts(s.get('phone', ''))},")
    lines.append(f"  altPhone: {ts(s.get('altPhone', ''))},")
    lines.append(f"  address: {ts(s.get('address', ''))},")
    lines.append(f"  hours: {ts(s.get('hours', ''))},")
    lines.append(f"  social: {{")
    for k in ['facebook', 'twitter', 'instagram', 'youtube', 'telegram']:
        lines.append(f"    {k}: {ts(social.get(k, ''))},")
    lines.append(f"  }},")
    lines.append("}")
    lines.append("")

    # HERO
    lines.append("export const HERO = {")
    lines.append(f"  eyebrow: {ts(hero.get('eyebrow', ''))},")
    lines.append(f"  title: {ts(hero.get('title', ''))},")
    lines.append(f"  description: {ts(hero.get('description', ''))},")
    lines.append(f"  primaryButton: {ts(hero.get('primaryButton', ''))},")
    lines.append(f"  secondaryButton: {ts(hero.get('secondaryButton', ''))},")
    lines.append("  propheticQuote: 'Seeking knowledge is an obligation upon every individual.',")
    lines.append("  propheticSource: 'Prophet Muhammad ﷺ',")
    lines.append("  trustBadges: ['Licensed by MoE', 'Grades 1–8', 'Small Classes', 'Faith-Based'],")
    lines.append("  foundationLabels: ['Knowledge', 'Faith', 'Character', 'Excellence'],")
    lines.append("}")
    lines.append("")

    # STATS
    lines.append("export const STATS = [")
    for stat in stats:
        lines.append(f"  {{ label: {ts(stat.get('label', ''))}, value: {ts(stat.get('value', 0))}, suffix: {ts(stat.get('suffix', ''))} }},")
    lines.append("]")
    lines.append("")

    # WHY_CHOOSE (static)
    lines.append("export const WHY_CHOOSE = [")
    lines.append("  { icon: 'BookOpen', title: 'Quality Education', description: 'Strong academic programs designed for success — from early literacy to national exam readiness.' },")
    lines.append("  { icon: 'HeartHandshake', title: 'Faith & Values', description: 'Building strong moral character rooted in Islamic values — honesty, kindness, and responsibility.' },")
    lines.append("  { icon: 'Users', title: 'Caring Community', description: 'A supportive, family-like environment where every child belongs and is known by name.' },")
    lines.append("  { icon: 'Trophy', title: 'Future Leaders', description: 'Preparing students to lead with integrity and make a positive impact in their communities.' },")
    lines.append("]")
    lines.append("")

    # MISSION
    lines.append("export const MISSION = {")
    lines.append(f"  eyebrow: {ts(mission.get('eyebrow', ''))},")
    lines.append(f"  title: {ts(mission.get('title', ''))},")
    lines.append(f"  description: {ts(mission.get('description', ''))},")
    lines.append(f"  quote: {ts(mission.get('quote', ''))},")
    lines.append(f"  quoteSource: {ts(mission.get('quoteSource', ''))},")
    lines.append("}")
    lines.append("")

    # PRINCIPAL
    lines.append("export const PRINCIPAL = {")
    lines.append(f"  name: {ts(principal.get('name', ''))},")
    lines.append(f"  title: {ts(principal.get('title', ''))},")
    lines.append(f"  message: {ts(principal.get('message', ''))},")
    lines.append(f"  signature: {ts(principal.get('signature', ''))},")
    lines.append("}")
    lines.append("")

    # VICE PRINCIPAL (only if name exists)
    if vp.get('name'):
        lines.append("export const VICE_PRINCIPAL = {")
        lines.append(f"  name: {ts(vp.get('name', ''))},")
        lines.append(f"  title: {ts(vp.get('title', ''))},")
        lines.append(f"  message: {ts(vp.get('message', ''))},")
        lines.append("}")
        lines.append("")

    # PROGRAMS (static)
    lines.append("export const PROGRAMS = [")
    lines.append("  { icon: 'BookOpen', title: 'Lower Primary (1–4)', level: 'Grades 1–4', description: 'Building strong foundations in literacy, numeracy, and curiosity — with hands-on learning and plenty of joy.' },")
    lines.append("  { icon: 'Pencil', title: 'Upper Primary (5–6)', level: 'Grades 5–6', description: 'Deepening knowledge and independence, with focused prep for the Grade 6 national examination.' },")
    lines.append("  { icon: 'Lightbulb', title: 'Junior Secondary (7–8)', level: 'Grades 7–8', description: 'Critical thinking, scientific inquiry in our biology lab, and rigorous readiness for the Grade 8 exam.' },")
    lines.append("]")
    lines.append("")

    # GRADE_LEVELS, SCIENCE_FEATURES (static)
    lines.append("export const GRADE_LEVELS = [")
    lines.append("  { band: 'Lower Primary', grades: 'Grades 1–4', ages: 'Ages 6–9', milestones: 'Foundational literacy, numeracy, and a love for learning' },")
    lines.append("  { band: 'Upper Primary', grades: 'Grades 5–6', ages: 'Ages 10–11', milestones: 'Deeper subject knowledge and focused Grade 6 national exam preparation' },")
    lines.append("  { band: 'Junior Secondary', grades: 'Grades 7–8', ages: 'Ages 12–14', milestones: 'Scientific inquiry in our biology lab and rigorous Grade 8 exam readiness' },")
    lines.append("]")
    lines.append("")

    lines.append("export const SCIENCE_FEATURES = [")
    lines.append("  { icon: 'Microscope', title: 'Biology Laboratory', description: 'Our flagship lab gives Grades 7–8 hands-on time with microscopes, plant and animal specimens, and real experiments.' },")
    lines.append("  { icon: 'Leaf', title: 'Nature & Observation', description: 'Students observe local plants, insects, and weather patterns — learning science by studying the world just outside our classroom doors.' },")
    lines.append("  { icon: 'Sprout', title: 'Environment Club Projects', description: 'From composting to a small school garden, our students learn sustainability and the science of caring for our corner of Addis Ababa.' },")
    lines.append("  { icon: 'Sun', title: 'Science Fair & Discovery', description: 'Every year, students choose a question they care about — from clean water to healthy soil — and present their findings at our annual science fair.' },")
    lines.append("]")
    lines.append("")

    # LANGUAGES (updated — no French, has Afan Oromoo)
    lines.append("export const LANGUAGES = [")
    lines.append("  { name: 'English', icon: 'BookOpen', level: 'Primary Language of Instruction', description: 'English is used across all subjects from Grade 1, with daily reading, writing, and speaking practice throughout the school.', proficiency: 95 },")
    lines.append("  { name: 'Amharic', icon: 'Languages', level: 'Core Subject (Daily)', description: 'Amharic is taught every day as a core subject — covering reading, writing, grammar, and Ethiopian literature and culture.', proficiency: 95 },")
    lines.append("  { name: 'Afan Oromoo', icon: 'Languages', level: 'Core Subject', description: 'Afan Oromoo is taught as a core subject — covering reading, writing, grammar, and Oromo culture and literature.', proficiency: 100 },")
    lines.append("]")
    lines.append("")

    # LABS, ARTS_FEATURES (static)
    lines.append("export const LABS = [")
    lines.append("  { name: 'Biology Laboratory', iconName: 'Microscope', description: 'Our only dedicated science lab — equipped with compound and stereo microscopes, slides, preserved specimens, and simple experiment kits. Every Grade 7–8 student uses it weekly.', equipment: ['Microscopes ×15', 'Prepared slides', 'Plant & animal specimens', 'Simple experiment kits'] },")
    lines.append("]")
    lines.append("")

    lines.append("export const ARTS_FEATURES = [")
    lines.append("  { icon: 'Music', title: 'Music & Singing', description: 'Our music club learns traditional Ethiopian songs alongside simple recorder and keyboard — performing at school assemblies and holiday events.' },")
    lines.append("  { icon: 'Palette', title: 'Art & Craft', description: 'Students explore drawing, painting, and craft using local materials — building creativity and fine motor skills.' },")
    lines.append("]")
    lines.append("")

    # DEPARTMENTS (from DB or static — no subjects field)
    depts = data.get('departments', [])
    lines.append("export const DEPARTMENTS = [")
    if depts:
        for d in depts:
            lines.append(f"  {{ name: {ts(d.get('name', ''))}, head: {ts(d.get('head', ''))}, icon: {ts(d.get('icon', 'Building'))} }},")
    else:
        lines.append("  { name: 'Mathematics & Computing', head: 'Mrs. Hiwot Tadesse', icon: 'Calculator' },")
        lines.append("  { name: 'Sciences', head: 'Mr. Dawit Kebede', icon: 'FlaskConical' },")
        lines.append("  { name: 'Languages', head: 'Mrs. Selamawit Girma', icon: 'Languages' },")
        lines.append("  { name: 'Social Studies', head: 'Mr. Bereket Mengistu', icon: 'Landmark' },")
        lines.append("  { name: 'Arts & PE', head: 'Ms. Eden Asefa', icon: 'Palette' },")
        lines.append("  { name: 'Civics & Ethics', head: 'Mr. Yonas Bekele', icon: 'Scale' },")
    lines.append("]")
    lines.append("")

    # SUBJECTS (updated — includes Afan Oromoo)
    lines.append("export const SUBJECTS = [")
    lines.append("  'Mathematics', 'English Language', 'Amharic', 'Afan Oromoo', 'Biology & General Science',")
    lines.append("  'Social Studies', 'Civics & Ethical Education', 'Geography', 'History',")
    lines.append("  'Physical Education', 'Art & Music', 'Digital Literacy',")
    lines.append("]")
    lines.append("")

    # CLUBS (from DB or static — no members, no Drama)
    clubs = data.get('clubs', [])
    lines.append("export const CLUBS = [")
    if clubs:
        for c in clubs:
            lines.append(f"  {{ name: {ts(c.get('name', ''))}, icon: {ts(c.get('icon', 'Star'))} }},")
    else:
        lines.append("  { name: 'Science Club', icon: 'FlaskConical' },")
        lines.append("  { name: 'Reading Club', icon: 'BookOpen' },")
        lines.append("  { name: 'Art Club', icon: 'Palette' },")
        lines.append("  { name: 'Sports Club', icon: 'Volleyball' },")
        lines.append("  { name: 'Environment Club', icon: 'Leaf' },")
        lines.append("  { name: 'Music Club', icon: 'Music' },")
        lines.append("  { name: 'Civics & Ethics Club', icon: 'Scale' },")
    lines.append("]")
    lines.append("")

    # SPORTS (static)
    lines.append("export const SPORTS = [")
    lines.append("  { name: 'Soccer', season: 'Fall', icon: 'Volleyball' },")
    lines.append("  { name: 'Basketball', season: 'Winter', icon: 'Basketball' },")
    lines.append("  { name: 'Volleyball', season: 'Fall', icon: 'Volleyball' },")
    lines.append("  { name: 'Athletics & Running', season: 'Spring', icon: 'PersonStanding' },")
    lines.append("]")
    lines.append("")

    # HISTORY (static)
    lines.append("export const HISTORY = [")
    lines.append("  { year: '2015', title: 'Hamza School Founded', description: 'Opened on Bole Road with 60 students and 6 teachers in a single building.' },")
    lines.append("  { year: '2018', title: 'First Grade 8 Graduates', description: 'Our inaugural Grade 8 class sat for the national exam — 92% passed.' },")
    lines.append("  { year: '2020', title: 'Biology Lab Opened', description: 'A dedicated science lab with microscopes and specimens was added for Grades 7–8.' },")
    lines.append("  { year: '2023', title: 'Grew to 850 Students', description: 'Expanded to serve over 850 students across Grades 1–8 with 48 educators.' },")
    lines.append("  { year: '2025', title: 'Digital Learning Tools', description: 'Introduced tablets and educational software to enhance classroom learning.' },")
    lines.append("]")
    lines.append("")

    # ACHIEVEMENTS, CORE_VALUES (static)
    lines.append("export const ACHIEVEMENTS = [")
    lines.append("  { title: 'Grade 8 National Exam — Top 5% in Sub-City', year: '2024', description: 'Our Grade 8 cohort scored in the top 5% of Bole Sub-City schools.', icon: 'Trophy' },")
    lines.append("  { title: 'Addis Ababa Science Fair Winners', year: '2024', description: 'Two of our students won the citywide science fair with their clean-water project.', icon: 'Medal' },")
    lines.append("  { title: 'Regional Reading Competition', year: '2023', description: 'Our reading club took first place in the regional Amharic reading competition.', icon: 'BookOpen' },")
    lines.append("  { title: 'Community Service Award', year: '2023', description: 'Recognized for over 2,000 hours of student-led community service in Bole.', icon: 'HeartHandshake' },")
    lines.append("]")
    lines.append("")

    lines.append("export const CORE_VALUES = [")
    lines.append("  { icon: 'Compass', title: 'Integrity', description: 'We act with honesty, honor, and accountability in all we do.' },")
    lines.append("  { icon: 'Sparkles', title: 'Excellence', description: 'We pursue the highest standard in scholarship and character.' },")
    lines.append("  { icon: 'HeartHandshake', title: 'Compassion', description: 'We treat every person with dignity, kindness, and respect.' },")
    lines.append("  { icon: 'Users', title: 'Community', description: 'We belong to and serve a diverse, inclusive, and vibrant family.' },")
    lines.append("  { icon: 'Lightbulb', title: 'Curiosity', description: 'We ask bold questions and seek understanding with open minds.' },")
    lines.append("  { icon: 'Globe', title: 'Faith', description: 'We root our learning and character in Islamic values and tradition.' },")
    lines.append("]")
    lines.append("")

    # LEADERSHIP (from DB)
    leaders = data.get('leadership', [])
    lines.append("export const LEADERSHIP = [")
    for l in leaders:
        lines.append(f"  {{ name: {ts(l.get('name', ''))}, role: {ts(l.get('role', ''))}, bio: {ts(l.get('bio', ''))}, initials: {ts(l.get('initials', ''))} }},")
    lines.append("]")
    lines.append("")

    # TEACHERS (from DB)
    teachers = data.get('teachers', [])
    lines.append("export const TEACHERS = [")
    for t in teachers:
        lines.append(f"  {{ name: {ts(t.get('name', ''))}, subject: {ts(t.get('subject', ''))}, years: {ts(t.get('years', 0))}, initials: {ts(t.get('initials', ''))} }},")
    lines.append("]")
    lines.append("")

    # FACILITIES (from DB)
    facilities = data.get('facilities', [])
    lines.append("export const FACILITIES = [")
    for f in facilities:
        lines.append(f"  {{ icon: {ts(f.get('icon', 'Building'))}, name: {ts(f.get('name', ''))}, description: {ts(f.get('description', ''))} }},")
    lines.append("]")
    lines.append("")

    # ACCREDITATIONS, POLICIES (static)
    lines.append("export const ACCREDITATIONS = [")
    lines.append("  'Licensed by the Ethiopian Ministry of Education',")
    lines.append("  'Addis Ababa Education Bureau Registered',")
    lines.append("  'Member, Ethiopian Private Schools Association',")
    lines.append("]")
    lines.append("")

    lines.append("export const POLICIES = [")
    lines.append("  { title: 'Attendance Policy', description: 'Students must maintain 90% attendance. Absences require parental notification before 8:00 AM.' },")
    lines.append("  { title: 'Code of Conduct', description: 'All students agree to uphold the Hamza values of integrity, respect, and responsibility.' },")
    lines.append("  { title: 'Anti-Bullying Policy', description: 'Hamza maintains a zero-tolerance stance on bullying, with a confidential reporting system.' },")
    lines.append("  { title: 'Technology Acceptable Use', description: 'Devices are used responsibly for learning, following our digital citizenship guidelines.' },")
    lines.append("  { title: 'Health & Safety', description: 'Comprehensive safeguarding, emergency drills, and on-site nursing staff protect our community.' },")
    lines.append("  { title: 'Homework Policy', description: 'Homework is purposeful and age-appropriate, capped to protect student wellbeing.' },")
    lines.append("]")
    lines.append("")

    # NEWS (from DB)
    news = data.get('news', [])
    lines.append("export const NEWS = [")
    for n in news:
        lines.append(f"  {{ title: {ts(n.get('title', ''))}, excerpt: {ts(n.get('excerpt', ''))}, date: {ts(n.get('date', ''))}, category: {ts(n.get('category', ''))}, author: {ts(n.get('author', ''))}, image: {ts(n.get('image', ''))} }},")
    lines.append("]")
    lines.append("")

    lines.append("export const NEWS_CATEGORIES = ['All', 'Campus', 'Achievement', 'Community', 'Academics', 'Arts']")
    lines.append("")

    # EVENTS (from DB)
    events = data.get('events', [])
    lines.append("export const EVENTS = [")
    for e in events:
        lines.append(f"  {{ title: {ts(e.get('title', ''))}, date: {ts(e.get('date', ''))}, time: {ts(e.get('time', ''))}, location: {ts(e.get('location', ''))}, category: {ts(e.get('category', ''))}, description: {ts(e.get('description', ''))} }},")
    lines.append("]")
    lines.append("")

    # ANNOUNCEMENTS (static)
    lines.append("export const ANNOUNCEMENTS = [")
    lines.append("  { title: 'Spring Break Notice', date: 'March 24 – 28, 2025', body: 'School will be closed for Spring Break. Classes resume Monday, March 31.', tone: 'amber', icon: 'SunMedium' },")
    lines.append("  { title: 'Parent-Teacher Conferences', date: 'Thursday, March 13, 2025', body: 'Spring conferences run from 4:00 PM to 7:30 PM.', tone: 'emerald', icon: 'Users' },")
    lines.append("  { title: 'Term 2 Report Cards Released', date: 'Friday, March 7, 2025', body: 'Report cards for Term 2 are available for pickup at the front office.', tone: 'navy', icon: 'FileText' },")
    lines.append("  { title: 'Ramadan Schedule Adjustment', date: 'Starting March 1, 2025', body: 'During Ramadan, school hours will be adjusted to 8:00 AM – 1:30 PM.', tone: 'amber', icon: 'Moon' },")
    lines.append("]")
    lines.append("")

    # GALLERY (from DB)
    gallery = data.get('gallery', [])
    lines.append("export const GALLERY = [")
    for g in gallery:
        lines.append(f"  {{ title: {ts(g.get('title', ''))}, category: {ts(g.get('category', ''))}, image: {ts(g.get('image', ''))} }},")
    lines.append("]")
    lines.append("")

    lines.append("export const GALLERY_CATEGORIES = ['All', 'Campus', 'Events', 'Sports', 'Arts', 'Culture', 'Graduation']")
    lines.append("")

    # TESTIMONIALS (static)
    lines.append("export const TESTIMONIALS = [")
    lines.append("  { name: 'Hanan Tesfaye', role: 'Parent of two students', quote: 'Hamza School feels like family. My daughter actually looks forward to her classes — the teachers truly see her.', rating: 5 },")
    lines.append("  { name: 'Yonas Bekele', role: 'Class of 2021 Alumnus', quote: 'The biology lab at Hamza opened my eyes to science. I\\'m now studying medicine at Addis Ababa University.', rating: 5 },")
    lines.append("  { name: 'Dr. Meron Girma', role: 'Parent & Education Consultant', quote: 'As someone who works in education, I can say Hamza gets it right — warm community, real learning.', rating: 5 },")
    lines.append("  { name: 'Selam Alemu', role: 'Class of 2023, now at Horizon Academy', quote: 'The national exam prep here is serious, but the teachers make it fun. I scored in the top 5% nationwide.', rating: 5 },")
    lines.append("]")
    lines.append("")

    # CONTACT (derived from SCHOOL)
    lines.append("export const CONTACT_INFO = [")
    lines.append("  { icon: 'MapPin', label: 'Address', value: SCHOOL.address, lines: [SCHOOL.address] },")
    lines.append("  { icon: 'Phone', label: 'Phone', value: SCHOOL.phone, lines: [SCHOOL.phone, SCHOOL.altPhone] },")
    lines.append("  { icon: 'Mail', label: 'Email', value: SCHOOL.email, lines: [SCHOOL.email] },")
    lines.append("  { icon: 'Clock', label: 'Office Hours', value: SCHOOL.hours, lines: [SCHOOL.hours] },")
    lines.append("]")
    lines.append("")

    lines.append("export const SOCIAL_LINKS = [")
    lines.append("  { name: 'Facebook', icon: 'Facebook', url: SCHOOL.social.facebook, color: 'hover:bg-blue-600 hover:border-blue-600' },")
    lines.append("  { name: 'Twitter', icon: 'Twitter', url: SCHOOL.social.twitter, color: 'hover:bg-sky-500 hover:border-sky-500' },")
    lines.append("  { name: 'Instagram', icon: 'Instagram', url: SCHOOL.social.instagram, color: 'hover:bg-pink-600 hover:border-pink-600' },")
    lines.append("  { name: 'YouTube', icon: 'Youtube', url: SCHOOL.social.youtube, color: 'hover:bg-red-600 hover:border-red-600' },")
    lines.append("  { name: 'Telegram', icon: 'Send', url: SCHOOL.social.telegram, color: 'hover:bg-emerald-600 hover:border-emerald-600' },")
    lines.append("]")
    lines.append("")

    lines.append("export const DEPARTMENTS_CONTACT = [")
    lines.append("  { name: 'Main Office', icon: 'Building2', email: SCHOOL.email, phone: SCHOOL.phone },")
    lines.append("  { name: 'Admissions', icon: 'GraduationCap', email: 'join@hamzaschool.et', phone: SCHOOL.altPhone },")
    lines.append("  { name: 'Accounts', icon: 'Calculator', email: 'accounts@hamzaschool.et', phone: SCHOOL.altPhone },")
    lines.append("  { name: 'Transport', icon: 'Bus', email: 'transport@hamzaschool.et', phone: SCHOOL.altPhone },")
    lines.append("]")
    lines.append("")

    lines.append("export const CONTACT_SUBJECTS = ['General Inquiry', 'Admissions', 'Visit Booking', 'Feedback']")
    lines.append("")
    lines.append("export const NEWSLETTER_TOPICS = [")
    lines.append("  'School news & announcements',")
    lines.append("  'Open house dates',")
    lines.append("  'Arts, athletics & events',")
    lines.append("]")

    with open(CONTENT_FILE, 'w') as f:
        f.write('\n'.join(lines) + '\n')

    print(f"\n✓ Updated {CONTENT_FILE} with database content")
    print(f"  School: {s.get('name', '?')}")
    print(f"  Gallery: {len(data.get('gallery', []))} items")
    print(f"  Teachers: {len(data.get('teachers', []))} teachers")
    print(f"  Leadership: {len(data.get('leadership', []))} members")
    print(f"  News: {len(data.get('news', []))} articles")
    print(f"  Events: {len(data.get('events', []))} events")
    print(f"  Facilities: {len(data.get('facilities', []))} facilities")
    print(f"\nNext steps:")
    print(f"  1. git add {CONTENT_FILE}")
    print(f"  2. git commit -m 'Sync content.ts with database'")
    print(f"  3. git push origin main")

if __name__ == '__main__':
    main()
