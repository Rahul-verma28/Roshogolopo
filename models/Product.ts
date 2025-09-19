import mongoose, { Schema, model, models } from "mongoose"

const WeightPriceSchema = new Schema(
  {
    weight: { type: String, required: true }, // "250g", "500g", "1kg", etc.
    price: { type: Number, required: true },
  },
  { _id: false },
)

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  images: [{ type: String, required: true }], // urls/paths to images
  weightPrices: [WeightPriceSchema], // pricing for multiple weights
  ingredients: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  inStock: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default models.Product || model("Product", ProductSchema)
