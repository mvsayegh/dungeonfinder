const GameTable = require("../models/GameTable");
const JoinRequest = require("../models/JoinRequest");
const { successResponse, errorResponse } = require("../utils/responseHelper");

// Criar uma nova mesa (protegida)
exports.createGameTable = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      system,
      type,
      mode,
      platform,
      maxPlayers,
      dayOfWeek,
      time,
      duration,
    } = req.body;
    const newGameTable = new GameTable({
      title,
      description,
      image,
      system,
      type,
      mode,
      platform,
      gameMasterId: req.user.id, // Pega o id do usuário autenticado
      maxPlayers,
      dayOfWeek,
      time,
      duration,
    });
    await newGameTable.save();
    successResponse(
      res,
      { newGameTable },
      "Game Table created successfully",
      201
    );
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Listar todas as mesas disponíveis (para jogadores)
exports.listAvailableGameTables = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, system, title, duration } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(pageSize)) {
      return errorResponse(res, "Invalid page or limit parameter", 400);
    }

    const skip = (pageNumber - 1) * pageSize;

    const filter = {};
    if (status) filter.status = status;
    if (system) filter.system = system;
    if (duration) filter.duration = duration;
    if (title) filter.title = { $regex: new RegExp(title, "i") };

    const gameTables = await GameTable.find(filter)
      .skip(skip)
      .limit(pageSize)
      .populate("gameMasterId", "name")
      .exec();

    const totalGameTables = await GameTable.countDocuments(filter);
    const totalPages = Math.ceil(totalGameTables / pageSize);

    successResponse(res, {
      gameTables,
      pagination: { pageNumber, pageSize, totalPages, totalGameTables },
    });
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Jogador se inscreve em uma mesa
exports.joinGameTable = async (req, res) => {
  const { gameTableId } = req.params;
  try {
    const gameTable = await GameTable.findById(gameTableId);
    if (!gameTable) return errorResponse(res, "Game Table not found", 404);

    if (gameTable.players.length >= gameTable.maxPlayers) {
      return errorResponse(res, "Game Table is full", 400);
    }

    if (gameTable.players.includes(req.user.id)) {
      return errorResponse(
        res,
        "You are already enrolled in this game table",
        400
      );
    }

    gameTable.players.push(req.user.id);
    await gameTable.save();

    successResponse(res, { gameTable }, "Successfully joined the game table");
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Solicitação de participação (cria uma requisição de inscrição)
exports.requestJoinGameTable = async (req, res) => {
  const { gameTableId } = req.params;

  try {
    const gameTable = await GameTable.findById(gameTableId);
    if (!gameTable) return errorResponse(res, "Game Table not found", 404);

    const alreadyRequested = await JoinRequest.findOne({
      gameTableId,
      playerId: req.user.id,
      status: "PENDING",
    });
    if (alreadyRequested)
      return errorResponse(
        res,
        "You have already requested to join this game table",
        400
      );

    const joinRequest = new JoinRequest({
      gameTableId,
      playerId: req.user.id,
    });

    await joinRequest.save();

    successResponse(
      res,
      { joinRequest },
      "Join request submitted successfully"
    );
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

// Aceitar ou Rejeitar uma solicitação de jogador (só mestre de jogo)
exports.respondToJoinRequest = async (req, res) => {
  const { joinRequestId } = req.params;
  const { action } = req.body;

  try {
    const joinRequest = await JoinRequest.findById(joinRequestId).populate(
      "gameTableId playerId"
    );
    if (!joinRequest) return errorResponse(res, "Join Request not found", 404);

    if (joinRequest.gameTableId.gameMasterId.toString() !== req.user.id) {
      return errorResponse(
        res,
        "You are not the game master of this table",
        403
      );
    }

    if (action !== "ACCEPTED" && action !== "REJECTED") {
      return errorResponse(res, "Invalid action", 400);
    }

    joinRequest.status = action;
    await joinRequest.save();

    if (action === "ACCEPTED") {
      const gameTable = joinRequest.gameTableId;
      gameTable.players.push(joinRequest.playerId);
      await gameTable.save();
    }

    io.to(joinRequest.playerId.toString()).emit("notification", {
      message: `Your join request for table "${joinRequest.gameTableId.title}" was ${action}`,
    });

    successResponse(res, { joinRequest }, `Join Request ${action}`);
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};
