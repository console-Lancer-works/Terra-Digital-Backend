const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Model = Sequelize.Model
class Country extends Model {}

Country.init(
	{
		id       : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		name     : { type: Sequelize.STRING(50), allowNull: false },
		abbr     : { type: Sequelize.STRING(5), allowNull: true },
		isd_code : { type: Sequelize.STRING(50), allowNull: true }
	},
	{
		sequelize,
		modelName  : 'Country',
		tableName  : 'countries',
		timestamps : false
	}
)

module.exports = Country
