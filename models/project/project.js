const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rollupPriority: {
			type: Number,
			default: 0,
		},
		startDate: {
			type: Date,
			default: null,
		},
		endDate: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Project', ProjectSchema)
