const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')
const sanitize = require('../utils/sanitize')
const mongoose = require('mongoose')

// Add a new user
const addUser = async (req, res) => {
	try {
		const { name, email, password } = req.body
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const existingUser = await User.findOne({ email: sanitize(email) })

		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = new User({ name, email, password: hashedPassword })
		await newUser.save()

		res
			.status(201)
			.json({ message: 'User created successfully', user: newUser })
	} catch (error) {
		console.log(error)
		res
			.status(500)
			.json({ message: 'Error creating user', error: error.message })
	}
}

// Update a user
const updateUser = async (req, res) => {
	const allowedUpdates = ['name', 'email']
	const sanitizedUpdates = {}

	try {
		const { userId } = req.params

		for (const key of Object.keys(req.body)) {
			if (allowedUpdates.includes(key)) {
				sanitizedUpdates[key] = sanitize(req.body[key])
			}
		}

		const updatedUser = await User.findByIdAndUpdate(userId, sanitizedUpdates, {
			new: true,
		})
		if (!updatedUser) return res.status(404).json({ message: 'User not found' })

		res
			.status(200)
			.json({ message: 'User updated successfully', user: updatedUser })
	} catch (error) {
		res.status(500).json({ message: 'Error updating user', error })
	}
}

// Delete a user
const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).json({ message: 'Invalid user ID' })
		}

		const deletedUser = await User.findByIdAndDelete(userId)
		if (!deletedUser) return res.status(404).json({ message: 'User not found' })

		res.status(200).json({ message: 'User deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Error deleting user', error })
	}
}

// Get all users
const getUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password')
		res.status(200).json({ users })
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving users', error })
	}
}

// Get a single user
const getUser = async (req, res) => {
	try {
		const { userId } = req.params

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).json({ message: 'Invalid user ID' })
		}

		const user = await User.findById(userId).select('-password')
		if (!user) return res.status(404).json({ message: 'User not found' })

		res.status(200).json({ user })
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving user', error })
	}
}

// Verify user
const verifyUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('-password')
		if (!user) return res.status(404).json({ message: 'User not found' })

		res.status(200).json({ message: 'User verified', user })
	} catch (error) {
		res.status(500).json({ message: 'Error verifying user', error })
	}
}

module.exports = {
	addUser,
	updateUser,
	deleteUser,
	getUsers,
	getUser,
	verifyUser,
}
