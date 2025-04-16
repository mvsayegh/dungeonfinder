const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const token = await authService.register({ name, email, password });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verificar e-mail;
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email, verificationToken: token });
    if (!user) return res.status(400).json({ error: "Invalid token" });
    user.verified = true;
    user.verificationToken = null;
    await user.save();
    return res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(400).json({ error: "Token invalid or expired" });
  }
};
