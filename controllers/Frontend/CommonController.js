require("dotenv").config();
const async = require("async");
const apiResponder = require("../../util/responder");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../util/errors");
const General = require("../../util/general");
const Province = require('../../models/Province');
const City = require('../../models/City');
const AgentUserLeads = require('../../models/AgentUserLeads');
const Country = require('../../models/Country');
const Domain = require('../../models/Domain');
const { isUserPresent } = require('../../middleware/checkAuth');
const { emailchecker, isUserorAgent } = require("../../util/resources/frontend/emailChecker");
const { getDomainId } = require('../../util/helpers/PropertyMaster')

exports.getprovinces = async (request, response, next) => {
    try {
        const { country_id } = request.body;
        if (!country_id) {
            throw errorHandler.createError(2105);
        }
        Province.findAll({
            where: {
                country_id: country_id
            }
        })
            .then(provinces => {
                return apiResponder(request, response, next, true, 2092,
                    provinces,
                );
            })
            .catch((error) => {
                throw errorHandler.createError(2105);
            });
    }
    catch (error) {
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

exports.fetchcities = async (request, response, next) => {
    try {
        const { province_id } = request.body;
        if (!province_id) {
            throw errorHandler.createError(2105);
        }
        City.findAll({
            where: {
                province_id: province_id
            }
        })
            .then(cities => {
                return apiResponder(request, response, next, true, 2093,
                    cities,
                );
            })
            .catch((error) => {
                throw errorHandler.createError(2105);
            });
    }
    catch (error) {
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


exports.getcountries = async (request, response, next) => {
    try {
        Country.findAll()
            .then(countries => {
                return apiResponder(request, response, next, true, 2091,
                    countries,
                );
            })
            .catch((error) => {
                throw errorHandler.createError(2025);
            });

    }
    catch (error) {
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

exports.contactagent = async (request, response, next) => {
    try {
        console.log("hello");
        const {
            name,
            message,
            email,
            property_id,
            domain,
            contactor_type,
            contact,
            agent_id,
        } = request.body;
        console.log(request.body)
        let domain_id = await getDomainId(domain);
        const check = await isUserPresent(request, response);
        if (check === 0) {
            let Contact = await AgentUserLeads.create({
                name: name,
                message: message,
                email: email,
                property_id: property_id,
                domain_id: domain_id,
                contactor_type: contactor_type,
                contactor_id: 0,
                contact: contact,
                agent_id: agent_id,
            });
            if (!Contact) throw errorHandler.createError(1004);
        }
        else {
            let Contact = await AgentUserLeads.create({
                name: name,
                message: message,
                email: email,
                property_id: property_id,
                domain_id: domain_id,
                contactor_type: contactor_type,
                contactor_id: check,
                contact: contact,
                agent_id: agent_id,
            });
            if (!Contact) throw errorHandler.createError(2061);

        }

        return apiResponder(request, response, next, true, 2021, {});
    }

    catch (error) {
        console.log(error);
        return apiResponder(
            request,
            response,
            next,
            false,
            error.statusCode || 2061,
            {}
        );
    }
};
