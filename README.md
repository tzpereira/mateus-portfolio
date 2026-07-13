# mateuspereira.dev

Personal portfolio — Senior Full-Stack / Product Software Engineer.

Statically generated, obsessively polished. Built fast with AI in the loop; finished slow by hand.

## Stack

- **Next.js 15** (App Router, static generation) + **React 19** + **TypeScript**
- **SCSS design system** — one token-driven file, light/dark themes, no CSS-in-JS
- **Framer Motion** for scroll reveals and staggered entrances (respects `prefers-reduced-motion`)
- Apple system fonts for text, **Geist Mono** for technical labels

## Sections

Hero → Marquee → Depth (range across the stack) → Projects (public/open-source work) → Process (how I work, end to end) → AI Leverage (judgment vs. AI-driven speed) → Writing (long-form) → Contact. Plus one standalone article route under `/writing/[slug]`.

## Details that matter

- Every generative diagram — the isometric stack in Depth, the orbit walkthrough in Process, the refraction motif in AI Leverage, the plus-grid in Hero — is hand-built SVG/CSS, no stock art or charting library
- Theme switch with zero flash — inline script resolves the theme before first paint
- JSON-LD, OpenGraph, sitemap, semantic landmarks — SEO and accessibility as features, not afterthoughts
- ~155 kB first load, fully static

## Run

```bash
npm install
npm run dev        # content edits
npm run dev:clean  # after structural file changes (clears .next)
```

Deployed on [Vercel](https://vercel.com).
