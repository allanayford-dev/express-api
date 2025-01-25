const generateToken = require('./generateToken')
const loginHandler = require('./loginHandler')
const verifyToken = require('./verifyToken')

module.exports = {
	verifyToken,
	loginHandler,
	generateToken,
}
