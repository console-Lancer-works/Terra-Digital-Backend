const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class PropertyDescription extends Model {}

PropertyDescription.init(
	{
		id                        : { type: Sequelize.BIGINT, autoIncrement: true, allowNull: false, primaryKey: true },
		property_id               : { type: Sequelize.BIGINT, allowNull: false },
		share_content_description : { type: Sequelize.TEXT, allowNull: true },
		long_text_description     : { type: Sequelize.TEXT, allowNull: true },
		video_url                 : { type: Sequelize.TEXT, allowNull: true },
		virtual_tour_url          : { type: Sequelize.TEXT, allowNull: true },
		documents                 : { type: Sequelize.TEXT, allowNull: true },
		private_note              : { type: Sequelize.TEXT, allowNull: true }
	},
	{
		sequelize,
		modelName  : 'PropertyDescription',
		tableName  : 'property_descriptions',
		timestamps : false
	}
)

module.exports = PropertyDescription
