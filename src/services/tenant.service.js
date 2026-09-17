import Tenant from "../models/tenants.model.js";

export const createTenants = async (data) => {
  const result = await Tenant.create({ ...data });
  return result;
};

// LIST TENANTS (orgFilter is {} for SUPER_ADMIN viewing all organizations, paginated + optional text search)
export const listTenants = async (orgFilter, { skip, limit, search }) => {
  const filter = { ...orgFilter };
  if (search) {
    filter.$text = { $search: search };
  }

  const [data, total] = await Promise.all([
    Tenant.find(filter)
      .populate("building.value")
      .populate("flat.value")
      .populate("room.value")
      .populate("bed.value")
      .populate("createdBy.id")
      .populate("verifiedBy")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Tenant.countDocuments(filter),
  ]);

  return { data, total };
};

