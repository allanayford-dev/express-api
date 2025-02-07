const db = require('../models')
const StockTransaction = db.StockTransaction

class StockTransactionRepository {
	async create(transactionData) {
		return await StockTransaction.create(transactionData)
	}

	async getAll() {
		return await StockTransaction.find()
	}

	async getById(id) {
		return await StockTransaction.findById(id)
	}

	async deleteById(id) {
		return await StockTransaction.findByIdAndDelete(id)
	}
}

module.exports = new StockTransactionRepository()
