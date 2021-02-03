const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class App extends Model {}

App.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		name: { type: Sequelize.STRING(100), allowNull: false },
		ios_identifier: { type: Sequelize.STRING(100), allowNull: false },
		android_identifier: { type: Sequelize.STRING(100), allowNull: false },
		status: { type: Sequelize.TINYINT(4), allowNull: true, defaultValue: 0 }
	},
	{
		sequelize,
		modelName: 'App',
		tableName: 'apps',
		timestamps: false
	}
)

module.exports = App
