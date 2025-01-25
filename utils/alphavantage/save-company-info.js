const StockCompany = require('../../models').StockCompany

async function saveCompanyInfo(companyInfo) {
	try {
		const updatedCompany = await StockCompany.findOneAndUpdate(
			{
				symbol: companyInfo.Symbol,
			},
			{
				companyName: companyInfo.Name,
				description: companyInfo.Description,
				exchange: companyInfo.Exchange,
				sector: companyInfo.Sector,
				industry: companyInfo.Industry,
				country: companyInfo.Country,
				address: companyInfo.Address,
				officialSite: companyInfo.OfficialSite,
				lastUpdated: new Date(),
			},
			{
				new: true,
				upsert: true,
			}
		)

		if (updatedCompany) {
			console.log('Company data saved or updated successfully.')
		} else {
			console.log('No company data found for update.')
		}
	} catch (error) {
		console.error('Error saving or updating company data:', error)
	}
}

module.exports = saveCompanyInfo
