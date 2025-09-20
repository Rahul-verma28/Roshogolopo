import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { getAuthUser, isAdmin } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB()
    const adminUser = await User.findById(user.id).select("-password")

    if (!adminUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(adminUser)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json()
    const { name, email, phone, currentPassword, newPassword } = body

    await connectDB()
    const adminUser = await User.findById(user.id)

    if (!adminUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required" }, { status: 400 })
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, adminUser.password)
      if (!isCurrentPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12)
      adminUser.password = hashedNewPassword
    }

    // Update other fields
    if (name) adminUser.name = name
    if (email) adminUser.email = email
    if (phone) adminUser.phone = phone

    await adminUser.save()

    // Return user without password
    const updatedUser = await User.findById(user.id).select("-password")
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
