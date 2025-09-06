// server/middleware/requireAuth.js
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  // Expected format: "Bearer <token>"
  const parts = authorization.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Authorization format is Bearer <token>' })
  }

  const token = parts[1]

  try {
    if (!process.env.SECRET) {
      throw new Error('JWT SECRET not set in environment file')
    }

    const { _id } = jwt.verify(token, process.env.SECRET)

    // attach user to request
    const user = await User.findOne({ _id }).select('_id name email')
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = user
    next()

  } catch (error) {
    console.error('requireAuth error:', error.message)
    res.status(401).json({ error: 'Request is not authorized' })
  }
}

export default requireAuth