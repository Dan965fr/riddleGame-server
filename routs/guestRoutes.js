import express from 'express';
import { guestLoginController } from '../Controllers/guestController.js';

const router = express.Router();

router.post('/login', guestLoginController); // לא צריך סיסמה

export default router;
