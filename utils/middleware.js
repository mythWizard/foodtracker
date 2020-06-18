const unknownEndpoint = (req, res) => {
	res.status(404).send({error: 'Unknown endpoint!'})
}

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	req.token = null
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		req.token = authorization.substring(7)
	}
	next()
}

const errorHandler = (e, req, res, next) => {
	//console.error(e.message)

	if (e.name === 'CastError') {
		return res.status(400).send({error: 'Malformed ID!'})
	} else if (e.name === 'ValidationError') {
		return res.status(400).json({error: e.message})
	} else if (e.name === 'JsonWebTokenError') {
		return res.status(401).json({
			error: 'Invalid Token!'
		})
	}
	next(e)
}

module.exports = {
	unknownEndpoint,
	tokenExtractor,
	errorHandler
}