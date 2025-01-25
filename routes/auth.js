const express = require('express')
const { verifyToken } = require('../middleware')
const { login, logout, refresh, register, currentUser } =
	require('../controllers').Auth
const router = express.Router()

router.get('/me', verifyToken, currentUser)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refresh', refresh)
router.post('/register', register)

module.exports = router
