const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const app = require('./App')
const Model = Sequelize.Model
class AppAds extends Model {}

AppAds.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		app_id: { type: Sequelize.INTEGER, allowNull: false },
		ad_id: { type: Sequelize.INTEGER, allowNull: false }
	},
	{
		sequelize,
		modelName: 'AppAds',
		tableName: 'app_ads',
		timestamps: false
	}
)
AppAds.belongsTo(app, { foreignKey: 'app_id' })
module.exports = AppAds
