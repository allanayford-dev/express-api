const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
	{
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		dueDate: { type: Date, required: true },
		urgency: { type: Boolean, required: true, default: false },
		importance: { type: Boolean, required: true, default: false },
		calculatedPriority: {
			type: Number,
			default: 0,
		},
		status: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'TaskStatus',
			required: true,
		},
		activityType: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'TaskActivity',
			required: true,
		},
	},
	{
		timeStamps: true,
	}
)
module.exports = mongoose.model('Task', TaskSchema)
