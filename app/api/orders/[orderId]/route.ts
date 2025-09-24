import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const { orderId } = params

    // Find order
    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderNumber: orderId }],
      customer: decoded.userId,
    })
      .populate("customer", "name email phone")
      .populate("items.product", "name images")
      .lean()

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Get order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    const { orderId } = params
    const { action } = await request.json()

    // Find order
    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderNumber: orderId }],
      customer: decoded.userId,
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Handle different actions
    switch (action) {
      case "cancel":
        if (order.status !== "pending" && order.status !== "confirmed") {
          return NextResponse.json({ error: "Order cannot be cancelled" }, { status: 400 })
        }

        order.status = "cancelled"
        order.cancelledAt = new Date()

        // Restore product inventory
        const Product = (await import("@/models/Product")).default
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { "inventory.quantity": item.quantity },
          })
        }

        await order.save()
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    // Return updated order
    const updatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate("items.product", "name images")

    return NextResponse.json({
      message: "Order updated successfully",
      order: updatedOrder,
    })
  } catch (error) {
    console.error("Update order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
