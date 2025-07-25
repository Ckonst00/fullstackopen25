import PropTypes from 'prop-types'

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

BlogForm.propTypes = {
  blogTitle: PropTypes.string.isRequired,
  blogAuthor: PropTypes.string.isRequired,
  blogUrl: PropTypes.string.isRequired,
  handleNewBlog: PropTypes.func.isRequired
}
export default BlogForm