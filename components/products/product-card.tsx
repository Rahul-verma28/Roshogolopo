"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye, Star } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cartSlice"
import type { Product } from "@/lib/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      }),
    )
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white p-0">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
            <Button asChild size="sm" className="bg-white text-[var(--roshogolpo-gold)] hover:bg-gray-100">
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-[var(--roshogolpo-gold)] hover:bg-white">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="h-3 w-3 fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <Link href={`/products/${product.id}`} className="text-sm sm:text-lg font-bold text-[var(--roshogolpo-gold)] mb-2 font-playfair line-clamp-1">
            {product.name}
          </Link>

          <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-3">
              <div className="hidden sm:flex flex-wrap gap-1">
                {product.ingredients.slice(0, 3).map((ingredient, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-gold)] px-2 py-0.5 rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
                {product.ingredients.length > 3 && (
                  <span className="text-xs text-gray-500">+{product.ingredients.length - 3} more</span>
                )}
              </div>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[var(--roshogolpo-gold)]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white p-2 rounded-full transition-colors duration-200"
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
