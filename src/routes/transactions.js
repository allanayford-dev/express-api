const express = require('express')
const { authenticateUser } = require('../src/middleware/authMiddleware')
const uploadMiddleware = require('../src/middleware/uploadMiddleware')
const {
	generateReport,
	uploadTransactions,
	listTransactions,
} = require('../src/controllers/transactionController')

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
