"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Share2,
  Star,
  ArrowLeft,
  Package,
  Clock,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlice";
import { RelatedProducts } from "./related-products";
import { ProductReviews } from "./product-reviews";
import type { Product } from "@/lib/types";
import { toast } from "sonner";
import { BreadcrumbNav } from "../layout/breadcrumb";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);

  // Get the currently selected weight option
  const selectedWeight = product.weightPrices?.[selectedWeightIndex] ||
    product.weightPrices?.[0] || { weight: "500g", price: 0 };
  const primaryImage = product.images[0] || "/placeholder.svg";

  // Check if item is in cart with current weight option
  const isInCart = items.some(
    (item) =>
      item.productId === product._id &&
      item.weightOption === selectedWeight.weight
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock || !selectedWeight) {
      toast.error("This item is currently out of stock");
      return;
    }
    try {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          image: primaryImage,
          weightOption: selectedWeight.weight,
          price: selectedWeight.price,
          category:
            typeof product.category === "object"
              ? product.category.name
              : product.category,
          quantity: quantity,
          maxQuantity: 1000, // Default max quantity, could be fetched from API
        })
      );

      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);

      toast.success(
        `Added ${product.name} (${selectedWeight.weight}) to cart!`,
        {
          description: `₹${selectedWeight.price} × ${quantity} - Continue shopping or view cart`,
          action: {
            label: "View Cart",
            onClick: () => {
              // This could trigger cart drawer open
              console.log("Open cart drawer");
            },
          },
        }
      );
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + change)));
  };

    const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Use actual product images
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : ["/placeholder.svg"];

  console.log(product.images, productImages);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
      label: product.category?.name,
      href: `/category/${product.category?.slug}`,
    },
    { label: product.name },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600"
        >
          <BreadcrumbNav breadcrumbs={breadcrumbs} />
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
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg h-130 w-full">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Image Thumbnails - Only show if multiple images */}
            {productImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
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
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Category Badge */}
            <Badge className="bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-light)]">
              {typeof product.category === "string"
                ? product.category
                : product.category?.name || "Bengali Sweets"}{" "}
              Collection
            </Badge>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-3 font-playfair">
                {product.name}
              </h1>
              {((product.avgRating ?? 0) > 0 || product.ratings > 0) && (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i <
                          Math.floor(product.avgRating || product.ratings || 0)
                            ? "fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    ({(product.avgRating || product.ratings || 0).toFixed(1)}) •{" "}
                    {product.reviewCount || 0} reviews
                  </span>
                </div>
              )}
            </div>

            {/* Weight Selection */}
            {product.weightPrices && product.weightPrices.length > 1 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Weight Option:
                </label>
                <Select
                  value={selectedWeightIndex.toString()}
                  onValueChange={(value) =>
                    setSelectedWeightIndex(parseInt(value))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.weightPrices.map((weightPrice, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {weightPrice.weight} - ₹{weightPrice.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-[var(--roshogolpo-gold)]">
                ₹{selectedWeight.price}
              </span>
              <span className="text-lg text-gray-600">
                for {selectedWeight.weight}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-[var(--roshogolpo-gold)]" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Weight</div>
                  <div className="font-medium">{selectedWeight.weight}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-[var(--roshogolpo-gold)]" />
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Stock Status
                  </div>
                  <div className="font-medium">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
              </div>
              {product.isFeatured && (
                <div className="flex items-center space-x-2 col-span-2">
                  <Star className="h-5 w-5 text-[var(--roshogolpo-gold)]" />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Special
                    </div>
                    <div className="font-medium">Featured Product</div>
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {product.ingredients &&
              Array.isArray(product.ingredients) &&
              product.ingredients.length > 0 && (
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold text-[var(--roshogolpo-gold)] mb-3">
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients
                      .filter(
                        (ingredient) => ingredient && ingredient.trim() !== ""
                      )
                      .map((ingredient, index) => (
                        <Badge
                          key={index}
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
                <span className="text-sm sm:text-lg font-medium">
                  Quantity:
                </span>
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
                  <span className="px-4 py-2 text-sm sm:text-lg font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
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
                <Button
                  variant="outline"
                  size="lg"
                  className="p-3 bg-transparent"
                  onClick={handleShare}
                >
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
                <h4 className="font-semibold text-[var(--roshogolpo-gold)] mb-2">
                  Delivery Information
                </h4>
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
        <ProductReviews productId={product._id} />

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
}
