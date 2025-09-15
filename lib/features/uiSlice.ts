import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  isCartOpen: boolean
  isMobileMenuOpen: boolean
  currentFilter: string
  searchQuery: string
}

const initialState: UiState = {
  isCartOpen: false,
  isMobileMenuOpen: false,
  currentFilter: "all",
  searchQuery: "",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen
    },
    closeCart: (state) => {
      state.isCartOpen = false
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const { toggleCart, closeCart, toggleMobileMenu, closeMobileMenu, setFilter, setSearchQuery } = uiSlice.actions
export default uiSlice.reducer
