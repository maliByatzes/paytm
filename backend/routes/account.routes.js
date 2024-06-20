import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getBalance, transferMoney } from '../controllers/account.controllers.js';

const router = express.Router();

router.get('/balance', protectRoute, getBalance);
router.post('/transfer/:id', protectRoute, transferMoney);

export default router;
