import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        console.log('wrong credentials')
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    window.location.reload();

  }

  if (user === null) {
  return (
    <div>
      <div>
        <h2>Login</h2>
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
      <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App