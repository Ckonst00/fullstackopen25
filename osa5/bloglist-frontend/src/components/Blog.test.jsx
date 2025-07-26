import { render, screen, cleanup } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import BlogForm from './NewBlogForm'
import { useState } from 'react'

const user = {
  username: 'Rhonda',
  name: 'Abriaham Homme',
  id: 'ai43kf3idasf9j0e3'
}

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Carl Wilson',
  url: 'www.khakhi.com',
  likes: 2,
  user
}
test('render only blog title and author', () => {

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('Component testing is done with react-testing-library Carl Wilson')
  expect(element).toBeDefined()

})

test('render the whole blog content', async () => {

  render(<Blog blog={blog} user={user} />)

  const userClick = userEvent.setup()
  const viewButton = screen.getByRole('button', { name: 'view' })
  await userClick.click(viewButton)

  expect(screen.getByText(blog.url)).toBeInTheDocument()
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
  expect(screen.getByText(blog.user.name)).toBeInTheDocument()
})

test('like button is pressed twice', async () => {

  const mockHandler = vi.fn()
  const userClick = userEvent.setup()

  render(<Blog blog={blog} user={user} handleLike={mockHandler} />)

  const viewButton = screen.getByRole('button', { name: 'view' })
  await userClick.click(viewButton)

  const likeButton = screen.getByRole('button', { name: 'like' })
  await userClick.click(likeButton)
  await userClick.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)

})



test('blogform works', async () => {

  const user = userEvent.setup()
  const handleNewBlog = vi.fn()

  const Wrapper = () => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    return (
      <BlogForm
        blogTitle={blogTitle}
        setBlogTitle={setBlogTitle}
        blogAuthor={blogAuthor}
        setBlogAuthor={setBlogAuthor}
        blogUrl={blogUrl}
        setBlogUrl={setBlogUrl}
        handleNewBlog={(event) => {
          event.preventDefault()
          handleNewBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
          })
        }}
      />
    )
  }

  const { container } = render(<Wrapper />)

  const titleInput = container.querySelector('#textbox-title')
  const authorInput = container.querySelector('#textbox-author')
  const urlInput = container.querySelector('#textbox-url')

  await user.type(titleInput, 'Component testing is done with react-testing-library')
  await user.type(authorInput, 'Carl Wilson')
  await user.type(urlInput, 'www.webss.com')

  const createButton = screen.getByRole('button', { name: /create/i })
  await user.click(createButton)

  expect(handleNewBlog).toHaveBeenCalledTimes(1)
  expect(handleNewBlog.mock.calls[0][0]).toEqual({
    title: 'Component testing is done with react-testing-library',
    author: 'Carl Wilson',
    url: 'www.webss.com'
  })
})