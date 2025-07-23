import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const SuccessNotification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div className='success' style={{ color: 'green' }}>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div className='error' style={{ color: 'red' }}>
      {message}
    </div>
  )
}
const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => { setErrorMessage('') }, 4000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    window.location.reload();

  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      await blogService.create(blogObject)
      setMessage(`a new blog ${blogTitle} by ${blogAuthor}`)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setTimeout(() => { setMessage('') }, 3000)

    } catch (exception) {
      setErrorMessage('Adding a new blog failed')
      setTimeout(() => { setErrorMessage('') }, 4000)
    }

  }
  if (user === null) {
    return (
      <div>
        <div>
          <h2>Login</h2>
          <ErrorNotification message={errorMessage} />
          <form onSubmit={handleLogin}>
            <div>
              Username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={message} />
      <ErrorNotification message={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:<input type='text' value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} />
        </div>
        <div>
          author: <input type='text' value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} />
        </div>
        <div>
          url: <input type='text' value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App