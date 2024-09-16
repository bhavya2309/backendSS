import express from 'express';
import submitForm from '../controllers/activityController.js';

const router = express.Router();

// Define the route for form submission
router.post('/submit-form', submitForm);

export default router;
