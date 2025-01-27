const sanitize = (value) => {
	if (typeof value === 'string') {
		return value.replace(/[$.]/g, '') // Prevent NoSQL injection
	}
	return value
}

module.exports = sanitize
