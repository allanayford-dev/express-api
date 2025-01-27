const cron = require('node-cron')

function startCron() {
	console.log('⏳ Cron Jobs Initialized...')

	// Example Cron Job: Runs every minute
	cron.schedule('* * * * *', () => {
		console.log(`✅ Cron Job Executed at: ${new Date().toISOString()}`)
		// Call a function, API, or perform some task here
	})

	// Another Example: Runs every day at midnight
	cron.schedule('0 0 * * *', () => {
		console.log('🌙 Running a midnight cleanup task...')
		// Example: Cleanup old database records
	})

	// Add more cron jobs as needed
}

module.exports = { startCron }
