const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class AgentLedger extends Model {}

AgentLedger.init(
	{
		id              : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		subscription_id : { type: Sequelize.INTEGER, allowNull: false },
		amount          : { type: Sequelize.INTEGER, allowNull: false },
		currency        : { type: Sequelize.STRING, allowNull: false },
		payment_mode    : { type: Sequelize.INTEGER, allowNull: true },
		order_date      : { type: Sequelize.DATE, allowNull: false },
		invoice_id      : { type: Sequelize.STRING, allowNull: false },
		invoice_url     : { type: Sequelize.TEXT, allowNull: false },
		payment_status  : { type: Sequelize.STRING, allowNull: false },
		description     : { type: Sequelize.TEXT, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'AgentLedger',
		tableName  : 'agent_ledger',
		timestamps : false
	}
)

module.exports = AgentLedger
