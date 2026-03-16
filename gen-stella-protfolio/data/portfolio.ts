/**
 * Portfolio Data
 * 
 * Portfolio projects and case studies
 * TODO: Add project details, images, technologies, and outcomes
 */

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
  caseStudy?: string;
  results?: string[];
  date?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'novachrono',
    title: 'NovaChrono',
    shortDescription: 'Luxury watch e-commerce platform with a premium dark-themed storefront.',
    description:
      'NovaChrono is a high-end watch e-commerce platform built for a curated collection of luxury timepieces. The project features a full product catalogue, cart, checkout, and a precision-engineered dark aesthetic that reflects the brand.',
    image: '/portfolioImages/NovaChrono.jpeg',
    category: 'E-Commerce',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    link: 'https://nova-chrono.vercel.app/',
    results: [
      'Sub-2s load time on mobile',
      'Perfect Lighthouse SEO score',
      'Full product catalogue with variant support',
    ],
    date: '2025-08',
  },
  {
    id: '2',
    slug: 'inventory-management',
    title: 'Inventory Management System',
    shortDescription: 'Full-featured inventory tracking dashboard with real-time stock management.',
    description:
      'A comprehensive inventory management system that allows businesses to track stock levels, manage assignments, monitor low-stock alerts, and generate reports — all in a clean admin dashboard.',
    image: '/portfolioImages/InventoryManagement.jpeg',
    category: 'Web Application',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    link: 'https://niloyinventory.vercel.app/',
    results: [
      'Real-time inventory dashboard',
      'Role-based access control',
      'CSV export and bulk operations',
    ],
    date: '2025-05',
  },
  {
    id: '3',
    slug: 'whattocook',
    title: 'What To Cook',
    shortDescription: 'AI-powered recipe discovery platform that matches recipes to your ingredients.',
    description:
      'What To Cook is an AI-assisted recipe discovery platform where users input the ingredients they have and receive matching recipes instantly. Features bilingual support (English/Bangla), smart ingredient matching, and a large recipe database.',
    image: '/portfolioImages/WhattoCook.jpeg',
    category: 'AI / Web Application',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'AI Integration'],
    link: 'https://whattocook-niloy.vercel.app/',
    results: [
      '500+ recipes in the database',
      'Bilingual (English + Bangla)',
      'Smart AI ingredient matching',
    ],
    date: '2025-02',
  },
];
