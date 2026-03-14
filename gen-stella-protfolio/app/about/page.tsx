'use client'

import { motion } from 'framer-motion'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { teamMembers } from '@/data/team'
import { testimonials } from '@/data/testimonials'
import { TeamSection } from '@/components/sections/team'
import { TestimonialsSection } from '@/components/sections/testimonials'

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
  { year: '2024', label: 'Launched AI transformation programs with key partners.' },
]

const processSteps = [
  { label: '01 · Discover', description: 'Clarify goals, constraints and success metrics.' },
  { label: '02 · Design', description: 'Define flows, prototypes and acceptance criteria.' },
  { label: '03 · Build', description: 'Ship iteratively with production-quality code.' },
  { label: '04 · Evolve', description: 'Measure, iterate and scale post-launch.' },
]

// teamMembers now sourced from `data/team.ts` — migrate and maintain a single source of truth

export default function AboutPage() {
  return (
    <AppShell>
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[3fr,2fr] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-4">
                About Gen Stella IT
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                A partner for{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text">
                  ambitious digital teams
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Gen Stella IT is a friendly software services studio specializing in full‑stack web applications and websites.
                We design, build, and scale custom products — from marketing sites to complex internal platforms — using
                Next.js, NestJS, Express, React, and Node. We prioritize clear communication, dependable delivery, and
                solutions that solve real user problems.
              </p>

              <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                Our process begins by listening closely: we learn what you want and why it matters. From that understanding
                we craft an approved plan with clear milestones and deliverables. We build iteratively, keeping you involved
                so the product evolves with real feedback.
              </p>

              <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                Pricing is usually fixed for the agreed scope. If the scope changes — for example, new features, a larger
                code handoff, or additional integrations — the price may be adjusted accordingly. We’ll always discuss
                changes before proceeding.
              </p>

              <p className="text-base text-gray-600 dark:text-gray-400">
                We operate as a close-knit squad and prefer to keep our team size private for now. What matters is that we’re
                friendly, responsive, and committed to long-term relationships: we stay available after delivery to ensure
                your product runs smoothly and grows with your needs.
              </p>

              <div className="mt-10 grid sm:grid-cols-3 gap-6">
                {highlights.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border border-gray-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-4"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-transparent blur-xl rounded-3xl" />
              <div className="relative rounded-3xl bg-slate-950/90 dark:bg-slate-900/90 border border-white/10 overflow-hidden p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-blue-300/90">Profile</p>
                    <p className="text-sm text-slate-200 mt-1">Gen Stella IT · Studio</p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 border border-slate-900" />
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-900" />
                    <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-900" />
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Core stack</span>
                    <span className="font-medium text-white">Next.js · NestJS · Express · React · Node</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialties</span>
                    <span className="font-medium text-white">Product engineering · AI · Cloud</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement</span>
                    <span className="font-medium text-white">Fixed-price (scope-dependent)</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-slate-300">
                  <div className="rounded-xl bg-white/5 border border-white/10 py-3">
                    <p className="text-lg font-semibold text-white">—</p>
                    <p>Products shipped</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 py-3">
                    <p className="text-lg font-semibold text-white">—</p>
                    <p>Countries</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 py-3">
                    <p className="text-lg font-semibold text-white">—</p>
                    <p>Client retention</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 border-t border-gray-200 dark:border-slate-800 pt-12"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">How we got here</h2>
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
            className="mt-12"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Frequently asked</h2>
            <div className="max-w-2xl">
              <Accordion type="single" collapsible>
                <AccordionItem value="pricing">
                  <AccordionTrigger>How do you price engagements?</AccordionTrigger>
                  <AccordionContent>Usually fixed-price per agreed scope; changes are discussed before proceeding.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="tech">
                  <AccordionTrigger>What technologies do you use?</AccordionTrigger>
                  <AccordionContent>Next.js, React, Node, NestJS/Express, cloud infra — we pick the best tool for the job.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                  <AccordionTrigger>Do you provide post-launch support?</AccordionTrigger>
                  <AccordionContent>Yes — we offer handoff support, maintenance, and iterative improvements.</AccordionContent>
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
      </section>
    </AppShell>
  )
}


