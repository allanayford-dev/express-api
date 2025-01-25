const User = require('../../models').User

const currentUser = async (req, res) => {
	try {
		const userId = req.user.id
		const user = await User.findById(userId).select('-password')

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message })
	}
}

module.exports = currentUser
