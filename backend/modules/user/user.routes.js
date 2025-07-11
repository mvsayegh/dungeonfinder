import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import isAdminMiddleware from "../../middlewares/isAdminMiddleware.js";
import * as gameTableController from "./user.controller.js";

const router = Router();

// Admin: listar todos os usuários
router.get("/", authMiddleware, isAdminMiddleware, gameTableController.listUsers);

// Perfil do usuário logado
router.get("/me", authMiddleware, gameTableController.getUserInfo);

// Mesas do usuário logado
router.get("/me/tables", authMiddleware, gameTableController.listUserTables);

// Admin: criar novo usuário
router.post("/", authMiddleware, isAdminMiddleware, gameTableController.createUser);

// Atualizar dados do próprio usuário
router.put("/me", authMiddleware, gameTableController.editUser);

// Admin: deletar usuário por ID
router.delete("/:id", authMiddleware, isAdminMiddleware, gameTableController.deleteUser);

export default router;
