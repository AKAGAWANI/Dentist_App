require('dotenv');
const OAuth2      = require("../../commons/auth/OAuth2");
const repository  = require("./LoginRepository");
const { Context } = require('../../commons/context/dbContext');
const {
  Mailer,
  ResourceAPI,
}  = require('../../commons/externals/externalsManager');
const {
  crypto,
  datetime
}  = require('../../commons/util/UtilManager');
const {
  API
} = require('../../commons/config/ConfigManager');
const logger = require('../../commons/logger/logger');
const { User, Account } = require("../../commons/models/mongo/mongodb");
const mongoose = require('mongoose');
function Service() {}

Service.prototype.generateAccessToken = async function(userId) {
  return OAuth2.getAccessToken(userId);
}

Service.prototype.getUserApplications = async function (userId, { accessToken, refreshToken, expiresAt, profileImage }) {
  const { appType } = await Context.get('user_permissions');
  const userObj     = await repository.getUserById(userId);

  if(userObj.apps) {
    userObj.apps = userObj.apps.map(x => {
      return {
        appTypeId: x.appTypeId,
        name: appType[x.appTypeId].appType, 
        link: appType[x.appTypeId].appURL+`/login/success?profileImageURL=${profileImage}&userId=${userId}&accessToken=${accessToken}&refreshToken=${refreshToken}&expiresAt=${expiresAt}` 
      };
    });
  }

  return userObj;
}

Service.prototype.findUserByContact = async function(contact) {
  const contactENC = crypto.encrypt(contact);
  return repository.getUserByFilterParam({ mobile: contactENC });
}

Service.prototype.findUserByEmail = async function(email) {
  const emailENC = crypto.encrypt(email);
  return repository.getUserByFilterParam({ email: emailENC });
}

Service.prototype.generateLoginOTP = async function() {
  return Math.floor(1000 + Math.random() * 9000);
}

Service.prototype.prepareOTPMessage = async function(user, otp) {
  return {
    mobile: user.mobile ? crypto.decrypt(user.mobile) : null,
    email: user.email ? crypto.decrypt(user.email) : null,
    template: process.env.LOCAL_OTP_TEMPLATE,
    subject: process.env.LOCAL_OTP_SUBJECT,
    body: process.env.LOCAL_OTP_CONTENT.replace('<OTP>', otp),
    var1: otp,
    var2: process.env.LOCAL_OTP_VALIDITY,
  }
}

Service.prototype.sendOTP = async function(msg) {
  let smsFeed, emailFeed;
  if (msg.mobile) try { smsFeed = await Mailer.sms.send(msg)     } catch (e) { logger.error(e) }
  if (msg.email)  try { emailFeed = await Mailer.email.send(msg) } catch (e) { logger.error(e) }
  
  const sentSMS   = /^[sS]/.test((smsFeed || {}).Status);
  const sentEMAIL = !!((emailFeed || {}).ResponseMetadata || {}).RequestId;
  
  return { sentSMS, sentEMAIL };
}

Service.prototype.saveOTPtoProfile = async function(user, msg) {
  const params = {
    otp: crypto.hash(msg.var1),
    expiry: datetime.addDeltaToMoment(process.env.LOCAL_OTP_VALIDITY)
  };

  return repository.saveOTP2UserProfile(user._id, params); 
}

Service.prototype.isTooSoonToRetry = async function(user) {
  if(!user.otpExpiry) return false;

  const diff = datetime.dateDifferenceBetween(user.otpExpiry, datetime.now(), 'seconds');
  return diff > 0;
}

Service.prototype.simulateLogin = async function(username, password, resource) {
  const url   = API.gateway.login.simulate;
  const login = (await ResourceAPI.https.patch(url, null, { username, password, resource }) || {}).data;

  return login.data;
}

Service.prototype.updatePassword = async function(userId, password){
  return repository.updatePasswordByUserId(userId, crypto.hash(password));
}

Service.prototype.updateUser = async function(userId, tokenObj) {
  return repository.updateUser(userId, tokenObj);
}
Service.prototype.findUser = async function(email,mobile) {
  const emailENC = crypto.encrypt(email);
  const mobileENC = crypto.encrypt(mobile);
  return repository.getUserByFilterParam({$or:[{email: emailENC},{mobile: mobileENC}]  });
}
Service.prototype.regUser = async function (req) {
  const { contact, password, email } = req.body;
  let encryptMobile = CryptoUtil.encrypt(contact, true);
  let encryptEmail = CryptoUtil.encrypt(email, true);
    const genOTP = utils.generateNumericOTP();
    const otpData = { otp: genOTP };
    otpData.to = contact;
    otpData.body = envproperties.OTP_CONTENT.replace('<OTP>', genOTP);
    otpData.body = encoder.encode(otpData.body)
    smsObj.sendSMS(otpData);
    let encryptFirstName = CryptoUtil.encrypt(firstName || name||"");
    let encryptLastName = CryptoUtil.encrypt(lastName||"");
    let encryptFullName = CryptoUtil.encrypt(name || (`${firstName} ${lastName}`)||"");
    let encryptPassowrd = CryptoUtil.hash(password);
    let timeout = envproperties.OTP_VALIDITY;
    let pseudoUserId = new mongoose.Types.ObjectId().toHexString();


  const accountId = new mongoose.Types.ObjectId().toHexString();

  user._id = account._id = accountId;
  user.mobile = account.mobile = encryptMobile;
  user.email = account.email = encryptEmail;
  user.password = encryptPassowrd;
  user.updatedAt = new Date();
  // user.devices= userObj.devices

  // PermissionTemplate Loading 
  // user.apps = PermissionTemplate.apps;

  await user.save();
  await account.save();

  return accountId;
};
module.exports = new Service();