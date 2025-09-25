import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Review from "@/models/Review"
import { getAuthUser, isAdmin } from "@/lib/auth"

// Force dynamic rendering
export const dynamic = 'force-dynamic'


export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const rating = searchParams.get("rating")

    await connectDB()

    const query: any = {}
    if (search) {
      query.$or = [{ comment: { $regex: search, $options: "i" } }]
    }
    if (rating) {
      query.rating = Number.parseInt(rating)
    }

    const skip = (page - 1) * limit

    const [reviews, total] = await Promise.all([
      Review.find(query)
        .populate("product", "name slug images")
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments(query),
    ])

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
