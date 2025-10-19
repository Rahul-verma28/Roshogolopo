
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailsClient } from "@/components/products/product-details-client";

interface ProductPageProps {
  params: { slug: string };
}

// Use proper API endpoint with absolute URL
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";


// ISR - Generate pages on-demand instead of at build time
export async function generateStaticParams() {
  // Return empty array to skip build-time generation
  // Pages will be generated on first request
  return [];
}

// Enable ISR
export const revalidate = 3600; // Cache for 1 hour
export const dynamicParams = true; // Allow dynamic params

async function getProduct(slug: string) {
  try {
    const response = await fetch(`${baseUrl}/api/products/${slug}`, {
      next: { revalidate: 3600 } // Use ISR with 1 hour revalidation
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const data = await getProduct(params.slug);
  const product = data?.product;

  if (!product) {
    return {
      title: "Product Not Found | Roshogolpo",
      description:
        "The requested product could not be found. Explore our collection of authentic Bengali sweets.",
    };
  }

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name || "Bengali Sweets";
  const primaryImage = product.images?.[0] || "/placeholder.jpg";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://roshogolpo.in";

  return {
    title: `${product.name} - Authentic Bengali Sweet | Roshogolpo`,
    description:
      product.description ||
      `Discover ${product.name}, a traditional Bengali sweet from Roshogolpo. Made with authentic ingredients and traditional methods.`,
    keywords: `${product.name}, Bengali sweets, ${categoryName}, authentic sweets, Roshogolpo, traditional Bengali desserts`,
    authors: [{ name: "Roshogolpo" }],
    publisher: "Roshogolpo",
    category: "Food & Beverages",

    openGraph: {
      title: `${product.name} | Roshogolpo`,
      description: product.description || `Traditional Bengali sweet ${product.name}`,
      images: [
        {
          url: primaryImage.startsWith("http")
            ? primaryImage
            : `${baseUrl}${primaryImage}`,
          width: 800,
          height: 600,
          alt: `${product.name} - Traditional Bengali Sweet`,
        },
      ],
      type: "website",
      siteName: "Roshogolpo",
      locale: "en_IN",
    },
    
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Roshogolpo`,
      description:
        product.description || `Traditional Bengali sweet ${product.name}`,
      images: [
        primaryImage.startsWith("http")
          ? primaryImage
          : `${baseUrl}${primaryImage}`,
      ],
      site: "@roshogolpo",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.slug}`,
    },
  };
}



export default async function ProductPage({
  params,
}: Readonly<ProductPageProps>) {
  const data = await getProduct(params.slug);

  if (!data?.product) {
    notFound();
  }

  // Add JSON-LD structured data
  const product = data.product;
  const categoryName =
    typeof product.category === "string" 
      ? product.category 
      : product.category?.name || "Bengali Sweets";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://roshogolpo.in";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image:
      product.images?.map((img: string) =>
        img.startsWith("http") ? img : `${baseUrl}${img}`
      ) || [],
    brand: {
      "@type": "Brand",
      name: "Roshogolpo",
    },
    category: categoryName,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(
        ...(product.weightPrices?.map((wp: any) => wp.price) || [0])
      ),
      highPrice: Math.max(
        ...(product.weightPrices?.map((wp: any) => wp.price) || [0])
      ),
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Roshogolpo",
      },
    },
    aggregateRating:
      product.ratings > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.ratings,
            reviewCount: product.numReviews,
          }
        : undefined,
    url: `${baseUrl}/products/${product.slug}`,
    sku: product._id,
    productID: product._id,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailsClient product={product} />
    </>
  );
}
