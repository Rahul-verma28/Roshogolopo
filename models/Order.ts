import mongoose, { Schema, model } from "mongoose"

const OrderItemSchema = new Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    weight: String,
    price: Number,
    qty: Number,
    image: String,
  },
  { _id: false },
)

const OrderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [OrderItemSchema],
  shippingAddress: { type: Object, required: true },
  paymentMethod: { type: String, required: true }, // UPI, card, COD, etc.
  paymentInfo: Object, // status, transaction id, etc.
  itemsPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"],
    default: "Pending",
  },
  deliveredAt: Date,
  refundStatus: String,
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  createdAt: { type: Date, default: Date.now },
})
export default model("Order", OrderSchema)
