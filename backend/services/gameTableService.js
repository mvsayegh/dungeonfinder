const GameTable = require("../models/GameTable");
const JoinRequest = require("../models/JoinRequest");

const createGameTable = async (userId, gameTableData) => {
  const newGameTable = new GameTable({
    ...gameTableData,
    createdBy: userId,
  });

  await newGameTable.save();
  return newGameTable;
};

const updateGameTable = async (gameTableId, updates, userId) => {
  const gameTable = await GameTable.findById(gameTableId);
  if (!gameTable) throw new Error("Game Table not found");
  if (gameTable.createdBy.toString() !== userId) throw new Error("Unauthorized");

  Object.assign(gameTable, updates);
  await gameTable.save();
  return gameTable;
};

const deleteGameTable = async (gameTableId, userId) => {
  const gameTable = await GameTable.findById(gameTableId);
  if (!gameTable) throw new Error("Game Table not found");
  if (gameTable.createdBy.toString() !== userId) throw new Error("Unauthorized");

  await gameTable.remove();
  return true;
};

const listAvailableGameTables = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;
  const query = { status: "OPEN", ...filters };

  if (filters.title) {
    query.title = { $regex: new RegExp(filters.title, "i") };
  }

  const gameTables = await GameTable.find(query)
    .skip(skip)
    .limit(limit)
    .populate("createdBy", "name")
    .exec();

  const totalGameTables = await GameTable.countDocuments(query);
  const totalPages = Math.ceil(totalGameTables / limit);

  return { gameTables, totalPages, totalGameTables };
};

const joinGameTable = async (gameTableId, userId) => {
  const gameTable = await GameTable.findById(gameTableId);
  if (!gameTable) throw new Error("Game Table not found");
  if (gameTable.players.includes(userId)) throw new Error("Already joined");
  if (gameTable.players.length >= gameTable.maxPlayers) throw new Error("Game Table is full");

  gameTable.players.push(userId);
  await gameTable.save();
  return gameTable;
};

const requestJoinGameTable = async (gameTableId, userId) => {
  const gameTable = await GameTable.findById(gameTableId);
  if (!gameTable) throw new Error("Game Table not found");

  const existingRequest = await JoinRequest.findOne({
    gameTableId,
    playerId: userId,
    status: "PENDING",
  });
  if (existingRequest) throw new Error("Already requested to join this game table");

  const joinRequest = new JoinRequest({
    gameTableId,
    playerId: userId,
  });

  await joinRequest.save();
  return joinRequest;
};

const respondToJoinRequest = async (joinRequestId, action, userId) => {
  const joinRequest = await JoinRequest.findById(joinRequestId).populate("gameTableId playerId");
  if (!joinRequest) throw new Error("Join Request not found");

  const isGameMaster = joinRequest.gameTableId.createdBy.toString() === userId;
  if (!isGameMaster) throw new Error("Unauthorized");

  if (!["ACCEPTED", "REJECTED"].includes(action)) throw new Error("Invalid action");

  joinRequest.status = action;
  await joinRequest.save();

  if (action === "ACCEPTED") {
    const gameTable = joinRequest.gameTableId;
    gameTable.players.push(joinRequest.playerId);
    await gameTable.save();
  }

  return joinRequest;
};

const getGameTableById = async (gameTableId) => {
  const gameTable = await GameTable.findById(gameTableId)
    .populate("createdBy", "name nickname")
    .populate("players", "name email"); // se quiser incluir jogadores

  return gameTable;
};


module.exports = {
  createGameTable,
  updateGameTable,
  deleteGameTable,
  listAvailableGameTables,
  joinGameTable,
  requestJoinGameTable,
  respondToJoinRequest,
  getGameTableById
};
