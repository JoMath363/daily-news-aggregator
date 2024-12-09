import express from 'express'
import UserModel from '../models/userModel.js'

const router = express.Router()

router.post('/signup', (req, res) => {
   UserModel.create(req.body)
      .then(user => res.json(user))
      .catch(error => res.json(error))
})

router.post('/login', (req, res) => {
   const { email, password } = req.body;

   UserModel.findOne({ email: email })
      .then((user) => {
         if (user) {
            if (user.password === password) {
               res.status(202).send(user)
            } else {
               res.status(400).send('The password is incorrect.')
            }
         } else {
            res.status(404).send("No record existed.")
         }
      })
})

router.put('/favorite/add', (req, res) => {
   const { email, article } = req.body;

   UserModel.findOneAndUpdate(
      { email },
      { $push: { favorites: article } },
      { new: true, runValidators: true }
   )
      .then((user) => {
         res.status(200).json(user);
      })
      .catch((error) => {
         res.status(500).json({ message: 'Error adding article to favorites.', error })
      })
})

export default router