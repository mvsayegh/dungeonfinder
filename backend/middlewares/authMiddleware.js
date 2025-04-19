import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHelper.js";

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.query.token ||
    null;

  // Se não houver token, retorna erro
  if (!token) {
    return errorResponse(res, "No token provided", 401);
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Chama o próximo middleware ou rota
  } catch (err) {
    // Verifica o tipo de erro de token
    const errorMessage =
      err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";

    return errorResponse(res, errorMessage, 401);
  }
};

export default authMiddleware;
