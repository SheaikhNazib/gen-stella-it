import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  author?: string
  coverImage?: string
  published?: boolean
}

export interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  readingTime: string
  content: string
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

export function getAllBlogSlugs(): string[] {
  ensureBlogDir()
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

export function getBlogPost(slug: string): BlogPost | null {
  ensureBlogDir()
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const mdPath = path.join(BLOG_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    frontmatter: {
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ? String(data.date) : '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author,
      coverImage: data.coverImage,
      published: data.published !== false,
    },
    readingTime: rt.text,
    content,
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return getAllBlogSlugs()
    .map((slug) => getBlogPost(slug))
    .filter((p): p is BlogPost => p !== null && p.frontmatter.published !== false)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}
