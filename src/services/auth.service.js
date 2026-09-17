import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import AppError from "../utils/AppError.js";
import { AUTH_MESSAGES } from "../config/messages.js";

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

const signAccessToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organizationId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

const signRefreshToken = (user) => {
  const payload = { id: user._id, tokenVersion: user.tokenVersion || 0 };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

const generateTokens = (user) => ({
  token: signAccessToken(user),
  refreshToken: signRefreshToken(user),
});

const sanitizeUser = (user) => {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
};

// Comma-separated allowlist of emails granted the platform-owner SUPER_ADMIN role on registration.
// Configure via the SUPER_ADMIN_EMAILS env var - never hardcode credentials/emails in source.
const getSuperAdminEmails = () =>
  (process.env.SUPER_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const register = async ({ role, organizationId, ...data }) => {
  // role/organizationId are never accepted from client input to prevent privilege escalation
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new AppError(AUTH_MESSAGES.USER_EXIST, 400);

  const organization = await Organization.create({
    name: data.organizationName || `${data.name}'s Organization`,
  });

  const isPlatformOwner = getSuperAdminEmails().includes(data.email.toLowerCase());

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    organizationId: organization._id,
    role: isPlatformOwner ? "SUPER_ADMIN" : "ADMIN", // creator of a new organization manages it
  });

  const tokens = generateTokens(user);
  return { user: sanitizeUser(user), organization, ...tokens };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.isActive) throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS, 401);

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new AppError(AUTH_MESSAGES.INVALID_CREDENTIALS, 401);

  // Auto-promote an allowlisted email so ownership doesn't depend on re-registering
  if (user.role !== "SUPER_ADMIN" && getSuperAdminEmails().includes(user.email.toLowerCase())) {
    user.role = "SUPER_ADMIN";
    await user.save();
  }

  const tokens = generateTokens(user);
  return { message: AUTH_MESSAGES.LOGIN_SUCCESS, user: sanitizeUser(user), ...tokens };
};

export const refresh = async (token) => {
  if (!token) throw new AppError(AUTH_MESSAGES.INVALID_REFRESH_TOKEN, 403);

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
  } catch {
    throw new AppError(AUTH_MESSAGES.INVALID_REFRESH_TOKEN, 403);
  }

  const user = await User.findById(payload.id);
  if (!user || !user.isActive) throw new AppError(AUTH_MESSAGES.INVALID_REFRESH_TOKEN, 403);
  if ((user.tokenVersion || 0) !== payload.tokenVersion) {
    throw new AppError(AUTH_MESSAGES.INVALID_REFRESH_TOKEN, 403);
  }

  return generateTokens(user);
};

// Invalidates every outstanding refresh token for the user
export const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
};

