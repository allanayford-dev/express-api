const express = require('express')
const router = express.Router()

router.post('/import', importFile)

module.exports = router
