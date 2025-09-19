import { Schema, model, models } from "mongoose"

const BannerSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true },
  link: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default models.Banner || model("Banner", BannerSchema)
