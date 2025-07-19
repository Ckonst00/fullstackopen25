const blogRouter = require('express').Router()
//const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)

})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.userId)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {

  try {
    const blog = await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'Malformed ID' });
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