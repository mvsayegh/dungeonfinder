const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");
const userController = require("../controllers/userController");


router.get("/all", authMiddleware, isAdminMiddleware, userController.listUsers);
router.get("/tables", authMiddleware, userController.listUserTables);
router.get("/info", authMiddleware, userController.getUserInfo);
router.post("/", authMiddleware, isAdminMiddleware, userController.createUser);
router.put("/edit", authMiddleware, userController.editUser);
router.delete("/:id", authMiddleware, isAdminMiddleware, userController.deleteUser);



module.exports = router;
