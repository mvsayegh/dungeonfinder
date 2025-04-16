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
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!user.verified) throw new Error("Email not verified");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};

module.exports = {
  register,
  login,
};
