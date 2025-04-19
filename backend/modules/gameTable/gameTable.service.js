import GameTable from "./gameTable.model.js";
import JoinRequest from "./joinRequest.model.js";
import { NotFoundError, UnauthorizedError, BadRequestError } from "../../errors/CustomErrors.js";

const assertOwnership = (resource, userId, errorMsg = "Unauthorized") => {
  if (resource.createdBy.toString() !== userId) throw new UnauthorizedError(errorMsg);
};

const findOrFail = async (Model, id, message) => {
  const result = await Model.findById(id);
  if (!result) throw new NotFoundError(message);
  return result;
};

const buildGameTableQuery = (filters = {}) => {
  const baseQuery = { status: "OPEN" };
  const map = {
    title: (v) => ({ title: { $regex: new RegExp(v, "i") } }),
    system: (v) => ({ system: v }),
    duration: (v) => ({ duration: v }),
    status: (v) => ({ status: v }),
  };
  return Object.entries(filters).reduce((query, [key, val]) => {
    return val != null && map[key] ? { ...query, ...map[key](val) } : query;
  }, baseQuery);
};

export const createGameTable = async (userId, data) => {
  return await new GameTable({ ...data, createdBy: userId }).save();
};

export const updateGameTable = async (id, updates, userId) => {
  const gameTable = await findOrFail(GameTable, id, "Game Table not found");
  assertOwnership(gameTable, userId);
  Object.assign(gameTable, updates);
  return await gameTable.save();
};

export const deleteGameTable = async (id, userId) => {
  const gameTable = await findOrFail(GameTable, id, "Game Table not found");
  assertOwnership(gameTable, userId);
  await gameTable.remove();
  return true;
};

export const listAvailableGameTables = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;
  const query = buildGameTableQuery(filters);

  const [gameTables, total] = await Promise.all([
    GameTable.find(query).skip(skip).limit(limit).populate("createdBy", "name"),
    GameTable.countDocuments(query),
  ]);

  return {
    gameTables,
    totalGameTables: total,
    totalPages: Math.ceil(total / limit),
  };
};

export const joinGameTable = async (gameTableId, userId) => {
  const table = await findOrFail(GameTable, gameTableId, "Game Table not found");

  if (table.players.includes(userId)) throw new BadRequestError("Already joined this game table");
  if (table.players.length >= table.maxPlayers) throw new BadRequestError("Game Table is full");

  table.players.push(userId);
  return await table.save();
};

export const requestJoinGameTable = async (gameTableId, userId) => {
  await findOrFail(GameTable, gameTableId, "Game Table not found");

  const exists = await JoinRequest.findOne({ gameTableId, playerId: userId, status: "PENDING" });
  if (exists) throw new BadRequestError("Join request already exists");

  return await new JoinRequest({ gameTableId, playerId: userId }).save();
};

export const respondToJoinRequest = async (requestId, action, userId) => {
  const request = await JoinRequest.findById(requestId).populate("gameTableId").populate("playerId");

  if (!request) throw new NotFoundError("Join Request not found");
  if (!["ACCEPTED", "REJECTED"].includes(action)) throw new BadRequestError("Invalid action");

  assertOwnership(request.gameTableId, userId, "Only the game master can respond to requests");

  request.status = action;
  await request.save();

  if (action === "ACCEPTED") {
    request.gameTableId.players.push(request.playerId);
    await request.gameTableId.save();
  }

  return request;
};

export const getGameTableById = async (id) => {
  const table = await GameTable.findById(id)
    .populate("createdBy", "name nickname")
    .populate("players", "name email");
  if (!table) throw new NotFoundError("Game Table not found");
  return table;
};

const gameTableService = {
  createGameTable,
  updateGameTable,
  deleteGameTable,
  listAvailableGameTables,
  joinGameTable,
  requestJoinGameTable,
  respondToJoinRequest,
  getGameTableById,
};

export default gameTableService;