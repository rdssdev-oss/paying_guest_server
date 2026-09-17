import express from 'express';
import { register, login, refreshToken, logout } from '../../controllers/auth.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import checkAuth from '../../middlewares/checkAuth.middleware.js';
import { registerSchema, loginSchema } from '../../validations/auth.validations.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refreshToken);
router.post('/logout', checkAuth, logout);

export default router;
