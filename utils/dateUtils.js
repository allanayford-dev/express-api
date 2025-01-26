const getDateRange = (period) => {
	const now = new Date()
	let startDate,
		endDate = new Date()

	if (period === 'monthly') {
		startDate = new Date(now.getFullYear(), now.getMonth(), 1)
	} else if (period === 'quarterly') {
		const quarter = Math.floor(now.getMonth() / 3)
		startDate = new Date(now.getFullYear(), quarter * 3, 1)
	} else if (period === 'yearly') {
		startDate = new Date(now.getFullYear(), 0, 1)
	}

	return { startDate, endDate }
}

module.exports = {
	getDateRange,
}
