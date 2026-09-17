import Flat from "../models/flats.model.js";
import AppError from "../utils/AppError.js";

// CREATE NEW FLAT

export const createFlats = async (data) => {
  const flatData = await Flat.create({ ...data });
  return flatData;
};

// LIST FLATS (orgFilter is {} for SUPER_ADMIN viewing all organizations, paginated + optional text search)

export const listFlats = async (orgFilter, { skip, limit, search }) => {
  const filter = { ...orgFilter };
  if (search) {
    filter.$text = { $search: search };
  }

  const [data, total] = await Promise.all([
    Flat.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Flat.countDocuments(filter),
  ]);

  return { data, total };
};

// DELETE FLAT BY ID (scoped via orgFilter)

export const deleteFlatById = async (id, orgFilter) => {
  const flatData = await Flat.findOneAndDelete({ _id: id, ...orgFilter });
  if (!flatData) throw new AppError("Flat not found", 404);
  return flatData;
};

// GET FLAT BY ID (scoped via orgFilter)

export const getFlatById = async (id, orgFilter) => {
  const flatData = await Flat.findOne({ _id: id, ...orgFilter });
  if (!flatData) throw new AppError("Flat not found", 404);
  return flatData;
};

// UPDATE FLAT BY ID (scoped via orgFilter)

export const updateFlatById = async (id, data, orgFilter) => {
  const flatData = await Flat.findOneAndUpdate(
    { _id: id, ...orgFilter },
    { $set: { ...data } },
    { new: true, runValidators: true }
  );
  if (!flatData) throw new AppError("Flat not found", 404);
  return flatData;
};

