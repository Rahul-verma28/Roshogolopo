import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "4")

    // Find the current product
    const currentProduct = await Product.findById(id)
    if (!currentProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Find related products by category, excluding current product
    const relatedProducts = await Product.find({
      _id: { $ne: id },
      category: currentProduct.category,
      isActive: true,
    })
      .populate("category", "name slug")
      .limit(limit)
      .lean()

    // If not enough related products, fill with other products
    if (relatedProducts.length < limit) {
      const additionalProducts = await Product.find({
        _id: { $ne: id, $nin: relatedProducts.map((p) => p._id) },
        isActive: true,
      })
        .populate("category", "name slug")
        .limit(limit - relatedProducts.length)
        .lean()

      relatedProducts.push(...additionalProducts)
    }

    return NextResponse.json({ products: relatedProducts })
  } catch (error) {
    console.error("Get related products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
