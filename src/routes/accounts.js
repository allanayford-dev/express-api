const express = require('express')
const {
	addAccount,
	updateAccount,
	deleteAccount,
	setAccountInactive,
	setAccountActive,
	listAccounts,
} = require('../src/controllers/accountController')
const { authenticateUser } = require('../src/middleware/authMiddleware')

const router = express.Router()

router.post('/', authenticateUser, addAccount)
router.put('/:accountId', authenticateUser, updateAccount)
router.delete('/:accountId', authenticateUser, deleteAccount)

router.patch('/:accountId/inactive', authenticateUser, setAccountInactive)
router.patch('/:accountId/active', authenticateUser, setAccountActive)

router.get('/', listAccounts)

module.exports = router
