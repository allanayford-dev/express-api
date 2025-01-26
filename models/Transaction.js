const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['income', 'expense', 'transfer'],
		required: true,
	},
	amount: { type: Number, required: true },
	category: { type: String, required: true },
	date: { type: Date, required: true },
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
		required: true,
	},
})

module.exports = mongoose.model('Transaction', transactionSchema)
