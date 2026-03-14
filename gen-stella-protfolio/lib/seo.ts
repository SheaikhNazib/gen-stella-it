/**
 * SEO Utilities
 * 
 * Metadata and SEO optimization utilities
 * TODO: Add dynamic metadata, open graph tags, structured data
 */

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const SITE_METADATA = {
  title: "Your Company Name - Tech Solutions",
  description: "Your company description and value proposition",
  keywords: ["tech", "software", "solutions"],
  author: "Your Company",
};

export function generateMetadata(pageTitle: string, pageDescription: string) {
  return {
    title: `${pageTitle} | ${SITE_METADATA.title}`,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: BASE_URL,
      type: "website",
    },
  };
}
