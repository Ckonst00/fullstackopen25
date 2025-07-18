require('dotenv').config()

const PORT = process.env.MONGODB_URI

const MONGODB_URI = process.env.PORT.NODE_ENV === 'test'
? process.env.TEST_MOLNGODB_URI
: process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }