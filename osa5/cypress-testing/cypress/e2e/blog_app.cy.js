describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testjester',
      name: 'Jest User',
      password: 'salasana'
    })

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testjester')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sdfg g')
      cy.get('#password').type('fffffeeee')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
})