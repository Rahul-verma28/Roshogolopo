import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  appliedCoupon: {
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  appliedCoupon: null,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      cartSlice.caseReducers.calculateTotals(state)

      if (typeof window !== "undefined") {
        localStorage.setItem("roshogolpo-cart", JSON.stringify(state))
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)

      if (typeof window !== "undefined") {
        localStorage.setItem("roshogolpo-cart", JSON.stringify(state))
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id)
        }
      }
      cartSlice.caseReducers.calculateTotals(state)

      if (typeof window !== "undefined") {
        localStorage.setItem("roshogolpo-cart", JSON.stringify(state))
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
      state.appliedCoupon = null

      if (typeof window !== "undefined") {
        localStorage.setItem("roshogolpo-cart", JSON.stringify(state))
      }
    },
    hydrateCart: (state, action: PayloadAction<CartState>) => {
      return action.payload
    },
    applyCoupon: (
      state,
      action: PayloadAction<{
        code: string
        discount: number
        type: "percentage" | "fixed"
      }>
    ) => {
      state.appliedCoupon = action.payload
      cartSlice.caseReducers.calculateTotals(state)
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null
      cartSlice.caseReducers.calculateTotals(state)
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
      
      const subtotal = state.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
      
      let discount = 0
      if (state.appliedCoupon) {
        if (state.appliedCoupon.type === "percentage") {
          discount = (subtotal * state.appliedCoupon.discount) / 100
        } else {
          discount = state.appliedCoupon.discount
        }
      }
      
      state.total = Math.max(0, subtotal - discount)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, hydrateCart, applyCoupon, removeCoupon, calculateTotals } = cartSlice.actions
export default cartSlice.reducer
