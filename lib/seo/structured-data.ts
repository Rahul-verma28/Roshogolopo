import type { Product } from "@/lib/types/product"

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Roshogolpo",
    alternateName: "Roshogolpo Sweet Shop",
    description: "Authentic Bengali sweets and snacks from Kolkata, now in Greater Noida",
    url: "https://roshogolpo.in",
    logo: "https://roshogolpo.in/images/roshogolpo-logo.png",
    image: "https://roshogolpo.in/images/roshogolpo-og.png",
    telephone: "+91 9899743002",
    email: "support@roshogolpo.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No EF-09, First Floor, Spectrum@Metro, Phase 2",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.5355",
      longitude: "77.3910",
    },
    openingHours: ["Mo-Su 10:00-22:00"],
    priceRange: "₹₹",
    servesCuisine: "Bengali",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Roshogolpo Founder",
    },
    sameAs: [
      "https://www.facebook.com/roshogolpo",
      "https://www.instagram.com/roshogolpo",
      "https://twitter.com/roshogolpo",
    ],
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://roshogolpo.in/#localbusiness",
    name: "Roshogolpo",
    description: "Authentic Bengali sweets and snacks from Kolkata, now in Greater Noida",
    url: "https://roshogolpo.in",
    telephone: "+91 9899743002",
    email: "support@roshogolpo.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No EF-09, First Floor, Spectrum@Metro, Phase 2",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.5355",
      longitude: "77.3910",
    },
    openingHours: ["Mo-Su 10:00-22:00"],
    priceRange: "₹₹",
    servesCuisine: "Bengali",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI",
    currenciesAccepted: "INR",
  }
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://roshogolpo.in/products/${product.id}#product`,
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "Roshogolpo",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Roshogolpo",
    },
    category: product.category,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `https://roshogolpo.in/products/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Roshogolpo",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${product.nutrition?.calories || "N/A"} calories`,
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://roshogolpo.in/#website",
    url: "https://roshogolpo.in",
    name: "Roshogolpo",
    description: "Authentic Bengali sweets and snacks from Kolkata, now in Greater Noida",
    publisher: {
      "@id": "https://roshogolpo.in/#organization",
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://roshogolpo.in/products?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    ],
  }
}
