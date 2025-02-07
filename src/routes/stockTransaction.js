// routes/StockTransactionRoutes.js
const express = require('express')
const StockTransactionController = require('../controllers/StockTransactionController')

const router = express.Router()

router.post('/', StockTransactionController.create)
router.get('/', StockTransactionController.getAll)
router.get('/portfolio', StockTransactionController.getPortfolio)

module.exports = router
