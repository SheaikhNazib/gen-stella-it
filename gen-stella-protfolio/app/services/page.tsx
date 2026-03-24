import { db } from '@/lib/db'
import AppShell from '@/components/layout/AppShell'
import ServicesPageClient from './services-client'
import { services as fallbackServices } from '@/data/services'

export const metadata = {
  title: 'Services — Gen Stella IT',
  description: 'Everything you need to ship digital products.',
}

function isMissingDatabaseUrlError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('Environment variable not found: DATABASE_URL')
}

export default async function ServicesPage() {
  const dbServices = await db.service.findMany({
    orderBy: { createdAt: 'asc' },
  }).catch((error) => {
    if (isMissingDatabaseUrlError(error)) {
      return []
    }

    throw error
  })

  const services = dbServices.length > 0 ? dbServices.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    features: s.features,
    technologies: s.technologies,
    icon: s.icon,
    caseStudySlug: s.caseStudySlug,
    ctaText: s.ctaText,
    ctaHref: s.ctaHref,
  })) : fallbackServices

  return (
    <AppShell>
      <ServicesPageClient services={services} />
    </AppShell>
  )
}

