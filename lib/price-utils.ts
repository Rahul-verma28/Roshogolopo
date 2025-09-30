/**
 * Price and number formatting utilities to prevent runtime errors
 */

/**
 * Safely format a price value with null/undefined checks
 */
export function formatPrice(price: number | null | undefined, decimals: number = 2): string {
  if (price === null || price === undefined || isNaN(price)) {
    return '0.00'
  }
  return price.toFixed(decimals)
}

/**
 * Safely format a rating value
 */
export function formatRating(rating: number | null | undefined): string {
  if (rating === null || rating === undefined || isNaN(rating)) {
    return '0.0'
  }
  return rating.toFixed(1)
}

/**
 * Safely calculate item total (price * quantity)
 */
export function calculateItemTotal(price: number | null | undefined, quantity: number): number {
  if (price === null || price === undefined || isNaN(price)) {
    return 0
  }
  return price * quantity
}

/**
 * Safely format currency with rupee symbol
 */
export function formatCurrency(amount: number | null | undefined, decimals: number = 2): string {
  return `₹${formatPrice(amount, decimals)}`
}

/**
 * Check if a price is valid
 */
export function isValidPrice(price: number | null | undefined): boolean {
  return price !== null && price !== undefined && !isNaN(price) && price >= 0
}