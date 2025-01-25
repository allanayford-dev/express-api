const jwt = require('jsonwebtoken')
const generateToken = require('./generateToken')
const User = require('../models').User

const loginHandler = async (req, res) => {
	const user = await User.findOne({ email: req.body.email })

	if (!user) {
		return res.status(404).json({ message: 'User not found' })
	}

	const isPasswordValid = await user.comparePassword(req.body.password)
	if (!isPasswordValid) {
		return res.status(401).json({ message: 'Invalid credentials' })
	}

	const token = generateToken(user)

	res
		.cookie('authToken', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 1000, // 1 hour
		})
		.status(200)
		.json({
			message: 'Login successful',
			user: {
				username: user.username,
				email: user.email,
			},
		})
}

module.exports = loginHandler
