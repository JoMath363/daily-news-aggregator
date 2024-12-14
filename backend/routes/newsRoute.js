import express from 'express'
import dotenv from 'dotenv';
import NewsAPI from 'newsapi'
import UserModel from '../models/userModel.js';

dotenv.config()

const router = express.Router()

const newsapi = new NewsAPI(process.env.API_KEY)

// Get artigles by category
router.post('/category', async (req, res) => {
    const { category, email } = req.body;

    try {
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        const user = email ? await UserModel.findOne({ email }) : null;

        const response = await newsapi.v2.topHeadlines({ category });

        if (!response || !response.articles) {
            throw new Error("Invalid API response");
        }

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const news = response.articles
            .filter((article) => article.title !== '[Removed]')
            .map((article) => {
                const date = new Date(article.publishedAt);
                const minutes = String(date.getMinutes()).padStart(2, '0');
                let hours = date.getHours();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = String(hours % 12 || 12).padStart(2, '0');

                article.publishedAt = `Published at ${hours}:${minutes} ${ampm} on ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}.`;
                article.description = article.description || '...';

                article.isFavorited = user
                    ? user.favorites.some((fav) => fav.title === article.title)
                    : false;

                return article;
            });

        res.status(200).json(news);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});



export default router