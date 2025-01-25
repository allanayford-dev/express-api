const { HOST, PORT, NODE_ENV } = require('./index')

const allowedOrigins = [`http://${HOST}:${PORT}`, 'http://localhost:8963']

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'), false)
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}

const corsTesting = {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}

module.exports = NODE_ENV === 'development' ? corsTesting : corsOptions
