const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class ApiToken extends Model {}

ApiToken.init(
	{
		id         : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		user_id    : { type: Sequelize.INTEGER, allowNull: false },
		domain_id  : { type: Sequelize.INTEGER, allowNull: false },
		user_type  : { type: Sequelize.CHAR, allowNull: false },
		token      : { type: Sequelize.TEXT, allowNull: true },
		created_at : { type: Sequelize.DATE, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'ApiToken',
		tableName  : 'api_tokens',
		timestamps : false
	}
)

module.exports = ApiToken
