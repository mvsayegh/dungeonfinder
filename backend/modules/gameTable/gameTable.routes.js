import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import * as gameTableController from "./gameTable.controller.js";
import isAdminMiddleware from "../../middlewares/isAdminMiddleware.js";

const router = express.Router();

// Estatísticas de Game Tables
router.get("/stats", gameTableController.getStats);

// Criar nova Game Table
router.post("/", authMiddleware, gameTableController.createGameTable);

// Atualizar ou deletar uma Game Table específica
router.put("/:id", authMiddleware, gameTableController.updateGameTable);

// Deletar uma Game Table (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  gameTableController.deleteGameTable
);

// Lista de Game Tables
router.get("/", gameTableController.listAvailableGameTables);

// Buscar Game Table específica
router.get("/:id", gameTableController.getGameTableById);

export default router;
