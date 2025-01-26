const jwt = require('jsonwebtoken')


const authenticateUser = (req, res, next) => {
	const token = req.cookies.token
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized: No token provided' })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (error) {
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
