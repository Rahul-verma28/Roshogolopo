import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import User from "@/models/User"
import dbConnect from "./mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AuthUser {
  id: string
  email: string
  role: string
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    await dbConnect()
    const user = await User.findById(decoded.id)

    if (!user) return null

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    return null
  }
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const token = request.cookies.get("auth-token")?.value

  if (!token) return null

  return verifyToken(token)
}

export function generateToken(user: any): string {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" })
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === "admin" || user?.role === "superadmin"
}
