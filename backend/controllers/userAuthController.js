const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/responseHelper");

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
