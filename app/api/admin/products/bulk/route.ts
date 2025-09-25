import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import { getAuthUser, isAdmin } from "@/lib/auth"

// Force dynamic rendering
export const dynamic = 'force-dynamic'


export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { action, productIds } = body

    if (!action || !productIds || !Array.isArray(productIds)) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    await connectDB()

    let updateData: any = {}
    let result

    switch (action) {
      case "delete":
        result = await Product.deleteMany({ _id: { $in: productIds } })
        break
      case "activate":
        updateData = { isActive: true }
        result = await Product.updateMany({ _id: { $in: productIds } }, updateData)
        break
      case "deactivate":
        updateData = { isActive: false }
        result = await Product.updateMany({ _id: { $in: productIds } }, updateData)
        break
      case "feature":
        updateData = { isFeatured: true }
        result = await Product.updateMany({ _id: { $in: productIds } }, updateData)
        break
      case "unfeature":
        updateData = { isFeatured: false }
        result = await Product.updateMany({ _id: { $in: productIds } }, updateData)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      message: `Bulk ${action} completed successfully`,
      affected: result.modifiedCount || result.deletedCount,
    })
  } catch (error) {
    console.error("Error performing bulk action:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
