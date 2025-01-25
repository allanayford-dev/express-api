const mongoose = require('mongoose')
const { DB_URL } = require('./index')

async function dbConnect() {
	const dbName = require('../package.json').name
	try {
		await mongoose.connect(DB_URL, {
			dbName: dbName,
			serverSelectionTimeoutMS: 5000,
		})
		console.log(`Connected to MongoDB: ${dbName}`)
	} catch (error) {
		console.log('Failed to connect to MongoDB', error)
	}

	mongoose.connection.on('connected', () => {
		console.log('Mongoose connected to db...')
	})

	mongoose.connection.on('error', (err) => {
		console.log(err.message)
	})

	mongoose.connection.on('disconnected', () => {
		console.log('Mongoose connection is disconnected...')
	})

	process.on('SIGINT', async () => {
		console.log('Closing server gracefully...')
		await dbConnect.close()
		process.exit(0)
	})
}

module.exports = dbConnect
