const cron = require('node-cron')
const dayjs = require('dayjs')
const getGlobalQuote = require('./alphavantage/global-quote')
const companyOverview = require('./alphavantage/company-overview')
const { StockCompany } = require('../models')

function startCronJobs() {
	cron.schedule('0 0 * * *', async () => {
		try {
			const sevenDaysAgo = dayjs().subtract(7, 'day').toDate()

			const recentCompany = await StockCompany.findOne({
				lastUpdated: { $gt: sevenDaysAgo },
			})

			if (!recentCompany) {
				console.log('No companies found updated within the last 7 days.')
				return
			}

			const { symbol } = recentCompany

			await getGlobalQuote(symbol)
		} catch (error) {
			console.error(
				'Error fetching stock companies updated within 7 days:',
				error
			)
		}
	})

	cron.schedule('0 0 * * *', async () => {
		try {
			const sevenDaysAgo = dayjs().subtract(7, 'day').toDate()

			const recentCompany = await StockCompany.findOne({
				lastUpdated: { $gt: sevenDaysAgo },
			})

			if (!recentCompany) {
				console.log('No companies found updated within the last 7 days.')
				return
			}

			const { symbol } = recentCompany

			await companyOverview(symbol)
		} catch (error) {
			console.error(
				'Error fetching stock companies updated within 7 days:',
				error
			)
		}
	})

	cron.schedule('* * * * *', () => {
		const dateTime = dayjs(new Date()).format('DD-MM-YYYY HH:mm:ss')
		console.log(dateTime)
	})
}

module.exports = startCronJobs
