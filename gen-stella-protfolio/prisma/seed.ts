import { PrismaClient } from '@prisma/client'
import { teamMembers } from '../data/team'
import { portfolioProjects } from '../data/portfolio'
import { services } from '../data/services'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  // Seed Team Members
  console.log('Seeding team members...')
  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {
        expertise: member.expertise ?? [],
      },
      create: {
        id: member.id,
        name: member.name,
        role: member.role,
        expertise: member.expertise ?? [],
        bio: member.bio,
        image: member.image,
        imagePositionX: member.imagePositionX ?? 50,
        imagePositionY: member.imagePositionY ?? 50,
        imageScale: member.imageScale ?? 1,
        email: member.email,
        twitter: member.twitter,
        linkedin: member.linkedin,
        github: member.github,
      },
    })
  }

  // Note: Testimonials are expected to be added via admin UI or external process.

  // Seed Portfolio Projects
  console.log('Seeding portfolio projects...')
  for (const project of portfolioProjects) {
    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        id: project.id,
        slug: project.slug,
        title: project.title,
        description: project.description,
        shortDescription: project.shortDescription,
        image: project.image,
        category: project.category,
        technologies: project.technologies,
        link: project.link,
        caseStudy: project.caseStudy,
        results: project.results,
        date: project.date,
      },
    })
  }

  // Seed Services
  console.log('Seeding services...')
  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        title: service.title,
        description: service.description,
        features: service.features,
        technologies: service.technologies || [],
        icon: service.icon,
        caseStudySlug: service.caseStudySlug,
        ctaText: service.ctaText,
        ctaHref: service.ctaHref,
      },
    })
  }

  console.log('✅ Seeding finished.')
}

main()
  .catch((e: Error) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
