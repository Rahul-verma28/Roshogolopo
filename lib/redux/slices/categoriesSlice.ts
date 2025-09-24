import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
  isActive: boolean
  productCount?: number
  createdAt: string
}

interface CategoriesState {
  categories: Category[]
  currentCategory: Category | null
  isLoading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  currentCategory: null,
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async ({ includeProductCount = false }: { includeProductCount?: boolean } = {}) => {
    const params = new URLSearchParams()
    if (includeProductCount) {
      params.append("includeProductCount", "true")
    }

    const response = await fetch(`/api/categories?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }

    return response.json()
  },
)

export const fetchCategoryById = createAsyncThunk("categories/fetchById", async (id: string) => {
  const response = await fetch(`/api/categories/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch category")
  }

  return response.json()
})

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload.categories
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch categories"
      })

      // Fetch Category by ID
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.currentCategory = action.payload.category
      })
  },
})

export const { clearError, clearCurrentCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
