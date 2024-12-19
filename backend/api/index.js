//Dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

//Routes
import newsRoute from '../routes/newsRoute.js'
import userRoute from '../routes/userRoute.js'
import favoritesRoute from '../routes/favoritesRoute.js'

dotenv.config() 
const mongoDBURL = process.env.MONGO_DB_URL

const app = express();

app.use(express.json())
app.use(cors())

app.use('/news', newsRoute);
app.use('/user', userRoute);
app.use('/favorites', favoritesRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to the database successfully.");
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });

export const handler = serverless(app);

