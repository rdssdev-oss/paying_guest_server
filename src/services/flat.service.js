import Flat from "../models/flats.modal.js";

export const createFlats = async (data) => {
  const flatData = await Flat.create({ ...data });
  return flatData;
};
