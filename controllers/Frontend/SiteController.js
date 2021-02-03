const PropertyType = require('../../models/PropertyType')
const PropertyKind = require('../../models/PropertyKind')
const Domain = require('../../models/Domain')
const PropertyListingType = require('../../models/PropertyListingType')
const PropertyAppliance = require('../../models/PropertyAppliance')
const PropertyNeighborhood = require('../../models/PropertyNeighborhood')
const PropertyTag = require('../../models/PropertyTag')
const Agent = require('../../models/Agent')
const FeatureProvinceCity = require('../../models/FeaturedProvinceCity')
const Property = require('../../models/Property')
const CurrencyMaster = require('../../models/CurrencyMaster')
const sequelize = require('../../util/database')

const General = require('../../util/general')

const apiResponder = require('../../util/responder')

exports.getSiteSettings = async (request, response, next) => {
	try {
		let responseData = {
			property_types          : await PropertyType.getPropertyTypes([
				3,
				// 7,
				15,
				16,
				17,
				21,
				22
			]),
			property_kinds          : await PropertyKind.getPropertyKind(),
			property_listing_kinds  : await PropertyListingType.getPropertyListingType(),
			domainDetails           : await Domain.getDomainProperties(request.params.domain, [
				'ios_app_link',
				'android_app_link',
				'address_line1',
				'address_line2',
				'contact_number',
				'email',
				'facebook_link',
				'instagram_link',
				'twitter_link',
				'linkedin_link',
				'youtube_link',
				'meta_tags',
				'domain_name',
				'script_tags'
			]),
			max_property_price      : null,
			property_image_base_url : process.env.AWS_CLOUDFRONT_IMAGE_URL
		}
		responseData.domainDetails.meta_tags = JSON.parse(General.jsonToObject(responseData.domainDetails.meta_tags))
		responseData.domainDetails.script_tags = JSON.parse(
			General.jsonToObject(responseData.domainDetails.script_tags)
		)

		if (request.get('isMobApp')) {
			responseData.property_appliances = await PropertyAppliance.findAll({
				attributes : [
					'property_id',
					'appliance_id',
					'custom'
				]
			})
			responseData.property_neighborhood = await PropertyNeighborhood.findAll()
			responseData.property_tags = await PropertyTag.findAll()
		}
		responseData.total_agents = await Agent.count()
		return apiResponder(request, response, next, true, 2018, responseData)
	} catch (error) {
		next(error)
	}
}

exports.getFeatured = async (request, response, next) => {
	try {
		let domainId = await Domain.getDomainInfo(request.params.domain, 'id')
		switch (request.params.type) {
			case 'PLACES':
				getFeaturedPlaces(request, response, next, domainId)
				break
			case 'PROPERTIES':
				getFeaturedProperties(request, response, next, domainId)
				break
		}
	} catch (error) {
		next(error)
	}
}

exports.getFeaturedPlacesListing = async (request, response, next) => {
	let domainId = await Domain.getDomainInfo(request.body.domain, 'id')
	let featuredPlaces = await FeatureProvinceCity.getFeaturedPlaces(domainId, 5, 'L')
	let featuredPlacesWithListing = featuredPlaces.map(async (res) => {
		let whereCondition = { domain: domainId, listing_id: request.body.listing_type, status: 3 }
		if (res.type == 'P') {
			whereCondition.province_id = res.id
		} else {
			whereCondition.city_id = res.id
		}
		let listings = await Property.count({ where: whereCondition })
		res.listing = listings
		return listings
	})
	await Promise.all(featuredPlacesWithListing)
	return apiResponder(request, response, next, true, 2017, { places: featuredPlaces })
}

let getFeaturedPlaces = async (request, response, next, domain) => {
	let featuredPlaces = [
		{
			id       : 6063,
			name     : 'Bangkok',
			type     : 'P',
			property : 2838396
		},
		{
			id       : 6108,
			name     : 'Phuket',
			type     : 'P',
			property : 2838188
		},
		{
			id       : 814,
			name     : 'Ko Samui',
			type     : 'C',
			property : 225053
		},
		{
			id       : 33,
			name     : 'Pattaya',
			type     : 'C',
			property : 2838404
		},
		{
			id       : 7,
			name     : 'Hua Hin',
			type     : 'C',
			property : 2838406
		},
		{
			id       : 6,
			name     : 'Pran Buri',
			type     : 'C',
			property : 188333
		},
		{
			id       : 12,
			name     : 'Cha Am',
			type     : 'C',
			property : 2838261
		},
		{
			id       : 6070,
			name     : 'Chiang Mai',
			type     : 'P',
			property : 2838401
		},
		{
			id       : 6071,
			name     : 'Chiang Rai',
			type     : 'P',
			property : 149542
		},
		{
			id       : 6072,
			name     : 'Chonburi',
			type     : 'P',
			property : 2838404
		}
	] //await FeatureProvinceCity.getFeaturedPlaces(domain, 10)
	// let featuredPlaces = await sequelize.query(`CALL get_featured_places('LOCATIONS', 0,  ${domain})`)
	return apiResponder(request, response, next, true, 2017, { places: featuredPlaces })
}

let getFeaturedProperties = async (request, response, next, domain) => {
	let featuredPlaces = [
		{
			id       : 6063,
			name     : 'Bangkok',
			type     : 'P',
			property : 2838396
		},
		{
			id       : 6108,
			name     : 'Phuket',
			type     : 'P',
			property : 2838188
		},
		{
			id       : 814,
			name     : 'Ko Samui',
			type     : 'C',
			property : 225053
		},
		{
			id       : 33,
			name     : 'Pattaya',
			type     : 'C',
			property : 2838404
		},
		{
			id       : 7,
			name     : 'Hua Hin',
			type     : 'C',
			property : 2838406
		},
		{
			id       : 6,
			name     : 'Pran Buri',
			type     : 'C',
			property : 188333
		},
		{
			id       : 12,
			name     : 'Cha Am',
			type     : 'C',
			property : 2838261
		},
		{
			id       : 6070,
			name     : 'Chiang Mai',
			type     : 'P',
			property : 2838401
		},
		{
			id       : 6071,
			name     : 'Chiang Rai',
			type     : 'P',
			property : 149542
		},
		{
			id       : 6072,
			name     : 'Chonburi',
			type     : 'P',
			property : 2838404
		}
	] //await FeatureProvinceCity.getFeaturedPlaces(domain, 5)
	// let featuredPlaces = await sequelize.query(`CALL get_featured_places('LOCATIONS', 0,  ${domain})`)
	let result = featuredPlaces.map(async (place) => {
		let whereCondition = {}
		if (place.type == 'C') {
			whereCondition = { city_id: place.id, domain: domain }
		} else if (place.type == 'P') {
			whereCondition = { province_id: place.id, domain: domain }
		}
		let properties = await Property.findAndCountAll({
			attributes : [
				'id',
				'price',
				'bedrooms',
				'bathrooms',
				'listing_id',
				[
					'location_text',
					'location'
				]
			],
			include    : [
				{
					model      : CurrencyMaster,
					attributes : [
						'symbol',
						'name'
					],
					required   : false
				}
			],
			where      : whereCondition,
			limit      : 5,
			order      : [
				[
					'id',
					'DESC'
				]
			]
		})
		return {
			id               : place.id,
			type             : place.type,
			property         : place.property,
			name             : place.name,
			properties       : properties.rows,
			total_properties : properties.count
		}
	})

	return apiResponder(request, response, next, true, 2017, { places: await Promise.all(result) })
}
