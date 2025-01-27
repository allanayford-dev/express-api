const express = require('express')
const {
	register,
	login,
	refreshToken,
	logout,
} = require('../src/controllers/authController')
const { authenticateUser } = require('../src/middleware/authMiddleware')
const { verifyUser } = require('../src/controllers/userController')

const router = express.Router()

// Route to register a new user
router.post('/register', register)

// Route to login and receive a token in cookies
router.post('/login', login)

// Route to refresh token
router.post('/refresh', refreshToken)

// Route to logout
router.post('/logout', logout)

// Route to get user details
router.get('/me', authenticateUser, verifyUser)

// Protected route example
router.get('/protected', authenticateUser, (req, res) => {
	res.status(200).json({ message: 'Access granted', user: req.user })
})

module.exports = router
