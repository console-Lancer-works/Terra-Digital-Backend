const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyAppliance extends Model {}

PropertyAppliance.init(
	{
		id           : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		property_id  : { type: Sequelize.STRING, allowNull: false },
		appliance_id : { type: Sequelize.STRING, allowNull: false },
		custom       : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'PropertyAppliance',
		tableName  : 'property_appliances',
		timestamps : false
	}
)

module.exports = PropertyAppliance
