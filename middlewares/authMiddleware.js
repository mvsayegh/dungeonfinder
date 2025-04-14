const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Verifica se o token foi passado no cabeçalho Authorization
  const token = req.header("Authorization")?.startsWith("Bearer ")
    ? req.header("Authorization").replace("Bearer ", "")
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Tenta verificar o token usando o segredo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Armazena o id do usuário decodificado no objeto da requisição
    next(); // Chama o próximo middleware ou a rota
  } catch (err) {
    // Caso o token seja inválido ou expirado, devolve erro
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
