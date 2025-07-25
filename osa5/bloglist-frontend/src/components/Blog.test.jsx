import { render, screen, cleanup } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'


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

    render(<Blog blog={blog} user={user}/>)

    const element = screen.getByText('Component testing is done with react-testing-library Carl Wilson')
    expect(element).toBeDefined()

}) 

test('render the whole blog content', async () => {

    render(<Blog blog={blog} user={user}/>)

    const userClick = userEvent.setup()
    const viewButton = screen.getByRole('button', { name: 'view' })
    await userClick.click(viewButton)

    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
    expect(screen.getByText(blog.user.name)).toBeInTheDocument()
})