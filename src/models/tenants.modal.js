import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

// Subschema for PG Assignment
const pgAssignmentSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: ObjectId, required: true, refPath: "refModel" },
  refModel: { type: String, required: true }, // dynamically set ref: Building, Flat, Room, Bed
}, { _id: false });

// Subschema for Occupation
const occupationSchema = new mongoose.Schema({
  company: { type: String, trim: true, required: true },
  companyAddress: { type: String, trim: true, required: true },
  jobTitle: { type: String, trim: true, required: true },
  workMobile: {
    type: String,
    trim: true,
    validate: {
      validator: (v) => !v || /^\d{10}$/.test(v),
      message: (props) => `${props.value} is not a valid 10-digit work mobile number!`,
    },
  },
}, { _id: false });

// Subschema for Referrer
const referrerSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  mobile: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: (v) => /^\d{10}$/.test(v),
      message: (props) => `${props.value} is not a valid 10-digit mobile number!`,
    },
  },
  relationship: {
    type: String,
    enum: [
      "father",
      "mother",
      "brother",
      "sister",
      "brother_in_law",
      "sister_in_law",
      "friend",
      "other",
    ],
    required: true,
  },
}, { _id: false });

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => /^\d{10}$/.test(v),
        message: (props) => `${props.value} is not a valid 10-digit mobile number!`,
      },
    },
    email: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Invalid email address"] },
    address: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    aadhaar: { type: String, required: true, unique: true, trim: true, match: [/^\d{12}$/, "Aadhaar must be a 12-digit number"] },
    gender: { type: String, enum: ["male", "female", "other"] },
    age: { type: Number, min: 1, max: 120 },
    familyMobile: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => /^\d{10}$/.test(v),
        message: (props) => `${props.value} is not a valid 10-digit mobile number!`,
      },
    },

    // Nested objects
    occupation: { type: occupationSchema, required: true },
    referrer: { type: referrerSchema, required: true },

    building: { type: pgAssignmentSchema, required: true, default: {} },
    flat: { type: pgAssignmentSchema, required: true, default: {} },
    room: { type: pgAssignmentSchema, required: true, default: {} },
    bed: { type: pgAssignmentSchema, required: true, default: {} },

    joinedDate: { type: Date, required: true },
    expectedLeaveDate: { type: Date },
    document: { type: String },

    createdBy: {
      id: { type: ObjectId, ref: "User" },
      name: { type: String },
    },

    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: ObjectId, ref: "User" },
    verifiedAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", tenantSchema);