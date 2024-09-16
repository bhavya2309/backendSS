import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createConnection } from './shared/db/connection.js';
import cors from 'cors';
// import SearchRouter from  './modules/searching/search-router.js';
import { exec } from 'child_process';
import PromotionRouter from './modules/teacher_promotions/routes/promotion-routes.js'
import ActivityRouter from './modules/products/routes/activityRoutes.js';

dotenv.config();
const app = express();
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Order history routes
app.use('/api', PromotionRouter);
app.use('/api', ActivityRouter);
// user login / signup routes
//product 

//search
// app.use('/', SearchRouter);
//recommendation
// app.use('/', RecommendationRouter);

// Database connection
createConnection()
  .then(() => {
    // Start server
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('Application can\'t run as DB connection failed:', err);
    process.exit(1); // Exit the process with a failure code
  });
