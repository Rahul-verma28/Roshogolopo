import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Review from "@/models/Review"
import Product from "@/models/Product"
import Order from "@/models/Order"
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

    const { productId, rating, comment, images } = await request.json()

    if (!productId || !rating) {
      return NextResponse.json({ error: "Product ID and rating are required" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Check if product exists
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if user has purchased this product
    const userOrders = await Order.find({
      customer: decoded.userId,
      status: "delivered",
      "items.product": productId,
    })

    if (userOrders.length === 0) {
      return NextResponse.json({ error: "You can only review products you have purchased" }, { status: 400 })
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({
      user: decoded.userId,
      product: productId,
    })

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 })
    }

    // Create review
    const review = await Review.create({
      user: decoded.userId,
      product: productId,
      rating,
      comment,
      images: images || [],
      isApproved: false, // Reviews need admin approval
    })

    // Populate user details for response
    const populatedReview = await Review.findById(review._id).populate("user", "name").populate("product", "name")

    return NextResponse.json(
      {
        message: "Review submitted successfully. It will be visible after admin approval.",
        review: populatedReview,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create review error:", error)
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

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get user's reviews
    const reviews = await Review.find({ user: decoded.userId })
      .populate("product", "name images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count
    const total = await Review.countDocuments({ user: decoded.userId })

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      reviews,
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
    console.error("Get user reviews error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
