const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/responseHelper");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const message = await authService.register({ name, email, password });
    return successResponse(res, {}, message, 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.login({ email, password });

    if (result.status) {
      return errorResponse(res, result.message, result.status);
    }

    const user = await User.findById(result.id).select(
      "-password -verificationToken"
    );

    return successResponse(res, {
      token: result.token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email }).select("+verificationToken");
    if (!user) return errorResponse(res, "Invalid token", 400);

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    return successResponse(res, {}, "Email verified successfully");
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return errorResponse(res, "Token invalid or expired", 400);
  }
};
