import Tenant from "../models/tenants.model.js";
import * as tenantsServices from "../services/tenant.service.js";
import { getPagination, buildMeta } from "../utils/pagination.js";
import { recordAudit } from "../utils/auditLogger.js";
import { scopeToOrg } from "../utils/scopeToOrg.js";

// CREATE TENANTS
export const createTenants = async (req, res, next) => {
  try {
    const { id, name, organizationId, role } = req.user;
    // SUPER_ADMIN may create on behalf of any organization by passing organizationId in the body
    const targetOrgId = role === "SUPER_ADMIN" && req.body.organizationId ? req.body.organizationId : organizationId;

    // Parse nested JSON fields from FormData safely
    const tenantData = {
      ...req.body,
      organizationId: targetOrgId,
      occupation: req.body.occupation
        ? JSON.parse(req.body.occupation)
        : undefined,
      referrer: req.body.referrer ? JSON.parse(req.body.referrer) : undefined,
      building: req.body.building ? JSON.parse(req.body.building) : undefined,
      flat: req.body.flat ? JSON.parse(req.body.flat) : undefined,
      room: req.body.room ? JSON.parse(req.body.room) : undefined,
      bed: req.body.bed ? JSON.parse(req.body.bed) : undefined,
      createdBy: { id, name },
      document: req.file?.filename || null, // handle multer file upload
    };

    // ✅ Check if the bed is already assigned to an active tenant (within the same organization)
    if (tenantData.bed?.value) {
      const existingTenant = await Tenant.findOne({
        organizationId: targetOrgId,
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

    recordAudit({
      organizationId: targetOrgId,
      userId: id,
      action: "TENANT_CREATE",
      entity: "Tenant",
      entityId: data._id,
      ip: req.ip,
    });

    res.status(201).json({ success: true, tenant: data });
  } catch (error) {
    next(error);
  }
};

// GET ALL TENANTS (scoped to the caller's organization; SUPER_ADMIN sees every organization)
export const getTenants = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { search, organizationId } = req.query;

    const orgFilter = scopeToOrg(req.user, organizationId);
    const { data, total } = await tenantsServices.listTenants(orgFilter, { skip, limit, search });

    res.status(200).json({ success: true, tenants: data, meta: buildMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
};
