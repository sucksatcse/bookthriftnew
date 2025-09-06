// server/models/userModel.js
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contact: { type: String, required: true, trim: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

// signup (register)
userSchema.statics.signup = async function ({ name, email, contact, password }) {
  if (!name || !email || !contact || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  // If you want BD-specific validation, replace 'any' with 'bn-BD'
  if (!validator.isMobilePhone(String(contact), 'bn-BD')) {
    throw Error('Contact number not valid')
  }
  const strong = validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  if (!strong) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  try {
    const user = await this.create({ name, email, contact, password: hash })
    return user
  } catch (err) {
    if (err.code === 11000) {
      throw Error('Email already in use')
    }
    throw err
  }
}

// login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

export default mongoose.model('User', userSchema)