const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const entryRouter = require('./controllers/entries')
const searchRouter = require('./controllers/search')

const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(config.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log('Connected to Mongo!')})
.catch((e) => {console.error(e)})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/entries', entryRouter)
app.use('/search', searchRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app