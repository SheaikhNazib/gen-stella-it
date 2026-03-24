import { db } from '@/lib/db'
import AppShell from '@/components/layout/AppShell'
import { PortfolioContent } from '@/components/sections/portfolio-content'
import type { Metadata } from 'next'
import { portfolioProjects } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Portfolio | Gen Stella IT',
  description: 'Selected client work from web development to data-driven platforms.',
}

function isMissingDatabaseUrlError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('Environment variable not found: DATABASE_URL')
}

export default async function PortfolioPage() {
  const projects = await db.portfolioProject.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  }).catch((error) => {
    if (isMissingDatabaseUrlError(error)) {
      return []
    }

    throw error
  })

  const portfolioItems = projects.length > 0 ? projects : portfolioProjects

  return (
    <AppShell>
      <PortfolioContent projects={portfolioItems} />
    </AppShell>
  )
}


