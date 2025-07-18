const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
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


test('blog identifier is called id', async() => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  const blog = blogs[0]

  assert.ok(blog.id)
  assert.strictEqual(blog._id, undefined)
  
})

test('Adding blog via POST req', async() => {
  const newBlog = {
    title: 'Adding new blog',
    author: 'Mina Itse',
    url: 'http://www.iamaurl.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Adding new blog'))
})

test('likes default to zero', async() => {
  const newBlog = {
     title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  }

const response = await api
    .post('/api/blogs')
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
    .expect(400)

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
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


test('Deletion works', async () => {
  
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map(b => b.title);
  assert(!titles.includes(blogToDelete.title));
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
})

test('Update likes', async () => {
  const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 38,
  }

  const update = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  assert.strictEqual(update.body.likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
