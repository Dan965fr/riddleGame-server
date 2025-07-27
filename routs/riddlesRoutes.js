import express from 'express';
import {getAllRiddlesController,getRiddleByIdController,addRiddleController,updateRiddleController,deleteRiddleController} from '../Controllers/riddlesController.js'
import { verifyToken } from '../middleware/verifyT.js';
import { verifyAdmin } from '../middleware/verifyA.js';

const router = express.Router();


router.get('/',getAllRiddlesController);
router.get('/:id',getRiddleByIdController);
router.post('/',verifyToken,addRiddleController);
router.put('/:id',verifyAdmin,verifyToken,updateRiddleController);
router.delete('/:id',verifyAdmin,verifyToken,deleteRiddleController);


export default router;