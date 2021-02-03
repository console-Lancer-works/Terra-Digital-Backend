const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class DailyStatsMail extends Model {}

DailyStatsMail.init(
	{
		id         : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		from_mail  : { type: Sequelize.STRING, allowNull: false },
		to_mail    : { type: Sequelize.STRING, allowNull: true },
		status     : { type: Sequelize.STRING, allowNull: true },
		created_at : { type: Sequelize.DATE, allowNull: true, defaultValue: new Date() }
	},
	{
		sequelize,
		modelName  : 'DailyStatsMail',
		tableName  : 'daily_stats_mails',
		timestamps : false
	}
)

module.exports = DailyStatsMail
