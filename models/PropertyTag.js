const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyTag extends Model {}

PropertyTag.init(
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
		modelName  : 'PropertyTag',
		tableName  : 'property_tags',
		timestamps : false
	}
)

module.exports = PropertyTag
