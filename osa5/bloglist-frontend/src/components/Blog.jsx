import React, { useState } from "react";
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


const like = async () => {
  try {
    const updatedBlog = {
      id: blog.id,
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    console.log("Sending to backend:", updatedBlog);

    await blogService.setLike(updatedBlog);
    setLikes(likes + 1);
  } catch (error) {
    console.error('Error liking blog:', error.response?.data || error.message);
  }
};

  const informationVisible = () => {
    
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
          <div>likes {likes}<button onClick={like}>like</button></div>
          <div>{blog.user?.name || "Unknown user"}</div>
        </div>
      </div>

    )
  }


  return (
    <div>
      {informationVisible()}
    </div>  
  );
};

export default Blog;
