const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// Listar informações do usuário
exports.getUserInfo = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userService.getUserInfo(userId);
    successResponse(res, user, "User info retrieved successfully");
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Listar todas as mesas de um usuário
exports.listUserTables = async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 10 } = req.query;

  try {
    const data = await userService.listUserTables(userId, { page, limit });
    successResponse(res, data, "User tables retrieved successfully");
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Listar todos os usuários (Admin only)
exports.listUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    successResponse(res, users, "Users retrieved successfully");
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Criar um novo usuário (Admin only)
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = await userService.createUser({
      name,
      email,
      password,
      role,
    });
    successResponse(res, newUser, "User created successfully");
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Editar um usuário
exports.editUser = async (req, res) => {
  const userId = req.user.id;
  const { name, email, profilePicture } = req.body;
  try {
    const updatedUser = await userService.editUser(userId, {
      name,
      email,
      profilePicture,
    });
    successResponse(res, updatedUser, "User updated successfully");
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Deletar um usuário (Admin only)
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userService.deleteUser(userId);
    successResponse(res, deletedUser, "User deleted successfully");
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};
