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
  category?: ServiceCategory
}

export type ServiceCategory =
  | 'web'
  | 'mobile'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'design'
  | 'auth'
