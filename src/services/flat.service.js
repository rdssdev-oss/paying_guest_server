import Flat from "../models/flats.modal.js";


// CREATE NEW FLAT

export const createFlats = async (data) => {
  const flatData = await Flat.create({ ...data });
  return flatData;
};

// DELETE FLAT BY ID

export const deleteFlatById = async (id) => {
  console.log("Deleting flat with id:", id);
  const flatData = await Flat.findOneAndDelete({ _id: id });
  return flatData;
};

// GET FLAT BY ID

export const getFlatById = async (id) => {
  const flatData = await Flat.findById(id);
  return flatData;
};

