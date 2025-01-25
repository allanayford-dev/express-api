const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const stockRoutes = require('./stocks')

router.use('/auth', authRoutes)
router.use('/stocks', stockRoutes)

module.exports = router
