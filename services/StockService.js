const StockCompany = require('../models').StockCompany

exports.addSymbol = async (symbol) => {
	try {
		const existingStock = await StockCompany.findOne({ symbol })

		if (existingStock) {
			const error = new Error('Symbol already exists')
			error.code = 11000
			throw error
		}

		const newStock = new StockCompany({ symbol })
		return await newStock.save()
	} catch (error) {
		throw error
	}
}
