const { ALPHAVANTAGE_APIKEY } = require('../../config')
const db = require('../../models')
const StockPrices = db.StockPrices
const StockCompany = db.StockCompany

async function getGlobalQuote(SYMBOL) {
	const BaseUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${SYMBOL}&apikey=${ALPHAVANTAGE_APIKEY}`

	try {
		const response = await fetch(BaseUrl)

		if (!response.ok) {
			throw new Error(`Status: ${response.statusText}`)
		}

		const data = await response.json()

		if (data['Global Quote']) {
			const {
				'01. symbol': symbol,
				'02. open': open,
				'03. high': high,
				'04. low': low,
				'05. price': price,
				'06. volume': volume,
				'07. latest trading day': latestTradingDay,
				'08. previous close': previousClose,
				'09. change': change,
				'10. change percent': changePercent,
			} = data['Global Quote']

			const latestTradingDate = new Date(latestTradingDay)

			let stockCompany = await StockCompany.findOne({ symbol })

			if (!stockCompany) {
				console.log(`Stock company with symbol ${symbol} not found.`)
				return
			}

			const stockPrice = new StockPrices({
				stockCompany: stockCompany._id,
				open: parseFloat(open),
				high: parseFloat(high),
				low: parseFloat(low),
				price: parseFloat(price),
				volume: parseInt(volume, 10),
				latestTradingDay: latestTradingDate,
				previousClose: parseFloat(previousClose),
				change: parseFloat(change),
				changePercent,
				lastUpdated: new Date(),
			})

			await stockPrice.save()
			console.log('Stock price saved successfully.')
		} else {
			throw new Error('No data found in the response')
		}
	} catch (error) {
		console.error({ error })
		throw new Error(error.message)
	}
}

module.exports = getGlobalQuote;
