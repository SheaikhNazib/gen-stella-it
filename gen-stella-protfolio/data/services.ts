/**
 * Services Data (data-driven)
 *
 * Canonical list of services shown on the Services page. Entries include
 * short descriptions, features, technologies and optional `caseStudySlug`.
 */

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  technologies?: string[]
  icon?: string
  caseStudySlug?: string
  ctaText?: string
  ctaHref?: string
}

export const services: Service[] = [
  {
    id: 'frontend',
    title: 'Frontend — Web applications',
    description:
      'High-performance, accessible web applications using Next.js, React and TypeScript.',
    features: [
      'Design systems & UI libraries',
      'Responsive & accessible UIs',
      'Performance & SEO optimization',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    caseStudySlug: 'saas-dashboard',
    ctaText: 'Get a quote',
    ctaHref: '/contact',
  },
  {
    id: 'mobile',
    title: 'Mobile — React Native & PWAs',
    description:
      'Cross-platform mobile apps and PWAs that feel native and perform reliably.',
    features: ['React Native & Expo', 'Progressive Web Apps', 'App store support'],
    technologies: ['React Native', 'Expo', 'PWA', 'TypeScript'],
    caseStudySlug: 'mobile-pwa',
    ctaText: 'Get a quote',
    ctaHref: '/contact',
  },
  {
    id: 'backend',
    title: 'Backend — APIs & Microservices',
    description:
      'Robust backend systems built with Node, NestJS or Express — scalable and testable.',
    features: ['REST / GraphQL APIs', 'Microservices & event-driven design', 'Authentication & RBAC'],
    technologies: ['Node.js', 'NestJS', 'Express', 'TypeScript'],
    caseStudySlug: 'platform-api',
    ctaText: 'Get a quote',
    ctaHref: '/contact',
  },
  {
    id: 'databases',
    title: 'Databases — PostgreSQL & MongoDB',
    description:
      'Data modelling, replication and migrations for SQL and NoSQL workloads.',
    features: ['Schema design & migrations', 'Replication & backups', 'Performance tuning'],
    technologies: ['PostgreSQL', 'MongoDB', 'Prisma'],
    caseStudySlug: 'data-architecture',
    ctaText: 'Get a quote',
    ctaHref: '/contact',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps — Hosting, VPS, Domains',
    description:
      'Deployment, observability and infra-as-code — Vercel, DigitalOcean, AWS or VPS.',
    features: ['CI/CD & pipelines', 'Infrastructure as code', 'Monitoring & SLOs'],
    technologies: ['Vercel', 'DigitalOcean', 'AWS', 'Docker'],
    caseStudySlug: 'scalable-infra',
    ctaText: 'Get a quote',
    ctaHref: '/contact',
  },
  {
    id: 'design',
    title: 'UI/UX Design — Product & Interaction',
    description:
      'User-first product design: research, flows, hi‑fi prototypes and hand-off to engineering.',
    features: ['Design sprints & workshops', 'Figma prototypes', 'Design systems & tokens'],
    technologies: ['Figma', 'Design Systems', 'Accessibility'],
    caseStudySlug: 'design-system',
    ctaText: 'Get a quote',
    ctaHref: '/contact',
  },
]

