import mongoose, { Schema, model } from "mongoose";

const AddressSchema = new Schema(
  {
    name: String,
    phone: String,
    pincode: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    landmark: String,
    default: { type: Boolean, default: false },
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    password: { type: String },
    googleId: { type: String },
    addresses: [AddressSchema],
    role: { type: String, default: "customer" }, // customer, admin, etc.
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    rewards: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || model("User", UserSchema);
