const gameMasterService = require("../services/gameMasterService");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// Criar um novo game master
exports.createGameMaster = async (req, res) => {
  try {
    const newGameMaster = await gameMasterService.createGameMaster(
      req.user.id,
      req.body
    );
    return successResponse(
      res,
      { newGameMaster },
      "Game Master created successfully",
      201
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// Editar um usuário
exports.updateGameMaster = async (req, res) => {
  const { gameMasterId } = req.params;
  try {
    const updatedGameMaster = await gameMasterService.updateGameMaster(
      gameMasterId,
      req.body,
      req.user.id
    );
    return successResponse(
      res,
      { gameMaster: updatedGameMaster },
      "Game Master updated successfully"
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// Deletar um usuário (Admin only)
exports.deleteGameMaster = async (req, res) => {
  const { gameMasterId } = req.params;
  try {
    await gameMasterService.deleteGameMaster(gameMasterId, req.user.id);
    return successResponse(res, null, "Game Master deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// Obter Game Master por ID
exports.getGameMasterInfo = async (req, res) => {
  try {
    const { gameMasterId } = req.params;
    const gameMaster = await gameMasterService.getGameMasterInfo(gameMasterId);

    if (!gameMaster) {
      return errorResponse(res, "Game Master not found", 404);
    }

    return successResponse(
      res,
      { gameMaster },
      "Game Master fetched successfully"
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// Listar Game Masters com filtros e paginação
exports.listGameMasters = async (req, res) => {
  try {
    const { name, nickname, location, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (name) filters.name = new RegExp(name, "i");
    if (nickname) filters.nickname = new RegExp(nickname, "i");
    if (location) filters.location = new RegExp(location, "i");

    const gameMasters = await gameMasterService.getGameMasters(
      filters,
      page,
      limit
    );
    return successResponse(
      res,
      gameMasters,
      "Game Masters fetched successfully"
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
