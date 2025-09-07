// server/controllers/userController.js
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const createToken = (_id) => jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email, contact: user.contact },
      token
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const signupUser = async (req, res) => {
  const { name, email, contact, password } = req.body
  try {
    const user = await User.signup({ name, email, contact, password })
    const token = createToken(user._id)
    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email, contact: user.contact },
      token
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}