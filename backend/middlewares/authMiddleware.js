const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHelper");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.startsWith("Bearer ")
    ? req.header("Authorization").replace("Bearer ", "")
    : null;

  if (!token) {
    return errorResponse(res, "No token provided", 401); // Usando o responseHelper
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return errorResponse(res, "Token expired", 401); // Usando o responseHelper
    }
    return errorResponse(res, "Invalid token", 401); // Usando o responseHelper
  }
};

module.exports = authMiddleware;
