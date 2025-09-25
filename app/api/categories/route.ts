import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"
import Product from "@/models/Product"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const includeProductCount = searchParams.get("includeProductCount") === "true"

    // Get all active categories
    const categories = await Category.find({ isActive: true }).sort({ name: 1 }).lean()

    // Add product count if requested
    if (includeProductCount) {
      const categoriesWithCount = await Promise.all(
        categories.map(async (category) => {
          const productCount = await Product.countDocuments({
            category: category._id,
            isActive: true,
          })
          return {
            ...category,
            productCount,
          }
        }),
      )

      return NextResponse.json({ categories: categoriesWithCount })
    }

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
