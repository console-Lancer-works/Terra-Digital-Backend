require("dotenv").config();
const async = require("async");
const apiResponder = require("../../util/responder");
const Property = require("../../models/Property");
const jwt = require("jsonwebtoken");
const Agent = require("../../models/Agent");
const User = require("../../models/User");
const AccountOtp = require("../../models/AccountOtp");
const errorHandler = require("../../util/errors");
const General = require("../../util/general");
const {
  emailchecker,
  isUserorAgent,
} = require("../../util/resources/frontend/emailChecker");
var hasher = require("wordpress-hash-node");
// const twilio = require("../../util/services/twilio/twillio");
const Domain = require("../../models/Domain");
const MailService = require("../../util/nodemailer/emailsent");

exports.registration = async (request, response, next) => {
  try {
    const {
      first_name,
      domain,
      last_name,
      email,
      password,
      isAgent,
      signup_type,
    } = request.body;

    if (!email || !first_name || !password) {
      throw errorHandler.createError(1007);
    }
    const isEmailExist = await emailchecker(email);
    if (!isEmailExist) {
      const domainDetails = await Domain.getDomainProperties(domain, [
        "id",
        "country_id",
        "name",
        "domain_name",
      ]);
      const hashedPassword = await hasher.HashPassword(password);
      if (isAgent) {
        let newUser = await Agent.create({
          mobile_verified: 0,
          first_name: first_name,
          last_name: last_name,
          main_email: email,
          password: hashedPassword,
          home_domain: domainDetails.id,
          signup_type: signup_type,
          email_verified: 0,
          country_id: domainDetails.country_id,
        });

        if (!newUser) throw errorHandler.createError(1007);
        let verifyLink = `https://${
          domainDetails.name
        }/verify-email/${General.encryptData({ id: newUser.id, type: "A" })}`;
        let Mailbody = {
          type: "EVC",
          verifyLink: verifyLink,
          display_name: newUser.first_name + " " + newUser.last_name,
          domain_url: domainDetails.name,
          domain_name: domainDetails.domain_name,
          domain: domain,
          email_to: newUser.main_email,
        };
        await MailService.sendMail(Mailbody);
        return apiResponder(request, response, next, true, 2022, {
          is_agent: isAgent,
          first_name,
          account_id: newUser.id,
        });
      } else {
        let newUser = await User.create({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashedPassword,
          home_domain: domainDetails.id,
          signup_type: signup_type,
          mobile_verified: 0,
          email_verified: 0,
        });
        if (!newUser) throw errorHandler.createError(1007);
        let verifyLink = `https://${
          domainDetails.name
        }/verify-email/${General.encryptData({ id: newUser.ID, type: "U" })}`;
        let Mailbody = {
          type: "EVC",
          verifyLink: verifyLink,
          display_name: newUser.first_name + " " + newUser.last_name,
          domain_url: domainDetails.name,
          domain_name: domainDetails.domain_name,
          domain: domain,
          email_to: newUser.email,
        };
        await MailService.sendMail(Mailbody);
        return apiResponder(request, response, next, true, 2022, {
          is_agent: isAgent,
          first_name,
          account_id: newUser.id,
        });
      }
    }
    if (isEmailExist) throw errorHandler.createError(2040);
  } catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2040,
      {}
    );
  }
};

exports.login = async (request, response, next) => {
  try {
    const { password } = request.body;
    const emailid = request.body.email;
    console.log(emailid, password);
    if (!emailid || !password) {
      throwerrorHandler.createError(1000);
    }
    const user = await emailchecker(emailid);

    if (user) {
      var email;
      var type;
      const isAgent = await isUserorAgent(emailid);
      console.log(isAgent);
      if (isAgent === "A") {
        if (user.email_verified === 0 && user.mobile_verified === 0)
          throwerrorHandler.createError(2099);
        else {
          email = user.main_email;
          type = "A";
        }
      } else {
        if (user.email_verified === 0 && user.mobile_verified === 0)
          throwerrorHandler.createError(2099);
        else {
          email = user.email;
          type = "U";
        }
      }
      const checked = hasher.CheckPassword(password, user.password);

      if (checked) {
        const authToken = jwt.sign(
          { id: user.id, email: email, type: type },
          process.env.JWT_SECRET
        );

        const {
          id,
          image_url,
          membership_id,
          membership_status,
          display_name,
        } = user;
        const data = {
          authToken,
          email,
          type,
          display_name,
          membership_status,
          membership_id,
          image_url,
          id,
        };
        return apiResponder(request, response, next, true, 2000, {
          data,
        });
      }
      if (!checked) throwerrorHandler.createError(1001);
    }
    if (!user) throwerrorHandler.createError(1000);
  } catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 1000,
      {}
    );
  }
};

exports.sendOtp = async (request, response, next) => {
  try {
    const {
      phone_no,
      account_id,
      account_type,
      expiry_date,
      type,
    } = request.body;
    if (!phone_no && !account_id && !account_type) {
      throw apiResponder.createError(2112);
    }

    let twilioResult = null;
    let result = null;

    if (type === "phone_no") {
      twilioResult = await twilio.sendOtp(phone_no);
    } else {
      //implement the sent otp on email logic
    }

    const codeAlreadyExist = await AccountOtp.findOne({
      where: {
        account_id: account_id,
        account_type: account_type,
      },
    });

    if (codeAlreadyExist) {
      result = await codeAlreadyExist.update({
        account_id: account_id,
        account_type: account_type,
        expiry_date: expiry_date,
        otp: twilioResult.otpCode,
      });
    } else {
      result = await AccountOtp.create({
        account_id: account_id,
        account_type: account_type,
        expiry_date: expiry_date,
        otp: twilioResult.otpCode,
      });
    }

    return apiResponder(request, response, next, true, 2111, result);
  } catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2112,
      {}
    );
  }
};

exports.verifyOtp = async (request, response, next) => {
  try {
    const { account_id, account_type, send_date, type, otpCode } = request.body;

    if (!account_id && !account_type) {
      throw apiResponder.createError(2062);
    }

    if (type === "phone_no") {
      const otpVerifed = await AccountOtp.findOne({
        where: {
          account_id: account_id,
          account_type: account_type,
        },
      });
      console.log(otpVerifed.expiry_date - new Date(send_date));
      if (
        otpVerifed.expiry_date - new Date(send_date) > 900000 ||
        otpVerifed.expiry_date - new Date(send_date) < 0
      ) {
        return apiResponder(request, response, next, true, 2114, result); // check otp is expired or not
      } else {
        if (otpVerifed.otp === +otpCode) {
          if (account_type === "A") {
            let agent = await Agent.findOne({
              where: {
                id: account_id,
              },
            });
            agent.update({
              mobile_verified: 1,
            });
          } else {
            let user = await User.findOne({
              where: {
                id: account_id,
              },
            });
            user.update({
              mobile_verified: 1,
            });
          }
          return apiResponder(request, response, next, true, 2113, result);
        }
      }
    } else {
      // verify otp on email logic
    }
    return apiResponder(request, response, next, true, 2062, result);
  } catch (error) {
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2062,
      {}
    );
  }
};

exports.verifyEmail = (request, response, next) => {
  try {
    decodedToken = jwt.verify(request.param.token, process.env.JWT_SECRET);
    return apiResponder(request, response, next, true, 2098, result);
  } catch (error) {
    return apiResponder(request, response, next, false, 2099, {});
  }
};

exports.forgotpassword = async (request, response, next) => {
  try {
    const { domain, email } = request.body;
    const randomstring = General.generateRandomStringForRegistration(32);

    const ExistedUser = await emailchecker(email);
    if (!ExistedUser) throw apiResponder.createError(2047);
    const domainDetails = await Domain.getDomainProperties(domain, [
      "id",
      "country_id",
      "name",
      "domain_name",
    ]);
    const userType = await isUserorAgent(email);
    const userId = ExistedUser.id;
    let verifyLink = `https://${
      domainDetails.name
    }/reset-password/${General.generateRandomStringForRegistration(32)}`;
    let Mailbody = {
      type: "FP",
      verifyLink: verifyLink,
      display_name: ExistedUser.first_name + " " + ExistedUser.last_name,
      domain_url: domainDetails.name,
      domain_name: domainDetails.domain_name,
      domain: domain,
      email_to: email,
    };
    await MailService.sendMail(Mailbody);
    if (userType === "A") {
      Agent.update(
        {
          email_verification_code: randomstring,
        },
        { where: { id: userId } }
      );
    } else {
      User.update(
        {
          email_verification_code: randomstring,
        },
        { where: { ID: userId } }
      );
    }
    return apiResponder(request, response, next, false, 2080, {
      type: userType,
      id: userId,
    });
  } catch (error) {
    console.log(error);
    return apiResponder(
      request,
      response,
      next,
      false,
      error.statusCode || 2047,
      {}
    );
  }
};
