const { jsonToObject } = require('../../general')
module.exports = (request) => {
    let enquiries = request.map((param) => {
        let enquiryDetailData = jsonToObject(param)
        console.log(enquiryDetailData);
        return {
            date                    : enquiryDetailData.date,
            lead_id                 : enquiryDetailData.id,
            listing_id              : enquiryDetailData.Property ? enquiryDetailData.Property.listing_id : null,
            listing_code            : enquiryDetailData.Property ? enquiryDetailData.Property.listing_code : null,
            listing_type            : enquiryDetailData.Property ? ( enquiryDetailData.Property.PropertyListingType ? enquiryDetailData.Property.PropertyListingType.name : null ) : null,
            location_text           : enquiryDetailData.Property ? enquiryDetailData.Property.location_text : null,
            property_id             : enquiryDetailData.Property ? enquiryDetailData.Property.id : null,
            property_name           : enquiryDetailData.Property ? (enquiryDetailData.Property.PropertyDescription ? enquiryDetailData.Property.PropertyDescription.share_content_description : null) : null,
            province_name           : enquiryDetailData.Property ? (enquiryDetailData.Property.Province ? enquiryDetailData.Property.Province.name : null) : null,
            city_name               : enquiryDetailData.Property ? (enquiryDetailData.Property.City ? enquiryDetailData.Property.City.name : null) : null,
            sender_name             : enquiryDetailData.name,
        }
    })
    return enquiries
}
