describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST',  `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'testjester',
      name: 'Jest User',
      password: 'salasana'
    })

    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testjester')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Jest User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('sdfg g')
      cy.get('#password').type('fffffeeee')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testjester', password: 'salasana'})
    })

    it('A blog can be created', function() {
      cy.get('#new-blog').click()
      cy.get('#textbox-title').type('Writing witty titles')
      cy.get('#textbox-author').type('Barry Log')
      cy.get('#textbox-url').type('www.plokker.com/howtolog')

      cy.get('#create-blog').click()

      cy.contains('a new blog Writing witty titles by Barry Log')

      cy.reload()

      cy.contains('Writing witty titles Barry Log')
    })
  })

  describe('A blog can be liked', function() {
    beforeEach(function() {
      cy.login({ username: 'testjester', password: 'salasana'})
      cy.newBlog({
        title: 'Another blog cypress',
        author: 'Sam Ansung',
        url: 'www.samsung.com'
      })
    })

    it('liking a blog', function() {
      cy.get('#view-button').click()
      cy.contains('likes 0')
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

  })
})