import { db } from '@/lib/db'
import AppShell from '@/components/layout/AppShell'
import { PortfolioContent } from '@/components/sections/portfolio-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Gen Stella IT',
  description: 'Selected client work from web development to data-driven platforms.',
}

export default async function PortfolioPage() {
  const projects = await db.portfolioProject.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <AppShell>
      <PortfolioContent projects={projects} />
    </AppShell>
  )
}


