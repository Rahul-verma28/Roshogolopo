import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Coupon {
  code: string
  type: "percent" | "fixed"
  value: number
  discount: number
  description: string
}

interface CouponState {
  appliedCoupon: Coupon | null
  isValidating: boolean
  error: string | null
}

const initialState: CouponState = {
  appliedCoupon: null,
  isValidating: false,
  error: null,
}

// Async thunks
export const validateCoupon = createAsyncThunk(
  "coupon/validate",
  async ({ code, cartTotal }: { code: string; cartTotal: number }) => {
    const response = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, cartTotal }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to validate coupon")
    }

    return response.json()
  },
)

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearCoupon: (state) => {
      state.appliedCoupon = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.isValidating = true
        state.error = null
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.isValidating = false
        state.appliedCoupon = action.payload.coupon
        state.error = null
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.isValidating = false
        state.error = action.error.message || "Failed to validate coupon"
        state.appliedCoupon = null
      })
  },
})

export const { clearCoupon, clearError } = couponSlice.actions
export default couponSlice.reducer
