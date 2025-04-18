const GameMaster = require("../models/GameMaster");

const createGameMaster = async (userId, gameMasterData) => {
  const newGameMaster = new GameMaster({
    ...gameMasterData,
    createdBy: userId,
  });

  await newGameMaster.save();
  return newGameMaster;
};

const updateGameMaster = async (createdBy, updates, userId) => {
  const gameMaster = await GameMaster.findById(createdBy);
  if (!gameMaster) throw new Error("Game Master not found");
  if (gameMaster.createdBy.toString() !== userId)
    throw new Error("Unauthorized");

  Object.assign(gameMaster, updates);
  await gameMaster.save();
  return gameMaster;
};

const deleteGameMaster = async (createdBy, userId) => {
  const gameMaster = await GameMaster.findById(createdBy);
  if (!gameMaster) throw new Error("Game Master not found");
  if (gameMaster.createdBy.toString() !== userId)
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

const getGameMasterInfo = async (createdBy) => {
  const gameMaster = await GameMaster.findById(createdBy);

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
