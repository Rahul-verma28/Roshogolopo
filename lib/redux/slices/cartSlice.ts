import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  productId: string
  name: string
  image: string
  weightOption: string
  price: number
  quantity: number
  maxQuantity: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  isLoading: boolean
  error: string | null
  appliedCoupon: {
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
  appliedCoupon: null,
}

// Async thunk for cart validation
export const validateCart = createAsyncThunk("cart/validate", async (_, { getState }) => {
  const state = getState() as { cart: CartState }
  const items = state.cart.items.map((item) => ({
    productId: item.productId,
    weightOption: item.weightOption,
    quantity: item.quantity,
  }))

  const response = await fetch("/api/cart/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  })

  if (!response.ok) {
    throw new Error("Failed to validate cart")
  }

  return response.json()
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId && item.weightOption === action.payload.weightOption,
      )

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + action.payload.quantity, existingItem.maxQuantity)
      } else {
        state.items.push(action.payload)
      }

      cartSlice.caseReducers.calculateTotals(state)
    },

    removeFromCart: (state, action: PayloadAction<{ productId: string; weightOption: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.productId === action.payload.productId && item.weightOption === action.payload.weightOption),
      )
      cartSlice.caseReducers.calculateTotals(state)
    },

    updateQuantity: (state, action: PayloadAction<{ productId: string; weightOption: string; quantity: number }>) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId && item.weightOption === action.payload.weightOption,
      )

      if (item) {
        item.quantity = Math.min(Math.max(1, action.payload.quantity), item.maxQuantity)
      }

      cartSlice.caseReducers.calculateTotals(state)
    },

    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalAmount = 0
      state.appliedCoupon = null
    },

    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number; type: "percentage" | "fixed" }>) => {
      state.appliedCoupon = action.payload
      cartSlice.caseReducers.calculateTotals(state)
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null
      cartSlice.caseReducers.calculateTotals(state)
    },

    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)

      const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)

      let discount = 0
      if (state.appliedCoupon) {
        if (state.appliedCoupon.type === "percentage") {
          discount = (subtotal * state.appliedCoupon.discount) / 100
        } else {
          discount = state.appliedCoupon.discount
        }
      }

      state.totalAmount = Math.max(0, subtotal - discount)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(validateCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(validateCart.fulfilled, (state, action) => {
        state.isLoading = false

        // Update items with current prices and availability
        action.payload.items.forEach((validationResult: any) => {
          const item = state.items.find((item) => item.productId === validationResult.productId)
          if (item && validationResult.isValid) {
            item.price = validationResult.currentPrice
            item.maxQuantity = validationResult.availableQuantity
          }
        })

        // Remove invalid items
        state.items = state.items.filter((item) => {
          const validation = action.payload.items.find((v: any) => v.productId === item.productId)
          return validation && validation.isValid
        })

        cartSlice.caseReducers.calculateTotals(state)
      })
      .addCase(validateCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to validate cart"
      })
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
