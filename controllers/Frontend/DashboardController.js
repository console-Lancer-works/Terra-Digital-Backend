const errorHandler = require('../../util/errors')
const apiResponder = require('../../util/responder')
const PropertyMaster = require("../../util/helpers/PropertyMaster");
const FavortieProperty = require('../../models/FavoriteProperty');
const AgentUserLead = require('../../models/AgentUserLeads');
const Property = require('../../models/Property');
const AgentLeadUserCollection = require('../../util/resources/frontend/AgentUserLeadCollection');


exports.getDashboard = async (request, response, next) => {
    try {
        const {
            //   agent_id,
            domain
        } = request.body;
        // if (!domain || !agent_id) {
        //   throw errorHandler.createError(2106);
        // }

        let fav_properties = await FavortieProperty.count({
            where: {
                lister_type: request.type,
                lister_id: request.id,
            }
        })

        // console.log(fav_properties);
        let active_properties = await Property.count({
            where: {
                status: 3,
                lister_type: request.type,
                lister_id: request.id,
            }
        })

        let enquiry_list = await AgentUserLead.findAll({
            where: {
                contactor_id: request.id,
                contactor_type: request.type,
            },
            include: [
                {
                    model: Property,
                    attributes: [
                        'listing_code',
                        'listing_id',
                        'location_text'
                    ],
                    required: false
                },
            ]
        })

        let agent_enquiries = await AgentUserLead.count({
            where: {
                contactor_id: request.id,
                contactor_type: request.type,
            }
        })

        let property_for_sale = await Property.count({
            where: {
                listing_id: 9,
                lister_type: request.type,
                lister_id: request.id,
            }
        })

        let property_for_rent = await Property.count({
            where: {
                listing_id: 10,
                lister_type: request.type,
                lister_id: request.id,
            }
        })

        let property_vacation_rental = await Property.count({
            where: {
                listing_id: 12,
                lister_type: request.type,
                lister_id: request.id,
            }
        })


        return apiResponder(request, response, next, true, 2063,
            {
                enquiry_list: AgentLeadUserCollection(enquiry_list),
                agent_enquiries: agent_enquiries,
                favourite_properties: fav_properties,
                active_properties: active_properties,
                property_for_rent: property_for_rent,
                property_for_sale: property_for_sale,
                property_vacation_rental: property_vacation_rental
            }
        );
    } catch (error) {
        console.log(error);
        return apiResponder(
            request,
            response,
            next,
            false,
            error.statusCode || 2106,
            {}
        );
    }

}


exports.countFavouritePropertyCondition = (requestParams) => {
    console.log(requestParams.id, requestParams.type);
    return {
        lister_type: requestParams.type,
        lister_id: requestParams.id,
    }
}