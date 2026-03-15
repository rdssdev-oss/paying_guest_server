import mongoose from "mongoose";

// Bedroom bed schema
const bedSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  bedCategory: {
    type: String,
    enum: ["single", "double"],
    required: true,
    validate: {
      validator: function (v) {
        return v && v.trim().length > 0;
      },
      message: "Bed type cannot be empty",
    },
  },
  occupant: {
    label:{
    type: String,
    required: function() {
      return !!this.value; // label is required if value is provided
  }},
    value:{type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null},
  },
});

// Bedroom schema
const BedroomDetailSchema = new mongoose.Schema(
  {
    roomType: {
      type: String,
      enum: ["master", "common", "guest", "kids"],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Room type cannot be empty",
      },
    },
    area: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Area cannot be empty",
      },
    },
    attachedBathroom: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    beds: [bedSchema],
    tenantDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Hall bed schema
const HallBedSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    bedCategory: { type: String, enum: ["single", "double"], required: true },
  },
  { _id: false },
);

// Owner schema
const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v && v.trim().length > 0;
      },
      message: "Name cannot be empty",
    },
  },
  mobile: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v);
      },
      message: "Invalid mobile number format",
    },
  },
  aadhaar: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{12}$/.test(v);
      },
      message: "Invalid Aadhaar number format",
    },
  },
  address: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v && v.trim().length > 0;
      },
      message: "Address cannot be empty",
    },
  },
});

// Technician schema
const TechnicianSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    category: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Category cannot be empty",
      },
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Name cannot be empty",
      },
    },
    mobile: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v);
        },
        message: "Invalid mobile number format",
      },
    },
    aadhaar: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{12}$/.test(v);
        },
        message: "Invalid Aadhaar number format",
      },
    },
    address: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Address cannot be empty",
      },
    },
  },
  { _id: false },
);

// CreatedBy schema
const CreatedBySchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Name cannot be empty",
      },
    },
  },
  { _id: false },
);

// Single Flat Schema inside a Building
const SingleFlatSchema = new mongoose.Schema({
  flat_type: {
    type: String,
    enum: ["1rk", "1bhk", "2bhk", "3bhk", "4bhk", "5bhk"],
    required: true,
  },
  flat_number: { type: String, required: true },
  flat_wing: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v && v.trim().length > 0;
      },
      message: "Flat wing cannot be empty",
    },
  },
  flat_area: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v && v.trim().length > 0;
      },
      message: "Flat area cannot be empty",
    },
  },
  // balcony: { type: Boolean, required: true },
  flat_description: { type: String },
  bedroom_details: { type: [BedroomDetailSchema], required: true },
  hall_beds_available: { type: Boolean, required: true },
  hall_beds_count: { type: Number },
  hall_beds: { type: [HallBedSchema] },
  owner_details: { type: OwnerSchema, required: true },
});

// Main Building Schema
const BuildingSchema = new mongoose.Schema(
  {
    building_name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Building name cannot be empty",
      },
    },
    building_address: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "Building address cannot be empty",
      },
    },
    city: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "City cannot be empty",
      },
    },
    state: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.trim().length > 0;
        },
        message: "State cannot be empty",
      },
    },
    flats: { type: [SingleFlatSchema], required: true },
    available_beds: { type: Number, required: true, min: 0 },

    technicians: { type: [TechnicianSchema] },
    createdBy: { type: CreatedBySchema, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Building", BuildingSchema);
