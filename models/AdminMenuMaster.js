const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class AdminMenuMaster extends Model {}

AdminMenuMaster.init(
	{
		id        : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		name      : { type: Sequelize.STRING, allowNull: false },
		parent_id : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'AdminMenuMaster',
		tableName  : 'admin_menu_masters',
		timestamps : false
	}
)

module.exports = AdminMenuMaster
