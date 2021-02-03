const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class SearchList extends Model {}

SearchList.init(
	{
		id      : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		query   : { type: Sequelize.STRING(100), allowNull: false },
		user_id : { type: Sequelize.INTEGER, allowNull: false },
		lat     : { type: Sequelize.STRING(180), allowNull: true },
		long    : { type: Sequelize.STRING(180), allowNull: true },
		domain  : { type: Sequelize.INTEGER, allowNull: true }
	},
	{
		sequelize,
		modelName  : 'SearchList',
		tableName  : 'search_lists',
		timestamps : false
	}
)

module.exports = SearchList
