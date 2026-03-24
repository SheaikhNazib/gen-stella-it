import { db } from "@/lib/db"

function isMissingDatabaseUrlError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("Environment variable not found: DATABASE_URL")
}

function handleBlogDbError(error: unknown, fallbackLabel: string) {
  if (isMissingDatabaseUrlError(error)) {
    console.warn(`[blog] ${fallbackLabel}: DATABASE_URL is not set. Returning fallback data.`)
    return
  }

  throw error
}

export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  author?: string
  coverImage?: string
  published?: boolean
  category?: string
}

export interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  readingTime: string
  content: string
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const posts = await db.blogPost.findMany({
      select: { slug: true },
      where: { published: true }
    })
    return posts.map((p) => p.slug)
  } catch (error) {
    handleBlogDbError(error, "getAllBlogSlugs")
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug }
    })
    if (!post) return null

    return {
      slug: post.slug,
      frontmatter: {
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        author: post.author,
        coverImage: post.featuredImage || undefined,
        published: post.published,
        category: post.category,
      },
      readingTime: post.readingTime || "5 min read",
      content: post.content || "",
    }
  } catch (error) {
    handleBlogDbError(error, "getBlogPost")
    return null
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { date: 'desc' }
    })

    return posts.map((post) => ({
      slug: post.slug,
      frontmatter: {
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        author: post.author,
        coverImage: post.featuredImage || undefined,
        published: post.published,
        category: post.category,
      },
      readingTime: post.readingTime || "5 min read",
      content: post.content || "",
    }))
  } catch (error) {
    handleBlogDbError(error, "getAllBlogPosts")
    return []
  }
}

