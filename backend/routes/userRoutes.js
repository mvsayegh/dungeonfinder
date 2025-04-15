const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userAuthController = require("../controllers/userAuthController");

// Listar todas as mesas de um usuário
router.get("/tables", authMiddleware, userAuthController.listUserTables);

module.exports = router;
