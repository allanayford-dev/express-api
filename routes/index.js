const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const transactionsRoutes = require('./transactions')
const usersRoutes = require('./users')
const accountsRoutes = require('./accounts')

router.use('/accounts', accountsRoutes)
router.use('/auth', authRoutes)
router.use('/transactions', transactionsRoutes)
router.use('/users', usersRoutes)

module.exports = router
