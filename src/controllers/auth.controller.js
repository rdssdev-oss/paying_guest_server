import * as authService from "../services/auth.service.js";
import { recordAudit } from "../utils/auditLogger.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    recordAudit({
      organizationId: data.organization?._id,
      userId: data.user?._id,
      action: "AUTH_REGISTER",
      entity: "User",
      entityId: data.user?._id,
      ip: req.ip,
    });
    res.status(201).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    recordAudit({
      organizationId: data.user?.organizationId,
      userId: data.user?._id,
      action: "AUTH_LOGIN",
      entity: "User",
      entityId: data.user?._id,
      ip: req.ip,
    });
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const data = await authService.refresh(req.body.token);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
