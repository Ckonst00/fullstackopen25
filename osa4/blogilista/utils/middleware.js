const jwt = require('jsonwebtoken')
const User = require('../models/user')
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  try {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
} catch (error) {
  return response.status(401).json({error: 'token invalid'})
}
}

module.exports = {
  tokenExtractor,
  userExtractor
  }
