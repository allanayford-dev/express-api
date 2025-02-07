const repos = require('../repository')
const StockTransactionRepository = repos.StockTransaction

class StockTransactionService {
	async createStockTransaction(transactionData) {
		// Validate cash balance before withdrawal
		if (transactionData.action === 'Withdrawal') {
			const stockTransactions = await StockTransactionRepository.getAll()
			const cashBalance = stockTransactions
				.filter((t) => t.security === 'Cash')
				.reduce(
					(sum, t) => sum + (t.action === 'Deposit' ? t.total : -t.total),
					0
				)
			if (cashBalance < transactionData.total) {
				throw new Error('Insufficient cash balance')
			}
		}
		return await StockTransactionRepository.create(transactionData)
	}

	async getStockTransactions() {
		return await StockTransactionRepository.getAll()
	}

	async calculatePortfolio() {
		const stockTransactions = await StockTransactionRepository.getAll()
		let portfolio = {}

		stockTransactions.forEach((txn) => {
			if (txn.security !== 'Cash') {
				if (!portfolio[txn.security]) {
					portfolio[txn.security] = 0
				}
				portfolio[txn.security] += txn.quantity
			}
		})

		return Object.fromEntries(
			Object.entries(portfolio).filter(([_, qty]) => qty > 0)
		)
	}
}

module.exports = new StockTransactionService()
