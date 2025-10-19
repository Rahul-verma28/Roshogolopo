"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductGrid } from "./product-grid";
import { ProductFilters } from "./product-filters";
import { ProductSearch } from "./product-search";
import { ProductSorting } from "./product-sorting";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setFilter, setSearchQuery } from "@/lib/redux/slices/uiSlice";
import { fetchProducts, clearFilters } from "@/lib/redux/slices/productsSlice";

export function ProductsClient() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentFilter, searchQuery } = useAppSelector((state) => state.ui);
  const { products, isLoading, error, pagination, filters } = useAppSelector(
    (state) => state.products
  );
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [inStock, setInStock] = useState<boolean | undefined>();

  // Build URL search params for SEO
  const updateURLParams = (newFilters: Record<string, string | undefined>) => {
    const url = new URL(window.location.href);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    router.replace(url.pathname + url.search);
  };

  // Initialize filters from URL params and fetch products
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const inStockParam = searchParams.get("inStock");

    // Update local state first
    const newSortBy = sortByParam || "name";
    const newSortOrder = (sortOrderParam as "asc" | "desc") || "asc";
    const newMinPrice = minPriceParam ? Number(minPriceParam) : undefined;
    const newMaxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
    const newInStock = inStockParam ? inStockParam === "true" : undefined;
    const newCategory = categoryParam || "all";
    const newSearch = searchParam || "";

    // Update Redux state
    if (categoryParam && categoryParam !== currentFilter) {
      dispatch(setFilter(categoryParam));
    }
    if (searchParam && searchParam !== searchQuery) {
      dispatch(setSearchQuery(searchParam));
    }

    // Update local state
    if (newSortBy !== sortBy) setSortBy(newSortBy);
    if (newSortOrder !== sortOrder) setSortOrder(newSortOrder);
    if (newMinPrice !== minPrice) setMinPrice(newMinPrice);
    if (newMaxPrice !== maxPrice) setMaxPrice(newMaxPrice);
    if (newInStock !== inStock) setInStock(newInStock);

    // Prepare fetch parameters using the new values (not current state)
    const fetchParams = {
      page: 1,
      limit: 12,
      category: newCategory !== "all" ? newCategory : undefined,
      search: newSearch || undefined,
      sortBy: newSortBy,
      sortOrder: newSortOrder,
      minPrice: newMinPrice,
      maxPrice: newMaxPrice,
      inStock: newInStock,
    };

    // Update URL for SEO
    updateURLParams({
      category: newCategory !== "all" ? newCategory : undefined,
      search: newSearch || undefined,
      sortBy: newSortBy !== "name" ? newSortBy : undefined,
      sortOrder: newSortOrder !== "asc" ? newSortOrder : undefined,
      minPrice: newMinPrice?.toString(),
      maxPrice: newMaxPrice?.toString(),
      inStock: newInStock?.toString(),
    });

    // Fetch products with the correct parameters
    dispatch(fetchProducts(fetchParams));
  }, [searchParams]); // Only depend on searchParams to avoid infinite loops

  // Separate useEffect for when filters change after initial load
  useEffect(() => {
    const fetchParams = {
      page: 1,
      limit: 12,
      category: currentFilter !== "all" ? currentFilter : undefined,
      search: searchQuery || undefined,
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      inStock,
    };

    // Update URL for SEO
    updateURLParams({
      category: currentFilter !== "all" ? currentFilter : undefined,
      search: searchQuery || undefined,
      sortBy: sortBy !== "name" ? sortBy : undefined,
      sortOrder: sortOrder !== "asc" ? sortOrder : undefined,
      minPrice: minPrice?.toString(),
      maxPrice: maxPrice?.toString(),
      inStock: inStock?.toString(),
    });

    dispatch(fetchProducts(fetchParams));
  }, [
    currentFilter,
    searchQuery,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    inStock,
  ]);

  const handleClearAllFilters = () => {
    dispatch(setFilter("all"));
    dispatch(setSearchQuery(""));
    dispatch(clearFilters());
    setSortBy("name");
    setSortOrder("asc");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setInStock(undefined);
  };

  if (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Products
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts({}))}
            className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white px-6 py-2 rounded-full font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* SEO-friendly Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-4 font-playfair">
          {currentFilter !== "all"
            ? `${
                currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)
              } - Bengali Sweets`
            : "Our Sweet Collection - Authentic Bengali Sweets"}
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
          {currentFilter !== "all"
            ? `Explore our ${currentFilter} collection of authentic Bengali sweets, crafted with love and tradition.`
            : "Discover authentic Bengali sweets, fusion treats, traditional snacks, and curated packages crafted with love and tradition."}
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        <ProductSearch />
        <ProductFilters
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStock={inStock}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
          onStockChange={setInStock}
        />
      </div>

      {/* Results Summary and Sorting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="text-gray-600">
          <p>
            Showing {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
            {pagination && <span> ({pagination.totalProducts} total)</span>}
            {currentFilter !== "all" && (
              <span className="ml-1">
                in{" "}
                <span className="font-semibold text-[var(--roshogolpo-gold)]">
                  {currentFilter.charAt(0).toUpperCase() +
                    currentFilter.slice(1)}
                </span>
              </span>
            )}
            {searchQuery && (
              <span className="ml-1">
                for "
                <span className="font-semibold text-[var(--roshogolpo-gold)]">
                  {searchQuery}
                </span>
                "
              </span>
            )}
          </p>
        </div>

        <ProductSorting
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(newSortBy, newSortOrder) => {
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
        />
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="min-h-screen-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--roshogolpo-gold)]"></div>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </AnimatePresence>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex items-center gap-2">
            {pagination.hasPrevPage && (
              <button
                onClick={() => {
                  const prevPage = pagination.currentPage - 1;
                  dispatch(fetchProducts({ ...filters, page: prevPage }));
                }}
                className="px-4 py-2 border border-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-gold)] hover:text-white rounded-full"
              >
                Previous
              </button>
            )}

            <span className="px-4 py-2 text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            {pagination.hasNextPage && (
              <button
                onClick={() => {
                  const nextPage = pagination.currentPage + 1;
                  dispatch(fetchProducts({ ...filters, page: nextPage }));
                }}
                className="px-4 py-2 border border-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-gold)] hover:text-white rounded-full"
              >
                Next
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* No Results */}
      {products.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🍯</div>
          <h3 className="text-2xl font-bold text-[var(--roshogolpo-gold)] mb-2">
            No sweets found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter to find the perfect sweet for
            you.
          </p>
          <button
            onClick={handleClearAllFilters}
            className="text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)] font-semibold"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
