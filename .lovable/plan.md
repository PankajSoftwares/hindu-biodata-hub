# Free Biodata for Hindus — MVP Plan

A polished, mobile-first biodata maker with a traditional Maroon & Gold aesthetic, DM Serif Display + Fira Sans typography. Frontend-only, browser local storage, English. Production-ready foundation we can extend later (Hindi/Kannada, AI suggestions, cloud sync, QR sharing, more templates).

## What ships in this pass

### Pages (TanStack routes)
- `/` — Home: hero with CTA, animated template previews, feature grid, how-it-works, testimonials, FAQ, footer
- `/templates` — Template gallery with preview cards (filter by style)
- `/create` — Two-pane editor: form on left, **live preview** on right (stacks on mobile, with a Preview toggle)
- `/about`, `/contact`, `/privacy`, `/terms` — Static content pages

### Editor — form sections
Personal • Contact • Family • Education & Career • Horoscope • Lifestyle & Expectations. All fields from your spec included. Drag-and-drop profile photo upload (stored as base64 in local storage). Section-by-section progress indicator. Smart validation (zod). Auto-save to `localStorage` on every change with a "Last saved" indicator.

### Live preview & templates (3 to start)
1. **Traditional** — maroon header band, gold ornamental divider, Ganesh motif, serif headings
2. **Modern Minimal** — clean grid, generous whitespace, subtle accent rule
3. **Elegant Premium** — champagne background, gold borders, two-column layout

Each template renders the same biodata data dynamically. Theme color picker (3 presets) + heading font toggle.

### PDF export
`html2pdf.js` to render the active template at A4, no watermark, one-click download. Print stylesheet for browser print.

### UX polish
- Framer Motion: page fade-ins, template card hover lift, section reveals
- Glassmorphism feature cards, soft shadows, gold hairline dividers
- Dark mode toggle (editor + site chrome; templates stay print-light)
- Fully responsive, tested at mobile/tablet/desktop
- SEO meta per route, semantic HTML, lazy-loaded template thumbnails

## Design system
- Palette tokens in `src/styles.css` (oklch): background `#fdf8f1`, primary maroon `#7a1f2b`, accent gold `#c9a14a`, foreground `#1a1a1a`, plus dark-mode equivalents
- Fonts: DM Serif Display (headings) + Fira Sans (body) via Google Fonts
- Reusable shadcn components themed to tokens; no hardcoded colors

## Technical notes
- Stack stays on the project's TanStack Start + Tailwind v4 + shadcn (not Next.js — equivalent capability)
- State: local React state in editor, persisted via a tiny `useBiodataDraft` hook backed by `localStorage`
- PDF: dynamic import `html2pdf.js` only on the editor route to keep initial bundle lean
- File layout: `src/routes/*` for pages, `src/components/biodata/{Form,Preview,templates/*}`, `src/components/site/{Header,Footer,...}`, `src/lib/biodata-schema.ts`

## Explicitly deferred (next iterations)
Hindi/Kannada i18n, AI suggestions, QR code share, share-via-link, cloud accounts, additional templates, animated onboarding walkthrough. Architecture leaves clean seams for each.

## Deliverable
A polished, working MVP — real sample data, no broken buttons, PDF download works end-to-end, deployable as-is.