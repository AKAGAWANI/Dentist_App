const passport = require('passport');
const Response = require('../../commons/responses/EcomResponseManager');
const logger = require('../../commons/logger/logger');
const {
  User
} = require('../../commons/models/mongo/mongodb');
const {
  refreshAccessToken
} = require('../../commons/auth/OAuth2');
const {
  Context
} = require('../../commons/context/dbContext');
const {
  ds,
  url,
  utility
} = require('../../commons/util/UtilManager');
const { crypto: CryptoUtil } = require('../../commons/util/UtilManager');
const appointmentRepository = require('../appointment/appointmentRepository');

const appointmentService = require('../appointment/appointmentService')
const service = require('../login/LoginService');

function validRequest(data){
  if(Object.keys.length==0)
  return true;
  else
  return false;
}
function Controller() { }

Controller.prototype.bookAppointment = async function (req, res, next) {
  try {
    // const userRes = await User.findOne({ "token.refresh_token": req.headers.refreshtoken || req.headers.refreshkey }).exec();
    // if(!userRes){
    //  return res.status(Response.error.Forbidden.code).json(Response.error.Forbidden.json('User not found'));
    // }
    if(validRequest(req.body)){
      return res.status(Response.error.InvalidRequest.code).json(Response.error.InvalidRequest.json('You need to filled all the details .'));
    }
      let bookAppointments= await appointmentService.createAppointment(req.body)
      let updateUserData = await appointmentService.updateUser({_id:bookAppointments.userId},{$push:{appointmentDetails:bookAppointments}})
      return res.status(Response.success.Ok.code).json(Response.success.Ok.json({data: bookAppointments,message:"Appointment bokked successfully ."}));
  } catch (error) {
    logger.error(error.message);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

Controller.prototype.listAppointments = async function (req, res, next) {
  try {
    let allData = await appointmentService.getAll({});
    return res.status(Response.success.Ok.code).json(Response.success.Ok.json({data: allData,message:"All apointment list fetched successfully ."}));
  } catch (error) {
    logger.error(error.message);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};
module.exports = new Controller();
