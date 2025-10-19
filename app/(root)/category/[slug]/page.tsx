import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { products } from "@/lib/data/products"
import type { Product } from "@/lib/types/product"
import { ProductGrid } from "@/components/products/product-grid"

type CategorySlug = Product["category"]

export const dynamicParams = false

export function generateStaticParams() {
  const slugs: CategorySlug[] = ["classic", "fusion", "snacks", "packages"]
  return slugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: CategorySlug } }): Metadata {
  const titleMap: Record<CategorySlug, string> = {
    classic: "Classic Bengali Sweets",
    fusion: "Fusion & Truffle Collection",
    snacks: "Bengali Snacks",
    packages: "Gift Packages & Pantry",
  }

  const title = `${titleMap[params.slug]} | Roshogolpo`
  return {
    title,
    description: `Explore ${titleMap[params.slug].toLowerCase()} at Roshogolpo. Discover authentic flavours and top-rated items.`,
  }
}

export default function CategoryPage({ params }: Readonly<{ params: { slug: CategorySlug } }>) {
  const valid: CategorySlug[] = ["classic", "fusion", "snacks", "packages"]
  if (!valid.includes(params.slug)) {
    notFound()
  }

  const filtered = products.filter((p) => p.category === params.slug)
  if (filtered.length === 0) {
    notFound()
  }

  const heading = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-pretty">{heading}</h1>
        <p className="mt-2 text-muted-foreground">
          Handpicked items in {heading.toLowerCase()} — rendered statically for a fast, SEO-friendly experience.
        </p>
      </header>

      {/* ProductGrid is a client component but receives already-filtered data from the server */}
      <ProductGrid products={filtered} />
    </main>
  )
}
