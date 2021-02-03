const jwt = require("jsonwebtoken");
require("dotenv").config();
const async = require("async");
const apiResponder = require("../util/responder");

const errorHandler = require("../util/errors");
const { emailchecker } = require("../util/resources/frontend/emailChecker");
var hasher = require("wordpress-hash-node");

exports.checkAuth = async (request, response, next) => {
  try {
    const { authorizationtoken } = request.headers;
    if (!authorizationtoken) {
      throw errorHandler.createError(1004);
    }
    const token = authorizationtoken.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const { id, email, type } = decoded;
    const user = await emailchecker(email);
    console.log("hi");
    if (user) {
      request.user = user;
      request.email = email;
      request.type = type;
      request.id = id;
      next();
    }
    if (!user) throw errorHandler.createError(1000);
  } catch (error) {
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2075,
      {}
    );
  }
};

exports.isUserPresent = async (request, response) => {
  try {
    if (!request.headers.authorizationtoken) {
      return 0;
    }
    const { authorizationtoken } = request.headers;
    const token = authorizationtoken.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, email, type } = decoded;
    console.log(decoded.email, decoded.type);
    const user = await emailchecker(email);
    if (user) {
      request.user = user;
      request.email = email;
      request.type = type;
      request.id = id;
      return id;
    }
    if (!user) throw errorHandler.createError(1000);
  } catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2075,
      {}
    );
  }
};
