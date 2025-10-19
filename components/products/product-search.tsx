"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setSearchQuery } from "@/lib/redux/slices/uiSlice"

export function ProductSearch() {
  const dispatch = useAppDispatch()
  const { searchQuery } = useAppSelector((state) => state.ui)
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const handleSearch = (query: string) => {
    setLocalQuery(query)
    dispatch(setSearchQuery(query))
  }

  const clearSearch = () => {
    setLocalQuery("")
    dispatch(setSearchQuery(""))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative max-w-md mx-auto"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for sweets, ingredients..."
          value={localQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 py-3 text-base border-2 border-gray-200 focus:border-[var(--roshogolpo-gold)] rounded-full"
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  )
}
