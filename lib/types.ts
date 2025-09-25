export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  weightPrices: { weight: string; price: number }[];
  ingredients: string[];
  isFeatured: boolean;
  isActive: boolean;
  inStock: boolean;
  ratings: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: Address[];
  role: string;
  orderHistory: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  name?: string;
  phone?: string;
  pincode?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  landmark?: string;
  default: boolean;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  paymentInfo?: object;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  discount: number;
  totalPrice: number;
  orderStatus:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Refunded";
  deliveredAt?: Date;
  refundStatus?: string;
  coupon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  product: string;
  name?: string;
  weight?: string;
  price?: number;
  qty?: number;
  image?: string;
}

export interface Review {
  _id: string;
  product: string;
  user: string;
  rating: number;
  comment?: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  _id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  expiry?: Date;
  minOrder?: number;
  maxUses?: number;
  timesUsed: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
