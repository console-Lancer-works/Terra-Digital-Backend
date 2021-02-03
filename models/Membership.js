const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class Membership extends Model {}

Membership.init(
	{
		id            : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		name          : { type: Sequelize.STRING, allowNull: false },
		features      : { type: Sequelize.json, allowNull: false },
		payment_cycle : { type: Sequelize.STRING, allowNull: false },
		price         : { type: Sequelize.INTEGER, allowNull: false },
		price_key     : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'Membership',
		tableName  : 'memberships',
		timestamps : false
	}
)

module.exports = Membership
