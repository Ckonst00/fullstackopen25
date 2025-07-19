const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { response } = require("../app");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
  next()
}
