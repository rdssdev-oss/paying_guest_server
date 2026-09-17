import * as organizationService from "../services/organization.service.js";
import { getPagination, buildMeta } from "../utils/pagination.js";
import { recordAudit } from "../utils/auditLogger.js";

// GET /platform/organizations
export const getOrganizations = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { search } = req.query;

    const { data, total } = await organizationService.listOrganizations({ skip, limit, search });

    recordAudit({
      userId: req.user.id,
      action: "PLATFORM_ORGANIZATIONS_LIST",
      entity: "Organization",
      ip: req.ip,
    });

    res.status(200).json({ success: true, organizations: data, meta: buildMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
};

// GET /platform/organizations/:publicId
export const getOrganizationById = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    const data = await organizationService.getOrganizationByPublicId(publicId);

    recordAudit({
      organizationId: data.organization._id,
      userId: req.user.id,
      action: "PLATFORM_ORGANIZATION_VIEW",
      entity: "Organization",
      entityId: data.organization._id,
      ip: req.ip,
    });

    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

// PATCH /platform/organizations/:publicId/billing
export const updateOrganizationBilling = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    const organization = await organizationService.updateOrganizationBilling(publicId, req.body);

    recordAudit({
      organizationId: organization._id,
      userId: req.user.id,
      action: "PLATFORM_ORGANIZATION_BILLING_UPDATE",
      entity: "Organization",
      entityId: organization._id,
      ip: req.ip,
      metadata: req.body,
    });

    res.status(200).json({ success: true, organization });
  } catch (error) {
    next(error);
  }
};
