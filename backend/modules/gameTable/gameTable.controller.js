import * as gameTableService from "./gameTable.service.js";
import { successResponse, errorResponse } from "../../utils/responseHelper.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

export const createGameTable = asyncHandler(async (req, res) => {
  const newGameTable = await gameTableService.createGameTable(req.user.id, req.body);
  successResponse(res, { newGameTable }, "Game Table created successfully", 201);
});

export const updateGameTable = asyncHandler(async (req, res) => {
  const { gameTableId } = req.params;
  const updatedTable = await gameTableService.updateGameTable(gameTableId, req.body, req.user.id);
  successResponse(res, { gameTable: updatedTable }, "Game Table updated successfully");
});

export const deleteGameTable = asyncHandler(async (req, res) => {
  const { gameTableId } = req.params;
  await gameTableService.deleteGameTable(gameTableId, req.user.id);
  successResponse(res, null, "Game Table deleted successfully");
});

export const listAvailableGameTables = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, system, title, duration } = req.query;
  const parsedPage = Math.max(1, parseInt(page, 10));
  const parsedLimit = Math.max(1, parseInt(limit, 10));

  const filters = { status, system, title, duration };
  const result = await gameTableService.listAvailableGameTables(parsedPage, parsedLimit, filters);

  successResponse(res, {
    gameTables: result.gameTables,
    pagination: {
      totalPages: result.totalPages,
      totalGameTables: result.totalGameTables,
      pageNumber: parsedPage,
      pageSize: parsedLimit,
    },
  });
});

export const getGameTableById = asyncHandler(async (req, res) => {
  const { gameTableId } = req.params;
  const gameTable = await gameTableService.getGameTableById(gameTableId);
  if (!gameTable) return errorResponse(res, "Game Table not found", 404);
  successResponse(res, { gameTable }, "Game Table fetched successfully");
});

export const joinGameTable = asyncHandler(async (req, res) => {
  const { gameTableId } = req.params;
  const joinedTable = await gameTableService.joinGameTable(gameTableId, req.user.id);
  successResponse(res, { gameTable: joinedTable }, "Successfully joined the game table");
});

export const requestJoinGameTable = asyncHandler(async (req, res) => {
  const { gameTableId } = req.params;
  const joinRequest = await gameTableService.requestJoinGameTable(gameTableId, req.user.id);
  successResponse(res, { joinRequest }, "Join request submitted successfully");
});

export const respondToJoinRequest = asyncHandler(async (req, res) => {
  const { joinRequestId } = req.params;
  const { action } = req.body;
  const updatedRequest = await gameTableService.respondToJoinRequest(joinRequestId, action, req.user.id);

  if (global.io) {
    global.io.to(updatedRequest.playerId._id.toString()).emit("notification", {
      message: `Your join request for table "${updatedRequest.gameTableId.title}" was ${action}`,
    });
  }

  successResponse(res, { joinRequest: updatedRequest }, `Join Request ${action}`);
});

const gameTableController = {
  createGameTable,
  updateGameTable,
  deleteGameTable,
  listAvailableGameTables,
  getGameTableById,
  joinGameTable,
  requestJoinGameTable,
  respondToJoinRequest
};

export default gameTableController;