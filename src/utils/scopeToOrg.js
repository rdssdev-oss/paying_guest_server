// Builds a Mongo filter fragment that scopes a query to the caller's organization.
// SUPER_ADMIN (the platform owner) is not bound to any single organization and can
// see/manage every organization's data, optionally narrowed to one via `organizationId`.
export const scopeToOrg = (user, organizationId) => {
  if (user.role === "SUPER_ADMIN") {
    return organizationId ? { organizationId } : {};
  }
  return { organizationId: user.organizationId };
};
