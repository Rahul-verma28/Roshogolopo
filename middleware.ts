import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Edge Runtime compatible JWT verification
async function verifyTokenEdge(token: string): Promise<{ id: string; email: string; role: string } | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    
    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as string,
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

function isAdmin(role: string): boolean {
  return role === "admin" || role === "superadmin"
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get("auth-token")?.value

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      console.log("No token found, redirecting to login")
      const loginUrl = new URL("/auth/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    const user = await verifyTokenEdge(token)
    if (!user || !isAdmin(user.role)) {
      console.log("Invalid token or not admin, redirecting to login")
      const loginUrl = new URL("/auth/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    console.log("Admin access granted for:", user.email)
  }

  // Redirect logged-in admins away from auth login page
  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    if (token) {
      const user = await verifyTokenEdge(token)
      if (user && isAdmin(user.role)) {
        console.log("Redirecting logged-in admin to dashboard")
        const adminUrl = new URL("/admin", request.url)
        return NextResponse.redirect(adminUrl)
      }
      if (user) {
        console.log("Redirecting logged-in user to home")
        const homeUrl = new URL("/", request.url)
        return NextResponse.redirect(homeUrl)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}


