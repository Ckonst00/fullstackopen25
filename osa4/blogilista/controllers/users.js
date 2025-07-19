const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  if (password.length < 3) {
    return response.status(400).json({error: "Password too short"})
  }

  try {
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
} catch (error) {
    if (error.code === 'E11000') {
        return response.status(400).json({error: "expected `username` to be unique error"})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.name})
    }
}
})

module.exports = usersRouter