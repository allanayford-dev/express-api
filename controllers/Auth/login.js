const User = require('../../models').User
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
	const { identifier, password } = req.body

	if (!identifier || !password) {
		return res.status(400).json({
			message: 'Identifier (username or email) and password are required',
		})
	}

	try {
		const user = await User.findOne({
			$or: [{ username: identifier }, { email: identifier }],
		})
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const passwordValid = await bcrypt.compare(password, user.password)
		if (!passwordValid) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const accessToken = jwt.sign(
			{ id: user.id },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '15m', // Short-lived
			}
		)

		const refreshToken = jwt.sign(
			{ id: user.id },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: '7d', // Longer lifespan
			}
		)

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // Secure in production
			sameSite: 'Strict', // Prevent CSRF
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		})

		res.status(200).json({
			accessToken,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		})
	} catch (error) {
		console.error('Login error:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = login
