import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Order from "@/models/Order"
import { getAuthUser, isAdmin } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""

    const skip = (page - 1) * limit

    // Build filter - exclude admin users from customer list
    const filter: any = { role: { $ne: "admin", $ne: "superadmin" } }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ]
    }
    if (role && role !== "all") {
      filter.role = role
    }

    const [customers, total] = await Promise.all([
      User.find(filter).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ])

    // Get order counts for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const orderCount = await Order.countDocuments({ user: customer._id })
        const totalSpent = await Order.aggregate([
          { $match: { user: customer._id, orderStatus: { $ne: "Cancelled" } } },
          { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ])

        return {
          ...customer.toObject(),
          orderCount,
          totalSpent: totalSpent[0]?.total || 0,
        }
      }),
    )

    return NextResponse.json({
      customers: customersWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Customers fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
