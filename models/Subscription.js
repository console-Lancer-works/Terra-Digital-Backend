const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class Subscription extends Model {}

Subscription.init(
	{
		id                        : {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		user_id                   : { type: Sequelize.INTEGER, allowNull: false },
		membership_id             : { type: Sequelize.INTEGER, allowNull: true },
		subscription_id           : { type: Sequelize.STRING, allowNull: true },
		created_date              : { type: Sequelize.DATEONLY, allowNull: true },
		current_period_start_date : { type: Sequelize.DATEONLY, allowNull: true },
		current_period_end_date   : { type: Sequelize.DATEONLY, allowNull: true },
		cancelled_date            : { type: Sequelize.DATEONLY, allowNull: true },
		amount                    : { type: Sequelize.DOUBLE, allowNull: true },
		status                    : { type: Sequelize.STRING, allowNull: true },
		description               : { type: Sequelize.TEXT, allowNull: true }
	},
	{
		sequelize,
		modelName  : 'Subscription',
		tableName  : 'subscriptions',
		timestamps : false
	}
)

module.exports = Subscription
