const logout = async (req, res) => {
	res.clearCookie('refreshToken', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'Strict',
	})
	res.status(200).json({ message: 'Logged out' })
}

module.exports = logout
