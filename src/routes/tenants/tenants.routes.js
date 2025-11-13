import express from "express";
import {
  getTenants,
  createTenants,
} from "../../controllers/tenant.controller.js";
import checkAuth from "../../middlewares/checkAuth.middleware.js";

const router = express.Router();

// v1
router.post("/tenants", checkAuth, createTenants);
router.get("/tenants", checkAuth, getTenants);

export default router;
