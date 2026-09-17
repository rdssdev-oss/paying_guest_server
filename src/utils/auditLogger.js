import AuditLog from "../models/auditLog.model.js";
import logger from "./logger.js";

// Fire-and-forget audit trail write; must never break the calling request.
export const recordAudit = async ({ organizationId, userId, action, entity, entityId, ip, metadata }) => {
  try {
    await AuditLog.create({ organizationId, userId, action, entity, entityId, ip, metadata });
  } catch (error) {
    logger.error(`Audit log write failed for action "${action}": ${error.message}`);
  }
};
