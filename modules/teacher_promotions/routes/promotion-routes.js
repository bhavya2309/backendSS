import express from 'express';
import { getEmployeePrediction } from '../controllers/promotions-controller.js';

const router = express.Router();

// Route to fetch employee data from the database and predict promotion
router.get('/predict/:id', getEmployeePrediction);

export default router;
