const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const api = supertest(app)
process.env.SECRET = 'testsecret'
let token
beforeEach(async () => {
  await User.deleteMany({})
  const userPassword = await bcrypt.hash('passaworde', 10)
  const userObject = new User({
    username: "testuser",
    name: "jest user",
    passwordHash: userPassword
  })
  await userObject.save()

  const response = await api
    .post('/api/login')
    .send({ username: "testuser", password: "passaworde" })

  token = `Bearer ${response.body.token}`


  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


test('blog identifier is called id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  const blog = blogs[0]

  assert.ok(blog.id)
  assert.strictEqual(blog._id, undefined)

})

test('Adding blog via POST req', async () => {

  const newBlog = {
    title: 'Adding new blog',
    author: 'Mina Itse',
    url: 'http://www.iamaurl.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Adding new blog'))
})

test('likes default to zero', async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})


test('Blog with missing title is not added', async () => {
  const newBlog = {
    author: 'Evander Ceer',
    url: 'https://www.findtitle.com/whereismytitle',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('Blog with missing url is not added', async () => {
  const newBlog = {
    title: 'Url missing',
    author: 'nicholas galikoli',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


test('Deletion works', async () => {

  const exampleBlog = {
    title: "Initial statement",
    author: 'Isulym Ausce',
    url: 'https://www.asdf.com',
    likes: 5
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(exampleBlog)
    .expect(201)

  await api
    .delete(`/api/blogs/${response.body.id}`)
    .set('Authorization', token)
    .expect(204);
})

test('Update likes', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 38,
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)


  const updatedBlog = {
    ...newBlog,
    likes: 99, 
  }

  const update = await api
    .put(`/api/blogs/${response.body.id}`)
    .send(updatedBlog)
    .expect(200)

  assert.strictEqual(update.body.likes, updatedBlog.likes)

})

after(async () => {
  await mongoose.connection.close()
})
