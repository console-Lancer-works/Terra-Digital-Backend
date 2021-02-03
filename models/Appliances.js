const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class Appliance extends Model {}

Appliance.init(
	{
		id          : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		title       : { type: Sequelize.STRING, allowNull: false },
		description : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'Appliance',
		tableName  : 'appliances',
		timestamps : false
	}
)

module.exports = Appliance
