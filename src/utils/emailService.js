const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.EMAIL_USER, // Use environment variables for security
		pass: process.env.EMAIL_PASS,
	},
})

async function sendVerificationEmail(email, token) {
	const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Verify Your Email',
		html: `<p>Please verify your email by clicking the link below:</p>
               <a href="${verificationUrl}">Verify Email</a>`,
	}

	await transporter.sendMail(mailOptions)
}

module.exports = sendVerificationEmail
