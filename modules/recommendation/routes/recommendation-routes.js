import express from 'express';
import { getRecommendations } from '../controllers/recommendation-controller.js';

const router = express.Router();

router.post('/add-recommendations/:userId')
router.get('/get-recommendations/:userId', getRecommendations);

export default router;