const mongoose = require('mongoose')

const TaskStatusSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			required: true,
			unique: true,
			enum: [
				'New',
				'In Progress',
				'Under Review',
				'Blocked',
				'On Hold',
				'Awaiting Feedback',
				'Paused',
				'Completed',
				'Removed',
			],
		},
		description: {
			type: String,
		},
		group: {
			type: String,
			required: true,
			enum: ['New', 'In Progress', 'Done'],
		},
	},
	{
		timeStamps: true,
	}
)
module.exports = mongoose.model('TaskStatus', StatusSchema)
