import express from 'express';
import {getAllRiddlesController,getRiddleByIdController,addRiddleController,updateRiddleController,deleteRiddleController} from '../Controllers/riddlesController.js'
import { verifyToken } from '../middleware/verify.js';


const router = express.Router();


router.get('/',getAllRiddlesController);
router.get('/:id',getRiddleByIdController);
router.post('/',verifyToken,addRiddleController);
router.put('/:id',verifyToken,updateRiddleController);
router.delete('/:id',verifyToken,deleteRiddleController);


export default router;