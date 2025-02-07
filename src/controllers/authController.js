const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendVerificationEmail = require('../utils/emailService')

const db = require('../models')
const repos = require('../repository')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config')
const RefreshTokenRepository = require('../repository/RefreshTokenRepository')

class AuthController {
	constructor() {
		this.User = db.User
		this.Mongoose = db.Mongoose
	}

	async register(req, res) {
		try {
			let { name, email, password: userPassword } = req.body

			if (!name || !email || !userPassword) {
				return res.status(400).json({
					message: 'Invalid Fields Error',
					error: 'Missing required fields.',
				})
			}

			email = validator.normalizeEmail(email)

			const existingUser = await this.User.findOne({ email })
			if (existingUser) {
				return res
					.status(400)
					.json({ message: 'Duplication Error', error: 'User already exists.' })
			}

			const hashedPassword = await bcrypt.hash(userPassword, 10)
			const verificationToken = crypto.randomBytes(32).toString('hex')

			const newUser = new this.User({
				name,
				email,
				password: hashedPassword,
				isVerified: false,
				verificationToken,
			})
			const savedUser = await newUser.save()

			const { password, ...userWithoutPassword } = savedUser.toObject()

			await sendVerificationEmail(email, verificationToken)

			res.status(201).json({
				message: 'User registered successfully. Please verify your email.',
			})
		} catch (error) {
			console.error('Error registering user: ', error.message)
			res.status(500).json({
				message: 'Server error',
				error: error.message,
			})
		}
	}

	async login(req, res) {
		try {
			let { email, password: userPassword } = req.body

			if (!email || !userPassword) {
				return res.status(400).json({
					message: 'Invalid Fields Error',
					error: 'Missing required fields.',
				})
			}

			email = validator.normalizeEmail(email)

			const user = await this.User.findOne({ email })
			if (!user) {
				return res.status(400).json({
					message: 'Not Found Error',
					error: 'Invalid email or password',
				})
			}

			if (!user.isVerified) {
				return res
					.status(403)
					.json({ message: 'Please verify your email before logging in.' })
			}

			const isMatch = await bcrypt.compare(userPassword, user.password)
			if (!isMatch) {
				return res.status(400).json({
					message: 'Invalid Password',
					error: 'Invalid email or password',
				})
			}

			if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
				throw new Error('JWT secrets are not set in the environment variables.')
			}

			const token = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
				expiresIn: '1h',
			})

			const refreshToken = jwt.sign(
				{ userId: user._id },
				REFRESH_TOKEN_SECRET,
				{ expiresIn: '7d' }
			)

			if (token && refreshToken) {
				await repos.RefreshToken.storeRefreshToken(user._id, refreshToken)

				res.cookie('token', token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'Lax',
					maxAge: 3600000,
				})

				res.cookie('refreshToken', refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'Lax',
					maxAge: 604800000,
				})
			}

			const { password, ...userWithoutPassword } = user.toObject()

			res.status(200).json({
				message: 'Login successful',
				user: userWithoutPassword,
			})
		} catch (error) {
			console.log('Error logging in user: ', error.message)
			res.status(500).json({
				message: 'Server error',
				error: error.message,
			})
		}
	}

	async refreshToken(req, res) {
		try {
			if (!req.cookies?.refreshToken) {
				return res.status(401).json({
					message: 'Unauthorized',
					error: 'No refresh token provided.',
				})
			}
			const { refreshToken } = req.cookies

			const isTokenValid = await repos.RefreshToken.isRefreshTokenValid(
				refreshToken
			)
			if (!isTokenValid) {
				return res.status(403).json({
					message: 'Unauthorized',
					error: 'Invalid refresh token.',
				})
			}

			jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
				if (err || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
					return res.status(403).json({
						message: 'Unauthorized',
						error: 'Invalid refresh token.',
					})
				}

				res.clearCookie('refreshToken')

				const newToken = jwt.sign(
					{
						userId: decoded.userId,
					},
					ACCESS_TOKEN_SECRET,
					{
						expiresIn: '1h',
					}
				)

				res.cookie('token', newToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'Lax',
					maxAge: 3600000,
				})

				res.status(200).json({ message: 'Token refreshed successfully' })
			})
		} catch (error) {
			console.log('Error refreshing token: ', error.message)
			res.status(500).json({
				message: 'Server error',
				error: error.message,
			})
		}
	}

	async logout(req, res) {
		try {
			const { refreshToken } = req.cookies

			if (!refreshToken) {
				return res.status(400).json({ message: 'No active session found.' })
			}

			const tokenRecord = await repos.RefreshToken.findOne({
				token: refreshToken,
			})
			if (!tokenRecord) {
				return res.status(400).json({ message: 'Invalid refresh token.' })
			}

			await repos.RefreshToken.deleteMany({ userId: tokenRecord.user })

			res.clearCookie('token')
			res.clearCookie('refreshToken')
			res
				.status(200)
				.json({ message: 'Logged out successfully from all devices.' })
		} catch (error) {
			console.log('Error logging out: ', error.message)
			res.status(500).json({
				message: 'Server error',
				error: error.message,
			})
		}
	}

	async verifyEmail(req, res) {
		try {
			const { token } = req.query
			const user = await User.findOne({ verificationToken: token })

			if (!user) {
				return res.status(400).json({ message: 'Invalid verification token.' })
			}

			user.isVerified = true
			user.verificationToken = null
			await user.save()

			res
				.status(200)
				.json({ message: 'Email verified successfully. You can now log in.' })
		} catch (error) {
			res.status(500).json({ message: 'Server error', error: error.message })
		}
	}
}

module.exports = new AuthController()
