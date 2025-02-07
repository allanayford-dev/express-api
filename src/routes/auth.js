const express = require('express')
const {
	register,
	login,
	refreshToken,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
	verifyUser,
} = require('../controllers/authController')

const { authenticateUser } = require('../middleware/authMiddleware')
const {
	validateRegistration,
	validateLogin,
} = require('../middleware/validateRequest')
const { loginLimiter } = require('../middleware/rateLimitMiddleware')

const router = express.Router()

// Route to register a new user
router.post('/register', validateRegistration, register)

// Route to login and receive a token in cookies
router.post('/login', loginLimiter, validateLogin, login)

// Route to refresh token
router.post('/refresh', refreshToken)

// Route to logout
router.post('/logout', logout)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password', resetPassword)

// Route to get user details
router.get('/me', authenticateUser, verifyUser)

router.get('/verify-email', verifyEmail)

// Protected route example
router.get('/protected', authenticateUser, (req, res) => {
	res.status(200).json({ message: 'Access granted', user: req.user })
})

module.exports = router
