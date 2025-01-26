const fs = require('fs')
const csv = require('csv-parser')
const db = require('../models')

const { Transaction, Account } = db

// Convert amount format properly
const normalizeAmount = (amount) => {
	if (typeof amount === 'string') {
		return (
			parseFloat(amount.replace(/[(),]/g, '')) * (amount.includes('(') ? -1 : 1)
		)
	}
	return amount
}

// Parse CSV for Discover Bank
const parseDiscoverBankImport = async (filePath, userId, accountNumber) => {
	const transactions = []
	return new Promise((resolve, reject) => {
		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', async (row) => {
				const date = new Date(row['Value Date'])
				const description = row['Description'] || 'Unknown'
				const amount = normalizeAmount(row['Amount'])
				const type = row['Type']?.toLowerCase() || 'unknown'

				// Ignore transfers and unknown transactions
				if (type.includes('transfer') || type.includes('unknown')) return

				// Find the correct account based on account number
				const account = await Account.findOne({ accountNumber })
				if (!account) {
					return reject(new Error('Account not found'))
				}

				// Assign category manually for now
				const category = amount > 0 ? 'Income' : 'Expense'
				const subCategory = 'General'
				const transactionType = amount > 0 ? 'income' : 'expense'

				transactions.push(
					new Transaction({
						user: userId,
						account: account._id,
						date,
						description,
						amount,
						category,
						subCategory,
						type: transactionType,
					})
				)
			})
			.on('end', async () => {
				await Transaction.insertMany(transactions)
				await Account.findByIdAndUpdate(account._id, {
					$push: { transactions: { $each: transactions } },
				})
				resolve(transactions)
			})
			.on('error', reject)
	})
}

module.exports = { parseDiscoverBankImport }
