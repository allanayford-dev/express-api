const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockFinancialsSchema = new Schema({
	stockCompany: {
		type: Schema.Types.ObjectId,
		ref: 'StockCompany', 
		required: true,
	},
	marketCapitalization: {
		type: String,
	},
	revenueTTM: {
		type: String,
	},
	grossProfitTTM: {
		type: String,
	},
	ebitda: {
		type: String,
	},
	eps: {
		type: String,
	},
	profitMargin: {
		type: String,
	},
	operatingMarginTTM: {
		type: String,
	},
	returnOnAssetsTTM: {
		type: String,
	},
	returnOnEquityTTM: {
		type: String,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('StockFinancials', stockFinancialsSchema)
