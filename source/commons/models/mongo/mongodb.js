const Account = require('./documents/account');
const User = require('./documents/user');
const Problem = require('./documents/problem');
const Doctor = require('./documents/doctor');
const Consultation = require('./documents/consulatation');
<<<<<<< HEAD
const Banner = require("./documents/banner");
const Insurance   = require('./documents/insurance');
const Insurancesubmission = require('./documents/insurancesubmission');
const AppReview = require('./documents/appReview');
const Problems     = require('./documents/problemModel');
const Appointment=require("./documents/appointment");
const Policy = require("./documents/policy");
const Test = require("./documents/test");
const Terms = require("./documents/termsncond");

=======
const Banner = require('./documents/banner');
const Insurance = require('./documents/insurance');
const AppReview = require('./documents/appReview');
const Problems = require('./documents/problemModel');
const Appointment = require('./documents/appointment');
const Policy = require('./documents/policy');
const Test = require('./documents/test');
>>>>>>> 061e1b2271de153f0d1a9a1412cc04a7e9cd9266

module.exports = {
  Account,
  User,
  Problem,
  Test,
  Doctor,
  Insurance,
  AppReview,
  Appointment,
  Consultation,
  Banner,
  Insurancesubmission,
  Problems,
<<<<<<< HEAD
  Policy,
  Terms
=======
  Policy
>>>>>>> 061e1b2271de153f0d1a9a1412cc04a7e9cd9266
};
