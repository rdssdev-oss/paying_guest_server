import mongoose from "mongoose";

const TechnicianSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true }
}, { _id: false }); // _id: false to avoid creating separate IDs for subdocs

const MaidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  services: [{ type: String, required: true }],
  contact: { type: String, required: true }
}, { _id: false });

const BedsSchema = new mongoose.Schema({
  bedrooms: { type: Number, required: true },
  beds_in_room1: { type: Number, required: true },
  beds_in_room2: { type: Number, required: true },
  hall: { type: Number, required: true },
  beds_in_hall: { type: Number, required: true },
}, { _id: false });

const FlatSchema = new mongoose.Schema({
  flat_name: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  area_sqft: { type: Number, required: false },
  flat_type: { type: String, required: true },
  beds: { type: BedsSchema, required: true },
  kitchen: { type: Boolean, required: true },
  technicians: { type: [TechnicianSchema], default: [], required:true },
  maid: { type: MaidSchema, required: true }
}, { timestamps: true });

export default mongoose.model('Flat', FlatSchema);
