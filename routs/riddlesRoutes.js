import express from 'express';
import {getAllRiddles,getRiddleById,addRiddle,updateRiddle,deleteRiddle} from '../Controllers/riddlesController.js'


const router = express.Router();


router.get('/',getAllRiddles);
router.get('/:id',getRiddleById);
router.post('/',addRiddle);
router.put('/:id',updateRiddle);
router.delete('/:id',deleteRiddle);


export default router;