const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const Op = Sequelize.Op

const Model = Sequelize.Model
class PropertyType extends Model {}

PropertyType.init(
	{
		id        : {
			type          : Sequelize.INTEGER,
			autoIncrement : true,
			allowNull     : false,
			primaryKey    : true
		},
		name      : { type: Sequelize.STRING, allowNull: false },
		parent_id : { type: Sequelize.INTEGER, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'PropertyType',
		tableName  : 'property_types',
		timestamps : false
	}
)

PropertyType.getPropertyTypes = async (typeIds) => {
	return await PropertyType.findAll({
		attributes : [
			'id',
			'name'
		],
		where      : {
			id : {
				[Op.in]: typeIds
			}
		}
	})
}
module.exports = PropertyType
