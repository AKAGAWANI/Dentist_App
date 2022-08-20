require('dotenv');
const repository = require('./DoctorRepository');

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
module.exports = new Service();
