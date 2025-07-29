describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testjester',
      name: 'Jest User',
      password: 'salasana'
    })

    cy.visit('http://localhost:5173')
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

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testjester')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
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
})