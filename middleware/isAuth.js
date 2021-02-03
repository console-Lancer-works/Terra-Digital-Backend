const jwt = require('jsonwebtoken');
const errorHandler = require('../util/errors')

module.exports = (request, response, next) => {
	const token = request.get('AuthorizationToken')
	// console.log(token);
	let decodedToken
	try {
		decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)
		// console.log(decodedToken);
	} catch (error) {
		error.statusCode = 500
		throw error
	}

	;(request.userId = decodedToken.id), (request.userType = decodedToken.type)
	next()
}
