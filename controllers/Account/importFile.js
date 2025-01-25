const db = require('../../models')
const { Account, Transaction } = db

const importFile = async (req, res) => {
	const { file, accountNo } = req.body

	try {
		if (!file || !accountNo) {
			return res
				.status(400)
				.json({ message: 'File path and account no are required.' })
		}

		let account = await Account.findOne({ accountNo })
		if (!account) {
			account = await AccountModel.create({
				accountNo,
				accountName: `Account ${accountNo}`,
			})
		}

		const filePath = path.resolve(file)
		const data = await readJSONFile(filePath)

		const result = []
		for (const transaction of data) {
			try {
				transaction.account = account._id
				const inserted = await Transaction.create(transaction)
				result.push(inserted)
			} catch (err) {
				if (err.code !== 11000) {
					// Ignore duplicate key errors
					console.error('Error inserting transaction:', transaction, err)
				}
			}
		}

		res.status(200).json({
			message: 'Data imported successfully.',
			insertedCount: result.length,
		})
	} catch (error) {
		console.error('Error importing data:', error)
		res
			.status(500)
			.json({ message: 'Failed to import data.', error: error.message })
	}
}

module.exports = importFile
