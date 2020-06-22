const entryRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Entry = require('../models/entry')
const User = require('../models/user')

entryRouter.get('/', async (req, res) => {
	const body = req.body
	const decodedToken = jwt.verify(req.token, process.env.SECRET)

	if(!decodedToken.id){
		return res.status(401).json({error: 'Invalid or missing token!'})
	}

	const user = await User.findById(decodedToken.id)

	const entries = await Entry.find({user: user.id}).populate('user', {username: 1})
	console.log(entries)
	res.json(entries)
})

entryRouter.post('/', async (req, res) => {
	const body = req.body
	const decodedToken = jwt.verify(req.token, process.env.SECRET)

	if(!decodedToken.id){
		return res.status(401).json({error: 'Invalid or missing token!'})
	}

	const user = await User.findById(decodedToken.id)
	const entry = new Entry({
		user: user.id,
		name: body.name,
		calories: body.calories,
		carbs: body.carbs,
		fiber: body.fiber,
		sugars: body.sugars,
		protein: body.protein,
		fat: body.fat,
		saturated: body.saturated,
		monounsaturated: body.monounsaturated,
		polyunsaturated: body.polyunsaturated,
		trans: body.trans,
		sodium: body.sodium,
		date: body.date,
		meal: body.meal
	})

	const result = await entry.save()
	user.entries = user.entries.concat(result._id)
	await user.save()
	const newEntry = await Entry.findOne({_id: result._id}).populate('user', {username: 1})
	console.log(newEntry)
	res.status(201).json(newEntry)
})

module.exports = entryRouter