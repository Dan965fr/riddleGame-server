import express from "express";
import {
  getAllPlayers,
  getPlayerByName,
  addPlayer,
  updatePlayerTime,
} from "../Controllers/playersController.js";

const router = express.Router();

router.get("/", getAllPlayers);
router.get("/:name", getPlayerByName);
router.post("/", addPlayer);
router.put("/:name", updatePlayerTime);

export default router;