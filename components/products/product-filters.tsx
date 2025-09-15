"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setFilter } from "@/lib/features/uiSlice"
import { Heart, Sparkles, Coffee, Gift, Grid3X3 } from "lucide-react"

const filters = [
  { id: "all", label: "All Products", icon: Grid3X3, count: 24 },
  { id: "classic", label: "Classic Collection", icon: Heart, count: 8 },
  { id: "fusion", label: "Fusion & Truffle", icon: Sparkles, count: 6 },
  { id: "snacks", label: "Snacks", icon: Coffee, count: 6 },
  { id: "packages", label: "Packages", icon: Gift, count: 4 },
]

export function ProductFilters() {
  const dispatch = useAppDispatch()
  const { currentFilter } = useAppSelector((state) => state.ui)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="flex flex-wrap justify-center gap-3"
    >
      {filters.map((filter, index) => {
        const IconComponent = filter.icon
        const isActive = currentFilter === filter.id

        return (
          <motion.div
            key={filter.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Button
              variant={isActive ? "default" : "outline"}
              onClick={() => dispatch(setFilter(filter.id))}
              className={`
                px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2
                ${
                  isActive
                    ? "bg-[var(--roshogolpo-footer)] text-white hover:bg-[var(--roshogolpo-hover)]"
                    : "border-[var(--roshogolpo-footer)] text-[var(--roshogolpo-footer)] hover:bg-[var(--roshogolpo-footer)] hover:text-white bg-transparent"
                }
              `}
            >
              <IconComponent className="h-4 w-4" />
              <span>{filter.label}</span>
              <span
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${
                    isActive ? "bg-white/20 text-white" : "bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-footer)]"
                  }
                `}
              >
                {filter.count}
              </span>
            </Button>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
