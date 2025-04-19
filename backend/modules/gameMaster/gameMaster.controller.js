import * as gameMasterService from "./gameMaster.service.js";
import { successResponse } from "../../utils/responseHelper.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

// Criar um novo Game Master
export const createGameMaster = asyncHandler(async (req, res) => {
  const newGameMaster = await gameMasterService.createGameMaster(
    req.user.id,
    req.body
  );
  successResponse(res, { gameMaster: newGameMaster }, "Game Master created successfully", 201);
});

// Editar um Game Master
export const updateGameMaster = asyncHandler(async (req, res) => {
  const { createdBy } = req.params;
  const updatedGameMaster = await gameMasterService.updateGameMaster(
    createdBy,
    req.body,
    req.user.id
  );
  successResponse(res, { gameMaster: updatedGameMaster }, "Game Master updated successfully");
});

// Deletar um Game Master (Admin only)
export const deleteGameMaster = asyncHandler(async (req, res) => {
  const { createdBy } = req.params;
  await gameMasterService.deleteGameMaster(createdBy, req.user.id);
  successResponse(res, null, "Game Master deleted successfully");
});

// Obter Game Master por ID
export const getGameMasterInfo = asyncHandler(async (req, res) => {
  const { createdBy } = req.params;
  const gameMaster = await gameMasterService.getGameMasterInfo(createdBy);
  successResponse(res, { gameMaster }, "Game Master fetched successfully");
});

// Listar Game Masters com filtros e paginação
export const listGameMasters = asyncHandler(async (req, res) => {
  const { name, nickname, location, page = 1, limit = 10 } = req.query;

  const filters = {};
  if (name) filters.name = new RegExp(name, "i");
  if (nickname) filters.nickname = new RegExp(nickname, "i");
  if (location) filters.location = new RegExp(location, "i");

  const gameMasters = await gameMasterService.getGameMasters(filters, page, limit);
  successResponse(res, gameMasters, "Game Masters fetched successfully");
});

const gameMasterController = {
  createGameMaster,
  updateGameMaster,
  deleteGameMaster,
  getGameMasterInfo,
  listGameMasters,
};

export default gameMasterController;