const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
	{
		account: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Account',
			required: true,
		},
		date: { type: Date, required: true },
		time: { type: String, required: true },
		beneficiary: { type: String, required: true },
		amount: { type: Number, required: true },
		description: { type: String },
	},
	{ timestamps: true }
)

TransactionSchema.index(
	{ account: 1, date: 1, time: 1, beneficiary: 1, amount: 1 },
	{ unique: true }
)

const TransactionModel = mongoose.model('Transaction', TransactionSchema)

module.exports = TransactionModel