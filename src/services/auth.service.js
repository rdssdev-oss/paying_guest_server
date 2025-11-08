import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { AUTH_MESSAGES } from "../config/messages.js";

const generateToken = (user) => {
  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { token, refreshToken };
};

export const register = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new AppError(AUTH_MESSAGES.USER_EXIST, 400);

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  const tokens = generateToken(user);
  return { user, ...tokens };
};

export const login = async (data) => {
  const user = await User.findOne({ email: data.email }).select("-password");
  const userWithPass = await User.findOne({ email: data.email }).select(
    "+password"
  );
  if (!user) throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS, 401);
  const validPassword = await bcrypt.compare(
    data.password,
    userWithPass.password
  );
  if (!validPassword) throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS, 401);
  const tokens = generateToken(user);
  return { message: AUTH_MESSAGES.LOGIN_SUCCESS, user, ...tokens };
};

export const refresh = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const newTokens = generateToken(payload);
    return newTokens;
  } catch {
    throw new AppError(TOKEM_MESSAGES.INVAILD_REFRESH_TOKEN, 403);
  }
};
