const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const userController = require("../controllers/userController");

// Admin: listar todos usuários
router.get("/", authMiddleware, isAdminMiddleware, userController.listUsers);

// Perfil do usuário logado
router.get("/me", authMiddleware, userController.getUserInfo);

// Mesas do usuário logado
router.get("/me/tables", authMiddleware, userController.listUserTables);

// Admin: criar novo usuário
router.post("/", authMiddleware, isAdminMiddleware, userController.createUser);

// Atualizar dados do próprio usuário
router.put("/me", authMiddleware, userController.editUser);

// Admin: deletar usuário por ID
router.delete("/:id", authMiddleware, isAdminMiddleware, userController.deleteUser);

module.exports = router;
