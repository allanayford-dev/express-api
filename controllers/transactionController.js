const db = require('../models')
const { parseDiscoverBankImport } = require('../utils/fileUpload')
const { getDateRange } = require('../utils/dateUtils')
const { Account, Transaction } = db

const uploadTransactions = async (req, res) => {
	try {


		const { bankName, accountNumber } = req.body
		if (!req.file) {
			return res.status(400).json({ message: 'Missing file upload' })
		}
		if (!bankName) {
			return res.status(400).json({ message: 'Bank name is required' })
		}
		if (!accountNumber) {
			return res.status(400).json({ message: 'Account number is required' })
		}

		const account = await Account.findOne({ accountNumber })
		if (!account) {
			return res.status(404).json({ message: 'Account not found' })
		}

		let transactions

		switch (bankName.toLowerCase()) {
			case 'discoverybank':
				transactions = await parseDiscoverBankImport(
					req.file.path,
					account.user,
					accountNumber
				)
				break
			case 'nedbank':
				return res.status(400).json({ message: 'Not Implemented' })
			case 'capotecbank':
				return res.status(400).json({ message: 'Not Implemented' })
			case 'firstnationalbank':
				return res.status(400).json({ message: 'Not Implemented' })
			default:
				return res.status(400).json({ message: 'Unsupported bank' })
		}
		res
			.status(201)
			.json({ message: 'File processed successfully', transactions })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error processing file', error: error.message })
	}
}

const generateReport = async (req, res) => {
	try {
		let period = req.params.period || 'yearly'
		if (!['monthly', 'quarterly', 'yearly'].includes(period)) {
			return res.status(400).json({ message: 'Invalid period' })
		}

		const { startDate, endDate } = getDateRange(period)

		const transactions = await Transaction.find({
			date: { $gte: startDate, $lte: endDate },
		})

		const report = transactions.reduce((acc, transaction) => {
			if (!acc[transaction.category]) {
				acc[transaction.category] = { income: 0, expense: 0 }
			}
			acc[transaction.category][transaction.type] += transaction.amount
			return acc
		}, {})

		res.json({ period, startDate, endDate, report })
	} catch (error) {
		res.status(500).json({ message: 'Error generating report', error })
	}
}

const listTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.find()
		res.status(200).json({ transactions })
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving transactions', error })
	}
}

module.exports = { generateReport, uploadTransactions, listTransactions }
