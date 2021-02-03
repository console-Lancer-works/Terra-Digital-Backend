const { jsonToObject } = require('../../general')
module.exports = (request) => {
	let agentUserLeads = request.map((param) => {
		let agentUserLeadsData = jsonToObject(param)
		return {
            listing_code: agentUserLeadsData.Property ? agentUserLeadsData.Property.listing_code : null,
            listing_id: agentUserLeadsData.Property ? agentUserLeadsData.Property.listing_id : null,
            location_text: agentUserLeadsData.Property ? agentUserLeadsData.Property.location_text : null,
		}
	})
	return agentUserLeads
}
