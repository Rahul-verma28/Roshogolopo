import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"
import Product from "@/models/Product"
import User from "@/models/User"
import Coupon from "@/models/Coupon"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const { items, shippingAddress, paymentMethod, couponCode } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 })
    }

    if (!shippingAddress) {
      return NextResponse.json({ error: "Shipping address is required" }, { status: 400 })
    }

    // Validate and calculate order totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.productId)
      if (!product || !product.isActive) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 400 })
      }

      const pricing = product.pricing.find((p: any) => p.weight === item.weightOption)
      if (!pricing) {
        return NextResponse.json({ error: `Weight option not found for product ${item.productId}` }, { status: 400 })
      }

      // Check stock
      if (!product.inventory.inStock || product.inventory.quantity < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for product ${product.name}` }, { status: 400 })
      }

      const itemTotal = pricing.price * item.quantity

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0],
        weightOption: item.weightOption,
        price: pricing.price,
        quantity: item.quantity,
        total: itemTotal,
      })

      subtotal += itemTotal
    }

    // Apply coupon if provided
    let discount = 0
    let appliedCoupon = null

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode,
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() },
      })

      if (coupon && subtotal >= coupon.minOrderAmount) {
        if (coupon.usageLimit === 0 || coupon.usedCount < coupon.usageLimit) {
          if (coupon.type === "percentage") {
            discount = Math.min((subtotal * coupon.value) / 100, coupon.maxDiscount || Number.POSITIVE_INFINITY)
          } else {
            discount = coupon.value
          }

          appliedCoupon = {
            code: coupon.code,
            type: coupon.type,
            value: coupon.value,
            discount,
          }

          // Update coupon usage
          coupon.usedCount += 1
          await coupon.save()
        }
      }
    }

    const total = subtotal - discount

    // Generate order number
    const orderCount = await Order.countDocuments()
    const orderNumber = `ORD-${Date.now()}-${orderCount + 1}`

    // Create order
    const order = await Order.create({
      orderNumber,
      customer: decoded.userId,
      items: orderItems,
      subtotal,
      discount,
      total,
      shippingAddress,
      paymentMethod,
      appliedCoupon,
      status: "pending",
      paymentStatus: "pending",
    })

    // Update product inventory
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { "inventory.quantity": -item.quantity },
      })
    }

    // Update user order history
    await User.findByIdAndUpdate(decoded.userId, {
      $push: { orderHistory: order._id },
    })

    // Populate order for response
    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate("items.product", "name images")

    return NextResponse.json(
      {
        message: "Order created successfully",
        order: populatedOrder,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    // Build filter
    const filter: any = { customer: decoded.userId }
    if (status) {
      filter.status = status
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get orders
    const orders = await Order.find(filter)
      .populate("items.product", "name images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count
    const total = await Order.countDocuments(filter)

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders: total,
        hasNextPage,
        hasPrevPage,
        limit,
      },
    })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
