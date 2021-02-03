
const apiResponder = require("../../util/responder");
const activeCampaignCtrl = require("../../util/helpers/ActiveCampaign");

exports.newsLetter = async (request, response, next) => {
    try {
        const {
          domain,
          email,
          active_campaign_list_id
        } = request.body;
        if (!domain || !email || !active_campaign_list_id ) {
          throw errorHandler.createError(2104);
        }

        // save contacts in given list id
        const result = await activeCampaignCtrl.addContact({domain,email,active_campaign_list_id});
        if(!result.success){
            throw errorHandler.createError(2104);
        }
        return apiResponder(request, response, next, true, 2103, {});
      } catch (error) {
        return apiResponder(
          request,
          response,
          next,
          false,
          error.statusCode || 2104,
          {}
        );
      }
}