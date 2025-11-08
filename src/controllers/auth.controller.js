import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
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
