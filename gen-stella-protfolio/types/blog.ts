export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  category: BlogCategory
  featuredImage?: string
  keywords: string[]
  readingTime?: string
  content?: string
  published?: boolean
}

export type BlogCategory =
  | 'Web Development'
  | 'Mobile Development'
  | 'DevOps'
  | 'Tutorials'
  | 'Industry Insights'
  | 'All'
