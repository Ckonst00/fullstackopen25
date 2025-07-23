      
const BlogForm = ({
    blogTitle,
    blogAuthor,
    blogUrl,
    setBlogTitle,
    setBlogAuthor,
    setBlogUrl,
    handleNewBlog
    }) => {
    return (
        <div>
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
      </div>
    )}

export default BlogForm