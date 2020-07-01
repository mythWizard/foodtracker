const searchRouter = require('express').Router()
const axios = require('axios')

searchRouter.post('/', async (req, res) => {
	const body = req.body

	const searchHeaders = {
		headers: {
			'x-app-id': `${process.env.APP_ID}`,
			'x-app-key': `${process.env.APP_KEY}`
		}
	}

	const item = await axios.get(`https://trackapi.nutritionix.com/v2/search/item?upc=${body.upc}`, searchHeaders).catch(e => console.log(e))
	console.log(item.data)
	console.log(item.data.foods[0].full_nutrients)
	
	res.status(200).json(item.data)

	//Needs error codes
})

module.exports = searchRouter