const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const gameTableController = require("../controllers/gameTableController");

router.post("/create", authMiddleware, gameTableController.createGameTable);

router.get('/available', gameTableController.listAvailableGameTables);

router.post("/join/:gameTableId", authMiddleware, gameTableController.joinGameTable);

router.post("/request/:gameTableId", authMiddleware, gameTableController.requestJoinGameTable);

router.put("/request/:joinRequestId/response", authMiddleware, gameTableController.respondToJoinRequest);

module.exports = router;
