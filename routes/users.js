const express = require('express')
const {
	addUser,
	updateUser,
	deleteUser,
	getUsers,
	getUser,
} = require('../controllers/userController')
const { authenticateUser } = require('../middleware/authMiddleware')

const router = express.Router()

// Route to add a user
router.post('/', authenticateUser, addUser)

// Route to update a user
router.put('/:userId', updateUser)

// Route to delete a user
router.delete('/:userId', deleteUser)

// Route to get all users
router.get('/', getUsers)

// Route to get a single user
router.get('/:userId', getUser)

module.exports = router
