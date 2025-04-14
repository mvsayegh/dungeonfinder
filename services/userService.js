const GameTable = require('../models/GameTable');

const listUserTables = async (userId, { page = 1, limit = 10 }) => {
  try {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(pageSize)) {
      throw new Error('Invalid page or limit parameter');
    }

    const skip = (pageNumber - 1) * pageSize;

    const gameMasterTables = await GameTable.find({ gameMasterId: userId })
      .skip(skip)
      .limit(pageSize)
      .exec();

    const playerTables = await GameTable.find({ players: userId })
      .skip(skip)
      .limit(pageSize)
      .exec();

    const totalGameMasterTables = await GameTable.countDocuments({ gameMasterId: userId });
    const totalPlayerTables = await GameTable.countDocuments({ players: userId });

    const totalGameMasterPages = Math.ceil(totalGameMasterTables / pageSize);
    const totalPlayerPages = Math.ceil(totalPlayerTables / pageSize);

    return {
      gameMasterTables,
      playerTables,
      pagination: {
        gameMaster: {
          page: pageNumber,
          limit: pageSize,
          totalPages: totalGameMasterPages,
          totalItems: totalGameMasterTables,
        },
        player: {
          page: pageNumber,
          limit: pageSize,
          totalPages: totalPlayerPages,
          totalItems: totalPlayerTables,
        },
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  listUserTables
};
