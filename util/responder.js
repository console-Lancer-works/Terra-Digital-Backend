const logger = require('../util/loggingEngine')
const messages = require('../constants/ResponseMessages.json')

module.exports = (req, res, next, status, messageCode, data) => {
	logger.info({ status: status, message: messages[messageCode], data: data })
	res.status(200).json({
		status  : status,
		code    : messageCode,
		message : messages[messageCode],
		data    : data
	})
}
