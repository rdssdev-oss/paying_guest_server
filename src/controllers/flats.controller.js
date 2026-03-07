import Flats from "../models/flats.modal.js";
import * as flatService from "../services/flat.service.js";

// GET ALL FLATS

export const getFlats = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log("User ID from auth middleware:", id);
    const data = await Flats.find({ "createdBy.id": id });
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};

// CREATE NEW FLAT

export const createFlats = async (req, res, next) => {
  try {
    const data = await flatService.createFlats(req.body);
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};

// DELETE FLAT BY ID

export const deleteFlatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flatService.deleteFlatById(id);
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};

// UPDATE FLAT BY ID

export const updateFlatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flatService.updateFlatById(id, req.body);
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};

// GET FLAT BY ID

export const getFlatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flatService.getFlatById(id);
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};
