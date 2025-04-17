const GameTable = require("../models/GameTable");
const User = require("../models/User");

const createUser = async ({ name, email, password, role = "USER" }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const newUser = new User({
      name,
      email,
      password, // Certifique-se de hash o password antes de salvar
      role, // Pode ser admin ou user
    });

    await newUser.save();
    return newUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

const editUser = async (userId, updateData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Atualiza os campos fornecidos
    Object.assign(user, updateData);
    await user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserInfo = async (userId) => {
  try {
    const user = await User.findById(userId).select(
      "-password -verificationToken"
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const listUserTables = async (userId, { page = 1, limit = 10 }) => {
  try {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(pageSize)) {
      throw new Error("Invalid page or limit parameter");
    }

    const skip = (pageNumber - 1) * pageSize;

    // Mesas do Mestre de Jogo
    const gameMasterTables = await GameTable.find({ gameMasterId: userId })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // Mesas onde o usuário é jogador
    const playerTables = await GameTable.find({ players: userId })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // Contagem total de mesas para paginação
    const totalGameMasterTables = await GameTable.countDocuments({
      gameMasterId: userId,
    });
    const totalPlayerTables = await GameTable.countDocuments({
      players: userId,
    });

    // Calcular o número total de páginas
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

const listUsers = async () => {
  try {
    const users = await User.find().select("-password -verificationToken");
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createUser,
  editUser,
  deleteUser,
  getUserInfo,
  listUserTables,
  listUsers,
};
