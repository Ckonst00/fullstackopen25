const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://aleksikaurila:${password}@blogcluster0.ptg0mud.mongodb.net/blogApp?retryWrites=true&w=majority&appName=BlogCluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  content: 'HTML is easy',
  important: true,
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})