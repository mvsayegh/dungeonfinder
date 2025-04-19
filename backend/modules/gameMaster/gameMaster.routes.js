import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import isAdminMiddleware from "../../middlewares/isAdminMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import { createGameMasterSchema, updateGameMasterSchema } from "./gameMaster.schema.js";
import * as gameMasterController from "./gameMaster.controller.js";

const router = express.Router();

// Criar novo game master
router.post("/", authMiddleware, validate(createGameMasterSchema), gameMasterController.createGameMaster);

// Atualizar ou deletar um game master específico
router.put("/:createdBy", authMiddleware, validate(updateGameMasterSchema), gameMasterController.updateGameMaster);

// Deletar um game master (Admin only)
router.delete("/:createdBy", authMiddleware, isAdminMiddleware, gameMasterController.deleteGameMaster);

// Lista de game masters
router.get("/", gameMasterController.listGameMasters);

// Buscar Game Master específico
router.get("/:createdBy", gameMasterController.getGameMasterInfo);

export default router;
