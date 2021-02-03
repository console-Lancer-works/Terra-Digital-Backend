const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class BillingCountry extends Model {}

BillingCountry.init(
	{
		id        : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		iso       : { type: Sequelize.CHAR, allowNull: false },
		name      : { type: Sequelize.STRING, allowNull: false },
		nicename  : { type: Sequelize.STRING, allowNull: false },
		iso3      : { type: Sequelize.CHAR, allowNull: false },
		numcode   : { type: Sequelize.SMALLINT, allowNull: false },
		phonecode : { type: Sequelize.INT, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'BillingCountry',
		tableName  : 'billing_countries',
		timestamps : false
	}
)

module.exports = BillingCountry
