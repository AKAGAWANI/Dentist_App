require('dotenv');
const mongoose = require('mongoose');
const encoder = require('urlencode')
const {
  ResourceAPI,
}  = require('../../commons/externals/externalsManager');
const {
  API
} = require('../../commons/config/ConfigManager');
const { Scheduler, Context } = require('../../commons/context/pseudoUserContext');
const repository = require('./UserRepository');
const { crypto: CryptoUtil } = require('../../commons/util/UtilManager');
const { utility: utils } = require('../../commons/util/UtilManager');
const envproperties = require('../../properties.json');
const smsObj = require('../../commons/mailer/mailer.js');
const OAuth2 = require('../../commons/auth/OAuth2');





function Service () {}

Service.prototype.simulateLogin = async function(username, password, resource) {
  const url   = API.gateway.login.simulate;
  const login = (await ResourceAPI.https.patch(url, null, { username, password, resource }) || {}).data;

  return login.data;
}

Service.prototype.removeUser = async function(_id) {
  return repository.deleteAccount(_id);
}
Service.prototype.regPseudoUser = async function (req) {
  const { contact, name, firstName, lastName, password, email } = req.body;
  let user = null;
  let encryptMobile = CryptoUtil.encrypt(contact, true);
  let encryptEmail = CryptoUtil.encrypt(email, true);

  user = await repository.findUserByMobile(encryptMobile);
  user = user || (email ? (await repository.findUserByEmail(encryptEmail)) : null);

  if (user == null) {
    const genOTP = utils.generateNumericOTP();
    const otpData = { otp: genOTP };

    otpData.to = contact;
    otpData.body = envproperties.OTP_CONTENT.replace('<OTP>', genOTP);
    otpData.body = encoder.encode(otpData.body)
    smsObj.sendSMS(otpData);

    let encryptFirstName = CryptoUtil.encrypt(firstName || name);
    let encryptLastName = CryptoUtil.encrypt(lastName);
    let encryptFullName = CryptoUtil.encrypt(name || (`${firstName} ${lastName}`));
    let encryptPassowrd = CryptoUtil.hash(password);
    let timeout = envproperties.OTP_VALIDITY;
    let pseudoUserId = new mongoose.Types.ObjectId().toHexString();

    Scheduler.schedule({
      timeout,
      key: pseudoUserId,
      value: {
        "mobile": encryptMobile,
        "name": encryptFullName,
        "firstName": encryptFirstName,
        "lastName": encryptLastName,
        "password": encryptPassowrd,
        "otp": genOTP,
        "email": encryptEmail,
      }
    });

    return pseudoUserId;
  }

  return false;
};

Service.prototype.validateAndReg = async function (req) {
  const { pseudoUserId, otp, deviceId} = req.body;
  const pseudoUserData = await Context.get(pseudoUserId);

  if (pseudoUserData && pseudoUserData.otp == otp) {
    let userObj = {};
    userObj.firstName = pseudoUserData.firstName;
    userObj.lastName = pseudoUserData.lastName;
    userObj.name = pseudoUserData.name;
    userObj.mobile = pseudoUserData.mobile;
    userObj.email = pseudoUserData.email;
    userObj.password = pseudoUserData.password;
    userObj.devices = [{ deviceId: deviceId, deviceActive: true }]

    const user = await repository.createUserWithMobile(userObj);

    Context.del(pseudoUserId);

    if (user != null) {

      let data = {};
      data.userId = user;

      const accessToken = await OAuth2.getAccessToken(user);
      data.accessToken = accessToken.access_token;
      data.refreshToken = accessToken.refresh_token;
      data.expiresAt = accessToken.expires_at;

      return data; 

    } else {
      return false;
    }
  } else {
    return false;
  }
};


Service.prototype.updateProfile = async function(data) {
  return repository.updateProfile(data);
};

module.exports = new Service();