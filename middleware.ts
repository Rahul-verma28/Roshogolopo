import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser, isAdmin } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  // if (pathname.startsWith("/admin")) {
  //   const user = await getAuthUser(request)

  //   if (!user || !isAdmin(user)) {
  //     return NextResponse.redirect(new URL("/admin/login", request.url))
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
