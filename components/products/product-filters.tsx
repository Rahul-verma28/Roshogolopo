"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setFilter } from "@/lib/redux/slices/uiSlice";
import { Heart, Sparkles, Coffee, Gift, Grid3X3, Filter } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { fetchCategories } from "@/lib/redux/slices/categoriesSlice";

interface Category {
  _id: string;
  name: string;
  slug: string;
  productCount?: number;
}

interface ProductFiltersProps {
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onPriceChange?: (min?: number, max?: number) => void;
  onStockChange?: (inStock?: boolean) => void;
}

const defaultCategories = [
  { _id: "all", name: "All Products", slug: "all", icon: Grid3X3 },
  { _id: "classic", name: "Classic Collection", slug: "classic", icon: Heart },
  { _id: "fusion", name: "Fusion & Truffle", slug: "fusion", icon: Sparkles },
  { _id: "snacks", name: "Snacks", slug: "snacks", icon: Coffee },
  { _id: "packages", name: "Packages", slug: "packages", icon: Gift },
];

export function ProductFilters({
  minPrice,
  maxPrice,
  inStock,
  onPriceChange,
  onStockChange,
}: ProductFiltersProps) {
  const dispatch = useAppDispatch();
  const { currentFilter } = useAppSelector((state) => state.ui);
  // const [categories, setCategories] = useState(defaultCategories)
  const [priceRange, setPriceRange] = useState([
    minPrice || 0,
    maxPrice || 2000,
  ]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { categories, isLoading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    // Fetch categories with product count
    dispatch(fetchCategories({ includeProductCount: true }));
  }, []);

  // Add "All" option to categories
  const categoriesWithAll = [
    { _id: "all", name: "All Products", slug: "all", productCount: undefined },
    ...categories,
  ];
  

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onPriceChange?.(value[0], value[1]);
  };

  const getIconForCategory = (slug: string) => {
    const defaultCat = defaultCategories.find((cat) => cat.slug === slug);
    return defaultCat?.icon || Grid3X3;
  };

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categoriesWithAll.map((category, index) => {
          const IconComponent = getIconForCategory(category.slug);
          const isActive = currentFilter === category.slug;

          return (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                onClick={() => dispatch(setFilter(category.slug))}
                className={`
                  px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2
                  ${
                    isActive
                      ? "bg-[var(--roshogolpo-gold)] text-white hover:bg-[var(--roshogolpo-hover)]"
                      : "border-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-gold)] hover:text-white bg-transparent"
                  }
                `}
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(" ")[0]}</span>
                {category.productCount !== undefined && (
                  <Badge
                    variant="secondary"
                    className={`
                      text-xs px-2 py-0.5 rounded-full
                      ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[var(--roshogolpo-light)] text-[var(--roshogolpo-gold)]"
                      }
                    `}
                  >
                    {category.productCount}
                  </Badge>
                )}
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Advanced Filters */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)]"
          >
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-6 mt-4 p-4 border rounded-lg bg-gray-50">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="px-3">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={2000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Stock Filter */}
          <div className="flex items-center space-x-2">
            <Switch
              id="in-stock"
              checked={inStock || false}
              onCheckedChange={(checked) =>
                onStockChange?.(checked ? true : undefined)
              }
            />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
