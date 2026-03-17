export interface PortfolioProject {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  image: string
  category: PortfolioCategory
  technologies: string[]
  link?: string
  caseStudy?: string
  results?: string[]
  clientName?: string
  testimonialQuote?: string
  date?: string
  featured?: boolean
}

export type PortfolioCategory =
  | 'Web App'
  | 'Mobile App'
  | 'SaaS'
  | 'E-commerce'
  | 'Dashboard'
  | 'All'
