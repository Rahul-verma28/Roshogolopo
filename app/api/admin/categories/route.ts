import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Category from "@/models/Category"
import { getAuthUser, isAdmin } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const categories = await Category.find().sort({ createdAt: -1 })
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Categories fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const data = await request.json()
    const category = new Category(data)
    await category.save()

    return NextResponse.json({ category }, { status: 201 })
  } catch (error) {
    console.error("Category creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
