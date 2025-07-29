import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleLike }) => {

  const [visible, setVisible] = useState(false)
  const [blogOwner, setBlogOwner] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  useEffect(() => {
    if (blog.user && user && blog.user.username === user.username) {
      setBlogOwner(true)
    }
  }, [blog.user, user])

  const onLike = async () => {
    if (handleLike) {
      handleLike(blog)
    } else {
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

  const defaultView =
        <div style={hideWhenVisible}>
          <div>{blog.title} {blog.author} <button id='view-button' onClick={() => setVisible(true)}>view</button></div>
        </div>

  const infoView =
      <div style={showWhenVisible} data-testid='info-view'>
        <div>{blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {likes}<button id='like-button' onClick={onLike}>like</button></div>
        <div>{blog.user?.name || 'Unknown user'}</div>
        {blogOwner && (
          <button id='remove-button' onClick={() => handleDelete(blog.id, blog.title, blog.author)}>remove</button>
        )}
      </div>

  return (
    <div style={blogStyle}>
      {visible ? infoView : defaultView}
    </div>
  )



}

export default Blog
