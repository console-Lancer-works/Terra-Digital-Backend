const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const City = require('./City')
const Province = require('./Province')
const Property = require('./Property')

const Model = Sequelize.Model
class FeaturedProvinceCity extends Model {}

FeaturedProvinceCity.init(
	{
		id            : { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		featured_type : { type: Sequelize.CHAR, allowNull: false },
		featured_id   : { type: Sequelize.INTEGER, allowNull: false },
		domain_id     : { type: Sequelize.INTEGER, allowNull: false }
	},
	{
		sequelize,
		modelName  : 'FeaturedProvinceCity',
		tableName  : 'featured_provinces_cities',
		timestamps : false
	}
)

FeaturedProvinceCity.belongsTo(City, { foreignKey: 'featured_id' })
FeaturedProvinceCity.belongsTo(Province, { foreignKey: 'featured_id' })

FeaturedProvinceCity.getFeaturedPlaces = async (domain, limit, type = null) => {
	let featuredPlaces = await FeaturedProvinceCity.findAll({
		where : { domain_id: domain },
		limit : limit,
		order : [
			[
				'id',
				'ASC'
			]
		]
	})
	const result = featuredPlaces.map(async (res) => {
		let PropertyData
		if (res.featured_type == 'C') {
			let cityName = await City.findOne({
				where      : { id: res.featured_id },
				attributes : [
					'name'
				]
			})
			if (type == null) {
				PropertyData = await Property.findOne({
					attributes : [
						'id'
					],
					where      : { city_id: res.featured_id, domain: domain, status: 3 },
					order      : [
						[
							'id',
							'DESC'
						]
					]
				})
			}
			return {
				id       : res.featured_id,
				name     : cityName.name,
				type     : res.featured_type,
				property : PropertyData ? PropertyData.id : undefined
			}
		} else {
			let provinceName = await Province.findOne({
				where      : { id: res.featured_id },
				attributes : [
					'name'
				]
			})
			if (type == null) {
				PropertyData = await Property.findOne({
					attributes : [
						'id'
					],
					where      : { province_id: res.featured_id, domain: domain, status: 3 },
					order      : [
						[
							'id',
							'DESC'
						]
					]
				})
			}
			return {
				id       : res.featured_id,
				name     : provinceName.name,
				type     : res.featured_type,
				property : PropertyData ? PropertyData.id : undefined
			}
		}
	})
	const responseData = await Promise.all(result)
	return responseData
}

module.exports = FeaturedProvinceCity
