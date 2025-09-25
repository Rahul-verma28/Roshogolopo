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
    phone: { type: String, required: false, unique: true, sparse: true },
    password: { type: String, required: true },
    addresses: [AddressSchema],
    role: { type: String, default: "customer" }, // customer, admin, etc.
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || model("User", UserSchema);
