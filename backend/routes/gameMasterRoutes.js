const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const gameMasterController = require("../controllers/gameMasterController");

// Criar novo game master
router.post("/", authMiddleware, gameMasterController.createGameMaster);

// Atualizar ou deletar um gamemaster específico
router.put("/:createdBy", authMiddleware, gameMasterController.updateGameMaster);
router.delete("/:createdBy", authMiddleware, isAdminMiddleware, gameMasterController.deleteGameMaster);

// Lista de game masters
router.get("/", gameMasterController.listGameMasters);

// Buscar Game Master específico
router.get("/:createdBy", gameMasterController.getGameMasterInfo);

module.exports = router;