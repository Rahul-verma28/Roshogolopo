import { Schema, model, models } from "mongoose"

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true }, // e.g. "Classic Collection"
  slug: { type: String, required: true, unique: true }, // URL-friendly identifier
  description: { type: String },
  icon: { type: String }, // optional: icon/image URL
  image: { type: String }, // optional: banner or cover image
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

export default models.Category || model("Category", CategorySchema)
