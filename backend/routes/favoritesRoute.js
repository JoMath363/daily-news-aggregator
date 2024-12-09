import express from 'express'
import UserModel from '../models/userModel.js'

const router = express.Router()

router.put('/add', (req, res) => {
   const { email, article } = req.body;

   const updatedArticle = {
      ...article,
      isFavorited: true
   }

   UserModel.findOneAndUpdate(
      { email },
      { $push: { favorites: updatedArticle } },
      { new: true, runValidators: true }
   )
      .then((user) => {
         res.status(200).json(user);
      })
      .catch((error) => {
         res.status(500).json({ message: 'Error adding article to favorites.', error })
      })
})

router.put('/remove', (req, res) => {
   const { email, title } = req.body;

   UserModel.findOneAndUpdate(
      { email },
      { $pull: { favorites: { title } } },
      { new: true }
   )
      .then((user) => {
         res.status(200).json(user);
      })
      .catch((error) => {
         res.status(500).json({ message: 'Error removimg article from favorites.', error })
      })
})

export default router