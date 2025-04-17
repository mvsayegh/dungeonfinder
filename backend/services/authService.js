const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/mailer");

const register = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email already exists");
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
  });
  // Envia e-mail
  await sendVerificationEmail(user.email, user.verificationToken, user.name);
  return "User created successfully, please check your email for verification link.";
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return { status: 401, message: "User not found" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { status: 401, message: "Wrong password" };

    if (!user.verified) return { status: 403, message: "Email not verified" };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { token, id: user._id };
  } catch (err) {
    console.error("Login Error:", err);
    return { status: 500, message: "Login failed", error: err.message };
  }
};

module.exports = {
  register,
  login,
};
