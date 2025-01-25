const db = require('../../models')
const { User } = db
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
	const { username, email, password } = req.body

	if (!username || !email || !password) {
		return res.status(400).json({ message: 'All fields are required' })
	}

	try {
		const existingUser = await User.findOne({
			$or: [{ username }, { email }],
		})
		if (existingUser) {
			const field = existingUser.email === email ? 'email' : 'username'
			return res.status(400).json({ message: `${field} already registered` })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		})

		const accessToken = jwt.sign(
			{ id: newUser.id },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		)

		const refreshToken = jwt.sign(
			{ id: newUser.id },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '7d' }
		)

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Strict',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		})

		res.status(201).json({ accessToken })
	} catch (error) {
		console.error('Registration error:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = register
