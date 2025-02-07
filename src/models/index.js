const mongoose = require('mongoose')

const db = {}

db.Mongoose = mongoose

db.RefreshToken = require('./RefreshToken')
db.User = require('./User')

db.StockTransaction = require('./StockTransaction')
db.Transaction = require('./Transaction')
db.Category = require('./Category')
db.Account = require('./Account')

module.exports = db
