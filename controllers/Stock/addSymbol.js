const { addSymbol: saveStockSymbol } = require('../../services/StockService')

const addSymbol = async (req, res) => {
	try {
		const { symbol } = req.body

		if (!symbol) {
			return res.status(400).json({ error: 'Symbol is required!' })
		}

		const savedStock = await saveStockSymbol(symbol)

		res
			.status(201)
			.json({ message: 'Stock symbol added successfully', data: savedStock })
	} catch (error) {
		if (error.code === 11000) {
			return res.status(400).json({ error: 'Symbol already exists' })
		}

		console.error('Error adding stock symbol:', error.message)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

module.exports = addSymbol
