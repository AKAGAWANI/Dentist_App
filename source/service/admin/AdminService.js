require('dotenv');
const mongoose = require('mongoose');
const encoder = require('urlencode');
const { ResourceAPI } = require('../../commons/externals/externalsManager');
const UserRepository = require('../user/UserRepository');
const { API } = require('../../commons/config/ConfigManager');
const repository = require('./AdminRepository');
const {
  utility: GeneralUtil,
  crypto
} = require('../../commons/util/UtilManager');
const { utility: utils } = require('../../commons/util/UtilManager');
const envproperties = require('../../properties.json');
const smsObj = require('../../commons/mailer/mailer.js');
function Service() {}

Service.prototype.simulateLogin = async function(username, password, resource) {
  const url = API.gateway.login.simulate;
  const login = (
    (await ResourceAPI.https.patch(url, null, {
      username,
      password,
      resource
    })) || {}
  ).data;

  return login.data;
};
Service.prototype.adminCreate = async function(data) {
  const genOTP = GeneralUtil.generateNumericOTP();

  let user = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    mobile: CryptoUtil.encrypt(data.contact, true),
    email: CryptoUtil.encrypt(data.email, true),
    password: CryptoUtil.hash(data.password),
    passwordOtp: CryptoUtil.hash(genOTP),
    otpExpiry: new Date(),
    updatedAt: new Date(),
    createdAt: new Date(),
    firstName: CryptoUtil.encrypt(
      data.firstName == undefined ? '' : data.firstName,
      true
    ),
    lastName: CryptoUtil.encrypt(
      data.lastName == undefined ? '' : data.lastName,
      true
    ),
    fullName: CryptoUtil.encrypt(
      data.lastName == undefined
        ? ''
        : data.lastName + data.firstName == undefined
        ? ''
        : data.firstName,
      true
    ),
    isAdmin: true
  };
  return await repository.createUser(user);
};

Service.prototype.sendEmail = async function(email, name) {
  UserRepository.sendOTPThroughEmail(email, name);
};

//craete an onboarding code, also check if exist, create new one
Service.prototype.getOnboardingCode = function() {
  return repository.getUniqueCode();
};

Service.prototype.prepareOTPMessage = async function(user, otp) {
  return {
    mobile: user.mobile ? user.mobile : null,
    email: user.email ? user.email : null,
    template: envproperties.FORGOT_PASSWORD_TEMPLATE,
    subject: envproperties.OTP_SUB,
    body: envproperties.FORGOT_PASSWORD_OTP.replace('<OTP>', otp).replace(
      '{#var#}',
      'e52dwnzI4WX'
    ),
    var1: otp,
    var2: process.env.LOCAL_OTP_VALIDITY
  };
};

Service.prototype.sendOTP = async function(msg) {
  let smsFeed, emailFeed;
  if (msg.mobile)
    try {
      msg.to = msg.mobile;
      msg.body = encoder.encode(msg.body);
      msg.template = envproperties.FORGOT_PASSWORD_TEMPLATE;
      smsFeed = await smsObj.sendSMS(msg);
    } catch (e) {
      logger.error(e);
    }
  if (msg.email)
    try {
      msg.templateName = 'Invitation';
      emailFeed = await UserRepository.sendOTPThroughEmail(
        msg.email, //email
        msg.var1, //otp
        msg.templateName //to select template
      );
    } catch (e) {
      logger.error(e);
    }

  const sentSMS = smsFeed == undefined ? false : true;
  const sentEMAIL = !!((emailFeed || {}).ResponseMetadata || {}).RequestId;
  return { sentSMS, sentEMAIL };
};

Service.prototype.addCode = async function(data) {
  return repository.addDetails(data);
};

Service.prototype.getInvitations = async function() {
  return repository.invitationsList();
};

module.exports = new Service();
