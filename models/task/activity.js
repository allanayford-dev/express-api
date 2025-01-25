const mongoose = require('mongoose')

const TaskActivitySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			enum: [
				'Development',
				'Testing',
				'Release Testing',
				'Documentation',
				'Planning',
				'Test Case Creation',
				'Spec Review',
				'Meeting',
				'Other',
			],
			required: true,
			unique: true,
		},
	},
	{
		timeStamps: true,
	}
)
module.exports = mongoose.model('TaskActivity', TaskActivitySchema)
