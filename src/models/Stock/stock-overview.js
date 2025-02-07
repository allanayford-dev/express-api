const mongoose = require('mongoose')

const AnalystRatingsSchema = new mongoose.Schema(
	{
		strongBuy: { type: Number },
		buy: { type: Number },
		hold: { type: Number },
		sell: { type: Number },
		strongSell: { type: Number },
	},
	{ _id: false }
)

const StockOverviewSchema = new mongoose.Schema(
	{
		symbol: { type: String, required: true, unique: true, index: true },
		assetType: { type: String },
		name: { type: String },
		description: { type: String },
		cik: { type: String },
		exchange: { type: String },
		currency: { type: String },
		country: { type: String },
		sector: { type: String },
		industry: { type: String },
		address: { type: String },
		officialSite: { type: String },
		fiscalYearEnd: { type: String },
		latestQuarter: { type: Date },
		marketCapitalization: { type: Number },
		ebitda: { type: Number },
		peRatio: { type: Number },
		pegRatio: { type: Number },
		bookValue: { type: Number },
		dividendPerShare: { type: Number },
		dividendYield: { type: Number },
		eps: { type: Number },
		revenuePerShareTTM: { type: Number },
		profitMargin: { type: Number },
		operatingMarginTTM: { type: Number },
		returnOnAssetsTTM: { type: Number },
		returnOnEquityTTM: { type: Number },
		revenueTTM: { type: Number },
		grossProfitTTM: { type: Number },
		dilutedEPSTTM: { type: Number },
		quarterlyEarningsGrowthYOY: { type: Number },
		quarterlyRevenueGrowthYOY: { type: Number },
		analystTargetPrice: { type: Number },
		analystRatings: { type: AnalystRatingsSchema },
		trailingPE: { type: Number },
		forwardPE: { type: Number },
		priceToSalesRatioTTM: { type: Number },
		priceToBookRatio: { type: Number },
		evToRevenue: { type: Number },
		evToEBITDA: { type: Number },
		beta: { type: Number },
		fiftyTwoWeekHigh: { type: Number },
		fiftyTwoWeekLow: { type: Number },
		fiftyDayMovingAverage: { type: Number },
		twoHundredDayMovingAverage: { type: Number },
		sharesOutstanding: { type: Number },
		dividendDate: { type: Date },
		exDividendDate: { type: Date },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('StockOverview', StockOverviewSchema)
