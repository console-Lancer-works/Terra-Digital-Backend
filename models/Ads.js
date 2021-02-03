const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const AppAds = require('./AppAds')
const Model = Sequelize.Model
class Ads extends Model {}

Ads.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		title: { type: Sequelize.STRING(100), allowNull: false },
		description: { type: Sequelize.TEXT(100), allowNull: false },
		image: { type: Sequelize.STRING(200), allowNull: false },
		click_url: { type: Sequelize.STRING(200), allowNull: true },
		start_date: { type: Sequelize.DATE, allowNull: false },
		end_date: { type: Sequelize.DATE, allowNull: false },
		status: { type: Sequelize.TINYINT(4), allowNull: false, defaultValue: 0 }
	},
	{
		sequelize,
		modelName: 'Ads',
		tableName: 'ads',
		timestamps: false
	}
)
Ads.hasMany(AppAds, { foreignKey: 'ad_id' })
module.exports = Ads
