const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyKind extends Model {}

PropertyKind.init(
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
		modelName  : 'PropertyKind',
		tableName  : 'property_kinds',
		timestamps : false
	}
)

PropertyKind.getPropertyKind = async () => {
	return await PropertyKind.findAll({
		attributes: [
			'id',
			'name'
		]
	})
}
module.exports = PropertyKind
