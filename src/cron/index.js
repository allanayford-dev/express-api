const cron = require('node-cron')
const ALPHAVANTAGE = require('../classes/alpha-vantage')
const stockOverview = require('../models/Stock/stock-overview')
const { sample } = require('lodash')

function startCron() {
	console.log('⏳ Cron Jobs Initialized...')

	// Another Example: Runs every day at midnight
	cron.schedule('0 * * * *', async () => {
		const api = new ALPHAVANTAGE()
		const symbol = sample(['IBM'])

		console.log(`Running Stock Overview Update: ${symbol}`)

		try {
			const stockData = await api.GetOverview(symbol)
			if (stockData && !stockData.Information) {
				await stockOverview.findOneAndUpdate({ symbol }, stockData, {
					upsert: true,
					new: true,
				})
				console.log(`Updated stock overview for ${symbol}`)
			} else {
				console.error(
					`Error: Invalid API Key or API Limit Reached. Message: ${stockData.Information}`
				)
			}
		} catch (error) {
			console.log(`Error updating stock overview for ${symbol}:`, error)
		}
	})

	// Add more cron jobs as needed
}

module.exports = { startCron }
