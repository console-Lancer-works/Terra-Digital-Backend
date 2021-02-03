require("dotenv").config();
const async = require("async");
const apiResponder = require("../../util/responder");
const jwt = require("jsonwebtoken");
const Agent = require("../../models/Agent");
const User = require("../../models/User");
const errorHandler = require("../../util/errors");
const General = require("../../util/general");
const {
  emailchecker,
  isUserorAgent,
} = require("../../util/resources/frontend/emailChecker");
var hasher = require("wordpress-hash-node");
const Sequelize = require("sequelize");
const ImageUploader = require("../../util/helpers/ImageUpload");
const Op = Sequelize.Op;

exports.getprofile = async (request, response, next) => {
  try {
    console.log(request.type);
    const isAgent = await isUserorAgent(request.email);
    if (isAgent === "A") {
      Agent.findOne({
        where: {
          main_email: request.email,
        },
      })
        .then((agent) => {
          return apiResponder(request, response, next, true, 2029, {
            agent,
          });
        })
        .catch((error) => {
          throw errorHandler.createError(1004);
        });
    }
    if (isAgent === "U") {
      User.findOne({
        where: {
          email: request.email,
        },
      })
        .then((user) => {
          return apiResponder(request, response, next, true, 2029, {
            user,
          });
        })
        .catch((error) => {
          throw errorHandler.createError(1004);
        });
    }

    if (!isAgent) {
      throw errorHandler.createError(1000);
    }
  } catch (error) {
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 1005,
      {}
    );
  }
};

exports.changepassword = async (request, response, next) => {
  try {
    const { old_password, new_password } = request.body;
    console.log(old_password, new_password);
    if (!old_password || !new_password) {
      throw errorHandler.createError(2067);
    }
    const hashedPassword = await hasher.HashPassword(new_password);
    const isAgent = await isUserorAgent(request.email);
    console.log(isAgent);
    if (isAgent === "A") {
      Agent.findOne({
        where: {
          main_email: request.email,
        },
      })
        .then((agent) => {
          agent
            .update({
              password: hashedPassword,
            })
            .then((result) => {
              return apiResponder(request, response, next, true, 2051, {});
            })
            .catch((error) => {
              throw errorHandler.createError(2067);
            });
        })
        .catch((error) => {
          console.log(error);
          throw errorHandler.createError(2067);
        });
    }
    if (isAgent === "U") {
      User.findOne({
        where: {
          email: request.email,
        },
      })
        .then((agent) => {
          agent
            .update({
              password: hashedPassword,
            })
            .then((result) => {
              return apiResponder(request, response, next, true, 2051, {});
            })
            .catch((error) => {
              throw errorHandler.createError(2067);
            });
        })
        .catch((error) => {
          console.log(error);
          throw errorHandler.createError(2067);
        });
    }
  } catch (error) {
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2067,
      {}
    );
  }
};

exports.editprofile = async (request, response, next) => {
  try {
    const { sub_type } = request.body;
    if (!sub_type) {
      throw errorHandler.createError(2031);
    }
    const isAgent = await isUserorAgent(request.email);
    if (isAgent === "A") {
      const agent = await Agent.findOne({
        where: {
          main_email: request.email,
        },
      });
      if (sub_type === "PROFILE") {
        agent
          .update({
            about: request.body.about,
            city_id: request.body.city_id,
            company_name: request.body.company_name,
            date_of_birth: request.body.date_of_birth,
            first_name: request.body.first_name,
            gender: request.body.gender,
            isd_code: request.body.isd_code,
            language: request.body.language,
            last_name: request.body.last_name,
            license: request.body.license,
            mobile: request.body.mobile,
            phone: request.body.phone,
            province_id: request.body.province_id,
            service_area: request.body.service_area,
            sub_type: request.body.sub_type,
            title: request.body.title,
            zip: request.body.zip,
          })
          .then((result) => {
            return apiResponder(request, response, next, true, 2030, {});
          })
          .catch((error) => {
            throw errorHandler.createError(2031);
          });
      }
      if (sub_type === "SOCIAL") {
        agent
          .update({
            facebook_link: request.body.facebook_link,
            instagram_link: request.body.instagram_link,
            linkedin_link: request.body.linkedin_link,
            twitter_link: request.body.twitter_link,
            website: request.body.website,
            youtube_link: request.body.youtube_link,
          })
          .then((result) => {
            return apiResponder(request, response, next, true, 2030, {});
          })
          .catch((error) => {
            throw errorHandler.createError(2031);
          });
      }
      if (sub_type === "PIMAGE") {
        await ImageUploader.uploadImage(request, "PROFILE").then((result) => {
          agent
            .update({
              image_url: result,
            })
            .then((result) => {
              return apiResponder(request, response, next, true, 2030, {});
            })
            .catch((error) => {
              throw errorHandler.createError(2031);
            });
        });
      }
      if (sub_type === "CIMAGE") {
        await ImageUploader.uploadImage(request, "PROFILE").then((result) => {
          agent
            .update({
              cover_image_url: result,
            })
            .then((result) => {
              return apiResponder(request, response, next, true, 2030, {});
            })
            .catch((error) => {
              throw errorHandler.createError(2031);
            });
        });
      }
    }
    if (isAgent === "U") {
      const User = await User.findOne({
        where: {
          email: request.email,
        },
      });
      if (sub_type === "PROFILE") {
        User.update({
          date_of_birth: request.body.date_of_birth,
          first_name: request.body.first_name,
          gender: request.body.gender,
          last_name: request.body.last_name,
          user_nickname: request.body.user_nickname,
        })
          .then((result) => {
            return apiResponder(request, response, next, true, 2030, {});
          })
          .catch((error) => {
            throw errorHandler.createError(2031);
          });
      }
      if (sub_type === "PIMAGE") {
        await ImageUploader.uploadImage(request, "PROFILE").then((result) => {
          User.update({
            image_url: result,
          })
            .then((result) => {
              return apiResponder(request, response, next, true, 2030, {});
            })
            .catch((error) => {
              throw errorHandler.createError(2031);
            });
        });
      }
    }
  } catch (error) {
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2031,
      {}
    );
  }
};
