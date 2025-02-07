class RAPIDYAHOOFINANCE {
	constructor() {
		this.baseUrl = 'https://yahoo-finance15.p.rapidapi.com/api'
		this.headers = {
			'x-rapidapi-key':
				'op://Development/RAPIDALPHAVANTAGE/Section_k3npnlkttd3267dn65zwgwclua/x-rapidapi-key',
			'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
		}
	}

	async GetQuotes(symbols) {
		const url = `${this.baseUrl}/v1/markets/stock/quotes?ticker=${symbols}`
		const options = {
			method: 'GET',
			headers: this.headers,
		}

		try {
			const response = await fetch(url, options)
			const result = await response.text()
			console.log(result)
			return result
		} catch (error) {
			console.error('Error fetching quote:', error)
		}
	}

	async GetProfile(symbol) {
		const url = `${this.baseUrl}/v1/markets/stock/modules?ticker=${symbol}&module=asset-profile';`
		const options = {
			method: 'GET',
			headers: this.headers,
		}

		try {
			const response = await fetch(url, options)
			const result = await response.text()
			console.log(result)
			return result
		} catch (error) {
			console.error('Error fetching quote:', error)
		}
	}
}

module.exports = RAPIDYAHOOFINANCE
