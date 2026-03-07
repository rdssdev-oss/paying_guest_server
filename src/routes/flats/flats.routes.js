import express from "express";
import { createFlats, deleteFlatById, getFlats } from "../../controllers/flats.controller.js";
import checkAuth from '../../middlewares/checkAuth.middleware.js';

const router = express.Router();

router.post("/flats",checkAuth,createFlats)
router.get("/flats", checkAuth, getFlats);
router.delete("/flats/:id", checkAuth, deleteFlatById);

export default router;
