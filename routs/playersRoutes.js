import express from 'express';
import {
  getAllPlayersController,
  getPlayerByIdController,
  addPlayerController,
  updatePlayerTimeController,
  deletePlayerController,
} from '../Controllers/playersController.js';

const router = express.Router();

router.get('/', getAllPlayersController);
router.get('/:id', getPlayerByIdController);
router.post('/', addPlayerController);
router.put('/:id', updatePlayerTimeController);
router.delete('/:id', deletePlayerController);

export default router;
