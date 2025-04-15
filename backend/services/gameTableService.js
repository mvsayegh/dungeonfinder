const GameTable = require("../models/GameTable");
const JoinRequest = require("../models/JoinRequest");

// Criar uma nova mesa de jogo
exports.createGameTable = async (userId, gameTableData) => {
  try {
    const newGameTable = new GameTable({
      ...gameTableData,
      gameMasterId: userId, // O ID do usuário que é o Mestre de Jogo
    });

    await newGameTable.save();
    return newGameTable;
  } catch (err) {
    throw new Error("Error creating game table: " + err.message);
  }
};

// Listar mesas abertas para jogadores
exports.listAvailableGameTables = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const gameTables = await GameTable.find({ status: "OPEN" })
      .skip(skip)
      .limit(limit)
      .populate("gameMasterId", "name")
      .exec();

    const totalGameTables = await GameTable.countDocuments({ status: "OPEN" });
    const totalPages = Math.ceil(totalGameTables / limit);

    return { gameTables, totalPages, totalGameTables };
  } catch (err) {
    throw new Error("Error fetching available game tables: " + err.message);
  }
};

// Jogador se inscreve em uma mesa
exports.joinGameTable = async (gameTableId, userId) => {
  try {
    const gameTable = await GameTable.findById(gameTableId);
    if (!gameTable) {
      throw new Error("Game Table not found");
    }

    if (gameTable.players.length >= gameTable.maxPlayers) {
      throw new Error("Game Table is full");
    }

    // Verifica se o jogador já está inscrito
    if (gameTable.players.includes(userId)) {
      throw new Error("You are already enrolled in this game table");
    }

    gameTable.players.push(userId);
    await gameTable.save();

    return gameTable;
  } catch (err) {
    throw new Error("Error joining game table: " + err.message);
  }
};

// Solicitar participação na mesa
exports.requestJoinGameTable = async (gameTableId, userId) => {
  try {
    const gameTable = await GameTable.findById(gameTableId);
    if (!gameTable) {
      throw new Error("Game Table not found");
    }

    const alreadyRequested = await JoinRequest.findOne({
      gameTableId,
      playerId: userId,
      status: "PENDING",
    });

    if (alreadyRequested) {
      throw new Error("You have already requested to join this game table");
    }

    const joinRequest = new JoinRequest({
      gameTableId,
      playerId: userId,
    });

    await joinRequest.save();
    return joinRequest;
  } catch (err) {
    throw new Error("Error requesting to join game table: " + err.message);
  }
};

// Aceitar ou Rejeitar uma solicitação de jogador
exports.respondToJoinRequest = async (joinRequestId, action, userId) => {
  try {
    const joinRequest = await JoinRequest.findById(joinRequestId).populate(
      "gameTableId playerId"
    );

    if (!joinRequest) {
      throw new Error("Join Request not found");
    }

    // Verifica se o mestre de jogo é o mesmo que o autor da mesa
    if (joinRequest.gameTableId.gameMasterId.toString() !== userId) {
      throw new Error("You are not the game master of this table");
    }

    if (action !== "ACCEPTED" && action !== "REJECTED") {
      throw new Error("Invalid action");
    }

    joinRequest.status = action;
    await joinRequest.save();

    // Se for aceito, adiciona o jogador à mesa
    if (action === "ACCEPTED") {
      const gameTable = joinRequest.gameTableId;
      gameTable.players.push(joinRequest.playerId);
      await gameTable.save();
    }

    return joinRequest;
  } catch (err) {
    throw new Error("Error responding to join request: " + err.message);
  }
};
