import type { Types } from "mongoose"

export interface IProduct {
  _id: Types.ObjectId
  name: string
  slug: string
  description: string
  category: Types.ObjectId
  images: string[]
  weightPrices: { weight: string; price: number }[]
  ingredients: string[]
  isFeatured: boolean
  isActive: boolean
  inStock: boolean
  ratings: number
  numReviews: number
  createdAt: Date
}

export interface ICategory {
  _id: Types.ObjectId
  name: string
  slug: string
  description?: string
  icon?: string
  image?: string
  isActive: boolean
  createdAt: Date
}

export interface IUser {
  _id: Types.ObjectId
  name?: string
  email: string
  phone?: string
  password?: string
  googleId?: string
  addresses: IAddress[]
  role: string
  orderHistory: Types.ObjectId[]
  rewards: number
  createdAt: Date
}

export interface IAddress {
  name?: string
  phone?: string
  pincode?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  landmark?: string
  default: boolean
}

export interface IOrder {
  _id: Types.ObjectId
  user: Types.ObjectId
  orderItems: IOrderItem[]
  shippingAddress: object
  paymentMethod: string
  paymentInfo?: object
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  discount: number
  totalPrice: number
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded"
  deliveredAt?: Date
  refundStatus?: string
  coupon?: Types.ObjectId
  createdAt: Date
}

export interface IOrderItem {
  product: Types.ObjectId
  name?: string
  weight?: string
  price?: number
  qty?: number
  image?: string
}

export interface IReview {
  _id: Types.ObjectId
  product: Types.ObjectId
  user: Types.ObjectId
  rating: number
  comment?: string
  images: string[]
  createdAt: Date
}

export interface ICoupon {
  _id: Types.ObjectId
  code: string
  type: "percent" | "fixed"
  value: number
  expiry?: Date
  minOrder?: number
  maxUses?: number
  timesUsed: number
  isActive: boolean
  createdAt: Date
}

export interface IBanner {
  _id: Types.ObjectId
  title: string
  subtitle?: string
  image: string
  link?: string
  isActive: boolean
  order: number
  createdAt: Date
}
