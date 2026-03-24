/**
 * Site Configuration — Single source of truth
 *
 * All company info, navigation, social links, and contact details live here.
 * Import from `@/config/site.config` everywhere — never hardcode duplicates.
 */

export const siteConfig = {
  // ── Brand ──────────────────────────────────────────────
  name: 'Gen Stella IT',
  tagline: 'Innovate. Develop. Grow.',
  description:
    'Full-stack software development company in Bangladesh. We build world-class websites, mobile apps, SaaS platforms, and cloud infrastructure using React, Next.js, React Native, Node.js, and more.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://genstellait.site',
  ogImage: '/og-image.png',
  logo: '/logo/GenstellaIT.jpeg',

  // ── Contact ────────────────────────────────────────────
  email: 'niloykumarmohonta@gmail.com',
  publicEmail: 'genstellait@gmail.com',
  phone: '',
  address: 'Dhaka, Bangladesh',
  location: 'Global · Remote-first',

  // ── Social ─────────────────────────────────────────────
  social: {
    facebook: 'https://facebook.com/genstellait',
    linkedin: 'https://linkedin.com/company/genstellait',
    github: 'https://github.com/genstellait',
    twitter: 'https://x.com/genstellait',
  },

  // ── Navigation ─────────────────────────────────────────
  navItems: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/services/pricing', label: 'Pricing' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ] as const,

  // ── Footer link groups ─────────────────────────────────
  footerLinks: {
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/team', label: 'Our Team' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/contact', label: 'Contact' },
    ],
    services: [
      { href: '/services', label: 'Web Development' },
      { href: '/services', label: 'Mobile Apps' },
      { href: '/services', label: 'Cloud & DevOps' },
      { href: '/services', label: 'UI/UX Design' },
    ],
    resources: [
      { href: '/blog', label: 'Blog' },
      { href: '/services/pricing', label: 'Pricing' },
      { href: '/contact', label: 'Get a Quote' },
    ],
  },

  // ── Analytics ──────────────────────────────────────────
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',

  // ── SEO defaults ───────────────────────────────────────
  seo: {
    titleTemplate: '%s | Gen Stella IT — Web & App Development Bangladesh',
    defaultTitle: 'Gen Stella IT — Web & App Development Company in Bangladesh',
    defaultDescription:
      'Gen Stella IT builds high-performance websites, mobile apps, SaaS platforms, and cloud solutions. React, Next.js, React Native, Node.js experts in Dhaka, Bangladesh.',
    keywords: [
      'web development company bangladesh',
      'mobile app development dhaka',
      'react native developer bangladesh',
      'software development company bd',
      'next.js developer bangladesh',
      'full stack developer dhaka',
      'IT company bangladesh',
      'genstellait',
    ] as string[],
  },
} as const

export type SiteConfig = typeof siteConfig
