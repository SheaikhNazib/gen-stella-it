import { db } from '@/lib/db'
import AppShell from '@/components/layout/AppShell'
import { AboutContent } from '@/components/sections/about-content'
import { type TeamMember } from '@/data/team'

export const metadata = {
  title: 'About Gen Stella IT',
  description: 'A product engineering studio based in Dhaka, building software that solves human problems.',
}

export default async function AboutPage() {
  // Fetch team members from DB
  const dbMembers = await db.teamMember.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  // Map DB members to the expected TeamMember type (handling social fields)
  const teamMembers: TeamMember[] = dbMembers.map((member) => ({
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
  }))

  // Fetch testimonials from DB
  const dbTestimonials = await db.testimonial.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc'
    }
  }).catch((error) => {
    console.error('Failed to load testimonials for /about', error)
    return []
  })

  return (
    <AppShell>
      <main className="min-h-screen pt-16">
        <AboutContent 
          teamMembers={teamMembers} 
          testimonials={dbTestimonials} 
        />
      </main>
    </AppShell>
  )
}


