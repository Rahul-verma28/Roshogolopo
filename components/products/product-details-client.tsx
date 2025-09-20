"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Share2, Star, ArrowLeft, Package, Clock, MapPin, Minus, Plus, Check } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cartSlice"
import { RelatedProducts } from "./related-products"
import { ProductReviews } from "./product-reviews"
import type { Product } from "@/lib/types/product"

interface ProductDetailsClientProps {
  product: Product
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)
  const [quantity, setQuantity] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const isInCart = items.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
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
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + change)))
  }

  // Mock additional images for gallery
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different angles
    product.image,
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-8"
        >
          <Link href="/" className="hover:text-[var(--roshogolpo-gold)]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[var(--roshogolpo-gold)]">
            Products
          </Link>
          <span>/</span>
          <span className="text-[var(--roshogolpo-gold)] font-medium">{product.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            asChild
            className="text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)]"
          >
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-3">
              {productImages.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-[var(--roshogolpo-gold)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <Badge className="bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-light)]">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Collection
            </Badge>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-3 font-playfair">
                {product.name}
              </h1>
              {product.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating!)
                            ? "fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">({product.rating}) • 127 reviews</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-[var(--roshogolpo-gold)]">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Save ₹{product.originalPrice - product.price}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">{product.description}</p>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.weight && (
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-[var(--roshogolpo-gold)]" />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-600">Weight</div>
                    <div className="font-medium">{product.weight}</div>
                  </div>
                </div>
              )}
              {product.shelfLife && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[var(--roshogolpo-gold)]" />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-600">Shelf Life</div>
                    <div className="font-medium">{product.shelfLife}</div>
                  </div>
                </div>
              )}
              {product.origin && (
                <div className="flex items-center space-x-2 col-span-2">
                  <MapPin className="h-5 w-5 text-[var(--roshogolpo-gold)]" />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-600">Origin</div>
                    <div className="font-medium">{product.origin}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3 className="text-sm sm:text-lg font-semibold text-[var(--roshogolpo-gold)] mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <Badge
                      key={ingredient}
                      variant="outline"
                      className="border-[var(--roshogolpo-light)] text-[var(--roshogolpo-gold)]"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm sm:text-lg font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-sm sm:text-lg font-medium min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  size="lg"
                  className="flex-1 bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white py-3 text-sm sm:text-lg font-semibold"
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" className="p-3 bg-transparent">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="p-3 bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {isInCart && (
                <p className="text-xs sm:text-sm text-green-600 flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  This item is already in your cart
                </p>
              )}
            </div>

            {/* Delivery Info */}
            <Card className="bg-[var(--roshogolpo-light)]/30 border-[var(--roshogolpo-light)]">
              <CardContent className="p-4">
                <h4 className="font-semibold text-[var(--roshogolpo-gold)] mb-2">Delivery Information</h4>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>• Free delivery on orders above ₹500</li>
                  <li>• Same day delivery available in Greater Noida</li>
                  <li>• Fresh sweets prepared daily</li>
                  <li>• Proper packaging to maintain freshness</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Product Reviews */}
        <ProductReviews productId={product.id} />

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  )
}
