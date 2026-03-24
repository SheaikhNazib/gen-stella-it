import { db } from '@/lib/db'
import AppShell from '@/components/layout/AppShell'
import { AboutContent } from '@/components/sections/about-content'
import { teamMembers as fallbackTeamMembers, type TeamMember } from '@/data/team'
import { testimonials as fallbackTestimonials } from '@/data/testimonials'

export const metadata = {
  title: 'About Gen Stella IT',
  description: 'A product engineering studio based in Dhaka, building software that solves human problems.',
}

function isMissingDatabaseUrlError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('Environment variable not found: DATABASE_URL')
}

export default async function AboutPage() {
  const dbMembers = await db.teamMember.findMany({
    orderBy: {
      name: 'asc'
    }
  }).catch((error) => {
    if (isMissingDatabaseUrlError(error)) {
      return []
    }

    throw error
  })

  // Map DB members to the expected TeamMember type (handling social fields)
  const teamMembers: TeamMember[] = dbMembers.length > 0 ? dbMembers.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    image: member.image,
    bio: member.bio || "",
    imagePositionX: member.imagePositionX ?? 50,
    imagePositionY: member.imagePositionY ?? 50,
    imageScale: member.imageScale ?? 1,
    expertise: member.expertise ?? [],
    twitter: member.twitter || undefined,
    github: member.github || undefined,
    linkedin: member.linkedin || undefined,
  })) : fallbackTeamMembers

  const dbTestimonials = await db.testimonial.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc'
    }
  }).catch((error) => {
    if (isMissingDatabaseUrlError(error)) {
      return []
    }

    console.error('Failed to load testimonials for /about', error)
    return []
  })

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials

  return (
    <AppShell>
      <main className="min-h-screen pt-16">
        <AboutContent 
          teamMembers={teamMembers} 
          testimonials={testimonials} 
        />
      </main>
    </AppShell>
  )
}


