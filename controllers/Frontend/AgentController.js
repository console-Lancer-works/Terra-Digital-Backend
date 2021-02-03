const async = require('async')
const apiResponder = require('../../util/responder')
const Property = require('../../models/Property')
const Domain = require('../../models/Domain')
const Agent = require('../../models/Agent')
const General = require('../../util/general')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const PropertyDescription = require('../../models/PropertyDescription')
const AgentUserLeads = require('../../models/AgentUserLeads');
const PropertyMaster = require("../../util/helpers/PropertyMaster");
const EnquiryListingCollection = require('../../util/resources/frontend/EnquiryListingCollection')
const LeadThread = require('../../models/LeadThread')
const { response } = require('express')

exports.getFeaturedAgents = async (request, response, next) => {
	let agents = []
	let messageCode = 0
	let whereCondition = { featured: 1 }

	if (request.body.city_id) whereCondition.city_id = request.params.city
	if (request.body.province_id) whereCondition.province_id = request.params.province

	let domainId = await Domain.getDomainInfo(request.params.domain, 'id')
	// let agentOfDomains = await Property.findAll({
	// 	where      : { domain: domainId, lister_type: 'A' },
	// 	attributes : [
	// 		'lister_id'
	// 	],
	// 	group      : [
	// 		'lister_id'
	// 	]
	// })
	// let agentIds = agentOfDomains.map((res) => res.lister_id)
	// whereCondition.id = { [Op.in]: agentIds }
	whereCondition.home_domain = domainId
	agents = await Agent.findAll({
		where: whereCondition,
		attributes: [
			'id',
			'first_name',
			'last_name',
			'image_url',
			'display_name',
			'main_email',
			'website'
		]
	})

	agents = General.jsonToObject(agents)

	async.forEach(
		agents,
		function (agent, callback) {
			Property.count({
				where: {
					lister_id: agent.id,
					domain: domainId
				}
			}).then((result) => {
				agent['listings'] = result
				callback()
			})
		},
		function (err) {
			messageCode = agents.length ? 2011 : 2012
			return apiResponder(request, response, next, true, messageCode, {
				agents: agents
			})
		}
	)
}

exports.GetAgents = async (request, response, next) => {
	try {
		const { domain, city_id, keyword } = request.body
		if (!domain) {
			throw errorHandler.createError(2012)
		}
		if (!city_id && !keyword) {
			throw errorHandler.createError(2012)
		}
		if (city_id) {
			const regex = /^\d*(\.\d+)?$/
			if (!city_id.toString().match(regex)) {
				throw errorHandler.createError(2012)
			}
			Agent.findAll({
				where: {
					city_id
				}
			})
				.then((agents) => {
					const total_agents = agents.length
					if (agents.length > 0) {
						return apiResponder(request, response, next, true, 2006, {
							agents,
							total_agents
						})
					} else {
						return apiResponder(request, response, next, true, 2012, {
							agents,
							total_agents
						})
					}
				})
				.catch((error) => {
					throw errorHandler.createError(1004)
				})
		} else {
			Agent.findAll({
				where: {
					display_name: {
						[Op.like]: `%${keyword}%`
					}
				}
			})
				.then((agents) => {
					const total_agents = agents.length
					if (agents.length > 0) {
						return apiResponder(request, response, next, true, 2006, {
							agents,
							total_agents
						})
					} else {
						return apiResponder(request, response, next, true, 2012, {
							agents,
							total_agents
						})
					}
				})
				.catch((error) => {
					throw errorHandler.createError(2012)
				})
		}
	} catch (error) {
		return apiResponder(request, response, next, false, error.statusCode || 2012, {})
	}
}

exports.getEnquiry = async (request, response, next) => {
	try {
		const {
			tags,
			domain,
			offset,
			limit
		} = request.body

		if (tags === "SEND") {
			const results = await AgentUserLeads.findAll({
				where: {
					contactor_id: request.id,
					contactor_type: request.type
				},
				attributes: PropertyMaster.getEnquiryColumns(),
				include: PropertyMaster.getEnquiryRelationship()
			})
			const total_enquiries = await AgentUserLeads.count({
				where: {
					contactor_id: request.id,
					contactor_type: request.type
				}
			})

			return apiResponder(request, response, next, true, 2064,
				{
					enquiries: EnquiryListingCollection(results),
					total_enquiries: total_enquiries
				});
		} else if (tags === "RECEIVE") {
			const results = await AgentUserLeads.findAll({
				where: {
					agent_id: request.id,
				},
				attributes: PropertyMaster.getEnquiryColumns(),
				include: PropertyMaster.getEnquiryRelationship()
			})

			const total_enquiries = await AgentUserLeads.count({
				where: {
					agent_id: request.id
				}
			})

			return apiResponder(request, response, next, true, 2064,
				{
					enquiries: EnquiryListingCollection(results),
					total_enquiries: total_enquiries
				});
		}
		else {
			throw errorHandler.createError(2109)
		}

	}
	catch (error) {
		console.log(error)
		return apiResponder(
			request,
			response,
			next,
			false,
			error.statusCode || 2037,
			{}
		)
	}
}

exports.postLeadReply = async (request, response, next) => {
	try {
		const {
			from,
			lead_id,
			message,
			to,
			date
		} = request.body
		if (!from && !lead_id && !message && !to && !date) {
			console.log("hello");
			throw errorHandler.createError(2110);
		}

		const leadReply = await LeadThread.create({
			user_id: request.id,
			user_type: request.type,
			from: from,
			to: to,
			lead_id: lead_id,
			message: message,
			date:date
		})

		return apiResponder(request, response, next, true, 2066, leadReply);
	}
	catch (error) {
		console.log(error)
		return apiResponder(
			request,
			response,
			next,
			false,
			error.statusCode || 2110,
			{}
		)
	}
}
