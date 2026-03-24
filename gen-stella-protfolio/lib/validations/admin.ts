import * as z from "zod";

const commaSeparatedList = z
  .string()
  .optional()
  .or(z.literal(""))
  .transform((value) =>
    (value ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );

export const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  expertise: z.array(z.string()).default([]),
  bio: z.string().min(1, "Bio is required"),
  image: z.string().min(1, "Image is required"),
  imagePositionX: z.coerce.number().min(0).max(100).catch(50).default(50),
  imagePositionY: z.coerce.number().min(0).max(100).catch(50).default(50),
  imageScale: z.coerce.number().min(0.5).max(3).catch(1).default(1),
  email: z.string().email().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
});

export const teamMemberFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  expertise: commaSeparatedList,
  bio: z.string().min(1, "Bio is required"),
  image: z.string().min(1, "Image is required"),
  imagePositionX: z.coerce.number().min(0).max(100).catch(50).default(50),
  imagePositionY: z.coerce.number().min(0).max(100).catch(50).default(50),
  imageScale: z.coerce.number().min(0.5).max(3).catch(1).default(1),
  email: z.string().email().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1, "Quote is required"),
  author: z.string().min(1, "Author is required"),
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  image: z.string().optional().or(z.literal("")),
  rating: z.number().min(1).max(5).default(5),
});

export const portfolioProjectSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  image: z.string().min(1, "Image is required"),
  category: z.string(), // Matching the prisma string type
  technologies: z.array(z.string()),
  link: z.string().optional().or(z.literal("")),
  caseStudy: z.string().optional().or(z.literal("")),
  results: z.array(z.string()),
  clientName: z.string().optional().or(z.literal("")),
  testimonialQuote: z.string().optional().or(z.literal("")),
  date: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()),
  technologies: z.array(z.string()),
  icon: z.string().optional().or(z.literal("")),
  caseStudySlug: z.string().optional().or(z.literal("")),
  ctaText: z.string().optional().or(z.literal("")),
  ctaHref: z.string().optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
});

export const blogPostSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  author: z.string().min(1, "Author is required"),
  tags: z.array(z.string()),
  category: z.string(),
  featuredImage: z.string().url().optional().or(z.literal("")),
  keywords: z.array(z.string()),
  readingTime: z.string().optional().or(z.literal("")),
  content: z.string().optional().or(z.literal("")),
  published: z.boolean().default(false),
});
