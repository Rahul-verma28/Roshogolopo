import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import Product from "@/models/Product"
import User from "@/models/User"
import { getAuthUser, isAdmin } from "@/lib/auth"

// Force dynamic rendering
export const dynamic = 'force-dynamic'


export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30" // days

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - Number.parseInt(period))

    // Overall stats
    const [totalOrders, totalRevenue, totalCustomers, totalProducts] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([
        { $match: { orderStatus: { $ne: "Cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      User.countDocuments({ role: { $nin: ["admin", "superadmin"] } }),
      Product.countDocuments(),
    ])

    // Revenue over time (last 30 days)
    const revenueOverTime = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          orderStatus: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    // Top selling products
    const topProducts = await Order.aggregate([
      { $match: { orderStatus: { $ne: "Cancelled" } } },
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
          totalSold: { $sum: "$orderItems.qty" },
          revenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.qty"] } },
          name: { $first: "$orderItems.name" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
    ])

    // Order status distribution
    const orderStatusDistribution = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ])

    // Monthly growth
    const currentMonth = new Date()
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const [currentMonthStats, lastMonthStats] = await Promise.all([
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1) },
            orderStatus: { $ne: "Cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$totalPrice" },
            orders: { $sum: 1 },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
              $lt: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
            },
            orderStatus: { $ne: "Cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$totalPrice" },
            orders: { $sum: 1 },
          },
        },
      ]),
    ])

    const currentRevenue = currentMonthStats[0]?.revenue || 0
    const lastRevenue = lastMonthStats[0]?.revenue || 0
    const currentOrders = currentMonthStats[0]?.orders || 0
    const lastOrders = lastMonthStats[0]?.orders || 0

    const revenueGrowth = lastRevenue > 0 ? ((currentRevenue - lastRevenue) / lastRevenue) * 100 : 0
    const orderGrowth = lastOrders > 0 ? ((currentOrders - lastOrders) / lastOrders) * 100 : 0

    return NextResponse.json({
      overview: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalCustomers,
        totalProducts,
        revenueGrowth: Math.round(revenueGrowth * 100) / 100,
        orderGrowth: Math.round(orderGrowth * 100) / 100,
      },
      revenueOverTime,
      topProducts,
      orderStatusDistribution,
    })
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
