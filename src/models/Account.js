const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	accountNumber: { type: String, required: true, unique: true },
	accountName: { type: String, required: true },
	bankName: { type: String, default: null },
	isActive: { type: Boolean, default: true },
	createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Account', accountSchema)
