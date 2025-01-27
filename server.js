const express = require('express')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const { PORT, NODE_ENV, HOST } = require('./src/config')
const corsOptions = require('./src/config/cors')
const cspConfig = require('./src/config/content-security-policy')
const dbConnect = require('./src/config/db')

const { startCron } = require('./src/cron')

const app = express()

// Middleware
app.use(helmet())
app.use(helmet.contentSecurityPolicy(cspConfig))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (NODE_ENV === 'development') {
	app.use(morgan('short'))
}

// Root route
app.get('/', (req, res) => {
	res.send({ message: `Welcome Home! Running in ${NODE_ENV} mode` })
})

app.use('/api', require('./src/routes'))

// Database connection
dbConnect()

// 404 Error handler
app.use((req, res, next) => {
	res.status(404).json({ error: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(err.status || 500).json({
		success: false,
		message: err.message || 'Internal Server Error',
	})
})

startCron()

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://${HOST}:${PORT} in ${NODE_ENV} mode`)
})
