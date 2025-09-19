import type { Metadata } from "next"

export const siteConfig = {
  name: "Roshogolpo - Kolkata's Timeless Sweets, Reimagined",
  description:
    "Authentic Bengali sweets and snacks from Kolkata, now in Greater Noida. Experience traditional Rasgulla, Sandesh, and innovative fusion sweets crafted with love and heritage.",
  url: "https://roshogolpo.in",
  ogImage: "/images/roshogolpo-og.jpg",
  keywords: [
    "Bengali sweets",
    "Kolkata sweets",
    "Rasgulla",
    "Sandesh",
    "Traditional sweets",
    "Greater Noida",
    "Roshogolpo",
    "Authentic Bengali",
    "Mishti",
    "Sweet shop",
  ],
  author: "Roshogolpo",
  creator: "Roshogolpo Team",
  publisher: "Roshogolpo",
  category: "Food & Beverages",
  classification: "Sweet Shop",
  coverage: "Greater Noida, Delhi NCR",
  distribution: "Global",
  rating: "General",
  robots: "index, follow",
  googlebot: "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article" | "product"
  noIndex?: boolean
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    category: siteConfig.category,
    classification: siteConfig.classification,
    robots: noIndex ? "noindex, nofollow" : siteConfig.robots,
    googlebot: siteConfig.googlebot,
    openGraph: {
      type,
      locale: "en_US",
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: "@roshogolpo",
      site: "@roshogolpo",
    },
    alternates: {
      canonical: metaUrl,
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": siteConfig.name,
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#b39402",
      "theme-color": "#fffae6",
    },
  }
}
