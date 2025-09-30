import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Shop by Category | Roshogolpo",
  description:
    "Explore Bengali sweets and snacks by category: Classic, Fusion, Snacks, and Packages. Discover your favorites at Roshogolpo.",
}

const categories: Array<{
  slug: "classic" | "fusion" | "snacks" | "packages"
  label: string
  desc: string
  img: string
}> = [
  {
    slug: "classic",
    label: "Classic",
    desc: "Timeless Bengali sweets made the traditional way.",
    img: "/classic-bengali-sweets-assortment.jpg",
  },
  {
    slug: "fusion",
    label: "Fusion",
    desc: "Modern twists on beloved classics.",
    img: "/fusion-bengali-sweets-chocolate-truffle.jpg",
  },
  {
    slug: "snacks",
    label: "Snacks",
    desc: "Savory treats for mornings & evenings.",
    img: "/bengali-snacks-kachori-singara.jpg",
  },
  {
    slug: "packages",
    label: "Packages",
    desc: "Gifts and pantry essentials from Bengal.",
    img: "/gift-packages-tea-honey.jpg",
  },
]

export default function CategoryIndexPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-pretty">Shop by Category</h1>
        <p className="mt-2 text-muted-foreground">Browse our selection by category to quickly find what you love.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader className="p-0">
                {/* Decorative image placeholder for visual interest */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.img || "/placeholder.svg"}
                  alt={`${cat.label} category`}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-xl">{cat.label}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">{cat.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  )
}
