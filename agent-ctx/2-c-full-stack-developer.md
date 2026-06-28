# Task 2-c — full-stack-developer

## Task
Build Admissions + News & Events + Gallery + Contact pages for Hamza School (Next.js 16 + TS + Tailwind 4 + shadcn/ui + framer-motion).

## Files Delivered (all overwrite stubs)
1. `src/components/pages/admissions.tsx` — `AdmissionsPage`
2. `src/components/pages/news.tsx` — `NewsPage`
3. `src/components/pages/gallery.tsx` — `GalleryPage`
4. `src/components/pages/contact.tsx` — `ContactPage`

## What I Built

### Admissions (`admissions.tsx`)
- PageHero breadcrumb "Admissions"
- §1 Admission requirements — checklist Card with CheckCircle2 + SmartImage side panel + $75 fee badge
- §2 Admission process — 5-step numbered circle stepper with connecting gradient lines
- §3 Tuition — shadcn Table (grade/annual/note) + amber financial-aid callout
- §4 Online application form — 8 fields incl. grade Select; controlled state; validation; sonner toast "Application submitted!"; auto-clears
- §5 Downloadable forms — 4 cards (Application/Medical/Transport/Recommendation) → sonner "Download started"
- §6 FAQ — shadcn Accordion (single-open)
- CTA → goPage('contact')

### News & Events (`news.tsx`)
- PageHero breadcrumb "News & Events"
- §1 News articles — 6 category filter pills (All/Campus/Achievement/Community/Academics/Arts) with live counts; SmartImage header + category badge + date + title + excerpt + author; shadcn Pagination (3/page → 2 pages)
- §2 Upcoming events — 4 EVENTS with gradient date blocks, category badge, time + location meta
- §3 School calendar — March 2025 grid built dynamically (computes first weekday); highlights event dates with primary dot; legend below
- §4 Announcements — 4 cards with colored left borders (Spring Break/PTC/Report Cards/Book Fair) + newsletter CTA

### Gallery (`gallery.tsx`)
- PageHero breadcrumb "Gallery"
- Filterable masonry grid using GALLERY (12) + GALLERY_CATEGORIES with live counts + "X of Y" badge
- Responsive auto-rows grid (2/3/4 cols) with varying row-span pattern
- Hover overlay with category badge + Maximize2 icon
- Lightbox = shadcn Dialog with large SmartImage, prev/next/close, keyboard nav (Esc/←/→), photo counter, category badge
- Empty state for filtered-out categories
- CTA → Book Campus Tour / Apply Now

### Contact (`contact.tsx`)
- PageHero breadcrumb "Contact"
- §1 4 contact info cards (Address/Phone/Email/Hours) with action links (tel:/mailto:/maps)
- §2 Contact form (name, email, subject Select [General/Admissions/Careers/Feedback], message) → sonner toast "Message sent! We'll reply within 24 hours."; auto-clears
- §2b Google Map iframe (Riverside CA embed) in rounded card + social links row (FB/Twitter/IG/YT/LinkedIn with brand hover colors)
- §3 Department contacts Table (Admissions/Academic/Accounts/Transport) with icon, email (mailto), phone (tel), hours
- CTA → goPage('admissions')

## Quality
- `bun run lint` on my 4 files: **0 errors** (fixed 1 react-hooks/use-memo error — wrapped `buildMarchCalendar` in inline arrow for `useMemo`)
- `tsc --noEmit`: **0 errors** on my 4 files (pre-existing errors in academics.tsx, teacher-portal.tsx, examples/, skills/ belong to other agents)
- All `'use client'`, emerald/amber palette, `<Reveal>` on every section, semantic HTML, responsive mobile-first, all images via SmartImage

## Issues / Notes
- Dev server was not running at task end (port 3000 not listening). Per instructions did NOT restart it (system-managed). Code is compile-clean and will render when system restarts `bun run dev`.
- The 3 lint errors in `src/components/portals/portal-shell.tsx` (react-hooks/static-components — `NavList` defined inside render) are from Task 2d, NOT my files. Flagging for the main coordinator.
- TypeScript errors in `academics.tsx` (FlaskConical/Microscope not imported) and `teacher-portal.tsx` (arithmetic on non-number) are from other agents' tasks — flagging.

## Imports Used (all verified against actual exports)
- Shared: `PageHero`, `SectionHeader`, `Reveal`, `SmartImage`, `DynamicIcon` from `@/components/site/*`
- shadcn: `Card`, `CardContent`, `Button`, `Badge`, `Input`, `Label`, `Textarea`, `Select*`, `Table*`, `Accordion*`, `Dialog*`, `Pagination*`
- Data: `ADMISSION_STEPS`, `ADMISSION_REQUIREMENTS`, `TUITION`, `FAQS`, `NEWS`, `EVENTS`, `GALLERY`, `GALLERY_CATEGORIES`, `SCHOOL`
- Nav: `useNav` → `goPage`
