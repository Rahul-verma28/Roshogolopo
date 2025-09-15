import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import cartSlice from "./features/cartSlice"
import uiSlice from "./features/uiSlice"

const rootReducer = combineReducers({
  cart: cartSlice,
  ui: uiSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Disable serializable check for better performance
        ignoredActions: [],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
