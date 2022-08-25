require('dotenv');
const repository = require('./DoctorRepository');
const mongoose = require('mongoose');

function Service() {}

/****************** DOCTOR'S SERVICES ***********************/

Service.prototype.addDetails = async function (req) {
  let photo;
  if (req.file != null) {
    photo = req.file.location;
  }
  let { name, email, phone, whatsAppPhone, alternativePhone, experience } =
    req.body;

  let checkDoctorByEmail = await repository.getByFilter({
    'personalInfo.email': email,
  });
  let checkDoctorByPhone = await repository.getByFilter({
    'personalInfo.phone': phone,
  });

  if (checkDoctorByEmail || checkDoctorByPhone) return 'Doctor Already Exists';

  if (name != null || email != null || phone != null) {
    let doctorObj = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      personalInfo: {
        name: name,
        email: email,
        phone: phone,
        whatsAppPhone: whatsAppPhone,
        alternativePhone: alternativePhone,
        experience: experience,
        photo: photo,
      },
      expertiseField: {
        degree: '',
        specialization: '',
        bio: '',
        educationBrief: '',
        specializationBrief: '',
        experienceBrief: '',
        achievementBrief: '',
        membershipBrief: '',
      },
      address: {
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        identityProof: '',
      },
    };
    return repository.createDocument(doctorObj, 'Doctor');
  } else {
    return false;
  }
};

Service.prototype.findDoctorById = async function (id) {
  return repository.getById(id, 'Doctor');
};
Service.prototype.getAllDoctor = async function () {
  return repository.getAll('Doctor');
};
Service.prototype.getDoctorByCity = async function(city) {
  return repository.getByCity(city, 'Doctor');
};

Service.prototype.getDoctorByIdAndUpdate = async function (req) {
  let doctorId = req.params.id;
  let identityProof;
  let photo;
  for (let file of req.files) {
    if (file.fieldname == 'identityProof') identityProof = file.location;
    if (file.fieldname == 'photo') photo = file.location;
  }

  let {
    name,
    email,
    phone,
    whatsAppPhone,
    alternativePhone,
    experience,
    degree,
    specialization,
    bio,
    educationBrief,
    specializationBrief,
    experienceBrief,
    achievementBrief,
    membershipBrief,
    addressLine1,
    addressLine2,
    addressLine3,
    city,
    state,
    country,
    zipCode,
  } = req.body;

  let doctorDetails = await repository.getById(doctorId, 'Doctor');
  if (!doctorDetails) {
    return res
      .status(Response.error.Forbidden.code)
      .json(Response.error.Forbidden.json('Doctor not exist.'));
  }

  let doctorObj = {
    personalInfo: {
      name: name ? name : doctorDetails.personalInfo.name,
      email: email ? email : doctorDetails.personalInfo.email,
      phone: phone ? phone : doctorDetails.personalInfo.phone,
      whatsAppPhone: whatsAppPhone
        ? whatsAppPhone
        : doctorDetails.personalInfo.whatsAppPhone,
      alternativePhone: alternativePhone
        ? alternativePhone
        : doctorDetails.personalInfo.alternativePhone,
      experience: experience
        ? experience
        : doctorDetails.personalInfo.experience,
      photo: photo ? photo : doctorDetails.personalInfo.photo,
    },
    expertiseField: {
      degree: degree
        ? degree
        : doctorDetails.expertiseField
        ? doctorDetails.expertiseField.degree
        : null,
      specialization: specialization
        ? specialization
        : doctorDetails.expertiseField
        ? doctorDetails.expertiseField.specialization
        : null,
      bio: bio
        ? bio
        : doctorDetails.expertiseField
        ? doctorDetails.expertiseField.bio
        : null,
      educationBrief: educationBrief
        ? educationBrief
        : doctorDetails.experienceBrief
        ? doctorDetails.expertiseField.educationBrief
        : null,
      specializationBrief: specializationBrief
        ? specializationBrief
        : doctorDetails.expertiseField
        ? doctorDetails.expertiseField.specializationBrief
        : null,
      experienceBrief: experienceBrief
        ? experienceBrief
        : doctorDetails.expertiseField
        ? doctorDetails.expertiseField.educationBrief
        : null,
      achievementBrief: achievementBrief
        ? experienceBrief
        : doctorDetails.expertiseField
        ? doctorDetails.expertiseField.achievementBrief
        : null,
      membershipBrief: membershipBrief
        ? membershipBrief
        : doctorDetails.expertiseField
        ? doctorDetails.expertiseField.membershipBrief
        : null,
    },
    address: {
      addressLine1: addressLine1
        ? addressLine1
        : doctorDetails.address.addressLine1,
      addressLine2: addressLine2
        ? addressLine2
        : doctorDetails.address.addressLine2,
      addressLine3: addressLine3
        ? addressLine3
        : doctorDetails.address.addressLine3,
      city: city ? city : doctorDetails.address.city,
      state: state ? state : doctorDetails.address.state,
      country: country ? country : doctorDetails.address.country,
      zipCode: zipCode ? zipCode : doctorDetails.address.zipCode,
      identityProof: identityProof
        ? identityProof
        : doctorDetails.address.identityProof,
    },
  };

  let query = { _id: doctorId };
  return repository.getByIDAndUpdate(query, doctorObj, 'Doctor');
};

Service.prototype.validateAvailability = function (availability) {
  return repository.isCorrectDetails(availability);
};

/***************** PROBLEM SERVICES ***********************/
//Service to find whether problem exists or not
Service.prototype.findProblemById = async function (id) {
  return repository.getById(id, 'Problem');
};

Service.prototype.getAllProblems = async function () {
  return repository.getAll('Problem');
};

/***************** TEST SERVICES ***********************/
//Service to find whether test exists or not
Service.prototype.findTestById = async function (id) {
  return repository.getById(id, 'Test');
};

Service.prototype.getAllTests = async function () {
  return repository.getAll('Test');
};

/***************** DOCTOR REVIEW SERVICES ***********************/
//Service to find whether doctor exists or not
Service.prototype.findDoctorByIdAndAddReview = async function (id, data) {
  let query = { _id: id };
  let updation = { $push: { review: data } };
  return repository.getByIDAndUpdate(query, updation, 'Doctor');
};

Service.prototype.findAllReviews = async function (id) {
  let query = { _id: id };
  let filter = { review: 1 };
  return repository.getByIdWithFilter(query, filter, 'Doctor');
};

Service.prototype.findReviewByIdAndAddComment = async function (
  doctorId,
  reviewId,
  data
) {
  let query = { _id: doctorId, 'review._id': reviewId };
  let updation = { $push: { 'review.$.comments': data } };
  return repository.getByIDAndUpdate(query, updation, 'Doctor');
};

Service.prototype.findAllReviewComments = async function (doctorId, reviewId) {
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
