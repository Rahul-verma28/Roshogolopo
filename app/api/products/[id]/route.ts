import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import Review from "@/models/Review"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params

    // Find product by ID or slug
    const product = await Product.findOne({
      $or: [{ _id: id }, { slug: id }],
      isActive: true,
    })
      .populate("category", "name slug")
      .lean()

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get product reviews with user details
    const reviews = await Review.find({
      product: product._id,
      isApproved: true,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    // Calculate average rating
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

    // Increment view count
    await Product.findByIdAndUpdate(product._id, {
      $inc: { "analytics.views": 1 },
    })

    return NextResponse.json({
      product: {
        ...product,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length,
      },
      reviews,
    })
  } catch (error) {
    console.error("Get product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
