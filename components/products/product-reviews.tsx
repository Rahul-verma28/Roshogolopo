"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star, User, ThumbsUp } from "lucide-react"

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  helpful: number
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    comment:
      "Absolutely delicious! Tastes exactly like the ones from Kolkata. The texture is perfect and the sweetness is just right.",
    date: "2024-01-15",
    helpful: 12,
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    rating: 4,
    comment:
      "Very good quality and fresh. Packaging was excellent and delivery was on time. Will definitely order again.",
    date: "2024-01-10",
    helpful: 8,
  },
  {
    id: "3",
    name: "Anita Das",
    rating: 5,
    comment: "Outstanding! My family loved it. The authentic taste brought back so many memories of home.",
    date: "2024-01-05",
    helpful: 15,
  },
]

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews] = useState<Review[]>(mockReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage: (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100,
  }))

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("New review:", newReview)
    setShowReviewForm(false)
    setNewReview({ name: "", rating: 5, comment: "" })
  }

  return (
    <section className="py-16 border-t border-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12 max-w-6xl mx-auto px-4"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--roshogolpo-gold)] mb-8 font-playfair">
          Customer Reviews
        </h2>

        {/* Rating Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-[var(--roshogolpo-gold)]">{(averageRating || 0).toFixed(1)}</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(averageRating)
                        ? "fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">Based on {reviews.length} reviews</p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-xs sm:text-sm w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[var(--roshogolpo-gold)] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)] text-white"
          >
            Write a Review
          </Button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Your Name</label>
                    <Input
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating })}
                          className="p-1"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              rating <= newReview.rating
                                ? "fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Your Review</label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share your experience with this product..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button type="submit" className="bg-[var(--roshogolpo-gold)] hover:bg-[var(--roshogolpo-hover)]">
                      Submit Review
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-6 max-w-6xl mx-auto px-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--roshogolpo-light)] rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-[var(--roshogolpo-gold)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-[var(--roshogolpo-gold)]">{review.name}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-[var(--roshogolpo-gold)] text-[var(--roshogolpo-gold)]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 hover:text-[var(--roshogolpo-gold)]">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
