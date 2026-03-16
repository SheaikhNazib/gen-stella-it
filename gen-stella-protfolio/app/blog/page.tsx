import { getAllBlogPosts } from '@/lib/blog'
import type { Metadata } from 'next'
import Link from 'next/link'
import AppShell from '@/components/layout/AppShell'
import { Calendar, Clock, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Gen Stella IT — Web Development in Bangladesh',
  description:
    'Insights and guides on web development, mobile apps, SEO, and software for Bangladeshi businesses. Written by the Gen Stella IT team.',
  alternates: { canonical: 'https://genstellait.site/blog' },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <AppShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-3">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Insights for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              Bangladesh Businesses
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Practical guides on web development, mobile apps, SEO, and choosing the right tech for your business.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">No posts yet — check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card hover:border-blue-500/40 dark:hover:border-blue-400/40 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Tags */}
                  {post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.frontmatter.tags.slice(0, 3).map((tag) => (
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
                  <h2 className="text-lg font-bold leading-snug text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 flex-1">
                    {post.frontmatter.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-5">
                    {post.frontmatter.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border mt-auto">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.frontmatter.date).toLocaleDateString('en-BD', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  )
}
