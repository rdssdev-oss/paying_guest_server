import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
    max: 1000000, 
    message: "Too many login attempts. Try again later.",
});

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 1000000, 
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
