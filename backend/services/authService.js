const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async ({ name, email, password, role }) => {
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
    role,
    verificationToken,
    verified: false,
  });

  // Envia e-mail
  await sendVerificationEmail(user.email, user.verificationToken, user.name);

  return "Usuário registrado. Verifique seu e-mail.";
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!user.verified) throw new Error("E-mail ainda não verificado.");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};

module.exports = {
  register,
  login,
};
