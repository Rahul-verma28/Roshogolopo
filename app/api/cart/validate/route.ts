import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { items } = await request.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid cart items" }, { status: 400 })
    }

    const validationResults = []
    let totalAmount = 0

    for (const item of items) {
      const { productId, weightOption, quantity } = item

      // Find product
      const product = await Product.findById(productId)
      if (!product || !product.isActive) {
        validationResults.push({
          productId,
          isValid: false,
          error: "Product not found or inactive",
        })
        continue
      }

      // Find weight option
      const pricing = product.pricing.find((p: any) => p.weight === weightOption)
      if (!pricing) {
        validationResults.push({
          productId,
          isValid: false,
          error: "Weight option not found",
        })
        continue
      }

      // Check stock availability
      if (!product.inventory.inStock || product.inventory.quantity < quantity) {
        validationResults.push({
          productId,
          isValid: false,
          error: "Insufficient stock",
          availableQuantity: product.inventory.quantity,
        })
        continue
      }

      // Calculate item total
      const itemTotal = pricing.price * quantity

      validationResults.push({
        productId,
        isValid: true,
        currentPrice: pricing.price,
        itemTotal,
        availableQuantity: product.inventory.quantity,
      })

      totalAmount += itemTotal
    }

    const isCartValid = validationResults.every((result) => result.isValid)

    return NextResponse.json({
      isValid: isCartValid,
      items: validationResults,
      totalAmount,
    })
  } catch (error) {
    console.error("Cart validation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}



// import { type NextRequest, NextResponse } from "next/server"
// import connectDB from "@/lib/mongodb"
// import Product from "@/models/Product"
// import Coupon from "@/models/Coupon"

// // Coupon validation function
// async function validateCoupon(couponCode: string, cartTotal: number) {
//   try {
//     // Find the coupon
//     const coupon = await Coupon.findOne({ code: couponCode })
    
//     if (!coupon) {
//       return {
//         isValid: false,
//         error: "Coupon code not found",
//         coupon: null,
//         discount: 0,
//         finalTotal: cartTotal
//       }
//     }

//     // Check if coupon is active
//     if (!coupon.isActive) {
//       return {
//         isValid: false,
//         error: "This coupon is currently inactive",
//         coupon: null,
//         discount: 0,
//         finalTotal: cartTotal
//       }
//     }

//     // Check if coupon has expired
//     if (coupon.expiry && new Date(coupon.expiry) <= new Date()) {
//       return {
//         isValid: false,
//         error: "This coupon has expired",
//         coupon: null,
//         discount: 0,
//         finalTotal: cartTotal
//       }
//     }

//     // Check minimum order requirement
//     if (coupon.minOrder && cartTotal < coupon.minOrder) {
//       return {
//         isValid: false,
//         error: `Minimum order amount of ₹${coupon.minOrder} required for this coupon`,
//         coupon: null,
//         discount: 0,
//         finalTotal: cartTotal
//       }
//     }

//     // Check maximum usage limit
//     if (coupon.maxUses && coupon.timesUsed >= coupon.maxUses) {
//       return {
//         isValid: false,
//         error: "This coupon has reached its maximum usage limit",
//         coupon: null,
//         discount: 0,
//         finalTotal: cartTotal
//       }
//     }

//     // Calculate discount
//     let discount = 0
//     if (coupon.type === 'percent') {
//       discount = (cartTotal * coupon.value) / 100
//     } else if (coupon.type === 'fixed') {
//       discount = coupon.value
//     }

//     // Ensure discount doesn't exceed cart total
//     discount = Math.min(discount, cartTotal)

//     return {
//       isValid: true,
//       error: null,
//       coupon: {
//         code: coupon.code,
//         type: coupon.type,
//         value: coupon.value,
//         discount,
//         description: coupon.description || `${coupon.type === 'percent' ? coupon.value + '%' : '₹' + coupon.value} off`,
//         expiry: coupon.expiry,
//         minOrder: coupon.minOrder,
//         maxUses: coupon.maxUses,
//         timesUsed: coupon.timesUsed,
//         remainingUses: coupon.maxUses ? coupon.maxUses - coupon.timesUsed : null
//       },
//       discount,
//       finalTotal: cartTotal - discount
//     }

//   } catch (error) {
//     console.error("Coupon validation error:", error)
//     return {
//       isValid: false,
//       error: "Error validating coupon",
//       coupon: null,
//       discount: 0,
//       finalTotal: cartTotal
//     }
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     await connectDB()

//     const { items, couponCode } = await request.json()

//     if (!items || !Array.isArray(items)) {
//       return NextResponse.json({ error: "Invalid cart items" }, { status: 400 })
//     }

//     const validationResults = []
//     let totalAmount = 0

//     for (const item of items) {
//       const { productId, weightOption, quantity } = item

//       // Validate item structure
//       if (!productId || !weightOption || !quantity) {
//         validationResults.push({
//           productId: productId || 'unknown',
//           isValid: false,
//           error: "Missing required item fields (productId, weightOption, quantity)",
//         })
//         continue
//       }

//       // Validate quantity
//       if (typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: "Quantity must be a positive integer",
//         })
//         continue
//       }

//       // Validate reasonable quantity limits
//       if (quantity > 100) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: "Quantity cannot exceed 100 items per product",
//         })
//         continue
//       }

//       // Find product
//       let product
//       try {
//         product = await Product.findById(productId)
//       } catch (dbError) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: "Invalid product ID format",
//         })
//         continue
//       }

//       if (!product || !product.isActive) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: "Product not found or inactive",
//         })
//         continue
//       }

//       // Find weight option
//       if (!product.pricing || !Array.isArray(product.pricing)) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: "Product pricing information not available",
//         })
//         continue
//       }

//       const pricing = product.pricing.find((p: any) => p.weight === weightOption)
//       if (!pricing) {
//         const availableWeights = product.pricing.map((p: any) => p.weight).join(', ')
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: `Weight option '${weightOption}' not found. Available: ${availableWeights}`,
//         })
//         continue
//       }

//       // Validate pricing data
//       if (!pricing.price || typeof pricing.price !== 'number' || pricing.price <= 0) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: "Invalid product pricing",
//         })
//         continue
//       }

//       // Check inventory structure
//       if (!product.inventory) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: "Product inventory information not available",
//         })
//         continue
//       }

//       // Check stock availability
//       const availableQuantity = product.inventory.quantity || 0
//       if (!product.inventory.inStock || availableQuantity < quantity) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: availableQuantity === 0 ? "Product is out of stock" : `Only ${availableQuantity} items available`,
//           availableQuantity,
//         })
//         continue
//       }

//       // Calculate item total
//       const itemTotal = pricing.price * quantity

//       // Validate calculated total
//       if (itemTotal <= 0 || !isFinite(itemTotal)) {
//         validationResults.push({
//           productId,
//           isValid: false,
//           error: "Invalid item total calculation",
//         })
//         continue
//       }

//       validationResults.push({
//         productId,
//         isValid: true,
//         currentPrice: pricing.price,
//         itemTotal,
//         availableQuantity: product.inventory.quantity,
//         weightOption,
//         quantity,
//         productName: product.name || 'Unknown Product'
//       })

//       totalAmount += itemTotal
//     }

//     // Validate total amount
//     if (totalAmount <= 0 || !isFinite(totalAmount)) {
//       return NextResponse.json({ 
//         error: "Invalid cart total calculation" 
//       }, { status: 400 })
//     }

//     // Check if cart is empty
//     if (validationResults.length === 0) {
//       return NextResponse.json({ 
//         error: "Cart is empty" 
//       }, { status: 400 })
//     }

//     const isCartValid = validationResults.every((result) => result.isValid)
//     const validItems = validationResults.filter((result) => result.isValid)
//     const invalidItems = validationResults.filter((result) => !result.isValid)

//     // Coupon validation if couponCode is provided (only if cart has valid items)
//     let couponValidation = null
//     if (couponCode && typeof couponCode === 'string' && isCartValid) {
//       const trimmedCode = couponCode.trim()
      
//       // Basic coupon code format validation
//       if (trimmedCode.length < 3 || trimmedCode.length > 20) {
//         couponValidation = {
//           isValid: false,
//           error: "Invalid coupon code format (must be 3-20 characters)",
//           coupon: null,
//           discount: 0,
//           finalTotal: totalAmount
//         }
//       } else {
//         couponValidation = await validateCoupon(trimmedCode.toUpperCase(), totalAmount)
//       }
//     } else if (couponCode && !isCartValid) {
//       couponValidation = {
//         isValid: false,
//         error: "Cannot apply coupon to cart with invalid items",
//         coupon: null,
//         discount: 0,
//         finalTotal: totalAmount
//       }
//     }

//     return NextResponse.json({
//       isValid: isCartValid,
//       items: validationResults,
//       validItems,
//       invalidItems,
//       totalAmount,
//       couponValidation,
//       summary: {
//         totalItems: validationResults.length,
//         validItemsCount: validItems.length,
//         invalidItemsCount: invalidItems.length,
//         subtotal: totalAmount,
//         finalTotal: couponValidation?.finalTotal || totalAmount,
//         discount: couponValidation?.discount || 0
//       }
//     })
//   } catch (error) {
//     console.error("Cart validation error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

