export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: "classic" | "fusion" | "snacks" | "packages"
  ingredients?: string[]
  rating?: number
  inStock: boolean
  featured?: boolean
  origin?: string
  weight?: string
  shelfLife?: string
}
