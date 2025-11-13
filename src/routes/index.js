import express from "express";
import authRoutes from "./auth/auth.routes.js";
import flatsRoutes from "./flats/flats.routes.js";
import tenantsRoutes from "./tenants/tenants.routes.js";
import {
  apiLimiter,
  loginLimiter,
} from "../middlewares/apiLimiter.middleware.js";

const router = express.Router();

// ROUTING FOR AUTH
router.use("/auth", loginLimiter, authRoutes);

// ROUTING FOR FLATS - v1
router.use("/", apiLimiter, flatsRoutes);

// ROUTING FOR TENANTS - v1
router.use("/", apiLimiter, tenantsRoutes);

export default router;
