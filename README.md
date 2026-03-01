# UniMatchSG MVP

Next.js + Prisma MVP for SG A-Level admissions exploration (NUS/NTU/SMU), including:
- AY2026-style UAS calculator (70 RP core + optional rebasing boosts)
- 12-question interests quiz (16 fixed tags + 6 preference flags)
- University style mini-quiz (4 questions)
- Eligibility-first recommendations with chance labels, ABA advisory, and tier grouping
- Course detail with citations by section
- Admin update workflow (ADMIN_KEY gate + CSV import script + import logs)

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- Prisma ORM + SQLite
- Zustand for client state
- Vitest unit tests

## Setup
1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Prisma setup:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Seed starter data:
   ```bash
   npm run seed
   ```
5. Run app:
   ```bash
   npm run dev
   ```

## Routes
- `/` landing
- `/results-input` UAS input + breakdown
- `/quiz` 12-question interest quiz
- `/uni-style-quiz` 4-question style-fit quiz
- `/recommendations` eligibility-first results + filters
- `/course/[slug]` course detail + citations
- `/admin` admin key gate + update workflow instructions

## Data & yearly updates
- Starter data: `prisma/data/courses.json`
- Update yearly IGP/GES/prerequisites/intake and citation links in JSON.
- Re-run `npm run seed`.

### Required citations per field
For each course dataset entry, maintain source URLs for:
- IGP
- prerequisites
- curriculum/programme page
- salary/employment
- intake
- AI risk note source if factual claim is included

## CSV import workflow
```bash
npm run import:csv -- ./your-file.csv
```
Required minimum columns: `slug,university,name`.
Recommended additional columns include faculty, description, tags, officialUrl, citations.
Every import writes to `AdminImportLog`.

## Testing
```bash
npm run test
```
Includes:
- RP calculator scenarios
- Chance label + eligibility tier boundary tests

## Important calculation notes
- Core UAS out of 70 = best 3 H2 + H1 GP.
- PW is pass/fail only and not counted in UAS.
- Optional boosts (4th subject and/or MTL) are only included if they improve UAS using rebasing formulas.
- Admissions and fit outputs are guidance estimates, not admissions guarantees.
