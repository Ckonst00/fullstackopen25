const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)

})

blogRouter.post('/', middleware.userExtractor,  middleware.tokenExtractor, async (request, response, next) => {
  try {
    const body = request.body

    const user = request.user

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
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    blog.likes = request.body.likes

    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }
})


blogRouter.delete('/:id', middleware.userExtractor, middleware.tokenExtractor, async (request, response, next) => {
  
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'Only the authorized user can delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'Malformed ID' });
    }
    next(error)
  }
})

module.exports = blogRouter