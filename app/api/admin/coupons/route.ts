import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Coupon from "@/models/Coupon"
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
    const status = searchParams.get("status")

    await connectDB()

    const query: any = {}
    if (search) {
      query.code = { $regex: search, $options: "i" }
    }
    if (status === "active") {
      query.isActive = true
      query.$or = [{ expiry: { $gte: new Date() } }, { expiry: null }]
    } else if (status === "expired") {
      query.expiry = { $lt: new Date() }
    } else if (status === "inactive") {
      query.isActive = false
    }

    const skip = (page - 1) * limit

    const [coupons, total] = await Promise.all([
      Coupon.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Coupon.countDocuments(query),
    ])

    return NextResponse.json({
      coupons,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching coupons:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { code, type, value, expiry, minOrder, maxUses, isActive } = body

    await connectDB()

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code })
    if (existingCoupon) {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 400 })
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      type,
      value,
      expiry: expiry ? new Date(expiry) : null,
      minOrder,
      maxUses,
      isActive,
    })

    await coupon.save()
    return NextResponse.json(coupon, { status: 201 })
  } catch (error) {
    console.error("Error creating coupon:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
