import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Product {
  _id: string
  name: string
  slug: string
  description: string
  images: string[]
  category: {
    _id: string
    name: string
    slug: string
  }
  pricing: Array<{
    weight: string
    price: number
    originalPrice?: number
  }>
  tags: string[]
  inventory: {
    inStock: boolean
    quantity: number
  }
  avgRating?: number
  reviewCount?: number
  isActive: boolean
  createdAt: string
}

interface ProductsState {
  products: Product[]
  currentProduct: Product | null
  relatedProducts: Product[]
  isLoading: boolean
  error: string | null
  pagination: {
    currentPage: number
    totalPages: number
    totalProducts: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
  } | null
  filters: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    sortBy?: string
    sortOrder?: string
  }
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  relatedProducts: [],
  isLoading: false,
  error: null,
  pagination: null,
  filters: {},
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (
    params: {
      page?: number
      limit?: number
      category?: string
      search?: string
      minPrice?: number
      maxPrice?: number
      inStock?: boolean
      sortBy?: string
      sortOrder?: string
    } = {},
  ) => {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const response = await fetch(`/api/products?${searchParams}`)

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    return response.json()
  },
)

export const fetchProductById = createAsyncThunk("products/fetchById", async (id: string) => {
  const response = await fetch(`/api/products/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }

  return response.json()
})

export const fetchRelatedProducts = createAsyncThunk("products/fetchRelated", async (id: string) => {
  const response = await fetch(`/api/products/related/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch related products")
  }

  return response.json()
})

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async ({
    categoryId,
    page = 1,
    limit = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
  }: {
    categoryId: string
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: string
  }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
    })

    const response = await fetch(`/api/products/categories/${categoryId}?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch products by category")
    }

    return response.json()
  },
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
      state.relatedProducts = []
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {}
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products
        state.pagination = action.payload.pagination
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch products"
      })

      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentProduct = action.payload.product
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch product"
      })

      // Fetch Related Products
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload.products
      })

      // Fetch Products by Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products
        state.pagination = action.payload.pagination
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch products by category"
      })
  },
})

export const { clearError, clearCurrentProduct, setFilters, clearFilters } = productsSlice.actions
export default productsSlice.reducer
