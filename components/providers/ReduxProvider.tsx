"use client"

import type React from "react"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/lib/redux/store"
import { PageLoading } from "@/components/ui/loading";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div><PageLoading /></div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
