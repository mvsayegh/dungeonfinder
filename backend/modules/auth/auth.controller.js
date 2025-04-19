// auth.controller.js
import * as authService from "./auth.service.js";
import { successResponse } from "../../utils/responseHelper.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

// Registrar usuário
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  await authService.register({ name, email, password, role });
  successResponse(res, {}, "User created successfully, please check your email for verification link.", 201);
});

// Login do usuário
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await authService.login({ email, password }); // Verifique se está chamando a função corretamente

  successResponse(res, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      profilePicture: user.profilePicture,
    },
  }, "Login successful");
});

// Verificar e-mail
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  await authService.verifyEmail(token);
  successResponse(res, {}, "Email verified successfully");
});

// Exporta o controlador
const authController = {
  register,
  login,
  verifyEmail,
};

export default authController;
