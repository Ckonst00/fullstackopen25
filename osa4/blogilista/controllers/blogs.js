const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)

})

blogRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    if (
      error.name === 'ValidationError' ||
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {

  try {
  const body = await Blog.findById(request.params.id)

  body.likes = blog.likes

  const updatedLikes = await blog.save()
  response.status(201).json(updatedLikes)
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({error: error.message})
    }
  }

})

module.exports = blogRouter