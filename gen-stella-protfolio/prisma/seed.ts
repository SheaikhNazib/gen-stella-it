import { PrismaClient } from '@prisma/client'
import { teamMembers } from '../data/team'
import { testimonials } from '../data/testimonials'
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
      update: {},
      create: {
        id: member.id,
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image,
        email: member.email,
        twitter: member.social?.twitter,
        linkedin: member.social?.linkedin,
        github: member.social?.github,
      },
    })
  }

  // Seed Testimonials
  console.log('Seeding testimonials...')
  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: {},
      create: {
        id: testimonial.id,
        quote: testimonial.quote,
        author: testimonial.author,
        title: testimonial.title,
        company: testimonial.company,
        image: testimonial.image,
        rating: testimonial.rating || 5,
      },
    })
  }

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
