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
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
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

      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

      if (typeof window !== "undefined") {
        localStorage.setItem("roshogolpo-cart", JSON.stringify(state))
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

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
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

      if (typeof window !== "undefined") {
        localStorage.setItem("roshogolpo-cart", JSON.stringify(state))
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0

      if (typeof window !== "undefined") {
        localStorage.setItem("roshogolpo-cart", JSON.stringify(state))
      }
    },
    hydrateCart: (state, action: PayloadAction<CartState>) => {
      return action.payload
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, hydrateCart } = cartSlice.actions
export default cartSlice.reducer
