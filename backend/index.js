import express from 'express';
import mongoose from 'mongoose';
import newsRoute from './routes/newsRoute.js'
import userRoute from './routes/userRoute.js'
import favoritesRoute from './routes/favoritesRoute.js'
import cors from 'cors';
import dotenv from 'dotenv';

// Sets Enviroment variables
dotenv.config()
const port = process.env.PORT || 5555
const mongoDBURL = process.env.MONGO_DB_URL

const app = express();

app.use(express.json())
app.use(cors())

// Using Express Router to easily handle diferent routers
app.use('/news', newsRoute);
app.use('/user', userRoute);
app.use('/favorites', favoritesRoute);

// Connecting Mongoose with the target DataBase
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to the database successfully.");
        app.listen(port, () => {
            console.log(`App is listening on port: ${port}`);
            console.log(`Server running at: http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });