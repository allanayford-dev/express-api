const { ALPHAVANTAGE_APIKEY } = require('../../config')
const saveCompanyInfo = require('./save-company-info')
const saveDividendInfo = require('./save-dividend-info')
const saveFinancialInfo = require('./save-financial-info')
const saveStockMetrics = require('./save-stock-metrics')

async function companyOverview(SYMBOL) {
	const BaseUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${SYMBOL}&apikey=${ALPHAVANTAGE_APIKEY}`

	try {
		const response = await fetch(BaseUrl)

		if (!response.ok) {
			throw new Error(`Status: ${response.statusText}`)
		}

		const data = await response.json()

		if (data.Symbol) {
			await saveCompanyInfo({
				Symbol: data.Symbol,
				Name: data.Name,
				Description: data.Description,
				Exchange: data.Exchange,
				Sector: data.Sector,
				Industry: data.Industry,
				Country: data.Country,
				Address: data.Address,
				OfficialSite: data.OfficialSite,
			})

			await saveFinancialInfo({
				Symbol: data.Symbol,
				MarketCapitalization: data.MarketCapitalization,
				RevenueTTM: data.RevenueTTM,
				GrossProfitTTM: data.GrossProfitTTM,
				EBITDA: data.EBITDA,
				EPS: data.EPS,
				ProfitMargin: data.ProfitMargin,
				OperatingMarginTTM: data.OperatingMarginTTM,
				ReturnOnAssetsTTM: data.ReturnOnAssetsTTM,
				ReturnOnEquityTTM: data.ReturnOnEquityTTM,
			})

			await saveStockMetrics({
				Symbol: data.Symbol,
				AnalystTargetPrice: data.AnalystTargetPrice,
				AnalystRatingStrongBuy: data.AnalystRatingStrongBuy,
				AnalystRatingBuy: data.AnalystRatingBuy,
				AnalystRatingHold: data.AnalystRatingHold,
				AnalystRatingSell: data.AnalystRatingSell,
				AnalystRatingStrongSell: data.AnalystRatingStrongSell,
				PriceToSalesRatioTTM: data.PriceToSalesRatioTTM,
				PriceToBookRatio: data.PriceToBookRatio,
				Beta: data.Beta,
				'52WeekHigh': data['52WeekHigh'],
				'52WeekLow': data['52WeekLow'],
				'50DayMovingAverage': data['50DayMovingAverage'],
				'200DayMovingAverage': data['200DayMovingAverage'],
				SharesOutstanding: data.SharesOutstanding,
				TrailingPE: data.TrailingPE,
				ForwardPE: data.ForwardPE,
				EVToRevenue: data.EVToRevenue,
				EVToEBITDA: data.EVToEBITDA,
			})

			await saveDividendInfo({
				Symbol: data.Symbol,
				DividendPerShare: data.DividendPerShare,
				DividendYield: data.DividendYield,
				DividendDate: data.DividendDate,
				ExDividendDate: data.ExDividendDate,
			})

			console.log('Saving Data')
		} else {
			throw new Error('No data found in the response')
		}
	} catch (error) {
		console.error({ error })
		throw new Error(error.message)
	}
}

module.exports = companyOverview
