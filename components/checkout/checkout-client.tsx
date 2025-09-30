"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { clearCart } from "@/lib/features/cartSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, CreditCard, Truck, Shield } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function CheckoutClient() {
  const { items, total, itemCount } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setOrderComplete(true)
    dispatch(clearCart())

    // Redirect to home after 5 seconds
    setTimeout(() => {
      router.push("/")
    }, 5000)
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some delicious Bengali sweets to get started!</p>
        <Button asChild className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]">
          <a href="/products">Browse Products</a>
        </Button>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order! We'll contact you shortly to confirm delivery details.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">Redirecting to home page in a few seconds...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--roshogolpo-gold)] mb-8 font-playfair">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">First Name *</label>
                    <Input name="firstName" required value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Last Name *</label>
                    <Input name="lastName" required value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Email *</label>
                    <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Phone *</label>
                    <Input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2">Address *</label>
                  <Textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">City *</label>
                    <Input name="city" required value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">PIN Code *</label>
                    <Input name="pincode" required value={formData.pincode} onChange={handleInputChange} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2">Special Instructions</label>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special delivery instructions or preferences..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white py-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Order...
                    </>
                  ) : (
                    `Place Order - ₹${(total || 0).toFixed(2)}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary ({itemCount} items)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-xs sm:text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{((item.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{(total || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm sm:text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-[var(--roshogolpo-gold)]">₹{(total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-xs sm:text-sm">Secure & Safe Payment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-500" />
                    <span className="text-xs sm:text-sm">Free Delivery in Greater Noida</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-xs sm:text-sm">Fresh & Quality Guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
