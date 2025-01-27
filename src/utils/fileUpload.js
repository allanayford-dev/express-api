const fs = require('fs')
const csv = require('csv-parser')
const db = require('../src/models')

const { Transaction, Account } = db

const normalizeAmount = (amount) => {
	if (typeof amount === 'string') {
		return (
			parseFloat(amount.replace(/[(),]/g, '')) * (amount.includes('(') ? -1 : 1)
		)
	}
	return amount
}

const parseDiscoverBankImport = async (filePath, userId, accountNumber) => {
	return new Promise((resolve, reject) => {
		const transactions = []
		let updatedCount = 0
		let insertedCount = 0
		const transactionPromises = [] // Store promises for async processing

		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', (row) => {
				transactionPromises.push(
					(async () => {
						try {
							const date = new Date(row['Value Date'])
							const description = row['Description'] || 'Unknown'
							const amount = normalizeAmount(row['Amount'])
							const type = row['Type']?.toLowerCase() || 'unknown'

							let transactionType
							if (type.includes('transfer')) {
								transactionType = 'transfer'
							} else if (amount > 0) {
								transactionType = 'income'
							} else {
								transactionType = 'expense'
							}

							// Ignore unknown transactions
							if (type.includes('unknown')) return

							const account = await Account.findOne({ accountNumber })
							if (!account) {
								throw new Error(`Account not found: ${accountNumber}`)
							}

							// ✅ Check if the transaction already exists
							const existingTransaction = await Transaction.findOne({
								date,
								amount,
								account: account._id,
							})

							if (existingTransaction) {
								// ✅ Preserve category & subCategory while updating only description & type
								await Transaction.updateOne(
									{ _id: existingTransaction._id },
									{
										description,
										type: transactionType, // ✅ Keep category/subCategory unchanged
									}
								)
								updatedCount++
								console.log(
									`🔄 Updated transaction: ${existingTransaction._id}`
								)
							} else {
								// ✅ Create a new transaction if not found
								transactions.push(
									new Transaction({
										user: userId,
										account: account._id,
										date,
										description,
										amount,
										category: 'Uncategorized', // Default category for new transactions
										subCategory: 'Uncategorized',
										type: transactionType,
									})
								)
								insertedCount++
							}
						} catch (error) {
							console.error(`❌ Error processing transaction row:`, error)
						}
					})()
				)
			})
			.on('end', async () => {
				try {
					// ✅ Wait for all async transactions to complete
					await Promise.all(transactionPromises)

					// ✅ Insert only new transactions
					if (transactions.length > 0) {
						await Transaction.insertMany(transactions)
						console.log(`✅ Inserted ${transactions.length} new transactions.`)
					} else {
						console.log(`✔ No new transactions to insert.`)
					}

					// ✅ Delete the file after processing
					fs.unlink(filePath, (err) => {
						if (err) {
							console.error(`❌ Error deleting file:`, err)
						} else {
							console.log(`🗑️  File deleted: ${filePath}`)
						}
					})

					resolve({
						inserted: insertedCount,
						updated: updatedCount,
						transactions,
					})
				} catch (error) {
					console.error(`❌ Error inserting transactions:`, error)
					reject({
						message: '❌ Error inserting transactions',
						error: error.message,
					})
				}
			})
			.on('error', (error) => {
				console.error(`❌ CSV Parse Error:`, error)
				reject(error)
			})
	})
}

module.exports = { parseDiscoverBankImport }
