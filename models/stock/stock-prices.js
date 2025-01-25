const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockPricesSchema = new Schema({
	stockCompany: {
		type: Schema.Types.ObjectId,
		ref: 'StockCompany',
		required: true,
	},
	open: {
		type: Number,
	},
	high: {
		type: Number,
	},
	low: {
		type: Number,
	},
	price: {
		type: Number,
	},
	volume: {
		type: Number,
	},
	latestTradingDay: {
		type: Date, // Store as Date
	},
	previousClose: {
		type: Number,
	},
	change: {
		type: Number,
	},
	changePercent: {
		type: String, // Store as string because it contains the '%' sign
	},
	lastUpdated: {
		type: Date,
		default: Date.now, // Automatically set to the current date
	},
})

module.exports = mongoose.model('StockPrices', stockPricesSchema)
