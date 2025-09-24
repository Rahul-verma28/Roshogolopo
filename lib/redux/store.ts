import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import cartSlice from "./slices/cartSlice"
import authSlice from "./slices/authSlice"
import productsSlice from "./slices/productsSlice"
import categoriesSlice from "./slices/categoriesSlice"
import ordersSlice from "./slices/ordersSlice"
import reviewsSlice from "./slices/reviewsSlice"
import couponSlice from "./slices/couponSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], // Only persist cart and auth
}

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
  products: productsSlice,
  categories: categoriesSlice,
  orders: ordersSlice,
  reviews: reviewsSlice,
  coupon: couponSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
