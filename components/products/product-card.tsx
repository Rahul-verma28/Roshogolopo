// "use client";

// import type React from "react";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ShoppingCart, Eye, Star } from "lucide-react";
// import { useAppDispatch } from "@/lib/hooks";
// import { addToCart } from "@/lib/features/cartSlice";
// import type { Product } from "@/lib/types/product";

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const dispatch = useAppDispatch();

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     dispatch(
//       addToCart({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         category: product.category,
//       })
//     );
//   };

//   return (
//     <Card className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white p-0">
//       <CardContent className="p-0">
//         {/* Image */}
//         <div className="relative h-48 overflow-hidden">
//           <Image
//             src={product.image || "/placeholder.svg"}
//             alt={product.name}
//             fill
//             className="object-cover group-hover:scale-110 transition-transform duration-500"
//           />

//           {/* Overlay Actions */}
//           {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
//             <Button
//               asChild
//               size="sm"
//               className="bg-white text-[var(--roshogolpo-gold)] hover:bg-gray-100"
//             >
//               <Link href={`/products/${product.id}`}>
//                 <Eye className="h-4 w-4 mr-1" />
//                 View
//               </Link>
//             </Button>
//             <Button
//               size="sm"
//               onClick={handleAddToCart}
//               className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white"
//             >
//               <ShoppingCart className="h-4 w-4 mr-1" />
//               Add
//             </Button>
//           </div> */}

//           {/* Category Badge */}
//           <div className="absolute top-3 left-3">
//             <Badge className="bg-white/90 text-[var(--roshogolpo-gold)] hover:bg-white">
//               {product.category.charAt(0).toUpperCase() +
//                 product.category.slice(1)}
//             </Badge>
//           </div>

//           {/* Rating */}
//           {product.rating && (
//             <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
//               <Star className="h-3 w-3 fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]" />
//               <span className="text-xs font-medium">{product.rating}</span>
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="p-4">
//           <Link
//             href={`/products/${product.id}`}
//             className="text-sm sm:text-lg font-bold text-[var(--roshogolpo-gold)] mb-2 font-playfair line-clamp-1"
//           >
//             {product.name}
//           </Link>

//           <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
//             {product.description}
//           </p>

//           {/* Ingredients */}
//           {product.ingredients && product.ingredients.length > 0 && (
//             <div className="mb-3">
//               <div className="hidden sm:flex flex-wrap gap-1">
//                 {product.ingredients.slice(0, 3).map((ingredient, index) => (
//                   <span
//                     key={ingredient}
//                     className="text-xs bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-gold)] px-2 py-0.5 rounded-full"
//                   >
//                     {ingredient}
//                   </span>
//                 ))}
//                 {product.ingredients.length > 3 && (
//                   <span className="text-xs text-gray-500">
//                     +{product.ingredients.length - 3} more
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Price and Actions */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <span className="text-xl font-bold text-[var(--roshogolpo-gold)]">
//                 ₹{product.price}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-xs sm:text-sm text-gray-500 line-through">
//                   ₹{product.originalPrice}
//                 </span>
//               )}
//             </div>

//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={handleAddToCart}
//               className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white p-2 rounded-full transition-colors duration-200"
//             >
//               <ShoppingCart className="h-4 w-4" />
//             </motion.button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlice";
import type { Product } from "@/lib/types";
import { toast } from "sonner";
import { validateProduct, isValidProduct } from "@/lib/product-utils";

export function ProductCard({ product: rawProduct }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);

  // Validate and normalize product data
  const product = validateProduct(rawProduct);
  
  // Ensure the product is valid for display
  if (!isValidProduct(product)) {
    return null;
  }

  // Get the selected weight option (default to first one)
  const selectedWeight = product.weightPrices[selectedWeightIndex];
  const primaryImage = product.images[0] || "/placeholder.svg";

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
          quantity: 1,
          maxQuantity: 10, // Default max quantity, could be fetched from API
        })
      );

      toast.success(`Added ${product.name} (${selectedWeight.weight}) to cart!`, {
        description: `₹${selectedWeight.price} - Continue shopping or view cart`,
        action: {
          label: "View Cart",
          onClick: () => {
            // This could open cart drawer or navigate to cart page
            window.location.href = "/cart";
          },
        },
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  console.log('Rendering ProductCard for:', product.name, product);

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white p-0"
      itemScope
      itemType="https://schema.org/Product"
    >
      <CardContent className="p-0">
        {/* Product Link Wrapper */}
        <Link href={`/products/${product.slug}`} className="block" title={`View ${product.name} details`}>
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={primaryImage}
              alt={`${product.name} - Authentic Bengali sweet from Roshogolpo`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={product.isFeatured}
              itemProp="image"
            />

            {/* Category Badge */}
            <div className="absolute top-3 left-3 hidden group-hover:block">
              <Badge className="bg-[var(--roshogolpo-active)]">
                {product.category?.name ? (product.category.name.charAt(0).toUpperCase() + product.category.name.slice(1)) : product.category}
              </Badge>
            </div>

            {/* Rating */}
            {product.ratings > 0 && (
              <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                <Star className="h-3 w-3 fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]" />
                <span className="text-xs font-medium">{product.ratings.toFixed(1)}</span>
              </div>
            )}

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-white">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          <Link
            href={`/products/${product.slug}`}
            className="text-sm sm:text-lg font-bold text-[var(--roshogolpo-gold)] mb-2 font-playfair line-clamp-1 hover:underline"
            title={`Buy ${product.name} online`}
          >
            <h3 itemProp="name" className="inline">
              {product.name}
            </h3>
          </Link>

          <p 
            className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed"
            itemProp="description"
          >
            {product.description}
          </p>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-3">
              <div className="hidden sm:flex flex-wrap gap-1">
                {product.ingredients.slice(0, 3).map((ingredient) => (
                  <span
                    key={ingredient}
                    className="text-xs bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-gold)] px-2 py-0.5 rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
                {product.ingredients.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{product.ingredients.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Weight Options */}
          {product.weightPrices.length > 1 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {product.weightPrices.map((option, index) => (
                  <button
                    key={option.weight}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedWeightIndex(index);
                    }}
                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      selectedWeightIndex === index
                        ? "bg-[var(--roshogolpo-gold)] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-label={`Select ${option.weight} option`}
                  >
                    {option.weight}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span 
                className="text-xl font-bold text-[var(--roshogolpo-gold)]"
                itemProp="price"
                content={selectedWeight?.price.toString() || "0"}
              >
                ₹{selectedWeight?.price || 0}
              </span>
              <meta itemProp="priceCurrency" content="INR" />
              <meta itemProp="availability" content={product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
              {selectedWeight && (
                <span className="text-xs text-gray-500" itemProp="weight">
                  {selectedWeight.weight}
                </span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-active)] disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors duration-200"
              aria-label={`Add ${product.name} to cart - ₹${selectedWeight?.price || 0} for ${selectedWeight?.weight || 'default'}`}
              title={product.inStock ? `Add ${product.name} to cart` : 'Out of stock'}
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Reviews Count */}
          {product.numReviews > 0 && (
            <div 
              className="mt-2 text-xs text-gray-500"
              itemProp="aggregateRating"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
              <meta itemProp="ratingValue" content={product.ratings.toString()} />
              <meta itemProp="reviewCount" content={product.numReviews.toString()} />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
              Based on {product.numReviews} review{product.numReviews !== 1 ? 's' : ''}
            </div>
          )}

          {/* Hidden SEO Meta Tags */}
          <div className="sr-only">
            <meta itemProp="category" content={product.category} />
            <meta itemProp="brand" content="Roshogolpo" />
            <meta itemProp="manufacturer" content="Roshogolpo" />
            <meta itemProp="sku" content={product._id} />
            {product.ingredients?.map((ingredient) => (
              <meta key={ingredient} itemProp="ingredient" content={ingredient} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
