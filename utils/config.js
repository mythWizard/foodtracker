require('dotenv').config()

let PORT = process.env.PORT
let MONGO = process.env.MONGO

module.exports = {
	PORT,
	MONGO
}