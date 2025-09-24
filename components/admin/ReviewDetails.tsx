"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ReviewDetailsProps {
  reviewId: string
}

interface Review {
  _id: string
  product: {
    _id: string
    name: string
    slug: string
    images: string[]
  }
  user: {
    _id: string
    name: string
    email: string
  }
  rating: number
  comment: string
  images: string[]
  createdAt: string
}

export function ReviewDetails({ reviewId }: ReviewDetailsProps) {
  const [review, setReview] = useState<Review | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchReview()
  }, [reviewId])

  const fetchReview = async () => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`)
      if (response.ok) {
        const data = await response.json()
        setReview(data)
      } else {
        throw new Error("Failed to fetch review")
      }
    } catch (error) {
      console.error("Error fetching review:", error)
      toast.error("Failed to load review details")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Review deleted successfully")
        router.push("/admin/reviews")
      } else {
        throw new Error("Failed to delete review")
      }
    } catch (error) {
      console.error("Error deleting review:", error)
      toast.error("Failed to delete review")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  if (loading) {
    return <div className="flex justify-center py-8">Loading review details...</div>
  }

  if (!review) {
    return <div className="text-center py-8 text-muted-foreground">Review not found</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/admin/reviews">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reviews
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Review Details</CardTitle>
                  <CardDescription>Customer feedback and rating</CardDescription>
                </div>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Review
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rating */}
              <div>
                <h3 className="font-medium mb-2">Rating</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                  <span className="text-sm text-muted-foreground">({review.rating}/5)</span>
                </div>
              </div>

              {/* Comment */}
              {review.comment && (
                <div>
                  <h3 className="font-medium mb-2">Comment</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              )}

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Review Date */}
              <div>
                <h3 className="font-medium mb-2">Review Date</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Info */}
          <Card>
            <CardHeader>
              <CardTitle>Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <img
                  src={review.product.images[0] || "/placeholder.svg"}
                  alt={review.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium">{review.product.name}</h3>
                  <p className="text-sm text-muted-foreground">#{review.product.slug}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                <Link href={`/admin/products/${review.product._id}`}>View Product</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">{review.user.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.user.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                <Link href={`/admin/customers/${review.user._id}`}>View Customer</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
