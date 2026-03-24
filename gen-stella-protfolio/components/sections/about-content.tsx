'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { TeamSection } from '@/components/sections/team'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { type TeamMember } from '@/data/team'

interface AboutContentProps {
  teamMembers: TeamMember[]
  testimonials: any[]
}

const highlights = [
  {
    title: 'Product-focused engineering',
    description: 'We blend strategy, design, and engineering to build web applications and websites that move business outcomes.',
  },
  {
    title: 'AI-native delivery',
    description: 'From copilots to automation, we help teams add practical AI features and automation where it matters.',
  },
  {
    title: 'Long-term partnerships',
    description: 'We focus on friendly, long-term partnerships — we stay involved after delivery to ensure long-term success.',
  },
]

const milestones = [
  { year: '2019', label: 'Gen Stella founded as a remote-first studio.' },
  { year: '2021', label: 'Expanded into cloud, DevOps, and data platforms.' },
  { year: '2023', label: 'Added GenAI and product strategy practices.' },
  { year: '2026', label: 'Helping 50+ partners build and scale digital products.' },
]

export function AboutContent({ teamMembers, testimonials }: AboutContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-3">
          Our Story
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
          We build software that solves{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            human problems
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
          Gen Stella IT is a product engineering studio based in Dhaka, Bangladesh. 
          We partner with forward-thinking teams to build web, mobile, and data products.
        </p>
      </motion.div>

      {/* Highlights */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 border-t border-border pt-16">
        {highlights.map((h) => (
          <div key={h.title}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{h.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{h.description}</p>
          </div>
        ))}
      </div>

      {/* Milestone/Timeline UI (Optional addition) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">Our Journey</h2>
        <div className="relative pl-4 md:pl-6">
          <div className="absolute left-1 md:left-2 top-1 bottom-1 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-transparent" />
          <div className="space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="relative pl-6">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.35)]" />
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">{m.year}</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Meet the team</h2>
        <TeamSection members={teamMembers} />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">What our clients say</h2>
        <TestimonialsSection items={testimonials} />
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 pt-16 border-t border-border"
      >
        <h2 className="text-3xl font-bold text-foreground mb-8">Common Questions</h2>
        <div className="max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does a typical project take?</AccordionTrigger>
              <AccordionContent>
                A high-quality MVP usually takes 4–8 weeks. Standard websites take 2–3 weeks. Complex platforms may take 3+ months.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do you offer maintenance after launch?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer monthly retainers for active maintenance, updates, and monitoring.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What’s your primary tech stack?</AccordionTrigger>
              <AccordionContent>
                We primarily use Next.js, React, Tailwind CSS, TypeScript, and Node.js. For databases, we prefer PostgreSQL via Supabase or Prisma.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-500 p-8 text-white">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Ready to Start Your Project?</h3>
              <p className="text-sm opacity-90 mt-1">Tell us about scope, timeline, and goals — we’ll respond within one business day.</p>
            </div>
            <div>
              <a href="/contact" className="inline-flex items-center rounded-lg bg-white/10 hover:bg-white/20 px-5 py-2 text-sm font-semibold transition">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
