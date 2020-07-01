const searchRouter = require('express').Router()
const axios = require('axios')

searchRouter.post('/', async (req, res) => {
	const body = req.body
	//console.log(body.upc)

	//const item = await axios.get(`https://api.edamam.com/api/food-database/parser?upc=${body.upc}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`)
	
	const searchHeaders = {
		headers: {
			'x-app-id': `${process.env.APP_ID}`,
			'x-app-key': `${process.env.APP_KEY}`
		}
	}

	//console.log(searchHeaders)

	//const item = await axios.get(`https://trackapi.nutritionix.com/v2/search/item`, searchHeaders)
	const item = await axios.get(`https://trackapi.nutritionix.com/v2/search/item?upc=${body.upc}`, searchHeaders).catch(e => console.log(e))
	console.log(item.data)//.data.hints[0])
	console.log(item.data.foods[0].full_nutrients)
	/*const foodJSON = {
  		'ingredients': [
    	{
      		'quantity': 1,
      		'measureURI': 'http://www.edamam.com/ontologies/edamam.owl#Measure_serving',
      		'foodId': `${item.data.hints[0].food.foodId}`
    		}
  		]
	}*/
	//const nutrients = await axios.post(`https://api.edamam.com/api/food-database/nutrients?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`, foodJSON)
	//console.log(nutrients.data)
	res.status(200).json(item.data)

	//Needs error codes
})

module.exports = searchRouter