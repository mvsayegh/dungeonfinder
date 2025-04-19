import GameMaster from "./gameMaster.model.js";
import { NotFoundError, UnauthorizedError } from "../../errors/CustomErrors.js";

export const createGameMaster = async (userId, gameMasterData) => {
  const newGameMaster = new GameMaster({
    ...gameMasterData,
    createdBy: userId,
  });

  await newGameMaster.save();
  return newGameMaster;
};

export const updateGameMaster = async (createdBy, updates, userId) => {
  const gameMaster = await GameMaster.findById(createdBy);
  if (!gameMaster) throw new NotFoundError("Game Master not found");
  if (gameMaster.createdBy.toString() !== userId)
    throw new UnauthorizedError("You are not the owner of this game master");

  Object.assign(gameMaster, updates);
  await gameMaster.save();
  return gameMaster;
};

export const deleteGameMaster = async (createdBy, userId) => {
  const gameMaster = await GameMaster.findById(createdBy);
  if (!gameMaster) throw new NotFoundError("Game Master not found");
  if (gameMaster.createdBy.toString() !== userId)
    throw new UnauthorizedError("You are not the owner of this game master");

  await gameMaster.remove();
  return true;
};

export const getGameMasters = async (filters, page, limit) => {
  const skip = (page - 1) * limit;

  const [gameMasters, total] = await Promise.all([
    GameMaster.find(filters)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }),
    GameMaster.countDocuments(filters),
  ]);

  return {
    gameMasters,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    },
  };
};

export const getGameMasterInfo = async (createdBy) => {
  const gameMaster = await GameMaster.findById(createdBy);

  if (!gameMaster) throw new NotFoundError("Game Master not found");
  return gameMaster;
};

const gameMasterService = {
  createGameMaster,
  updateGameMaster,
  deleteGameMaster,
  getGameMasters,
  getGameMasterInfo,
};

export default gameMasterService;