const General = require("../util/authenticator");
const jwt = require("jsonwebtoken");
exports.jsonToObject = (data) => JSON.parse(JSON.stringify(data));

exports.generateRandomString = async (length = 4) => {
  let characters = "123456789";
  let charactersLength = characters.length;
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return randomString;
};

exports.authCheckForUnsignedApi = async (request) => {
  const token = request.get("AuthorizationToken");
  if (token) {
    let result = await General.authenticateAuthToken(token);
    if (!result.status) {
      return false;
    }
    if (result.user.user_type == "R") {
      result.user.user_type = "A";
    }
    user = result.user;
    request.body.user = user;
  }
  if (request.get("isMobApp")) {
    request.body.isMobApp = true;
  }
  return request;
};
exports.encryptData = (dataToEncrypt) => {
  return jwt.sign(
    { id: dataToEncrypt.id, type: dataToEncrypt.type },
    process.env.JWT_SECRET
  );
};

exports.generateRandomStringForRegistration = (length = 4) => {
  let characters =
    "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charactersLength = characters.length;
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return randomString;
};
