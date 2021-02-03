const client = require("twilio")(
  process.env.TWILLIO_ID,
  process.env.TWILLIO_TOKEN
);
const message = require("./message");

exports.sendOtp = async (phone_no) => {
  const messageBody = await message("OTP");
  const result = await client.messages.create({
    body: messageBody.message,
    from: process.env.TWILLIO_NUMBER,
    to: phone_no,
  });
  result.otpCode = messageBody.code;
  return result;
};
