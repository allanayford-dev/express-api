const db = require('../../models')
const { StockCompany, StockFinancials } = db

async function saveFinancialInfo(financialInfo) {
	try {
		let stockCompany = await StockCompany.findOne({
			symbol: financialInfo.Symbol,
		}).select('_id')

		if (!stockCompany) {
			console.log('Stock company not found.')
			return
		}

		const updatedCompany = await StockFinancials.findOneAndUpdate(
			{
				stockCompany: stockCompany._id,
			},
			{
				marketCapitalization: financialInfo.MarketCapitalization,
				revenueTTM: financialInfo.RevenueTTM,
				grossProfitTTM: financialInfo.GrossProfitTTM,
				ebitda: financialInfo.EBITDA,
				eps: financialInfo.EPS,
				profitMargin: financialInfo.ProfitMargin,
				operatingMarginTTM: financialInfo.OperatingMarginTTM,
				returnOnAssetsTTM: financialInfo.ReturnOnAssetsTTM,
				returnOnEquityTTM: financialInfo.ReturnOnEquityTTM,
				lastUpdated: new Date(),
			},
			{
				new: true,
				upsert: true,
			}
		)

		if (updatedCompany) {
			console.log('Financial data saved or updated successfully.')
		} else {
			console.log('No financial data found for update.')
		}
	} catch (error) {
		console.error('Error saving or updating financial data:', error)
	}
}

module.exports = saveFinancialInfo
