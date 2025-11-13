import mongoose from "mongoose";

const Address = mongoose.Schema(
  {
    street: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{6}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Pin-code!`,
      },
    },
    country: { type: String, required: true },
  },
  { _id: false }
);

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    aadhaar: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{12}$/, "Aadhaar must be a 12-digit number"],
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit mobile number!`,
      },
    },
    address: Address,
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: Map,
      of: String,
    },
    validateBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Tenant', tenantSchema);
