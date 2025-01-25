const mongoose = require('mongoose')

const db = {}

db.mongoose = mongoose

db.StockCompany = require('./stock/stock-company')
db.StockFinancials = require('./stock/stock-financials')
db.StockDividend = require('./stock/stock-dividend')
db.StockMetrics = require('./stock/stock-metrics')
db.StockPrices = require('./stock/stock-prices')

db.User = require('./user/user')

db.Account = require('./account/account')
db.Transaction = require('./transaction/transaction')

module.exports = db
