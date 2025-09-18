"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { ProductGrid } from "./product-grid"
import { ProductFilters } from "./product-filters"
import { ProductSearch } from "./product-search"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setFilter, setSearchQuery } from "@/lib/features/uiSlice"
import { products } from "@/lib/data/products"

export function ProductsClient() {
  const dispatch = useAppDispatch()
  const { currentFilter, searchQuery } = useAppSelector((state) => state.ui)
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  // Initialize filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      dispatch(setFilter(categoryParam))
    }
    setIsLoading(false)
  }, [searchParams, dispatch])

  // Filter products based on current filter and search query
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (currentFilter !== "all") {
      filtered = filtered.filter((product) => product.category === currentFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.ingredients?.some((ingredient) => ingredient.toLowerCase().includes(query)),
      )
    }

    return filtered
  }, [currentFilter, searchQuery])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--roshogolpo-gold)]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-4 font-playfair">
          Our Sweet Collection
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover authentic Bengali sweets, fusion treats, traditional snacks, and curated packages crafted with love
          and tradition.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        <ProductSearch />
        <ProductFilters />
      </div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-6"
      >
        <p className="text-gray-600">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          {currentFilter !== "all" && (
            <span className="ml-1">
              in{" "}
              <span className="font-semibold text-[var(--roshogolpo-gold)]">
                {currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)}
              </span>
            </span>
          )}
          {searchQuery && (
            <span className="ml-1">
              for "<span className="font-semibold text-[var(--roshogolpo-gold)]">{searchQuery}</span>"
            </span>
          )}
        </p>
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <ProductGrid products={filteredProducts} />
      </AnimatePresence>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
          <div className="text-6xl mb-4">🍯</div>
          <h3 className="text-2xl font-bold text-[var(--roshogolpo-gold)] mb-2">No sweets found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter to find the perfect sweet for you.</p>
          <button
            onClick={() => {
              dispatch(setFilter("all"))
              dispatch(setSearchQuery(""))
            }}
            className="text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)] font-semibold"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  )
}
