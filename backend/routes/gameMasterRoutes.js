const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const gameMasterController = require("../controllers/gameMasterController");

// Criar nova mesa
router.post("/", authMiddleware, gameMasterController.createGameMaster);

// Atualizar ou deletar uma mesa específica
router.put("/:gameMasterId", authMiddleware, gameMasterController.updateGameMaster);
router.delete("/:gameMasterId", authMiddleware, isAdminMiddleware, gameMasterController.deleteGameMaster);

// Lista de game masters
router.get("/", gameMasterController.listGameMasters);

// Buscar Game Master específico
router.get("/:gameMasterId", gameMasterController.getGameMasterInfo);

module.exports = router;