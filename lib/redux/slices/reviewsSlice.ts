import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Review {
  _id: string
  user: {
    _id: string
    name: string
  }
  product: {
    _id: string
    name: string
    images: string[]
  }
  rating: number
  comment: string
  images: string[]
  isApproved: boolean
  createdAt: string
}

interface ProductReviewStats {
  avgRating: number
  totalReviews: number
  ratingDistribution: Array<{
    rating: number
    count: number
    percentage: number
  }>
}

interface ReviewsState {
  userReviews: Review[]
  productReviews: Review[]
  productReviewStats: ProductReviewStats | null
  isLoading: boolean
  error: string | null
  pagination: {
    currentPage: number
    totalPages: number
    totalReviews: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
  } | null
}

const initialState: ReviewsState = {
  userReviews: [],
  productReviews: [],
  productReviewStats: null,
  isLoading: false,
  error: null,
  pagination: null,
}

// Async thunks
export const submitReview = createAsyncThunk(
  "reviews/submit",
  async (
    reviewData: {
      productId: string
      rating: number
      comment: string
      images?: string[]
    },
    { getState },
  ) => {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token

    if (!token) {
      throw new Error("No token available")
    }

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to submit review")
    }

    return response.json()
  },
)

export const fetchUserReviews = createAsyncThunk(
  "reviews/fetchUserReviews",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token

    if (!token) {
      throw new Error("No token available")
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    const response = await fetch(`/api/reviews?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user reviews")
    }

    return response.json()
  },
)

export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async ({
    productId,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  }: {
    productId: string
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

    const response = await fetch(`/api/reviews/${productId}?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch product reviews")
    }

    return response.json()
  },
)

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearProductReviews: (state) => {
      state.productReviews = []
      state.productReviewStats = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Review
      .addCase(submitReview.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.userReviews.unshift(action.payload.review)
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to submit review"
      })

      // Fetch User Reviews
      .addCase(fetchUserReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.userReviews = action.payload.reviews
        state.pagination = action.payload.pagination
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch user reviews"
      })

      // Fetch Product Reviews
      .addCase(fetchProductReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.productReviews = action.payload.reviews
        state.productReviewStats = action.payload.stats
        state.pagination = action.payload.pagination
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch product reviews"
      })
  },
})

export const { clearError, clearProductReviews } = reviewsSlice.actions
export default reviewsSlice.reducer
