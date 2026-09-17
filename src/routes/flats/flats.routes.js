import express from "express";
import { createFlats, deleteFlatById, getFlatById, getFlats, updateFlatById } from "../../controllers/flats.controller.js";
import checkAuth from '../../middlewares/checkAuth.middleware.js';
import checkRole from '../../middlewares/checkRole.middleware.js';

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(checkAuth);

router
  .route("/flats")
  .get(getFlats)
  .post(createFlats);

router
  .route("/flats/:id")
  .get(getFlatById)
  .put(updateFlatById)
  .delete(checkRole("ADMIN", "SUPER_ADMIN"), deleteFlatById);

export default router;