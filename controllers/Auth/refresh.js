const refresh = async (req, res) => {
	const refreshToken = req.cookies.refreshToken

	if (!refreshToken) {
		return res.status(401).json({ message: 'No refresh token provided' })
	}

	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
		const accessToken = jwt.sign(
			{ id: decoded.id },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '15m',
			}
		)

		res.json({ accessToken })
	} catch (err) {
		res.status(403).json({ message: 'Invalid refresh token' })
	}
}

module.exports = refresh
