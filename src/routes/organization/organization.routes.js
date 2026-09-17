import express from "express";
import {
  getOrganizations,
  getOrganizationById,
  updateOrganizationBilling,
} from "../../controllers/organization.controller.js";
import checkAuth from "../../middlewares/checkAuth.middleware.js";
import checkRole from "../../middlewares/checkRole.middleware.js";
import { platformLimiter } from "../../middlewares/apiLimiter.middleware.js";

const router = express.Router();

// Platform-owner only: cross-organization visibility, billing & authorization management.
// Defense in depth: strict rate limit + JWT auth + SUPER_ADMIN role check + opaque publicId (never raw _id).
router.use(checkAuth, checkRole("SUPER_ADMIN"), platformLimiter);

router.get("/organizations", getOrganizations);
router.get("/organizations/:publicId", getOrganizationById);
router.patch("/organizations/:publicId/billing", updateOrganizationBilling);

export default router;
