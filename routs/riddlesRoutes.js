import express from 'express';
import * as riddlesController from '../Controllers/riddlesController.js'


const router = express.Router();


router.get('/',riddlesController.getAllRiddles);
router.get('/:id',riddlesController.getRiddleById)
router.post('/',riddlesController.addRiddle);
router.put('/:id',riddlesController.updateRiddle);
router.delete('/:id',riddlesController.deleteRiddle);


export default router;