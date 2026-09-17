import Organization from "../models/organization.model.js";
import Building from "../models/flats.model.js";
import Tenant from "../models/tenants.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

// LIST ORGANIZATIONS with billing summary + usage counts (platform-owner view)
export const listOrganizations = async ({ skip, limit, search }) => {
  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const [organizations, total] = await Promise.all([
    Organization.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Organization.countDocuments(filter),
  ]);

  const data = await Promise.all(
    organizations.map(async (org) => {
      const [flatsCount, tenantsCount, membersCount] = await Promise.all([
        Building.countDocuments({ organizationId: org._id }),
        Tenant.countDocuments({ organizationId: org._id }),
        User.countDocuments({ organizationId: org._id }),
      ]);
      return { ...org.toObject(), usage: { flatsCount, tenantsCount, membersCount } };
    })
  );

  return { data, total };
};

// GET A SINGLE ORGANIZATION (looked up by opaque publicId, not the raw Mongo _id)
export const getOrganizationByPublicId = async (publicId) => {
  const organization = await Organization.findOne({ publicId });
  if (!organization) throw new AppError("Organization not found", 404);

  const [flatsCount, tenantsCount, members] = await Promise.all([
    Building.countDocuments({ organizationId: organization._id }),
    Tenant.countDocuments({ organizationId: organization._id }),
    User.find({ organizationId: organization._id }).select("name email role isActive createdAt"),
  ]);

  return { organization, usage: { flatsCount, tenantsCount, membersCount: members.length }, members };
};

// UPDATE BILLING / PLAN DETAILS FOR AN ORGANIZATION
export const updateOrganizationBilling = async (publicId, updates) => {
  const allowed = ["plan", "subscriptionStatus", "trialEndsAt", "billing", "isActive"];
  const payload = {};
  for (const key of allowed) {
    if (updates[key] !== undefined) payload[key] = updates[key];
  }

  const organization = await Organization.findOneAndUpdate({ publicId }, { $set: payload }, { new: true, runValidators: true });
  if (!organization) throw new AppError("Organization not found", 404);
  return organization;
};
