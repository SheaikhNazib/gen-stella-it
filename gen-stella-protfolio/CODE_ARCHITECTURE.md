# Code Architecture — Gen Stella IT

This document defines the engineering conventions for the Gen Stella IT website.
Every contributor should follow these patterns to keep the codebase scalable.

---

## 1. Directory Structure

```
app/                        # Next.js App Router pages
  ├── layout.tsx            # Root layout (fonts, ThemeProvider, metadata)
  ├── page.tsx              # Homepage
  ├── globals.css           # Single CSS entry (Tailwind + design tokens)
  ├── loading.tsx           # Global loading skeleton
  ├── error.tsx             # Global error boundary
  ├── not-found.tsx         # Custom 404
  ├── sitemap.ts            # Dynamic sitemap generation
  ├── robots.ts             # Robots.txt generation
  ├── blog/                 # Blog listing + [slug] detail
  ├── services/             # Services + pricing builder
  ├── portfolio/            # Portfolio listing
  ├── (routes)/portfolio/[slug]/ # Portfolio detail (SSG)
  ├── order/                # Order submission page
  ├── api/                  # API routes (contact, order)
  └── ...                   # about, contact, team pages

components/
  ├── layout/               # AppShell, Header, Footer, MobileNav, Breadcrumbs
  ├── sections/             # Page sections (Hero, Services, Portfolio, etc.)
  ├── ui/                   # shadcn/ui primitives (Button, Card, Dialog, etc.)
  ├── common/               # Shared utilities (DarkModeToggle, ScrollToTop)
  ├── pricing/              # Service builder components
  ├── portfolio/            # Portfolio card, gallery components
  ├── blog/                 # Blog card, TOC, MDX components
  └── seo/                  # JSON-LD structured data components

config/
  └── site.config.ts        # Single source of truth for all site configuration

content/
  └── blog/                 # MDX blog posts with frontmatter

data/                       # Static data files
  ├── services.ts
  ├── portfolio.ts
  ├── pricing.ts
  ├── team.ts
  └── testimonials.ts

lib/                        # Utilities and helpers
  ├── utils.ts              # cn() and general utilities
  ├── motion.ts             # Framer Motion variant presets
  ├── seo.ts                # Metadata generation utilities
  ├── blog.ts               # Blog MDX parsing utilities
  └── validations/          # Zod schemas for forms

types/                      # TypeScript interfaces
  ├── index.ts              # Barrel export
  ├── service.ts
  ├── portfolio.ts
  ├── pricing.ts
  ├── blog.ts
  └── team.ts

public/
  ├── logo/                 # Brand logos
  ├── portfolioImages/      # Project screenshots
  ├── team/                 # Team member avatars
  └── tech/                 # Technology SVG icons
```

---

## 2. CSR vs SSR Decision Matrix

**Default: Server Components (SSR/SSG)**. Use `'use client'` only when necessary.

| Scenario | Rendering | Why |
|----------|-----------|-----|
| Blog post pages | SSG (`generateStaticParams`) | Static content, best SEO |
| Portfolio detail | SSG (`generateStaticParams`) | Static content, best SEO |
| Service landing pages | SSR (Server Component) | SEO-critical, no interactivity |
| About, Team pages | SSR (Server Component) | Content-only |
| Homepage sections | Client Component | Framer Motion animations |
| Service Builder (pricing) | Client Component | Multi-step interactive form |
| Contact/Order forms | Client Component | Form state management |
| Header/Footer nav | Client Component | Mobile menu toggle, theme |
| Dark mode toggle | Client Component | `useTheme()` hook |
| Blog listing with filters | Client Component | Client-side filtering |

**Rule**: If a component needs `useState`, `useEffect`, `onClick`, or Framer Motion — mark it `'use client'`. Otherwise, keep it as a Server Component.

**Lazy Loading**: Use `next/dynamic` with `ssr: false` for heavy client components below the fold (e.g., service builder, carousels).

---

## 3. Data Flow

```
data/*.ts (typed static data)
  → types/*.ts (TypeScript interfaces)
    → components/ (consume via imports)
      → pages (compose sections)
```

- **All data lives in `data/`** — never hardcode lists in components.
- **All types live in `types/`** — import from `@/types`.
- **Config lives in `config/site.config.ts`** — nav items, company info, social links.
- **No duplicate data** — single source of truth per entity.

---

## 4. Animation Standards

### Framer Motion (entrance/interaction)
- Import variants from `@/lib/motion` — never define inline motion configs.
- All entrance animations use `whileInView` with `viewport={{ once: true }}`.
- Standard timing: **300ms** entrance, **80ms** stagger between siblings, **200ms** hover.
- Only animate `transform` and `opacity` properties (GPU-accelerated, no layout thrash).
- Respect `prefers-reduced-motion`: variants return `{}` when reduced motion is preferred.

### CSS (infinite/micro animations)
- Use CSS keyframes for infinite loops (marquee, pulse, spin).
- Use Tailwind `transition-*` classes for hover/focus micro-interactions.
- Keep `transition-all duration-200` as the default interactive transition.

### Performance Rules
- No `layout` animations on mobile (causes jank on lower-end devices).
- Particle animations reduce count on mobile (45 → 20 particles).
- Use `IntersectionObserver` to pause animations when off-screen.
- Never animate `width`, `height`, `top`, `left` — use `transform` instead.

---

## 5. Component Conventions

### Naming
- **Files**: PascalCase for components (`ServiceBuilder.tsx`), kebab-case for utilities (`use-mobile.tsx`).
- **Exports**: Named exports for reusable components, default exports for page components.

### Import Aliases
```typescript
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site.config'
import { fadeInUp } from '@/lib/motion'
import type { Service } from '@/types'
```

### Component Structure
```tsx
// 1. Imports
// 2. Types/interfaces (if component-specific)
// 3. Component definition
// 4. Helper components (if small, otherwise separate file)
```

---

## 6. Styling

- **Tailwind CSS** for all styling — no inline styles except dynamic values.
- **CSS Variables** defined in `app/globals.css` for theme tokens.
- **Dark mode**: `class` strategy via `next-themes`. Always provide both light and dark variants.
- **Responsive**: Mobile-first (`flex-col md:flex-row`). Test at 320px, 768px, 1024px, 1440px.
- **No `!important`** ever.

### Color Usage
```tsx
// ✅ Use semantic tokens
className="bg-background text-foreground border-border"
className="bg-muted text-muted-foreground"

// ✅ Use brand gradient for CTAs
className="bg-gradient-to-r from-blue-600 to-purple-500"

// ❌ Don't hardcode colors
className="bg-[#0f172a]"
```

---

## 7. Form Handling

- **Library**: `react-hook-form` + `zod` for validation.
- **Schemas**: Define in `lib/validations/*.ts`.
- **Pattern**: Schema → Form → API Route → Email.
- **Validation**: Client-side (zod) + server-side (same zod schema).
- **Feedback**: Inline field errors + toast for submit success/failure.

---

## 8. SEO

- Every page exports `generateMetadata()` using `@/lib/seo`.
- JSON-LD structured data via `@/components/seo/json-ld`.
- Canonical URLs on every page.
- OG + Twitter Card metadata on every page.
- Blog posts include Article schema.
- Service pages include Service schema.

---

## 9. Image Strategy

- Use `next/image` for all images (enables optimization, WebP/AVIF, lazy loading).
- Always provide `alt` text, `width`, `height`, and `sizes` prop.
- Portfolio screenshots: `sizes="(max-width: 768px) 100vw, 33vw"`.
- Hero images: `priority` prop for above-fold images.
- Placeholder: `blur` with `blurDataURL` for large images.

---

## 10. Error Handling

- `app/error.tsx`: Global error boundary with retry button.
- `app/not-found.tsx`: Branded 404 with navigation.
- API routes: Return proper HTTP status codes (400, 404, 429, 500).
- Forms: Show inline validation errors, toast on network failures.
- No silent failures — always surface errors to the user.
