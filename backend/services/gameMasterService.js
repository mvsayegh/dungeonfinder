const GameMaster = require("../models/GameMaster");

const createGameMaster = async (userId, gameMasterData) => {
  const newGameMaster = new GameMaster({
    ...gameMasterData,
    gameMasterId: userId,
  });

  await newGameMaster.save();
  return newGameMaster;
};

const updateGameMaster = async (gameMasterId, updates, userId) => {
  const gameMaster = await GameMaster.findById(gameMasterId);
  if (!gameMaster) throw new Error("Game Master not found");
  if (gameMaster.gameMasterId.toString() !== userId)
    throw new Error("Unauthorized");

  Object.assign(gameMaster, updates);
  await gameMaster.save();
  return gameMaster;
};

const deleteGameMaster = async (gameMasterId, userId) => {
  const gameMaster = await GameMaster.findById(gameMasterId);
  if (!gameMaster) throw new Error("Game Master not found");
  if (gameMaster.gameMasterId.toString() !== userId)
    throw new Error("Unauthorized");

  await gameMaster.remove();
  return true;
};

const getGameMasters = async (filters, page, limit) => {
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

const getGameMasterInfo = async (gameMasterId) => {
  const gameMaster = await GameMaster.findById(gameMasterId);

  if (!gameMaster) return null;
  return gameMaster;
};

module.exports = {
  createGameMaster,
  updateGameMaster,
  deleteGameMaster,
  getGameMasters,
  getGameMasterInfo,
};
