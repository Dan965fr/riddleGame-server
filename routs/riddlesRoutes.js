import express from 'express';
import {getAllRiddlesController,getRiddleByIdController,addRiddleController,updateRiddleController,deleteRiddleController} from '../Controllers/riddlesController.js'


const router = express.Router();


router.get('/',getAllRiddlesController);
router.get('/:id',getRiddleByIdController);
router.post('/',addRiddleController);
router.put('/:id',updateRiddleController);
router.delete('/:id',deleteRiddleController);


export default router;