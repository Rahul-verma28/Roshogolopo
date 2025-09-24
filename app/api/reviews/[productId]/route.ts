import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Review from "@/models/Review"

export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    await connectDB()

    const { productId } = params
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Build sort query
    const sort: any = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get approved reviews for this product
    const reviews = await Review.find({
      product: productId,
      isApproved: true,
    })
      .populate("user", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count and rating stats
    const total = await Review.countDocuments({
      product: productId,
      isApproved: true,
    })

    // Calculate rating distribution
    const ratingStats = await Review.aggregate([
      {
        $match: {
          product: productId,
          isApproved: true,
        },
      },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ])

    // Calculate average rating
    const avgRatingResult = await Review.aggregate([
      {
        $match: {
          product: productId,
          isApproved: true,
        },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ])

    const avgRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 0
    const totalReviews = avgRatingResult.length > 0 ? avgRatingResult[0].totalReviews : 0

    // Format rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
      const stat = ratingStats.find((s) => s._id === rating)
      return {
        rating,
        count: stat ? stat.count : 0,
        percentage: totalReviews > 0 ? Math.round(((stat ? stat.count : 0) / totalReviews) * 100) : 0,
      }
    })

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      reviews,
      stats: {
        avgRating: Math.round(avgRating * 10) / 10,
        totalReviews,
        ratingDistribution,
      },
      pagination: {
        currentPage: page,
        totalPages,
        totalReviews: total,
        hasNextPage,
        hasPrevPage,
        limit,
      },
    })
  } catch (error) {
    console.error("Get product reviews error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
