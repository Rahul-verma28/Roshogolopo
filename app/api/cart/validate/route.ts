import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { items } = await request.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid cart items" }, { status: 400 })
    }

    const validationResults = []
    let totalAmount = 0

    for (const item of items) {
      const { productId, weightOption, quantity } = item

      // Find product
      const product = await Product.findById(productId)
      if (!product || !product.isActive) {
        validationResults.push({
          productId,
          isValid: false,
          error: "Product not found or inactive",
        })
        continue
      }

      // Find weight option
      const pricing = product.pricing.find((p: any) => p.weight === weightOption)
      if (!pricing) {
        validationResults.push({
          productId,
          isValid: false,
          error: "Weight option not found",
        })
        continue
      }

      // Check stock availability
      if (!product.inventory.inStock || product.inventory.quantity < quantity) {
        validationResults.push({
          productId,
          isValid: false,
          error: "Insufficient stock",
          availableQuantity: product.inventory.quantity,
        })
        continue
      }

      // Calculate item total
      const itemTotal = pricing.price * quantity

      validationResults.push({
        productId,
        isValid: true,
        currentPrice: pricing.price,
        itemTotal,
        availableQuantity: product.inventory.quantity,
      })

      totalAmount += itemTotal
    }

    const isCartValid = validationResults.every((result) => result.isValid)

    return NextResponse.json({
      isValid: isCartValid,
      items: validationResults,
      totalAmount,
    })
  } catch (error) {
    console.error("Cart validation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
