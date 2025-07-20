import express from "express";
import {
  getAllPlayers,
  getPlayerById,
  addPlayer,
  updatePlayerTime,
} from "../Controllers/playersController.js";

const router = express.Router();

router.get("/", getAllPlayers);
router.get("/:id", getPlayerById);
router.post("/", addPlayer);
router.put("/:id", updatePlayerTime);

export default router;