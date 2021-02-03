const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class LeadThread extends Model {}

LeadThread.init(
	{
		id        : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		lead_id   : { type: Sequelize.INTEGER, allowNull: false },
		message   : { type: Sequelize.STRING, allowNull: false },
		date      : { type: Sequelize.DATE, allowNull: false },
		user_id   : { type: Sequelize.INTEGER, allowNull: false },
		user_type : { type: Sequelize.CHAR, allowNull: false },
		from      : { type: Sequelize.STRING, allowNull: false },
		to        : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'LeadThread',
		tableName  : 'lead_threads',
		timestamps : false
	}
)

module.exports = LeadThread
