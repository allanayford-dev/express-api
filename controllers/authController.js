const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config')

// User registration
const register = async (req, res) => {
	try {
		const { name, email, password } = req.body
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = new User({ name, email, password: hashedPassword })
		const savedUser = await newUser.save()

		const { password: _, ...userWithoutPassword } = savedUser.toObject()
		res.status(201).json({
			message: 'User registered successfully',
			user: userWithoutPassword,
		})
	} catch (error) {
		res.status(500).json({ message: 'Error registering user', error })
	}
}

// User login with cookies
const login = async (req, res) => {
	try {
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' })
		}

		const token = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
			expiresIn: '1h',
		})
		const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, {
			expiresIn: '7d',
		})

		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 3600000,
		})
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 604800000,
		})

		const { password: _, ...userWithoutPassword } = user.toObject()
		res
			.status(200)
			.json({ message: 'Login successful', user: userWithoutPassword })
	} catch (error) {
		res.status(500).json({ message: 'Error logging in', error: error.message })
	}
}

// Refresh token
const refreshToken = async (req, res) => {
	try {
		if (!req.cookies?.refreshToken) {
			return res
				.status(401)
				.json({ message: 'Unauthorized: No refresh token provided' })
		}
		const { refreshToken } = req.cookies

		jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res
					.status(403)
					.json({ message: 'Forbidden: Invalid refresh token' })
			}

			res.clearCookie('refreshToken')

			const newToken = jwt.sign(
				{ userId: decoded.userId },
				ACCESS_TOKEN_SECRET,
				{ expiresIn: '1h' }
			)
			res.cookie('token', newToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 3600000,
			})

			res.status(200).json({ message: 'Token refreshed successfully' })
		})
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error refreshing token', error: error.message })
	}
}
// Logout user
const logout = async (req, res) => {
	try {
		res.clearCookie('token')
		res.clearCookie('refreshToken')
		res.status(200).json({ message: 'Logged out successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Error logging out', error })
	}
}

module.exports = { register, login, refreshToken, logout }
