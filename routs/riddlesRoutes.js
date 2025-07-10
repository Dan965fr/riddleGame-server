import express from 'express';
import * as riddlesController from '../Controllers/riddlesController.js'


const router = express.Router();


router.get('/',riddlesController.getAllRiddles);
router.post('/addRiddle',riddlesController.addRiddle);
router.put('/updateRiddle',riddlesController.updateRiddle);
router.delete('/deleteRiddle',riddlesController.deleteRiddle);


export default router;