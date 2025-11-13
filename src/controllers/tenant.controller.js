import Tenant from "../models/tenants.modal.js";
import * as tenantsServices from '../services/tenant.service.js';

// CREATE TENANTS

export const createTenants = async (req, res, next) => {
  try {
    const data = await tenantsServices.createTenants(req.body);
    res.status(200).json({ success: true, flats: data });
  } catch (error) {
    next(error);
  }
};

// GET ALL TENANTS

export const getTenants = async (req, res, next) => {
  try {
    const data = await Tenant.find();
    res.status(200).json({ success: true, tenants: data });
    next();
  } catch (error) {}
};
