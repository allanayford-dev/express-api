const { HOST, PORT, NODE_ENV } = require('./index')

const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:3001',
	`http://${HOST}:${PORT}`,
	'http://localhost:8963',
	'http://127.0.0.1:3001',
	'http://127.0.0.1:3000',
	'https://express-api-c0r1.onrender.com/',
	'https://nextjs-frontend-xbkq.onrender.com/',
]

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'), false)
		}
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}

const corsTesting = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'), false)
		}
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}

module.exports = NODE_ENV === 'development' ? corsTesting : corsOptions
