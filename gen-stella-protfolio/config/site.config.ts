/**
 * Site Configuration
 * 
 * Central configuration file for the entire site
 * TODO: Update with your company information
 */

export const siteConfig = {
  // Company Information
  name: "Your Company Name",
  description: "Your company description and value proposition",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  
  // Contact Information
  email: "contact@yourcompany.com",
  phone: "+1 (555) 000-0000",
  address: "123 Business St, City, State 12345",
  
  // Social Links
  social: {
    twitter: "https://twitter.com/yourcompany",
    linkedin: "https://linkedin.com/company/yourcompany",
    github: "https://github.com/yourcompany",
    instagram: "https://instagram.com/yourcompany",
  },
  
  // Analytics
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
};

export type SiteConfig = typeof siteConfig;
