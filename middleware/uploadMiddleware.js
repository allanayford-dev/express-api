const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const uploadPath = path.join(__dirname, '../uploads')

// ✅ Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
	fs.mkdirSync(uploadPath, { recursive: true })
}

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// console.log('📂 Saving file to:', uploadPath)
		cb(null, uploadPath)
	},
	filename: (req, file, cb) => {
		if (!file) {
			// console.error('❌ Filename function called with undefined file')
			return cb(new Error('File is missing'))
		}
		const filename = Date.now() + '-' + file.originalname
		// console.log('📝 Generated Filename:', filename)
		cb(null, filename)
	},
})

// ✅ Initialize Multer and Pass It Correctly
const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB file size limit
	},
})

// ✅ Middleware Wrapper
const uploadMiddleware = (req, res, next) => {
	upload.single('file')(req, res, function (err) {
		if (err) {
			// console.error('❌ Multer Error:', err)
			return res
				.status(500)
				.json({
					success: false,
					message: 'File upload failed',
					details: err.message,
				})
		}
		if (!req.file) {
			// console.error('❌ No file received in request')
			return res
				.status(400)
				.json({ success: false, message: 'No file uploaded' })
		}

		// console.log('✅ File uploaded successfully:', req.file)
		next()
	})
}

module.exports = uploadMiddleware
