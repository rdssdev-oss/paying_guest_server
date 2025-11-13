import Tenant from "../models/tenants.modal.js";

export const createTenants = async (data) => {
  const result = await Tenant.create({ ...data });
  return result;
};
