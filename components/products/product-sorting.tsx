"use client"

import { useState } from "react"
import { ChevronDown, SortAsc, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProductSortingProps {
  readonly sortBy: string
  readonly sortOrder: "asc" | "desc"
  readonly onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void
}

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "createdAt", label: "Latest" },
  { value: "avgRating", label: "Rating" },
  { value: "pricing.0.price", label: "Price" },
  { value: "reviewCount", label: "Popularity" },
]

  // const sortOptions = [
  //   { value: 'createdAt-desc', label: 'Newest First' },
  //   { value: 'createdAt-asc', label: 'Oldest First' },
  //   { value: 'name-asc', label: 'Name A-Z' },
  //   { value: 'name-desc', label: 'Name Z-A' },
  //   { value: 'price-asc', label: 'Price Low to High' },
  //   { value: 'price-desc', label: 'Price High to Low' },
  //   { value: 'ratings-desc', label: 'Highest Rated' }
  // ]

export function ProductSorting({ sortBy, sortOrder, onSortChange }: ProductSortingProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentSort = sortOptions.find(option => option.value === sortBy)

  const handleSortChange = (newSortBy: string) => {
    // If clicking the same sort option, toggle order
    if (newSortBy === sortBy) {
      onSortChange(sortBy, sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Default to desc for ratings, popularity; asc for name, price
      const defaultOrder = ["avgRating", "reviewCount", "createdAt"].includes(newSortBy) ? "desc" : "asc"
      onSortChange(newSortBy, defaultOrder)
    }
    setIsOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            className="min-w-[120px] justify-between border-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-gold)] hover:text-white"
          >
            <span className="flex items-center gap-2">
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
              {currentSort?.label || "Name"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-48">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`flex items-center justify-between cursor-pointer ${
                sortBy === option.value ? "bg-[var(--roshogolpo-gold)]/10 text-[var(--roshogolpo-gold)]" : ""
              }`}
            >
              <span>{option.label}</span>
              {sortBy === option.value && (
                sortOrder === "asc" ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}