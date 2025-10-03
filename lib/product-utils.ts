import type { Product } from "@/lib/types";

/**
 * Validates and normalizes product data to prevent runtime errors
 */
export function validateProduct(product: Product): Product {
  return {
    ...product,
    _id: product._id || '',
    name: product.name || 'Unnamed Product',
    slug: product.slug || product.name?.toLowerCase().replace(/\s+/g, '-') || 'unnamed-product',
    description: product.description || 'No description available',
    category: product.category || 'uncategorized',
    images: Array.isArray(product.images) && product.images.length > 0 
      ? product.images 
      : ['/placeholder.svg'],
    weightPrices: Array.isArray(product.weightPrices) && product.weightPrices.length > 0
      ? product.weightPrices.map(wp => ({
          weight: wp.weight || '500g',
          price: typeof wp.price === 'number' && wp.price > 0 ? wp.price : 0
        }))
      : [{ weight: '500g', price: 0 }],
    ingredients: Array.isArray(product.ingredients) ? product.ingredients : [],
    isFeatured: Boolean(product.isFeatured),
    isActive: Boolean(product.isActive),
    inStock: Boolean(product.inStock),
    ratings: typeof product.ratings === 'number' ? Math.max(0, Math.min(5, product.ratings)) : 0,
    numReviews: typeof product.numReviews === 'number' ? Math.max(0, product.numReviews) : 0,
    createdAt: product.createdAt || new Date(),
    updatedAt: product.updatedAt || new Date(),
  };
}

/**
 * Check if product has valid data for display
 */
export function isValidProduct(product: Product): boolean {
  return Boolean(
    product?._id &&
    product?.name &&
    product?.weightPrices?.length > 0 &&
    product.weightPrices.some(wp => wp.price > 0)
  );
}

/**
 * Get the primary display image for a product
 */
export function getProductImage(product: Product): string {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }
  return '/placeholder.svg';
}

/**
 * Get price range for a product
 */
export function getProductPriceRange(product: Product): { min: number; max: number } {
  if (!Array.isArray(product.weightPrices) || product.weightPrices.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = product.weightPrices.map(wp => wp.price).filter(price => price > 0);
  
  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

/**
 * Format product title for SEO
 */
export function getProductSEOTitle(product: Product): string {
  const baseTitle = product.name || 'Product';
  const category = product.category ? ` - ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}` : '';
  return `${baseTitle}${category} | Roshogolpo - Authentic Bengali Sweets`;
}

/**
 * Generate product description for SEO
 */
export function getProductSEODescription(product: Product): string {
  const baseDesc = product.description || 'Authentic Bengali sweet from Roshogolpo';
  const ingredients = product.ingredients && product.ingredients.length > 0 
    ? ` Made with ${product.ingredients.slice(0, 3).join(', ')}`
    : '';
  const priceRange = getProductPriceRange(product);
  const price = priceRange.min > 0 ? ` Starting from ₹${priceRange.min}` : '';
  
  return `${baseDesc}${ingredients}${price}. Order online for fresh delivery in Greater Noida.`;
}