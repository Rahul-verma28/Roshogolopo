import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Your Profile | Roshogolpo",
  description: "Manage your details, addresses, and order history.",
  robots: { index: false, follow: true }, // account pages typically noindex
}

export default function ProfilePage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Profile & Orders</h1>
        <p className="text-muted-foreground mt-2">
          Sign in later to view orders, addresses, and preferences. This page is built to be fast and accessible.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You don’t have any orders yet.</p>
            <Button asChild className="mt-4">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <div className="font-medium">Email</div>
              <div className="text-muted-foreground">guest@roshogolpo.in</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Default Address</div>
              <div className="text-muted-foreground">Add an address at checkout</div>
            </div>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
