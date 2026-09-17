import mongoose from "mongoose";
import crypto from "crypto";

const organizationSchema = new mongoose.Schema(
  {
    // Opaque, non-sequential identifier safe to expose in admin URLs instead of the raw _id
    publicId: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(16).toString("hex"),
    },
    name: { type: String, required: true, trim: true },
    plan: { type: String, enum: ["FREE", "PRO", "ENTERPRISE"], default: "FREE" },
    subscriptionStatus: {
      type: String,
      enum: ["TRIALING", "ACTIVE", "PAST_DUE", "CANCELED"],
      default: "TRIALING",
    },
    trialEndsAt: {
      type: Date,
      default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    // Billing details (populated by a future payment gateway integration)
    billing: {
      billingEmail: { type: String, trim: true, lowercase: true },
      mrr: { type: Number, default: 0 },
      currency: { type: String, default: "INR" },
      renewsAt: { type: Date },
      paymentProvider: { type: String },
      paymentCustomerId: { type: String },
      lastPaymentStatus: { type: String, enum: ["PAID", "FAILED", "PENDING", "N/A"], default: "N/A" },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

organizationSchema.index({ createdAt: -1 });

export default mongoose.model("Organization", organizationSchema);

