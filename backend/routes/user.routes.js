import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUser, getUsers, updateUser } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/', protectRoute, getUser);
router.get('/bulk', protectRoute, getUsers);
router.patch('/update', protectRoute, updateUser);

export default router;
