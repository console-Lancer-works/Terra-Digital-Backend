const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const PropertyDescription = require('./PropertyDescription')
const PropertyKind = require('./PropertyKind')
const Agent = require('./Agent')
const PropertyType = require('./PropertyType')
const Country = require('./Country')
const Province = require('./Province')
const City = require('./City')
const CurrencyMaster = require('./CurrencyMaster')
const AreaUnitMaster = require('./AreaUnitMaster')
const FavoriteProperty = require('./FavoriteProperty')
const PropertyFeature = require('./PropertyFeature')
const PropertyAppliance = require('./PropertyAppliance')
const PropertyStatus = require('./PropertyStatus')
const PropertyListingType = require('./PropertyListingType')
// const PropertyNeighborhood = require('./PropertyNeighborhood')

const Model = Sequelize.Model
class Property extends Model { }

Property.init(
	{
		id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
		domain: { type: Sequelize.INTEGER, allowNull: true },
		property_kind: { type: Sequelize.TINYINT, allowNull: true },
		listing_id: { type: Sequelize.INTEGER, allowNull: true },
		lister_id: { type: Sequelize.SMALLINT, allowNull: true },
		lister_type: { type: Sequelize.CHAR, allowNull: false },
		mls_id: { type: Sequelize.STRING, allowNull: false },
		listing_code: { type: Sequelize.STRING(20), allowNull: true },
		property_type: { type: Sequelize.INTEGER, allowNull: true },
		country_id: { type: Sequelize.INTEGER, allowNull: true },
		province_id: { type: Sequelize.INTEGER, allowNull: true },
		city_id: { type: Sequelize.INTEGER, allowNull: true },
		image_count: { type: Sequelize.INTEGER, allowNull: true },
		price: { type: Sequelize.DOUBLE, allowNull: true },
		price_si: { type: Sequelize.DOUBLE, allowNull: true },
		price_unit: { type: Sequelize.INTEGER, allowNull: true },
		price_max: { type: Sequelize.DOUBLE, allowNull: true },
		price_max_si: { type: Sequelize.DOUBLE, allowNull: true },
		bedrooms: { type: Sequelize.FLOAT, allowNull: true },
		rooms: { type: Sequelize.FLOAT, allowNull: true },
		bathrooms: { type: Sequelize.FLOAT, allowNull: true },
		living_area: { type: Sequelize.FLOAT, allowNull: true },
		living_area_unit: { type: Sequelize.INTEGER, allowNull: true },
		living_area_si: { type: Sequelize.FLOAT, allowNull: true },
		lot_area: { type: Sequelize.FLOAT, allowNull: true },
		lot_area_unit: { type: Sequelize.INTEGER, allowNull: true },
		lot_area_si: { type: Sequelize.FLOAT, allowNull: true },
		googlemap_lt: { type: Sequelize.STRING(180), allowNull: true },
		googlemap_ln: { type: Sequelize.STRING(180), allowNull: true },
		build_year: { type: Sequelize.INTEGER, allowNull: true },
		post_code: { type: Sequelize.STRING(10), allowNull: true },
		add_date: { type: Sequelize.DATE, allowNull: true },
		street_no: { type: Sequelize.STRING, allowNull: true },
		location_text: { type: Sequelize.STRING(2295), allowNull: true },
		address: { type: Sequelize.TEXT, allowNull: true },
		importer_structure_id: { type: Sequelize.INTEGER, allowNull: true },
		importer_params: { type: Sequelize.TEXT, allowNull: true },
		status: { type: Sequelize.INTEGER, allowNull: true },
		published_date: { type: Sequelize.DATE, allowNull: true },
		reject_reason: { type: Sequelize.TEXT, allowNull: true },
		edit_status: { type: Sequelize.INTEGER, allowNull: true },
		edit_json: { type: Sequelize.TEXT, allowNull: true },
		to_be_delete_image: { type: Sequelize.TEXT, allowNull: true },
		deleted: { type: Sequelize.TINYINT, allowNull: true, defaultValue: 0 }
	},
	{
		sequelize,
		modelName: 'Property',
		tableName: 'properties',
		timestamps: false
	}
)
Property.hasOne(FavoriteProperty, { foreignKey: 'property_id' })
Property.hasOne(PropertyDescription, { foreignKey: 'property_id' })
Property.hasMany(PropertyFeature, { foreignKey: 'property_id', targetKey: 'id' })
Property.hasMany(PropertyAppliance, { foreignKey: 'property_id', targetKey: 'id' })
Property.belongsTo(PropertyKind, { foreignKey: 'property_kind' })
Property.belongsTo(Agent, { foreignKey: 'lister_id' })
Property.belongsTo(PropertyType, { foreignKey: 'property_type' })
Property.belongsTo(PropertyStatus, { foreignKey: 'status' })
Property.belongsTo(Country, { foreignKey: 'country_id' })
Property.belongsTo(Province, { foreignKey: 'province_id' })
Property.belongsTo(City, { foreignKey: 'city_id' })
Property.belongsTo(CurrencyMaster, { foreignKey: 'price_unit' })
Property.belongsTo(AreaUnitMaster, { foreignKey: 'lot_area_unit' })
Property.belongsTo(PropertyListingType,{ foreignKey:'listing_id'})


module.exports = Property
