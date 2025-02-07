const db = require('../models')
const RefreshToken = db.RefreshToken

class RefreshTokenRepository {
	async storeRefreshToken(userId, token) {
		await RefreshToken.create({ userId, token })
	}

	async isRefreshTokenValid(token) {
		const tokenRecord = await RefreshToken.findOne({ token })
		return !!tokenRecord
	}

	async revokeRefreshToken(token) {
		await RefreshToken.deleteOne({ token })
	}
}

module.exports = new RefreshTokenRepository()