import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import AppShell from '@/components/layout/AppShell'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

function isMissingDatabaseUrlError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('Environment variable not found: DATABASE_URL')
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await db.portfolioProject.findUnique({ where: { slug } }).catch((error) => {
    if (isMissingDatabaseUrlError(error)) {
      return null
    }

    throw error
  })
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} — Gen Stella IT`,
    description: project.shortDescription,
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params

  const project = await db.portfolioProject.findUnique({
    where: { slug },
  }).catch((error) => {
    if (isMissingDatabaseUrlError(error)) {
      return null
    }

    throw error
  })

  if (!project) {
    notFound()
  }

  return (
    <AppShell>
      <article className="py-24 bg-gray-50 dark:bg-slate-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/portfolio"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block"
          >
            &larr; Back to Portfolio
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded">
                {project.category}
              </span>
              {project.featured && (
                <span className="text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded">
                  Featured
                </span>
              )}
              {project.date && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {project.date}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {project.shortDescription}
            </p>
          </div>

          {/* Hero Image */}
          {project.image && (
            <div className="rounded-2xl overflow-hidden mb-10 border border-gray-200 dark:border-slate-800">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold tracking-wider text-gray-700 dark:text-gray-300 uppercase bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Full Description */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
            <p>{project.description}</p>
          </div>

          {/* Case Study Content */}
          {project.caseStudy && (
            <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Case Study</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{project.caseStudy}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {project.results.length > 0 && (
            <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Results</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.results.map((result, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Testimonial */}
          {project.testimonialQuote && (
            <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 mb-10">
              <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
                &ldquo;{project.testimonialQuote}&rdquo;
              </blockquote>
              {project.clientName && (
                <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                  — {project.clientName}
                </p>
              )}
            </div>
          )}

          {/* Live Link */}
          {project.link && (
            <div className="text-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                View Live Project &rarr;
              </a>
            </div>
          )}
        </div>
      </article>
    </AppShell>
  )
}
