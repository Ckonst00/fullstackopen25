import React, { useState } from "react";


const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

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
          <div>likes {blog.likes}<button>like</button></div>
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
