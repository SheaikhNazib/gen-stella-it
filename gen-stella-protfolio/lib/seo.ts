/**
 * SEO Utilities
 *
 * Generates per-page metadata (title, description, OG, Twitter Cards, canonical).
 * Import `generatePageMetadata` in every page's `generateMetadata` export.
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'

interface PageSEO {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  canonical?: string
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  image,
  noIndex,
  canonical,
}: PageSEO = {}): Metadata {
  const pageTitle = title
    ? siteConfig.seo.titleTemplate.replace('%s', title)
    : siteConfig.seo.defaultTitle
  const pageDescription = description || siteConfig.seo.defaultDescription
  const pageImage = image || siteConfig.ogImage
  const pageUrl = canonical
    ? `${siteConfig.url}${canonical}`
    : siteConfig.url

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [...(keywords || []), ...siteConfig.seo.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: pageUrl },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: title || siteConfig.seo.defaultTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [{ url: pageImage, width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.seo.defaultTitle,
      description: pageDescription,
      images: [pageImage],
    },
  }
}
