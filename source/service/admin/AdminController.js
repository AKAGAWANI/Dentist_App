const logger = require('../../commons/logger/logger');
const Response = require('../../commons/responses/EcomResponseManager');
const {
  Context: DBContext
} = require('../../commons/context/dbContext');
const {
  ds,
  url,
  utility
} = require('../../commons/util/UtilManager');
const {
  crypto
} = require('../../commons/util/UtilManager');
const service = require('./AdminService');
const LoginService = require('../login/LoginService')
const { sendSMS, sendMail2, sendAWSEmail } = require('../../commons/mailer/mailer')
const { send } = require('../../commons/externals/mailer/sms/sendSMS')
function Controller() { }

Controller.prototype.createAdmin = async (req, res, next) => {
  try {
    const user = await LoginService.findUser(req.body.email, req.body.contact);
    if (user) {
      if (crypto.decrypt(user.email) == req.body.email) {
        return res.status(Response.error.AlreadyExist.code).json(Response.error.AlreadyExist.json('This email already exists'));
      } else {
        return res.status(Response.error.AlreadyExist.code).json(Response.error.AlreadyExist.json('This mobile number already exists'));
      }
    }
    let saved = await service.adminCreate(req.body)
    return res.status(Response.success.Ok.code).json(Response.success.Ok.json({
      data: { userId: saved },
      message: 'Admin created successfully .'
    }));
  } catch (error) {
    logger.error(error.message);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
}

Controller.prototype.getAppLink = async function (req, res, next) {
  try {
    const params = { ...req.body, ...req.query, ...req.params };
    const { email, mobileNumber } = req.body
    if (utility.isValidEmail(email) == false && (email === undefined) == false) {
      return res.status(Response.error.InvalidRequest.code).json(Response.error.Forbidden.json('Please enter a valid email ...'));
    }

    if (utility.isValidMobileNumber(mobileNumber) == false && (mobileNumber === undefined) == false) {
      return res.status(Response.error.InvalidRequest.code).json(Response.error.Forbidden.json('Please enter a valid mobile number ...'));
    }
    let obj, obj2, data, mdata;
    if (mobileNumber && email) {
      obj = {
        to: email,
        subject: "Here is the app link",
        body: "Hi doctor dentist"
      }
      obj2 = {
        to: mobileNumber,
        body: "Here is the app link",
        template: "Please download the link below."
      }
      data = await sendMail2(obj)
      mdata = await send(obj2)
      return res.status(Response.success.Ok.code).json(Response.success.Ok.json({
        message: 'App link has been send on your email or mobile number successfully',
        data: { data, mdata },
      }));
    }

    if (mobileNumber) {
      obj = {
        to: mobileNumber,
        body: "Here is the app link",
        template: "Please download the link below."
      }
      data = await send(obj)
      console.log("==========>>>>>>", data)
      return res.status(Response.success.Ok.code).json(Response.success.Ok.json({
        message: 'App link has been send on your mobile number successfully',
        data: data,
      }));
    }
    if (email) {
      obj = {
        to: params.email,
        subject: "Here is the app link",
        body: "Hi doctor dentist"
      }
      data = await sendMail2(obj)
      return res.status(Response.success.Ok.code).json(Response.success.Ok.json({
        message: 'App link has been send on your email successfully',
        data: data,
      }));
    }

  } catch (error) {
    logger.error(error.message);
    console.log(error)
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
}

module.exports = new Controller()