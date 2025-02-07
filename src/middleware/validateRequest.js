const validator = require('validator')

const validateRegistration = (req, res, next) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).json({ message: 'Missing required fields.' })
	}
	req.body.email = validator.normalizeEmail(email)

	if (!validator.isStrongPassword(password, { minLength: 8 })) {
		return res.status(400).json({ message: 'Weak password' })
	}

	next()
}

const validateLogin = (req, res, next) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).json({ message: 'Missing required fields.' })
	}
	req.body.email = validator.normalizeEmail(email)
	next()
}

module.exports = { validateRegistration, validateLogin }
