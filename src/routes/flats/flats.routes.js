import express from "express";
import { createFlats, getFlats } from "../../controllers/flats.controller.js";
import checkAuth from '../../middlewares/checkAuth.middleware.js';

const router = express.Router();

router.post("/flats",checkAuth,createFlats)
router.get("/flats", checkAuth, getFlats);

export default router;
