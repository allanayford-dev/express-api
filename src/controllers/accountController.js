const db = require('../models')
const sanitize = require('../utils/sanitize')
const { Account } = db

const addAccount = async (req, res) => {
	try {
		const { accountNumber, accountName, bankName } = req.body
		const userId = req.user.userId

		if (!userId || !accountNumber || !accountName) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const existingAccount = await Account.findOne({
			accountNumber: sanitize(accountNumber),
			bankName: sanitize(bankName),
		})
		if (existingAccount) {
			return res.status(400).json({
				message: 'Account with this number already exists for the bank',
			})
		}

		const newAccount = new Account({
			user: userId,
			accountNumber,
			accountName,
			bankName: bankName || null,
			isActive: true,
		})
		await newAccount.save()
		res
			.status(201)
			.json({ message: 'Account created successfully', account: newAccount })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error creating account', error: error.message })
	}
}

const updateAccount = async (req, res) => {
	try {
		const { accountId } = req.params
		const updates = req.body

		if (updates.accountNumber || updates.bankName) {
			return res
				.status(400)
				.json({ message: 'Account number and bank name cannot be updated' })
		}
		if (updates.accountName && updates.accountName.trim() === '') {
			return res.status(400).json({ message: 'Account name cannot be empty' })
		}

		const allowedUpdates = ['accountName']
		const sanitizedUpdates = {}
		for (const key of Object.keys(req.body)) {
			if (allowedUpdates.includes(key)) {
				sanitizedUpdates[key] = sanitize(req.body[key])
			}
		}

		const updatedAccount = await Account.findByIdAndUpdate(
			accountId,
			sanitizedUpdates,
			{ new: true }
		)
		if (!updatedAccount)
			return res.status(404).json({ message: 'Account not found' })

		res.status(200).json({
			message: 'Account updated successfully',
			account: updatedAccount,
		})
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error updating account', error: error.message })
	}
}

const deleteAccount = async (req, res) => {
	try {
		const { accountId } = req.params
		const sanitizedAccountId = sanitize(accountId)
		const deletedAccount = await Account.findByIdAndDelete(sanitizedAccountId)

		if (!deletedAccount)
			return res.status(404).json({ message: 'Account not found' })

		res.status(200).json({ message: 'Account deleted successfully' })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error deleting account', error: error.message })
	}
}

const setAccountInactive = async (req, res) => {
	try {
		const { accountId } = req.params
		const sanitizedAccountId = sanitize(accountId)
		const updatedAccount = await Account.findByIdAndUpdate(
			sanitizedAccountId,
			{ isActive: true },
			{ new: true }
		)
		if (!updatedAccount)
			return res.status(404).json({ message: 'Account not found' })

		res
			.status(200)
			.json({ message: 'Account set to inactive', account: updatedAccount })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error updating account status', error: error.message })
	}
}

const setAccountActive = async (req, res) => {
	try {
		const { accountId } = req.params
		const updatedAccount = await Account.findByIdAndUpdate(
			accountId,
			{ isActive: true },
			{ new: true }
		)
		if (!updatedAccount)
			return res.status(404).json({ message: 'Account not found' })

		res
			.status(200)
			.json({ message: 'Account set to active', account: updatedAccount })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error updating account status', error: error.message })
	}
}

const listAccounts = async (req, res) => {
	try {
		const accounts = await Account.find()
		res.status(200).json({ accounts })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error retrieving accounts', error: error.message })
	}
}

module.exports = {
	addAccount,
	updateAccount,
	deleteAccount,
	setAccountInactive,
	setAccountActive,
	listAccounts,
}
