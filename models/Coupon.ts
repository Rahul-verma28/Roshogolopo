import { Schema, model, models } from "mongoose"

const CouponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["percent", "fixed"], required: true },
  value: { type: Number, required: true },
  expiry: Date,
  minOrder: Number,
  maxUses: Number,
  timesUsed: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

export default models.Coupon || model("Coupon", CouponSchema)
