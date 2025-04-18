const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const gameMasterController = require("../controllers/gameMasterController");

// Criar nova mesa
router.post("/", authMiddleware, gameMasterController.createGameTable);

// Atualizar ou deletar uma mesa específica
router.put("/:gameMasterId", authMiddleware, gameMasterController.updateGameTable);
router.delete("/:gameMasterId", authMiddleware, isAdminMiddleware, gameMasterController.deleteGameTable);

// Lista de game masters
router.get("/", gameMasterController.listGameMasters);

// Buscar Game Master específico
router.get("/:gameMasterId", gameMasterController.getGameMasterById);

// Obter detalhes de uma mesa específica
router.get("/:gameTableId", gameTableController.getGameTableById);
