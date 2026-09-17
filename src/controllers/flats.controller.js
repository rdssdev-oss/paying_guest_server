import * as flatService from "../services/flat.service.js";
import { getPagination, buildMeta } from "../utils/pagination.js";
import { scopeToOrg } from "../utils/scopeToOrg.js";

// GET ALL FLATS (scoped to the caller's organization; SUPER_ADMIN sees every organization)

export const getFlats = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { search, organizationId } = req.query;

    const orgFilter = scopeToOrg(req.user, organizationId);
    const { data, total } = await flatService.listFlats(orgFilter, { skip, limit, search });
    res.status(200).json({ success: true, flats: data, meta: buildMeta(total, page, limit) });
  } catch (error) {
    next(error);
  }
};

// CREATE NEW FLAT

export const createFlats = async (req, res, next) => {
  try {
    const { id, name, organizationId, role } = req.user;
    // SUPER_ADMIN may create on behalf of any organization by passing organizationId in the body
    const targetOrgId = role === "SUPER_ADMIN" && req.body.organizationId ? req.body.organizationId : organizationId;
    const payload = { ...req.body, organizationId: targetOrgId, createdBy: { id, name } };
    const data = await flatService.createFlats(payload);
    res.status(201).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};

// DELETE FLAT BY ID

export const deleteFlatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flatService.deleteFlatById(id, scopeToOrg(req.user));
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};

// UPDATE FLAT BY ID

export const updateFlatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flatService.updateFlatById(id, req.body, scopeToOrg(req.user));
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};

// GET FLAT BY ID

export const getFlatById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await flatService.getFlatById(id, scopeToOrg(req.user));
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};
