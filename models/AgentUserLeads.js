const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const Agent = require('./Agent')
const Property = require('./Property')
const Model = Sequelize.Model
class AgentUserLeads extends Model { }

AgentUserLeads.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		name: { type: Sequelize.STRING(50), allowNull: false },
		email: { type: Sequelize.STRING(100), allowNull: false },
		contact: { type: Sequelize.STRING(30), allowNull: false },
		message: { type: Sequelize.TEXT, allowNull: false },
		agent_id: { type: Sequelize.INTEGER, allowNull: false },
		property_id: { type: Sequelize.INTEGER, allowNull: false },
		domain_id: { type: Sequelize.INTEGER, allowNull: false },
		contactor_id: { type: Sequelize.INTEGER, allowNull: false },
		contactor_type: { type: Sequelize.STRING(30), allowNull: false },
	},
	{
		sequelize,
		modelName: 'AgentUserLeads',
		tableName: 'agent_user_leads',
		timestamps: false
	}
)

AgentUserLeads.belongsTo(Agent, { foreignKey: 'agent_id' })
AgentUserLeads.belongsTo(Property, { foreignKey: 'property_id' })



module.exports = AgentUserLeads
