var ActiveCampaign = require("activecampaign");

var ac = new ActiveCampaign(
  process.env.ACTIVE_CAMPAIGN_DOMAIN_URL,
  process.env.ACTIVE_CAMPAIGN_KEY
);

exports.addContact = (data) => {
  const contact = {
    email: data.email,
    "p[2]": data.active_campaign_list_id, //for parameter 2 means list id in contact table
  };

  //add contact
  return ac.api("contact/add", contact);
};
