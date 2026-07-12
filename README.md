# mateuspereira.dev

Personal portfolio — Senior Full-Stack / Product Software Engineer.

Single page, statically generated, obsessively polished. Built fast with AI in the loop; finished slow by hand.

## Stack

- **Next.js 15** (App Router, static generation) + **React 19** + **TypeScript**
- **SCSS design system** — one token-driven file, light/dark themes, no CSS-in-JS
- **Framer Motion** for scroll reveals and staggered entrances (respects `prefers-reduced-motion`)
- Apple system fonts for text, **Geist Mono** for technical labels

## Details that matter

- ⌘K search palette across every section
- Theme switch with zero flash — inline script resolves the theme before first paint
- CSS-drawn artifacts (architecture diagram, data pipeline, performance bars) — client work is confidential, so the abstractions are intentional
- JSON-LD, OpenGraph, sitemap, semantic landmarks — SEO and accessibility as features, not afterthoughts
- ~150 kB first load, fully static

## Run

```bash
npm install
npm run dev        # content edits
npm run dev:clean  # after structural file changes (clears .next)
```

Deployed on [Vercel](https://vercel.com).
