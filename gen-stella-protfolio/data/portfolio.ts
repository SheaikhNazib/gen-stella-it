/**
 * Portfolio Data
 * 
 * Portfolio projects and case studies
 * TODO: Add project details, images, technologies, and outcomes
 */

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
  caseStudy?: string;
  results?: string[];
  date?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  // {
  //   id: "1",
  //   slug: "project-name",
  //   title: "Project Title",
  //   description: "Full project description",
  //   shortDescription: "Short description",
  //   image: "/images/portfolio/project.jpg",
  //   category: "Web Development",
  //   technologies: ["Next.js", "React", "Tailwind CSS"],
  //   link: "https://project-url.com",
  //   date: "2024-01",
  // },
];
