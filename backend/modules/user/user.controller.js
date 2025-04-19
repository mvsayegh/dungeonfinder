import * as userService from "./user.service.js";
import { successResponse } from "../../utils/responseHelper.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

// Obter informações do usuário autenticado
export const getUserInfo = asyncHandler(async (req, res) => {
  const user = await userService.getUserInfo(req.user.id);
  successResponse(res, user, "User info retrieved successfully");
});

// Listar todas as mesas de um usuário
export const listUserTables = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const data = await userService.listUserTables(req.user.id, { page, limit });
  successResponse(res, data, "User tables retrieved successfully");
});

// Listar todos os usuários (Admin only)
export const listUsers = asyncHandler(async (_req, res) => {
  const users = await userService.listUsers();
  successResponse(res, users, "Users retrieved successfully");
});

// Criar um novo usuário (Admin only)
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await userService.createUser({ name, email, password, role });
  successResponse(res, newUser, "User created successfully");
});

// Editar dados do próprio usuário
export const editUser = asyncHandler(async (req, res) => {
  const { name, email, profilePicture } = req.body;
  const updatedUser = await userService.editUser(req.user.id, { name, email, profilePicture });
  successResponse(res, updatedUser, "User updated successfully");
});

// Deletar um usuário (Admin only)
export const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await userService.deleteUser(req.params.id);
  successResponse(res, deletedUser, "User deleted successfully");
});

const userController = {
  getUserInfo,
  listUserTables,
  listUsers,
  createUser,
  editUser,
  deleteUser,
};

export default userController;