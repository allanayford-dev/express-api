const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
	accountNo: { type: String, unique: true, required: true },
	accountName: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
})

const AccountModel = mongoose.model('Account', AccountSchema)

module.exports = AccountModel
