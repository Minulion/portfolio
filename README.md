# Modern Portfolio Template

A premium personal portfolio starter built with:

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- three.js via `@react-three/fiber`

## Included

- Intro/landing gate with Enter action
- Theme toggle (light/dark)
- Theme-aware background music scaffolding
- Interactive home sections (about, timeline, projects)
- Persistent navbar + footer/contact form
- Blog list + dynamic post pages with mock data
- Resume page with embedded PDF auto-detection
- Floating chatbot UI with `/api/chat` integration point

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

## Replace placeholder content

- Personal info and nav: `src/data/site.ts`
- Experience timeline: `src/data/experiences.ts`
- Projects: `src/data/projects.ts`
- Blog posts: `src/data/blog-posts.ts`
- Profile image: `public/profile-placeholder.svg`
- Music files:
  - `public/audio/light-theme-track.wav`
  - `public/audio/dark-theme-track.wav`
- Resume PDF:
  - `public/resume.pdf`

## Backend stubs

- Chat: `src/app/api/chat/route.ts`
- Contact form: `src/app/api/contact/route.ts`

Both endpoints include TODO comments for production integration.
