const jwt = require('jsonwebtoken')
const User = require('../models').User

const verifyToken = async (req, res, next) => {
	try {
		const token =
			req.cookies?.authToken || req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res
				.status(401)
				.json({ message: 'Unauthorized: No token provided' })
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized: Invalid or expired token' })
	}
}

module.exports = verifyToken
