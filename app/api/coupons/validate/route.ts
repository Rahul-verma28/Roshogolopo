import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Coupon from "@/models/Coupon"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { code, cartTotal } = await request.json()
    

    if (!code) {
      return NextResponse.json({ error: "Coupon code is required" }, { status: 400 })
    }

    if (!cartTotal || cartTotal <= 0) {
      return NextResponse.json({ error: "Invalid cart total" }, { status: 400 })
    }

    // Find coupon
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    })

    if (!coupon) {
      return NextResponse.json({ error: "Invalid or expired coupon code" }, { status: 400 })
    }

    // Check minimum order amount
    if (cartTotal < coupon.minOrderAmount) {
      return NextResponse.json(
        {
          error: `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon`,
        },
        { status: 400 },
      )
    }

    // Check usage limit
    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json({ error: "Coupon usage limit exceeded" }, { status: 400 })
    }

    // Calculate discount
    let discount = 0
    if (coupon.type === "percentage") {
      discount = (cartTotal * coupon.value) / 100
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount
      }
    } else {
      discount = coupon.value
    }

    // Ensure discount doesn't exceed cart total
    discount = Math.min(discount, cartTotal)

    return NextResponse.json({
      isValid: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
        description: coupon.description,
      },
      finalTotal: cartTotal - discount,
    })
  } catch (error) {
    console.error("Validate coupon error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
