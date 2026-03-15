import Tenant from "../models/tenants.modal.js";
import * as tenantsServices from "../services/tenant.service.js";

// CREATE TENANTS
export const createTenants = async (req, res, next) => {
  try {
    // Parse nested JSON fields from FormData safely
    const tenantData = {
      ...req.body,
      occupation: req.body.occupation
        ? JSON.parse(req.body.occupation)
        : undefined,
      referrer: req.body.referrer ? JSON.parse(req.body.referrer) : undefined,
      building: req.body.building ? JSON.parse(req.body.building) : undefined,
      flat: req.body.flat ? JSON.parse(req.body.flat) : undefined,
      room: req.body.room ? JSON.parse(req.body.room) : undefined,
      bed: req.body.bed ? JSON.parse(req.body.bed) : undefined,
      createdBy: req.body.createdBy
        ? JSON.parse(req.body.createdBy)
        : undefined,
      document: req.file?.filename || null, // handle multer file upload
    };

    // ✅ Check if the bed is already assigned to an active tenant
    if (tenantData.bed?.value) {
      const existingTenant = await Tenant.findOne({
        "bed.value": tenantData.bed.value,
        isActive: true, // only consider active tenants
      });

      if (existingTenant) {
        return res.status(400).json({
          success: false,
          message: `Bed "${tenantData.bed.label}" is already assigned to tenant "${existingTenant.name}"`,
        });
      }
    }

    // Save tenant via service
    const data = await tenantsServices.createTenants(tenantData);

    res.status(201).json({ success: true, tenant: data });
  } catch (error) {
    console.error("Error creating tenant:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

// GET ALL TENANTS
export const getTenants = async (req, res, next) => {
  try {
    const data = await Tenant.find()
      .populate("building.value") // populate Building reference
      .populate("flat.value") // populate Flat reference
      .populate("room.value") // populate Room reference
      .populate("bed.value") // populate Bed reference
      .populate("createdBy.id") // populate creator User
      .populate("verifiedBy"); // populate verifier User

    res.status(200).json({ success: true, tenants: data });
  } catch (error) {
    console.error("Error fetching tenants:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};
