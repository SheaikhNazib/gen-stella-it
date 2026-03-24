import { db } from "@/lib/db"

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
  const posts = await db.blogPost.findMany({
    select: { slug: true },
    where: { published: true }
  })
  return posts.map((p) => p.slug)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
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
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { date: 'desc' }
  });

  return posts.map(post => ({
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
  }));
}

