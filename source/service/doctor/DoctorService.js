require("dotenv");
const repository = require("./DoctorRepository");

function Service() {}

/***************** PROBLEM SERVICES ***********************/
//Service to find whether problem exists or not
Service.prototype.findProblemById = async function (id) {
  return repository.getById(id, "Problem");
};

Service.prototype.getAllProblems = async function () {
  return repository.getAll("Problem");
};

/***************** TEST SERVICES ***********************/
//Service to find whether test exists or not
Service.prototype.findTestById = async function (id) {
  return repository.getById(id, "Test");
};

Service.prototype.getAllTests = async function () {
  return repository.getAll("Test");
};

/******************** COMMON SERVICE  *****************/
Service.prototype.addDetails = async function (data, modelName) {
  return repository.createDocument(data, modelName);
};

module.exports = new Service();
