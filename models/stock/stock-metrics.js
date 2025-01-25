const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockMetricsSchema = new Schema({
	stockCompany: {
		type: Schema.Types.ObjectId,
		ref: 'StockCompany', // Reference to the StockCompany model
		required: true,
	},
	analystTargetPrice: {
		type: String,
	},
	analystRatingStrongBuy: {
		type: Number,
	},
	analystRatingBuy: {
		type: Number,
	},
	analystRatingHold: {
		type: Number,
	},
	analystRatingSell: {
		type: Number,
	},
	analystRatingStrongSell: {
		type: Number,
	},
	priceToSalesRatioTTM: {
		type: String,
	},
	priceToBookRatio: {
		type: String,
	},
	beta: {
		type: String,
	},
	'52WeekHigh': {
		type: String,
	},
	'52WeekLow': {
		type: String,
	},
	'50DayMovingAverage': {
		type: String,
	},
	'200DayMovingAverage': {
		type: String,
	},
	sharesOutstanding: {
		type: String,
	},
	trailingPE: {
		type: String,
	},
	forwardPE: {
		type: String,
	},
	evToRevenue: {
		type: String,
	},
	evToEBITDA: {
		type: String,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('StockMetrics', stockMetricsSchema)
