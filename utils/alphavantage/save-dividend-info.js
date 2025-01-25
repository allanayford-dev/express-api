const db = require('../../models')
const { StockCompany, StockDividend } = db

async function saveDividendInfo(dividendInfo) {
	try {
		let stockCompany = await StockCompany.findOne({
			symbol: dividendInfo.Symbol,
		}).select('_id')

		if (!stockCompany) {
			console.log('Stock company not found.')
			return
		}

		const updatedDividendInfo = await StockDividend.findOneAndUpdate(
			{
				stockCompany: stockCompany._id,
			},
			{
				dividendPerShare: dividendInfo.DividendPerShare,
				dividendYield: dividendInfo.DividendYield,
				dividendDate: new Date(dividendInfo.DividendDate),
				exDividendDate: new Date(dividendInfo.ExDividendDate),
				lastUpdated: new Date(),
			},
			{
				new: true,
				upsert: true,
			}
		)

		if (updatedDividendInfo) {
			console.log('Dividend info saved or updated successfully.')
		} else {
			console.log('No dividend info found for update.')
		}
	} catch (error) {
		console.error('Error saving or updating dividend info:', error)
	}
}

module.exports = saveDividendInfo
