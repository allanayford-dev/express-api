const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../config')

const authenticateUser = (req, res, next) => {
	console.log('📥 Cookies received in /auth/me:', req.cookies) // ✅ Debugging

	const token = req.cookies?.token
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized: No token provided' })
	}

	try {
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		console.error('🚨 JWT Verification Error:', error.message)
		res.status(401).json({ message: 'Unauthorized: Invalid token' })
	}
}

const authorizeAdmin = (req, res, next) => {
	if (!req.user || req.user.role !== 'admin') {
		return res.status(403).json({ message: 'Forbidden: Admin access required' })
	}
	next()
}

module.exports = { authenticateUser, authorizeAdmin }
