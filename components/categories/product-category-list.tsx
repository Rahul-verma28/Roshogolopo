"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/lib/types"

interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
}

interface Pagination {
  currentPage: number
  totalPages: number
  totalProducts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface CategoryProductsListProps {
  products: Product[]
  category: Category
  pagination: Pagination
  searchParams: {
    page?: string
    sortBy?: string
    sortOrder?: string
  }
}

export function CategoryProductsList({ 
  products, 
  category, 
  pagination, 
  searchParams 
}: CategoryProductsListProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  
  const currentSortBy = searchParams.sortBy || 'createdAt'
  const currentSortOrder = searchParams.sortOrder || 'desc'

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-')
    const params = new URLSearchParams(urlSearchParams.toString())
    
    params.set('sortBy', sortBy)
    params.set('sortOrder', sortOrder)
    params.delete('page') // Reset to first page when sorting
    
    router.push(`/categories/${category.slug}?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(urlSearchParams.toString())
    params.set('page', page.toString())
    
    router.push(`/categories/${category.slug}?${params.toString()}`)
  }

  const sortOptions = [
    { value: 'createdAt-desc', label: 'Newest First' },
    { value: 'createdAt-asc', label: 'Oldest First' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price Low to High' },
    { value: 'price-desc', label: 'Price High to Low' },
    { value: 'ratings-desc', label: 'Highest Rated' }
  ]

  return (
    <>
      {/* Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {((pagination.currentPage - 1) * 12) + 1} - {Math.min(pagination.currentPage * 12, pagination.totalProducts)} of {pagination.totalProducts} products
        </p>
        
        <Select 
          value={`${currentSortBy}-${currentSortOrder}`} 
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No products found in this category.
          </p>
          <Link href="/products">
            <Button variant="outline" className="mt-4">
              Browse All Products
            </Button>
          </Link>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
          >
            Previous
          </Button>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === pagination.currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </>
  )
}