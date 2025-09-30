"use client"

import Link from "next/link"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateQuantity, removeFromCart, clearCart } from "@/lib/features/cartSlice"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"

export default function ClientCartPage() {
  const { items, total, itemCount } = useAppSelector((s) => s.cart)
  const dispatch = useAppDispatch()

  const changeQty = (id: string, q: number) => {
    if (q <= 0) dispatch(removeFromCart(id))
    else dispatch(updateQuantity({ id, quantity: q }))
  }

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Add some delicious Bengali sweets to get started.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse Products</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Your Cart</h1>
        <p className="text-muted-foreground mt-1">
          You have {itemCount} item{itemCount > 1 ? "s" : ""} in your cart.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-4 py-5">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-pretty">{item.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                <div className="mt-3 flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => changeQty(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => changeQty(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right font-semibold">₹{((item.price || 0) * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <Separator className="my-4" />
          <Button variant="ghost" className="text-destructive" onClick={() => dispatch(clearCart())}>
            Clear cart
          </Button>
        </div>

        <aside className="rounded-lg border p-6 h-fit">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-4 flex items-center justify-between">
            <span>Total</span>
            <span className="text-2xl font-bold">₹{(total || 0).toFixed(2)}</span>
          </div>
          <Button asChild className="w-full mt-6">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button asChild variant="outline" className="w-full mt-2 bg-transparent">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </aside>
      </section>
    </main>
  )
}
