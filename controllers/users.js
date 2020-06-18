const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
	const body = req.body
	if(!(body.username && body.username.length > 3 && body.password && body.password.length > 3)){
		return res.status(400).send({error: 'Username and password must be longer than 3 characters!'})
	}

	if(!(body.email)){
		return res.status(400).send({error: 'Must provide email address!'})
	}

	const passwordHash = await bcrypt.hash(body.password, 8)

	const user = new User({
		username: body.username,
		name: body.name,
		email: body.email,
		passwordHash
	})

	const savedUser = await user.save()

	res.json(savedUser.toJSON())
})

module.exports = userRouter