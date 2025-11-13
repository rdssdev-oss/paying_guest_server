import Flats from "../models/flats.modal.js";
import * as flatService from '../services/flat.service.js';


// GET ALL FLATS

export const getFlats = async (req, res, next) => {
  try {
    const data = await Flats.find();
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    // next(error);
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
