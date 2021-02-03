const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class Feature extends Model {}

Feature.init(
	{
		id   : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		name : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'Feature',
		tableName  : 'features',
		timestamps : false
	}
)

module.exports = Feature
