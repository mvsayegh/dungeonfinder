const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const gameTableController = require("../controllers/gameTableController");

// Criar nova mesa
router.post("/", authMiddleware, gameTableController.createGameTable);

// Atualizar ou deletar uma mesa específica
router.put("/:gameTableId", authMiddleware, gameTableController.updateGameTable);
router.delete("/:gameTableId", authMiddleware, isAdminMiddleware, gameTableController.deleteGameTable);

// Listar mesas disponíveis para jogadores
router.get("/", gameTableController.listAvailableGameTables);

// Jogador se inscreve diretamente
router.post("/:gameTableId/join", authMiddleware, gameTableController.joinGameTable);

// Jogador envia solicitação para participar
router.post("/:gameTableId/request", authMiddleware, gameTableController.requestJoinGameTable);

// Mestre de jogo responde à solicitação
router.put("/requests/:joinRequestId", authMiddleware, gameTableController.respondToJoinRequest);

module.exports = router;
