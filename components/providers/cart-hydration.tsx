"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { hydrateCart } from "@/lib/features/cartSlice"

export function CartHydration() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Hydrate cart from localStorage on client-side
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("roshogolpo-cart")
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart)
          dispatch(hydrateCart(cartData))
        } catch (error) {
          console.error("Failed to parse saved cart data:", error)
          localStorage.removeItem("roshogolpo-cart")
        }
      }
    }
  }, [dispatch])

  return null
}
