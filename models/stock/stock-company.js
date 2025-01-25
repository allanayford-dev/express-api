const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockCompanySchema = new Schema({
	symbol: {
		type: String,
		required: true,
		unique: true,
	},
	companyName: {
		type: String,
	},
	description: {
		type: String,
	},
	exchange: {
		type: String,
	},
	sector: {
		type: String,
	},
	industry: {
		type: String,
	},
	country: {
		type: String,
	},
	address: {
		type: String,
	},
	officialSite: {
		type: String,
	},
	currency: {
		type: String,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('StockCompany', stockCompanySchema)