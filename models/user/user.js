const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
			minlength: [3, 'Username must be at least 3 characters long'],
			maxlength: [20, 'Username cannot exceed 20 characters'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			match: [/.+@.+\..+/, 'Please enter a valid email address'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: [6, 'Password must be at least 6 characters long'],
		},
		profilePictureUrl: {
			type: String,
			default: null,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
)

// userSchema.pre('save', async function (next) {
// 	if (this.isModified('password')) {
// 		this.password = await bcrypt.hash(this.password, 10)
// 	}
// 	next()
// })

// userSchema.methods.comparePassword = async function (candidatePassword) {
// 	return bcrypt.compare(candidatePassword, this.password)
// }

const User = mongoose.model('User', userSchema)

module.exports = User
