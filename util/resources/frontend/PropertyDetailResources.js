const { jsonToObject } = require('../../general')
module.exports = (request) => {
	let propertyDetailData = jsonToObject(request)
	return {
		id                      : propertyDetailData.id,
		listing_id              : propertyDetailData.listing_id,
		lister_type             : propertyDetailData.lister_type,
		listing_code            : propertyDetailData.listing_code,
		image_count             : propertyDetailData.image_count,
		price                   : propertyDetailData.price,
		bedrooms                : propertyDetailData.bedrooms,
		rooms                   : propertyDetailData.rooms,
		bathrooms               : propertyDetailData.bathrooms,
		living_area             : propertyDetailData.living_area,
		lot_area                : propertyDetailData.lot_area,
		googlemap_lt            : propertyDetailData.googlemap_lt,
		googlemap_ln            : propertyDetailData.googlemap_ln,
		build_year              : propertyDetailData.build_year,
		post_code               : propertyDetailData.post_code,
		location_text           : propertyDetailData.location_text,
		property_name           : propertyDetailData.PropertyDescription
			? propertyDetailData.PropertyDescription.name
			: null,
		long_text_description   : propertyDetailData.PropertyDescription.long_text_description,
		property_appliances     : propertyDetailData.PropertyAppliances.map(({ custom }) => custom),
		property_features       : propertyDetailData.PropertyFeatures.map(({ custom }) => custom),
		currency                : propertyDetailData.CurrencyMaster.symbol,
		agent                   : {
			id           : propertyDetailData.Agent.id,
			first_name   : propertyDetailData.Agent.first_name,
			last_name    : propertyDetailData.Agent.last_name,
			display_name : propertyDetailData.Agent.display_name,
			email        : propertyDetailData.Agent.email,
			phone        : propertyDetailData.Agent.phone,
			mobile       : propertyDetailData.Agent.mobile,
			image_url    : propertyDetailData.Agent.image_url
		},
		area_unit               : propertyDetailData.AreaUnit ? propertyDetailData.AreaUnit.unit : null,
		property_kind           : propertyDetailData.PropertyKind ? propertyDetailData.PropertyKind.name : null,
		property_type           : propertyDetailData.PropertyType ? propertyDetailData.PropertyType.name : null,
		country                 : propertyDetailData.Country ? propertyDetailData.Country.name : null,
		province                : propertyDetailData.Province ? propertyDetailData.Province.name : null,
		city                    : propertyDetailData.City ? propertyDetailData.City.name : null,
		favourite               : 0, //propertyDetailData.favourite,
		property_image_base_url : process.env.AWS_CLOUDFRONT_IMAGE_URL,
		status_id               : propertyDetailData.status,
		status                  : 'Published'
	}
}
