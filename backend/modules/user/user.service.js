import bcrypt from "bcryptjs";
import User from "./user.model.js";
import GameTable from "../gameTable/gameTable.model.js";
import { BadRequestError, NotFoundError } from "../../errors/CustomErrors.js";

const SALT_ROUNDS = 10;

export const createUser = async ({ name, email, password, role = "USER" }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("There is already a user with this email.");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return await newUser.save();
};

export const editUser = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found.");
  }

  Object.assign(user, updateData);
  return await user.save();
};

export const getUserInfo = async (userId) => {
  const user = await User.findById(userId).select(
    "-password -verificationToken"
  );
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
};

export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  return user;
};

export const listUserTables = async (userId, { page = 1, limit = 10 }) => {
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  if (isNaN(pageNumber) || isNaN(pageSize)) {
    throw new BadRequestError("Invalid pagination parameters.");
  }

  const skip = (pageNumber - 1) * pageSize;

  const [
    gameMasterTables,
    playerTables,
    totalGameMasterTables,
    totalPlayerTables,
  ] = await Promise.all([
    GameTable.find({ createdBy: userId }).skip(skip).limit(pageSize),
    GameTable.find({ players: userId }).skip(skip).limit(pageSize),
    GameTable.countDocuments({ createdBy: userId }),
    GameTable.countDocuments({ players: userId }),
  ]);

  return {
    gameMasterTables,
    playerTables,
    pagination: {
      gameMaster: {
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalGameMasterTables / pageSize),
        totalItems: totalGameMasterTables,
      },
      player: {
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalPlayerTables / pageSize),
        totalItems: totalPlayerTables,
      },
    },
  };
};

export const listUsers = async () => {
  return await User.find().select("-password -verificationToken");
};

const userService = {
  createUser,
  editUser,
  getUserInfo,
  deleteUser,
  listUserTables,
  listUsers,
}

export default userService;