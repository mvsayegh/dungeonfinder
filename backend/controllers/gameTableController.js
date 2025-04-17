const gameTableService = require("../services/gameTableService");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// Criar mesa
exports.createGameTable = async (req, res) => {
  try {
    const newGameTable = await gameTableService.createGameTable(
      req.user.id,
      req.body
    );
    return successResponse(
      res,
      { newGameTable },
      "Game Table created successfully",
      201
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// Atualizar mesa
exports.updateGameTable = async (req, res) => {
  const { gameTableId } = req.params;
  try {
    const updatedTable = await gameTableService.updateGameTable(
      gameTableId,
      req.body,
      req.user.id
    );
    return successResponse(
      res,
      { gameTable: updatedTable },
      "Game Table updated successfully"
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// Deletar mesa
exports.deleteGameTable = async (req, res) => {
  const { gameTableId } = req.params;
  try {
    await gameTableService.deleteGameTable(gameTableId, req.user.id);
    return successResponse(res, null, "Game Table deleted successfully");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// Listar mesas
exports.listAvailableGameTables = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, system, title, duration } = req.query;
    const filters = { status, system, title, duration };
    const result = await gameTableService.listAvailableGameTables(
      parseInt(page),
      parseInt(limit),
      filters
    );

    return successResponse(res, {
      gameTables: result.gameTables,
      pagination: {
        totalPages: result.totalPages,
        totalGameTables: result.totalGameTables,
        pageNumber: parseInt(page),
        pageSize: parseInt(limit),
      },
    });
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

// Jogador entra direto na mesa
exports.joinGameTable = async (req, res) => {
  const { gameTableId } = req.params;
  try {
    const joinedTable = await gameTableService.joinGameTable(
      gameTableId,
      req.user.id
    );
    return successResponse(
      res,
      { gameTable: joinedTable },
      "Successfully joined the game table"
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Solicitação de entrada (pendente)
exports.requestJoinGameTable = async (req, res) => {
  const { gameTableId } = req.params;
  try {
    const joinRequest = await gameTableService.requestJoinGameTable(
      gameTableId,
      req.user.id
    );
    return successResponse(
      res,
      { joinRequest },
      "Join request submitted successfully"
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// Mestre aceita ou rejeita solicitação
exports.respondToJoinRequest = async (req, res) => {
  const { joinRequestId } = req.params;
  const { action } = req.body;

  try {
    const updatedRequest = await gameTableService.respondToJoinRequest(
      joinRequestId,
      action,
      req.user.id
    );

    // Envia notificação via socket se quiser usar o io aqui também (caso esteja global ou via middleware)
    if (global.io) {
      global.io
        .to(updatedRequest.playerId._id.toString())
        .emit("notification", {
          message: `Your join request for table "${updatedRequest.gameTableId.title}" was ${action}`,
        });
    }

    return successResponse(
      res,
      { joinRequest: updatedRequest },
      `Join Request ${action}`
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
