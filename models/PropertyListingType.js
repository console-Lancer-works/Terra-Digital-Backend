const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyListingType extends Model {}

PropertyListingType.init(
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
		modelName  : 'PropertyListingType',
		tableName  : 'property_listing_types',
		timestamps : false
	}
)

PropertyListingType.getPropertyListingType = async () => {
	return await PropertyListingType.findAll({
		attributes : [
			'id',
			'name'
		]
	})
}
module.exports = PropertyListingType
