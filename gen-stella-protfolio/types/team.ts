export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  email?: string
  twitter?: string
  linkedin?: string
  github?: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  company: string
  image?: string
  rating?: number
}
