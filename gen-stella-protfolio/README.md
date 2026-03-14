# Professional Portfolio - Project Structure

A professional, scalable Next.js portfolio structure for a tech/software company.

## Project Structure

```
├── app/
│   ├── (routes)/                 # Route segments with dynamic pages
│   │   ├── about/                # About page
│   │   ├── services/             # Services page
│   │   ├── portfolio/            # Portfolio listing
│   │   │   └── [slug]/           # Individual case study
│   │   ├── team/                 # Team members page
│   │   ├── contact/              # Contact page
│   │   └── subscriptions/        # Pricing/subscriptions page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   └── api/                      # API routes (for future use)
│
├── components/
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── sections/                 # Page sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── services.tsx
│   │   ├── portfolio.tsx
│   │   ├── team.tsx
│   │   ├── testimonials.tsx
│   │   ├── cta.tsx
│   │   └── subscriptions.tsx
│   ├── common/                   # Reusable components
│   │   ├── dark-mode-toggle.tsx
│   │   └── scroll-to-top.tsx
│   └── ui/                       # shadcn/ui components
│
├── lib/
│   ├── utils.ts                  # Utility functions
│   ├── constants.ts              # Application constants
│   ├── animations.ts             # Animation configurations
│   └── seo.ts                    # SEO utilities
│
├── data/
│   ├── team.ts                   # Team members data
│   ├── services.ts               # Services/products data
│   ├── portfolio.ts              # Portfolio projects data
│   └── testimonials.ts           # Client testimonials data
│
├── config/
│   └── site.config.ts            # Site configuration
│
├── styles/
│   ├── animations.css            # Custom animations
│   └── variables.css             # CSS design tokens
│
├── public/
│   ├── images/                   # Image assets
│   ├── icons/                    # Icon assets
│   └── logos/                    # Logo assets
│
└── hooks/
    ├── use-mobile.tsx            # Mobile breakpoint hook
    └── use-toast.ts              # Toast notification hook
```

## Key Features

- ✅ **Professional Structure**: Organized by concerns (pages, components, data, config)
- ✅ **Dark Mode Support**: CSS variables and theme provider setup
- ✅ **SEO Optimized**: Metadata utilities and structured approach
- ✅ **Animations Ready**: Pre-configured animation utilities and CSS
- ✅ **Analytics Integration**: Google Analytics setup in config
- ✅ **Responsive Design**: Mobile-first with responsive components
- ✅ **Scalable Data**: Separated data files for easy content management
- ✅ **Reusable Components**: Modular section and layout components

## Getting Started

1. **Update Configuration**
   - Edit `config/site.config.ts` with your company information
   - Update `lib/constants.ts` with navigation and contact details

2. **Add Content Data**
   - Fill in `data/team.ts` with team members
   - Add services to `data/services.ts`
   - Add portfolio projects to `data/portfolio.ts`
   - Add testimonials to `data/testimonials.ts`

3. **Create Pages**
   - Edit page files in `app/(routes)/` to build your content
   - Use components from `components/sections/` and `components/layout/`

4. **Style & Customize**
   - Update CSS design tokens in `styles/variables.css`
   - Add custom animations in `styles/animations.css`
   - Modify Tailwind config as needed

5. **Setup Dark Mode**
   - Implement theme toggle in `components/common/dark-mode-toggle.tsx`
   - Use `next-themes` or similar library for theme management

## Component Usage

### Layout Components
```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function Layout() {
  return (
    <>
      <Header />
      {/* page content */}
      <Footer />
    </>
  );
}
```

### Section Components
```tsx
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  );
}
```

## Data Management

All content data is centralized in the `data/` directory. This makes it easy to:
- Update content without touching components
- Migrate to a database later
- Keep data consistent across pages

Example:
```tsx
import { portfolioProjects } from "@/data/portfolio";

export function PortfolioSection() {
  return (
    <div>
      {portfolioProjects.map(project => (
        // render project
      ))}
    </div>
  );
}
```

## SEO Setup

Use the SEO utilities for metadata:
```tsx
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata(
  "About Us",
  "Learn about our company"
);
```

## Animation Utilities

Pre-configured animations available in `lib/animations.ts`:
- `fadeInAnimation`
- `slideInAnimation`
- `slideInUpAnimation`
- `scaleInAnimation`

CSS animations available:
- `.animate-fade-in`
- `.animate-slide-up`
- `.animate-slide-down`
- `.animate-slide-left`
- `.animate-slide-right`

## Next Steps

- [ ] Set up Google Analytics integration
- [ ] Implement dark mode toggle
- [ ] Create homepage sections
- [ ] Add team member details
- [ ] Create case studies
- [ ] Set up contact form
- [ ] Optimize images
- [ ] Deploy to Vercel

---

Happy building! 🚀
