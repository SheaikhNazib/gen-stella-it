import { db } from '@/lib/db'
import AppShell from '@/components/layout/AppShell'
import { TeamGrid } from '@/components/sections/team'

export const metadata = {
  title: 'Team — Gen Stella IT',
  description: 'Meet the people behind Gen Stella IT.',
}

export default async function TeamPage() {
  const dbMembers = await db.teamMember.findMany({
    orderBy: { createdAt: 'asc' },
  })

  const teamMembers = dbMembers.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    bio: m.bio || '',
    image: m.image,
    email: m.email || undefined,
    social: {
      twitter: m.twitter || undefined,
      linkedin: m.linkedin || undefined,
      github: m.github || undefined,
    },
  }))

  return (
    <AppShell>
      <TeamGrid members={teamMembers} />
    </AppShell>
  )
}

