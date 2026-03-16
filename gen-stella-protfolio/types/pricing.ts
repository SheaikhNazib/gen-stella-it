export type ServiceType =
  | 'landing-page'
  | 'business-website'
  | 'ecommerce'
  | 'mobile-app'
  | 'saas-platform'
  | 'api-backend'
  | 'vps-server'
  | 'ui-ux-design'
  | 'cicd-pipeline'
  | 'maintenance'

export type TimelineOption = 'rush' | 'standard' | 'flexible'

export interface PricingTier {
  label: string
  priceBDT: number
  priceUSD: number
  /** If true, price is per-month. Otherwise one-time. */
  isMonthly?: boolean
}

export interface ServicePackage {
  id: ServiceType
  title: string
  description: string
  icon: string
  tiers: {
    starter: PricingTier
    standard: PricingTier
    premium: PricingTier
  }
  features: PricingFeature[]
  recommendedTech: string[]
}

export interface PricingFeature {
  id: string
  label: string
  description: string
  /** $ = included in starter, $$ = standard, $$$ = premium only */
  tier: '$' | '$$' | '$$$'
  /** If true, this feature is selected by default for the service type */
  default?: boolean
}

export interface OrderInquiry {
  serviceType: ServiceType
  selectedFeatures: string[]
  techStack: string[]
  timeline: TimelineOption
  estimatedPriceBDT: [number, number] // [min, max] range
  estimatedPriceUSD: [number, number]
  clientName: string
  clientEmail: string
  clientPhone?: string
  projectDescription: string
  budgetRange?: string
  preferredStartDate?: string
  referralSource?: string
}

export const TIMELINE_MULTIPLIERS: Record<TimelineOption, number> = {
  rush: 1.5,
  standard: 1.0,
  flexible: 0.85,
}

export const BDT_TO_USD_RATE = 0.0087 // Approximate rate; configurable
