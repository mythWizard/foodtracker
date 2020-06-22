const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const entrySchema = mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	amount: Number,
	units: String,
	calories: Number,
	carbs: Number,
	fiber: Number,
	sugars: Number,
	protein: Number,
	fat: Number,
	saturated: Number,
	monounsaturated: Number,
	polyunsaturated: Number,
	trans: Number,
	sodium: Number,
	date: {
		type: Date,
		default: Date.now
	},
	meal: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

entrySchema.set('toJSON', {
	transform: (document, ro) => {
		ro.id = ro._id
		delete ro._id
		delete ro.__v
	}
})

module.exports = mongoose.model('Entry', entrySchema)