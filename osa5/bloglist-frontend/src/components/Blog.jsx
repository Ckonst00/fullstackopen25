import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {

  const [visible, setVisible] = useState(false)
  const [blogOwner, setBlogOwner] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  useEffect(() => {
    if (blog.user && user && blog.user.username === user.username) {
      setBlogOwner(true)
    }
  }, [blog.user, user])
  const handleLike = async () => {
    try {
      const updatedBlog = {
        id: blog.id,
        user: blog.user.id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }


      await blogService.setLike(updatedBlog)
      setLikes(likes + 1)
    } catch (error) {
      console.error('Error liking blog:', error.response?.data || error.message)
    }
  }

  const handleDelete =  (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      blogService.remove(id)
    }
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button></div>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {likes}<button onClick={handleLike}>like</button></div>
        <div>{blog.user?.name || 'Unknown user'}</div>
        {blogOwner && (
          <button onClick={() => handleDelete(blog.id, blog.title, blog.author)}>remove</button>
        )}
      </div>
    </div>
  )



}

export default Blog
