"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cartSlice";
import type { Product } from "@/lib/types/product";
import { ShoppingCart } from "lucide-react";

interface FeaturedProductCardProps {
  readonly product: Product;
}

interface WeightOption {
  weight: string;
  price: number;
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const dispatch = useAppDispatch();
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);

  // Create weight options with proper typing
  const weightOptions: WeightOption[] = [
    { weight: "500g", price: product.price },
  ];
  const selectedOption = weightOptions[selectedWeightIndex];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: selectedOption.price,
        image: product.image,
        category: product.category,
      })
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-50 to-amber-50 rounded-t-full border-[var(--roshogolpo-gold)] border-2 mb-3 shadow-lg">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover "
          priority
        />
      </div>

      {/* Product Details */}
      <div className="text-center">
        {/* Product Name */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 font-playfair">
          {product.name}
        </h3>

        {/* Price */}
        <div className="">
          <span className="sm:text-lg font-bold text-gray-900">
            ₹ {selectedOption?.price ? selectedOption.price.toFixed(2) : '0.00'}
          </span>
        </div>

        {/* Weight Options */}
        <div className="flex justify-center gap-3 my-4">
          {weightOptions.map((option, index) => (
            <motion.button
              key={option.weight}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedWeightIndex(index)}
              className={`p-1 px-3 text-xs rounded-full font-medium transition-all duration-200 ${
                selectedWeightIndex === index
                  ? "bg-[var(--roshogolpo-gold)] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.weight}
            </motion.button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white py-4 text-lg font-semibold rounded-full transition-all duration-200"
        >
            <ShoppingCart className="w-5 h-5" />
          {product.inStock ? "Add To Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
