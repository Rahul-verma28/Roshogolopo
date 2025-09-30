import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely format a number to fixed decimal places
 * Returns '0.00' if the value is null, undefined, or NaN
 */
export function formatPrice(value: number | null | undefined, decimals: number = 2): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00'
  }
  return value.toFixed(decimals)
}

/**
 * Safely format a rating value
 * Returns '0.0' if the value is null, undefined, or NaN
 */
export function formatRating(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.0'
  }
  return value.toFixed(1)
}
