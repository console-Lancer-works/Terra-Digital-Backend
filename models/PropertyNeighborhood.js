const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyNeighborhood extends Model {}

PropertyNeighborhood.init(
	{
		id        : {
			type          : Sequelize.INTEGER,
			autoIncrement : true,
			allowNull     : false,
			primaryKey    : true
		},
		name      : { type: Sequelize.STRING, allowNull: false },
		short_tag : { type: Sequelize.STRING, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'PropertyNeighborhood',
		tableName  : 'property_neighborhoods',
		timestamps : false
	}
)

module.exports = PropertyNeighborhood
