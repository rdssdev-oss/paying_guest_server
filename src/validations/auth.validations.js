import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),
  role: Joi.string().valid('USER', 'ADMIN', 'SUPER_ADMIN'),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
