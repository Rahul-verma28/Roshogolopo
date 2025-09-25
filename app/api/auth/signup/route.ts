import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

// Force dynamic rendering
export const dynamic = 'force-dynamic'


export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { name, email, password, phone } = await request.json()

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: "Name, email, password, and phone are required" }, { status: 400 })
    }

    // Check if user already exists
    let query: any = { email: email }
    if (phone?.trim()) {
      query = { $or: [{ email: email }, { phone: phone }] }
    }
    const existingUser = await User.findOne(query)

    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email or phone" }, { status: 400 })
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const userData: any = {
      name,
      email,
      phone,
      password: hashedPassword,
    }
    
    if (phone?.trim()) {
      userData.phone = phone
    }
    
    const user = new User(userData);

    await user.save();

    const token = await generateToken(user);

    const response = NextResponse.json({
      message: "Account created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses,
        orderHistory: user.orderHistory
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
