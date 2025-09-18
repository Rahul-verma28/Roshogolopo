"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { removeFromCart, updateQuantity, clearCart } from "@/lib/features/cartSlice"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartDrawerProps {
  children: React.ReactNode
}

export function CartDrawer({ children }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { items, total, itemCount } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          {children}
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]"
            >
              {itemCount}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-[var(--roshogolpo-gold)]">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({itemCount} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-sm sm:text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some delicious Bengali sweets to get started!</p>
              <Button asChild className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]">
                <Link href="/products" onClick={() => setIsOpen(false)}>
                  Browse Products
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs sm:text-sm text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                        <p className="text-xs sm:text-sm font-semibold text-[var(--roshogolpo-gold)] mt-1">₹{item.price}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-xs sm:text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-transparent"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-[var(--roshogolpo-gold)]">₹{total.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/checkout" className="w-full">
                      Proceed to Checkout
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                    <Link href="/products" className="w-full">
                      Continue Shopping
                    </Link>
                  </Button>

                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
