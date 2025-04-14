const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const gameTableController = require("../controllers/gameTableController");

// Criar uma nova mesa (protegida)
router.post("/create", authMiddleware, gameTableController.createGameTable);

// Listar todas as mesas disponíveis (para jogadores)
router.get("/available", authMiddleware, gameTableController.listAvailableGameTables);

// Jogador se inscreve em uma mesa
router.post("/join/:gameTableId", authMiddleware, gameTableController.joinGameTable);

// Solicitação de participação (cria uma requisição de inscrição)
router.post("/request/:gameTableId", authMiddleware, gameTableController.requestJoinGameTable);

// Aceitar ou Rejeitar uma solicitação de jogador (somente mestre de jogo)
router.put("/request/:joinRequestId/response", authMiddleware, gameTableController.respondToJoinRequest);

module.exports = router;
