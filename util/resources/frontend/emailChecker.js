const Agent = require("../../../models/Agent");
const User = require("../../../models/User");
const { jsonToObject } = require('../../general')
async function emailchecker(email) {
  const agentexist = await Agent.findOne({
    where: {
      main_email: email,
    },
  });
  const userexist = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!agentexist && !userexist) {
    return false;
  } else {
    if (agentexist) {
      return agentexist;
    } else if (userexist) {
      return userexist;
    }
  }
}




async function isUserorAgent(email) {
  const agentexist = await Agent.findOne({
    where: {
      main_email: email,
    },
  });
  const userexist = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!agentexist && !userexist) {
    return false;
  } else {
    if (agentexist) {
      return "A";
    } else if (userexist) {
      return "U";
    }
  }
}




const format = (param) => {

  let propertyLisitngData = jsonToObject(param)

  return {
    //   id: propertyLisitngData.id,
    //   listing_id: propertyLisitngData.listing_id,
    //   lot_area: propertyLisitngData.lot_area,
    //   living_area: propertyLisitngData.living_area,
    //   location: propertyLisitngData.location,
    //   image_count: propertyLisitngData.image_count,
    //   price: propertyLisitngData.price,
    //   bedrooms: propertyLisitngData.bedrooms,
    //   bathrooms: propertyLisitngData.bathrooms,
    //   googlemap_lt: propertyLisitngData.googlemap_lt,
    //   googlemap_ln: propertyLisitngData.googlemap_ln,
    //   property_name: propertyLisitngData.PropertyDescription
    //     ? propertyLisitngData.PropertyDescription.name
    //     : null,
    //   currency: propertyLisitngData.CurrencyMaster ? propertyLisitngData.CurrencyMaster.symbol : null,
    //   agent: {
    //     id: propertyLisitngData.Agent.id,
    //     first_name: propertyLisitngData.Agent.first_name,
    //     last_name: propertyLisitngData.Agent.last_name,
    //     display_name: propertyLisitngData.Agent.display_name,
    //     email: propertyLisitngData.Agent.email,
    //     phone: propertyLisitngData.Agent.phone,
    //     mobile: propertyLisitngData.Agent.mobile,
    //     image_url: propertyLisitngData.Agent.image_url
    //   },
    //   distance: null, //param.distance
    //   favourite: 0 //param.favourite
  }

  return propertyLisitngData
}


module.exports = { emailchecker, isUserorAgent, format };
