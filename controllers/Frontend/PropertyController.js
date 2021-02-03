const PropertyMaster = require("../../util/helpers/PropertyMaster");
const errorHandler = require('../../util/errors')
const apiResponder = require('../../util/responder')
const autoSuggest = require('../../util/autoSuggest')
const PropertyType = require('../../models/PropertyType')
const PropertyListingCollection = require('../../util/resources/frontend/PropertyListingCollection')
const Feature = require('../../models/Feature')
const Appliance = require('../../models/Appliances')
const PropertyDescription = require('../../models/PropertyDescription')
const AgentUserLeads = require('../../models/AgentUserLeads');


const { response, request } = require("express");
const Province = require("../../models/Province");
const City = require("../../models/City")

const Favoriteproperty = require('../../models/FavoriteProperty');
const PropertyFeature = require("../../models/PropertyFeature");
const PropertyAppliance = require("../../models/PropertyAppliance");
const Property = require('../../models/Property');
const LeadThread = require('../../models/LeadThread');
const Domain = require("../../models/Domain");
const { emailchecker, isUserorAgent, format } = require("../../util/resources/frontend/emailChecker");
exports.locationAutoSuggest = async (request, response, next) => {
  if (errorHandler.validate(["domain", "keyword"], request.body))
    return apiResponder(request, response, next, true, 2003, {});

  let domainCountry = await Domain.getDomainInfo(
    request.body.domain,
    "country_id"
  );
  let suggestions = await autoSuggest(domainCountry, request.body.keyword);

  return apiResponder(request, response, next, true, 2016, { suggestions });
};

exports.getPropertyList = async (request, response, next) => {
  if (errorHandler.validate(["domain", "limit", "offset"], request.body))
    return apiResponder(request, response, next, true, 2003, {});

  let isMobApp = request.get("isMobApp");
  if (isMobApp) request.body.isMobApp = isMobApp;

  let properties = await PropertyMaster.getPropertyListingByParams(
    request.body
  );

  if (!properties.properties) throw errorHandler.createError(1005);
  return apiResponder(request, response, next, true, 2009, properties);
};
exports.getPropertyDetails = async (request, response, next) => {
  if (
    errorHandler.validate(
      [
        'property_id'
      ],
      request.body
    )
  )
    return apiResponder(request, response, next, true, 2003, {})

  let propertyDetails = await PropertyMaster.getPropertyDetails(request.body.property_id)

  return apiResponder(request, response, next, true, 2010, propertyDetails)
}

exports.getPropertyListDashboard = async (request, response, next) => {
  try {
    const {
      domain,
      keywords,
      limit,
      offset,
      status,
      type
    } = request.body;
    console.log(status)
    
    let condition = PropertyMaster.getListerPropertyCondition(request);
    condition.status = status;

    let obj = {
      offset: offset,
      limit: limit,
      where: condition,
      attributes: PropertyMaster.getColumns(),
      include: PropertyMaster.getBriefRelationships(request)
    }

    if (type) {
      obj.order = [
        [
          'id',
          type
        ]
      ]
    }

    let properties = await Property.findAll(obj)

    let total_properties = await Property.count({
      where: condition
    })

    return apiResponder(request, response, next, true, 2009, { properties: PropertyListingCollection(properties), total_properties: total_properties });
  } catch (error) {
    console.log(error)
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2105,
      {}
    );
  }
}

exports.getFeatures = async (request, response, next) => {
  try {
    let features = await Feature.findAll({
      attributes: ['id', 'name']
    })
    console.log(features);
    return apiResponder(request, response, next, true, 2094, features);
  } catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2107,
      {}
    );
  }
}


exports.getAppliances = async (request, response, next) => {
  try {
    let appliances = await Appliance.findAll({
      attributes: [
        'id', 'name', 'short_tag'
      ]
    })
    console.log(appliances);
    return apiResponder(request, response, next, true, 2095, appliances);
  } catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2108,
      {}
    );
  }
}

exports.addProperty = async (request, response, next) => {
  try {
    const {
      draft,
      property_id,
      domain,
      share_content_description,
      property_type,
      listing_id,
      bedrooms,
      bathrooms,
      listing_code,
      long_text_description,
      price,
      living_area,
      build_year,
      address,
      country_id,
      city_id,
      province_id,
      post_code,
      googlemap_lt,
      googlemap_ln,
      video_url,
      virtual_tour_url,
      private_note,
      appliances,
      features,
      property_doc,
      property_images
    } = request.body

    const property_payload = {
      domain: domain,
      property_type: property_type,
      listing_id: listing_id,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      status: draft ? 1 : 2,
      listing_code: listing_code,
      price: price,
      living_area: living_area,
      build_year: build_year,
      address: address,
      country_id: country_id,
      city_id: city_id,
      province_id: province_id,
      post_code: post_code,
      googlemap_lt: googlemap_lt,
      googlemap_ln: googlemap_ln,
      lister_id: request.id,
      lister_type: request.type,
      image_count: 3
    }

    const property_description_payload = {
      private_note: private_note,
      video_url: video_url,
      virtual_tour_url: virtual_tour_url,
      share_content_description: share_content_description,
      long_text_description: long_text_description
    }
console.log(request.files)
    if (property_id) {
      let property = await Property.findOne({      //find the property which will be updated
        where: {
          id: property_id
        }
      })
      if (!property) {                              //if property not exist then create error
        throw errorHandler.createError(2037);
      }
      let updated_property = await property.update(property_payload);    //finally update the property

      let property_description = await PropertyDescription.findOne({       //find the property description based on property_id
        where: {
          property_id: property_id
        }
      })
      if (!property_description) {                   //if property description not exist then create error
        throw errorHandler.createError(2037);
      }

      property_description_payload.property_id = property_id;   //update payload with property_id
      let update_property_description = await property_description.update(property_description_payload)    //finally respective property_description updated

      let bulkFeatures = [];
      let featureResult = null
      features.forEach(element => {
        bulkFeatures.push({
          property_id:property.id,
          appliance_id:element.id,
          custom:element.custom
        })   
      });

      let bulkAppliances = [];
      let appliancesResult = null
      appliances.forEach(element => {
        bulkAppliances.push({
          property_id:property.id,
          appliance_id:element.id,
          custom:element.custom
        })   
      });

      if(bulkFeatures){
          await PropertyFeature.destroy({
            where:{
              property_id:property_id
            }
          })
         featureResult = await PropertyFeature.bulkCreate(bulkFeatures);
      }

      if(bulkAppliances){
          await PropertyAppliance.destroy({
            where:{
              property_id:property_id
            }
          })
         appliancesResult = await PropertyAppliance.bulkCreate(bulkAppliances);
      }


      return apiResponder(request, response, next, true, 2090, {
        property: updated_property,
        description: update_property_description,
        features:featureResult,
        appliances:appliancesResult
      });

    }
    else {
      let new_property = await Property.create(property_payload)        // create new property

      property_description_payload.property_id = new_property.id;
      let PropertyDescriptions = await PropertyDescription.create(property_description_payload)    // create respective property description

      let bulkFeatures = [];
      let featureResult = null
      console.log(features)
      features.forEach(element => {
        bulkFeatures.push({
          property_id:new_property.id,
          appliance_id:element.id,
          custom:element.custom
        })   
      });

      let bulkAppliances = [];
      let appliancesResult = null
      appliances.forEach(element => {
        bulkAppliances.push({
          property_id:new_property.id,
          appliance_id:element.id,
          custom:element.custom
        })   
      });

      if(bulkFeatures){
         featureResult = await PropertyFeature.bulkCreate(bulkFeatures);
      }

      if(bulkAppliances){
         appliancesResult = await PropertyAppliance.bulkCreate(bulkAppliances);
      }

      return apiResponder(request, response, next, true, 2038, {
        property: new_property,
        description: PropertyDescriptions,
        features:featureResult,
        appliances:appliancesResult
      });
    }
  }
  catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2037,
      {}
    );
  }
}


exports.getfavourite = async (request, response, next) => {
  try {
    Favoriteproperty.findAll({
      where: {
        lister_id: 28217,
        lister_type: 'A'
      },
      include: [
        {
          model: Property,
          attributes: [
            'price',
          ],
          required: false
        }

      ],
    })
      .then(result => {
        return apiResponder(request, response, next, true, 2030, {
          result,
          image: process.env.AWS_CLOUDFRONT_IMAGE_URL
        });

      })
      .catch((error) => {
        console.log(error);
        throw errorHandler.createError(1004);
      });
  }
  catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 1004,
      {}
    );

  }
}

exports.getfavouritedetails = async (request, response, next) => {
  try {
    const { domain, keywords, limit, offset } = request.body;

    let favouriteproperties = await PropertyMaster.getFavoriteProperty(request);

    let total_properties = await Favoriteproperty.count({
      where: PropertyMaster.getListerPropertyCondition(request)
    })

    return apiResponder(request, response, next, true, 2036, {
      properties: favouriteproperties,
      total_properties: total_properties,
      property_image_base_url: process.env.AWS_CLOUDFRONT_IMAGE_URL
    });
  } catch (error) {
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2105,
      {}
    );
  }
}

exports.getagentleaddetails = async (request, response, next) => {
  try {
    const { lead_id, tag } = request.body;

    if (tag === 'SEND') {
      let a = await AgentUserLeads.findAll({
        where: {
          id: lead_id
        },
        attributes: [
          'property_id', "contactor_id", "message", "agent_id"
        ],
        include: PropertyMaster.getleadRelationships()
      })

      let threads = await LeadThread.findAll({
        where: {
          lead_id: lead_id
        },
        attributes: [
          'message', "from", "to", 'date', 'user_id', 'lead_id', 'date', 'user_type'
        ],
      })
      const data = {
        property_id: a[0].property_id,
        contactor_id: a[0].contactor_id,
        message: a[0].message,
        agent_id: a[0].agent_id,
        name: a[0].Agent.display_name,
        email: a[0].Agent.email,
        phone: a[0].Agent.phone,
        listing_id: a[0].Property.listing_id,
        listing_code: a[0].Property.listing_code,
        location_text: a[0].Property.location_text,
        bedrooms: a[0].Property.bedrooms,
        bathrooms: a[0].Property.bathrooms,
        living_area: a[0].Property.living_area,
        price: a[0].Property.price,
        title: a[0].Property.PropertyDescription.share_content_description,
        City_Name: a[0].Property.City.name,
        property_types: a[0].Property.PropertyType.name,

        province_name: a[0].Property.Province.name,

      }
      console.log(a[0].Property.Province.name);
      return apiResponder(request, response, next, true, 2064, {
        data, threads
      });
    }

  }
  catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2025,
      {}
    );
  }
}
