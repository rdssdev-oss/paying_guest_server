import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    action: { type: String, required: true }, // e.g. AUTH_LOGIN, FLAT_CREATE, TENANT_DELETE
    entity: { type: String },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    ip: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

auditLogSchema.index({ organizationId: 1, createdAt: -1 });

export default mongoose.model("AuditLog", auditLogSchema);
