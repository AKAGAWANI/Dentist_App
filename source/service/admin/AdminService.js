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
const repository = require('./AdminRepository');
const { crypto: CryptoUtil,utility: GeneralUtil } = require('../../commons/util/UtilManager');
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
Service.prototype.adminCreate=async function(data){

    const genOTP = GeneralUtil.generateNumericOTP();

    let user={
        _id:new mongoose.Types.ObjectId().toHexString(),
        mobile:CryptoUtil.encrypt(data.contact, true),
        email:CryptoUtil.encrypt(data.email, true),
        password:CryptoUtil.hash(data.password),
        passwordOtp:CryptoUtil.hash(genOTP),
        otpExpiry:new Date(),
        updatedAt:new Date(),
        createdAt:new Date(),
        firstName: CryptoUtil.encrypt(data.firstName==undefined?"":data.firstName, true),
        lastName: CryptoUtil.encrypt(data.lastName==undefined?"":data.lastName, true),
        fullName:CryptoUtil.encrypt(data.lastName==undefined?"":data.lastName+data.firstName==undefined?"":data.firstName, true),
        isAdmin:true
    }
   return await repository.createUser(user)
}

module.exports = new Service();