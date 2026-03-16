import { getBlogPost, getAllBlogSlugs } from '@/lib/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import AppShell from '@/components/layout/AppShell'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: `${post.frontmatter.title} | Gen Stella IT Blog`,
    description: post.frontmatter.description,
    alternates: { canonical: `https://genstellait.site/blog/${slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || 'Gen Stella IT'],
      tags: post.frontmatter.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const { frontmatter, readingTime, content } = post

  return (
    <AppShell>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: frontmatter.title,
            description: frontmatter.description,
            datePublished: frontmatter.date,
            author: {
              '@type': 'Organization',
              name: frontmatter.author || 'Gen Stella IT',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Gen Stella IT',
              url: 'https://genstellait.site',
            },
          }),
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          All articles
        </Link>

        {/* Tags */}
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-4">
          {frontmatter.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-6">{frontmatter.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-5 text-sm text-muted-foreground pb-8 border-b border-border mb-10">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(frontmatter.date).toLocaleDateString('en-BD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {readingTime}
          </span>
          {frontmatter.author && (
            <span className="text-foreground font-medium">{frontmatter.author}</span>
          )}
        </div>

        {/* MDX Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-pre:bg-muted">
          <MDXRemote source={content} />
        </div>

        {/* CTA at the end of every post */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-500 p-px">
          <div className="rounded-2xl bg-card px-8 py-8 text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Ready to build your project?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Get an instant price estimate with our interactive Service Builder — no sales call needed.
            </p>
            <Link
              href="/services/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </article>
    </AppShell>
  )
}
