const ApiToken = require('../models/ApiToken')
const Admin = require('../models/Admin')
const Agent = require('../models/Agent')
const User = require('../models/User')

exports.generateAuthToken = async (userID, userType) => {
	await ApiToken.create({ user_id: userID, user_type: userType, token: token })
	return token
}

exports.authenticateAuthToken = async (token) => {
	let record = await ApiToken.findOne({ where: { token: token } })

	if (!record) return { status: false, user: [] }

	let user

	switch (record.user_type) {
		case 'A':
			user = Admin.findOne({ where: { id: record.user_id } })
			break
		case 'R':
			user = Agent.findOne({ where: { id: record.user_id } })
			break
		case 'U':
			user = User.findOne({ where: { id: record.user_id } })
			user.id = user.ID
			break
	}
	user.type = record.user_type
	return { status: true, user: user }
}
