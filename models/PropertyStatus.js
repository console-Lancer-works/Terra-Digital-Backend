const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyStatus extends Model {}

PropertyStatus.init(
	{
		id   : {
			type          : Sequelize.INTEGER,
			autoIncrement : true,
			allowNull     : false,
			primaryKey    : true
		},
		name : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'PropertyStatus',
		tableName  : 'property_statuses',
		timestamps : false
	}
)

module.exports = PropertyStatus
