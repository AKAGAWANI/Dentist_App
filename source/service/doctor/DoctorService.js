require('dotenv');
const repository = require('./DoctorRepository');
const envproperties = require('../../properties.json');
const smsObj = require('../../commons/mailer/mailer.js');
const UserRepository = require('../user/UserRepository');

function Service() {}

/****************** DOCTOR'S SERVICES ***********************/
Service.prototype.findDoctorById = async function(id) {
  return repository.getById(id, 'Doctor');
};
Service.prototype.getAllDoctor = async function() {
  return repository.getAll('Doctor');
};
Service.prototype.getDoctorByCity = async function(city) {
  return repository.getByCity(city, 'Doctor');
};

Service.prototype.validateAvailability = function(availability) {
  return repository.isCorrectDetails(availability);
};

/***************** PROBLEM SERVICES ***********************/
//Service to find whether problem exists or not
Service.prototype.findProblemById = async function(id) {
  return repository.getById(id, 'Problem');
};

Service.prototype.getAllProblems = async function() {
  return repository.getAll('Problem');
};

/***************** TEST SERVICES ***********************/
//Service to find whether test exists or not
Service.prototype.findTestById = async function(id) {
  return repository.getById(id, 'Test');
};

Service.prototype.getAllTests = async function() {
  return repository.getAll('Test');
};

/***************** DOCTOR REVIEW SERVICES ***********************/
//Service to find whether doctor exists or not
Service.prototype.findDoctorByIdAndAddReview = async function(id, data) {
  let query = { _id: id };
  let updation = { $push: { review: data } };
  return repository.getByIDAndUpdate(id, updation, 'Doctor');
};

Service.prototype.findAllReviews = async function(id) {
  let query = { _id: id };
  let filter = { review: 1 };
  return repository.getByIdWithFilter(query, filter, 'Doctor');
};

Service.prototype.findReviewByIdAndAddComment = async function(
  doctorId,
  reviewId,
  data
) {
  let query = { _id: doctorId, 'review._id': reviewId };
  let updation = { $push: { 'review.$.comments': data } };
  return repository.getByIDAndUpdate(query, updation, 'Doctor');
};

Service.prototype.findAllReviewComments = async function(doctorId, reviewId) {
  let query = { _id: doctorId, 'review._id': reviewId };
  let filter = { 'review.comments.$': 1 };
  return repository.getByIdWithFilter(query, filter, 'Doctor');
};

/******************** COMMON SERVICE  *****************/
Service.prototype.addDetails = async function(data, modelName) {
  return repository.createDocument(data, modelName);
};

/************************ MEDICINES SERVICE **********************/
Service.prototype.getAllMedicines = async function(doctorId) {
  return repository.getMedicinesByDoctorId(doctorId);
};

Service.prototype.searchMedsByName = async function(name) {
  return repository.searchMeds(name);
};

/*********************  DATA VALIDATING *************************/
Service.prototype.validateDetails = async function(data) {
  return repository.validateInformationForOTP(data);
};

Service.prototype.generateLoginOTP = async function() {
  return Math.floor(100000 + Math.random() * 900000);
};

Service.prototype.prepareOTPMessage = async function(user, otp) {
  return {
    mobile: user.mobile ? user.mobile : null,
    email: user.email ? user.email : null,
    template: envproperties.SIGNUP_SMS_TEMPLATE,
    subject: envproperties.OTP_SUB,
    body: envproperties.SIGNUP_OTP.replace('<OTP>', otp).replace(
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
      msg.template = envproperties.SIGNUP_SMS_TEMPLATE;
      smsFeed = await smsObj.sendSMS(msg);
    } catch (e) {
      logger.error(e);
    }
  if (msg.email)
    try {
      msg.templateName = 'InvitationOtp';
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

Service.prototype.updateOtp = async function(otp, id) {
  return repository.addOtp(otp, id);
};

Service.prototype.validateOtp = async function(id, otp) {
  console.log(id, otp);
  return repository.validateData(id, otp);
};
module.exports = new Service();
