class ALPHAVANTAGE {
	constructor() {
		this.baseUrl = 'https://www.alphavantage.co/query?'
		this.apiKey = 'demo'
		this.datatype = 'json'
	}

	async GetOverview(symbol) {
		const func = 'OVERVIEW'
		const url = `${this.baseUrl}function=${func}&symbol=${symbol}&datatype=${this.datatype}&apikey=${this.apiKey}`
		const options = {
			method: 'GET',
			headers: {
			},
		}

		try {
			const response = await fetch(url, options)

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}

			const result = await response.json() // Convert response to JSON
			console.log(result)
			return result
		} catch (error) {
			console.error('Error fetching quote:', error)
		}
	}
}

module.exports = ALPHAVANTAGE
