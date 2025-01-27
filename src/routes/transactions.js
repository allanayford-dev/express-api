const express = require('express')
const { authenticateUser } = require('../middleware/authMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const {
	generateReport,
	uploadTransactions,
	listTransactions,
} = require('../controllers/transactionController')

const router = express.Router()

router.post('/upload', authenticateUser, uploadMiddleware, (req, res) => {
	console.log('🟢 Handling upload in route')

	if (!req.file) {
		return res.status(400).json({ error: 'No file uploaded' })
	}

	uploadTransactions(req, res) // Proceed to your controller
})
router.get('/report/:period', authenticateUser, generateReport)
router.get('/', authenticateUser, listTransactions)

module.exports = router
