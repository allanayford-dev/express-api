module.exports = {
	directives: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'", 'https://cdn.jsdelivr.net/'],
		styleSrc: [
			"'self'",
			'https://fonts.googleapis.com',
			'https://cdn.jsdelivr.net',
		],
		fontSrc: [
			"'self'",
			'https://fonts.gstatic.com', // Allow fonts from Google Fonts
		],
		// Add other necessary directives based on your needs
	},
}
