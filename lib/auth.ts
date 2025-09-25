import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { SignJWT } from "jose"
import User from "@/models/User"
import dbConnect from "./mongodb"
import { User as AuthUser } from "@/lib/types"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    await dbConnect()
    const user = await User.findById(decoded.id)

    if (!user) return null
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses,
      orderHistory: user.orderHistory,
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return null
  }
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const token = request.cookies.get("auth-token")?.value

  if (!token) return null

  return verifyToken(token)
}

export async function generateToken(user: any): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)
  
  return await new SignJWT({ 
    id: user._id.toString(), 
    email: user.email, 
    role: user.role 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === "admin" || user?.role === "superadmin"
}
