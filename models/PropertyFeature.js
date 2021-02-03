const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyFeature extends Model {}

PropertyFeature.init(
	{
		id           : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		property_id  : { type: Sequelize.INTEGER, allowNull: false },
		feature_id : { type: Sequelize.INTEGER, allowNull: false },
		custom       : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'PropertyFeature',
		tableName  : 'property_features',
		timestamps : false
	}
)

module.exports = PropertyFeature
