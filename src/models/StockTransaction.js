const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
	{
		date: { type: Date, required: true, default: Date.now },
		security: { type: String, required: true }, // 'Cash' or Stock Symbol
		action: {
			type: String,
			enum: ['Deposit', 'Withdrawal', 'Buy', 'Sell', 'Drip', 'Dividends'],
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			validate: function (value) {
				if (['Buy', 'Sell'].includes(this.action) && !Number.isInteger(value)) {
					throw new Error(
						'Buy and Sell stockTransactions must have integer quantities'
					)
				}
			},
		},
		price: {
			type: Number,
			required: true,
			min: 0,
			max: 9999999,
			set: (v) => parseFloat(v.toFixed(2)),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)

transactionSchema.virtual('total').get(function () {
	return this.quantity * this.price
})

const StockTransaction = mongoose.model('StockTransaction', transactionSchema)
module.exports = StockTransaction
