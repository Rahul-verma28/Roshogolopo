import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetailsClient } from "@/components/products/product-details-client"
import { products } from "@/lib/data/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Product Not Found | Roshogolpo",
    }
  }

  return {
    title: `${product.name} - Authentic Bengali Sweet | Roshogolpo`,
    description: product.description,
    keywords: `${product.name}, Bengali sweets, ${product.category}, authentic sweets, Roshogolpo`,
    openGraph: {
      title: `${product.name} | Roshogolpo`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Roshogolpo`,
      description: product.description,
      images: [product.image],
    },
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetailsClient product={product} />
}
