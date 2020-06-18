const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const unique = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		minlength: 3
	},
	name: {
		type: String,
		minlength: 3
	},
	email: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	entries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Entry'
	}]
})

userSchema.plugin(unique)

userSchema.set('toJSON', {
	transform: (document, ro) => {
		ro.id = ro._id.toString()
		delete ro._id
		delete ro.__v
		delete passwordHash
	}
})

module.exports = mongoose.model('User', userSchema)