const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const api = supertest(app)


describe('user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.init()
  })

  test('succeeds with valid username and password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'lotofwords',
      name: 'Big Word',
      password: 'enoughchars',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))

  })

  test('Invalid password does not go through', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
        username: 'abcdeffffff',
        name: "Alpha Bets",
        password: 'a'
    }

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('Invalid username does not go through', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
        username: 'ab',
        name: "Abdd",
        password: 'dfsfa'
    }

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})

after(async () => {
    await mongoose.connection.close()
})