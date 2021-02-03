const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class BlackListedEmail extends Model {}

BlackListedEmail.init(
	{
		id         : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		email      : { type: Sequelize.INTEGER, allowNull: false },
		issue      : { type: Sequelize.INTEGER, allowNull: false },
		created_at : { type: Sequelize.DATE, allowNull: true, defaultValue: new Date() }
	},
	{
		sequelize,
		modelName  : 'BlackListedEmail',
		tableName  : 'blackListed_Emails',
		timestamps : false
	}
)

module.exports = BlackListedEmail
