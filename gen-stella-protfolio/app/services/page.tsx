import { db } from '@/lib/db'
import AppShell from '@/components/layout/AppShell'
import ServicesPageClient from './services-client'

export const metadata = {
  title: 'Services — Gen Stella IT',
  description: 'Everything you need to ship digital products.',
}

export default async function ServicesPage() {
  const dbServices = await db.service.findMany({
    orderBy: { createdAt: 'asc' },
  }).catch(() => [])

  const services = dbServices.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    features: s.features,
    technologies: s.technologies,
    icon: s.icon,
    caseStudySlug: s.caseStudySlug,
    ctaText: s.ctaText,
    ctaHref: s.ctaHref,
  }))

  return (
    <AppShell>
      <ServicesPageClient services={services} />
    </AppShell>
  )
}

