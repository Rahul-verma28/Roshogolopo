import type { Metadata } from "next"
import { ProductsClient } from "@/components/products/products-client"
import { StructuredData } from "@/components/seo/structured-data"
import { generateMetadata } from "@/lib/seo/metadata"
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata: Metadata = generateMetadata({
  title: "Products - Authentic Bengali Sweets",
  description:
    "Explore our complete collection of authentic Bengali sweets, fusion treats, traditional snacks, and curated packages. From classic Roshogolla to innovative fusion creations.",
  url: "/products",
})

export default function ProductsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://roshogolpo.com" },
    { name: "Products", url: "https://roshogolpo.com/products" },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={breadcrumbSchema} />
      <ProductsClient />
    </div>
  )
}
