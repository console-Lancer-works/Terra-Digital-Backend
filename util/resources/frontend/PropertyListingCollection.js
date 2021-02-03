const { jsonToObject } = require('../../general')
module.exports = (request) => {
	let properties = request.map((param) => {
		let propertyLisitngData = jsonToObject(param)
		return {
			id            : propertyLisitngData.id,
			listing_id    : propertyLisitngData.listing_id,
			city_id       : propertyLisitngData.city_id,
			country_id    : propertyLisitngData.country_id,
			lister_id     : propertyLisitngData.lister_id,
			lister_type   : propertyLisitngData.lister_type,
			listing_code  : propertyLisitngData.listing_code,
			living_area   : propertyLisitngData.living_area,
			living_area_si : propertyLisitngData.living_area_si,
			living_area_unit : propertyLisitngData.living_area_unit,
			domain        : propertyLisitngData.domain,
			// documents     : propertyLisitngData.documents,
			deleted       : propertyLisitngData.deleted,
			edit_json     : propertyLisitngData.edit_json,
			edit_status   : propertyLisitngData.edit_status,
			importer_params : propertyLisitngData.importer_params,
			importer_structure_id : propertyLisitngData.importer_structure_id,
			lot_area      : propertyLisitngData.lot_area,
			lot_area_si : propertyLisitngData.lot_area_si,
			lot_area_unit : propertyLisitngData.lot_area_unit,
			location      : propertyLisitngData.location,
			location_text : propertyLisitngData.location_text,
			image_count   : propertyLisitngData.image_count,
			price         : propertyLisitngData.price,
			price_max     : propertyLisitngData.price_max,
			price_max_si  : propertyLisitngData.price_max_si,
			price_si      : propertyLisitngData.price_si,
			price_unit    : propertyLisitngData.price_unit,
			published_date : propertyLisitngData.published_date,
			mls_id        : propertyLisitngData.mls_id,
			province_id   : propertyLisitngData.province_id ,
			add_date      : propertyLisitngData.add_date,
			address       : propertyLisitngData.address,
			post_code     : propertyLisitngData.post_code,
			build_year    : propertyLisitngData.build_year,
			reject_reason : propertyLisitngData.reject_reason,
			status        : propertyLisitngData.PropertyStatus ? propertyLisitngData.PropertyStatus.name : null,
			status_id     : propertyLisitngData.PropertyStatus ? propertyLisitngData.PropertyStatus.id : null,
			rooms         : propertyLisitngData.rooms,
			bedrooms      : propertyLisitngData.bedrooms,
			bathrooms     : propertyLisitngData.bathrooms,
			street_no     : propertyLisitngData.street_no,
			to_be_delete_image : propertyLisitngData.to_be_delete_image,
			googlemap_lt  : propertyLisitngData.googlemap_lt,
			googlemap_ln  : propertyLisitngData.googlemap_ln,
			property_type_name : propertyLisitngData.PropertyType ? propertyLisitngData.PropertyType.name : null,
			property_type_id : propertyLisitngData.PropertyType ? propertyLisitngData.PropertyType.id : null,
			property_name : propertyLisitngData.PropertyDescription
				? propertyLisitngData.PropertyDescription.name
				: null,
		    long_description : propertyLisitngData.PropertyDescription
			? propertyLisitngData.PropertyDescription.long_description
			: null,
			currency      : propertyLisitngData.CurrencyMaster ? propertyLisitngData.CurrencyMaster.symbol : null,
			agent         : {
				id           : propertyLisitngData.Agent.id,
				first_name   : propertyLisitngData.Agent.first_name,
				last_name    : propertyLisitngData.Agent.last_name,
				display_name : propertyLisitngData.Agent.display_name,
				email        : propertyLisitngData.Agent.email,
				phone        : propertyLisitngData.Agent.phone,
				mobile       : propertyLisitngData.Agent.mobile,
				image_url    : propertyLisitngData.Agent.image_url
			},
			distance: null, //param.distance
			favourite: 0 //param.favourite
		}
	})
	return properties
}

