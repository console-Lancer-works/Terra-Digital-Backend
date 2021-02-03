const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PaymentMode extends Model {}

PaymentMode.init(
	{
		id   : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		mode : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'PaymentMode',
		tableName  : 'payment_modes',
		timestamps : false
	}
)

module.exports = PaymentMode
