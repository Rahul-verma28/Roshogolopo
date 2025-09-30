"use client"

import Image from "next/image"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Loading({ className = "", size = "md", showText = true }: LoadingProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32"
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}>
      {/* Logo with pulse animation */}
      <div className="relative mb-6">
        <div className={`${sizeClasses[size]} relative animate-pulse`}>
          <Image
            src="/images/roshogolpo-logo.png"
            alt="Roshogolpo Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Rotating ring around logo */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-t-[var(--roshogolpo-gold)] rounded-full animate-spin`} />
      </div>

      {/* Loading text */}
      {showText && (
        <div className="text-center">
          <p className={`${textSizeClasses[size]} text-[var(--roshogolpo-active)] font-medium mb-2`}>
            Loading...
          </p>
          <p className="text-sm text-gray-500">
            Preparing your sweet experience
          </p>
        </div>
      )}

      {/* Animated dots */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-[var(--roshogolpo-gold)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[var(--roshogolpo-gold)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[var(--roshogolpo-gold)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

// Full-screen loading overlay
export function LoadingOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <Loading size="lg" />
    </div>
  )
}

// Page loading (for layout)
export function PageLoading({ className = "" }: { className?: string }) {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-white to-rose-50 flex items-center justify-center ${className}`}>
      <Loading size="lg" />
    </div>
  )
}