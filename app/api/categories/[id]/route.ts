import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"
import Product from "@/models/Product"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params

    // Find category by ID or slug
    const category = await Category.findOne({
      $or: [{ _id: id }, { slug: id }],
      isActive: true,
    }).lean()

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Get product count for this category
    const productCount = await Product.countDocuments({
      category: category._id,
      isActive: true,
    })

    return NextResponse.json({
      category: {
        ...category,
        productCount,
      },
    })
  } catch (error) {
    console.error("Get category error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
