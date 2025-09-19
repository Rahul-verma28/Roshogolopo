import mongoose, { Schema, model, models } from "mongoose"

const ReviewSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
})

export default models.Review || model("Review", ReviewSchema)
