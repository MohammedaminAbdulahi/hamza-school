# Task 7 — Personalize About, Academics, Admissions for Ethiopian context

## Agent
full-stack-developer

## Task
Personalize About, Academics, Admissions pages for Ethiopian context (Task ID 7). Match the warm, personal, family-like tone established by the home page personalization. Remove all references to high school, Pre-K, Kindergarten, foreign accreditations, robotics, physics/chemistry labs, dollar amounts, foreign names. Replace with Ethiopian Grade 1–8 content.

## Files Modified
1. `src/lib/data/school.ts` — updated HISTORY, ACHIEVEMENTS, DEPARTMENTS, CLUBS, SPORTS, ADMISSION_REQUIREMENTS, TUITION, FAQS arrays + LEADERSHIP bio + TEACHERS subject entries to match Ethiopian Grade 1–8 scope
2. `src/components/pages/about.tsx` — updated QUICK_STATS, PageHero, history SectionHeader, mission/vision text, principal badge year (2014→2015), facilities SectionHeader, accreditations SectionHeader + grid (4→3 cols), CTA "Riverside"→"Addis Ababa"
3. `src/components/pages/academics.tsx` — updated icon imports (removed Cpu/FlaskConical/Atom/TestTube, added Leaf/Sun/Sprout), GRADE_LEVELS (4→3 rows), PageHero, all SectionHeaders, STEM_FEATURES→SCIENCE_FEATURES reframed around biology/nature, LANGUAGES (4→3 cards: English/Amharic/French), Library section reframed as Reading Corner, LABS (3→1: only Biology lab), ARTS_FEATURES reframed for Ethiopian context, CTA
4. `src/components/pages/admissions.tsx` — GRADES (removed Pre-K, K, G9–12), PageHero description, application fee badge ($75→500 ETB), tuition header (Annual→Termly), tuition callout (Financial Aid→Sibling Discounts), form placeholders (Ethiopian names/phone/address)

## Verification
- `bun run lint` → 0 errors (clean)
- `bunx tsc --noEmit` → 0 errors in my files (about.tsx, academics.tsx, admissions.tsx, school.ts)
- `dev.log` → server running cleanly on port 3000, no compile errors
- grep verified no stale references remain (no "high school", "Pre-K", "Kindergarten", "Cognia", "IB", "Advanced Placement", "Mandarin", "Robotics", "physics lab", "chemistry lab", "Riverside", "$", "financial aid", "merit scholarship", foreign department head names, etc.) in my files

## Stage Summary
All three target pages now consistently reflect the same warm, personal, Ethiopian Grade 1–8 identity. Same tone, Addis Ababa location, Grades 1–8 only, biology lab as the ONLY lab, reading corner, Ethiopian Ministry of Education accreditation, ETB tuition, realistic Addis Ababa context throughout. All existing components, design, animations, and CTAs preserved — only TEXT CONTENT was updated.
