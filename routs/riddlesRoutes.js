import express from 'express';
import { getAllRiddlesController, getRiddleByIdController, addRiddleController, updateRiddleController, deleteRiddleController } from '../Controllers/riddlesController.js'
import { verifyToken } from '../middleware/verifyT.js';
import { verifyAdmin } from '../middleware/verifyA.js';
import { verifyUserOrAdmin } from '../middleware/verifyU.js';

const router = express.Router();


router.get('/', getAllRiddlesController);
router.get('/:id', getRiddleByIdController);
router.post('/', verifyToken, verifyUserOrAdmin, addRiddleController);
router.put('/:id', verifyToken, verifyAdmin, updateRiddleController);
router.delete('/:id', verifyToken, verifyAdmin, deleteRiddleController);


export default router;