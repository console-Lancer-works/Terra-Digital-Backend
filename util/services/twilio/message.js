const General = require("../../general");

module.exports = async (messageType) => {
  let message = "";
  let code = await General.generateRandomString();
  switch (messageType) {
    case "OTP":
      message = "Hi ! This is your verification code " + code;
      break;
    default:
      message = "";
  }
  return { message, code };
};
