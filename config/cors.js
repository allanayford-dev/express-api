const { HOST, PORT, NODE_ENV } = require('./index')

const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:3001',
	`http://${HOST}:${PORT}`,
	'http://localhost:8963',
	'http://127.0.0.1:3001',
	'http://127.0.0.1:3000',
	'https://express-api-c0r1.onrender.com', // Removed trailing slash
	'https://nextjs-frontend-xbkq.onrender.com', // Removed trailing slash
]

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}

module.exports = corsOptions
