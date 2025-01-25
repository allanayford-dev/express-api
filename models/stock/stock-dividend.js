const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dividendInfoSchema = new Schema({
	stockCompany: {
		type: Schema.Types.ObjectId,
		ref: 'StockCompany', // Reference to the StockCompany model
		required: true,
	},
	dividendPerShare: {
		type: String,
	},
	dividendYield: {
		type: String,
	},
	dividendDate: {
		type: Date,
	},
	exDividendDate: {
		type: Date,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('DividendInfo', dividendInfoSchema)
