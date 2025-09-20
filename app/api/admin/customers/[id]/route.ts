import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Order from "@/models/Order"
import { getAuthUser, isAdmin } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const customer = await User.findById(params.id).select("-password")
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Get customer's orders
    const orders = await Order.find({ user: params.id })
      .populate("orderItems.product", "name images")
      .sort({ createdAt: -1 })
      .limit(10)

    // Get customer stats
    const orderCount = await Order.countDocuments({ user: params.id })
    const totalSpent = await Order.aggregate([
      { $match: { user: customer._id, orderStatus: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ])

    return NextResponse.json({
      customer: {
        ...customer.toObject(),
        orderCount,
        totalSpent: totalSpent[0]?.total || 0,
      },
      orders,
    })
  } catch (error) {
    console.error("Customer fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const data = await request.json()
    const customer = await User.findByIdAndUpdate(params.id, data, { new: true }).select("-password")

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json({ customer })
  } catch (error) {
    console.error("Customer update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
