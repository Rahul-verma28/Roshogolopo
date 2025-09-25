import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import Review from "@/models/Review"
import { getAuthUser, isAdmin } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Fetch product details
    const product = await Product.findById(params.id).populate("category", "name")

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Calculate analytics (mock data for demonstration)
    const currentMonth = new Date()
    currentMonth.setDate(1)

    // In a real implementation, you would calculate these from actual order data
    const analytics = {
      totalViews: Math.floor(Math.random() * 5000) + 1000,
      totalOrders: Math.floor(Math.random() * 500) + 50,
      totalRevenue: Math.floor(Math.random() * 50000) + 10000,
      averageOrderValue: Math.floor(Math.random() * 500) + 200,
      conversionRate: Math.random() * 10 + 2,
      viewsThisMonth: Math.floor(Math.random() * 1000) + 100,
      ordersThisMonth: Math.floor(Math.random() * 100) + 10,
      revenueThisMonth: Math.floor(Math.random() * 10000) + 2000,
      topSellingWeight: product.weightPrices[0]?.weight || "500g",
      recentReviews: await Review.find({ product: params.id })
        .populate("user", "name")
        .sort({ createdAt: -1 })
        .limit(5),
    }

    return NextResponse.json({
      product: {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        images: product.images,
        category: typeof product.category === "object" ? product.category.name : product.category,
        ratings: product.ratings,
        numReviews: product.numReviews,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        createdAt: product.createdAt,
      },
      analytics,
    })
  } catch (error) {
    console.error("Error fetching product analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
