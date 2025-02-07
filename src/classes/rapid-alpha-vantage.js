
class RAPIDALPHAVANTAGE {
	constructor() {
		this.baseUrl = 'https://alpha-vantage.p.rapidapi.com/query?'
		this.datatype = 'json'
		this.headers = {
			'x-rapidapi-key':
				'op://Development/RAPIDALPHAVANTAGE/Section_k3npnlkttd3267dn65zwgwclua/x-rapidapi-key',
			'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
		}
	}

	async GetQuote(symbol) {
		const func = 'GLOBAL_QUOTE' // Renamed from function
		const url = `${this.baseUrl}function=${func}&symbol=${symbol}&datatype=${this.datatype}`
		const options = {
			method: 'GET',
			headers: this.headers,
		}

		try {
			const response = await fetch(url, options)
			const result = await response.json() // Convert response to JSON
			console.log(result)
			return result
		} catch (error) {
			console.error('Error fetching quote:', error)
		}
	}
}

module.exports = RAPIDALPHAVANTAGE
