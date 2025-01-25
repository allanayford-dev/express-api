const addSymbol = require('./Stock/addSymbol')
const login = require('./Auth/login')
const logout = require('./Auth/logout')
const refresh = require('./Auth/refresh')
const register = require('./Auth/register')
const currentUser = require('./Auth/currentUser')
const importFile = require('./Account/importFile')

module.exports = {
	Stock: {
		addSymbol,
	},
	Auth: {
		login,
		logout,
		refresh,
		register,
		currentUser,
	},
	Account: {
		importFile,
	},
}
