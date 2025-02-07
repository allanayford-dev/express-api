const service = require('../services')
const StockTransactionService = service.StockTransaction

class StockTransactionController {
	async create(req, res) {
		try {
			const transaction = await StockTransactionService.createStockTransaction(
				req.body
			)
			res.status(201).json(transaction)
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		const stockTransactions =
			await StockTransactionService.getStockTransactions()
		res.json(stockTransactions)
	}

	async getPortfolio(req, res) {
		try {
			const portfolio = await StockTransactionService.calculatePortfolio()
			res.json(portfolio)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = new StockTransactionController()
