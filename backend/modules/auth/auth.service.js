import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import { sendVerificationEmail } from "../../utils/mailer.js";
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} from "../../errors/CustomErrors.js";

const isStrongPassword = (password) => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinLength = password.length >= 8;

  return hasLowercase && hasUppercase && hasNumber && hasMinLength;
};

const register = async ({ name, email, password, role = "USER" }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new BadRequestError("Email already exists");

  // Validação de força da senha
  if (!isStrongPassword(password)) {
    throw new BadRequestError(
      "Password must have at least 8 characters, one lowercase, one uppercase, and one number"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
    verified: false,
    role,
  });

  await sendVerificationEmail(user.email, verificationToken, user.name);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select(
    "+password +verificationToken"
  );
  if (!user) throw new NotFoundError("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new UnauthorizedError("Wrong password");

  if (!user.verified) throw new ForbiddenError("Email not verified");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user,
  };
};

const verifyEmail = async (token) => {
  const { email } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email }).select("+verificationToken");
  if (!user) throw new BadRequestError("Invalid token");

  user.verified = true;
  user.verificationToken = null;
  await user.save();
};

const authService = {
  register,
  login,
  verifyEmail,
};

export default authService;
