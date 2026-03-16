'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AppShell from '@/components/layout/AppShell'
import { portfolioProjects } from '@/data/portfolio'
import type { PortfolioProject } from '@/data/portfolio'

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const CardContent = (
    <>
      <div className="relative overflow-hidden h-52">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/0 to-transparent opacity-80" />
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white">
          {project.category}
        </span>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">{project.title}</h2>
        <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
        {project.results && project.results.length > 0 && (
          <ul className="space-y-1 mt-1">
            {project.results.slice(0, 2).map((r) => (
              <li key={r} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="text-green-500">✓</span> {r}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
              {tag}
            </span>
          ))}
        </div>
        {project.link && (
          <span className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
            View Project →
          </span>
        )}
      </div>
    </>
  )

  const cls =
    'group rounded-3xl border border-border overflow-hidden bg-card shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'

  return project.link ? (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={cls}
    >
      {CardContent}
    </motion.a>
  ) : (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={cls}
    >
      {CardContent}
    </motion.article>
  )
}

export default function PortfolioPage() {
  return (
    <AppShell>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-3">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Selected{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text">
                client work
              </span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Real projects we've shipped — from luxury e-commerce to AI-powered platforms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  )
}


