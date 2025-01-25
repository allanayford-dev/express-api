const db = require('../../models')
const { StockCompany, StockMetrics } = db

async function saveStockMetrics(stockMetrics) {
	try {
		let stockCompany = await StockCompany.findOne({
			symbol: stockMetrics.Symbol,
		}).select('_id')

		if (!stockCompany) {
			console.log('Stock company not found.')
			return
		}

		const updatedMetrics = await StockMetrics.findOneAndUpdate(
			{
				stockCompany: stockCompany._id,
			},
			{
				analystTargetPrice: stockMetrics.AnalystTargetPrice,
				analystRatingStrongBuy: stockMetrics.AnalystRatingStrongBuy,
				analystRatingBuy: stockMetrics.AnalystRatingBuy,
				analystRatingHold: stockMetrics.AnalystRatingHold,
				analystRatingSell: stockMetrics.AnalystRatingSell,
				analystRatingStrongSell: stockMetrics.AnalystRatingStrongSell,
				priceToSalesRatioTTM: stockMetrics.PriceToSalesRatioTTM,
				priceToBookRatio: stockMetrics.PriceToBookRatio,
				beta: stockMetrics.Beta,
				'52WeekHigh': stockMetrics['52WeekHigh'],
				'52WeekLow': stockMetrics['52WeekLow'],
				'50DayMovingAverage': stockMetrics['50DayMovingAverage'],
				'200DayMovingAverage': stockMetrics['200DayMovingAverage'],
				sharesOutstanding: stockMetrics.SharesOutstanding,
				trailingPE: stockMetrics.TrailingPE,
				forwardPE: stockMetrics.ForwardPE,
				evToRevenue: stockMetrics.EVToRevenue,
				evToEBITDA: stockMetrics.EVToEBITDA,
				lastUpdated: new Date(),
			},
			{
				new: true,
				upsert: true,
			}
		)

		if (updatedMetrics) {
			console.log('Stock metrics saved or updated successfully.')
		} else {
			console.log('No stock metrics found for update.')
		}
	} catch (error) {
		console.error('Error saving or updating stock metrics:', error)
	}
}

module.exports = saveStockMetrics
