import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--roshogolpo-header)] to-[var(--roshogolpo-light)] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl mb-4">🍯</div>
        <h1 className="text-4xl font-bold text-[var(--roshogolpo-footer)] mb-4 font-playfair">Sweet Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The sweet you're looking for seems to have been eaten already. Let's find you something else delicious!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[var(--roshogolpo-footer)] hover:bg-[var(--roshogolpo-hover)] text-white">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[var(--roshogolpo-footer)] text-[var(--roshogolpo-footer)] hover:bg-[var(--roshogolpo-footer)] hover:text-white bg-transparent"
          >
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
