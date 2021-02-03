const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Property = require('../models/Property')
const User = require('../models/User')
const Model = Sequelize.Model

class FavoriteProperty extends Model { }
FavoriteProperty.init(
	{
		id: { type: Sequelize.BIGINT(20), autoIncrement: true, allowNull: false, primaryKey: true },
		lister_id: { type: Sequelize.BIGINT(20), allowNull: false },
		property_id: { type: Sequelize.BIGINT(20), allowNull: false },
		lister_type: { type: Sequelize.CHAR(4), allowNull: false }
	},
	{
		sequelize,
		modelName: 'FavoriteProperty',
		tableName: 'favourite_properties',
		timestamps: false
	}
)

// FavoriteProperty.belongsTo(Property, { foreignKey: 'property_id' })

//Property.hasOne(FavoriteProperty, { foreignKey: 'property_id' })
//FavoriteProperty.hasMany(Property, { foreignKey: 'property_id' })
FavoriteProperty.belongsTo(User, { foreignKey: 'lister_id' })


module.exports = FavoriteProperty
