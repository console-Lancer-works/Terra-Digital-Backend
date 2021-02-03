const Domain = require('../../models/Domain')

const Sequelize = require('sequelize')

const Property = require('../../models/Property')
const PropertyDescription = require('../../models/PropertyDescription')
const PropertyKind = require('../../models/PropertyKind')
const PropertyType = require('../../models/PropertyType')
const PropertyStatus = require('../../models/PropertyStatus')
const Agent = require('../../models/Agent')
const Country = require('../../models/Country')
const Province = require('../../models/Province')
const City = require('../../models/City')
const CurrencyMaster = require('../../models/CurrencyMaster')
const AreaUnit = require('../../models/AreaUnitMaster')
const FavortieProperty = require('../../models/FavoriteProperty')
const AgentUserLeads = require('../../models/AgentUserLeads');
const PropertyListingCollection = require('../resources/frontend/PropertyListingCollection')
const PropertyDetailCollection = require('../resources/frontend/PropertyDetailResources')
const PropertyFeature = require('../../models/PropertyFeature')
const PropertyAppliance = require('../../models/PropertyAppliance')
const PropertyListingType = require('../../models/PropertyListingType')

const Op = Sequelize.Op

exports.addEditProperty = async (requestParams) => {
	let property
	let messageCode
	if (requestParams.body.property_id == 0) {
		let propertyCount = await this.getPropertyCount(requestParams)

		if (!propertyCount) return (messageCode = 2033)

		property = await Property.create(this.getPropertycolumns(requestParams))

		let propertyDescription = await PropertyDescription.create(
			this.getPropertyDescriptionColumns(property.id, requestParams.body)
		)
		if (!propertyDescription) return (messageCode = 2034) //need a clarification on it
	} else {
		property = await Property.update(this.getPropertycolumns(requestParams), {
			where: { id: requestParams.body.property_id }
		})
	}
	if (!property) return (messageCode = 2034)
	return (messageCode = 2038)
}
exports.addFavoriteProperty = async (requestParams) => {
	let favoriteConditions = this.getListerPropertyCondition(requestParams)

	favoriteConditions.property_id = requestParams.body.property_id

	let isExist = await FavortieProperty.findOne({ where: favoriteConditions })
	if (isExist) return true

	let addFavoriteProperty = await FavortieProperty.create(favoriteConditions)

	if (!addFavoriteProperty) return false
	return true
}

exports.getListerFavouritePropertyCondition = async (requestParams) => {
	return {
		lister_type: requestParams.type,
		lister_id: requestParams.Id
	}
}

exports.getDomainId = async (domainname) => {
	let domain = await Domain.findOne({

		where: {
			web_identifier_code: domainname
		},
		attributes: ['id'],
	})
	return domain.id
}

exports.getFavoriteProperty = async (requestParams) => {
	let query
	let favoritePropertiesId = await FavortieProperty.findAll({
		where: this.getListerPropertyCondition(requestParams),
		attributes: [
			'property_id'
		]
	})

	//favouritePropertiesid=[123,23,24]
	propertyID = favoritePropertiesId.map(function (obj) {
		return obj.property_id
	})
	query = {
		where: { id: { [Op.in]: propertyID } },
		attributes: this.getColumns(),
		include: this.getBriefRelationships()
	}
	if (requestParams.isMobApp) {
		query.attributes.splice(2, 2)
		query.include = this.getBriefRelationships().splice(1, 1)
	}
	let favoriteProperties = await Property.findAll(query)
	return favoriteProperties
}
exports.getPropertyListingByParams = async (requestParams) => {
	let properties = []
	let total_properties = 0
	let query
	let domainId = await Domain.getDomainInfo(requestParams.domain, 'id')

	if (requestParams.filters.lat || requestParams.filters.long) {
		query = await this.getPropertyListingByLatLong(domainId, requestParams)
	} else {
		query = {
			where: this.getConditions(domainId, requestParams),
			attributes: this.getColumns()
		}
	}

	query.include = this.getBriefRelationships(requestParams)

	if (requestParams.isMobApp) {
		query.include = this.getBriefRelationships().splice(1, 1)
		query.attributes.splice(2, 2)
	}

	if (requestParams.limit) {
		query.limit = requestParams.limit
		query.offset = requestParams.offset
	}

	query.order = this.getSortingCondition(requestParams)

	await Property.count(query).then((results) => {
		total_properties = results
	})

	properties = await Property.findAll(query)

	return {
		property_image_base_url: process.env.AWS_CLOUDFRONT_IMAGE_URL,
		properties: PropertyListingCollection(properties),
		total_properties: total_properties
	}
}
exports.getListerProperty = async (requestParams) => {
	let properties = await Property.findAll({
		offset: requestParams.body.offset,
		limit: requestParams.body.limit,
		where: this.getListerPropertyCondition(requestParams),
		attributes: this.getColumns(),
		include: this.getBriefRelationships().splice(0, 2)
	})
	let total_properties = await Property.count({
		where: this.getListerPropertyCondition(requestParams)
	})

	return { properties: properties, total_properties: total_properties }
}
exports.getListerPropertyCondition = (requestParams) => {
//   console.log(requestParams.id,requestParams.type,status);
	return {
		lister_type: requestParams.type,
		lister_id: requestParams.id
	}
}
exports.getPropertyDetails = async (propertyId) => {
	let property = await Property.findOne({
		where: { id: propertyId },
		attributes: { exclude: this.getExcludedColumns() },
		include: this.getDetailRelationships()
	})
	return { property: PropertyDetailCollection(property) }
}
exports.getConditions = (domainId, requestParams) => {
	let whereCondition = { domain: domainId, deleted: 0, status: 3 }

	if (requestParams.listing_type) whereCondition.listing_id = requestParams.listing_type
	if (requestParams.filters) {
		if (requestParams.filters.bedrooms) whereCondition.bedrooms = requestParams.filters.bedrooms
		if (requestParams.filters.bathrooms) whereCondition.bathrooms = requestParams.filters.bathrooms
		if (requestParams.filters.city_id) whereCondition.city_id = requestParams.filters.city_id
		if (requestParams.filters.province_id) whereCondition.province_id = requestParams.filters.province_id
		if (requestParams.filters.agent_id) whereCondition.lister_id = requestParams.filters.agent_id
		if (requestParams.filters.property_type) whereCondition.property_type = requestParams.filters.property_type
		if (requestParams.filters.max_area) whereCondition.living_area = { [Op.lt]: requestParams.filters.max_area }
		if (requestParams.filters.min_area) whereCondition.living_area = { [Op.gt]: requestParams.filters.max_area }
		if (requestParams.filters.min_price || requestParams.filters.max_price)
			whereCondition.price = this.priceFilters(requestParams.filters)
	}

	return whereCondition
}
exports.getPropertycolumns = (requestParams) => {
	let propertyData = requestParams.body

	return {
		property_kind: propertyData.property_kind,
		listing_id: propertyData.listing_id,
		lister_id: propertyData.lister_id,
		listing_code: propertyData.listing_code,
		property_type: propertyData.property_type,
		lister_type: requestParams.login_type,
		country_id: propertyData.country_id,
		province_id: propertyData.province_id,
		city_id: propertyData.city_id,
		image_count: propertyData.image_count,
		price: propertyData.price,
		price_si: propertyData.price_si,
		price_unit: propertyData.price_unit,
		price_max: propertyData.price_max,
		price_max_si: propertyData.price_max_si,
		bedrooms: propertyData.bedrooms,
		rooms: propertyData.rooms,
		bathrooms: propertyData.bathrooms,
		living_area: propertyData.living_area,
		living_area_unit: propertyData.living_area_unit,
		living_area_si: propertyData.living_area_si,
		lot_area: propertyData.lot_area,
		lot_area_unit: propertyData.lot_area_unit,
		lot_area_si: propertyData.lot_area_si,
		googlemap_lt: propertyData.googlemap_lt,
		googlemap_ln: propertyData.googlemap_ln,
		build_year: propertyData.build_year,
		post_code: propertyData.post_code,
		location_text: propertyData.location_text,
		importer_structure_id: propertyData.importer_structure_id,
		importer_params: propertyData.importer_params,
		deleted: propertyData.deleted
	}
}
exports.getPropertyDescriptionColumns = (propertyID, requestParams) => {
	return {
		property_id: propertyID,
		share_content_description: requestParams.share_content_description,
		long_text_description: requestParams.long_text_description
	}
}
exports.getBriefRelationships = (request) => {

	let keyword = request.body && request.body.keywords ? request.body.keywords : '';
	return [
		{
			model      : PropertyStatus,
			attributes : [
				'id',
				'name'
			],
			required   : false
		},
		{
			model      : PropertyType,
			attributes : [
				'id',
				'name'
			],
			required   : false
		},
		{
			model: PropertyDescription,
			attributes: [
				[
					'share_content_description',
					'name'
				],
				[
					'long_text_description',
					'long_description'
				]
			],
			where      : { share_content_description: { [Op.like]: `%${keyword}%` }},
			required: false
		},
		{
			model: CurrencyMaster,
			attributes: [
				'symbol',
				'name'
			],
			required: false
		},
		{
			model: Agent,
			attributes: [
				'id',
				'first_name',
				'last_name',
				'display_name',
				[
					'main_email',
					'email'
				],
				'phone',
				'mobile',
				'image_url'
			],
			required: false
		}
	]
}

exports.getBriefFavourites = () => {
	return [
		{
			model: PropertyDescription,
			attributes: [
				[
					'share_content_description',
					'name'
				]
			],
			required: false
		},
	]
}

exports.getDetailRelationships = () => {
	return [
		{
			model: PropertyDescription,
			attributes: [
				[
					'share_content_description',
					'name'
				],
				'long_text_description'
			],
			required: false
		},
		{
			model: CurrencyMaster,
			attributes: [
				'symbol',
				'name'
			],
			required: false
		},
		{
			model: AreaUnit,
			attributes: [
				'unit'
			],
			required: false
		},
		{
			model: PropertyKind,
			attributes: [
				'name'
			],
			required: false
		},
		{
			model: PropertyType,
			attributes: [
				'name'
			],
			required: false
		},
		{
			model: Country,
			attributes: [
				'name'
			],
			required: false
		},
		{
			model: Province,
			attributes: [
				'name'
			],
			required: false
		},
		{
			model: City,
			attributes: [
				'name'
			],
			required: false
		},
		{
			model: Agent,
			attributes: [
				'id',
				'first_name',
				'last_name',
				'display_name',
				'about',
				[
					'main_email',
					'email'
				],
				'phone',
				'mobile',
				'image_url'
			],
			required: false
		},
		{
			model: PropertyFeature,
			attributes: [
				'custom'
			],
			required: false
		},
		{
			model: PropertyAppliance,
			attributes: [
				'custom'
			],
			required: false
		}
	]
}

exports.getColumns = () => {

	return [
		'id',
		'listing_id',
		'lister_id',
		'listing_code',
		'lister_type',
		'living_area',
		'living_area_si',
		'living_area_unit',
		'lot_area',
		'lot_area_si',
		'lot_area_unit',
		'add_date',
		'address',
		'post_code',
		'build_year',
		'city_id',
		'country_id',
		'deleted',
		'domain',
		'mls_id',
		'province_id',
		'edit_json',
		'edit_status',
		'importer_params',
		'importer_structure_id',
		// 'documents',
		'image_count',
		// 'location',
		'location_text',
		'price',
		'price_max',
        'price_max_si',
        'price_si',
		'price_unit',
		'published_date',
		'reject_reason',
		'rooms',
		'bedrooms',
		'bathrooms',
		'street_no',
		'to_be_delete_image',
		'googlemap_lt',
		'googlemap_ln'
	]
}

exports.getEnquiryRelationship = () => {
	return [
		{
		  model: Property,
		  attributes: [
			'id',
			'listing_code',
			'location_text',
			'listing_id'
		  ],
		  include: [
			{
			  model: PropertyDescription,
			  attributes: [
				'share_content_description'
			  ]
			},
			{
			  model: Province,
			  attributes: [
				'name'
			  ]
			},
			{
			  model: City,
			  attributes: [
				'name'
			  ]
			},
			{
			  model: PropertyListingType,
			  attributes: [
				'name'
			  ]
			}
		  ]
		},
	  ]
}

exports.getEnquiryColumns = () => {
	return [
		'id',
		'name',
		'date',
	]
}

exports.getExcludedColumns = () => {
	return [
		'property_kind',
		'reject_reason',
		'edit_status',
		'edit_json',
		'lister_id',
		'mls_id',
		'street_no',
		'add_date',
		'published_date',
		'property_type',
		'country_id',
		'province_id',
		'city_id',
		'price_si',
		'price_unit',
		'price_max',
		'price_max_si',
		'living_area_si',
		'living_area_unit',
		'lot_area_si',
		'lot_area_unit',
		'importer_structure_id',
		'importer_params',
		'deleted'
	]
}
exports.getPropertyCount = async (requestParams) => {
	if (requestParams.login_type == 'U') {
		let propertyCount = await Property.count({
			where: { lister_id: requestParams.body.lister_id, lister_type: requestParams.login_type }
		})
		if (propertyCount >= 3) return false
	}
	return true
}
exports.getFavoritePropertyRelationships = () => {
	return [
		{
			model: Property,
			attributes: this.getColumns(),
			required: false
		}
	]
}
exports.getSortingCondition = (requestParams) => {
	if (requestParams.filters.order.orderType && requestParams.filters.order.orderKey) {
		return [
			[
				requestParams.filters.order.orderType,
				requestParams.filters.order.orderKey
			]
		]
	}
	return [
		[
			'id',
			'DESC'
		]
	]
}
exports.priceFilters = (requestParams) => {
	if (requestParams.min_price && requestParams.max_price) {
		if (requestParams.min_price > requestParams.max_price)
			return {
				[Op.between]: [
					requestParams.max_price,
					requestParams.min_price
				]
			}
	}
	if (requestParams.min_price && requestParams.max_price == 0) return { [Op.gte]: requestParams.min_price }
	if (requestParams.max_price && requestParams.min_price == 0) return { [Op.lte]: requestParams.max_price }
	return {
		[Op.between]: [
			requestParams.min_price,
			requestParams.max_price
		]
	}
}
exports.getPropertyListingByLatLong = async (domainId, requestParams) => {
	let attributes = this.getColumns()

	let distanceAttribute = Sequelize.literal(
		'6371 * acos(cos(radians(' +
		requestParams.filters.lat +
		')) * cos(radians(googlemap_lt)) * cos(radians(' +
		requestParams.filters.long +
		') - radians(googlemap_ln)) + sin(radians(' +
		requestParams.filters.lat +
		')) * sin(radians(googlemap_lt)))'
	)
	let distanceAlias = [
		distanceAttribute,
		'distance'
	]
	attributes.push(distanceAlias)

	let query = {
		attributes: attributes,
		where: {
			[Op.and]: [
				Sequelize.where(distanceAttribute, { [Op.lte]: 200 }),
				this.getConditions(domainId, requestParams)
			]
		}
	}

	return query
}
exports.removeFavoriteProperty = async (requestParams) => {
	let removeFavoriteProperty = await FavortieProperty.destroy({
		where: {
			property_id: requestParams.body.property_id,
			lister_id: requestParams.userId,
			lister_type: requestParams.login_type
		}
	})
	if (!removeFavoriteProperty) return false
	return true
}

exports.getleadRelationships = () => {
	return [
		{
			model: Agent,
			attributes: [
				'id',
				'display_name',
				[
					'main_email',
					'email'
				],
				'phone',
			],
			required: false
		},
		{
			model: Property,
			attributes: [
				'id',
				'listing_id',
				'listing_code',
				"location_text",
				"bedrooms",
				"bathrooms",
				"living_area",
				"price",
			],
			include: [
				{
					model: PropertyDescription,
					attributes: [
						"share_content_description"
					],
					required: false
				},
				{
					model: City,
					attributes: [
						"name"
					],
					required: false
				},
				{
					model: PropertyType,
					attributes: [
						"name"
					],
					required: false
				},
				{
					model: Province,
					attributes: [
						"name"
					],
					required: false
				},
			],
			required: false



		}
	]
}
