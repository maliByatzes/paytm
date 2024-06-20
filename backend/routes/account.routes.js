import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getBalance } from '../controllers/account.controllers.js';

const router = express.Router();

router.get('/balance', protectRoute, getBalance);

export default router;
