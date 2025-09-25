import { NextResponse } from "next/server"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" })

  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env?.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  })

  return response
}
